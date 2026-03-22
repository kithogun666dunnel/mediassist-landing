import { Card, SectionLabel } from './ui'

const ROWS = [
    ['Messages AI handled', '763 msgs'],
    ['Avg time per manual reply', '~45 sec'],
    ['Total time saved', '~572 min'],
]

const VALUE_ROWS = [
    ['Subscription cost', '₹4,999/mo', 'text-slate-700'],
    ['Value of 9.5 hrs (₹800/hr)', '₹7,600', 'text-emerald-600'],
    ['Serious cases prevented', '9 alerts', 'text-emerald-600'],
    ['Bookings via AI', '134 appts', 'text-emerald-600'],
]

export default function FinancialSection({ stats }) {
    return (
        <>
            <SectionLabel>Financial impact</SectionLabel>
            <div className="gap-4 grid md:grid-cols-2">

                {/* Time reclaimed */}
                <Card>
                    <p className="mb-3 font-medium text-slate-700 text-sm">Time reclaimed this month</p>
                    {ROWS.map(([label, val]) => (
                        <div key={label} className="flex justify-between items-center py-2.5 border-slate-50 border-b">
                            <span className="text-slate-600 text-sm">{label}</span>
                            <span className="font-medium text-slate-800 text-sm">{val}</span>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-1 py-3">
                        <span className="text-slate-600 text-sm">That's nearly</span>
                        <span className="font-semibold text-slate-800 text-3xl">{stats.hoursSaved} hrs</span>
                    </div>
                    <p className="pt-3 border-slate-50 border-t text-slate-400 text-xs">
                        Equivalent to ~4 extra patient consultations
                    </p>
                </Card>

                {/* Value generated */}
                <Card>
                    <p className="mb-3 font-medium text-slate-700 text-sm">Value generated</p>
                    {VALUE_ROWS.map(([label, val, color]) => (
                        <div key={label} className="flex justify-between items-center py-2.5 border-slate-50 last:border-0 border-b">
                            <span className="text-slate-600 text-sm">{label}</span>
                            <span className={`text-sm font-medium ${color}`}>{val}</span>
                        </div>
                    ))}
                    <div className="bg-emerald-50 mt-3 p-4 rounded-xl">
                        <p className="mb-1 text-emerald-600 text-xs">Net value this month</p>
                        <p className="font-semibold text-emerald-700 text-2xl">₹2,601 surplus</p>
                        <p className="mt-0.5 text-emerald-500 text-xs">after subscription · time value alone</p>
                    </div>
                </Card>

            </div>
        </>
    )
}