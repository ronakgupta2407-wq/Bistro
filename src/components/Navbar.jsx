import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'

const links = [
  ['Home', 'home'], ['Menu', 'menu'], ['Gallery', 'gallery'],
  ['Reviews', 'reviews'], ['About', 'about'], ['Contact', 'contact'],
]

export default function Navbar({ darkMode, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.15, 0.4] })
    links.forEach(([, id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const closeMenu = () => setOpen(false)
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Bistro 57 home">
          <span className="brand-mark">57</span><span className="brand-name">Bistro<span> &nbsp;·&nbsp; gwalior</span></span>
        </a>
        <div className="desktop-nav">
          {links.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}>{label}</a>)}
        </div>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={onToggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
          <a className="nav-reserve" href="#reservation">Reserve a table <span>↗</span></a>
          <button className="mobile-menu-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && <motion.div className="mobile-drawer" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
          {links.map(([label, id], index) => <motion.a key={id} href={`#${id}`} onClick={closeMenu} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }}>{label}<span>↗</span></motion.a>)}
          <a className="drawer-reserve" href="#reservation" onClick={closeMenu}>Reserve a table <span>↗</span></a>
        </motion.div>}
      </AnimatePresence>
    </header>
  )
}
