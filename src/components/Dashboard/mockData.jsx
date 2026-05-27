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
};
