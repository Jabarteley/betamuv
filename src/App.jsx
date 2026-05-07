import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Building2,
  ChartNoAxesCombined,
  ChevronRight,
  Clock3,
  Container,
  Facebook,
  FileCheck2,
  Globe2,
  Instagram,
  Linkedin,
  LocateFixed,
  MapPin,
  Menu,
  PackageCheck,
  Plane,
  Quote,
  Radar,
  Route,
  ShieldCheck,
  Ship,
  Star,
  Truck,
  Twitter,
  Warehouse
} from 'lucide-react';
import React from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const images = {
  hero: 'https://images.pexels.com/photos/26569137/pexels-photo-26569137.jpeg?auto=compress&cs=tinysrgb&w=1800',
  port: 'https://images.unsplash.com/photo-1639359894168-2e696e6307fa?auto=format&fit=crop&w=1400&q=85',
  truck: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1400&q=85',
  warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
  cargo: 'https://images.pexels.com/photos/34156526/pexels-photo-34156526.jpeg?auto=compress&cs=tinysrgb&w=1400',
  final: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1400&q=85'
};

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function Button({ children, variant = 'primary' }) {
  return (
    <motion.a href="#tracking" className={`btn ${variant}`} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
      {children}
      <ArrowRight size={17} />
    </motion.a>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <a className="brand" href="#">
        <span className="brand-mark">B</span>
        BetaMuv
      </a>
      <div className="nav-links">
        {['Home', 'How It Works', 'Features', 'For Drivers', 'Tracking', 'Contact'].map((item) => (
          <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>
            {item}
          </a>
        ))}
      </div>
      <a className="nav-cta" href="#download">Download App</a>
      <button className="menu-btn" aria-label="Open menu">
        <Menu size={22} />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-frame browser-frame"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="browser-top">
          <div className="window-dots"><span /><span /><span /></div>
          <Navbar />
        </div>
        <div className="hero-media">
          <motion.img src={images.hero} alt="Cargo trucks on a ship" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="hero-overlay" />
          <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="eyebrow">Real-time transport network</motion.p>
            <motion.h1 variants={fadeUp}>Move Anything.<span>Anywhere in Nigeria.</span></motion.h1>
            <motion.p variants={fadeUp} className="hero-sub">
              BetaMuv connects individuals and businesses with verified transporters for fast, secure, and trackable deliveries across Nigeria.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-actions">
              <Button>Book a Delivery</Button>
              <Button variant="ghost">Become a Driver</Button>
            </motion.div>
          </motion.div>
          <RouteMap />
          <motion.div className="float-card tracking-card" animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity }}>
            <span className="pulse" />
            <div>
              <strong>BMV-2498</strong>
              <p>Ibadan to Lagos, live</p>
            </div>
          </motion.div>
          <motion.div className="float-card status-card" animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <PackageCheck size={28} />
            <div>
              <strong>Delivery secured</strong>
              <p>ETA 42 minutes</p>
            </div>
          </motion.div>
          <div className="mega-type">BETAMUV</div>
        </div>
      </motion.div>
    </section>
  );
}

function RouteMap() {
  return (
    <div className="route-layer" aria-hidden="true">
      <svg viewBox="0 0 800 420" preserveAspectRatio="none">
        <path className="route-path" d="M80 330 C 210 190, 310 310, 410 180 S 650 95, 735 210" />
      </svg>
      {[0, 1, 2, 3].map((dot) => (
        <motion.span
          key={dot}
          className="route-dot"
          animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: dot * 1.2, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1500, bounce: 0 });
  const rounded = useTransform(spring, (latest) => `${Math.round(latest)}${suffix}`);
  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function Stats() {
  const stats = [
    [Clock3, 10, 'K+', 'Deliveries Completed'],
    [BadgeCheck, 500, '+', 'Verified Drivers'],
    [Globe2, 36, '', 'States Covered'],
    [Star, 4.8, '★', 'Average Rating']
  ];
  return (
    <section className="stats white-section">
      <motion.div className="stats-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {stats.map(([Icon, value, suffix, label]) => (
          <motion.div className="stat" variants={fadeUp} key={label}>
            <Icon size={30} />
            <strong>{label === 'Average Rating' ? '4.8★' : <AnimatedNumber value={value} suffix={suffix} />}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function SolutionCards() {
  const cards = [
    ['01', 'Same-Day Delivery', 'Fast city movement for parcels, documents, and time-sensitive runs.', images.truck, Truck],
    ['02', 'Interstate Haulage', 'Verified long-distance drivers for heavy goods across Nigerian routes.', images.port, Ship],
    ['03', 'Bulk Cargo Movement', 'Container, market, warehouse, and manufacturer-grade load movement.', images.cargo, Container],
    ['04', 'Business Logistics', 'Repeatable logistics workflows for merchants, teams, and operators.', images.warehouse, Warehouse]
  ];
  return (
    <section className="solutions" id="features">
      <Reveal className="section-heading center">
        <p className="eyebrow">Shipping Solutions</p>
        <h2>Shipping Solutions That Fit Every Need, Anywhere</h2>
        <p>From small parcels to bulk cargo, BetaMuv gives you reliable transport options built for Nigerian businesses and individuals.</p>
      </Reveal>
      <motion.div className="solution-track" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {cards.map(([num, title, text, img, Icon], index) => (
          <motion.article className={`solution-card ${index === 1 ? 'is-featured' : ''}`} variants={fadeUp} whileHover={{ y: -12, scale: index === 1 ? 1.035 : 1.02 }} key={title}>
            <img src={img} alt="" />
            <div className="card-shade" />
            <span>{num}</span>
            <Icon size={30} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    [Route, 'Request Pickup', 'Set pickup, destination, item type, and preferred delivery window.'],
    [Truck, 'Match With Driver', 'Get paired with a verified transporter suited to your cargo.'],
    [Radar, 'Track Movement', 'Follow your shipment with live status and route updates.'],
    [ShieldCheck, 'Confirm Delivery', 'Close the trip only when the package arrives securely.']
  ];
  return (
    <section className="process dark-section" id="how-it-works">
      <div className="map-texture" />
      <Reveal className="section-heading">
        <p className="eyebrow">How it works</p>
        <h2>From Request to Delivery — Streamlined Every Step of the Way</h2>
        <p>Book, match, track, and confirm your delivery from one simple platform.</p>
      </Reveal>
      <motion.div className="process-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {steps.map(([Icon, title, text], index) => (
          <motion.article className="process-card" variants={fadeUp} key={title}>
            <span className="step-num">0{index + 1}</span>
            <div className="step-icon"><Icon size={25} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function BusinessLogistics() {
  const features = [
    [Plane, 'Freight Forwarding'],
    [PackageCheck, 'Last-Mile Delivery'],
    [FileCheck2, 'Customs/Documentation Support'],
    [ShieldCheck, 'Tracking & Insurance']
  ];
  return (
    <section className="business white-section">
      <div className="business-top">
        <Reveal className="business-label">
          <span>Business Logistics</span>
          <p>Built for operational teams, merchants, and growing distribution networks.</p>
        </Reveal>
        <Reveal className="business-title">
          <h2>Smart logistics designed to power your business and keep your supply chain moving forward.</h2>
        </Reveal>
      </div>
      <motion.div className="business-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {features.map(([Icon, title]) => (
          <motion.div className="business-feature" variants={fadeUp} whileHover={{ y: -8 }} key={title}>
            <Icon size={27} />
            <h3>{title}</h3>
            <ChevronRight size={20} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function TrackingCTA() {
  return (
    <section className="tracking-wrap" id="tracking">
      <Reveal className="tracking-cta browser-frame">
        <img src={images.port} alt="Busy shipping port with cargo containers" />
        <div className="tracking-overlay" />
        <motion.div className="glass-card" animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <LocateFixed size={34} />
          <h2>Track Your Shipment</h2>
          <p>Enter your tracking number below to get real-time updates on your delivery.</p>
          <form>
            <input aria-label="Tracking number" placeholder="Enter your tracking number" />
            <button type="button">Track Now</button>
          </form>
        </motion.div>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    ['Jennifer Adeyemi', 'Catering Business Owner', 'Lagos', 'BetaMuv helped us move event supplies across Lagos without the usual phone-call chaos. I could track everything from pickup to arrival.'],
    ['Tunde Chukwu', 'Wholesale Trader', 'Aba', 'The interstate haulage matching is fast and transparent. It feels built for the way Nigerian businesses actually move goods.'],
    ['Kunle Ogunleye', 'Verified Driver', 'Abuja', 'The platform gives drivers better jobs, cleaner communication, and customers who know exactly what is moving.']
  ];
  return (
    <section className="testimonials white-section">
      <Reveal className="section-heading center">
        <p className="eyebrow">Customer stories</p>
        <h2>Trusted by businesses and everyday senders across Nigeria.</h2>
      </Reveal>
      <motion.div className="testimonial-row" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {testimonials.map(([name, type, location, quote], index) => (
          <motion.article className={`testimonial ${index === 0 ? 'highlight' : ''}`} variants={fadeUp} whileHover={{ y: -8 }} key={name}>
            <Quote className="quote-icon" size={30} />
            <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
            <p>{quote}</p>
            <div className="person">
              <span>{name.split(' ').map((n) => n[0]).join('')}</span>
              <div>
                <strong>{name}</strong>
                <small>{type}, {location}</small>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta">
      <Reveal className="final-card">
        <div className="final-image"><img src={images.final} alt="Logistics truck on the move" /></div>
        <div className="final-panel">
          <div className="mega-type small">BETAMUV</div>
          <p className="eyebrow">Ready when you are</p>
          <h2>Let’s Get Your Cargo Moving</h2>
          <p>Book reliable transport, track your shipment, and move goods across Nigeria with verified drivers.</p>
          <div className="hero-actions">
            <Button>Request a Quote</Button>
            <Button variant="ghost-light">Download App</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-word">BETAMUV</div>
      <div className="footer-grid">
        <div>
          <a className="brand" href="#"><span className="brand-mark">B</span>BetaMuv</a>
          <p>Move anything, anywhere in Nigeria with a verified logistics network built for speed, visibility, and confidence.</p>
        </div>
        <div>
          <h4>Page</h4>
          {['Home', 'About', 'Services', 'Tracking', 'Contact'].map((link) => <a href="#" key={link}>{link}</a>)}
        </div>
        <div>
          <h4>Social</h4>
          <a href="#"><Instagram size={17} />Instagram</a>
          <a href="#"><Facebook size={17} />Facebook</a>
          <a href="#"><Twitter size={17} />Twitter/X</a>
          <a href="#"><Linkedin size={17} />LinkedIn</a>
        </div>
        <div className="footer-cta">
          <h4>Need a movement plan?</h4>
          <p>Tell us what you are moving and where it needs to go.</p>
          <a href="#tracking">Request a Quote</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 BetaMuv. All rights reserved.</span>
        <span>Lagos • Abuja • Port Harcourt • Kano</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <Stats />
      <SolutionCards />
      <ProcessSection />
      <BusinessLogistics />
      <TrackingCTA />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}
