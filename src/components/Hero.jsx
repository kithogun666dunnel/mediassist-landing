import { motion } from 'framer-motion'
import PhoneMockup from './PhoneMockup'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const stats = [
  { num: '91%', label: 'Messages Handled Without Doctor' },
  { num: 'S1–S5', label: 'Deterministic Severity Ladder' },
  { num: '<10s', label: 'Crisis Alert Delivery' },
]

export default function Hero() {
  return (
    <section
      id="us"
      className="relative items-center gap-16 grid grid-cols-1 md:grid-cols-2 bg-white border-b border-slate-100 px-8 md:px-16 pt-28 pb-20 min-h-screen"
    >
      {/* LEFT */}
      <div className="z-10 relative">
        {/* Operational status tag — flat, no rounded-full pill */}
        <motion.div
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 border border-slate-200 rounded-md bg-slate-50"
        >
          <span className="bg-emerald-500 rounded-full w-1.5 h-1.5" />
          <span className="font-medium text-slate-600 text-xs tracking-wide">WhatsApp-Native · Production-Deployed</span>
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} className="mb-6 font-serif font-bold text-navy text-4xl md:text-5xl leading-[1.08]">
          Your Clinic's{' '}
          <span className="relative text-blue">
            Operating System
            <span className="right-0 -bottom-1 left-0 absolute bg-blue/20 rounded-full h-[3px]" />
          </span>
          {' '}on WhatsApp
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="mb-10 max-w-[480px] text-base text-slate-500 leading-relaxed">
          Handles 91% of patient messages automatically. Escalates the rest to you — without exception.{' '}
          <span className="text-slate-400">Deterministic severity routing. Doctor ACK system. Full audit trail. Zero new apps.</span>
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-3">
          <a
            href="#the-flow"
            className="bg-navy px-7 py-3 rounded-lg font-semibold text-white text-sm transition-colors hover:bg-blue duration-200"
          >
            See How It Works →
          </a>
          <a
            href="/dashboard"
            className="px-7 py-3 border border-slate-200 rounded-lg font-medium text-slate-700 text-sm hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
          >
            View Live Dashboard
          </a>
        </motion.div>

        {/* Stats — dense, operational */}
        <motion.div {...fadeUp(0.4)} className="flex items-center gap-0 mt-14 border-t border-slate-100 pt-8">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className="pr-8">
                <div className="font-serif font-bold text-navy text-2xl tracking-tight">{s.num}</div>
                <div className="mt-0.5 font-medium text-[11px] text-slate-400 uppercase tracking-wider leading-tight">{s.label}</div>
              </div>
              {i < stats.length - 1 && <div className="bg-slate-200 w-px h-8 mr-8" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — Phone */}
      <div className="hidden z-10 relative md:flex justify-center">
        <PhoneMockup />
      </div>
    </section>
  )
}