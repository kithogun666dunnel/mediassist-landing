import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const bullets = [
  'WhatsApp-first patient coordination',
  'Severity-aware escalation workflows',
  'Founder-supported onboarding',
  'Direct workflow feedback loop',
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="bg-light px-8 md:px-16 py-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">
          Early Access
        </div>
        <h2 className="mb-5 font-serif font-bold text-navy text-4xl leading-tight">
          Early Clinic Pilot Program
        </h2>
        <p className="mb-8 text-gray-500 text-base leading-relaxed">
          Currently onboarding a limited number of clinics for workflow validation and
          operational feedback.
        </p>

        <ul className="mb-10 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-600 text-sm">
              <span className="inline-block bg-accent mt-1.5 rounded-full w-1.5 h-1.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <a
            href="#book-demo"
            className="inline-block bg-navy hover:bg-navy/90 px-7 py-3 rounded-xl font-semibold text-sm text-white transition-colors"
          >
            Request Pilot Access
          </a>
          <a
            href="#book-demo"
            className="inline-block border border-navy/20 hover:border-navy/40 px-7 py-3 rounded-xl font-semibold text-navy text-sm transition-colors"
          >
            Book Demo
          </a>
        </div>
      </motion.div>
    </section>
  )
}
