import { Card, SectionLabel, ChartLegend } from './ui'
import {
    LineChart, Line,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

export default function PatientLoveSection({ patientLove, sentimentTrend }) {
    return (
        <>
            <SectionLabel>Patient love</SectionLabel>
            <div className="gap-4 grid md:grid-cols-2">

                {/* Review cards */}
                <Card>
                    <p className="mb-3 font-medium text-slate-700 text-sm">What patients are saying</p>
                    {patientLove.map((p, i) => (
                        <div key={i} className="bg-slate-50 mb-2 last:mb-0 p-3.5 rounded-xl">
                            <p className="mb-1 text-amber-400 text-sm">
                                {'★'.repeat(p.stars)}{'☆'.repeat(5 - p.stars)}
                            </p>
                            <p className="font-serif text-slate-700 text-sm leading-relaxed">{p.text}</p>
                            <p className="mt-2 text-slate-400 text-xs">— {p.name}</p>
                        </div>
                    ))}
                </Card>

                {/* Sentiment trend */}
                <Card>
                    <p className="mb-1 font-medium text-slate-700 text-sm">Patient sentiment trend</p>
                    <ChartLegend items={[
                        { color: '#10b981', label: 'Positive' },
                        { color: '#f59e0b', label: 'Neutral' },
                        { color: '#f87171', label: 'Needs attention' },
                    ]} />
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={sentimentTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis
                                tick={{ fontSize: 11, fill: '#94a3b8' }}
                                axisLine={false} tickLine={false}
                                tickFormatter={(v) => v + '%'}
                            />
                            <Tooltip
                                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                                formatter={(v) => v + '%'}
                            />
                            <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                            <Line type="monotone" dataKey="neutral" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                            <Line type="monotone" dataKey="negative" stroke="#f87171" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

            </div>
        </>
    )
}