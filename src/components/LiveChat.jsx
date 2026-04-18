import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BACKEND_URL = 'https://mediassist-production.up.railway.app'
const DEMO_PHONE = '+919999999999'

const QUICK_MESSAGES = [
  { label: 'Greeting', text: 'Namaste' },
  { label: 'Appointment', text: 'Mujhe appointment book karni hai' },
  { label: 'Medical Query', text: 'Mujhe 3 din se pet mein dard ho raha hai' },
  { label: 'Pregnancy', text: 'Main 7 mahine ki pregnant hoon, baby ka movement kam ho gaya hai' },
]

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 self-start bg-white px-4 py-3 rounded-br-xl rounded-tr-xl rounded-tl-xl shadow-sm max-w-[80px]">
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

function DoctorAlertBadge({ payload }) {
  const score = payload?.flow?.triageScore
  const isCrisis = payload?.flow?.isCrisis
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`mx-auto my-2 px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 w-fit ${
        isCrisis
          ? 'bg-red-100 text-red-700 border border-red-200'
          : 'bg-amber-50 text-amber-700 border border-amber-200'
      }`}
    >
      <span>{isCrisis ? '🚨' : '⚠️'}</span>
      {isCrisis
        ? 'CRISIS DETECTED — Doctor alerted immediately'
        : `Doctor alerted · Severity ${score}/5`}
    </motion.div>
  )
}

export default function LiveChat() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: 'bot',
      text: 'Namaste 🙏 I am MediAssist AI. Try sending a message below — this is a live demo connected to the real backend.',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text) {
    if (!text.trim() || loading) return
    setError(null)

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
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      setError(err.message)
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

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  async function resetSession() {
    setLoading(true)
    try {
      await fetch(`${BACKEND_URL}/webhook/dev/reset-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: DEMO_PHONE }),
      })
      setMessages([
        {
          id: Date.now(),
          role: 'bot',
          text: '🔄 Session reset. Start fresh!',
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch (_) {}
    setLoading(false)
  }

  return (
    <section id="live-demo" className="bg-gradient-to-br from-[#e8f5e9] via-white to-[#e3f2fd] px-8 md:px-16 py-24">
      {/* Header */}
      <div className="mb-3 font-semibold text-sky text-xs uppercase tracking-widest">Live Demo</div>
      <h2 className="mb-4 max-w-xl font-serif font-bold text-navy text-4xl leading-tight">
        Talk to the AI. Right now.
      </h2>
      <p className="mb-12 max-w-lg text-gray-500 text-base leading-relaxed">
        This is not a simulation. Every message goes to our live backend — same engine that runs in real clinics.
        Try a medical query, book an appointment, or trigger a crisis response.
      </p>

      <div className="flex lg:flex-row flex-col items-start gap-10 mx-auto max-w-5xl">
        {/* Quick message buttons */}
        <div className="flex flex-col gap-3 lg:w-48 w-full shrink-0">
          <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider">Try these</p>
          {QUICK_MESSAGES.map((q) => (
            <button
              key={q.label}
              onClick={() => sendMessage(q.text)}
              disabled={loading}
              className="text-left bg-white hover:bg-slate-50 disabled:opacity-50 px-4 py-3 border border-slate-200 hover:border-blue rounded-xl text-sm transition-all"
            >
              <span className="block font-medium text-navy text-xs mb-0.5">{q.label}</span>
              <span className="text-slate-500 text-xs leading-snug">{q.text}</span>
            </button>
          ))}
          <button
            onClick={resetSession}
            disabled={loading}
            className="mt-2 text-xs text-slate-400 hover:text-slate-600 disabled:opacity-40 transition-colors"
          >
            ↺ Reset session
          </button>
        </div>

        {/* Phone shell */}
        <div className="flex-1 w-full max-w-sm mx-auto lg:mx-0">
          <div className="relative bg-navy rounded-[40px] p-3 shadow-2xl border border-white/5 w-full max-w-[340px] mx-auto">
            {/* Notch */}
            <div className="bg-black mx-auto mb-2 rounded-b-2xl w-16 h-4" />

            {/* Screen */}
            <div className="rounded-[28px] overflow-hidden">
              {/* WA Header */}
              <div className="flex justify-between items-center gap-3 bg-[#075e54] px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-gradient-to-br from-accent to-blue rounded-full w-9 h-9 font-bold text-white text-xs">
                    MA
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">MediAssist AI</p>
                    <p className="text-[11px] text-white/50">
                      {loading ? (
                        <span className="text-green-300 animate-pulse">● typing...</span>
                      ) : (
                        '● online'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat area */}
              <div
                className="flex flex-col gap-2 p-3 overflow-y-auto"
                style={{ background: '#ece5dd', minHeight: 380, maxHeight: 420 }}
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : msg.role === 'system' ? 'items-center' : 'items-start'}`}
                    >
                      {msg.role === 'system' ? (
                        <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-500 text-[10px]">{msg.text}</span>
                      ) : (
                        <>
                          <div
                            className={`px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line max-w-[85%] shadow-sm ${
                              msg.role === 'user'
                                ? 'bg-[#dcf8c6] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-gray-700'
                                : 'bg-white rounded-br-xl rounded-tr-xl rounded-tl-xl text-gray-800 border-l-4 border-[#25d366]'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="mt-0.5 text-[9px] text-black/30">{msg.time}</span>
                          {msg.doctorAlert && <DoctorAlertBadge payload={msg} />}
                        </>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  disabled={loading}
                  className="flex-1 bg-white disabled:opacity-50 px-3 py-2 rounded-full text-[12px] text-gray-700 placeholder-gray-400 outline-none"
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
            </div>
          </div>

          {/* Live indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <span className="bg-green-400 rounded-full w-2 h-2 animate-pulse" />
            <span className="text-slate-400 text-xs">Connected to live backend · Railway</span>
          </div>
        </div>

        {/* Right side info */}
        <div className="flex flex-col gap-4 lg:w-56 w-full shrink-0">
          <p className="font-semibold text-slate-500 text-xs uppercase tracking-wider">What to expect</p>
          {[
            { icon: '🗓️', title: 'Booking flow', desc: 'Ask for an appointment — it shows real available slots.' },
            { icon: '🧠', title: 'Medical triage', desc: 'Describe a symptom — AI scores severity 1–5.' },
            { icon: '🚨', title: 'Crisis detection', desc: 'Mention a serious symptom — watch the doctor alert fire.' },
            { icon: '💬', title: 'Hinglish support', desc: 'Works in Hindi, English, or mixed — just like patients text.' },
          ].map((item) => (
            <div key={item.title} className="bg-white/70 p-3 border border-slate-100 rounded-xl">
              <p className="mb-1 font-semibold text-slate-700 text-xs">{item.icon} {item.title}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
