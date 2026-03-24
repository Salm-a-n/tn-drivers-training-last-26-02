// import React from "react";
// import { 
//   Users, ClipboardCheck, Award, Clock, MapPin, 
//   ChevronRight, Activity, AlertCircle, Calendar, ShieldCheck
// } from "lucide-react";

// // REMOVED: InstructorNavbar import to fix the "double navbar" issue

// const InstructorDashboard = () => {
//   const instructorLocation = "Burin"; 

//   return (
//     // REMOVED: flex-1 and min-h-screen here as they are now handled by the Layout
//     <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
//       {/* 1. DASHBOARD HEADER */}
//       <div className="flex flex-col gap-1">
//         <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase italic leading-none">
//           Instructor <span className="text-[#008B8B]">Hub</span>
//         </h1>
//         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mt-1">
//           Terra Nova Training Systems • <span className="text-[#008B8B] font-bold">{instructorLocation} Branch</span>
//         </p>
//       </div>

//       {/* 2. METRICS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//         <MetricCard title="Total Students" value="18" icon={<Users />} color="teal" sub={`${instructorLocation} Area`} />
//         <MetricCard title="Tests Logged" value="42" icon={<ClipboardCheck />} color="indigo" sub="Monthly Total" />
//         <MetricCard title="Pass Rate" value="94%" icon={<Award />} color="emerald" sub="Above Average" />
//         <MetricCard title="Hours" value="156" icon={<Activity />} color="orange" sub="Behind the wheel" />
//       </div>

//       {/* 3. MAIN CONTENT GRID */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        
//         <div className="lg:col-span-2 space-y-6">
//           {/* ADMIN DIRECTIVE BLOCK */}
//           <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group">
//             <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
//               <ShieldCheck size={14} className="text-indigo-500" /> Admin Assignment: This Week
//             </h2>
//             <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative z-10">
//               <div className="bg-indigo-600 text-white p-6 rounded-[2rem] w-full md:w-56 text-center shadow-2xl hover:scale-105 transition-transform duration-500">
//                 <p className="text-[10px] font-black uppercase opacity-60 mb-2 text-indigo-100">Primary Region</p>
//                 <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4">{instructorLocation}</h3>
//                 <div className="h-px bg-white/20 my-4" />
//                 <p className="text-xs font-bold uppercase tracking-widest">Feb 20 - Feb 27</p>
//               </div>
//               <div className="flex-1 space-y-4">
//                 <div className="space-y-1">
//                   <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Priority Tasking</span>
//                   <h4 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Winter Road Prep & Parallel Parking</h4>
//                 </div>
//                 <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
//                   Prioritize the 4 new registrations from <span className="text-indigo-500 font-bold">{instructorLocation}</span>. 
//                   Fleet vehicle <span className="underline decoration-indigo-500 underline-offset-4">V-882</span> is ready for your block.
//                 </p>
//               </div>
//             </div>
//             <Clock className="absolute -right-8 -bottom-8 size-48 text-indigo-50 dark:text-slate-800/10 opacity-50 group-hover:rotate-12 transition-transform duration-1000" />
//           </div>

//           {/* SCHEDULE CARD */}
//           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
//             <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30 dark:bg-slate-950/20">
//               <div className="flex items-center gap-3">
//                 <Calendar size={16} className="text-[#008B8B]" />
//                 <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Today's Agenda: {instructorLocation}</h2>
//               </div>
//               <button className="text-[10px] font-black text-[#008B8B] uppercase tracking-widest hover:underline transition-all active:scale-95">Full Weekly Schedule</button>
//             </div>
//             <div className="p-4 md:p-6 space-y-3">
//               <ScheduleRow time="10:00 AM" student="Sam Chen" task="Highway Merging" status="Upcoming" location={instructorLocation} />
//               <ScheduleRow time="01:30 PM" student="Yuki Tanaka" task="Mock Road Test" status="High Priority" location={instructorLocation} />
//               <ScheduleRow time="03:45 PM" student="Alex Rivera" task="City Traffic" status="Upcoming" location={instructorLocation} />
//             </div>
//           </div>
//         </div>

//         {/* SIDEBAR ALERTS */}
//         <div className="space-y-6">
//           <div className="bg-rose-500 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group hover:shadow-rose-500/20 transition-all active:scale-[0.98] cursor-pointer">
//             <AlertCircle className="absolute -right-4 -top-4 size-32 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
//             <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Priority Action Required</p>
//             <h3 className="text-xl font-black italic uppercase leading-tight mb-4">{instructorLocation} Alert</h3>
//             <p className="text-xs font-bold opacity-90 leading-relaxed mb-8 italic">
//               "A new student has registered in your {instructorLocation} branch. Immediate contact required."
//             </p>
//             <button className="w-full py-4 bg-white text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-xl">
//               Claim Student Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- HELPER COMPONENTS ---

// const MetricCard = ({ title, value, icon, color, sub }) => (
//   <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
//     <div className={`size-12 rounded-2xl flex items-center justify-center bg-${color}-500/10 text-${color}-600 mb-5 group-hover:scale-110 transition-transform`}>
//       {React.cloneElement(icon, { size: 22 })}
//     </div>
//     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
//     <h3 className="text-3xl font-black text-slate-800 dark:text-white leading-none mb-2 tracking-tighter">{value}</h3>
//     <p className="text-[9px] font-bold text-slate-400 italic uppercase tracking-tighter">{sub}</p>
//   </div>
// );

// const ScheduleRow = ({ time, student, task, status, location }) => (
//   <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] border border-transparent hover:border-[#008B8B]/30 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer group gap-4">
//     <div className="flex items-center gap-6">
//       <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 w-16 uppercase">{time}</span>
//       <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
//       <div>
//         <p className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-[#008B8B] transition-colors">{student}</p>
//         <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter italic">{task} • <span className="text-[#008B8B] font-bold">{location}</span></p>
//       </div>
//     </div>
//     <span className={`text-[8px] self-start sm:self-center font-black uppercase px-3 py-1.5 rounded-full ${status === 'High Priority' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800'}`}>
//       {status}
//     </span>
//   </div>
// );

// export default InstructorDashboard;




















import React, { useState, useEffect } from "react";
import { 
  Users, ClipboardCheck, Award, Clock, MapPin, 
  ChevronRight, Activity, Calendar, Car, Phone, Mail,
  Loader2, AlertCircle, Star, TrendingUp, CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const InstructorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    instructor: {
      name: 'Marc-André LeBlanc',
      location: 'Burin Branch'
    },
    metrics: {
      total_students: 18,
      tests_logged: 42,
      completion_rate: 94,
      total_hours: 156
    },
    today_sessions: [
      {
        id: 1,
        start_time: "09:00",
        end_time: "10:00",
        student_name: "James Harrison",
        task: "City Driving",
        status: "Upcoming",
        location: "Burin"
      },
      {
        id: 2,
        start_time: "11:00",
        end_time: "12:00",
        student_name: "Sarah Williams",
        task: "Parking Drills",
        status: "Upcoming",
        location: "Burin"
      },
      {
        id: 3,
        start_time: "14:00",
        end_time: "15:00",
        student_name: "Emily Chen",
        task: "Highway Practice",
        status: "Completed",
        location: "Burin"
      }
    ],
    upcoming_sessions: [
      {
        id: 4,
        date: "2026-03-25",
        start_time: "10:00",
        student_name: "David Miller",
        task: "City Driving",
        status: "Scheduled",
        location: "Burin"
      },
      {
        id: 5,
        date: "2026-03-26",
        start_time: "13:00",
        student_name: "Sophia Rodriguez",
        task: "Parking Drills",
        status: "Scheduled",
        location: "Burin"
      },
      {
        id: 6,
        date: "2026-03-27",
        start_time: "09:30",
        student_name: "Alex Rivera",
        task: "Mock Road Test",
        status: "Scheduled",
        location: "Burin"
      }
    ],
    recent_students: [
      { id: 1, name: "James Harrison", progress: 75, email: "james.h@example.com" },
      { id: 2, name: "Sarah Williams", progress: 45, email: "sarah.w@example.com" },
      { id: 3, name: "Emily Chen", progress: 90, email: "emily.c@example.com" },
      { id: 4, name: "David Miller", progress: 30, email: "david.m@example.com" },
      { id: 5, name: "Sophia Rodriguez", progress: 60, email: "sophia.r@example.com" }
    ],
    assigned_car: {
      car_name: "Toyota Corolla",
      number_plate: "TERRA-01",
      odometer: 24580,
      last_maintenance: "2026-02-15"
    }
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-10 flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={48} />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 md:p-10 flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
            <p className="text-sm font-medium text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg text-xs font-medium hover:bg-teal-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { instructor, metrics, today_sessions, upcoming_sessions, recent_students, assigned_car } = dashboardData;

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8">
        
        {/* 1. DASHBOARD HEADER */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
            Welcome back, <span className="text-teal-600">{instructor.name}</span>
          </h1>
          <p className="text-[0.65rem] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
            Terra Nova Training Systems • <span className="text-teal-600 font-medium">{instructor.location}</span>
          </p>
        </div>

        {/* 2. METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="Total Students" 
            value={metrics.total_students} 
            icon={<Users />} 
            color="teal" 
            sub="Active Students" 
          />
          <MetricCard 
            title="Tests Logged" 
            value={metrics.tests_logged} 
            icon={<ClipboardCheck />} 
            color="indigo" 
            sub="All Time" 
          />
          <MetricCard 
            title="Completion Rate" 
            value={`${metrics.completion_rate}%`} 
            icon={<CheckCircle />} 
            color="emerald" 
            sub={metrics.completion_rate >= 90 ? 'Excellent Progress' : 'Keep Going'} 
          />
          <MetricCard 
            title="Total Hours" 
            value={metrics.total_hours} 
            icon={<Clock />} 
            color="orange" 
            sub="Behind the wheel" 
          />
        </div>

        {/* 3. ASSIGNED CAR SECTION */}
        {assigned_car && (
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-5 rounded-xl text-white shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Car size={24} className="opacity-80" />
                <div>
                  <p className="text-[0.6rem] font-mono uppercase tracking-wider opacity-80 mb-0.5">Assigned Vehicle</p>
                  <h3 className="text-base font-semibold">{assigned_car.car_name} • {assigned_car.number_plate}</h3>
                  <p className="text-[0.65rem] opacity-80 mt-0.5">Odometer: {assigned_car.odometer.toLocaleString()} KM</p>
                </div>
              </div>
              <Link 
                to="/instructor/expenses" 
                className="px-4 py-1.5 bg-white text-teal-600 rounded-lg font-medium text-[0.7rem] uppercase tracking-wider hover:bg-slate-100 transition-all"
              >
                View Details
              </Link>
            </div>
          </div>
        )}

        {/* 4. MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* TODAY'S AGENDA */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-teal-500" />
                  <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500">Today's Agenda</h2>
                </div>
                <Link 
                  to="/instructor/schedule" 
                  className="text-[0.6rem] font-medium text-teal-600 hover:underline transition-all"
                >
                  Full Schedule →
                </Link>
              </div>
              <div className="p-4 space-y-2">
                {today_sessions.length > 0 ? (
                  today_sessions.map((session, index) => (
                    <ScheduleRow 
                      key={index}
                      time={`${session.start_time} - ${session.end_time}`}
                      student={session.student_name}
                      task={session.task}
                      status={session.status}
                      location={session.location}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-[0.7rem] text-slate-400">No sessions scheduled for today</p>
                  </div>
                )}
              </div>
            </div>

            {/* UPCOMING SESSIONS */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500">Upcoming Sessions</h2>
              </div>
              <div className="p-4 space-y-2">
                {upcoming_sessions.length > 0 ? (
                  upcoming_sessions.map((session, index) => (
                    <ScheduleRow 
                      key={index}
                      time={`${session.date} • ${session.start_time}`}
                      student={session.student_name}
                      task={session.task}
                      status="Scheduled"
                      location={session.location}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-[0.7rem] text-slate-400">No upcoming sessions</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR - RECENT STUDENTS */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Users size={12} className="text-teal-500" /> Recent Students
                </h2>
              </div>
              <div className="p-4 space-y-2">
                {recent_students.length > 0 ? (
                  recent_students.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center font-semibold text-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[0.75rem] font-medium text-slate-800 dark:text-white">{student.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${student.progress}%` }}></div>
                            </div>
                            <span className="text-[0.55rem] font-mono text-slate-500">{student.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))
                ) : (
                  <p className="text-[0.7rem] text-slate-400 text-center py-4">No students assigned yet</p>
                )}
              </div>
              <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <Link 
                  to="/instructor/students" 
                  className="block text-center text-[0.6rem] font-medium text-teal-600 hover:text-teal-700 transition-colors"
                >
                  View All Students →
                </Link>
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-teal-50 dark:bg-teal-900/10 rounded-xl border border-teal-100 dark:border-teal-800 p-4">
              <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-teal-600 mb-3">Quick Actions</h2>
              <div className="space-y-2">
                <Link 
                  to="/instructor/schedule"
                  className="flex items-center gap-2 w-full py-2 px-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg text-[0.7rem] font-medium hover:bg-teal-500 hover:text-white transition-all group"
                >
                  <span className="text-lg">📅</span>
                  Mark Attendance
                </Link>
                <Link 
                  to="/instructor/expenses"
                  className="flex items-center gap-2 w-full py-2 px-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg text-[0.7rem] font-medium hover:bg-teal-500 hover:text-white transition-all group"
                >
                  <span className="text-lg">💰</span>
                  Submit Expense
                </Link>
                <Link 
                  to="/instructor/students"
                  className="flex items-center gap-2 w-full py-2 px-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg text-[0.7rem] font-medium hover:bg-teal-500 hover:text-white transition-all group"
                >
                  <span className="text-lg">👥</span>
                  View Students
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const MetricCard = ({ title, value, icon, color, sub }) => {
  const colorClasses = {
    teal: 'text-teal-500 bg-teal-50 dark:bg-teal-900/20',
    indigo: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20',
    emerald: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
    orange: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20'
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colorClasses[color]} mb-3`}>
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <p className="text-[0.6rem] font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white leading-none mb-1">{value}</h3>
      <p className="text-[0.55rem] font-mono text-slate-400">{sub}</p>
    </div>
  );
};

const ScheduleRow = ({ time, student, task, status, location }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700 hover:border-teal-200 dark:hover:border-teal-800 transition-all cursor-pointer group gap-2">
    <div className="flex items-center gap-3 sm:gap-4">
      <span className="text-[0.65rem] font-mono font-semibold text-teal-600 w-20 truncate">{time}</span>
      <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
      <div>
        <p className="text-[0.75rem] font-medium text-slate-800 dark:text-white group-hover:text-teal-600 transition-colors">{student}</p>
        <p className="text-[0.6rem] font-mono text-slate-500">
          {task} • <span className="text-teal-500">{location}</span>
        </p>
      </div>
    </div>
    <span className={`text-[0.55rem] font-mono font-semibold uppercase px-2 py-0.5 rounded-full self-start sm:self-center ${
      status === 'Completed' 
        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
        : status === 'High Priority'
        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
    }`}>
      {status}
    </span>
  </div>
);

export default InstructorDashboard;