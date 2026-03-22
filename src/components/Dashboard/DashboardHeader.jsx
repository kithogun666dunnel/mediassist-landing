import { useNavigate } from 'react-router-dom'

export default function DashboardHeader({ doctor, range, onRangeChange }) {
    const navigate = useNavigate()

    return (
        <div className="top-0 z-10 sticky bg-white border-slate-100 border-b">
            <div className="flex flex-wrap justify-between items-center gap-4 mx-auto px-6 py-3 max-w-6xl">

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-1 text-slate-400 hover:text-slate-700 text-sm transition-colors"
                    >
                        ← Back
                    </button>
                    <span className="text-slate-200">|</span>
                    <span className="font-semibold text-slate-800 text-sm">
                        {doctor.name} — {doctor.clinic}
                    </span>
                    <span className="text-slate-400 text-xs">{doctor.city}</span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        {['7d', '30d', '90d'].map((r) => (
                            <button
                                key={r}
                                onClick={() => onRangeChange(r)}
                                className={`text-xs px-3 py-1.5 rounded-lg transition-all ${range === r
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full text-emerald-700 text-xs">
                        <span className="bg-emerald-500 rounded-full w-1.5 h-1.5 animate-pulse" />
                        AI Active
                    </div>
                </div>

            </div>
        </div>
    )
}