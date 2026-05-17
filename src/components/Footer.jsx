import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

// const techChips = [
//   'Node.js + Express',
//   'PostgreSQL + Prisma',
//   'Twilio WhatsApp API',
//   'Groq · LLaMA 3.3 70B',
//   'AWS Lambda Ready',
//   'HIPAA-conscious Design',
// ]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <>
      {/* CTA */}
      <section className="bg-navy px-8 md:px-16 py-24 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 font-semibold text-slate-400 text-xs uppercase tracking-widest">
            Ready to Deploy?
          </div>
          <h2 className="mx-auto mb-5 max-w-2xl font-serif font-bold text-white text-4xl md:text-5xl leading-tight">
            Stop answering the same WhatsApp messages every day.
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-white/45 text-base leading-relaxed">
            MediAssist runs the communication layer of your clinic — so you only engage when medicine requires it.
          </p>
          <a
            href="#book-demo"
            className="inline-block bg-white text-navy px-10 py-3.5 rounded-lg font-semibold text-sm transition-colors hover:bg-slate-100 duration-200"
          >
            Book a Demo
          </a>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mt-16"
          >
            {['Node.js + Express', 'PostgreSQL + Prisma', 'Twilio WhatsApp API', 'Groq · LLaMA 3.3 70B', 'Railway · Production', 'Privacy-first Architecture'].map((chip, i) => (
              <span
                key={i}
                className="px-3 py-1 border border-white/8 rounded text-white/30 text-xs font-mono"
              >
                {chip}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer bar */}
      <footer className="flex md:flex-row flex-col justify-between items-center gap-3 bg-navy px-8 md:px-16 py-5 border-t border-white/8">
        <span className="font-serif font-bold text-white text-base tracking-tight">
          MediAssist
        </span>
        <span className="text-white/25 text-xs">
          © 2026 MediAssist · WhatsApp-Native Clinic Operating System · Built for Indian Clinics
        </span>
      </footer>
    </>
  )
}
