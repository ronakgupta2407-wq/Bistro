import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Leaf } from 'lucide-react'

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export function Reveal({ children, className = '', delay = 0, ...props }) {
  const shouldReduceMotion = useReducedMotion()
  const variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 32, filter: shouldReduceMotion ? 'blur(0px)' : 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: shouldReduceMotion ? 0 : 0.9, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <Reveal className={`section-heading ${centered ? 'centered' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </Reveal>
  )
}

export function Button({ children, href, onClick, variant = 'primary', className = '', ...props }) {
  const content = <>{children}<ArrowRight size={15} aria-hidden="true" /></>
  const classes = `button button-${variant} ${className}`
  if (href) return <a className={classes} href={href} onClick={onClick} {...props}>{content}</a>
  return <button className={classes} onClick={onClick} {...props}>{content}</button>
}

export function MenuCard({ item }) {
  return (
    <motion.article
      className="menu-card"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="menu-card-image">
        <img src={item.image} alt={item.name} loading="lazy" />
        <span className="veg-badge"><Leaf size={10} /> Veg</span>
        {item.popular && <span className="popular-badge">Signature</span>}
      </div>
      <div className="menu-card-copy">
        <div className="menu-title-row"><h3>{item.name}</h3><span>{item.price}</span></div>
        <p>{item.description}</p>
        <span className="menu-category">{item.category}</span>
      </div>
    </motion.article>
  )
}

export function RoundArrow({ onClick, label = 'Scroll to next' }) {
  return <button className="round-arrow" onClick={onClick} aria-label={label}><ArrowDownRight size={19} /></button>
}
