export const MOCK = {
  doctor: {
    name: "Dr. Rajesh Sharma",
    clinic: "Sharma General Clinic",
    city: "Pune",
  },
  stats: {
    messagesHandled: 847,
    autoReplyPct: 91,
    appointmentsBooked: 134,
    seriousAlerts: 9,
    avgResponseSec: 2.8,
    hoursSaved: 9.5,
  },
  streak: 22,
  personalBest: 22,
  weeklyMsgs: [
    { day: "Mon", ai: 29, escalated: 2 },
    { day: "Tue", ai: 37, escalated: 3 },
    { day: "Wed", ai: 31, escalated: 1 },
    { day: "Thu", ai: 33, escalated: 2 },
    { day: "Fri", ai: 35, escalated: 4 },
    { day: "Sat", ai: 28, escalated: 1 },
    { day: "Sun", ai: 24, escalated: 2 },
  ],
  intentBreakdown: [
    { name: "Booking", value: 38, color: "#2563eb" },
    { name: "FAQ", value: 29, color: "#059669" },
    { name: "Symptoms", value: 22, color: "#d97706" },
    { name: "Serious", value: 11, color: "#dc2626" },
  ],
  sentimentTrend: [
    { week: "W1", positive: 72, neutral: 20, negative: 8 },
    { week: "W2", positive: 76, neutral: 18, negative: 6 },
    { week: "W3", positive: 79, neutral: 16, negative: 5 },
    { week: "W4", positive: 82, neutral: 14, negative: 4 },
  ],
  cityRank: [
    { name: "Sharma General Clinic", time: "2.8s", you: true },
    { name: "City Care Clinic", time: "4.1s", you: false },
    { name: "Pimpri Health Centre", time: "5.6s", you: false },
    { name: "Wakad Medical", time: "7.2s", you: false },
  ],
  benchmarkWeekly: [
    { week: "W1", you: 87, avg: 71 },
    { week: "W2", you: 89, avg: 73 },
    { week: "W3", you: 90, avg: 72 },
    { week: "W4", you: 91, avg: 74 },
  ],
  alerts: [
    {
      name: "Amit Verma",
      msg: "Chest pain + breathlessness since morning",
      time: "9:14 AM",
      resolved: false,
    },
    {
      name: "Sunita Rao",
      msg: "High fever 104°F, not responding to paracetamol",
      time: "Yesterday",
      resolved: true,
    },
    {
      name: "Raju Patil",
      msg: "Severe abdominal pain — referred to hospital",
      time: "2 days ago",
      resolved: true,
    },
  ],
  appointments: [
    { name: "Meera Joshi", time: "9:00 AM", status: "confirmed" },
    { name: "Rahul Shah", time: "10:30 AM", status: "confirmed" },
    { name: "Deepa Nair", time: "11:30 AM", status: "pending" },
    { name: "Kiran Pawar", time: "2:00 PM", status: "confirmed" },
    { name: "Suresh More", time: "3:30 PM", status: "cancelled" },
    { name: "Anjali Singh", time: "4:00 PM", status: "ai-booked" },
  ],
  patientLove: [
    {
      text: '"Response aya toh main hairan ho gaya — itni jaldi! Appointment bhi mil gayi bina kisi se baat kiye."',
      name: "Meera J.",
      stars: 5,
    },
    {
      text: '"Raat ko 11 baje message kiya, 3 second mein jawab aaya. Doctor ka number toh available bhi nahi hota."',
      name: "Rahul S.",
      stars: 5,
    },
    {
      text: '"Booking process bahut smooth tha. Ghar se hi slot choose kiya."',
      name: "Deepa N.",
      stars: 4,
    },
  ],

  streakCellLevels: [
    0, 0, 1, 1, 2, 2, 3, 3, 2, 3, 3, 3, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3,
    3, 3, 3, 3, 3,
  ],
};
