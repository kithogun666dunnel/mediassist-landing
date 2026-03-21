import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Smartphone, Brain, Zap, Bell } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Smartphone,
    title: 'Patient WhatsApps',
    desc: 'Patient sends any message to the clinic\'s WhatsApp number — query, symptom, or booking request.',
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
    <section id="how-it-works" className="py-24 px-8 md:px-16 bg-white" ref={ref}>
      <div className="text-xs font-semibold uppercase tracking-widest text-sky mb-3">The Flow</div>
      <h2 className="font-serif text-4xl font-bold text-navy max-w-xl leading-tight mb-4">
        From patient message to resolved — in seconds
      </h2>
      <p className="text-gray-500 text-base leading-relaxed max-w-lg mb-20">
        MediAssist works silently in the background, routing every message to the right outcome without doctor intervention.
      </p>

      {/* Steps */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Connector line (desktop only) */}
        <div className="hidden md:block absolute top-9 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-sky to-accent z-0" />

        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Circle */}
              <div className="w-[72px] h-[72px] rounded-full bg-navy text-white flex items-center justify-center mb-5 shadow-lg group-hover:bg-blue transition-colors duration-300 font-serif text-xl font-bold">
                {step.num}
              </div>

              <div className="text-2xl mb-3">
                <Icon size={24} className="text-sky mx-auto" strokeWidth={1.5} />
              </div>

              <h3 className="font-semibold text-navy text-base mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
