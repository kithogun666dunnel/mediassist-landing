// All mock data for Doctor Command Center (Tab 2)
// Each FLOW is a command the doctor can trigger, producing a thread of WhatsApp messages

export const DOCTOR = {
  name: 'Dr. Priya Sharma',
  clinic: 'Sharma Women\'s Clinic',
  phone: '+91 98200 00001',
  avatar: 'PS',
}

// Today's date label
const TODAY = 'Today'

// ─── Quick command buttons shown on left panel ───────────────────────────────
export const DOCTOR_COMMANDS = [
  {
    id: 'appointments',
    label: "Today's Appointments",
    icon: '🗓️',
    command: 'appointments today',
    desc: 'View full schedule',
  },
  {
    id: 'patient_detail',
    label: 'Patient Detail',
    icon: '👤',
    command: 'patient Meera Joshi',
    desc: 'Pull a patient profile',
  },
  {
    id: 'triage_summary',
    label: 'Triage Summary',
    icon: '🧠',
    command: 'triage summary today',
    desc: 'All AI assessments today',
  },
  {
    id: 'pending_alerts',
    label: 'Pending Alerts',
    icon: '🚨',
    command: 'alerts pending',
    desc: 'Unacknowledged cases',
  },
  {
    id: 'ack',
    label: 'ACK Case',
    icon: '✅',
    command: 'ACK 1042',
    desc: 'Acknowledge a case',
  },
  {
    id: 'unavailable',
    label: 'Go Unavailable',
    icon: '🔴',
    command: 'unavailable 2h',
    desc: 'Pause alerts for 2 hours',
  },
  {
    id: 'available',
    label: 'Go Available',
    icon: '🟢',
    command: 'available',
    desc: 'Resume alert delivery',
  },
  {
    id: 'report',
    label: 'Weekly Report',
    icon: '📊',
    command: 'report weekly',
    desc: 'Performance summary',
  },
]

// ─── Mock response flows ──────────────────────────────────────────────────────
// Each flow: array of messages { role: 'doctor'|'bot', text, time?, badge? }
// badge: { type: 'info'|'warn'|'danger'|'success', label }

export const FLOWS = {

  appointments: [
    {
      role: 'doctor',
      text: 'appointments today',
      time: '9:01 AM',
    },
    {
      role: 'bot',
      time: '9:01 AM',
      text: `📅 *Your Schedule — Mon 27 Apr 2026*\n\n🟢 09:00 AM — Meera Joshi _(AI-booked)_\n🟢 10:30 AM — Rahul Shah _(AI-booked)_\n🟡 11:30 AM — Deepa Nair _(pending confirm)_\n🟢 02:00 PM — Kiran Pawar _(confirmed)_\n🔴 03:30 PM — Suresh More _(cancelled)_\n🤖 04:00 PM — Anjali Singh _(AI-booked)_\n\n*6 total · 4 confirmed · 1 pending · 1 cancelled*\n\nReply _patient <name>_ for details.`,
    },
  ],

  patient_detail: [
    {
      role: 'doctor',
      text: 'patient Meera Joshi',
      time: '9:03 AM',
    },
    {
      role: 'bot',
      time: '9:03 AM',
      text: `👤 *Meera Joshi*\n📞 +91 98100 11223\n🎂 Age: 28\n🩸 Blood: B+\n\n*Last Visit:* 14 Apr 2026\n*Chief Complaint:* Irregular periods, mild cramps\n*Severity:* S2 (Moderate)\n*AI Triage:* Suggested follow-up in 2 weeks\n\n*Upcoming:* Today 09:00 AM ✅\n\n*Medications on record:*\n• Folic acid 5mg — daily\n• Mefenamic acid 500mg — PRN\n\nReply _notes Meera Joshi_ to add a note.`,
    },
  ],

  triage_summary: [
    {
      role: 'doctor',
      text: 'triage summary today',
      time: '9:05 AM',
    },
    {
      role: 'bot',
      time: '9:05 AM',
      text: `🧠 *AI Triage Summary — 27 Apr 2026*\n\n*14 patients assessed today*\n\n🔴 S5 — 0 cases\n🟠 S4 — 1 case → Divya Nair (9:47 AM)\n🟡 S3 — 3 cases → follow-up recommended\n🟢 S2 — 6 cases → routine\n⚪ S1 — 4 cases → FAQ only\n\n*Escalated to you:* 1\n*AI resolved:* 13\n*Avg response time:* 2.4 sec\n\nReply _triage <name>_ for individual breakdown.`,
    },
  ],

  pending_alerts: [
    {
      role: 'doctor',
      text: 'alerts pending',
      time: '9:07 AM',
    },
    {
      role: 'bot',
      time: '9:07 AM',
      badge: { type: 'danger', label: '🚨 1 unacknowledged alert' },
      text: `🚨 *Pending Alerts (1)*\n\n*Case #1042*\n👤 Divya Nair · +91 98200 44556\n⏰ 9:47 AM\n📋 _"Heavy bleeding since 2 days, dizzy, can't stand"_\n⚠️ Severity: S4 · Crisis flag: YES\n\nReply *ACK 1042* to acknowledge.\nReply *CALL 1042* to get her number.\nReply *OVERRIDE 1042* to escalate to hospital.`,
    },
  ],

  ack: [
    {
      role: 'doctor',
      text: 'ACK 1042',
      time: '9:08 AM',
    },
    {
      role: 'bot',
      time: '9:08 AM',
      badge: { type: 'success', label: '✅ Case acknowledged' },
      text: `✅ *Case #1042 acknowledged.*\n\n👤 Divya Nair has been notified that her doctor has seen her case.\n\nPatient message sent:\n_"Dr. Priya Sharma has reviewed your message and will follow up shortly. Please stay calm and remain seated."_\n\n30-minute escalation timer *cancelled.*\n\nReply *CALL 1042* to get contact number.`,
    },
  ],

  unavailable: [
    {
      role: 'doctor',
      text: 'unavailable 2h',
      time: '11:00 AM',
    },
    {
      role: 'bot',
      time: '11:00 AM',
      badge: { type: 'warn', label: '🔴 You are now UNAVAILABLE' },
      text: `🔴 *Availability paused for 2 hours.*\n\nUntil *1:00 PM*, new patient alerts will be:\n• Held in queue (not forwarded to you)\n• Patients told: _"Doctor is in a procedure, will respond by 1 PM"_\n• S5 crisis alerts will *still reach you* regardless\n\nReply *available* to resume early.`,
    },
  ],

  available: [
    {
      role: 'doctor',
      text: 'available',
      time: '12:30 PM',
    },
    {
      role: 'bot',
      time: '12:30 PM',
      badge: { type: 'success', label: '🟢 You are now AVAILABLE' },
      text: `🟢 *You're back online.*\n\n*3 messages held during pause:*\n1. Sunita Rao — appointment query (S1)\n2. Ankit Mehta — test report question (S1)\n3. Reema Khan — follow-up on last visit (S2)\n\nAI has auto-replied to all 3. No action needed.\n\nReply *queue* to review held messages.`,
    },
  ],

  report: [
    {
      role: 'doctor',
      text: 'report weekly',
      time: '9:10 AM',
    },
    {
      role: 'bot',
      time: '9:10 AM',
      text: `📊 *Weekly Report — 21–27 Apr 2026*\n\n💬 *Messages*\n• Total: 217\n• AI handled: 198 (91%)\n• Escalated to you: 19 (9%)\n\n📅 *Appointments*\n• Booked by AI: 31\n• Cancelled: 4\n• No-shows: 2\n\n🚨 *Alerts*\n• Crisis (S4–S5): 3\n• All acknowledged within 4 min avg\n\n⏱️ *Avg response time:* 2.4 sec\n🕐 *Hours saved:* 9.5h\n💰 *Est. value:* ₹7,600\n\n_Full report → mediassist.in/dashboard_`,
    },
  ],
}

// ─── Initial bot greeting on doctor tab load ──────────────────────────────────
export const DOCTOR_GREETING = {
  role: 'bot',
  time: '9:00 AM',
  text: `🩺 *MediAssist — Doctor Portal*\n\nNamaste Dr. Priya 👋\n\n*Today at a glance:*\n• 6 appointments scheduled\n• 14 patients triaged by AI\n• 1 pending alert (S4)\n• 91% messages handled without your involvement\n\nUse the quick commands on the left to explore what your clinic looks like from WhatsApp.`,
}
