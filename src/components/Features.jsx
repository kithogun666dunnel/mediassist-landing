import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, CalendarCheck, AlertTriangle, MessageSquare, Stethoscope, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Triage',
    desc: 'Powered by LLaMA 3.3 70B, the assistant understands patient symptoms, replies intelligently, and escalates serious cases to the doctor instantly.',
    color: 'bg-blue-50 text-blue',
  },
  {
    icon: CalendarCheck,
    title: 'Smart Appointment Booking',
    desc: 'Patients see real-time slots, select a time, and get a confirmed booking — all within WhatsApp. No calls, no waiting.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: AlertTriangle,
    title: 'Serious Case Alerts',
    desc: 'When AI detects a potentially serious symptom, the doctor gets an immediate WhatsApp alert — so critical cases never slip through.',
    color: 'bg-red-50 text-red-500',
  },
  {
    icon: MessageSquare,
    title: 'FAQ Auto-Responder',
    desc: 'Clinic timing, address, fees, doctor availability — common queries answered instantly without any doctor involvement.',
    color: 'bg-sky/10 text-sky',
  },
  {
    icon: Stethoscope,
    title: 'Doctor Command Panel',
    desc: 'Doctors manage slots via WhatsApp commands: ADD, REMOVE, LIST. No dashboard logins — built for busy clinicians.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: ShieldCheck,
    title: 'Full Conversation History',
    desc: 'Every patient interaction is stored securely in PostgreSQL. The AI maintains context across sessions for coherent conversations.',
    color: 'bg-amber-50 text-amber-600',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-2xl p-8 border border-blue/8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${feature.color}`}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="font-serif text-lg font-semibold text-navy mb-3">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="features" className="py-24 px-8 md:px-16 bg-light">
      <div className="text-xs font-semibold uppercase tracking-widest text-sky mb-3">What It Does</div>
      <h2 className="font-serif text-4xl font-bold text-navy max-w-xl leading-tight mb-4">
        Built for real Indian clinic workflows
      </h2>
      <p className="text-gray-500 text-base leading-relaxed max-w-lg mb-14">
        No app downloads. No new portals. Patients just WhatsApp — and MediAssist handles the rest automatically.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}
