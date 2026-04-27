import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mediassist-production.up.railway.app'
const DEMO_PHONE = '+919999999999'

const QUICK_MESSAGES = [
  { label: 'Greeting', text: 'Namaste' },
  { label: 'Appointment', text: 'Mujhe appointment book karni hai' },
  { label: 'Symptoms', text: 'Mujhe 3 din se pet mein dard ho raha hai' },
  { label: 'Crisis', text: 'Main 7 mahine ki pregnant hoon, baby ka movement kam ho gaya hai' },
]

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

function PhoneShell({ header, chatContent, inputBar, label, labelColor = 'text-slate-400' }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-navy shadow-2xl mx-auto p-3 border border-white/5 rounded-[40px] w-full max-w-[300px]">
        {/* Notch */}
        <div className="bg-black mx-auto mb-2 rounded-b-2xl w-16 h-4" />
        <div className="rounded-[28px] overflow-hidden">
          {/* WA Header */}
          {header}
          {/* Chat area */}
          {chatContent}
          {/* Input */}
          {inputBar}
        </div>
      </div>
      <div className={`flex items-center gap-1.5 mt-3 text-xs ${labelColor}`}>
        {label}
      </div>
    </div>
  )
}

function WAHeader({ name, avatar, status, statusColor = 'text-white/50' }) {
  return (
    <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 border-white/10 border-b">
      <div className="flex justify-center items-center bg-gradient-to-br from-accent to-blue rounded-full w-9 h-9 font-bold text-white text-xs shrink-0">
        {avatar}
      </div>
      <div>
        <p className="font-semibold text-white text-sm">{name}</p>
        <p className={`text-[11px] ${statusColor}`}>{status}</p>
      </div>
    </div>
  )
}

function DoctorAlertInline({ payload }) {
  const score = payload?.flow?.triageScore
  const isCrisis = payload?.flow?.isCrisis
  if (!payload?.doctorAlert) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`mx-auto my-1 px-3 py-1.5 rounded-xl text-[10px] font-medium flex items-center gap-1.5 w-fit ${
        isCrisis
          ? 'bg-red-100 text-red-700 border border-red-200'
          : 'bg-amber-50 text-amber-700 border border-amber-200'
      }`}
    >
      <span>{isCrisis ? '🚨' : '⚠️'}</span>
      {isCrisis ? 'CRISIS — Doctor alerted' : `Doctor alerted · S${score}/5`}
    </motion.div>
  )
}

// Converts a patient bot message into what the doctor would receive on WhatsApp
function buildDoctorMessages(botMsg) {
  if (!botMsg.doctorAlert) return []
  const { flow } = botMsg
  const isCrisis = flow?.isCrisis
  const score = flow?.triageScore

  const msgs = []

  if (isCrisis) {
    msgs.push({
      id: `doc-${botMsg.id}-crisis`,
      type: 'alert',
      text: `🚨 *CRISIS ALERT*\n\n👤 Demo Patient\n📋 "${botMsg.patientText || 'Patient message'}"\n⚠️ Severity: S${score}/5 · Crisis: YES\n\nReply *ACK ${Math.floor(1000 + Math.random() * 9000)}* to acknowledge.`,
      time: botMsg.time,
    })
  } else if (score >= 3) {
    msgs.push({
      id: `doc-${botMsg.id}-alert`,
      type: 'alert',
      text: `⚠️ *Patient Alert · S${score}/5*\n\n👤 Demo Patient\n📋 "${botMsg.patientText || 'Patient message'}"\n\nAI triage: Moderate concern. Review recommended.\n\nReply *ACK* to confirm seen.`,
      time: botMsg.time,
    })
  }

  if (flow?.appointmentBooked) {
    msgs.push({
      id: `doc-${botMsg.id}-appt`,
      type: 'info',
      text: `📅 *New Appointment Booked by AI*\n\n👤 Demo Patient\n🕐 ${flow.appointmentTime || 'Slot TBD'}\n\nNo action needed — patient confirmed.`,
      time: botMsg.time,
    })
  }

  return msgs
}

export default function LivePipeline() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'bot',
      text: 'Namaste 🙏 I am MediAssist AI. Try sending a message — this is a live demo connected to the real backend.',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [doctorMessages, setDoctorMessages] = useState([
    {
      id: 'doc-init',
      type: 'info',
      text: '🩺 *MediAssist Doctor Channel*\n\nThis is your dedicated alert channel. You will receive:\n• 🚨 Crisis alerts (S4–S5)\n• ⚠️ Serious case flags (S3)\n• 📅 Appointment booking confirmations\n\nTry sending a medical message on the patient phone →',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const patientBoxRef = useRef(null)
  const doctorBoxRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (patientBoxRef.current) patientBoxRef.current.scrollTop = patientBoxRef.current.scrollHeight
  }, [messages, loading])

  useEffect(() => {
    if (doctorBoxRef.current) doctorBoxRef.current.scrollTop = doctorBoxRef.current.scrollHeight
  }, [doctorMessages])

  async function sendMessage(text) {
    if (!text.trim() || loading) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${BACKEND_URL}/webhook/dev/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: DEMO_PHONE, message: text.trim() }),
      })
      if (!res.ok) throw new Error(`Server error: ${res.status}`)
      const data = await res.json()

      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        text: data.reply || '(no reply)',
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        doctorAlert: data.doctorAlert,
        flow: data.flow,
        patientText: text.trim(),
      }
      setMessages((prev) => [...prev, botMsg])

      // Mirror doctor messages
      const docMsgs = buildDoctorMessages(botMsg)
      if (docMsgs.length > 0) {
        setTimeout(() => {
          setDoctorMessages((prev) => [...prev, ...docMsgs])
        }, 600)
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'system',
          text: `⚠️ Could not reach backend: ${err.message}`,
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  async function resetSession() {
    setLoading(true)
    setInput('')
    try {
      await fetch(`${BACKEND_URL}/webhook/dev/reset-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: DEMO_PHONE }),
      })
    } catch (_) {}
    const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    setMessages([{ id: Date.now(), role: 'bot', text: '🔄 Session reset. Start fresh!', time }])
    setDoctorMessages([{ id: 'doc-reset', type: 'info', text: '🔄 Session reset. Doctor channel cleared.', time }])
    setLoading(false)
    inputRef.current?.focus()
  }

  const CHAT_STYLE = { background: '#ece5dd', minHeight: 360, maxHeight: 400 }

  return (
    <div className="flex lg:flex-row flex-col items-start gap-8 mx-auto max-w-5xl">

      {/* Quick message buttons */}
      <div className="flex flex-col gap-3 w-full lg:w-44 shrink-0">
        <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider">Try these</p>
        {QUICK_MESSAGES.map((q) => (
          <button
            key={q.label}
            onClick={() => sendMessage(q.text)}
            disabled={loading}
            className="bg-white hover:bg-slate-50 disabled:opacity-50 px-4 py-3 border border-slate-200 hover:border-blue rounded-xl text-sm text-left transition-all"
          >
            <span className="block mb-0.5 font-medium text-navy text-xs">{q.label}</span>
            <span className="text-slate-500 text-[11px] leading-snug">{q.text}</span>
          </button>
        ))}
        <button
          onClick={resetSession}
          disabled={loading}
          className="disabled:opacity-40 mt-1 text-slate-400 hover:text-slate-600 text-xs transition-colors"
        >
          ↺ Reset session
        </button>
      </div>

      {/* ── Patient Phone ── */}
      <PhoneShell
        label={
          <>
            <span className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
            <span>Patient View · Live backend</span>
          </>
        }
        labelColor="text-slate-400"
        header={
          <WAHeader
            name="MediAssist AI"
            avatar="MA"
            status={loading
              ? <span className="text-green-300 animate-pulse">● typing...</span>
              : '● online'}
          />
        }
        chatContent={
          <div ref={patientBoxRef} className="flex flex-col gap-2 p-3 overflow-y-auto" style={CHAT_STYLE}>
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : msg.role === 'system' ? 'items-center' : 'items-start'
                  }`}
                >
                  {msg.role === 'system' ? (
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-[10px] text-slate-500">{msg.text}</span>
                  ) : (
                    <>
                      <div className={`px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line max-w-[85%] shadow-sm ${
                        msg.role === 'user'
                          ? 'bg-[#dcf8c6] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-gray-700'
                          : 'bg-white rounded-br-xl rounded-tr-xl rounded-tl-xl text-gray-800 border-l-4 border-[#25d366]'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="mt-0.5 text-[9px] text-black/30">{msg.time}</span>
                      <DoctorAlertInline payload={msg} />
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <TypingIndicator />
              </motion.div>
            )}
          </div>
        }
        inputBar={
          <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
              placeholder="Type a message..."
              disabled={loading}
              className="flex-1 bg-white disabled:opacity-50 px-3 py-2 rounded-full outline-none text-[12px] text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="flex justify-center items-center bg-[#25d366] disabled:opacity-40 rounded-full w-8 h-8 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </button>
          </div>
        }
      />

      {/* ── Arrow ── */}
      <div className="hidden lg:flex flex-col items-center justify-center self-center gap-2 text-slate-300">
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl"
        >
          →
        </motion.div>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 rotate-0">triggers</span>
      </div>

      {/* ── Doctor Phone ── */}
      <PhoneShell
        label={
          <>
            <span className="bg-amber-400 rounded-full w-2 h-2" />
            <span>Doctor's WhatsApp · Read-only</span>
          </>
        }
        labelColor="text-amber-500"
        header={
          <WAHeader
            name="Dr. Priya Sharma"
            avatar="PS"
            status="● MediAssist alerts channel"
            statusColor="text-white/50"
          />
        }
        chatContent={
          <div ref={doctorBoxRef} className="flex flex-col gap-2 p-3 overflow-y-auto" style={CHAT_STYLE}>
            <AnimatePresence initial={false}>
              {doctorMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-start"
                >
                  {msg.badge && (
                    <div className={`mb-1 px-2 py-1 rounded-lg text-[10px] font-semibold ${
                      msg.badge.type === 'danger' ? 'bg-red-100 text-red-700'
                      : msg.badge.type === 'warn' ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700'
                    }`}>
                      {msg.badge.label}
                    </div>
                  )}
                  <div className={`px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line max-w-[90%] shadow-sm rounded-br-xl rounded-tr-xl rounded-tl-xl ${
                    msg.type === 'alert'
                      ? 'bg-red-50 border-l-4 border-red-400 text-gray-800'
                      : 'bg-white border-l-4 border-blue text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="mt-0.5 text-[9px] text-black/30">{msg.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        }
        inputBar={
          <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2">
            <div className="flex-1 bg-white/60 px-3 py-2 rounded-full text-[11px] text-gray-400 select-none cursor-not-allowed">
              Doctor replies via WhatsApp commands...
            </div>
            <div className="flex justify-center items-center bg-slate-300 rounded-full w-8 h-8 cursor-not-allowed opacity-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
              </svg>
            </div>
          </div>
        }
      />

      {/* Right info */}
      <div className="flex flex-col gap-3 w-full lg:w-44 shrink-0">
        <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider">What fires</p>
        {[
          { icon: '🚨', title: 'Crisis alert', desc: 'S4–S5 → instant doctor ping' },
          { icon: '⚠️', title: 'Triage flag', desc: 'S3 → flagged for review' },
          { icon: '📅', title: 'Booking confirm', desc: 'AI auto-books, notifies doctor' },
          { icon: '✅', title: 'ACK system', desc: 'Doctor replies ACK to confirm' },
        ].map((item) => (
          <div key={item.title} className="bg-white/70 p-3 border border-slate-100 rounded-xl">
            <p className="mb-0.5 font-semibold text-slate-700 text-xs">{item.icon} {item.title}</p>
            <p className="text-slate-400 text-[11px] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
