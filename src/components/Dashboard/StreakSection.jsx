import { Card, SectionLabel } from './ui'

const STREAK_COLORS = ['#e2e8f0', '#bbf7d0', '#4ade80', '#16a34a']

const WINS = [
    { icon: '✓', color: 'bg-emerald-50 text-emerald-700', text: 'Zero missed serious cases this week', sub: 'All 4 alerts delivered in under 3s' },
    { icon: '✓', color: 'bg-emerald-50 text-emerald-700', text: '37 messages on Tuesday — new daily record', sub: 'Previous best was 33' },
    { icon: '✓', color: 'bg-emerald-50 text-emerald-700', text: '0 cancellations this week', sub: 'All 18 slots filled and confirmed' },
    { icon: '~', color: 'bg-amber-50   text-amber-600', text: 'Goal: 95% AI auto-reply rate', sub: 'Currently at 91% — 4% to go' },
]

export default function StreakSection({ streak, cellLevels }) {
    return (
        <>
            <SectionLabel>Progress &amp; streaks</SectionLabel>
            <div className="gap-4 grid md:grid-cols-2">

                {/* Streak heatmap */}
                <Card>
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <p className="font-medium text-slate-700 text-sm">AI active streak</p>
                            <p className="mt-0.5 text-slate-400 text-xs">Your clinic hasn't missed a single message</p>
                        </div>
                        <span className="bg-emerald-50 px-2.5 py-1 rounded-full font-medium text-emerald-700 text-xs">
                            Personal best
                        </span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="font-semibold text-slate-800 text-5xl">{streak}</span>
                        <span className="text-slate-400 text-sm">day streak</span>
                    </div>
                    <div className="gap-[3px] grid grid-cols-[repeat(30,1fr)]">
                        {cellLevels.map((level, i) => (
                            <div
                                key={i}
                                style={{ background: STREAK_COLORS[level] }}
                                className="rounded-[2px] aspect-square"
                            />
                        ))}
                    </div>
                    <p className="mt-2 text-slate-300 text-xs">Mar 2026 · each cell = 1 day</p>
                </Card>

                {/* Weekly wins */}
                <Card>
                    <p className="mb-3 font-medium text-slate-700 text-sm">This week's wins</p>
                    {WINS.map((w, i) => (
                        <div key={i} className="flex gap-3 py-2.5 border-slate-50 last:border-0 border-b">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${w.color}`}>
                                {w.icon}
                            </div>
                            <div>
                                <p className="text-slate-700 text-sm">{w.text}</p>
                                <p className="mt-0.5 text-slate-400 text-xs">{w.sub}</p>
                            </div>
                        </div>
                    ))}
                </Card>

            </div>
        </>
    )
}