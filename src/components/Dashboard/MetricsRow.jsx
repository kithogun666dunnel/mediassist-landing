import { MetricCard, SectionLabel } from './ui'

export default function MetricsRow({ stats }) {
    const cards = [
        { label: 'Messages handled', value: stats.messagesHandled, sub: '+12% vs last month', subColor: 'text-emerald-600' },
        { label: 'AI auto-replied', value: `${stats.autoReplyPct}%`, sub: `${Math.round(stats.messagesHandled * stats.autoReplyPct / 100)} of ${stats.messagesHandled}`, subColor: 'text-blue-600' },
        { label: 'Appointments', value: stats.appointmentsBooked, sub: '+8% this month', subColor: 'text-emerald-600' },
        { label: 'Serious alerts', value: stats.seriousAlerts, sub: '4 this week', subColor: 'text-amber-600' },
        { label: 'Avg response', value: `${stats.avgResponseSec}s`, sub: 'Fastest in Pune', subColor: 'text-emerald-600' },
        { label: 'Hours saved', value: `${stats.hoursSaved}h`, sub: 'This month', subColor: 'text-emerald-600' },
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