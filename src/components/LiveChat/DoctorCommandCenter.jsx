import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DOCTOR, DOCTOR_COMMANDS, FLOWS, DOCTOR_GREETING } from './doctorMockFlows.js'

function TypingIndicator() {
  return (
    <div className="flex items-center self-start gap-1 bg-white shadow-sm px-4 py-3 rounded-tl-xl rounded-tr-xl rounded-br-xl max-w-[80px]">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="bg-slate-400 rounded-full w-1.5 h-1.5"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function MessageBubble({ msg }) {
  const isDoctor = msg.role === 'doctor'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col ${isDoctor ? 'items-end' : 'items-start'}`}
    >
      {!isDoctor && msg.badge && (
        <div className={`mb-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold ${
          msg.badge.type === 'danger' ? 'bg-red-100 text-red-700'
          : msg.badge.type === 'warn' ? 'bg-amber-100 text-amber-700'
          : msg.badge.type === 'success' ? 'bg-emerald-100 text-emerald-700'
          : 'bg-blue-100 text-blue-700'
        }`}>
          {msg.badge.label}
        </div>
      )}
      <div className={`px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line max-w-[88%] shadow-sm ${
        isDoctor
          ? 'bg-[#dcf8c6] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-gray-700'
          : 'bg-white rounded-br-xl rounded-tr-xl rounded-tl-xl text-gray-800 border-l-4 border-[#25d366]'
      }`}>
        {msg.text}
      </div>
      {msg.time && (
        <span className="mt-0.5 text-[9px] text-black/30">{msg.time}</span>
      )}
    </motion.div>
  )
}

export default function DoctorCommandCenter() {
  const [messages, setMessages] = useState([DOCTOR_GREETING])
  const [activeCmd, setActiveCmd] = useState(null)
  const [loading, setLoading] = useState(false)
  const chatBoxRef = useRef(null)

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
  }, [messages, loading])

  function triggerCommand(cmd) {
    if (loading) return
    const flow = FLOWS[cmd.id]
    if (!flow) return

    setActiveCmd(cmd.id)
    setLoading(true)

    // Add doctor message immediately
    const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    const doctorMsg = { ...flow[0], id: Date.now(), time }
    setMessages((prev) => [...prev, doctorMsg])

    // Simulate bot typing delay, then add bot replies
    const botReplies = flow.slice(1)
    let delay = 900
    botReplies.forEach((reply, i) => {
      setTimeout(() => {
        const replyMsg = { ...reply, id: Date.now() + i + 1, time }
        setMessages((prev) => [...prev, replyMsg])
        if (i === botReplies.length - 1) {
          setLoading(false)
        }
      }, delay + i * 400)
    })
  }

  function clearChat() {
    setMessages([DOCTOR_GREETING])
    setActiveCmd(null)
  }

  // Group commands into sections
  const CMD_SECTIONS = [
    {
      label: 'Appointments',
      cmds: ['appointments', 'patient_detail'],
    },
    {
      label: 'Triage & Alerts',
      cmds: ['triage_summary', 'pending_alerts', 'ack'],
    },
    {
      label: 'Availability',
      cmds: ['unavailable', 'available'],
    },
    {
      label: 'Reports',
      cmds: ['report'],
    },
  ]

  const cmdMap = Object.fromEntries(DOCTOR_COMMANDS.map((c) => [c.id, c]))

  return (
    <div className="flex lg:flex-row flex-col items-start gap-8 mx-auto max-w-5xl">

      {/* ── Left: Command panel ── */}
      <div className="flex flex-col gap-4 w-full lg:w-52 shrink-0">
        <div>
          <p className="mb-1 font-semibold text-slate-500 text-xs uppercase tracking-wider">WhatsApp Commands</p>
          <p className="text-slate-400 text-[11px] leading-relaxed">Tap a command to see exactly what the doctor receives on their WhatsApp.</p>
        </div>

        {CMD_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="mb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{section.label}</p>
            <div className="flex flex-col gap-1.5">
              {section.cmds.map((id) => {
                const cmd = cmdMap[id]
                if (!cmd) return null
                const isActive = activeCmd === id
                return (
                  <button
                    key={id}
                    onClick={() => triggerCommand(cmd)}
                    disabled={loading}
                    className={`text-left px-3 py-2.5 rounded-xl border transition-all disabled:opacity-50 ${
                      isActive
                        ? 'bg-navy text-white border-navy'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue'
                    }`}
                  >
                    <span className="block text-xs font-semibold mb-0.5">
                      {cmd.icon} {cmd.label}
                    </span>
                    <span className={`text-[10px] leading-snug ${isActive ? 'text-white/60' : 'text-slate-400'}`}>
                      {cmd.desc}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <button
          onClick={clearChat}
          disabled={loading}
          className="mt-1 text-slate-400 hover:text-slate-600 text-xs disabled:opacity-40 transition-colors"
        >
          ↺ Clear chat
        </button>
      </div>

      {/* ── Center: Doctor's Phone ── */}
      <div className="flex flex-col items-center flex-1">
        <div className="relative bg-navy shadow-2xl mx-auto p-3 border border-white/5 rounded-[40px] w-full max-w-[320px]">
          {/* Notch */}
          <div className="bg-black mx-auto mb-2 rounded-b-2xl w-16 h-4" />

          <div className="rounded-[28px] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-[#075e54] px-4 py-3 border-white/10 border-b">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-gradient-to-br from-sky to-blue rounded-full w-9 h-9 font-bold text-white text-xs shrink-0">
                  {DOCTOR.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{DOCTOR.name}</p>
                  <p className="text-[11px] text-white/50">
                    {loading
                      ? <span className="text-green-300 animate-pulse">● MediAssist typing...</span>
                      : '● MediAssist connected'}
                  </p>
                </div>
              </div>
              {/* Availability dot */}
              <div className="flex items-center gap-1">
                <span className={`rounded-full w-2 h-2 ${activeCmd === 'unavailable' ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`} />
              </div>
            </div>

            {/* Chat */}
            <div
              ref={chatBoxRef}
              className="flex flex-col gap-2 p-3 overflow-y-auto"
              style={{ background: '#ece5dd', minHeight: 400, maxHeight: 460 }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
              </AnimatePresence>
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <TypingIndicator />
                </motion.div>
              )}
            </div>

            {/* Locked input */}
            <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2">
              <div className="flex-1 bg-white/70 px-3 py-2 rounded-full text-[11px] text-gray-400 select-none">
                Tap a command on the left →
              </div>
              <div className="flex justify-center items-center bg-[#25d366] opacity-30 rounded-full w-8 h-8 cursor-not-allowed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Live label */}
        <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
          <span className="bg-blue rounded-full w-2 h-2" />
          <span>Mock data · Simulated doctor session</span>
        </div>
      </div>

      {/* ── Right: Feature highlights ── */}
      <div className="flex flex-col gap-3 w-full lg:w-48 shrink-0">
        <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider">Doctor superpowers</p>

        {[
          {
            icon: '🗓️',
            title: 'Full schedule control',
            desc: 'View, confirm, reschedule — all from WhatsApp.',
          },
          {
            icon: '👤',
            title: 'Instant patient lookup',
            desc: 'Name, history, meds, last visit — one message away.',
          },
          {
            icon: '🧠',
            title: 'AI triage reports',
            desc: 'Daily summary of every patient the AI assessed.',
          },
          {
            icon: '🚨',
            title: 'Crisis ACK flow',
            desc: '30-min escalation timer cancelled when doctor replies.',
          },
          {
            icon: '🔴',
            title: 'Availability toggle',
            desc: 'Go unavailable in surgery — AI holds non-urgent cases.',
          },
          {
            icon: '📊',
            title: 'Weekly reports',
            desc: 'Hours saved, ROI, patient ratings — every Monday.',
          },
        ].map((item) => (
          <div key={item.title} className="bg-white/70 p-3 border border-slate-100 rounded-xl">
            <p className="mb-0.5 font-semibold text-slate-700 text-xs">{item.icon} {item.title}</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
          </div>
        ))}

        <motion.a
          href="/dashboard"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 mt-2 bg-navy text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
        >
          <span className="bg-green-400 rounded-full w-1.5 h-1.5 animate-pulse" />
          Open Full Dashboard →
        </motion.a>
      </div>

    </div>
  )
}
