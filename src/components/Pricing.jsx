import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const bullets = [
  'Runs on WhatsApp — zero new apps for patients or staff',
  'Clinical safety architecture built in — S1–S5 severity, ACK system, crisis bypass',
  'Direct access to founders during setup and beyond',
  'Customized to your clinic\'s specific patient protocols',
]

const timeline = [
  { marker: 'Day 0', text: '20-minute onboarding call — we configure everything' },
  { marker: 'Day 0', text: 'System goes live on your existing WhatsApp number' },
  { marker: 'Day 1', text: 'Full clinic operation — patients messaging, AI triaging' },
  { marker: 'Week 2', text: 'Fully autonomous — no intervention needed' },
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
          Get Operational in One Day
        </h2>
        <p className="mb-8 text-gray-500 text-base leading-relaxed">
          Limited availability for initial clinic deployments. Setup in one business day. No contracts.
        </p>

        <ul className="mb-10 space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-600 text-sm">
              <span className="inline-block bg-accent mt-1.5 rounded-full w-1.5 h-1.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mb-10 p-6 bg-white border border-slate-200 rounded-xl">
          <div className="mb-4 font-semibold text-slate-400 text-xs uppercase tracking-wider">Deployment Timeline</div>
          <div className="flex flex-col gap-3">
            {timeline.map(({ marker, text }) => (
              <div key={text} className="flex items-start gap-4">
                <span className="font-mono font-bold text-navy text-xs shrink-0 w-14">{marker}</span>
                <span className="text-gray-500 text-sm leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="#book-demo"
            className="inline-block bg-navy hover:bg-navy/90 px-7 py-3 rounded-xl font-semibold text-sm text-white transition-colors"
          >
            Request Access
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
