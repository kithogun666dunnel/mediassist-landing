import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, CalendarCheck, AlertTriangle, MessageSquare, Stethoscope, ShieldCheck, LayoutDashboard } from 'lucide-react'

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
    desc: 'Doctors manage slots via WhatsApp commands: ADD, REMOVE, LIST — built for busy clinicians.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: ShieldCheck,
    title: 'Full Conversation History',
    desc: 'Every patient interaction is stored securely in PostgreSQL. The AI maintains context across sessions for coherent conversations.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: LayoutDashboard,
    title: "Eagle's EYE Dashboard",
    desc: 'Know everything happening in your clinic — without doing anything. Track messages, bookings, patient sentiment, and your ROI, all in one view.',
    color: 'bg-slate-50 text-slate-600',
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
      className="group relative bg-white hover:shadow-xl p-8 border border-blue/8 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 duration-300"
    >
      <div className="top-0 right-0 left-0 absolute bg-gradient-to-r from-sky to-accent rounded-t-2xl h-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${feature.color}`}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="mb-3 font-serif font-semibold text-navy text-lg">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="what-it-does" className="bg-light px-8 md:px-16 py-24">
      <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">What It Does</div>
      <h2 className="mb-4 max-w-xl font-serif font-bold text-navy text-4xl leading-tight">
        Built for real Indian clinic workflows
      </h2>
      <p className="mb-14 max-w-lg text-gray-500 text-base leading-relaxed">
        No app downloads. No new portals. Patients just WhatsApp — and MediAssist handles the rest automatically.
      </p>

      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}