import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, CircleCheck, Database } from 'lucide-react'

const SEVERITY_LEVELS = [
  {
    code: 'S1',
    label: 'Informational',
    desc: 'FAQ, clinic hours, address, fees, basic queries',
    action: 'AI handles fully. No escalation.',
    dot: 'bg-gray-400',
    badge: 'bg-gray-400/15 text-gray-300 border-gray-400/20',
    tag: 'AI Only',
    tagStyle: 'bg-white/5 text-white/30 border-white/10',
    rowBg: '',
  },
  {
    code: 'S2',
    label: 'Routine',
    desc: 'Mild symptoms, appointment queries, follow-ups',
    action: 'AI handles. Logged for doctor review.',
    dot: 'bg-blue',
    badge: 'bg-blue/15 text-blue-300 border-blue/20',
    tag: 'AI + Log',
    tagStyle: 'bg-blue/10 text-blue-300 border-blue/15',
    rowBg: '',
  },
  {
    code: 'S3',
    label: 'Moderate Concern',
    desc: 'Multi-day symptoms, significant discomfort, ambiguous cases',
    action: 'AI handles + flags case for doctor review.',
    dot: 'bg-amber-400',
    badge: 'bg-amber-400/15 text-amber-300 border-amber-400/20',
    tag: 'AI + Flag',
    tagStyle: 'bg-amber-400/10 text-amber-300 border-amber-400/15',
    rowBg: '',
  },
  {
    code: 'S4',
    label: 'Serious',
    desc: 'High fever, acute pain, concerning acute symptoms',
    action: 'Immediate doctor alert. ACK required to close.',
    dot: 'bg-orange-400',
    badge: 'bg-orange-400/15 text-orange-300 border-orange-400/20',
    tag: 'Doctor Alert',
    tagStyle: 'bg-orange-400/10 text-orange-300 border-orange-400/15',
    rowBg: 'bg-orange-500/5',
  },
  {
    code: 'S5',
    label: 'Crisis',
    desc: 'Emergency symptoms, no fetal movement, collapse indicators',
    action: 'Emergency patient reply + doctor alert. Bypasses ALL modes.',
    dot: 'bg-red-500 animate-pulse',
    badge: 'bg-red-500/15 text-red-400 border-red-500/20',
    tag: 'Crisis Override',
    tagStyle: 'bg-red-500/15 text-red-400 border-red-500/20',
    rowBg: 'bg-red-500/5',
  },
]

const GUARANTEES = [
  {
    Icon: AlertTriangle,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-400/10',
    title: 'S5 Alerts Cannot Be Silenced',
    desc: 'When a doctor activates UNAVAILABLE mode, routine alerts pause and messages queue. S5 crisis alerts bypass this entirely — they always reach the doctor, regardless of any mode or setting.',
    callout: 'This is architecture, not a setting.',
  },
  {
    Icon: CircleCheck,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
    title: 'Every S4+ Case Requires Doctor ACK',
    desc: 'Serious cases do not auto-resolve. Doctor replies ACK [case-id] via WhatsApp. Patient is notified: "Doctor has seen your case." A 30-minute escalation timer fires if ACK does not arrive.',
    callout: 'AI escalates. AI does not discharge.',
  },
  {
    Icon: Database,
    iconColor: 'text-sky',
    iconBg: 'bg-sky/10',
    title: 'Full Audit Trail — Every Message',
    desc: 'Every patient message, AI response, triage classification, escalation decision, and doctor action is stored in PostgreSQL with precise timestamps. No message disappears.',
    callout: 'Complete clinical accountability.',
  },
]

const ACK_STEPS = [
  { label: 'Patient sends message', sub: 'via clinic WhatsApp' },
  { label: 'AI classifies S4', sub: 'Deterministic rule engine' },
  { label: 'AI replies to patient', sub: 'Calm, reassuring response' },
  { label: 'Doctor alerted', sub: 'Instant WhatsApp ping' },
  { label: 'Doctor replies ACK', sub: 'ACK 1042' },
  { label: 'Patient notified', sub: '"Doctor has reviewed your case"' },
]

export default function SafetyArchitecture() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="safety" className="bg-navy px-8 md:px-16 py-24" ref={ref}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="mb-3 font-semibold text-blue-400 text-xs uppercase tracking-widest">
          Clinical Safety Architecture
        </div>
        <h2 className="mb-5 max-w-2xl font-serif font-bold text-white text-4xl leading-tight">
          Built around clinical safety.{' '}
          <span className="text-white/40">Not added as an afterthought.</span>
        </h2>
        <p className="max-w-xl text-white/45 text-base leading-relaxed">
          Three architectural guarantees that make MediAssist deployable in real clinical workflows — not just demos.
        </p>
      </motion.div>

      {/* Three Guarantee Cards */}
      <div className="gap-5 grid grid-cols-1 md:grid-cols-3 mb-16">
        {GUARANTEES.map(({ Icon, iconColor, iconBg, title, desc, callout }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            className="flex flex-col bg-white/5 p-7 border border-white/8 rounded-2xl"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${iconBg}`}>
              <Icon size={20} className={iconColor} strokeWidth={1.8} />
            </div>
            <h3 className="mb-3 font-serif font-semibold text-white text-lg leading-snug">{title}</h3>
            <p className="flex-1 mb-5 text-white/40 text-sm leading-relaxed">{desc}</p>
            <div className="pt-4 border-t border-white/8 font-semibold text-white/20 text-[10px] uppercase tracking-widest">
              {callout}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Severity Ladder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="mb-16"
      >
        <div className="mb-5 font-semibold text-white/30 text-xs uppercase tracking-widest">
          Severity Classification Ladder
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/8">
          {SEVERITY_LEVELS.map((level, i) => (
            <div
              key={level.code}
              className={`flex flex-col md:flex-row md:items-center gap-2 md:gap-5 px-5 py-4 ${i < SEVERITY_LEVELS.length - 1 ? 'border-b border-white/6' : ''} ${level.rowBg}`}
            >
              {/* Badge group */}
              <div className="flex items-center gap-2.5 shrink-0 md:w-56">
                <span className={`w-2 h-2 rounded-full shrink-0 ${level.dot}`} />
                <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border tracking-tight ${level.badge}`}>
                  {level.code}
                </span>
                <span className="font-semibold text-white/60 text-sm">{level.label}</span>
              </div>
              {/* Description */}
              <div className="flex-1 text-white/30 text-sm pl-4 md:pl-0">{level.desc}</div>
              {/* Action */}
              <div className="text-white/50 text-sm pl-4 md:pl-0 md:text-right md:max-w-[260px]">{level.action}</div>
              {/* Tag */}
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ml-4 md:ml-0 w-fit ${level.tagStyle}`}>
                {level.tag}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-white/20 text-xs">
          S5 escalation cannot be disabled. S4+ cases require explicit doctor acknowledgment before closing.
        </p>
      </motion.div>

      {/* ACK Loop Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="mb-5 font-semibold text-white/30 text-xs uppercase tracking-widest">
          The ACK Loop — How Serious Cases Close
        </div>

        {/* Desktop: horizontal chain */}
        <div className="hidden md:flex items-start relative">
          {/* Connector line */}
          <div className="absolute top-4 left-4 right-4 h-px bg-white/8 z-0" />
          {ACK_STEPS.map((step, i) => (
            <div key={i} className="relative flex flex-col items-center flex-1 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-3 border ${
                i === 4
                  ? 'bg-emerald-500 border-emerald-400 text-white'
                  : 'bg-navy border-white/15 text-white/50'
              }`}>
                {i + 1}
              </div>
              <div className="text-center px-1">
                <div className="font-semibold text-white/70 text-xs leading-snug">{step.label}</div>
                <div className="mt-1 text-white/25 text-[10px]">{step.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="flex flex-col gap-3 md:hidden">
          {ACK_STEPS.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                i === 4
                  ? 'bg-emerald-500 border-emerald-400 text-white'
                  : 'bg-white/5 border-white/10 text-white/40'
              }`}>
                {i + 1}
              </div>
              <div className="pt-0.5">
                <div className="font-semibold text-white/70 text-sm">{step.label}</div>
                <div className="text-white/25 text-xs mt-0.5">{step.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-white/25 text-xs leading-relaxed max-w-2xl">
          Step 5 is the only human action in this loop. Without it, a 30-minute escalation timer fires and re-alerts. No S4+ case closes without a doctor's explicit acknowledgment.
        </p>
      </motion.div>

    </section>
  )
}
