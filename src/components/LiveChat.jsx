import { motion } from 'framer-motion'
// import LivePipeline from './LiveChat/LivePipeline'  // backend not ready
import DoctorCommandCenter from './LiveChat/DoctorCommandCenter'

export default function LiveChat() {
  return (
    <section id="live-demo" className="bg-light px-8 md:px-16 py-24">

      {/* Header */}
      <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">Doctor Command Center</div>
      <h2 className="mb-4 max-w-2xl font-serif font-bold text-navy text-4xl leading-tight">
        Command your entire clinic from WhatsApp.
      </h2>
      <p className="mb-10 max-w-xl text-gray-500 text-base leading-relaxed">
        No portal. No new app. Doctors manage schedules, pull patient profiles, review triage summaries, acknowledge alerts, and get weekly reports — all via WhatsApp commands.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <DoctorCommandCenter />
      </motion.div>

    </section>
  )
}
