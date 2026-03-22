import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
    {
        q: 'Do patients need to download any app?',
        a: "Not at all. MediAssist works on WhatsApp — which is already installed on every patient's phone in India. No new app, no signup, no learning curve required.",
    },
    {
        q: 'Can the AI give wrong medical advice?',
        a: "MediAssist does not provide medical advice. It only books appointments, answers FAQs, and alerts the doctor for serious symptoms. Actual diagnosis always remains the doctor's responsibility.",
    },
    {
        q: 'How secure is patient data?',
        a: 'All data is stored in an encrypted PostgreSQL database. We follow HIPAA-conscious design principles — patient conversations are accessible only to authorized clinic staff.',
    },
    {
        q: 'How many patients can a doctor handle with this system?',
        a: 'The Starter plan supports 500 messages/month and the Growth plan supports 2,000 messages/month. The Starter plan is sufficient for most average GP clinics. High-volume clinics should consider Growth or Enterprise.',
    },
    {
        q: 'Can the doctor customize it for their clinic?',
        a: 'Yes. Doctors can manage their slots directly via WhatsApp commands — ADD, REMOVE, and LIST. FAQ responses, clinic information, and the AI persona can all be customized during onboarding.',
    },
    {
        q: 'How long does the setup take?',
        a: 'A complete clinic setup takes 24–48 hours. We handle everything — Twilio WhatsApp number setup, database configuration, and doctor onboarding.',
    },
    {
        q: 'What happens if the AI cannot answer a query?',
        a: "In such cases, the AI politely acknowledges the patient and forwards the message to the doctor's queue. No patient is ever left unanswered.",
    },
]

function FAQItem({ faq, index }) {
    const [open, setOpen] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="border border-blue/10 rounded-2xl overflow-hidden"
        >
            <button
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center bg-white hover:bg-pale px-7 py-5 w-full text-left transition-colors duration-200"
            >
                <span className="pr-4 font-semibold text-navy text-sm">{faq.q}</span>
                <span className="flex justify-center items-center bg-light rounded-full w-8 h-8 shrink-0">
                    {open
                        ? <Minus size={15} className="text-blue" strokeWidth={2.5} />
                        : <Plus size={15} className="text-navy" strokeWidth={2.5} />
                    }
                </span>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white px-7 pt-2 pb-6 border-blue/6 border-t text-gray-500 text-sm leading-relaxed">
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function FAQ() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="faq" className="bg-white px-8 md:px-16 py-24" ref={ref}>
            <div className="mx-auto max-w-3xl">
                <div className="mb-14 text-center">
                    <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">FAQ</div>
                    <h2 className="mb-4 font-serif font-bold text-navy text-4xl leading-tight">
                        Investors & doctors ask us...
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed">
                        Everything you need to know before getting started.
                    </p>
                </div>
                {inView && (
                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, i) => (
                            <FAQItem key={i} faq={faq} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}