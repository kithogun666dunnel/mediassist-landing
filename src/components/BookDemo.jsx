import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle, Stethoscope, Building2, Phone, Mail, MessageSquare } from 'lucide-react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_sx94vi5'
const TEMPLATE_ID = 'template_fma6uhn'
const PUBLIC_KEY = 'MN78NgqS3pBSb7-Pd'

const specializations = [
    'General Physician', 'Pediatrician', 'Cardiologist', 'Dermatologist',
    'Gynecologist', 'Orthopedic', 'Neurologist', 'ENT Specialist',
    'Ophthalmologist', 'Psychiatrist', 'Dentist', 'Other',
]

const patientVolumes = [
    '< 20 patients/day', '20–50 patients/day', '50–100 patients/day', '100+ patients/day',
]

const painPoints = [
    'Too many repetitive WhatsApp messages',
    'Manual appointment booking is chaotic',
    'Serious cases get missed in chat',
    'No record of patient conversations',
    'Staff spending time on admin tasks',
    'Patients calling at odd hours',
]

const initialForm = {
    name: '', clinic: '', city: '', phone: '', email: '',
    specialization: '', volume: '', painPoints: [], customRequirements: '',
}

export default function BookDemo() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [form, setForm] = useState(initialForm)
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const togglePainPoint = (point) => {
        setForm((f) => ({
            ...f,
            painPoints: f.painPoints.includes(point)
                ? f.painPoints.filter((p) => p !== point)
                : [...f.painPoints, point],
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    doctor_name: form.name,
                    email: form.email,
                    phone: form.phone,
                    city: form.city,
                    clinic_name: form.clinic,
                    specialization: form.specialization,
                    volume: form.volume || 'Not specified',
                    pain_points: form.painPoints.length > 0 ? form.painPoints.join(', ') : 'None selected',
                    custom_requirements: form.customRequirements || 'None',
                },
                PUBLIC_KEY
            )
            setSubmitted(true)
        } catch (err) {
            console.error('EmailJS error:', err)
            setError('Something went wrong. Please try again or WhatsApp us directly.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="book-demo" className="bg-light px-8 md:px-16 py-24" ref={ref}>
            <div className="mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">Book a Demo</div>
                    <h2 className="mb-4 font-serif font-bold text-navy text-4xl leading-tight">
                        Let's set up your clinic on autopilot
                    </h2>
                    <p className="mb-12 text-gray-500 text-base leading-relaxed">
                        Tell us about your clinic and what you need — we'll reach out within 24 hours for a free personalized demo.
                    </p>

                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white shadow-lg p-12 border border-emerald-100 rounded-3xl text-center"
                        >
                            <CheckCircle size={56} className="mx-auto mb-6 text-emerald-500" strokeWidth={1.5} />
                            <h3 className="mb-3 font-serif font-bold text-navy text-2xl">Request Received! 🎉</h3>
                            <p className="mx-auto max-w-sm text-gray-500 text-sm leading-relaxed">
                                Thank you, <strong>Dr. {form.name}</strong>! We'll contact you at <strong>{form.phone}</strong> within 24 hours to schedule your free demo.
                            </p>
                            <button
                                onClick={() => { setForm(initialForm); setSubmitted(false) }}
                                className="mt-8 text-blue hover:text-navy text-sm underline underline-offset-2 transition-colors"
                            >
                                Submit another request
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-white shadow-sm p-8 md:p-10 border border-blue/8 rounded-3xl">

                            {/* Basic Info */}
                            <div>
                                <div className="flex items-center gap-2 mb-5">
                                    <Stethoscope size={16} className="text-sky" strokeWidth={2} />
                                    <span className="font-semibold text-navy text-sm">Doctor Details</span>
                                </div>
                                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                    {[
                                        { field: 'name', label: 'Your Name', placeholder: 'Dr. Rajesh Sharma' },
                                        { field: 'email', label: 'Email Address', placeholder: 'dr.rajesh@clinic.com' },
                                    ].map(({ field, label, placeholder }) => (
                                        <div key={field}>
                                            <label className="block mb-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">{label}</label>
                                            <input
                                                type={field === 'email' ? 'email' : 'text'}
                                                required
                                                value={form[field]}
                                                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                                placeholder={placeholder}
                                                className="px-4 py-3 border border-gray-200 focus:border-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/10 w-full text-navy text-sm transition-all placeholder-gray-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Clinic Info */}
                            <div>
                                <div className="flex items-center gap-2 mb-5">
                                    <Building2 size={16} className="text-sky" strokeWidth={2} />
                                    <span className="font-semibold text-navy text-sm">Clinic Details</span>
                                </div>
                                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">Clinic Name</label>
                                        <input
                                            required
                                            value={form.clinic}
                                            onChange={(e) => setForm({ ...form, clinic: e.target.value })}
                                            placeholder="Sharma General Clinic"
                                            className="px-4 py-3 border border-gray-200 focus:border-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/10 w-full text-navy text-sm transition-all placeholder-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">City</label>
                                        <input
                                            required
                                            value={form.city}
                                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                                            placeholder="Pune"
                                            className="px-4 py-3 border border-gray-200 focus:border-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/10 w-full text-navy text-sm transition-all placeholder-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">WhatsApp Number</label>
                                        <input
                                            required
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="px-4 py-3 border border-gray-200 focus:border-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/10 w-full text-navy text-sm transition-all placeholder-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 font-semibold text-gray-500 text-xs uppercase tracking-wider">Specialization</label>
                                        <select
                                            required
                                            value={form.specialization}
                                            onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                                            className="bg-white px-4 py-3 border border-gray-200 focus:border-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/10 w-full text-navy text-sm transition-all"
                                        >
                                            <option value="">Select specialization</option>
                                            {specializations.map((s) => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Volume */}
                            <div>
                                <label className="block mb-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Daily Patient Volume</label>
                                <div className="flex flex-wrap gap-3">
                                    {patientVolumes.map((v) => (
                                        <button
                                            type="button"
                                            key={v}
                                            onClick={() => setForm({ ...form, volume: v })}
                                            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${form.volume === v
                                                ? 'bg-navy text-white border-navy'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-blue hover:text-blue'
                                                }`}
                                        >
                                            {v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pain Points */}
                            <div>
                                <label className="block mb-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                    What's your biggest challenge? <span className="font-normal text-gray-400 normal-case">(select all that apply)</span>
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {painPoints.map((p) => (
                                        <button
                                            type="button"
                                            key={p}
                                            onClick={() => togglePainPoint(p)}
                                            className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${form.painPoints.includes(p)
                                                ? 'bg-blue text-white border-blue'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-sky hover:text-sky'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Requirements */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <MessageSquare size={16} className="text-sky" strokeWidth={2} />
                                    <label className="font-semibold text-gray-500 text-xs uppercase tracking-wider">
                                        Any specific requirements? <span className="font-normal text-gray-400 normal-case">(optional)</span>
                                    </label>
                                </div>
                                <textarea
                                    value={form.customRequirements}
                                    onChange={(e) => setForm({ ...form, customRequirements: e.target.value })}
                                    placeholder="E.g. I want the AI to respond in Hindi, I need integration with my existing billing software, I have 3 branches..."
                                    rows={4}
                                    className="px-4 py-3 border border-gray-200 focus:border-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-blue/10 w-full text-navy text-sm transition-all resize-none placeholder-gray-300"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 px-4 py-3 border border-red-200 rounded-xl text-red-600 text-sm">
                                    ⚠️ {error}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex justify-center items-center gap-3 bg-navy disabled:opacity-60 hover:shadow-xl px-8 py-4 rounded-xl font-semibold text-white disabled:transform-none transition-all hover:-translate-y-0.5 duration-200 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="border-2 border-white/30 border-t-white rounded-full w-4 h-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} strokeWidth={2} />
                                        Book My Free Demo
                                    </>
                                )}
                            </button>

                            <p className="text-gray-400 text-xs text-center">
                                We'll reach out within 24 hours · No spam · No commitment required
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    )
}