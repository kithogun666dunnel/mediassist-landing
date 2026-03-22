import { useState } from 'react'
import { MOCK } from './mockData'
import DashboardHeader from './DashboardHeader'
import MetricsRow from './MetricsRow'
import StreakSection from './StreakSection'
import ChartsSection from './ChartsSection'
import BenchmarkSection from './BenchmarkSection'
import PatientLoveSection from './PatientLoveSection'
import FinancialSection from './FinancialSection'
import ClinicTodaySection from './ClinicTodaySection'

export default function Dashboard() {
    const [range, setRange] = useState('30d')

    return (
        <div className="bg-slate-50 min-h-screen font-sans">

            <DashboardHeader
                doctor={MOCK.doctor}
                range={range}
                onRangeChange={setRange}
            />

            <div className="mx-auto px-6 pb-16 max-w-6xl">

                {/* Demo banner */}
                <div className="flex items-center gap-2 bg-amber-50 mt-4 mb-2 px-4 py-2.5 border border-amber-200 rounded-xl text-amber-800 text-sm">
                    <span>⚡</span>
                    <span>Demo mode — sample data. Real dashboard connects to your clinic's live data.</span>
                </div>

                <MetricsRow stats={MOCK.stats} />
                <StreakSection streak={MOCK.streak} cellLevels={MOCK.streakCellLevels} />
                <ChartsSection weeklyMsgs={MOCK.weeklyMsgs} intentBreakdown={MOCK.intentBreakdown} />
                <BenchmarkSection cityRank={MOCK.cityRank} benchmarkWeekly={MOCK.benchmarkWeekly} />
                <PatientLoveSection patientLove={MOCK.patientLove} sentimentTrend={MOCK.sentimentTrend} />
                <FinancialSection stats={MOCK.stats} />
                <ClinicTodaySection alerts={MOCK.alerts} appointments={MOCK.appointments} />

            </div>
        </div>
    )
}