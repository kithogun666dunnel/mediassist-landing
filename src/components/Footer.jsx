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
      <section className="relative bg-navy px-8 md:px-16 py-24 overflow-hidden text-center" ref={ref}>
        <div className="top-[-200px] left-1/2 absolute bg-sky/10 blur-3xl rounded-full w-[700px] h-[700px] -translate-x-1/2 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="z-10 relative"
        >
          <div className="mb-4 font-semibold text-accent text-xs uppercase tracking-widest">
            Ready to Transform Your Clinic?
          </div>
          <h2 className="mx-auto mb-5 max-w-2xl font-serif font-bold text-white text-4xl md:text-5xl leading-tight">
            Stop answering the same WhatsApp messages every day.
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-white/45 text-base leading-relaxed">
            MediAssist AI handles it — so you only talk to patients who truly need your attention.
          </p>
          <a
            href="#pricing"
            className="inline-block bg-accent hover:shadow-2xl hover:shadow-accent/40 px-10 py-4 rounded-xl font-bold text-navy text-base transition-all hover:-translate-y-0.5 duration-200"
          >
            🚀 Book a Free Demo
          </a>

          {/* Tech chips */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-14"
          >
            {techChips.map((chip, i) => (
              <span
                key={i}
                className="bg-white/6 px-4 py-1.5 border border-white/10 rounded-full font-medium text-white/45 text-xs"
              >
                {chip}
              </span>
            ))}
          </motion.div> */}
        </motion.div>
      </section>

      {/* Footer bar */}
      <footer className="flex md:flex-row flex-col justify-between items-center gap-3 bg-navy px-8 md:px-16 py-6 border-white/6 border-t">
        <span className="font-serif font-bold text-white text-lg">
          Medi<span className="text-accent">·</span>Assist AI
        </span>
        <span className="text-white/30 text-xs">
          © 2026 MediAssist AI · Built for Indian Clinics · WhatsApp-Native
        </span>
      </footer>
    </>
  )
}
