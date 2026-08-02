import { motion } from 'framer-motion'

const metrics = [
  { num: '847', label: 'Patient messages handled', sub: 'in 30 days — active deployment' },
  { num: '91%', label: 'Automation rate', sub: 'without doctor involvement' },
  { num: '9', label: 'Crisis cases escalated', sub: 'all acknowledged — none missed' },
  { num: '0', label: 'New apps for patients', sub: 'WhatsApp only — already installed' },
]

export default function SocialProofBar() {
  return (
    <div className="bg-white border-y border-slate-100 px-8 md:px-16 py-5">
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 mx-auto max-w-5xl">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-navy text-2xl">{m.num}</span>
              <span className="font-semibold text-gray-400 text-xs uppercase tracking-wider">{m.label}</span>
            </div>
            <span className="mt-0.5 text-gray-300 text-xs">{m.sub}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
