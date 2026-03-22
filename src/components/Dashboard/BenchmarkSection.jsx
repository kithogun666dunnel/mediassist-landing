import { Card, SectionLabel, ChartLegend } from './ui'
import {
    BarChart, Bar,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

export default function BenchmarkSection({ cityRank, benchmarkWeekly }) {
    return (
        <>
            <SectionLabel>Benchmarks — how you compare</SectionLabel>
            <div className="gap-4 grid md:grid-cols-2">

                {/* City rank */}
                <Card>
                    <p className="mb-3 font-medium text-slate-700 text-sm">
                        Pune GP clinics — response time rank
                    </p>
                    {cityRank.map((c, i) => (
                        <div
                            key={c.name}
                            className={`flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0 ${c.you ? 'rounded-lg bg-blue-50 px-2 -mx-2' : ''
                                }`}
                        >
                            <span className={`text-lg font-semibold w-6 text-center ${i === 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                                {i + 1}
                            </span>
                            <div className="flex-1">
                                <p className={`text-sm ${c.you ? 'font-semibold text-blue-800' : 'text-slate-700'}`}>
                                    {c.name}
                                </p>
                                <p className="text-slate-400 text-xs">Avg {c.time}</p>
                            </div>
                            {c.you && (
                                <span className="bg-blue-100 px-2 py-0.5 rounded-full font-medium text-blue-700 text-xs">
                                    You
                                </span>
                            )}
                        </div>
                    ))}
                </Card>

                {/* Automation % vs city avg */}
                <Card>
                    <p className="mb-1 font-medium text-slate-700 text-sm">AI automation rate — GP category</p>
                    <ChartLegend items={[
                        { color: '#3b82f6', label: 'Your clinic' },
                        { color: '#cbd5e1', label: 'City average' },
                    ]} />
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={benchmarkWeekly} barSize={20} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis
                                domain={[60, 100]}
                                tick={{ fontSize: 11, fill: '#94a3b8' }}
                                axisLine={false} tickLine={false}
                                tickFormatter={(v) => v + '%'}
                            />
                            <Tooltip
                                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                                formatter={(v) => v + '%'}
                            />
                            <Bar dataKey="you" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                            <Bar dataKey="avg" fill="#cbd5e1" radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

            </div>
        </>
    )
}