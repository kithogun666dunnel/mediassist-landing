import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'US', href: '#us' },
  { label: 'WHY US', href: '#why-us' },
  { label: 'WHAT IT DOES', href: '#what-it-does' },
  { label: 'THE FLOW', href: '#the-flow' },
  { label: 'LIVE DEMO', href: '#live-demo' },
  { label: "EAGLE'S EYE", href: '#eagles-eye' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      const sectionIds = NAV_LINKS.map(l => l.href.replace('#', ''))
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.3) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.getElementById(href.replace('#', ''))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-300 ${scrolled || menuOpen
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-blue/10'
          : 'bg-transparent'
          }`}
      >
        {/* Logo */}
        <a href="#us" onClick={(e) => handleNavClick(e, '#us')} className="shrink-0">
          <span className="font-serif font-bold text-navy text-xl">
            Medi<span className="text-accent">.</span>Assist AI
          </span>
        </a>

        {/* Desktop links */}
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
                {(item.label === "EAGLE'S EYE" || item.label === 'LIVE DEMO') && (
                  <span className="inline-block bg-green-500 mr-1.5 rounded-full w-1.5 h-1.5 align-middle animate-pulse" />
                )}
                {item.label}
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="#book-demo"
            onClick={(e) => handleNavClick(e, '#book-demo')}
            className="bg-navy hover:bg-blue shadow-md px-6 py-2.5 rounded-full font-semibold text-white text-sm transition-colors duration-200 shrink-0"
          >
            Book a Demo →
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex justify-center items-center hover:bg-pale border border-navy/15 rounded-full w-9 h-9 text-navy transition-all duration-200"
          >
            {menuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="lg:hidden z-40 fixed inset-0 bg-navy/20 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden top-[65px] right-4 left-4 z-50 fixed bg-white shadow-xl border border-navy/8 rounded-2xl overflow-hidden"
            >
              {/* Nav links */}
              <div className="px-4 py-3">
                {NAV_LINKS.map((item, i) => {
                  const id = item.href.replace('#', '')
                  const isActive = activeSection === id
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium tracking-wider transition-colors duration-150 ${isActive
                        ? 'bg-navy/5 text-navy'
                        : 'text-navy/60 hover:text-navy hover:bg-slate-50'
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        {(item.label === "EAGLE'S EYE" || item.label === 'LIVE DEMO') && (
                          <span className="bg-green-500 rounded-full w-1.5 h-1.5 animate-pulse" />
                        )}
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="bg-navy rounded-full w-1.5 h-1.5" />
                      )}
                    </motion.a>
                  )
                })}
              </div>

              {/* Divider */}
              <div className="bg-navy/6 mx-4 h-px" />

              {/* CTAs */}
              <div className="flex flex-col gap-2 p-4">
                <motion.button
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={() => { setMenuOpen(false); navigate('/dashboard') }}
                  className="flex justify-center items-center gap-2 hover:bg-pale py-3 border border-navy/15 rounded-xl w-full font-semibold text-navy text-sm transition-all duration-200"
                >
                  <span className="bg-green-500 rounded-full w-1.5 h-1.5 animate-pulse" />
                  Open Dashboard
                </motion.button>

                <motion.a
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 }}
                  href="#book-demo"
                  onClick={(e) => handleNavClick(e, '#book-demo')}
                  className="flex justify-center items-center bg-navy hover:bg-blue py-3 rounded-xl w-full font-semibold text-white text-sm transition-all duration-200"
                >
                  Book a Demo →
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}