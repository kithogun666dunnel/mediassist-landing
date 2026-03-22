import { Card, SectionLabel, ChartLegend } from './ui'
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'

export default function ChartsSection({ weeklyMsgs, intentBreakdown }) {
    return (
        <>
            <SectionLabel>Message activity</SectionLabel>
            <div className="gap-4 grid md:grid-cols-2">

                {/* Stacked bar — daily messages */}
                <Card>
                    <p className="mb-1 font-medium text-slate-700 text-sm">Daily messages — this week</p>
                    <ChartLegend items={[
                        { color: '#3b82f6', label: 'AI handled' },
                        { color: '#f87171', label: 'Escalated' },
                    ]} />
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={weeklyMsgs} barSize={16}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
                            <Bar dataKey="ai" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                            <Bar dataKey="escalated" stackId="a" fill="#f87171" radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Donut — intent breakdown */}
                <Card>
                    <p className="mb-1 font-medium text-slate-700 text-sm">Message intent breakdown</p>
                    <p className="mb-3 text-slate-400 text-xs">Last 30 days</p>
                    <div className="flex items-center gap-4">
                        <ResponsiveContainer width={160} height={160}>
                            <PieChart>
                                <Pie
                                    data={intentBreakdown}
                                    cx="50%" cy="50%"
                                    innerRadius={45} outerRadius={72}
                                    dataKey="value" stroke="none"
                                >
                                    {intentBreakdown.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                                    formatter={(v) => v + '%'}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col gap-2">
                            {intentBreakdown.map((d) => (
                                <div key={d.name} className="flex items-center gap-2">
                                    <span className="flex-shrink-0 rounded-sm w-2.5 h-2.5" style={{ background: d.color }} />
                                    <span className="text-slate-600 text-xs">{d.name}</span>
                                    <span className="ml-auto pl-4 font-medium text-slate-800 text-xs">{d.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

            </div>
        </>
    )
}