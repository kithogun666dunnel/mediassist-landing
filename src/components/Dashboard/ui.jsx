// Shared tiny UI primitives — import from here across all dashboard sections

export function MetricCard({ label, value, sub, subColor = 'text-blue-600' }) {
    return (
        <div className="bg-slate-50 p-4 rounded-xl">
            <p className="mb-1 text-slate-500 text-xs">{label}</p>
            <p className="font-semibold text-slate-800 text-2xl leading-none">{value}</p>
            {sub && <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>}
        </div>
    )
}

export function SectionLabel({ children }) {
    return (
        <p className="mt-6 mb-3 font-semibold text-slate-400 text-xs uppercase tracking-widest">
            {children}
        </p>
    )
}

export function Card({ children, className = '' }) {
    return (
        <div className={`bg-white border border-slate-100 rounded-2xl p-5 ${className}`}>
            {children}
        </div>
    )
}

export function StatusPill({ status }) {
    const styles = {
        confirmed: 'bg-emerald-50 text-emerald-700',
        pending: 'bg-amber-50   text-amber-700',
        cancelled: 'bg-red-50     text-red-600',
        'ai-booked': 'bg-blue-50    text-blue-700',
    }
    const labels = {
        confirmed: 'Confirmed',
        pending: 'Pending',
        cancelled: 'Cancelled',
        'ai-booked': 'Booked by AI',
    }
    return (
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles[status]}`}>
            {labels[status]}
        </span>
    )
}

export function ChartLegend({ items }) {
    return (
        <div className="flex flex-wrap gap-4 mb-3 text-slate-400 text-xs">
            {items.map(({ color, label }) => (
                <span key={label} className="flex items-center gap-1">
                    <span className="inline-block rounded-sm w-2 h-2" style={{ background: color }} />
                    {label}
                </span>
            ))}
        </div>
    )
}