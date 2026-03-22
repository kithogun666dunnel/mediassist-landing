import { motion } from 'framer-motion'
import PhoneMockup from './PhoneMockup'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const stats = [
  { num: '30+', label: 'Messages Automated / Day' },
  { num: '24/7', label: 'Always On' },
  { num: '~3s', label: 'Avg. Response Time' },
]

export default function Hero() {
  return (
    <section
      id="us"
      className="relative items-center gap-12 grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-light via-white to-pale px-8 md:px-16 pt-28 pb-20 min-h-screen overflow-hidden"
    >
      {/* BG blobs */}
      <div className="top-[-150px] right-[-150px] absolute bg-sky/10 blur-3xl rounded-full w-[600px] h-[600px] animate-pulse pointer-events-none" />
      <div className="bottom-[-100px] left-[-80px] absolute bg-accent/8 blur-3xl rounded-full w-[400px] h-[400px] pointer-events-none" />

      {/* LEFT */}
      <div className="z-10 relative">
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-accent/10 mb-7 px-4 py-2 border border-accent/30 rounded-full font-semibold text-emerald-700 text-xs uppercase tracking-widest">
          <span className="bg-accent rounded-full w-2 h-2 animate-pulse" />
          Live MVP · WhatsApp-Native
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} className="mb-6 font-serif font-bold text-navy text-4xl md:text-5xl leading-[1.12]">
          Your Clinic's{' '}
          <span className="inline-block relative text-blue">
            AI Receptionist
            <span className="right-0 bottom-1 left-0 absolute bg-gradient-to-r from-sky to-accent rounded-full h-[3px]" />
          </span>{' '}
          on WhatsApp
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="mb-10 max-w-[480px] text-[1.05rem] text-gray-500 leading-relaxed">
          MediAssist AI handles patient queries, books appointments, and flags urgent cases — automatically, 24/7. So doctors can focus on what matters: healing patients.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4">
          <a
            href="#the-flow"
            className="bg-navy shadow-lg hover:shadow-xl px-8 py-3.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 duration-200"
          >
            ↓ See How It Works
          </a>
          <a
            href="#what-it-does"
            className="hover:bg-pale px-7 py-3.5 border border-navy/15 hover:border-blue rounded-xl font-medium text-navy transition-all duration-200"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)} className="flex items-center gap-8 mt-14">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-8">
              <div>
                <div className="font-serif font-bold text-navy text-3xl">{s.num}</div>
                <div className="mt-0.5 font-semibold text-[11px] text-gray-400 uppercase tracking-wider">{s.label}</div>
              </div>
              {i < stats.length - 1 && <div className="bg-navy/10 w-px h-10" />}
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