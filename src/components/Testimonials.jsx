import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Dr. Rajesh Sharma',
        role: 'General Physician',
        clinic: 'Sharma General Clinic, Pune',
        avatar: 'RS',
        color: 'bg-blue-100 text-blue',
        stars: 5,
        quote:
            'Earlier, my entire morning used to go in replying to WhatsApp messages. Now MediAssist handles everything. I only need to attend to serious cases. This is a complete game changer.',
    },
    {
        name: 'Dr. Priya Nair',
        role: 'Pediatrician',
        clinic: 'Nair Child Care Clinic, Mumbai',
        avatar: 'PN',
        color: 'bg-purple-100 text-purple-600',
        stars: 5,
        quote:
            'The appointment booking system is incredibly smooth. Patients select their own slots and I don\'t have to do anything. The problem of double bookings has completely disappeared.',
    },
    {
        name: 'Dr. Anil Mehta',
        role: 'Cardiologist',
        clinic: 'Mehta Heart Institute, Ahmedabad',
        avatar: 'AM',
        color: 'bg-emerald-100 text-emerald-600',
        stars: 5,
        quote:
            'The serious case alert feature helped enormously during an emergency. A patient sent symptoms, and the AI instantly notified me. This feature alone proves the value of this product.',
    },
]

function Stars({ count }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
        </div>
    )
}

export default function Testimonials() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="bg-light px-8 md:px-16 py-24" ref={ref}>
            <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">Testimonials</div>
            <h2 className="mb-4 max-w-xl font-serif font-bold text-navy text-4xl leading-tight">
                Doctors love it. Patients benefit.
            </h2>
            <p className="mb-14 max-w-lg text-gray-500 text-base leading-relaxed">
                Early access doctors share their experience with MediAssist AI.
            </p>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        className="flex flex-col gap-5 bg-white hover:shadow-xl p-8 border border-blue/8 rounded-2xl transition-all hover:-translate-y-1 duration-300"
                    >
                        <Stars count={t.stars} />

                        <p className="flex-1 text-gray-600 text-sm italic leading-relaxed">
                            "{t.quote}"
                        </p>

                        <div className="flex items-center gap-3 pt-2 border-gray-100 border-t">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${t.color}`}>
                                {t.avatar}
                            </div>
                            <div>
                                <div className="font-semibold text-navy text-sm">{t.name}</div>
                                <div className="text-gray-400 text-xs">{t.role} · {t.clinic}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Trust bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center items-center gap-8 mt-12 text-gray-400 text-sm"
            >
                <span className="font-semibold text-navy">Trusted by early access clinics across</span>
                {['Pune', 'Mumbai', 'Ahmedabad', 'Bengaluru'].map((city) => (
                    <span key={city} className="flex items-center gap-1.5">
                        <span className="inline-block bg-accent rounded-full w-1.5 h-1.5" />
                        {city}
                    </span>
                ))}
            </motion.div>
        </section>
    )
}