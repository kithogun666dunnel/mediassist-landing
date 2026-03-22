import { Card, SectionLabel, StatusPill } from './ui'

export default function ClinicTodaySection({ alerts, appointments }) {
    return (
        <>
            <SectionLabel>Today's clinic</SectionLabel>
            <div className="gap-4 grid md:grid-cols-2">

                {/* Serious alerts */}
                <Card>
                    <p className="mb-3 font-medium text-slate-700 text-sm">Recent serious case alerts</p>
                    {alerts.map((a, i) => (
                        <div key={i} className="flex gap-3 py-2.5 border-slate-50 last:border-0 border-b">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${!a.resolved ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                                }`}>
                                {a.resolved ? '✓' : '!'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-700 text-sm">{a.name}</p>
                                <p className="text-slate-400 text-xs truncate">{a.msg}</p>
                            </div>
                            <span className="flex-shrink-0 pt-0.5 text-slate-300 text-xs">{a.time}</span>
                        </div>
                    ))}
                </Card>

                {/* Appointments table */}
                <Card>
                    <p className="mb-3 font-medium text-slate-700 text-sm">Today's appointments</p>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-slate-50 border-b text-slate-400 text-xs">
                                <th className="pb-2 font-medium text-left">Patient</th>
                                <th className="pb-2 font-medium text-left">Time</th>
                                <th className="pb-2 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((a, i) => (
                                <tr key={i} className="border-slate-50 last:border-0 border-b">
                                    <td className="py-2 text-slate-700">{a.name}</td>
                                    <td className="py-2 text-slate-500 text-xs">{a.time}</td>
                                    <td className="py-2 text-right"><StatusPill status={a.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

            </div>
        </>
    )
}