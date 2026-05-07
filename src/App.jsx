import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock3,
  Container,
  Facebook,
  FileCheck2,
  Globe2,
  Instagram,
  Linkedin,
  LocateFixed,
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

const images = {
  hero: 'https://images.pexels.com/photos/26569137/pexels-photo-26569137.jpeg?auto=compress&cs=tinysrgb&w=1800',
  port: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1400&q=85',
  truck: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1400&q=85',
  warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85',
  cargo: 'https://images.pexels.com/photos/34156526/pexels-photo-34156526.jpeg?auto=compress&cs=tinysrgb&w=1400',
  final: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1400&q=85',
  tracking: 'https://images.pexels.com/photos/31619250/pexels-photo-31619250.jpeg?auto=compress&cs=tinysrgb&w=1800'
};

const badges = {
  apple: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg',
  google: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg'
};

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

function Reveal({ children, className = '' }) {
  return (
    <motion.div className={className} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-90px' }}>
      {children}
    </motion.div>
  );
}

function Button({ children, variant = 'primary', href = '#download' }) {
  return (
    <motion.a href={href} className={`btn ${variant}`} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
      {children}
      <ArrowRight size={17} />
    </motion.a>
  );
}

function StoreButton({ store }) {
  const apple = store === 'apple';
  return (
    <motion.a className="store-button" href="#download" whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
      <img src={apple ? badges.apple : badges.google} alt={apple ? 'Download on the App Store' : 'Get it on Google Play'} />
    </motion.a>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <a className="brand" href="#home">
        <img className="brand-logo" src="/betaMuvlogo.png" alt="BetaMuv" />
      </a>
      <div className="nav-links">
        {['Home', 'How It Works', 'Features', 'For Drivers', 'FAQ'].map((item) => (
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
        className="hero-frame"
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
            <motion.p variants={fadeUp} className="eyebrow">Now Live Across Nigeria</motion.p>
            <motion.h1 variants={fadeUp}>Move Anything.<span>Anywhere in Nigeria.</span></motion.h1>
            <motion.p variants={fadeUp} className="hero-sub">
              BetaMuv connects you with verified delivery drivers on demand. Book, track, and ship your goods safely across all 36 states at transparent prices.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-actions">
              <Button>Download the App</Button>
              <Button href="#how-it-works" variant="ghost">See How It Works</Button>
            </motion.div>
          </motion.div>
          <RouteMap />
          <motion.div className="float-card tracking-card" animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity }}>
            <span className="pulse" />
            <div>
              <strong>Live Tracking</strong>
              <p>En Route</p>
            </div>
          </motion.div>
          <motion.div className="float-card status-card" animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity }}>
            <PackageCheck size={28} />
            <div>
              <strong>Delivered</strong>
              <p>₦14,500 secured</p>
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
    [Clock3, 10, 'K+', 'Deliveries Made'],
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
            <strong>{label === 'Average Rating' ? '4.8 ★' : <AnimatedNumber value={value} suffix={suffix} />}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function PhoneMockup({ compact = false }) {
  return (
    <motion.div className={`phone-shell ${compact ? 'compact' : ''}`} animate={{ y: [0, -12, 0], rotate: compact ? [0, -1, 0] : [0, 1, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="app-top">
          <div>
            <small>BETAMUV</small>
            <strong>Book a Delivery</strong>
          </div>
          <span>● En Route</span>
        </div>
        <div className="mini-map">
          <RouteMap />
          <div className="map-pin pickup">Pickup</div>
          <div className="map-pin dropoff">Dropoff</div>
        </div>
        <div className="route-fields">
          <div>
            <small>Pickup</small>
            <strong>Victoria Island, Lagos</strong>
          </div>
          <div>
            <small>Destination</small>
            <strong>Ikeja, Lagos</strong>
          </div>
        </div>
        <div className="driver-panel">
          <small>AVAILABLE DRIVERS</small>
          <div className="driver-row">
            <span>AO</span>
            <div>
              <strong>Adebayo Okafor</strong>
              <p>Pickup Truck · 1.8 km away</p>
            </div>
            <b>★ 4.9</b>
          </div>
          <button>Book Now</button>
        </div>
      </div>
    </motion.div>
  );
}

function MobileAppShowcase() {
  return (
    <section className="app-showcase" id="download">
      <div className="app-showcase-word">MOBILE</div>
      <Reveal className="app-copy">
        <p className="eyebrow">Download App</p>
        <h2>The mobile app is where every move happens.</h2>
        <p>Book nearby drivers, compare prices, track live, insure cargo, and confirm delivery from one clean BetaMuv experience.</p>
        <div className="store-row dark">
          <StoreButton store="apple" />
          <StoreButton store="google" />
        </div>
      </Reveal>
      <Reveal className="app-visual">
        <div className="phone-halo" />
        <PhoneMockup />
        <motion.div className="app-float payout-card" animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }}>
          <strong>Live Tracking</strong>
          <span>Victoria Island to Ikeja</span>
        </motion.div>
        <motion.div className="app-float price-card" animate={{ y: [0, -12, 0] }} transition={{ duration: 5.8, repeat: Infinity }}>
          <strong>₦14,500</strong>
          <span>Transparent fare</span>
        </motion.div>
      </Reveal>
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
      <motion.div className="story-route story-route-one" aria-hidden="true">
        <motion.span animate={{ x: ['-10%', '110%'] }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}><Truck size={34} /></motion.span>
      </motion.div>
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
            <motion.div className="solution-motion-icon" animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }} transition={{ duration: 3.4 + index, repeat: Infinity }}>
              <PackageCheck size={22} />
            </motion.div>
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
    [Route, 'Enter Your Route', 'Set your pickup and destination, describe your goods, and add special handling requirements.'],
    [Truck, 'Compare & Book', 'Browse verified nearby drivers, prices, vehicle types, and ratings. Book in seconds.'],
    [Radar, 'Track Live', 'Follow your delivery in real time on an interactive map with automatic status updates.'],
    [ShieldCheck, 'Confirm & Rate', 'Confirm receipt, pay securely in-app, and rate your driver.']
  ];
  return (
    <section className="process dark-section" id="how-it-works">
      <div className="map-texture" />
      <div className="process-radar" aria-hidden="true"><Radar size={220} /></div>
      <Reveal className="section-heading">
        <p className="eyebrow">How It Works</p>
        <h2>Simple. Fast. Reliable.</h2>
        <p>Whether you're sending a parcel or earning as a driver, BetaMuv makes every step completely seamless.</p>
      </Reveal>
      <motion.div className="process-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {steps.map(([Icon, title, text], index) => (
          <motion.article className="process-card" variants={fadeUp} key={title}>
            <span className="step-num">{index + 1}</span>
            <div className="step-icon"><Icon size={25} /></div>
            <motion.div className="step-progress" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: index * 0.2 }} />
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
    [Radar, 'Real-Time Tracking', 'Precise GPS movement, route status, and delivery milestones in one glance.'],
    [ShieldCheck, 'Cargo Insurance', 'Optional cover up to ₦20,000,000 for theft, damage, or loss.'],
    [Clock3, 'Flexible Scheduling', 'Book instantly or schedule ahead for repeat business movement.'],
    [BadgeCheck, 'Verified Drivers Only', 'Identity checks, licence validation, and vehicle review before every driver goes live.']
  ];
  return (
    <section className="business white-section">
      <div className="business-top">
        <Reveal className="business-label">
          <span>Platform Features</span>
          <p>BetaMuv packs powerful logistics tools into one clean, intuitive mobile app.</p>
        </Reveal>
        <Reveal className="business-title">
          <h2>Everything you need, built right in.</h2>
        </Reveal>
      </div>
      <motion.div className="business-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {features.map(([Icon, title, text], index) => (
          <motion.div className="business-feature" variants={fadeUp} whileHover={{ y: -8 }} key={title}>
            <motion.span className="feature-orbit" animate={{ rotate: 360 }} transition={{ duration: 10 + index * 2, repeat: Infinity, ease: 'linear' }} />
            <Icon size={27} />
            <h3>{title}</h3>
            <p>{text}</p>
            <ChevronRight size={20} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function DriverSection() {
  const benefits = [
    ['Instant Payouts', 'Earnings hit your wallet the moment delivery is confirmed. Withdraw to any Nigerian bank with no waiting.'],
    ['Flexible Schedule', 'Go online when you want. Accept trips at your convenience. BetaMuv works around your life.'],
    ['Thriving Community', 'Join a verified network of professional transporters across Nigeria and grow your reputation.']
  ];
  return (
    <section className="drivers-section dark-section" id="for-drivers">
      <div className="map-texture" />
      <motion.div className="driver-road" aria-hidden="true">
        <motion.span animate={{ x: ['-20%', '120%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}><Truck size={42} /></motion.span>
      </motion.div>
      <Reveal className="driver-copy">
        <p className="eyebrow">For Drivers & Transporters</p>
        <h2>Turn Your Truck Into a Career.</h2>
        <p>Join hundreds of verified transporters already earning consistently on BetaMuv. Set your own hours, choose your jobs, and get paid instantly after every delivery.</p>
        <ul>
          <li>Steady flow of delivery jobs matched to your location</li>
          <li>Instant earnings to your wallet after every delivery</li>
          <li>Full earnings dashboard to track your income and history</li>
          <li>Work your own schedule and be your own boss</li>
        </ul>
        <Button>Register as a Driver</Button>
      </Reveal>
      <motion.div className="driver-visual" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div className="earnings-panel" variants={fadeUp}>
          <div className="earnings-top">
            <span>Driver Dashboard</span>
            <strong>₦248,600</strong>
            <small>This month earnings</small>
          </div>
          <div className="earnings-bars">
            {[58, 86, 44, 72, 94, 64].map((height, index) => (
              <motion.i key={height} initial={{ height: 18 }} whileInView={{ height }} viewport={{ once: true }} transition={{ duration: 0.9, delay: index * 0.08 }} />
            ))}
          </div>
          <motion.div className="job-ticket" animate={{ x: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Truck size={22} />
            <div>
              <strong>Lagos → Ibadan</strong>
              <small>Furniture delivery · ₦36,000</small>
            </div>
            <b>Accept</b>
          </motion.div>
          <motion.div className="job-ticket second" animate={{ x: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
            <Container size={22} />
            <div>
              <strong>Aba → Lagos</strong>
              <small>Bulk cargo · ₦145,000</small>
            </div>
            <b>New</b>
          </motion.div>
        </motion.div>
        {benefits.map(([title, text]) => (
          <motion.article className="driver-benefit" variants={fadeUp} key={title}>
            <Truck size={26} />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function TrustSection() {
  const items = [
    ['₦20M', 'Maximum Insurance Coverage', 'Every shipment can be insured up to ₦20,000,000 against theft, damage, or loss.'],
    ['100%', 'Driver Verification', 'Every driver undergoes ID checks, licence validation, and vehicle inspection before going live.'],
    ['24/7', 'Emergency Support', 'An in-app emergency support button connects you instantly to a live support agent.'],
    ['Free', 'No Sign-Up Fees', 'No subscriptions, no hidden charges. BetaMuv is completely free to download and join.']
  ];
  return (
    <section className="trust-section white-section">
      <div className="trust-illustration" aria-hidden="true">
        <motion.span animate={{ y: [0, -18, 0] }} transition={{ duration: 4.8, repeat: Infinity }}><ShieldCheck size={68} /></motion.span>
        <motion.span animate={{ y: [0, 16, 0] }} transition={{ duration: 5.5, repeat: Infinity }}><FileCheck2 size={54} /></motion.span>
        <motion.span animate={{ y: [0, -12, 0] }} transition={{ duration: 4.2, repeat: Infinity }}><PackageCheck size={58} /></motion.span>
      </div>
      <Reveal className="section-heading center">
        <p className="eyebrow">Why BetaMuv</p>
        <h2>Built for Trust. Backed by Safety.</h2>
        <p>Every feature exists to protect you, your goods, your money, and your time.</p>
      </Reveal>
      <motion.div className="trust-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {items.map(([value, title, text]) => (
          <motion.article className="trust-card" variants={fadeUp} whileHover={{ y: -8 }} key={title}>
            <strong>{value}</strong>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function TrackingCTA() {
  return (
    <section className="tracking-wrap" id="tracking">
      <Reveal className="tracking-cta browser-frame">
        <img src={images.tracking} alt="Container ship docked at an illuminated port" />
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
    ['Jennifer Adeyemi', 'Catering Business Owner', 'Lagos', 'BetaMuv completely changed how I handle my catering logistics. I booked a truck in under 3 minutes and tracked it all the way to the venue.'],
    ['Kunle Ogunleye', 'Verified Driver', 'Abuja', "I've been driving with BetaMuv for four months. Jobs are consistent, and I get paid immediately after every delivery."],
    ['Tunde Chukwu', 'Wholesale Trader', 'Aba', 'We use BetaMuv to move stock between our Aba warehouse and Lagos store. The pricing is clear, the drivers are professional, and the insurance option gives real confidence.']
  ];
  return (
    <section className="testimonials white-section">
      <Reveal className="section-heading center">
        <p className="eyebrow">What People Are Saying</p>
        <h2>Loved by senders and drivers across Nigeria.</h2>
      </Reveal>
      <motion.div className="testimonial-row" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {testimonials.map(([name, type, location, quote], index) => (
          <motion.article className={`testimonial ${index === 0 ? 'highlight' : ''}`} variants={fadeUp} whileHover={{ y: -8 }} key={name}>
            <Quote className="quote-icon" size={30} />
            <div className="stars">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
            <p>"{quote}"</p>
            <div className="person">
              <span>{name.split(' ').map((n) => n[0]).join('')}</span>
              <div>
                <strong>{name}</strong>
                <small>{type} · {location}</small>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function FAQ() {
  const questions = [
    'What is BetaMuv and how does it work?',
    'Is BetaMuv available across all of Nigeria?',
    'How is my cargo insured?',
    'How do I pay for a delivery?',
    'How do I sign up as a driver?',
    'Can I cancel a booking?'
  ];
  return (
    <section className="faq-section white-section" id="faq">
      <Reveal className="section-heading center">
        <p className="eyebrow">Got Questions?</p>
        <h2>Frequently Asked Questions</h2>
      </Reveal>
      <div className="faq-list">
        {questions.map((question) => (
          <details key={question}>
            <summary>{question}<ChevronRight size={20} /></summary>
            <p>BetaMuv keeps logistics simple with verified drivers, transparent pricing, real-time tracking, and secure in-app booking.</p>
          </details>
        ))}
      </div>
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
          <p className="eyebrow">Ready to Move?</p>
          <h2>Download BetaMuv.</h2>
          <p>Join thousands of Nigerians sending goods safely and earning as verified drivers, all from one powerful, easy-to-use app.</p>
          <div className="store-row">
            <StoreButton store="apple" />
            <StoreButton store="google" />
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
          <a className="brand" href="#home"><img className="brand-logo" src="/betaMuvlogo.png" alt="BetaMuv" /></a>
          <p>Nigeria's on-demand haulage and delivery platform. Connecting senders with verified transporters across all 36 states.</p>
        </div>
        <div>
          <h4>Platform</h4>
          {['How It Works', 'Features', 'For Drivers', 'Download App'].map((link) => <a href="#" key={link}>{link}</a>)}
        </div>
        <div>
          <h4>Company</h4>
          {['About BetaMuv', 'Careers', 'Press', 'Contact Us'].map((link) => <a href="#" key={link}>{link}</a>)}
        </div>
        <div className="footer-cta">
          <h4>Legal</h4>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <div className="footer-socials">
            <Instagram size={17} />
            <Facebook size={17} />
            <Twitter size={17} />
            <Linkedin size={17} />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Betamuv Ltd. All rights reserved.</span>
        <span>Terms · Privacy</span>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main>
      <Hero />
      <Stats />
      <MobileAppShowcase />
      <SolutionCards />
      <ProcessSection />
      <BusinessLogistics />
      <DriverSection />
      <TrustSection />
      <TrackingCTA />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
