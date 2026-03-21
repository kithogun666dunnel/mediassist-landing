import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <div className="flex items-center gap-2">
        <span className="font-serif font-bold text-navy text-xl">
          Medi<span className="text-accent">.</span>Assist AI
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 font-medium text-navy/70 text-sm">
        {[
          { label: 'Features', href: '#features' },
          { label: 'How It Works', href: '#how-it-works' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ].map((item) => (
          <a key={item.label} href={item.href} className="hover:text-blue transition-colors duration-200">
            {item.label}
          </a>
        ))}
      </div>

      <a href="#book-demo" className="bg-navy hover:bg-blue shadow-md px-6 py-2.5 rounded-full font-semibold text-white text-sm transition-colors duration-200">
        Book a Demo →
      </a>
    </motion.nav>
  )
}