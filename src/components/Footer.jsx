import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const techChips = [
  'Node.js + Express',
  'PostgreSQL + Prisma',
  'Twilio WhatsApp API',
  'Groq · LLaMA 3.3 70B',
  'AWS Lambda Ready',
  'HIPAA-conscious Design',
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      {/* CTA */}
      <section className="bg-navy py-24 px-8 md:px-16 text-center relative overflow-hidden" ref={ref}>
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-sky/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            Ready to Transform Your Clinic?
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-2xl mx-auto leading-tight mb-5">
            Stop answering the same WhatsApp messages every day.
          </h2>
          <p className="text-white/45 text-base max-w-lg mx-auto mb-10 leading-relaxed">
            MediAssist AI handles it — so you only talk to patients who truly need your attention.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-accent text-navy font-bold px-10 py-4 rounded-xl text-base hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent/40 transition-all duration-200"
          >
            🚀 Book a Free Demo
          </a>

          {/* Tech chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-14"
          >
            {techChips.map((chip, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-white/6 border border-white/10 text-white/45 text-xs font-medium"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer bar */}
      <footer className="bg-navy border-t border-white/6 px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-serif text-white text-lg font-bold">
          Medi<span className="text-accent">·</span>Assist AI
        </span>
        <span className="text-white/30 text-xs">
          © 2026 MediAssist AI · Built for Indian Clinics · WhatsApp-Native
        </span>
      </footer>
    </>
  )
}
