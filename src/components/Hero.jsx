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
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-8 md:px-16 pt-28 pb-20 relative overflow-hidden bg-gradient-to-br from-light via-white to-pale">
      {/* BG blobs */}
      <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] rounded-full bg-sky/10 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-80px] w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      {/* LEFT */}
      <div className="relative z-10">
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-emerald-700 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-7">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Live MVP · WhatsApp-Native
        </motion.div>

        <motion.h1 {...fadeUp(0.1)} className="font-serif text-4xl md:text-5xl font-bold text-navy leading-[1.12] mb-6">
          Your Clinic's{' '}
          <span className="text-blue relative inline-block">
            AI Receptionist
            <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-sky to-accent rounded-full" />
          </span>{' '}
          on WhatsApp
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="text-gray-500 text-[1.05rem] leading-relaxed max-w-[480px] mb-10">
          MediAssist AI handles patient queries, books appointments, and flags urgent cases — automatically, 24/7. So doctors can focus on what matters: healing patients.
        </motion.p>

        <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4">
          <a
            href="#how-it-works"
            className="bg-navy text-white font-semibold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 shadow-lg"
          >
            ↓ See How It Works
          </a>
          <a
            href="#features"
            className="border border-navy/15 text-navy font-medium px-7 py-3.5 rounded-xl hover:bg-pale hover:border-blue transition-all duration-200"
          >
            Explore Features
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)} className="flex items-center gap-8 mt-14">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-8">
              <div>
                <div className="font-serif text-3xl font-bold text-navy">{s.num}</div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mt-0.5">{s.label}</div>
              </div>
              {i < stats.length - 1 && <div className="w-px h-10 bg-navy/10" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — Phone */}
      <div className="relative z-10 hidden md:flex justify-center">
        <PhoneMockup />
      </div>
    </section>
  )
}
