import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Smartphone, Brain, Zap, Bell } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Smartphone,
    title: 'Patient WhatsApps',
    desc: "Patient sends any message to the clinic's WhatsApp number — query, symptom, or booking request.",
  },
  {
    num: '02',
    icon: Brain,
    title: 'AI Triages',
    desc: 'LLaMA 3.3 analyzes the message, classifies intent, and determines seriousness within milliseconds.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Auto-Reply / Book',
    desc: 'Routine queries get instant replies. Bookings go through the slot selection flow automatically.',
  },
  {
    num: '04',
    icon: Bell,
    title: 'Doctor Alerted',
    desc: 'Serious cases trigger an immediate WhatsApp alert to the doctor. Everything else runs on autopilot.',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="the-flow" className="bg-white px-8 md:px-16 py-24" ref={ref}>
      <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">The Flow</div>
      <h2 className="mb-4 max-w-xl font-serif font-bold text-navy text-4xl leading-tight">
        From patient message to resolved — in seconds
      </h2>
      <p className="mb-20 max-w-lg text-gray-500 text-base leading-relaxed">
        MediAssist works silently in the background, routing every message to the right outcome without doctor intervention.
      </p>

      <div className="relative gap-8 grid grid-cols-1 md:grid-cols-4">
        {/* Connector line */}
        <div className="hidden md:block top-9 right-[12.5%] left-[12.5%] z-0 absolute bg-gradient-to-r from-sky to-accent h-[2px]" />

        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group z-10 relative flex flex-col items-center text-center"
            >
              <div className="flex justify-center items-center bg-navy group-hover:bg-blue shadow-lg mb-5 rounded-full w-[72px] h-[72px] font-serif font-bold text-white text-xl transition-colors duration-300">
                {step.num}
              </div>
              <div className="mb-3 text-2xl">
                <Icon size={24} className="mx-auto text-sky" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 font-semibold text-navy text-base">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}