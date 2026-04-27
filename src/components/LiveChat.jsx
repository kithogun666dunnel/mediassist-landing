import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LivePipeline from './LiveChat/LivePipeline'
import DoctorCommandCenter from './LiveChat/DoctorCommandCenter'

const TABS = [
  {
    id: 'pipeline',
    label: '🔴 Live Pipeline',
    sub: 'Patient ↔ Doctor · Real backend',
  },
  {
    id: 'doctor',
    label: '🩺 Doctor Command Center',
    sub: 'Full clinic ops via WhatsApp',
  },
]

export default function LiveChat() {
  const [activeTab, setActiveTab] = useState('pipeline')

  return (
    <section id="live-demo" className="bg-gradient-to-br from-[#e8f5e9] via-white to-[#e3f2fd] px-8 md:px-16 py-24">

      {/* Header */}
      <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">Live Demo</div>
      <h2 className="mb-4 max-w-2xl font-serif font-bold text-navy text-4xl leading-tight">
        See both sides of the conversation.
      </h2>
      <p className="mb-10 max-w-xl text-gray-500 text-base leading-relaxed">
        Experience the full MediAssist pipeline — from the patient's first message to the doctor's WhatsApp alert.
        Then explore how doctors manage their entire clinic without leaving WhatsApp.
      </p>

      {/* Tab switcher */}
      <div className="flex flex-wrap gap-3 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col text-left px-5 py-3.5 rounded-2xl border transition-all ${
              activeTab === tab.id
                ? 'bg-navy text-white border-navy shadow-lg'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
            }`}
          >
            <span className={`font-semibold text-sm ${activeTab === tab.id ? 'text-white' : 'text-navy'}`}>
              {tab.label}
            </span>
            <span className={`text-xs mt-0.5 ${activeTab === tab.id ? 'text-white/60' : 'text-slate-400'}`}>
              {tab.sub}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'pipeline' ? <LivePipeline /> : <DoctorCommandCenter />}
        </motion.div>
      </AnimatePresence>

    </section>
  )
}
