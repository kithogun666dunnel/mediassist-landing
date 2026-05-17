import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Smartphone, ScanLine, Zap, Bell, SquareCheck } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Smartphone,
    title: 'Patient WhatsApps',
    desc: "Patient sends any message to the clinic's existing WhatsApp number — query, symptom, booking request, or concern.",
    tag: null,
  },
  {
    num: '02',
    icon: ScanLine,
    title: 'AI Classifies Severity',
    desc: 'LLaMA 3.3 70B analyzes the message and assigns a severity score: S1 (informational) through S5 (crisis). Deterministic rules, not probabilistic guessing.',
    tag: 'S1–S5',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Auto-Reply or Escalate',
    desc: 'S1/S2: instant AI reply or appointment booking flow. S3: AI handles + flags for doctor. S4/S5: AI replies to patient + fires immediate doctor alert.',
    tag: null,
  },
  {
    num: '04',
    icon: Bell,
    title: 'Doctor Alerted',
    desc: 'For S4/S5 cases, doctor receives an immediate WhatsApp alert with patient details, message text, and severity classification.',
    tag: 'S4 / S5',
  },
  {
    num: '05',
    icon: SquareCheck,
    title: 'Doctor ACKs',
    desc: 'Doctor replies ACK [case-id]. Patient is notified "Doctor has reviewed your case." Case closes. Full audit log entry created.',
    tag: 'ACK',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="the-flow" className="bg-white px-8 md:px-16 py-24" ref={ref}>
      <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">How It Routes</div>
      <h2 className="mb-4 max-w-xl font-serif font-bold text-navy text-4xl leading-tight">
        From patient message to resolved — in seconds
      </h2>
      <p className="mb-6 max-w-lg text-gray-500 text-base leading-relaxed">
        Every message follows a deterministic path. Routine messages resolve automatically. Serious cases escalate through a closed ACK loop — doctor acknowledges, patient notified, case logged.
      </p>

      {/* Path indicators */}
      <div className="flex flex-wrap gap-3 mb-16">
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full text-emerald-700 text-xs font-semibold">
          <span className="w-2 h-2 bg-emerald-400 rounded-full" />
          Routine path: steps 1–3
        </div>
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full text-red-600 text-xs font-semibold">
          <span className="w-2 h-2 bg-red-400 rounded-full" />
          Escalation path: steps 1–5
        </div>
      </div>

      <div className="relative gap-6 grid grid-cols-1 md:grid-cols-5">
        {/* Connector line */}
        <div className="hidden md:block top-9 right-[10%] left-[10%] z-0 absolute bg-gradient-to-r from-sky to-accent h-[2px] opacity-30" />

        {steps.map((step, i) => {
          const Icon = step.icon
          const isEscalation = i >= 3
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group z-10 relative flex flex-col items-center text-center ${isEscalation ? 'opacity-90' : ''}`}
            >
              <div className={`flex justify-center items-center shadow-lg mb-4 rounded-full w-[64px] h-[64px] font-serif font-bold text-white text-base transition-colors duration-300 ${
                isEscalation
                  ? 'bg-red-500/80 group-hover:bg-red-500'
                  : 'bg-navy group-hover:bg-blue'
              }`}>
                {step.num}
              </div>
              <Icon size={20} className={`mx-auto mb-3 ${isEscalation ? 'text-red-400' : 'text-sky'}`} strokeWidth={1.5} />
              <div className="flex items-center gap-1.5 mb-2 justify-center flex-wrap">
                <h3 className="font-semibold text-navy text-sm">{step.title}</h3>
                {step.tag && (
                  <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border tracking-tight ${
                    isEscalation
                      ? 'bg-red-50 text-red-400 border-red-200'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>{step.tag}</span>
                )}
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}