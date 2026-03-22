import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'US', href: '#us' },
  { label: 'WHY US ?', href: '#why-us' },
  { label: 'WHAT IT DOES', href: '#what-it-does' },
  { label: 'THE FLOW', href: '#the-flow' },
  { label: "EAGLE'S EYE", href: '#eagles-eye' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Find which section is currently in view
      const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''))
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        // Section is "active" when its top is above 30% of viewport height
        if (rect.top <= window.innerHeight * 0.3) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-300 ${scrolled
        ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-blue/10'
        : 'bg-transparent'
        }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <a href="#us" onClick={(e) => handleNavClick(e, '#us')}>
          <span className="font-serif font-bold text-navy text-xl">
            Medi<span className="text-accent">.</span>Assist AI
          </span>
        </a>
      </div>

      {/* Nav links */}
      <div className="hidden lg:flex items-center gap-6 font-medium text-navy/60 text-xs">
        {NAV_LINKS.map((item) => {
          const id = item.href.replace('#', '')
          const isActive = activeSection === id
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative py-1 transition-colors duration-200 tracking-wider ${isActive ? 'text-navy' : 'hover:text-navy/90'
                }`}
            >
              {item.label === "EAGLE'S EYE" && (
                <span className="inline-block bg-green-500 mr-1.5 rounded-full w-1.5 h-1.5 align-middle animate-pulse" />
              )}
              {item.label}
              {/* Active underline */}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="right-0 bottom-0 left-0 absolute bg-navy rounded-full h-[2px]"
                />
              )}
            </a>
          )
        })}
      </div>

      {/* CTA */}
      <a
        href="#book-demo"
        onClick={(e) => handleNavClick(e, '#book-demo')}
        className="bg-navy hover:bg-blue shadow-md px-6 py-2.5 rounded-full font-semibold text-white text-sm transition-colors duration-200 shrink-0"
      >
        Book a Demo →
      </a>
    </motion.nav>
  )
}