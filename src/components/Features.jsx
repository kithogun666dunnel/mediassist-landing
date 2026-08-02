import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Activity, CircleCheck, ShieldCheck, CalendarCheck, Stethoscope, Database, LayoutDashboard } from 'lucide-react'

const features = [
  {
    icon: Activity,
    title: 'S1–S5 Severity Classification',
    desc: 'Every incoming message is scored on a deterministic 5-point severity ladder — not AI guessing. S1/S2 are handled automatically. S3 is flagged. S4/S5 trigger immediate doctor alerts.',
    color: 'bg-blue-50 text-blue',
    guarantee: 'AI cannot discharge S4 or S5 cases without doctor acknowledgment.',
  },
  {
    icon: CircleCheck,
    title: 'Doctor ACK System',
    desc: 'Serious cases require explicit doctor acknowledgment. Doctor replies ACK [case-id] via WhatsApp. Patient gets notified. Case closes only then. A 30-minute re-escalation timer fires if ACK doesn\'t arrive.',
    color: 'bg-emerald-50 text-emerald-600',
    guarantee: 'No S4+ case closes without a doctor\'s explicit action.',
  },
  {
    icon: ShieldCheck,
    title: 'Serious Case Alerts',
    desc: 'S4 cases fire an immediate WhatsApp alert to the doctor with patient details, message text, and severity classification. S5 crisis cases bypass UNAVAILABLE mode — they always deliver.',
    color: 'bg-red-50 text-red-500',
    guarantee: 'S5 crisis alerts bypass all silence modes. Always.',
  },
  {
    icon: CalendarCheck,
    title: 'Smart Appointment Booking',
    desc: 'Patients see real-time available slots, select a time, and receive a confirmed booking — all within WhatsApp. No calls, no waiting, no double-bookings.',
    color: 'bg-sky/10 text-sky',
    guarantee: null,
  },
  {
    icon: Stethoscope,
    title: 'Doctor WhatsApp Commands',
    desc: 'Doctors command the system from WhatsApp: check today\'s schedule, pull patient profiles, review triage summaries, go UNAVAILABLE, run weekly reports — no portal, no new app.',
    color: 'bg-purple-50 text-purple-600',
    guarantee: null,
  },
  {
    icon: Database,
    title: 'Full Conversation Audit Trail',
    desc: 'Every patient message, AI response, triage score, escalation decision, and doctor action is stored in PostgreSQL with timestamps. Complete clinical accountability, queryable at any time.',
    color: 'bg-amber-50 text-amber-600',
    guarantee: 'No message disappears. Full history always accessible.',
  },
  {
    icon: LayoutDashboard,
    title: 'Operational Analytics Dashboard',
    desc: 'Track messages handled, automation rate, serious alerts, response times, and patient sentiment trends — in a single clinic intelligence view.',
    color: 'bg-slate-50 text-slate-600',
    guarantee: null,
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative bg-white p-8 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="top-0 right-0 left-0 absolute bg-blue rounded-t-xl h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${feature.color}`}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="mb-3 font-serif font-semibold text-navy text-lg">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
      {feature.guarantee && (
        <div className="mt-4 px-3 py-2 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-xs leading-snug">
          {feature.guarantee}
        </div>
      )}
    </motion.div>
  )
}

export default function Features() {
  return (
    <section id="what-it-does" className="bg-light px-8 md:px-16 py-24">
      <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">Capabilities</div>
      <h2 className="mb-4 max-w-xl font-serif font-bold text-navy text-4xl leading-tight">
        Built for real Indian clinic workflows
      </h2>
      <p className="mb-14 max-w-lg text-gray-500 text-base leading-relaxed">
        No new apps for patients. No portal for doctors. Runs on the WhatsApp your clinic already uses — with safety architecture that makes it deployable in real clinical environments.
      </p>

      {/* Safety-Critical Layer */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-semibold text-red-500/70 text-xs uppercase tracking-widest shrink-0">Safety-Critical Layer</span>
        <div className="flex-1 h-px bg-red-100" />
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-14">
        {features.slice(0, 3).map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>

      {/* Operational Layer */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-semibold text-sky text-xs uppercase tracking-widest shrink-0">Operational Layer</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.slice(3).map((f, i) => (
          <FeatureCard key={i + 3} feature={f} index={i + 3} />
        ))}
      </div>
    </section>
  )
}