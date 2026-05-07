import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock3,
  X,
  Container,
  Facebook,
  Globe2,
  Instagram,
  Linkedin,
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
  hero: '/images/betamuv-hero-truck.png',
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
      <span>{children}</span>
      <i><ArrowRight size={16} /></i>
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
  const [open, setOpen] = useState(false);
  const links = ['Home', 'About', 'Services', 'How It Works', 'For Drivers', 'FAQ'];

  return (
    <nav className="navbar">
      <a className="brand" href="#home">
        <img className="brand-logo" src="/betaMuvlogo.png" alt="BetaMuv" />
      </a>
      <div className="nav-links">
        {links.map((item) => (
          <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>
            {item}
          </a>
        ))}
      </div>
      <a className="nav-cta" href="#download">Download App</a>
      <button className="menu-btn" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <motion.div
        className="mobile-menu"
        initial={false}
        animate={open ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: -12, pointerEvents: 'none' }}
        transition={{ duration: 0.22 }}
      >
        {links.map((item) => (
          <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
        <a className="mobile-menu-cta" href="#download" onClick={() => setOpen(false)}>Download App</a>
      </motion.div>
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

function AboutStory() {
  return (
    <section className="about-story white-section" id="about">
      <Reveal className="about-panel">
        <div className="about-media">
          <img src={images.truck} alt="Truck moving goods through the city" />
          <motion.div className="about-chip" animate={{ y: [0, -10, 0] }} transition={{ duration: 4.8, repeat: Infinity }}>
            <Truck size={22} />
            <span>Verified drivers and transporters</span>
          </motion.div>
        </div>
        <div className="about-copy">
          <p className="eyebrow">BetaMuv At Your Service</p>
          <h2>Experience effortless item movement, from home relocations to event logistics.</h2>
          <p>
            BetaMuv helps users find verified drivers and transporters for safe, fast, and transparent haulage within their city and across Nigeria.
            We connect people to the right vehicle, make deliveries easy to track, and keep every trip smooth from pickup to drop-off.
          </p>
          <Button href="#services" variant="text-link">Learn More</Button>
        </div>
      </Reveal>
    </section>
  );
}

function SolutionCards() {
  const cards = [
    ['01', 'Event & Equipment Movement', 'Move sound systems, tents, decor, tools, and event equipment with the right vehicle.', images.truck, Truck],
    ['02', 'Home & Office Relocation', 'Book verified movers for furniture, appliances, office items, and city relocations.', images.port, Warehouse],
    ['03', 'Business Deliveries', 'Move stock, supplies, and bulk goods with transparent pricing and live tracking.', images.cargo, Container],
    ['04', 'Marketplace Pickup & Drop-off', 'Arrange quick pickups for large marketplace purchases that need truck support.', images.warehouse, PackageCheck]
  ];
  return (
    <section className="solutions" id="services">
      <motion.div className="story-route story-route-one" aria-hidden="true">
        <motion.span animate={{ x: ['-10%', '110%'] }} transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}><Truck size={34} /></motion.span>
      </motion.div>
      <Reveal className="section-heading center">
        <p className="eyebrow">BetaMuv Services</p>
        <h2>The right vehicle for your every need.</h2>
        <p>From relocations to event logistics and marketplace pickups, BetaMuv makes haulage feel safe, simple, and worry-free.</p>
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
    [Route, 'Request', 'Tell us what you are moving, your pickup and drop-off point, and choose the right vehicle size.'],
    [Truck, 'Get Matched', 'BetaMuv connects you to a verified driver or transporter who can handle your haul.'],
    [Radar, 'Track in Real Time', 'Know exactly where your item is at every point of the journey.'],
    [ShieldCheck, 'Safe Delivery', 'Release payment only when delivery is confirmed. Your money stays protected.']
  ];
  return (
    <section className="process dark-section" id="how-it-works">
      <div className="map-texture" />
      <div className="process-radar" aria-hidden="true"><Radar size={220} /></div>
      <Reveal className="section-heading">
        <p className="eyebrow">How BetaMuv Works</p>
        <h2>Simple, smart, and stress-free.</h2>
        <p>From choosing the right vehicle to tracking your delivery in real time, every step is handled with care and precision.</p>
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
        <h2>Turn Your Vehicle Into a Career.</h2>
        <p>Join hundreds of verified drivers and transporters already earning consistently on BetaMuv. Set your own hours, choose your jobs, and get paid instantly after every delivery.</p>
        <ul>
          <li>Steady flow of delivery jobs matched to your location and vehicle type</li>
          <li>Instant earnings to your wallet after every delivery</li>
          <li>Full earnings dashboard to track your income and history</li>
          <li>Work your own schedule and be your own boss</li>
        </ul>
        <Button variant="dark-primary">Register as a Driver</Button>
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

function Testimonials() {
  const testimonials = [
    ['Tunde Adegoke', 'Retailer', 'Lagos', 'Moving my items was easier than I expected. Booking the truck took just a few minutes, the driver arrived on time, and I could track the trip all the way. What I liked most was knowing my payment was secure until delivery.'],
    ['Kunle Ogunleye', 'Verified Driver', 'Abuja', "I've been driving with BetaMuv for four months. Jobs are consistent, and I get paid immediately after every delivery."],
    ['Bola Abe', 'Event Planner', 'Lagos', 'From small deliveries to full event movements, BetaMuv makes logistics easier for real users across Lagos. The tracking and payment flow gave us confidence.']
  ];
  return (
    <section className="testimonials white-section">
      <Reveal className="section-heading center">
        <p className="eyebrow">Testimonials</p>
        <h2>Trusted by people who move every day.</h2>
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

function Articles() {
  const posts = [
    ['Choosing the right vehicle size for your move', 'A quick guide for home, office, and marketplace haulage.', images.truck],
    ['How secure payment protects every BetaMuv trip', 'Why payment release after confirmation gives users confidence.', images.warehouse],
    ['Event logistics without the last-minute stress', 'How planners can move equipment faster and with better tracking.', images.cargo]
  ];
  return (
    <section className="articles-section white-section">
      <Reveal className="section-heading center">
        <p className="eyebrow">Latest Articles</p>
        <h2>Insights for smarter haulage.</h2>
        <p>Practical ideas for people and businesses moving goods every day.</p>
      </Reveal>
      <motion.div className="article-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {posts.map(([title, text, img], index) => (
          <motion.article className="article-card" variants={fadeUp} whileHover={{ y: -8 }} key={title}>
            <div className="article-image"><img src={img} alt="" /></div>
            <span>November {5 + index}, 2026</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#download">Read More</a>
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
        <div className="final-panel">
          <div className="mega-type small">BETAMUV</div>
          <p className="eyebrow">Streamline Your Haulage Today</p>
          <h2>Move with confidence from pickup to drop-off.</h2>
          <p>Book verified drivers, compare vehicle options, track every trip, and keep payments protected until delivery is confirmed.</p>
          <div className="store-row">
            <StoreButton store="apple" />
            <StoreButton store="google" />
          </div>
        </div>
        <div className="final-action-board">
          <motion.div className="final-orbit" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="final-board-card active" animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity }}>
            <Route size={24} />
            <div>
              <strong>Yaba to Lekki</strong>
              <span>Home relocation request</span>
            </div>
          </motion.div>
          <motion.div className="final-board-card" animate={{ y: [0, 12, 0] }} transition={{ duration: 5.2, repeat: Infinity }}>
            <Truck size={24} />
            <div>
              <strong>3 verified options</strong>
              <span>Pickup van · mini truck · cargo van</span>
            </div>
          </motion.div>
          <motion.div className="final-board-card" animate={{ x: [0, 10, 0] }} transition={{ duration: 5.8, repeat: Infinity }}>
            <ShieldCheck size={24} />
            <div>
              <strong>Payment protected</strong>
              <span>Released after safe delivery</span>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();

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
        <span>© {currentYear} Betamuv Ltd. All rights reserved.</span>
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
      <AboutStory />
      <SolutionCards />
      <ProcessSection />
      <BusinessLogistics />
      <DriverSection />
      <Testimonials />
      <Articles />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
