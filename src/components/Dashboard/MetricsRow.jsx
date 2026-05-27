import { MetricCard, SectionLabel } from './ui'

export default function MetricsRow({ stats }) {
    const cards = [
        { label: 'Messages handled', value: stats.messagesHandled, sub: 'past 30 days', subColor: 'text-slate-400' },
        { label: 'AI auto-replied', value: `${stats.autoReplyPct}%`, sub: `${Math.round(stats.messagesHandled * stats.autoReplyPct / 100)} of ${stats.messagesHandled}`, subColor: 'text-slate-400' },
        { label: 'Appointments booked', value: stats.appointmentsBooked, sub: 'via AI', subColor: 'text-slate-400' },
        { label: 'Serious alerts', value: stats.seriousAlerts, sub: 'escalated to doctor', subColor: 'text-amber-600' },
        { label: 'Avg response', value: `${stats.avgResponseSec}s`, sub: 'AI reply time', subColor: 'text-slate-400' },
        { label: 'Hours saved', value: `${stats.hoursSaved}h`, sub: 'estimated', subColor: 'text-slate-400' },
    ]

    return (
        <>
            <SectionLabel>Overview</SectionLabel>
            <div className="gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {cards.map((c) => (
                    <MetricCard key={c.label} {...c} />
                ))}
            </div>
        </>
    )
}