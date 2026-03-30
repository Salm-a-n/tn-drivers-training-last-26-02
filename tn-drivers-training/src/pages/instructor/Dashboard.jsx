// import React, { useState, useEffect } from "react";
// import { 
//   Users, ClipboardCheck, Award, Clock, MapPin, 
//   ChevronRight, Activity, Calendar, Car, Phone, Mail,
//   Loader2, AlertCircle, Star, TrendingUp, CheckCircle,
//   ScanEye, BookOpen, FileText, DollarSign,Bell
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const InstructorDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [dashboardData, setDashboardData] = useState({
//     instructor: {
//       name: 'Marc-André LeBlanc',
//       location: 'Burin Branch'
//     },
//     metrics: {
//       total_students: 18,
//       tests_logged: 42,
//       completion_rate: 94,
//       total_hours: 156
//     },
//     today_sessions: [
//       {
//         id: 1,
//         start_time: "09:00",
//         end_time: "10:00",
//         student_name: "James Harrison",
//         task: "City Driving",
//         status: "Upcoming",
//         location: "Burin"
//       },
//       {
//         id: 2,
//         start_time: "11:00",
//         end_time: "12:00",
//         student_name: "Sarah Williams",
//         task: "Parking Drills",
//         status: "Upcoming",
//         location: "Burin"
//       },
//       {
//         id: 3,
//         start_time: "14:00",
//         end_time: "15:00",
//         student_name: "Emily Chen",
//         task: "Highway Practice",
//         status: "Completed",
//         location: "Burin"
//       }
//     ],
//     upcoming_sessions: [
//       {
//         id: 4,
//         date: "2026-03-25",
//         start_time: "10:00",
//         student_name: "David Miller",
//         task: "City Driving",
//         status: "Scheduled",
//         location: "Burin"
//       },
//       {
//         id: 5,
//         date: "2026-03-26",
//         start_time: "13:00",
//         student_name: "Sophia Rodriguez",
//         task: "Parking Drills",
//         status: "Scheduled",
//         location: "Burin"
//       },
//       {
//         id: 6,
//         date: "2026-03-27",
//         start_time: "09:30",
//         student_name: "Alex Rivera",
//         task: "Mock Road Test",
//         status: "Scheduled",
//         location: "Burin"
//       }
//     ],
//     recent_students: [
//       { id: 1, name: "James Harrison", progress: 75, email: "james.h@example.com" },
//       { id: 2, name: "Sarah Williams", progress: 45, email: "sarah.w@example.com" },
//       { id: 3, name: "Emily Chen", progress: 90, email: "emily.c@example.com" },
//       { id: 4, name: "David Miller", progress: 30, email: "david.m@example.com" },
//       { id: 5, name: "Sophia Rodriguez", progress: 60, email: "sophia.r@example.com" }
//     ],
//     assigned_car: {
//       car_name: "Toyota Corolla",
//       number_plate: "TERRA-01",
//       odometer: 24580,
//       last_maintenance: "2026-02-15"
//     }
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
//         <div className="text-center">
//           <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={48} />
//           <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
//         <div className="text-center">
//           <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
//           <p className="text-sm font-medium text-red-600 mb-4">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-all"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { instructor, metrics, today_sessions, upcoming_sessions, recent_students, assigned_car } = dashboardData;

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
//       <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-y-auto">
//         <div className="max-w-[1920px] mx-auto space-y-6">
          
//           {/* DASHBOARD HEADER */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div>
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
//                 Welcome back, <span className="text-teal-600 dark:text-teal-400">{instructor.name}</span>
//               </h1>
//               <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
//                 Terra Nova Training Systems • <span className="text-teal-600 font-semibold">{instructor.location}</span>
//               </p>
//             </div>
//             <div className="flex justify-end w-full md:w-auto">
//               <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
//                 <Star size={20} className="text-teal-600 dark:text-teal-400" />
//               </div>
//             </div>
//           </div>

//           {/* METRICS GRID */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <MetricCard 
//               title="Total Students" 
//               value={metrics.total_students} 
//               icon={<Users />} 
//               color="teal" 
//               sub="Active Students" 
//             />
//             <MetricCard 
//               title="Tests Logged" 
//               value={metrics.tests_logged} 
//               icon={<ClipboardCheck />} 
//               color="indigo" 
//               sub="All Time" 
//             />
//             <MetricCard 
//               title="Completion Rate" 
//               value={`${metrics.completion_rate}%`} 
//               icon={<CheckCircle />} 
//               color="emerald" 
//               sub={metrics.completion_rate >= 90 ? 'Excellent Progress' : 'Keep Going'} 
//             />
//             <MetricCard 
//               title="Total Hours" 
//               value={metrics.total_hours} 
//               icon={<Clock />} 
//               color="orange" 
//               sub="Behind the wheel" 
//             />
//           </div>

//           {/* ASSIGNED CAR SECTION */}
//           {assigned_car && (
//             <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-5 shadow-lg">
//               <div className="flex items-center justify-between flex-wrap gap-4">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
//                     <Car size={24} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">Assigned Vehicle</p>
//                     <h3 className="text-lg font-bold text-white">{assigned_car.car_name} • {assigned_car.number_plate}</h3>
//                     <p className="text-sm text-white/80 mt-0.5">Odometer: {assigned_car.odometer.toLocaleString()} KM</p>
//                   </div>
//                 </div>
//                 <Link 
//                   to="/instructor/expenses" 
//                   className="px-4 py-2 bg-white text-teal-600 rounded-lg font-semibold text-sm hover:bg-slate-50 transition-all shadow-lg"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           )}

//           {/* MAIN CONTENT GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
//             <div className="lg:col-span-2 space-y-6">
              
//               {/* TODAY'S AGENDA */}
//               <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
//                 <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex justify-between items-center">
//                   <div className="flex items-center gap-2">
//                     <Calendar size={16} className="text-teal-500" />
//                     <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Today's Agenda</h2>
//                   </div>
//                   <Link 
//                     to="/instructor/schedule" 
//                     className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-all"
//                   >
//                     Full Schedule →
//                   </Link>
//                 </div>
//                 <div className="p-5 space-y-2">
//                   {today_sessions.length > 0 ? (
//                     today_sessions.map((session, index) => (
//                       <ScheduleRow 
//                         key={index}
//                         time={`${session.start_time} - ${session.end_time}`}
//                         student={session.student_name}
//                         task={session.task}
//                         status={session.status}
//                         location={session.location}
//                       />
//                     ))
//                   ) : (
//                     <div className="py-12 text-center">
//                       <Clock size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
//                       <p className="text-sm text-slate-500">No sessions scheduled for today</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* UPCOMING SESSIONS */}
//               <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
//                 <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
//                   <div className="flex items-center gap-2">
//                     <Calendar size={16} className="text-teal-500" />
//                     <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Upcoming Sessions</h2>
//                   </div>
//                 </div>
//                 <div className="p-5 space-y-2">
//                   {upcoming_sessions.length > 0 ? (
//                     upcoming_sessions.map((session, index) => (
//                       <ScheduleRow 
//                         key={index}
//                         time={`${session.date} • ${session.start_time}`}
//                         student={session.student_name}
//                         task={session.task}
//                         status="Scheduled"
//                         location={session.location}
//                       />
//                     ))
//                   ) : (
//                     <div className="py-12 text-center">
//                       <Calendar size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
//                       <p className="text-sm text-slate-500">No upcoming sessions</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* SIDEBAR - RECENT STUDENTS */}
//             <div className="space-y-6">
//               <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
//                 <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
//                   <div className="flex items-center gap-2">
//                     <Users size={16} className="text-teal-500" />
//                     <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Recent Students</h2>
//                   </div>
//                 </div>
//                 <div className="p-4 space-y-2">
//                   {recent_students.length > 0 ? (
//                     recent_students.map((student, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
//                             {student.name.charAt(0)}
//                           </div>
//                           <div>
//                             <p className="text-sm font-semibold text-slate-800 dark:text-white">{student.name}</p>
//                             <div className="flex items-center gap-2 mt-1">
//                               <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
//                                 <div className="h-full bg-teal-500 rounded-full" style={{ width: `${student.progress}%` }}></div>
//                               </div>
//                               <span className="text-[10px] font-mono font-semibold text-slate-500">{student.progress}%</span>
//                             </div>
//                           </div>
//                         </div>
//                         <ChevronRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//                       </div>
//                     ))
//                   ) : (
//                     <div className="py-12 text-center">
//                       <Users size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
//                       <p className="text-sm text-slate-500">No students assigned yet</p>
//                     </div>
//                   )}
//                 </div>
//                 <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
//                   <Link 
//                     to="/instructor/students" 
//                     className="block text-center text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
//                   >
//                     View All Students →
//                   </Link>
//                 </div>
//               </div>

//               {/* QUICK ACTIONS */}
//               <div className="bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-100 dark:border-teal-800 p-5">
//                 <h2 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4">Quick Actions</h2>
//                 <div className="space-y-2">
//                   <Link 
//                     to="/instructor/schedule"
//                     className="flex items-center gap-3 w-full py-2.5 px-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-teal-600 hover:text-white transition-all group"
//                   >
//                     <Calendar size={16} className="text-teal-500 group-hover:text-white" />
//                     Mark Attendance
//                   </Link>
//                   <Link 
//                     to="/instructor/expenses"
//                     className="flex items-center gap-3 w-full py-2.5 px-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-teal-600 hover:text-white transition-all group"
//                   >
//                     <DollarSign size={16} className="text-teal-500 group-hover:text-white" />
//                     Submit Expense
//                   </Link>
//                   <Link 
//                     to="/instructor/students"
//                     className="flex items-center gap-3 w-full py-2.5 px-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-teal-600 hover:text-white transition-all group"
//                   >
//                     <Users size={16} className="text-teal-500 group-hover:text-white" />
//                     View Students
//                   </Link>
//                   <Link 
//                     to="/instructor/notifications"
//                     className="flex items-center gap-3 w-full py-2.5 px-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-teal-600 hover:text-white transition-all group"
//                   >
//                     <Bell size={16} className="text-teal-500 group-hover:text-white" />
//                     View Notifications
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- HELPER COMPONENTS ---

// const MetricCard = ({ title, value, icon, color, sub }) => {
//   const colorClasses = {
//     teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400',
//     indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
//     emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
//     orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
//   };

//   return (
//     <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
//       <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]} mb-4`}>
//         {React.cloneElement(icon, { size: 20 })}
//       </div>
//       <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{title}</p>
//       <h3 className="text-2xl font-bold text-slate-800 dark:text-white leading-none mb-1">{value}</h3>
//       <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{sub}</p>
//     </div>
//   );
// };

// const ScheduleRow = ({ time, student, task, status, location }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 transition-all cursor-pointer group gap-3">
//     <div className="flex items-center gap-4">
//       <span className="text-xs font-mono font-semibold text-teal-600 w-24 truncate">{time}</span>
//       <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
//       <div>
//         <p className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-teal-600 transition-colors">{student}</p>
//         <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
//           {task} • <span className="text-teal-500 font-semibold">{location}</span>
//         </p>
//       </div>
//     </div>
//     <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full self-start sm:self-center ${
//       status === 'Completed' 
//         ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
//         : status === 'High Priority'
//         ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
//         : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
//     }`}>
//       {status}
//     </span>
//   </div>
// );

// export default InstructorDashboard;



import React, { useState, useEffect } from "react";
import {
  Users, ClipboardCheck, CheckCircle, Clock,
  MapPin, ChevronRight, Calendar, Car,
  Loader2, AlertCircle, Star, Bell, DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";

const dashboardData = {
  instructor: { name: "Marc-André LeBlanc", location: "Burin Branch" },
  metrics: { total_students: 18, tests_logged: 42, completion_rate: 94, total_hours: 156 },
  today_sessions: [
    { id: 1, start_time: "09:00", end_time: "10:00", student_name: "James Harrison",  task: "City Driving",    status: "Upcoming",  location: "Burin" },
    { id: 2, start_time: "11:00", end_time: "12:00", student_name: "Sarah Williams",  task: "Parking Drills", status: "Upcoming",  location: "Burin" },
    { id: 3, start_time: "14:00", end_time: "15:00", student_name: "Emily Chen",      task: "Highway Practice", status: "Completed", location: "Burin" },
  ],
  upcoming_sessions: [
    { id: 4, date: "2026-03-25", start_time: "10:00", student_name: "David Miller",     task: "City Driving",   status: "Scheduled", location: "Burin" },
    { id: 5, date: "2026-03-26", start_time: "13:00", student_name: "Sophia Rodriguez", task: "Parking Drills", status: "Scheduled", location: "Burin" },
    { id: 6, date: "2026-03-27", start_time: "09:30", student_name: "Alex Rivera",      task: "Mock Road Test", status: "Scheduled", location: "Burin" },
  ],
  recent_students: [
    { id: 1, name: "James Harrison",   progress: 75, email: "james.h@example.com"  },
    { id: 2, name: "Sarah Williams",   progress: 45, email: "sarah.w@example.com"  },
    { id: 3, name: "Emily Chen",       progress: 90, email: "emily.c@example.com"  },
    { id: 4, name: "David Miller",     progress: 30, email: "david.m@example.com"  },
    { id: 5, name: "Sophia Rodriguez", progress: 60, email: "sophia.r@example.com" },
  ],
  assigned_car: {
    car_name: "Toyota Corolla", number_plate: "TERRA-01",
    odometer: 24580, last_maintenance: "2026-02-15",
  },
};

/* ─── Metric Card ─────────────────────────────────────────── */
const MetricCard = ({ title, value, icon, colorClass, sub }) => (
  <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-3">
    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{title}</p>
      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white leading-none mb-0.5">{value}</h3>
      <p className="text-[10px] sm:text-xs font-medium text-slate-400 dark:text-slate-500">{sub}</p>
    </div>
  </div>
);

/* ─── Schedule Row ────────────────────────────────────────── */
const ScheduleRow = ({ time, student, task, status, location }) => (
  <div className="flex flex-col xs:flex-row xs:items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 transition-all cursor-pointer group gap-2 xs:gap-3">
    <div className="flex items-start xs:items-center gap-3">
      <span className="text-[10px] sm:text-xs font-mono font-semibold text-teal-600 dark:text-teal-400 shrink-0 w-[88px] sm:w-24 pt-0.5 xs:pt-0">{time}</span>
      <div className="hidden xs:block h-7 w-px bg-slate-200 dark:bg-slate-700 shrink-0" />
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white group-hover:text-teal-600 transition-colors truncate">{student}</p>
        <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 truncate">
          {task} • <span className="text-teal-500 font-semibold">{location}</span>
        </p>
      </div>
    </div>
    <span className={`self-start xs:self-center shrink-0 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-1 rounded-full ${
      status === "Completed"
        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
        : status === "High Priority"
        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
    }`}>
      {status}
    </span>
  </div>
);

/* ─── Main Dashboard ──────────────────────────────────────── */
const InstructorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={40} />
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="text-center px-4">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={40} />
          <p className="text-sm font-medium text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-all">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { instructor, metrics, today_sessions, upcoming_sessions, recent_students, assigned_car } = dashboardData;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="flex-1 px-3 sm:px-5 lg:px-8 py-4 sm:py-6 lg:py-8 overflow-y-auto">
        <div className="max-w-[1920px] mx-auto space-y-4 sm:space-y-6">

          {/* ── HEADER ─────────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white leading-tight">
                Welcome back,{" "}
                <span className="text-teal-600 dark:text-teal-400 block sm:inline truncate">{instructor.name}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                Terra Nova Training Systems •{" "}
                <span className="text-teal-600 font-semibold">{instructor.location}</span>
              </p>
            </div>
            <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
              <Star size={18} className="text-teal-600 dark:text-teal-400" />
            </div>
          </div>

          {/* ── METRICS ────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <MetricCard title="Total Students"  value={metrics.total_students}       icon={<Users />}        colorClass="bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"    sub="Active Students" />
            <MetricCard title="Tests Logged"    value={metrics.tests_logged}         icon={<ClipboardCheck />} colorClass="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" sub="All Time" />
            <MetricCard title="Completion Rate" value={`${metrics.completion_rate}%`} icon={<CheckCircle />}  colorClass="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" sub={metrics.completion_rate >= 90 ? "Excellent Progress" : "Keep Going"} />
            <MetricCard title="Total Hours"     value={metrics.total_hours}          icon={<Clock />}        colorClass="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"  sub="Behind the wheel" />
          </div>

          {/* ── ASSIGNED CAR ───────────────────────────────── */}
          {assigned_car && (
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-4 sm:p-5 shadow-lg">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-white/20 flex items-center justify-center">
                    <Car size={20} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-semibold text-white/80 uppercase tracking-wider mb-0.5">Assigned Vehicle</p>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white truncate">
                      {assigned_car.car_name} • {assigned_car.number_plate}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5">Odometer: {assigned_car.odometer.toLocaleString()} KM</p>
                  </div>
                </div>
                <Link
                  to="/instructor/expenses"
                  className="shrink-0 px-3 sm:px-4 py-2 bg-white text-teal-600 rounded-lg font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all shadow"
                >
                  View Details
                </Link>
              </div>
            </div>
          )}

          {/* ── MAIN GRID ──────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* LEFT COL — sessions */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">

              {/* Today's Agenda */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex justify-between items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-teal-500 shrink-0" />
                    <h2 className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Today's Agenda</h2>
                  </div>
                  <Link to="/instructor/schedule" className="text-[10px] sm:text-xs font-semibold text-teal-600 hover:text-teal-700 transition-all shrink-0 whitespace-nowrap">
                    Full Schedule →
                  </Link>
                </div>
                <div className="p-3 sm:p-5 space-y-2">
                  {today_sessions.length > 0 ? today_sessions.map((s, i) => (
                    <ScheduleRow key={i} time={`${s.start_time} – ${s.end_time}`} student={s.student_name} task={s.task} status={s.status} location={s.location} />
                  )) : (
                    <div className="py-10 text-center">
                      <Clock size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                      <p className="text-xs sm:text-sm text-slate-500">No sessions today</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center gap-2">
                  <Calendar size={14} className="text-teal-500 shrink-0" />
                  <h2 className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Upcoming Sessions</h2>
                </div>
                <div className="p-3 sm:p-5 space-y-2">
                  {upcoming_sessions.length > 0 ? upcoming_sessions.map((s, i) => (
                    <ScheduleRow key={i} time={`${s.date} • ${s.start_time}`} student={s.student_name} task={s.task} status="Scheduled" location={s.location} />
                  )) : (
                    <div className="py-10 text-center">
                      <Calendar size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                      <p className="text-xs sm:text-sm text-slate-500">No upcoming sessions</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COL — sidebar */}
            <div className="space-y-4 sm:space-y-6">

              {/* Recent Students */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center gap-2">
                  <Users size={14} className="text-teal-500 shrink-0" />
                  <h2 className="text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Recent Students</h2>
                </div>
                <div className="p-3 sm:p-4 space-y-1">
                  {recent_students.map((student, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs sm:text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white truncate">{student.name}</p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-12 sm:w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${student.progress}%` }} />
                            </div>
                            <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-slate-500">{student.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  ))}
                </div>
                <div className="px-4 sm:px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <Link to="/instructor/students" className="block text-center text-[10px] sm:text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                    View All Students →
                  </Link>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-teal-50 dark:bg-teal-900/10 rounded-2xl border border-teal-100 dark:border-teal-800 p-4 sm:p-5">
                <h2 className="text-[10px] sm:text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3 sm:mb-4">Quick Actions</h2>
                {/* 2-col grid on mobile, stacked on sidebar */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                  {[
                    { to: "/instructor/schedule",      icon: <Calendar size={14} />,   label: "Mark Attendance"    },
                    { to: "/instructor/expenses",      icon: <DollarSign size={14} />, label: "Submit Expense"     },
                    { to: "/instructor/students",      icon: <Users size={14} />,      label: "View Students"      },
                    { to: "/instructor/notifications", icon: <Bell size={14} />,       label: "Notifications"      },
                  ].map(({ to, icon, label }) => (
                    <Link
                      key={to}
                      to={to}
                      className="flex items-center gap-2 sm:gap-3 py-2.5 px-3 sm:px-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-xl text-[11px] sm:text-sm font-medium hover:bg-teal-600 hover:text-white transition-all group"
                    >
                      <span className="text-teal-500 group-hover:text-white shrink-0">{icon}</span>
                      <span className="truncate">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;