import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const STEPS = [
    {
        id: 'overview',
        tag: 'At a glance',
        headline: 'Your entire clinic, in one number.',
        body: 'The moment you open the dashboard, you see how many messages your AI handled today, your auto-reply rate, and how many hours you got back — no digging required.',
        stat: '91%',
        statLabel: 'messages handled by AI — no doctor involvement',
        visual: [
            { label: 'Messages handled', value: '847', color: 'bg-slate-50', sub: '+12% vs last month', subColor: 'text-emerald-600' },
            { label: 'AI auto-replied', value: '91%', color: 'bg-blue-50', sub: '763 of 847', subColor: 'text-blue-600' },
            { label: 'Hours saved', value: '9.5h', color: 'bg-emerald-50', sub: 'This month', subColor: 'text-emerald-600' },
            { label: 'Serious alerts', value: '9', color: 'bg-amber-50', sub: '4 this week', subColor: 'text-amber-600' },
        ],
    },
    {
        id: 'streak',
        tag: 'Progress',
        headline: 'A streak that keeps you hooked.',
        body: "Every day your AI runs without missing a message, your streak grows. Doctors tell us they check the dashboard just to see their streak — like Duolingo, but for your clinic.",
        stat: '22',
        statLabel: 'day active streak — personal best',
        visual: 'streak',
    },
    {
        id: 'benchmark',
        tag: 'Benchmarks',
        headline: 'See where you rank in your city.',
        body: 'How fast does your clinic respond vs others in Pune? MediAssist shows you — anonymously. Doctors in the top 3 keep pushing to stay there.',
        stat: '#1',
        statLabel: 'fastest response time in Pune GP clinics',
        visual: 'rank',
    },
    {
        id: 'love',
        tag: 'Patient love',
        headline: 'Read what your patients actually feel.',
        body: 'After every AI interaction, patients can rate the experience. Their exact words show up here. Doctors say this section alone is worth opening the dashboard for.',
        stat: '4.9',
        statLabel: 'average patient rating this month',
        visual: 'love',
    },
    {
        id: 'financial',
        tag: 'Financial impact',
        headline: 'MediAssist pays for itself. We show you the math.',
        body: 'Every month, we calculate exactly how much time you reclaimed and convert it to rupees. For most doctors, the ROI is clear within the first week.',
        stat: '₹2,601',
        statLabel: 'net surplus this month after subscription cost',
        visual: 'financial',
    },
]

const STREAK_LEVELS = [0, 0, 1, 1, 2, 2, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
const STREAK_COLORS = ['#e2e8f0', '#bbf7d0', '#4ade80', '#16a34a']

function VisualCards({ items }) {
    return (
        <div className="gap-3 grid grid-cols-2">
            {items.map((card) => (
                <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${card.color} rounded-xl p-4`}
                >
                    <p className="mb-1 text-slate-500 text-xs">{card.label}</p>
                    <p className="font-semibold text-slate-800 text-2xl">{card.value}</p>
                    <p className={`text-xs mt-1 ${card.subColor}`}>{card.sub}</p>
                </motion.div>
            ))}
        </div>
    )
}

function VisualStreak() {
    return (
        <div className="bg-white p-5 border border-slate-100 rounded-2xl">
            <div className="flex items-baseline gap-2 mb-4">
                <span className="font-semibold text-slate-800 text-5xl">22</span>
                <span className="text-slate-400 text-sm">day streak</span>
                <span className="bg-emerald-50 ml-auto px-2.5 py-1 rounded-full font-medium text-emerald-700 text-xs">Personal best</span>
            </div>
            <div className="gap-[3px] grid grid-cols-[repeat(30,1fr)]">
                {STREAK_LEVELS.map((lvl, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.02 }}
                        style={{ background: STREAK_COLORS[lvl] }}
                        className="rounded-[2px] aspect-square"
                    />
                ))}
            </div>
            <p className="mt-2 text-slate-300 text-xs">Mar 2026 · each cell = 1 day</p>
        </div>
    )
}

function VisualRank() {
    const rows = [
        { name: 'Sharma General Clinic', time: '2.8s', you: true },
        { name: 'City Care Clinic', time: '4.1s', you: false },
        { name: 'Pimpri Health Centre', time: '5.6s', you: false },
        { name: 'Wakad Medical', time: '7.2s', you: false },
    ]
    return (
        <div className="bg-white p-5 border border-slate-100 rounded-2xl">
            <p className="mb-3 text-slate-400 text-xs">Pune GP clinics — response time</p>
            {rows.map((r, i) => (
                <motion.div
                    key={r.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0 ${r.you ? 'rounded-lg bg-blue-50 px-2 -mx-2' : ''}`}
                >
                    <span className={`text-lg font-semibold w-6 text-center ${i === 0 ? 'text-amber-500' : 'text-slate-400'}`}>{i + 1}</span>
                    <div className="flex-1">
                        <p className={`text-sm ${r.you ? 'font-semibold text-blue-800' : 'text-slate-700'}`}>{r.name}</p>
                        <p className="text-slate-400 text-xs">Avg {r.time}</p>
                    </div>
                    {r.you && <span className="bg-blue-100 px-2 py-0.5 rounded-full text-blue-700 text-xs">You</span>}
                </motion.div>
            ))}
        </div>
    )
}

function VisualLove() {
    const reviews = [
        { text: '"Raat ko 11 baje message kiya, 3 second mein jawab aaya."', name: 'Rahul S.', stars: 5 },
        { text: '"Booking process bahut smooth tha. Ghar se hi slot choose kiya."', name: 'Deepa N.', stars: 4 },
    ]
    return (
        <div className="flex flex-col gap-3">
            {reviews.map((r, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-white p-4 border border-slate-100 rounded-2xl"
                >
                    <p className="mb-2 text-amber-400 text-sm">{'★'.repeat(r.stars)}</p>
                    <p className="font-serif text-slate-700 text-sm leading-relaxed">{r.text}</p>
                    <p className="mt-2 text-slate-400 text-xs">— {r.name}</p>
                </motion.div>
            ))}
        </div>
    )
}

function VisualFinancial() {
    return (
        <div className="flex flex-col gap-3 bg-white p-5 border border-slate-100 rounded-2xl">
            {[
                ['Subscription cost', '₹4,999/mo', 'text-slate-700'],
                ['Time value (9.5 hrs)', '₹7,600', 'text-emerald-600'],
                ['Bookings automated', '134 appts', 'text-emerald-600'],
            ].map(([label, val, color]) => (
                <div key={label} className="flex justify-between items-center pb-2 border-slate-50 last:border-0 border-b">
                    <span className="text-slate-600 text-sm">{label}</span>
                    <span className={`text-sm font-medium ${color}`}>{val}</span>
                </div>
            ))}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-emerald-50 mt-1 p-4 rounded-xl"
            >
                <p className="mb-1 text-emerald-600 text-xs">Net value this month</p>
                <p className="font-semibold text-emerald-700 text-2xl">₹2,601 surplus</p>
                <p className="mt-0.5 text-emerald-500 text-xs">after subscription cost</p>
            </motion.div>
        </div>
    )
}

function StepVisual({ step }) {
    if (step.visual === 'streak') return <VisualStreak />
    if (step.visual === 'rank') return <VisualRank />
    if (step.visual === 'love') return <VisualLove />
    if (step.visual === 'financial') return <VisualFinancial />
    return <VisualCards items={step.visual} />
}

export default function DemoPreview() {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    const step = STEPS[current]

    return (
        <section id="eagles-eye" className="bg-gradient-to-br from-slate-50 to-white px-8 md:px-16 py-24">

            {/* Section header */}
            <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">
                Eagle's EYE
            </div>
            <h2 className="mb-4 max-w-xl font-serif font-bold text-navy text-4xl leading-tight">
                See everything. Do nothing.
            </h2>
            <p className="mb-14 max-w-lg text-gray-500 text-base leading-relaxed">
                Your clinic's intelligence layer — track every message, booking, and patient interaction without lifting a finger.
            </p>

            {/* Step pills */}
            <div className="flex flex-wrap gap-2 mb-10">
                {STEPS.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => setCurrent(i)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-all font-medium ${i === current
                            ? 'bg-navy text-white'
                            : i < current
                                ? 'bg-slate-100 text-slate-500'
                                : 'bg-slate-50 text-slate-400 border border-slate-200'
                            }`}
                    >
                        {s.tag}
                    </button>
                ))}
            </div>

            {/* Main content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="items-start gap-12 grid md:grid-cols-2"
                >
                    {/* Left — text */}
                    <div>
                        <span className="font-semibold text-blue-500 text-xs uppercase tracking-widest">
                            {step.tag}
                        </span>
                        <h3 className="mt-3 mb-4 font-serif font-bold text-navy text-2xl md:text-3xl leading-snug">
                            {step.headline}
                        </h3>
                        <p className="mb-6 text-slate-600 text-sm md:text-base leading-relaxed">
                            {step.body}
                        </p>
                        <div className="inline-block bg-white shadow-sm mb-8 p-4 border border-slate-100 rounded-xl">
                            <p className="font-bold text-navy text-3xl">{step.stat}</p>
                            <p className="mt-1 max-w-[200px] text-slate-500 text-xs leading-relaxed">{step.statLabel}</p>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-3">
                            {current > 0 && (
                                <button
                                    onClick={() => setCurrent(current - 1)}
                                    className="px-5 py-2.5 border border-slate-200 hover:border-slate-400 rounded-full font-medium text-slate-600 text-sm transition-all"
                                >
                                    ← Previous
                                </button>
                            )}
                            {current < STEPS.length - 1 ? (
                                <button
                                    onClick={() => setCurrent(current + 1)}
                                    className="bg-navy hover:bg-blue-800 px-5 py-2.5 rounded-full font-medium text-white text-sm transition-all"
                                >
                                    Next →
                                </button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate('/dashboard')}
                                    className="flex items-center gap-2 bg-navy hover:bg-blue-800 px-6 py-2.5 rounded-full font-semibold text-white text-sm transition-all"
                                >
                                    <span className="bg-green-400 rounded-full w-1.5 h-1.5 animate-pulse" />
                                    Open Live Dashboard
                                </motion.button>
                            )}
                        </div>
                    </div>

                    {/* Right — visual */}
                    <div>
                        <StepVisual step={step} />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress bar — inside section */}
            <div className="bg-slate-100 mt-12 rounded-full h-1 overflow-hidden">
                <motion.div
                    className="bg-navy rounded-full h-full"
                    animate={{ width: `${((current + 1) / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
            </div>

        </section>
    )
}