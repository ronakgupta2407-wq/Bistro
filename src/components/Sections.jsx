import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Coffee, Heart,
  Instagram, MapPin, MessageCircle, Phone, Sparkles, Users, X,
} from 'lucide-react'
import { galleryItems, menuCategories, menuItems, signatureItems } from '../data/menu'
import { Button, MenuCard, Reveal, SectionHeading } from './UI'

const PHONE = '07838828743'
const WA_LINK = `https://wa.me/917838828743?text=${encodeURIComponent('Hello Bistro 57, I would like to reserve a table.')}`
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=Bistro+57+B-99+City+Center+Patel+Nagar+Gwalior'
const DIRECTIONS_LINK = 'https://www.google.com/maps/dir/?api=1&destination=Bistro+57+B-99+City+Center+Patel+Nagar+Gwalior'

export function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-backdrop" />
      <div className="hero-grain" />
      <div className="hero-content">
        <Reveal><span className="hero-kicker"><span /> Bistro 57 � Gwalior</span></Reveal>
        <Reveal delay={0.08}><h1>Where every cup<br /><em>becomes an occasion.</em></h1></Reveal>
        <Reveal delay={0.16}><p>Specialty coffee, honest food, and the kind of warmth that keeps you at the table. An invitation to linger.</p></Reveal>
        <Reveal delay={0.23} className="hero-actions">
          <Button href="#reservation">Reserve a table</Button>
          <a className="text-link light-link" href="#menu">Explore the menu <ArrowDown size={16} /></a>
        </Reveal>
        <Reveal delay={0.3} className="hero-rating">
          <span className="rating-stars">?????</span>
          <strong>4.8</strong><span>�</span><span>4,774 Google reviews</span>
        </Reveal>
      </div>
      <div className="hero-bottom">
        <div className="service-pills"><span>Dine-in</span><i /> <span>Drive-through</span><i /> <span>No-contact delivery</span></div>
        <span className="hero-scroll">Scroll to discover <ArrowDown size={14} /></span>
      </div>
      <div className="hero-note">stay a while <span>?</span></div>
    </section>
  )
}

export function Highlights() {
  const items = [
    { number: '01', title: 'Considered comfort', desc: 'A warm escape, designed for lingering.', icon: Coffee },
    { number: '02', title: 'Crafted with care', desc: 'Freshly prepared, plated with intention.', icon: Sparkles },
    { number: '03', title: 'Attentive service', desc: 'Thoughtful hospitality, every visit.', icon: Heart },
    { number: '04', title: 'Shared moments', desc: 'A table for conversations that run long.', icon: Users },
  ]
  return <section className="highlights section-pad">
    <div className="highlight-intro"><span className="eyebrow">The Bistro Standard</span><h2>Considered details.<br /><em>Quiet luxury.</em></h2></div>
    <div className="highlight-grid">{items.map(({ number, title, desc, icon: Icon }, index) =>
      <Reveal key={number} delay={index * 0.08} className="highlight-card">
        <div className="highlight-top"><span>{number}</span><Icon size={20} strokeWidth={1.25} /></div>
        <h3>{title}</h3><p>{desc}</p>
      </Reveal>)}
    </div>
  </section>
}

export function MenuSection() {
  const [category, setCategory] = useState('All')
  const filtered = useMemo(() => category === 'All' ? menuItems : menuItems.filter((item) => item.category === category), [category])
  return <section className="menu-section section-pad" id="menu">
    <div className="menu-heading-row">
      <SectionHeading eyebrow="The Menu" title={<>A menu for<br /><em>every mood.</em></>} description="From your first coffee to that one more bite. Familiar favorites and new discoveries." />
      <a className="text-link desktop-only" href="#reservation">Reserve a table <ArrowRight size={16} /></a>
    </div>
    <div className="menu-tabs" role="tablist" aria-label="Filter menu by category">
      {menuCategories.map((name) => <button key={name} role="tab" aria-selected={category === name} className={category === name ? 'selected' : ''} onClick={() => setCategory(name)}>{name}</button>)}
    </div>
    <motion.div className="menu-grid" layout>
      <AnimatePresence mode="popLayout">
        {filtered.map((item) => <motion.div layout key={item.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}><MenuCard item={item} /></motion.div>)}
      </AnimatePresence>
    </motion.div>
    <p className="menu-note">Menu and prices are subject to change. Please ask our team about today�s recommendations.</p>
  </section>
}

export function Signatures() {
  const [index, setIndex] = useState(0)
  const go = (step) => setIndex((current) => (current + step + signatureItems.length) % signatureItems.length)
  const item = signatureItems[index]
  return <section className="signature-section section-pad">
    <div className="signature-head"><div><span className="eyebrow">House Favorites</span><h2>Worth slowing<br /><em>down for.</em></h2></div>
      <div className="slider-controls"><span>0{index + 1} <i>/</i> 0{signatureItems.length}</span><button aria-label="Previous dish" onClick={() => go(-1)}><ArrowLeft size={17} /></button><button aria-label="Next dish" onClick={() => go(1)}><ArrowRight size={17} /></button></div>
    </div>
    <AnimatePresence mode="wait"><motion.div className="signature-feature" key={item.title} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
      <img src={item.image} alt={item.title} loading="lazy" />
      <div className="signature-caption"><span>{item.name}</span><h3>{item.title}</h3><p>{item.note}</p></div>
      <span className="signature-count">House Favorites � 0{index + 1}</span>
    </motion.div></AnimatePresence>
  </section>
}

export function Gallery() {
  const [selected, setSelected] = useState(null)
  return <section className="gallery-section section-pad" id="gallery">
    <div className="gallery-head"><SectionHeading eyebrow="The Space" title={<>Light, texture,<br /><em>and the moments between.</em></>} description="A glimpse of the room, the plates, and the people who make it ours." /></div>
    <div className="gallery-grid">{galleryItems.map((item, index) => <Reveal key={item.src} delay={index * 0.05} className={`gallery-tile ${item.size}`}><button onClick={() => setSelected(index)} aria-label={`View ${item.alt}`}><img src={item.src} alt={item.alt} loading="lazy" /><span className="gallery-tag">{item.tag}</span><span className="gallery-zoom"><ArrowUpRight size={20} /></span></button></Reveal>)}</div>
    <AnimatePresence>{selected !== null && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label="Gallery image">
      <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close image"><X /></button>
      <button className="lightbox-arrow prev" onClick={(event) => { event.stopPropagation(); setSelected((selected - 1 + galleryItems.length) % galleryItems.length) }} aria-label="Previous image"><ArrowLeft /></button>
      <img src={galleryItems[selected].src} alt={galleryItems[selected].alt} onClick={(event) => event.stopPropagation()} />
      <button className="lightbox-arrow next" onClick={(event) => { event.stopPropagation(); setSelected((selected + 1) % galleryItems.length) }} aria-label="Next image"><ArrowRight /></button>
    </motion.div>}</AnimatePresence>
  </section>
}

const reviews = [
  { quote: 'The white sauce pasta was comforting and generously portioned, and the service was attentive throughout.', name: 'A regular guest', detail: 'Gwalior', initials: 'P', color: 'peach' },
  { quote: 'A beautifully designed space with warm lighting. We came for coffee and stayed for hours.', name: 'Weekend regular', detail: 'Gwalior', initials: 'S', color: 'sage' },
  { quote: 'Thoughtful staff and a menu with something for everyone. It feels like a neighborhood institution.', name: 'Returning guest', detail: 'Gwalior', initials: 'R', color: 'gold' },
  { quote: 'The ambiance is refined and the food arrived exactly as promised. A lovely spot to slow down in the city.', name: 'First-time visitor', detail: 'Gwalior', initials: 'A', color: 'rose' },
]
export function Reviews() {
  const [index, setIndex] = useState(0)
  const next = () => setIndex((value) => (value + 1) % reviews.length)
  const previous = () => setIndex((value) => (value - 1 + reviews.length) % reviews.length)
  return <section className="reviews-section section-pad" id="reviews">
    <div className="reviews-overview"><span className="eyebrow">Testimonials</span><div className="rating-big">4.8<span>?</span></div><div className="rating-stars" style={{ color: 'var(--accent)', letterSpacing: '4px', fontSize: '13px', margin: '10px 0 6px' }}>?????</div><p>Loved by our neighborhood.</p><span className="review-count">4,774 Google reviews</span><a className="review-google" href="https://www.google.com/search?q=Bistro+57+Gwalior+reviews" target="_blank" rel="noreferrer">Write a review on Google <ArrowUpRight size={16} /></a></div>
    <div className="review-slider">
      <div className="review-slider-top"><span>Words from our tables</span><div><button onClick={previous} aria-label="Previous review"><ArrowLeft size={17} /></button><button onClick={next} aria-label="Next review"><ArrowRight size={17} /></button></div></div>
      <AnimatePresence mode="wait"><motion.article className="review-card" key={index} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <span className="quote-mark">�</span><div className="review-stars">?????</div><blockquote>{reviews[index].quote}</blockquote>
        <div className="review-person"><span className={`avatar ${reviews[index].color}`}>{reviews[index].initials}</span><span><strong>{reviews[index].name}</strong><small>{reviews[index].detail}</small></span><span className="google-mark">G</span></div>
      </motion.article></AnimatePresence>
      <div className="review-dots">{reviews.map((review, i) => <button key={review.initials} className={index === i ? 'current' : ''} onClick={() => setIndex(i)} aria-label={`Show review ${i + 1}`} />)}</div>
    </div>
  </section>
}

export function Offer() {
  return <section className="offer-section section-pad">
    <div className="offer-card"><div className="offer-sparkle">Seasonal</div><span className="eyebrow">Seasonal Gathering</span><h2>A little Diwali<br /><em>magic is brewing.</em></h2><p>Celebrate the season with good food, warm company, and a festive sparkle. Ask our team about today�s special.</p><Button href="#contact" variant="light">Plan a visit</Button><span className="offer-decoration">good things<br />are brewing</span></div>
    <span className="offer-footnote">Special moments, all year round � Gwalior, India</span>
  </section>
}

export function About() {
  return <section className="about-section section-pad" id="about">
    <div className="about-image"><img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1100&q=85" alt="The interiors at Bistro 57" loading="lazy" /><span className="about-image-note">stay a little longer <span>?</span></span></div>
    <div className="about-copy"><span className="eyebrow">Our Story</span><h2>More than a cafe.<br /><em>A place to belong.</em></h2><p className="about-lead">Bistro 57 is a considered corner in the heart of Gwalior � made for slow coffees, shared plates, and conversations that run a little longer.</p><p>Drop in for a familiar favorite or discover something new. From comforting pasta and sizzling starters to a perfectly chilled coffee, there is always room at the table.</p><span className="welcome-badge"><Heart size={14} /> Everyone is welcome here</span>
      <div className="stats-grid"><div><strong>4.8<span>?</span></strong><small>neighborhood rating</small></div><div><strong>4,774<sup>+</sup></strong><small>Google reviews</small></div><div><strong>11<span>pm</span></strong><small>closing time, daily</small></div><div><strong>01</strong><small>city favorite</small></div></div>
    </div>
  </section>
}

export function Reservation() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const minDate = new Date().toLocaleDateString('en-CA')
  const submit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setError('')
    setSubmitted(true)
  }
  return <section className="reservation-section section-pad" id="reservation">
    <div className="reservation-intro"><span className="eyebrow">Reservations</span><h2>Let us make<br /><em>a plan.</em></h2><p>Whether a catch-up for two or a table full of friends, we would be delighted to welcome you.</p>
      <div className="reservation-contact"><a href={`tel:${PHONE}`}><Phone size={16} /> +91 78388 28743</a><a href={WA_LINK} target="_blank" rel="noreferrer"><MessageCircle size={16} /> Enquire on WhatsApp</a></div>
    </div>
    <div className="reservation-form-wrap">
      {submitted ? <motion.div className="form-success" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role="status"><span>?</span><h3>Thank you.</h3><p>Your request has been received. Please call or message us on WhatsApp so our team can confirm your table.</p><Button href={WA_LINK} variant="dark">Confirm on WhatsApp</Button><button className="reset-form" onClick={() => setSubmitted(false)}>Make another request</button></motion.div> :
      <form className="reservation-form" onSubmit={submit}>
        <div className="form-heading"><span>Book a table</span><small>* required</small></div>
        <div className="form-grid">
          <label>Your name *<input name="name" placeholder="How may we address you?" required minLength="2" autoComplete="name" /></label>
          <label>Phone number *<input name="phone" type="tel" placeholder="+91" required pattern="[+0-9 ()-]{10,16}" title="Enter a valid phone number" autoComplete="tel" /></label>
          <label>Date *<input name="date" type="date" required min={minDate} /></label>
          <label>Time *<select name="time" required defaultValue=""><option value="" disabled>Select a time</option><option>12:00 PM</option><option>1:00 PM</option><option>2:00 PM</option><option>3:00 PM</option><option>4:00 PM</option><option>5:00 PM</option><option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option><option>9:00 PM</option><option>10:00 PM</option></select></label>
          <label>Guests *<select name="guests" required defaultValue=""><option value="" disabled>How many?</option>{Array.from({ length: 10 }, (_, i) => <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'guest' : 'guests'}</option>)}</select></label>
          <label className="full-field">Special requests <textarea name="request" rows="2" placeholder="A celebration, seating preference, dietary notes..." maxLength="300" /></label>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-dark submit-button" type="submit">Request a table <ArrowRight size={17} /></button>
        <p className="form-note">Reservations are confirmed by our team over call or WhatsApp.</p>
      </form>}
    </div>
  </section>
}

export function Contact() {
  return <section className="contact-section section-pad" id="contact">
    <div className="contact-heading"><SectionHeading eyebrow="Visit Us" title={<>See you<br /><em>at the bistro.</em></>} description="In the heart of City Center, Gwalior. There is always a seat for you." /><a className="directions-button" href={DIRECTIONS_LINK} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={17} /></a></div>
    <div className="contact-layout"><div className="contact-details">
      <div className="contact-detail"><span className="contact-icon"><MapPin size={18} /></span><div><small>Address</small><p>B-99, City Center, Patel Nagar,<br />Gwalior, Madhya Pradesh 474002</p><span className="plus-code">Plus Code: 655R+J8 Gwalior</span></div></div>
      <div className="contact-detail"><span className="contact-icon"><Phone size={18} /></span><div><small>Telephone</small><a href={`tel:${PHONE}`}>078388 28743</a></div></div>
      <div className="contact-detail"><span className="contact-icon"><Clock3 size={18} /></span><div><small>Hours</small><p>Open daily � Closes at 11:00 PM</p><span className="plus-code">Hours may vary on festivals.</span></div></div>
      <div className="contact-detail"><span className="contact-icon"><Instagram size={18} /></span><div><small>Instagram</small><a href="https://www.instagram.com/bistro57gwalior/" target="_blank" rel="noreferrer">@bistro57gwalior <ArrowUpRight size={14} /></a></div></div>
    </div>
    <div className="map-frame"><iframe title="Map showing Bistro 57 in Patel Nagar, City Center, Gwalior" src="https://maps.google.com/maps?q=Bistro%2057%2C%20City%20Center%2C%20Gwalior&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="map-label" href={MAP_LINK} target="_blank" rel="noreferrer"><MapPin size={15} /> Open in Google Maps</a><a className="map-directions" href={DIRECTIONS_LINK} target="_blank" rel="noreferrer">Directions <ArrowUpRight size={14} /></a></div></div>
  </section>
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-main"><a className="brand footer-brand" href="#home"><span className="brand-mark">57</span><span className="brand-name">Bistro<span> &nbsp;�&nbsp; Gwalior</span></span></a>
      <p>Good food, considered service,<br />and a place to call yours.</p><a className="footer-insta" href="https://www.instagram.com/bistro57gwalior/" target="_blank" rel="noreferrer"><Instagram size={17} /> Follow our story <ArrowUpRight size={14} /></a>
      <div className="footer-links"><div><span>Discover</span><a href="#menu">The menu</a><a href="#gallery">Our space</a><a href="#reviews">Testimonials</a></div><div><span>Visit</span><a href="#about">Our story</a><a href="#reservation">Reserve</a><a href="#contact">Find us</a></div><div><span>Contact</span><a href={`tel:${PHONE}`}>078388 28743</a><a href={WA_LINK} target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.instagram.com/bistro57gwalior/" target="_blank" rel="noreferrer">Instagram</a></div></div>
    </div>
    <div className="footer-bottom"><span>� 2026 Bistro 57 � Gwalior, India</span><a href="#home">Back to top ?</a><span>All rights reserved.</span></div>
  </footer>
}

export function FloatingActions() {
  return <div className="floating-actions"><a className="float-call" href={`tel:${PHONE}`} aria-label="Call Bistro 57"><Phone size={18} /></a><a className="float-whatsapp" href={WA_LINK} target="_blank" rel="noreferrer" aria-label="Message Bistro 57 on WhatsApp"><MessageCircle size={19} /></a></div>
}

export function Loader() {
  return <motion.div className="page-loader" initial={{ opacity: 1 }} animate={{ opacity: 0, pointerEvents: 'none' }} transition={{ duration: 0.7, delay: 1.0, ease: [0.76, 0, 0.24, 1] }} aria-label="Bistro 57 loading">
    <motion.div className="loader-orbit" initial={{ scale: 0.72, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.9, ease: 'easeOut' }} />
    <motion.div className="loader-logo" initial={{ opacity: 0, y: 12, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
      <span className="loader-steam" aria-hidden="true"><i /><i /><i /></span>
      <span className="loader-mark">57</span>
      <small>Bistro 57 � Gwalior</small>
    </motion.div>
    <motion.span className="loader-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} />
    <motion.span className="loader-caption" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>Welcome</motion.span>
  </motion.div>
}
