import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    tier: 'Starter',
    name: 'Single Clinic',
    price: '₹4,999',
    period: '/ month',
    desc: 'Perfect for solo GPs handling 20–50 patient messages daily.',
    features: [
      '1 Doctor, 1 WhatsApp number',
      'AI Triage & Auto-Reply',
      'Appointment Booking',
      'Serious Case Alerts',
      'Up to 500 msgs / month',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    tier: 'Most Popular',
    name: 'Growth Clinic',
    price: '₹9,999',
    period: '/ month',
    desc: 'For busy clinics with multiple doctors and high patient volume.',
    features: [
      'Up to 3 Doctors',
      'Everything in Starter',
      'Priority Doctor Routing',
      'FAQ Customization',
      'Up to 2,000 msgs / month',
    ],
    cta: 'Book a Demo',
    featured: true,
  },
  {
    tier: 'Enterprise',
    name: 'Clinic Network',
    price: 'Custom',
    period: 'pricing',
    desc: 'Multi-branch hospitals, nursing homes, or diagnostic chains.',
    features: [
      'Unlimited Doctors',
      'Multi-branch Support',
      'Custom AI Persona',
      'Analytics Dashboard',
      'Dedicated Support',
    ],
    cta: 'Contact Us',
    featured: false,
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-24 px-8 md:px-16 bg-light" ref={ref}>
      <div className="text-xs font-semibold uppercase tracking-widest text-sky mb-3">Pricing & Scope</div>
      <h2 className="font-serif text-4xl font-bold text-navy max-w-xl leading-tight mb-4">
        Transparent MVP pricing
      </h2>
      <p className="text-gray-500 text-base leading-relaxed max-w-lg mb-16">
        Start small with one clinic. Scale to a network. Every tier includes the core WhatsApp AI engine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`rounded-3xl p-10 border transition-all duration-300 ${
              plan.featured
                ? 'bg-navy text-white border-transparent shadow-2xl scale-105 hover:-translate-y-1'
                : 'bg-white border-blue/10 hover:-translate-y-1 hover:shadow-xl'
            }`}
          >
            <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${plan.featured ? 'text-accent' : 'text-sky'}`}>
              {plan.tier}
            </div>
            <div className={`font-serif text-2xl font-bold mb-1 ${plan.featured ? 'text-white' : 'text-navy'}`}>
              {plan.name}
            </div>
            <div className={`font-serif text-4xl font-bold mt-5 mb-1 ${plan.featured ? 'text-white' : 'text-navy'}`}>
              {plan.price}{' '}
              <span className={`text-base font-sans font-normal ${plan.featured ? 'text-white/40' : 'text-gray-400'}`}>
                {plan.period}
              </span>
            </div>
            <p className={`text-sm leading-relaxed mt-3 mb-7 ${plan.featured ? 'text-white/55' : 'text-gray-400'}`}>
              {plan.desc}
            </p>

            <ul className={`mb-8 divide-y ${plan.featured ? 'divide-white/10' : 'divide-navy/6'}`}>
              {plan.features.map((f, j) => (
                <li key={j} className={`flex items-center gap-3 py-3 text-sm ${plan.featured ? 'text-white/70' : 'text-gray-500'}`}>
                  <Check size={15} className="text-accent shrink-0" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className={`block w-full text-center font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm ${
                plan.featured
                  ? 'bg-accent text-navy hover:shadow-lg hover:shadow-accent/40 hover:-translate-y-0.5'
                  : 'border border-navy/15 text-navy hover:bg-pale hover:border-blue'
              }`}
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
