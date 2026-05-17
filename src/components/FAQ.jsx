import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
    {
        q: 'What if the AI misses a serious case?',
        a: "MediAssist uses a deterministic S1–S5 severity classification — not AI guessing. Severity rules are based on symptom keywords, urgency signals, and clinical patterns. S4 cases fire immediate doctor alerts. S5 crisis cases bypass all modes and always reach the doctor. The system is designed so that missing a serious case requires both the AI classification AND the doctor to miss the alert — two independent failure points.",
    },
    {
        q: "What happens when I'm in a procedure and can't respond?",
        a: "Send 'unavailable 2h' to your MediAssist channel. Routine alerts pause. Messages queue and are held — not dropped. Patients receive an auto-message: 'Doctor is in a procedure, will respond by [time].' S5 crisis alerts still reach you regardless of UNAVAILABLE mode. When you're back, send 'available' and the system resumes. Any messages the AI handled during your absence are summarized.",
    },
    {
        q: 'Does the AI make medical decisions?',
        a: "No. MediAssist is communication infrastructure, not diagnostic software. It classifies message severity based on symptom keywords and routes accordingly. Every medical decision remains yours. The system ensures serious messages reach you — what you do with them is medicine.",
    },
    {
        q: 'Do patients need to download any app?',
        a: "Not at all. MediAssist runs on your clinic's existing WhatsApp number. Patients message the same number they already have saved. No new app, no signup, no QR code, no learning curve.",
    },
    {
        q: 'How secure is patient data?',
        a: 'All patient conversations are stored in a PostgreSQL database with encryption at rest and in transit. No patient data is shared with third parties, sold, or used for model training. Conversations are accessible only to your clinic\'s authorized staff. We do not store data on shared infrastructure — each clinic deployment is isolated.',
    },
    {
        q: 'How long does setup take?',
        a: 'A complete clinic setup takes one business day. We handle the Twilio WhatsApp Business API connection, database configuration, and doctor onboarding. You send us your existing clinic WhatsApp number details — we do the rest. A 20-minute walkthrough call gets you fully operational.',
    },
    {
        q: 'Can the doctor customize the system?',
        a: "Yes, from WhatsApp. Slot management: ADD, REMOVE, LIST commands. The AI persona, clinic FAQ responses, and timing information are all configured during onboarding. The doctor doesn't need to log into any portal — all operational commands run through the same WhatsApp channel.",
    },
    {
        q: 'What happens if the AI cannot answer a query?',
        a: "The AI acknowledges the patient politely and queues the message for doctor review with a low severity flag. No patient message is ignored or dropped. The doctor's triage summary shows all messages that reached the queue.",
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
                        Questions before deploying
                    </h2>
                    <p className="text-gray-500 text-base leading-relaxed">
                        The questions doctors and clinic owners ask before going live — answered directly.
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