import { motion } from 'framer-motion'

const messages = [
  { type: 'in', text: 'Namaste, mujhe kal ka appointment chahiye 🙏', time: '10:02 AM' },
  {
    type: 'ai',
    text: '🗓️ Available slots for tomorrow:\n\n1️⃣ 9:00 AM\n2️⃣ 11:30 AM\n3️⃣ 3:00 PM\n\nReply with slot number to confirm.',
    time: '10:02 AM · AI',
  },
  { type: 'out', text: '2', time: '10:03 AM' },
  {
    type: 'ai',
    text: '✅ Appointment confirmed!\n\n📅 Tomorrow · 11:30 AM\n🏥 Sharma General Clinic\n\nPlease arrive 5 minutes early.',
    time: '10:03 AM · AI',
  },
  { type: 'in', text: 'Clinic ka address kya hai?', time: '10:05 AM' },
  {
    type: 'ai',
    text: '📍 45, MG Road, Pune – 411001\nNear City Hospital, Ground Floor.',
    time: '10:05 AM · AI',
  },
]

const bubbleStyle = {
  in: 'bg-white self-start rounded-br-xl rounded-tr-xl rounded-tl-xl text-gray-700',
  out: 'bg-[#dcf8c6] self-end rounded-bl-xl rounded-tl-xl rounded-tr-xl text-gray-700',
  ai: 'bg-blue-50 self-start rounded-br-xl rounded-tr-xl rounded-tl-xl text-blue-900 border-l-4 border-blue',
}

export default function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative flex justify-center"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-sky/20 blur-3xl scale-110 animate-pulse" />

      {/* Phone shell */}
      <div className="relative w-[290px] bg-navy rounded-[44px] p-4 shadow-2xl border border-white/5">
        {/* Notch */}
        <div className="w-20 h-5 bg-black rounded-b-2xl mx-auto mb-3" />

        {/* Screen */}
        <div className="rounded-[28px] overflow-hidden bg-[#075e54]">
          {/* WA Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-blue flex items-center justify-center text-white text-xs font-bold">
              MA
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Sharma General Clinic</p>
              <p className="text-white/50 text-[11px]">● MediAssist AI Active</p>
            </div>
          </div>

          {/* Chat */}
          <div
            className="flex flex-col gap-2 p-3 min-h-[380px]"
            style={{ background: '#ece5dd' }}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.4, duration: 0.3 }}
                className={`flex flex-col max-w-[85%] ${msg.type === 'out' ? 'self-end' : 'self-start'}`}
              >
                <div className={`px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line ${bubbleStyle[msg.type]}`}>
                  {msg.text}
                </div>
                <span className={`text-[9px] text-black/30 mt-0.5 ${msg.type === 'out' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
