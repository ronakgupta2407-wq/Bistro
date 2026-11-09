import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Clock3,
  Heart, Instagram, MapPin, Menu as MenuIcon, MessageCircle, Moon,
  Phone, ShoppingBag, Sun, Sunset, X,
} from 'lucide-react'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { menuItems } from '../data/menu'

const CoffeeCupCanvas = lazy(() => import('./CupScene').then((module) => ({ default: module.CoffeeCupCanvas })))
const DishCanvas = lazy(() => import('./CupScene').then((module) => ({ default: module.DishCanvas })))

const PHONE = '07838828743'
const WA = 'https://wa.me/917838828743'
const MAPS = 'https://www.google.com/maps/dir/?api=1&destination=Bistro+57+B-99+City+Center+Patel+Nagar+Gwalior'
const galleryPhotos = [
  { src: 'photo-1554118811-1e0d58224f24', alt: 'The softly lit cafe interior', label: 'The room' },
  { src: 'photo-1473093295043-cdd812d0e601', alt: 'White sauce pasta, ready to share', label: 'At the table' },
  { src: 'photo-1461023058943-07fcbe16d735', alt: 'Cold coffee in a clear glass', label: 'First sip' },
  { src: 'photo-1513104890138-7c749659a591', alt: 'Freshly baked pizza with garden toppings', label: 'From the kitchen' },
  { src: 'photo-1528605248644-14dd04022da1', alt: 'Friends sharing an evening meal', label: 'Together' },
  { src: 'photo-1512621776951-a57141f2eefd', alt: 'A colorful fresh salad', label: 'Freshly made' },
]
const photoUrl = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const menuCategories = ['All', 'Coffee', 'Pasta', 'Pizza', 'Sizzlers', 'Mojitos', 'Desserts']

const stories = [
  {
    time: 'THE FIRST POUR',
    name: 'Morning',
    title: <>A slower<br /><em>kind of start.</em></>,
    copy: 'The first cold coffee of the day. The window seat. A little room to wake up before the city does.',
    image: 'photo-1495474472287-4d71bcdd2085',
    alt: 'A freshly poured coffee in gentle morning light',
    marker: 'THE FIRST POUR',
  },
  {
    time: 'A LITTLE PAST NOON',
    name: 'Afternoon',
    title: <>One more plate.<br /><em>One more story.</em></>,
    copy: 'Lunch becomes a long lunch. White sauce pasta in the middle, stories going around the table.',
    image: 'photo-1473093295043-cdd812d0e601',
    alt: 'A bowl of fresh pasta served for lunch',
    marker: 'AROUND THE TABLE',
  },
  {
    time: 'GOLDEN HOUR',
    name: 'Golden hour',
    title: <>The light gets softer.<br /><em>So do we.</em></>,
    copy: 'A minty mojito, something sizzling, and a friend who said they only had half an hour.',
    image: 'photo-1521017432531-fbd92d768814',
    alt: 'A cozy cafe table in golden afternoon light',
    marker: 'NO PLANS, JUST HERE',
  },
  {
    time: 'UNTIL 11 PM',
    name: 'After dark',
    title: <>Stay until<br /><em>the last good sip.</em></>,
    copy: 'The room glows a little warmer. The conversation finds another chapter. We close at eleven.',
    image: 'photo-1517248135467-4c7edcad34c4',
    alt: 'A warmly glowing cafe in the evening',
    marker: 'LAST CALL, NOT GOODBYE',
  },
]

class CanvasBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function canRender3d() {
  if (typeof window === 'undefined') return false
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const memory = navigator.deviceMemory || 8
  const cores = navigator.hardwareConcurrency || 8
  return !reduced && memory > 4 && cores > 4
}

function useWebGL() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => setEnabled(canRender3d()), [])
  return enabled
}

function Preloader({ onComplete }) {
  const cupRef = useRef(null)
  const fillRef = useRef(null)
  const countRef = useRef(null)
  const floodRef = useRef(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const fill = fillRef.current
    const counter = { value: 0 }
    const timeline = gsap.timeline({ onComplete })
    if (shouldReduce) {
      timeline.to(counter, { value: 100, duration: 0.2, onUpdate: () => { if (countRef.current) countRef.current.textContent = '100' } })
        .to(floodRef.current, { scaleY: 1, duration: 0.25, transformOrigin: 'bottom' })
      return () => timeline.kill()
    }
    timeline
      .to(counter, {
        value: 100,
        duration: 1.55,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = `${Math.round(counter.value)}`
          if (fill) fill.setAttribute('y', `${172 - counter.value * 0.92}`)
        },
      })
      .to(cupRef.current, { rotation: -12, x: 18, y: 8, duration: 0.22, transformOrigin: '50% 80%', ease: 'power2.in' }, '+=0.08')
      .to(floodRef.current, { scaleY: 1, duration: 0.56, transformOrigin: 'bottom', ease: 'power4.inOut' }, '<')
    return () => timeline.kill()
  }, [onComplete, shouldReduce])

  return (
    <div className="preloader" aria-label="Preparing your table">
      <div className="preloader-cup" ref={cupRef}>
        <svg viewBox="0 0 220 260" role="img" aria-label="Coffee cup filling">
          <defs><clipPath id="coffee-cup-clip"><path d="M45 54H170V198Q170 224 145 224H70Q45 224 45 198Z" /></clipPath></defs>
          <path d="M47 48H169V196Q169 224 143 224H73Q47 224 47 196Z" fill="none" stroke="#f2e8d8" strokeWidth="5" />
          <path d="M170 82H188Q211 82 211 107V122Q211 147 187 147H170" fill="none" stroke="#f2e8d8" strokeWidth="5" />
          <rect ref={fillRef} x="47" y="172" width="122" height="58" fill="#c9a56a" clipPath="url(#coffee-cup-clip)" />
          <path d="M36 232H180" stroke="#f2e8d8" strokeWidth="4" />
        </svg>
        <span className="preloader-steam" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <div className="preloader-pct"><span ref={countRef}>0</span><sup>%</sup></div>
      <p className="preloader-label">A little moment, just for you</p>
      <div className="preloader-flood" ref={floodRef} />
    </div>
  )
}

function MagneticButton({ href, children, onClick, className = '', label = children }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const onMove = (event) => {
    if (!ref.current || reduced) return
    const rect = ref.current.getBoundingClientRect()
    const dx = event.clientX - rect.left - rect.width / 2
    const dy = event.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, { x: dx * 0.12, y: dy * 0.16, duration: 0.36, ease: 'power3.out' })
  }
  const reset = () => { if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, .45)' }) }
  const content = <><span className="roll-text"><span>{label}</span><span aria-hidden="true">{label}</span></span><ArrowUpRight size={15} /></>
  if (href) return <a ref={ref} className={`magnetic-cta ${className}`} href={href} onClick={onClick} onMouseMove={onMove} onMouseLeave={reset}>{content}</a>
  return <button ref={ref} className={`magnetic-cta ${className}`} onClick={onClick} onMouseMove={onMove} onMouseLeave={reset}>{content}</button>
}

function Header({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  const nav = [['The day', 'home'], ['Menu', 'menu'], ['Our room', 'gallery'], ['Find us', 'contact']]
  return (
    <header className={`journey-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="journey-brand" href="#home" aria-label="Bistro 57 home"><span>57</span><strong>Bistro</strong></a>
      <nav className="journey-links" aria-label="Main navigation">{nav.map(([title, id]) => <a key={id} href={`#${id}`}>{title}</a>)}</nav>
      <a className="order-pill" href="#reservation">Save me a seat <ArrowUpRight size={14} /></a>
      <button className="cart-button" aria-label={`Current order, ${cartCount} items`} onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}><ShoppingBag size={17} /><span>{cartCount}</span></button>
      <button className="mobile-nav-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X /> : <MenuIcon />}</button>
      <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav-drawer" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} aria-label="Mobile navigation">{nav.map(([title, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{title}<ArrowUpRight size={14} /></a>)}<a href="#reservation" onClick={() => setMenuOpen(false)}>Reserve a table <ArrowUpRight size={14} /></a></motion.nav>}</AnimatePresence>
    </header>
  )
}

function TimeDial({ active }) {
  const icons = [Sun, Sun, Sunset, Moon]
  const Icon = icons[active] || Sun
  return (
    <aside className="time-dial" aria-label={`Time of day: ${stories[active].name}`}>
      <span className="dial-time">{stories[active].time}</span>
      <div className="dial-track"><span className="dial-progress" style={{ top: `${active * 33.333}%` }} /><i /><i /><i /><i /></div>
      <Icon className="dial-icon" size={15} strokeWidth={1.4} />
      <span className="dial-label">{stories[active].name}</span>
    </aside>
  )
}

function Hero() {
  const titleRef = useRef(null)
  const cursorRef = useRef(null)
  const beans = useMemo(() => Array.from({ length: 12 }, (_, index) => ({
    left: `${8 + ((index * 37) % 86)}%`,
    top: `${12 + ((index * 19) % 76)}%`,
    '--bean-delay': `${(index % 5) * -1.3}s`,
    '--bean-duration': `${12 + (index % 4) * 3}s`,
    '--bean-size': `${5 + (index % 3) * 3}px`,
    '--drift': index % 2 ? 1 : -1,
  })), [])
  const webgl = useWebGL()

  useEffect(() => {
    const title = titleRef.current
    const letters = title?.querySelectorAll('.kinetic-letter')
    if (!title || !letters?.length) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) gsap.fromTo(letters, { yPercent: 120, rotateX: -45, opacity: 0 }, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.25, stagger: 0.045, delay: 0.1, ease: 'power4.out' })
    const move = (event) => {
      if (reduce) return
      const rect = title.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      gsap.to(letters, { x: (_, element) => px * ((Array.from(letters).indexOf(element) % 3) + 1) * 5, y: py * 6, duration: 0.45, stagger: 0.006, overwrite: 'auto', ease: 'power2.out' })
      if (cursorRef.current) gsap.to(cursorRef.current, { x: px * 10, y: py * 8, duration: 0.5, ease: 'power3.out' })
    }
    const reset = () => gsap.to(letters, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,.5)' })
    title.addEventListener('pointermove', move)
    title.addEventListener('pointerleave', reset)
    return () => { title.removeEventListener('pointermove', move); title.removeEventListener('pointerleave', reset) }
  }, [])

  return (
    <section className="day-hero" id="home">
      <div className="hero-photo" />
      <div className="hero-shade" />
      <div className="hero-grain" />
      <div className="hero-beans" aria-hidden="true">{beans.map((bean, index) => <i key={index} className="hero-bean" style={bean} />)}</div>
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-eyebrow"><span /> PATEL NAGAR, GWALIOR · EST. FOR YOUR EVERYDAY</p>
          <h1 className="kinetic-title" ref={titleRef} aria-label="Bistro 57">
            <span className="kinetic-line">{'BISTRO'.split('').map((letter, index) => <span className="letter-mask" key={index}><span className="kinetic-letter">{letter}</span></span>)}</span>
            <span className="kinetic-line title-second"><span className="letter-mask"><span className="kinetic-letter">57</span></span><span className="title-period">.</span></span>
          </h1>
          <p className="hero-deck">A day moves a little differently when you give it room to breathe.</p>
          <div className="hero-cta-row"><MagneticButton href="#story">Come on in</MagneticButton><a className="hero-menu-link" href="#menu">Take a look around <ArrowDown size={14} /></a></div>
          <div className="hero-social-proof"><span className="review-stars">★★★★★</span><strong>4.8</strong><span>From 4,774 lovely visits</span></div>
        </div>
        <div className="hero-object" ref={cursorRef} data-cursor="coffee" aria-hidden="true">
          {webgl ? <CanvasBoundary fallback={<img className="cup-fallback" src={photoUrl('photo-1461023058943-07fcbe16d735', 720)} alt="" />}><Suspense fallback={<img className="cup-fallback" src={photoUrl('photo-1461023058943-07fcbe16d735', 720)} alt="" />}><CoffeeCupCanvas className="cup-canvas" /></Suspense></CanvasBoundary> :
            <div className="cup-fallback-wrap"><img className="cup-fallback" src={photoUrl('photo-1461023058943-07fcbe16d735', 720)} alt="" /><span className="cup-steam" /></div>}
          <span className="hero-object-caption">THE FIRST POUR <i /> 09:00 AM</span>
        </div>
      </div>
      <div className="hero-bottomline"><span>DINE-IN <i /> DRIVE-THROUGH <i /> NO-CONTACT DELIVERY</span><span>SCROLL INTO OUR DAY · 01 — 04</span></div>
      <a className="hero-scroll-cue" href="#story" aria-label="Scroll into Bistro 57"><ArrowDown size={16} /></a>
      <span className="hero-edge-note">A LITTLE CORNER. A WHOLE DAY.</span>
    </section>
  )
}

function ChapterIntro() {
  return (
    <section className="chapter-intro">
      <p className="eyebrow"><span /> NOT A PLACE TO PASS THROUGH</p>
      <p className="chapter-statement">Come in for a coffee.<br /><em>Leave with a little more time.</em></p>
      <span className="chapter-side-note">A day inside Bistro 57 — Gwalior</span>
    </section>
  )
}

function StoryJourney({ onTimeChange }) {
  const sectionRef = useRef(null)
  const panelsRef = useRef([])
  const activeRef = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const panels = panelsRef.current.filter(Boolean)
    if (!section || panels.length < 2 || reduced || window.matchMedia('(max-width: 899px)').matches) return
    gsap.set(panels.slice(1), { autoAlpha: 0, yPercent: 5 })
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * (panels.length - 1)}`,
        pin: section.querySelector('.story-stage'),
        scrub: reduced ? false : 0.16,
        anticipatePin: 1,
        onUpdate: (self) => {
          const next = Math.min(panels.length - 1, Math.floor(self.progress * panels.length))
          if (activeRef.current !== next) {
            activeRef.current = next
            onTimeChange?.(next)
          }
        },
      },
    })
    panels.forEach((panel, index) => {
      if (index === 0) return
      timeline.to(panels[index - 1], { autoAlpha: 0, yPercent: -4, duration: 0.42, ease: 'none' }, index - 1)
      timeline.fromTo(panel, { autoAlpha: 0, yPercent: 6 }, { autoAlpha: 1, yPercent: 0, duration: 0.42, ease: 'none' }, index - 1)
      timeline.fromTo(panel.querySelector('.story-image img'), { clipPath: 'inset(0 0 0 16%)', scale: 1.06 }, { clipPath: 'inset(0 0 0 0%)', scale: 1, duration: 0.52, ease: 'none' }, index - 1)
    })
    const counter = section.querySelector('.story-counter')
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (panels.length - 1)}`,
      onUpdate: (self) => {
        if (counter) counter.textContent = `0${Math.min(4, Math.floor(self.progress * 4) + 1)}`
      },
    })
    return () => { timeline.scrollTrigger?.kill(); timeline.kill(); ScrollTrigger.getAll().filter((item) => item.trigger === section).forEach((item) => item.kill()) }
  }, [onTimeChange, reduced])

  useEffect(() => {
    if (!window.matchMedia('(max-width: 899px), (prefers-reduced-motion: reduce)').matches) return
    const panels = sectionRef.current?.querySelectorAll('.story-mobile-panel')
    if (!panels?.length) return
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const next = Array.from(panels).indexOf(visible.target)
      activeRef.current = next
      onTimeChange?.(next)
    }, { threshold: [0.35, 0.6] })
    panels.forEach((panel) => observer.observe(panel))
    return () => observer.disconnect()
  }, [onTimeChange])

  return (
    <section className="story-runway" id="story" ref={sectionRef} aria-label="A day at Bistro 57">
      <div className="story-stage">
        {stories.map((story, index) => (
          <article className={`story-panel story-panel-${story.name.toLowerCase().replace(' ', '-')}`} key={story.name} ref={(element) => { panelsRef.current[index] = element }}>
            <div className="story-image"><img src={photoUrl(story.image, 1600)} alt={story.alt} loading={index < 2 ? 'eager' : 'lazy'} /></div>
            <div className="story-copy">
              <p className="story-time"><span />{story.time} <i /> GWALIOR, INDIA</p>
              <span className="story-marker">{story.marker}</span>
              <h2>{story.title}</h2>
              <p className="story-description">{story.copy}</p>
              {index === 3 && <MagneticButton href="#reservation" className="story-booking">Stay for one more</MagneticButton>}
              <span className="story-index">0{index + 1} <i>/</i> 04</span>
            </div>
          </article>
        ))}
        <div className="story-rail"><span className="story-counter">01</span><span className="story-rail-line" /><span>THE HOURS BETWEEN</span></div>
      </div>
      <div className="story-mobile">
        {stories.map((story, index) => <article className="story-mobile-panel" key={story.name}>
          <img src={photoUrl(story.image, 1000)} alt={story.alt} loading="lazy" />
          <div><span className="story-time">{story.time} · {story.name}</span><h2>{story.title}</h2><p>{story.copy}</p></div>
        </article>)}
      </div>
    </section>
  )
}

function MenuHall({ onSelect }) {
  const [category, setCategory] = useState('All')
  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const chipsRef = useRef([])
  const previousFlip = useRef(null)
  const reduced = useReducedMotion()
  const visibleItems = useMemo(() => {
    const matches = (item) => {
      if (category === 'All') return true
      if (category === 'Coffee') return item.category === 'Coffee & Shakes'
      if (category === 'Mojitos') return item.category === 'Mojitos & Coolers'
      if (category === 'Sizzlers') return item.category === 'Sizzlers & Starters'
      if (category === 'Desserts') return item.category === 'Desserts'
      return item.category === category
    }
    return menuItems.filter(matches)
  }, [category])

  useEffect(() => {
    if (previousFlip.current) {
      Flip.from(previousFlip.current, { duration: 0.65, ease: 'power3.inOut', absolute: false, stagger: 0.035, onComplete: () => ScrollTrigger.refresh() })
      previousFlip.current = null
    }
  }, [visibleItems])

  useEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return
    const context = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth)
        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            pin: viewport,
            scrub: 0.16,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
      })
      return () => mm.revert()
    }, section)
    const refresh = () => ScrollTrigger.refresh()
    const observer = new ResizeObserver(refresh)
    observer.observe(viewport)
    observer.observe(track)
    return () => { observer.disconnect(); context.revert() }
  }, [visibleItems])

  const selectCategory = (event, name) => {
    previousFlip.current = Flip.getState('.dish-panel')
    setCategory(name)
    chipsRef.current.forEach((chip) => chip?.classList.remove('is-active'))
    event.currentTarget.classList.add('is-active')
    gsap.fromTo(event.currentTarget, { scale: 0.94 }, { scale: 1, duration: 0.45, ease: 'back.out(2)' })
  }

  return (
    <section className="menu-hall" id="menu" ref={sectionRef}>
      <div className="menu-hall-pin" ref={viewportRef}>
        <div className="menu-hall-top">
          <div><p className="eyebrow"><span /> SOMETHING GOOD, RIGHT THIS WAY</p><h2>At the centre<br />of <em>the table.</em></h2></div>
          <p className="menu-hall-aside">Made for passing around.<br />Made to order, always.</p>
          <span className="menu-hall-progress"><i /> SCROLL TO EXPLORE</span>
        </div>
        <div className="menu-filters" role="tablist" aria-label="Filter dishes by type">
          {menuCategories.map((name, index) => <button key={name} ref={(element) => { chipsRef.current[index] = element }} role="tab" aria-selected={category === name} className={category === name ? 'is-active' : ''} onClick={(event) => selectCategory(event, name)}>{name}</button>)}
        </div>
        <div className="dish-window"><div className="dish-track" ref={trackRef}>
          {visibleItems.map((item, index) => <article className="dish-panel" key={item.name} data-cursor="fork" onClick={() => onSelect(item)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onSelect(item) }} role="button" tabIndex={0} aria-label={`View ${item.name}, ${item.price}`}>
            <div className="dish-photo"><img src={item.image} alt={item.name} loading="lazy" /><span className="dish-photo-index">B57 · {String(index + 1).padStart(2, '0')}</span><span className="ingredient-orbit"><i>✳</i><i>✳</i><i>✳</i></span><span className="dish-open"><ArrowUpRight size={18} /></span></div>
            <div className="dish-info"><span className="dish-category">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><span className="dish-price">{item.price}<small> · VEG</small></span></div>
          </article>)}
        </div></div>
      </div>
    </section>
  )
}

function DishSpotlight({ item, onClose, onAdd }) {
  const webgl = useWebGL()
  const closeRef = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', closeOnEscape)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', closeOnEscape); previous?.focus?.() }
  }, [onClose])
  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div className="dish-spotlight" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }} role="dialog" aria-modal="true" aria-label={`${item.name} details`}>
        <motion.article className="spotlight-card" initial={{ opacity: 0, y: 36, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.98 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <button ref={closeRef} className="spotlight-close" onClick={onClose} aria-label="Close dish details"><X size={20} /></button>
          <div className="spotlight-art"><img src={item.image} alt={item.name} /><span className="spotlight-art-shade" />{webgl ? <CanvasBoundary fallback={null}><Suspense fallback={null}><DishCanvas className="dish-canvas" /></Suspense></CanvasBoundary> : null}<span className="spotlight-art-caption">A BISTRO 57 FAVORITE · {item.category.toUpperCase()}</span></div>
          <div className="spotlight-copy"><span className="eyebrow">A LITTLE SOMETHING FROM OUR KITCHEN</span><h2>{item.name}</h2><p>{item.description} Freshly prepared and made for sharing.</p>
            <div className="ingredient-list"><span>IN THE MIX</span><i /><b>{item.category.includes('Pasta') ? 'Pasta · slow sauce · herbs · parmesan' : item.category.includes('Coffee') ? 'Fresh espresso · chilled milk · a little sweetness' : item.category.includes('Mojito') ? 'Fresh mint · lime · soda · ice' : 'Seasonal produce · house seasoning · a little love'}</b></div>
            <strong className="spotlight-price">{item.price}</strong><button className="magnetic-cta add-order" onClick={(event) => onAdd(item, event.currentTarget)}><span className="roll-text"><span>Add to your order</span><span aria-hidden="true">Add to your order</span></span><ShoppingBag size={15} /></button><small className="spotlight-note">Dine-in, drive-through & no-contact delivery</small>
          </div>
        </motion.article>
      </motion.div>
    </AnimatePresence>
  )
}

function StoryStats() {
  return (
    <section className="story-stats">
      <div className="stats-lead"><p className="eyebrow"><span /> THE KIND OF PLACE YOU COME BACK TO</p><h2>Not just a stop.<br /><em>A little ritual.</em></h2><span className="welcome-note"><Heart size={13} /> Everyone is welcome at our table · LGBTQ+ friendly</span></div>
      <div className="stats-grid">
        <div><span className="stat-number">4.8<sup>★</sup></span><small>NEIGHBORHOOD RATING</small></div>
        <div><span className="stat-number">4,774<sup>+</sup></span><small>GOOGLE REVIEWS</small></div>
        <div><span className="stat-number">11<sup>PM</sup></span><small>WE CLOSE, NOT THE STORY</small></div>
      </div>
      <p className="stats-note">A warm welcome, every time. <Heart size={13} /></p>
    </section>
  )
}

function GalleryCanvas() {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, trackX: 0, lastX: 0, lastTime: 0, velocity: 0, moved: false })
  const tweenRef = useRef(null)
  const distanceRef = useRef(0)
  const reduced = useReducedMotion()
  const photos = [...galleryPhotos, ...galleryPhotos]

  const wrapX = (value) => gsap.utils.wrap(-distanceRef.current, 0, value)
  const startLoop = useCallback(() => {
    if (reduced || !trackRef.current || !distanceRef.current) return
    tweenRef.current?.kill()
    const currentX = Number(gsap.getProperty(trackRef.current, 'x')) || 0
    tweenRef.current = gsap.to(trackRef.current, {
      x: -distanceRef.current,
      duration: 48,
      ease: 'none',
      repeat: -1,
      modifiers: { x: (value) => `${wrapX(parseFloat(value))}px` },
      onStart: () => gsap.set(trackRef.current, { x: wrapX(currentX) }),
    })
  }, [reduced])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const resize = () => {
      distanceRef.current = track.scrollWidth / 2
      if (!drag.current.active) startLoop()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(track)
    resize()
    return () => { observer.disconnect(); tweenRef.current?.kill() }
  }, [startLoop])

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    const track = trackRef.current
    if (!track) return
    tweenRef.current?.kill()
    const now = performance.now()
    drag.current = { active: true, startX: event.clientX, trackX: Number(gsap.getProperty(track, 'x')) || 0, lastX: event.clientX, lastTime: now, velocity: 0, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.classList.add('is-dragging')
  }
  const onPointerMove = (event) => {
    const state = drag.current
    if (!state.active || !trackRef.current) return
    const delta = event.clientX - state.startX
    if (Math.abs(delta) > 5) state.moved = true
    const current = wrapX(state.trackX + delta)
    gsap.set(trackRef.current, { x: current })
    const now = performance.now()
    state.velocity = (event.clientX - state.lastX) / Math.max(1, now - state.lastTime)
    state.lastX = event.clientX
    state.lastTime = now
  }
  const onPointerUp = (event) => {
    const state = drag.current
    if (!state.active || !trackRef.current) return
    state.active = false
    event.currentTarget.classList.remove('is-dragging')
    const current = Number(gsap.getProperty(trackRef.current, 'x')) || 0
    tweenRef.current = gsap.to(trackRef.current, {
      x: current + state.velocity * 360,
      duration: 1.2,
      ease: 'power3.out',
      modifiers: { x: (value) => `${wrapX(parseFloat(value))}px` },
      onComplete: startLoop,
    })
    window.setTimeout(() => { state.moved = false }, 0)
  }
  const preventAccidentalClick = (event) => { if (drag.current.moved) { event.preventDefault(); event.stopPropagation() } }

  return (
    <section className="gallery-experience" id="gallery">
      <div className="gallery-experience-head"><div><p className="eyebrow"><span /> SOMETIMES YOU TAKE A LITTLE BIT HOME</p><h2>Keep this<br /><em>part of the day.</em></h2></div><p>Drag the room, the table, a moment.<br />There is always something worth noticing.</p></div>
      <div className="gallery-viewport" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onClickCapture={preventAccidentalClick} data-cursor="view" aria-label="Drag to explore Bistro 57 moments">
        <div className="gallery-track" ref={trackRef}>{photos.map((photo, index) => <figure className={`gallery-frame gallery-frame-${index % galleryPhotos.length}`} key={`${photo.label}-${index}`} aria-hidden={index >= galleryPhotos.length}><img src={photoUrl(photo.src, 780)} alt={index >= galleryPhotos.length ? '' : photo.alt} draggable="false" loading="lazy" /><figcaption><span>0{(index % galleryPhotos.length) + 1}</span>{photo.label}</figcaption></figure>)}</div>
        <span className="gallery-drag-cue">DRAG TO WANDER <ArrowLeft size={13} /><ArrowRight size={13} /></span>
      </div>
    </section>
  )
}

function Reviews() {
  const quotes = [
    'The white sauce pasta was so comforting. We ordered another one for the table.',
    'A really beautiful place to catch up with friends. The lighting is lovely in the evening.',
    'Great food, a menu for every mood, and staff who make you feel at home.',
  ]
  const [index, setIndex] = useState(0)
  return (
    <section className="review-interlude" id="reviews">
      <div className="review-score"><span className="eyebrow">A LITTLE LOVE FROM THE NEIGHBOURHOOD</span><strong>4.8<sup>★</sup></strong><span className="review-stars">★★★★★</span><small>4,774 Google reviews</small><a href="https://www.google.com/search?q=Bistro+57+Gwalior+reviews" target="_blank" rel="noreferrer">Leave us a note <ArrowUpRight size={14} /></a></div>
      <div className="review-quote"><span className="quote-glyph">“</span><AnimatePresence mode="wait"><motion.blockquote key={index} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>{quotes[index]}</motion.blockquote></AnimatePresence><div className="review-switch"><span>GUEST NOTES · 0{index + 1} / 03</span><div><button aria-label="Previous review" onClick={() => setIndex((index + 2) % 3)}><ArrowLeft size={15} /></button><button aria-label="Next review" onClick={() => setIndex((index + 1) % 3)}><ArrowRight size={15} /></button></div></div></div>
    </section>
  )
}

function Reservation({ cartItems }) {
  const [sent, setSent] = useState(false)
  const reserve = (event) => {
    event.preventDefault()
    if (!event.currentTarget.reportValidity()) return
    setSent(true)
  }
  const orderMessage = cartItems.length
    ? `Hello Bistro 57! I'd love to order: ${cartItems.map((item) => item.name).join(', ')}.`
    : 'Hello Bistro 57! I would like to enquire about a table.'

  return (
    <section className="reservation-experience" id="reservation">
      <div className="reservation-aside"><p className="eyebrow"><span /> THERE'S ALWAYS ROOM AT THE TABLE</p><h2>We'll leave<br /><em>a light on.</em></h2><p>Tell us when you are coming. We will put the kettle on (and save the good seat).</p><div className="reserve-quick"><a href={`tel:${PHONE}`}><Phone size={15} /> 078388 28743</a><a href={`${WA}?text=${encodeURIComponent(orderMessage)}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Confirm over WhatsApp</a></div></div>
      <div className="reservation-paper">
        {sent ? <motion.div className="reservation-success" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} role="status"><span>57</span><h3>Lovely. It's a plan.</h3><p>Now send your request to our team to confirm your table.</p><a className="magnetic-cta" href={`${WA}?text=${encodeURIComponent(orderMessage)}`} target="_blank" rel="noreferrer">Confirm on WhatsApp <ArrowUpRight size={15} /></a><button onClick={() => setSent(false)}>Make another request</button></motion.div> :
          <form onSubmit={reserve} className="reserve-form">
            <div className="form-top"><span>MAKE YOURSELF AT HOME</span><small>* REQUIRED</small></div>
            <label>Your name<input name="name" required minLength="2" placeholder="How should we call you?" autoComplete="name" /></label>
            <div className="form-row"><label>Phone<input name="phone" type="tel" required pattern="[+0-9 ()-]{10,16}" placeholder="+91" autoComplete="tel" /></label><label>Guests<select name="guests" defaultValue="2">{Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} {index === 0 ? 'guest' : 'guests'}</option>)}</select></label></div>
            <div className="form-row"><label>Date<input name="date" type="date" required min={new Date().toLocaleDateString('en-CA')} /></label><label>Time<select name="time" required defaultValue=""><option value="" disabled>Pick a time</option>{['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'].map((time) => <option key={time}>{time}</option>)}</select></label></div>
            <label>Anything special? <textarea name="request" rows="2" maxLength="300" placeholder="A birthday? Your favorite corner? Tell us..." /></label>
            <button type="submit" className="magnetic-cta reservation-submit"><span className="roll-text"><span>Request a table</span><span aria-hidden="true">Request a table</span></span><ArrowUpRight size={15} /></button>
            <small className="reservation-fineprint">Our team will confirm your booking by phone or WhatsApp.</small>
          </form>}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="visit-experience" id="contact">
      <div className="visit-head"><div><p className="eyebrow"><span /> AND WHEN YOU'RE READY FOR YOUR OWN TABLE</p><h2>Find your way<br /><em>to us.</em></h2></div><a className="map-direction" href={MAPS} target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={15} /></a></div>
      <div className="visit-grid">
        <div className="visit-details">
          <article><MapPin size={17} /><div><span>COME FIND US</span><p>B-99, City Center, Patel Nagar,<br />Gwalior, Madhya Pradesh 474002</p><small>PLUS CODE · 655R+J8 GWALIOR</small></div></article>
          <article><Clock3 size={17} /><div><span>WHEN THE DOOR IS OPEN</span><p>Every day · 11:00 AM – 11:00 PM</p><small>Hours may change on festivals.</small></div></article>
          <article><Phone size={17} /><div><span>GIVE US A RING</span><a href={`tel:${PHONE}`}>078388 28743</a><small>Dine-in · Drive-through · Delivery</small></div></article>
          <article><Instagram size={17} /><div><span>KEEP IN TOUCH</span><a href="https://www.instagram.com/bistro57gwalior/" target="_blank" rel="noreferrer">@bistro57gwalior <ArrowUpRight size={13} /></a><small>A little more of our everyday.</small></div></article>
        </div>
        <a className="map-card" href={MAPS} target="_blank" rel="noreferrer" aria-label="Get directions to Bistro 57 in Gwalior"><iframe title="Bistro 57, Patel Nagar, Gwalior map" src="https://maps.google.com/maps?q=Bistro%2057%2C%20City%20Center%2C%20Gwalior&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex="-1" /><span><MapPin size={14} /> BISTRO 57 · GWALIOR</span></a>
      </div>
    </section>
  )
}

function Footer() {
  return <footer className="journey-footer"><a className="footer-wordmark" href="#home"><span>57</span><strong>Bistro</strong></a><p>A place to be.<br />A moment to keep.</p><a className="footer-insta" href="https://www.instagram.com/bistro57gwalior/" target="_blank" rel="noreferrer"><Instagram size={15} /> FOLLOW THE LITTLE MOMENTS <ArrowUpRight size={13} /></a><span>© 2026 BISTRO 57 · MADE SLOWLY IN GWALIOR</span></footer>
}

function FloatingActions() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const update = () => setShow(window.scrollY > 280)
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <AnimatePresence>{show && <motion.div className="quick-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}><a href={`tel:${PHONE}`} aria-label="Call Bistro 57"><Phone size={17} /></a><a href={`${WA}?text=${encodeURIComponent('Hello Bistro 57! I would like to enquire.')}`} target="_blank" rel="noreferrer" aria-label="Message Bistro 57"><MessageCircle size={18} /></a></motion.div>}</AnimatePresence>
}

function CustomCursor() {
  const blobRef = useRef(null)
  const labelRef = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let x = -100, y = -100
    const move = (event) => {
      x = event.clientX
      y = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        gsap.to(blobRef.current, { x, y, duration: 0.32, ease: 'power3.out', overwrite: 'auto' })
        gsap.to(labelRef.current, { x, y, duration: 0.48, ease: 'power3.out', overwrite: 'auto' })
        frame = 0
      })
    }
    const enter = (event) => {
      const target = event.target.closest('[data-cursor]')
      blobRef.current?.classList.toggle('cursor-hover', Boolean(target))
      blobRef.current?.classList.toggle('cursor-view', target?.dataset.cursor === 'view')
      blobRef.current?.classList.toggle('cursor-menu', target?.dataset.cursor === 'fork')
      labelRef.current.textContent = target?.dataset.cursor === 'view' ? 'DRAG' : target?.dataset.cursor === 'fork' ? 'TASTE' : target?.dataset.cursor === 'coffee' ? 'SIP' : ''
      labelRef.current.classList.toggle('visible', Boolean(target?.dataset.cursor))
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', enter)
    document.addEventListener('pointerout', enter)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerover', enter); document.removeEventListener('pointerout', enter); cancelAnimationFrame(frame) }
  }, [])
  return <><span className="cursor-blob" ref={blobRef} aria-hidden="true" /><span className="cursor-label" ref={labelRef} aria-hidden="true" /></>
}

export {
  CanvasBoundary,
  Contact,
  CustomCursor,
  DishSpotlight,
  FloatingActions,
  Footer,
  GalleryCanvas,
  Header,
  Hero,
  MagneticButton,
  MenuHall,
  Preloader,
  Reservation,
  Reviews,
  StoryJourney,
  StoryStats,
  TimeDial,
  ChapterIntro,
}
