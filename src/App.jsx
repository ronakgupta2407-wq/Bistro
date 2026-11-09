import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ChapterIntro, Contact, CustomCursor, DishSpotlight, FloatingActions,
  Footer, GalleryCanvas, Header, Hero, MenuHall, Preloader, Reservation,
  Reviews, StoryJourney, StoryStats, TimeDial,
} from './components/Immersive'

gsap.registerPlugin(ScrollTrigger, Flip)

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'CafeOrCoffeeShop'],
  name: 'Bistro 57',
  alternateName: 'बिस्तरों 57',
  description: 'A cozy cafe in Patel Nagar, Gwalior serving coffee, pasta, mojitos and comforting favorites.',
  telephone: '+91-78388-28743',
  priceRange: '₹200–1,200 per person',
  servesCuisine: ['Cafe', 'Italian', 'Chinese', 'Continental'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'B-99, City Center, Patel Nagar',
    addressLocality: 'Gwalior',
    addressRegion: 'Madhya Pradesh',
    postalCode: '474002',
    addressCountry: 'IN',
  },
  hasMap: 'https://www.google.com/maps/search/?api=1&query=Bistro+57+B-99+City+Center+Patel+Nagar+Gwalior',
  openingHours: 'Mo-Su 11:00-23:00',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '4774' },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Dine-in', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Drive-through', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'No-contact delivery', value: true },
  ],
}

const moodPalettes = [
  { bg: '#f0e2ce', surface: '#faefe0', ink: '#372719', muted: '#796754', accent: '#a87743', line: 'rgba(55,39,25,.15)' },
  { bg: '#e9ddc9', surface: '#f4e9d8', ink: '#33271d', muted: '#746553', accent: '#a97142', line: 'rgba(51,39,29,.14)' },
  { bg: '#806247', surface: '#6e513d', ink: '#fff0d9', muted: '#e2c4a0', accent: '#e5b26e', line: 'rgba(255,240,217,.17)' },
  { bg: '#17120f', surface: '#211914', ink: '#f3e7d6', muted: '#bba48a', accent: '#d8a363', line: 'rgba(243,231,214,.14)' },
]

function useDaylightJourney(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    const main = document.querySelector('.journey-main')
    if (!root || !main) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const from = moodPalettes[0]
    gsap.set(root, Object.fromEntries(Object.entries(from).map(([key, value]) => [`--${key}`, value])))
    if (reduced) return
    const stops = moodPalettes.slice(1)
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: main,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.18,
      },
    })
    stops.forEach((palette, index) => {
      const progress = (index + 1) / moodPalettes.length
      timeline.to(root, {
        ...Object.fromEntries(Object.entries(palette).map(([key, value]) => [`--${key}`, value])),
        duration: 1,
        ease: 'none',
      }, progress)
    })
    return () => { timeline.scrollTrigger?.kill(); timeline.kill() }
  }, [rootRef])
}

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 0.62, smoothWheel: true, wheelMultiplier: 1.15, anchors: true })
    const update = (time) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])
}

export default function App() {
  const rootRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [activeTime, setActiveTime] = useState(0)
  const [selectedDish, setSelectedDish] = useState(null)
  const [cart, setCart] = useState([])

  useSmoothScroll()
  useDaylightJourney(rootRef)

  const handlePreloaderComplete = useCallback(() => setLoading(false), [])
  const handleAddToOrder = useCallback((item, button) => {
    setCart((items) => [...items, item])
    setSelectedDish(null)
    const start = button?.getBoundingClientRect()
    const target = document.querySelector('.cart-button')?.getBoundingClientRect()
    if (start && target) {
      const particle = document.createElement('span')
      particle.className = 'order-flight'
      particle.style.left = `${start.left + start.width / 2}px`
      particle.style.top = `${start.top + start.height / 2}px`
      particle.style.setProperty('--fly-x', `${target.left + target.width / 2 - start.left - start.width / 2}px`)
      particle.style.setProperty('--fly-y', `${target.top + target.height / 2 - start.top - start.height / 2}px`)
      document.body.appendChild(particle)
      particle.addEventListener('animationend', () => particle.remove(), { once: true })
    }
  }, [])
  const handleCloseDish = useCallback(() => setSelectedDish(null), [])

  return (
    <div className="app journey-app" ref={rootRef}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <Header cartCount={cart.length} />
      <TimeDial active={activeTime} />
      <main className="journey-main">
        <Hero />
        <ChapterIntro />
        <StoryJourney onTimeChange={setActiveTime} />
        <MenuHall onSelect={setSelectedDish} />
        <StoryStats />
        <GalleryCanvas />
        <Reviews />
        <Reservation cartItems={cart} />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <CustomCursor />
      {selectedDish && <DishSpotlight item={selectedDish} onClose={handleCloseDish} onAdd={handleAddToOrder} />}
    </div>
  )
}
