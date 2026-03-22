import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { X, Check } from 'lucide-react'

const problems = [
    'Doctor manually replies to 30+ WhatsApp messages daily',
    'Patients call at odd hours asking clinic timings & address',
    'Appointment double-bookings due to manual management',
    'Serious symptoms get buried in routine chat history',
    'No record of past patient conversations',
    'Doctor burnout from non-medical admin work',
]

const solutions = [
    'AI auto-replies to all routine queries instantly',
    'FAQ bot answers timing, address & fees 24/7',
    'Smart slot system prevents double-bookings',
    'AI flags serious symptoms & alerts doctor immediately',
    'Full conversation history stored in PostgreSQL',
    'Doctor only engages when medically necessary',
]

export default function ProblemSolution() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="why-us" className="bg-white px-8 md:px-16 py-24" ref={ref}>
            <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">The Problem</div>
            <h2 className="mb-4 max-w-2xl font-serif font-bold text-navy text-4xl leading-tight">
                Indian doctors are drowning in WhatsApp messages
            </h2>
            <p className="mb-16 max-w-xl text-gray-500 text-base leading-relaxed">
                A typical GP clinic receives 30–50 WhatsApp messages daily. Most are repetitive. None require a doctor's expertise. All consume precious time.
            </p>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
                {/* BEFORE */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="bg-red-50 p-8 border border-red-100 rounded-3xl"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex justify-center items-center bg-red-100 rounded-full w-10 h-10">
                            <X size={18} className="text-red-500" strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="mb-0.5 font-bold text-red-400 text-xs uppercase tracking-widest">Before MediAssist</div>
                            <div className="font-serif font-bold text-red-700 text-lg">The Daily Struggle</div>
                        </div>
                    </div>
                    <ul className="space-y-4">
                        {problems.map((p, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -16 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                                className="flex items-start gap-3 text-red-700 text-sm"
                            >
                                <X size={15} className="mt-0.5 text-red-400 shrink-0" strokeWidth={2.5} />
                                {p}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* AFTER */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-emerald-50 p-8 border border-emerald-100 rounded-3xl"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="flex justify-center items-center bg-emerald-100 rounded-full w-10 h-10">
                            <Check size={18} className="text-emerald-600" strokeWidth={2.5} />
                        </div>
                        <div>
                            <div className="mb-0.5 font-bold text-emerald-500 text-xs uppercase tracking-widest">After MediAssist</div>
                            <div className="font-serif font-bold text-emerald-800 text-lg">Clinic on Autopilot</div>
                        </div>
                    </div>
                    <ul className="space-y-4">
                        {solutions.map((s, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: 16 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                                className="flex items-start gap-3 text-emerald-800 text-sm"
                            >
                                <Check size={15} className="mt-0.5 text-emerald-500 shrink-0" strokeWidth={2.5} />
                                {s}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Bottom stat */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex md:flex-row flex-col justify-between items-center gap-4 bg-navy mt-10 p-6 rounded-2xl"
            >
                <p className="text-white/70 text-sm md:text-left text-center">
                    On average, MediAssist reduces doctor's daily WhatsApp time by
                </p>
                <div className="font-serif font-bold text-accent text-4xl shrink-0">85%</div>
            </motion.div>
        </section>
    )
}