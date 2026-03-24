<<<<<<< HEAD

// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
// //   XAxis, YAxis, CartesianGrid, BarChart, Bar, LabelList
// // } from "recharts";
// // import { Users, UserCheck, GraduationCap, DollarSign, AlertCircle } from "lucide-react";

// // const Dashboard = () => {
// //   const [data, setData] = useState(null);

// //   const dummyData = {
// //     summary: { totalStudents: 1284, activeStudents: 342, instructors: 28, revenue: 85000 },
// //     financialHealth: [
// //       { month: "Jan", income: 12000, expenses: 4000 },
// //       { month: "Feb", income: 15000, expenses: 5500 },
// //       { month: "Mar", income: 18000, expenses: 6000 },
// //       { month: "Apr", income: 22000, expenses: 8000 },
// //       { month: "May", income: 25000, expenses: 7500 },
// //       { month: "Jun", income: 30000, expenses: 9000 },
// //     ],
// //     todaySessions: [
// //       { name: "Done", value: 14 },
// //       { name: "Plan", value: 22 },
// //       { name: "Lost", value: 3 },
// //     ],
// //     regionDistribution: [
// //       { region: "BURIN", students: 210 },
// //       { region: "Grand Falls", students: 180 },
// //       { region: "Marystown", students: 320 },
// //       { region: "St. John's", students: 250 },
// //     ],
// //     priorityAlert: { studentName: "Liam Murphy", location: "St. John's", isActive: true },
// //     recentLogins: [
// //       { id: 1, name: "Sarah Jenkins", initials: "SJ", status: "Active", phase: "Class 7 N", lastActive: "2m ago" },
// //       { id: 2, name: "Michael Kim", initials: "MK", status: "Active", phase: "Class 7 L", lastActive: "14m ago" },
// //       { id: 3, name: "Linda Wu", initials: "LW", status: "Pending", phase: "Enrollment", lastActive: "1h ago" },
// //     ],
// //   };

// //   useEffect(() => { setData(dummyData); }, []);
// //   if (!data) return null;

// //   const PIECOLORS = ["#22c55e", "#6366f1", "#ef4444"];

// //   return (
// //     <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 transition-colors font-sans">
// //       <div className="max-w-7xl mx-auto space-y-6 md:space-y-10">

// //         {/* ================= HEADER ================= */}
// //         <header className="text-center lg:text-left space-y-1">
// //           <h1 className="text-2xl md:text-4xl font-black text-gray-800 dark:text-white tracking-tight uppercase italic">
// //             School <span className="text-indigo-600">Overview</span>
// //           </h1>
// //           <p className="text-gray-500 dark:text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest mt-1">
// //             Real-time visibility into school health.
// //           </p>
// //         </header>

// //         {/* Priority Alert Banner */}
// //         {data.priorityAlert.isActive && (
// //           <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-100 dark:border-red-900/20 p-4 rounded-4xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all text-center md:text-left">
// //             <div className="flex flex-col md:flex-row items-center gap-4">
// //               <div className="bg-red-500 p-2.5 rounded-xl text-white shadow-lg animate-pulse">
// //                 <AlertCircle size={20} />
// //               </div>
// //               <div>
// //                 <p className="text-[9px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-1">
// //                   Priority Alert
// //                 </p>
// //                 <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
// //                   {data.priorityAlert.studentName} ({data.priorityAlert.location})
// //                 </p>
// //               </div>
// //             </div>
// //             <button className="w-full md:w-auto px-10 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
// //               Call Now
// //             </button>
// //           </div>
// //         )}

// //         {/* KPI GRID */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 justify-items-center">
// //           <KpiCard title="Students" value={data.summary.totalStudents} growth={12} icon={<Users />} />
// //           <KpiCard title="Active" value={data.summary.activeStudents} growth={5} icon={<UserCheck />} />
// //           <KpiCard title="Instructors" value={data.summary.instructors} icon={<GraduationCap />} />
// //           <KpiCard
// //             title="Revenue"
// //             value={`$${(data.summary.revenue / 1000).toFixed(1)}K`}
// //             growth={8}
// //             icon={<DollarSign />}
// //           />
// //         </div>

// //         {/* CHARTS */}
// //         <div className="space-y-6">

// //           {/* Financial Line Chart */}
// //           <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
// //             <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 text-center lg:text-left">
// //               Financial Health (Income/Exp)
// //             </h2>
// //             <div className="h-62.5 md:h-87.5 w-full">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={data.financialHealth}>
// //                   <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
// //                   <XAxis dataKey="month" axisLine={false} tickLine={false} />
// //                   <YAxis axisLine={false} tickLine={false} />
// //                   <Tooltip />
// //                   <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={4} dot={{ r: 4 }} />
// //                   <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" dot={false} />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">


// //             {/* Pie Chart */}
// // <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center">
// //   <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
// //     Today's Dispatch
// //   </h2>
// //   <div className="h-55 w-full">
// //     <ResponsiveContainer width="100%" height="100%">
// //       <PieChart>
// //         <Pie 
// //           data={data.todaySessions} 
// //           innerRadius={60} 
// //           outerRadius={85} 
// //           paddingAngle={8} 
// //           dataKey="value"
// //         >
// //           <Cell fill="#22c55e" /> {/* Done */}
// //           <Cell fill="#6366f1" /> {/* Plan */}
// //           <Cell fill="#ef4444" /> {/* Lost */}
// //         </Pie>
// //         <Tooltip />
// //       </PieChart>
// //     </ResponsiveContainer>
// //   </div>
  
// //   {/* Legend Indicators */}
// //   <div className="flex gap-4 mt-4">
// //     <div className="flex items-center gap-2">
// //       <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
// //       <span className="text-[10px] font-bold text-gray-500 uppercase">Done</span>
// //     </div>
// //     <div className="flex items-center gap-2">
// //       <div className="w-3 h-3 rounded-full bg-[#6366f1]"></div>
// //       <span className="text-[10px] font-bold text-gray-500 uppercase">Plan</span>
// //     </div>
// //     <div className="flex items-center gap-2">
// //       <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
// //       <span className="text-[10px] font-bold text-gray-500 uppercase">Lost</span>
// //     </div>
// //   </div>
// // </div>

// // {/* bar chart */}

// //             <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center">
// //                   <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 text-center">
// //                     Market Reach
// //                   </h2>
// //                   <div className="h-55 w-full">
// //                     <ResponsiveContainer width="100%" height="100%">
// //                       <BarChart data={data.regionDistribution} layout="vertical">
// //                         <XAxis type="number" hide />
// //                         <YAxis 
// //                           dataKey="region" 
// //                           type="category" 
// //                           axisLine={false} 
// //                           tickLine={false} 
// //                           width={80} 
                  
// //                           tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} 
// //                         />
// //                         <Tooltip 
// //                           cursor={{ fill: 'transparent' }}
// //                           contentStyle={{ 
// //                             backgroundColor: '#1f2937', 
// //                             border: 'none', 
// //                             borderRadius: '12px', 
// //                             color: '#fff',
// //                             fontSize: '12px' 
// //                           }}
// //                           itemStyle={{ color: '#fff' }}
// //                         />
// //                         <Bar dataKey="students" fill="#6366f1" radius={[0, 10, 10, 0]}>
// //                           <LabelList 
// //                             dataKey="students" 
// //                             position="right" 
// //                             fill="#94a3b8" 
// //                             style={{ fontSize: '10px', fontWeight: 'bold' }}
// //                           />
// //                         </Bar>
// //                       </BarChart>
// //                     </ResponsiveContainer>
// //                   </div>
// //               </div>





// //           </div>
// //         </div>

// //         {/* RECENT ACTIVITY */}
// //         <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
// //           <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
// //             <h2 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
// //               Recent Activity
// //             </h2>
// //             <Link
// //               to="/students"
// //               className="px-6 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
// //             >
// //               View All
// //             </Link>
// //           </div>

// //           <div className="w-full">
// //             <table className="w-full text-left">
// //               <thead className="hidden sm:table-header-group bg-gray-50/50 dark:bg-gray-800/30 text-[10px] font-black text-gray-400 uppercase tracking-widest">
// //                 <tr>
// //                   <th className="px-6 sm:px-10 py-5">Student</th>
// //                   <th className="px-6 sm:px-10 py-5">GDL Status</th>
// //                   <th className="px-6 sm:px-10 py-5 text-right">Last Sync</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-50 dark:divide-gray-800 text-sm">
// //                 {data.recentLogins.map((s) => (
// //                   <tr key={s.id} className="flex flex-col sm:table-row hover:bg-indigo-50/20 transition-colors p-6 sm:p-0">
// //                     <td className="sm:px-10 sm:py-5 flex items-center gap-4">
// //                       <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0">
// //                         {s.initials}
// //                       </div>
// //                       <div className="flex flex-col">
// //                         <span className="font-bold text-gray-800 dark:text-white">
// //                           {s.name}
// //                         </span>
// //                         {/* Mobile Only Phase Label */}
// //                         <span className="sm:hidden px-2 py-0.5 mt-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase text-slate-500 w-fit">
// //                           {s.phase}
// //                         </span>
// //                       </div>
// //                     </td>
// //                     <td className="hidden sm:table-cell px-6 sm:px-10 py-5">
// //                       <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black uppercase text-slate-500 tracking-widest">
// //                         {s.phase}
// //                       </span>
// //                     </td>
// //                     <td className="sm:px-10 sm:py-5 sm:text-right text-gray-400 font-bold text-xs mt-2 sm:mt-0">
// //                       <span className="sm:hidden text-[9px] uppercase tracking-widest mr-2 text-gray-300">Last Sync:</span>
// //                       {s.lastActive}
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // const KpiCard = ({ title, value, growth, icon }) => (
// //   <div className="w-full bg-white dark:bg-gray-900 p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col items-center text-center lg:items-start lg:text-left transition-all hover:translate-y-2 hover:shadow-2xl">
// //     <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-3xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 mb-8 shadow-inner">
// //       {React.cloneElement(icon, { size: 28 })}
// //     </div>
// //     <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">
// //       {title}
// //     </p>
// //     <div className="flex flex-col lg:flex-row items-center lg:items-end gap-2">
// //       <h2 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white leading-none tracking-tighter">
// //         {value}
// //       </h2>
// //       {growth && (
// //         <span className="text-[10px] font-black bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-xl uppercase tracking-widest">
// //           +{growth}%
// //         </span>
// //       )}
// //     </div>
// //   </div>
// // );

// // export default Dashboard;





=======
>>>>>>> 161ce3d432b72b099b0b2445f6e5ce85b388d975
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, BarChart, Bar, LabelList
} from "recharts";
import { Users, UserCheck, GraduationCap, DollarSign, FileText, Clock, Eye, Package, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import ApplicationReviewModal from "../components/ApplicationReviewModal";

// Move MobileApplicationCard to separate component to avoid hooks inside map
const MobileApplicationCard = ({ app, priority, onView }) => {
  return (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center font-semibold text-sm flex-shrink-0">
            {app.studentName.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-800 dark:text-white truncate">{app.studentName}</p>
            <p className="text-[0.6rem] font-mono text-slate-500">{app.date} • {app.location}</p>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[0.55rem] font-mono font-semibold uppercase whitespace-nowrap ${priority.color}`}>
            {priority.label}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button
          onClick={onView}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg text-[0.65rem] font-medium w-full sm:w-auto"
        >
          Review Application
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const [showMobileStats, setShowMobileStats] = useState(true);
  const [activeChartTab, setActiveChartTab] = useState('financial');

  const dummyData = {
    summary: { 
      totalStudents: 1284, 
      activeStudents: 342, 
      instructors: 28, 
      revenue: 85000,
      expenses: 32500,
      netIncome: 52500
    },
    financialHealth: [
      { month: "Jan", revenue: 12000, expenses: 4000 },
      { month: "Feb", revenue: 15000, expenses: 5500 },
      { month: "Mar", revenue: 18000, expenses: 6000 },
      { month: "Apr", revenue: 22000, expenses: 8000 },
      { month: "May", revenue: 25000, expenses: 7500 },
      { month: "Jun", revenue: 30000, expenses: 9000 },
    ],
    packagePopularity: [
      { name: "Basic Starter", students: 245 },
      { name: "Standard Package", students: 420 },
      { name: "Premium Package", students: 189 },
      { name: "Full GDL Bundle", students: 98 },
      { name: "Advanced City", students: 156 }
    ],
    todaySessions: [
      { name: "Done", value: 14 },
      { name: "Plan", value: 22 },
      { name: "Lost", value: 3 },
    ],
    regionDistribution: [
      { region: "BURIN", students: 210 },
      { region: "Grand Falls", students: 180 },
      { region: "Marystown", students: 320 },
      { region: "St. John's", students: 250 },
      { region: "Mount Pearl", students: 145 }
    ],
    recentApplications: [
      { id: "APP-001", date: "2026-03-23", studentName: "James Harrison", location: "Burin", age: 17, status: "pending" },
      { id: "APP-002", date: "2026-03-22", studentName: "Sarah Williams", location: "St. John's", age: 19, status: "pending" },
      { id: "APP-003", date: "2026-03-22", studentName: "Marc-André Leclaire", location: "Grand Falls", age: 16, status: "pending" },
      { id: "APP-004", date: "2026-03-21", studentName: "Emily Chen", location: "Marystown", age: 21, status: "pending" },
      { id: "APP-005", date: "2026-03-20", studentName: "David Miller", location: "St. John's", age: 15, status: "pending" },
      { id: "APP-006", date: "2026-03-19", studentName: "Sophia Rodriguez", location: "Burin", age: 20, status: "pending" },
    ],
  };

  useEffect(() => { 
    setData(dummyData); 
  }, []);
  
  if (!data) return null;

  const getPriority = (age) => {
    if (age < 18) return { label: "Normal", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" };
    return { label: "High Priority", color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" };
  };

  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  const formatCurrency = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const PACKAGE_COLORS = ["#2A9D8F", "#6366F1", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
  const SESSION_COLORS = ["#2A9D8F", "#6366F1", "#EF4444"];

  const tooltipStyle = {
    backgroundColor: '#1e293b',
    border: 'none',
    borderRadius: '8px',
    fontSize: '11px',
    color: '#ffffff',
    padding: '8px 12px'
  };

  return (
    <>
      <div className="w-full min-h-screen p-3 sm:p-4 md:p-6 bg-slate-50 dark:bg-slate-950 transition-colors" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">

          {/* ================= HEADER ================= */}
          <header className="text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
              ADMIN <span className="text-teal-600 dark:text-teal-400">HUB</span>
            </h1>
            <p className="text-[0.6rem] sm:text-[0.65rem] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
              Real-time visibility into school operations
            </p>
          </header>

          {/* Mobile Stats Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileStats(!showMobileStats)}
              className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <span className="text-xs font-mono font-semibold uppercase">Key Metrics</span>
              {showMobileStats ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          {/* KPI GRID - Responsive */}
          <div className={`${showMobileStats ? 'grid' : 'hidden'} lg:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4`}>
            <KpiCard title="Students" value={data.summary.totalStudents} growth={12} icon={<Users />} />
            <KpiCard title="Active" value={data.summary.activeStudents} growth={5} icon={<UserCheck />} />
            <KpiCard title="Instructors" value={data.summary.instructors} icon={<GraduationCap />} />
            <KpiCard
              title="Revenue"
              value={formatCurrency(data.summary.revenue)}
              growth={8}
              icon={<DollarSign />}
            />
          </div>

          {/* Mobile Chart Tabs */}
          <div className="flex lg:hidden gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveChartTab('financial')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeChartTab === 'financial' 
                  ? 'bg-teal-600 text-white' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Financial
            </button>
            <button
              onClick={() => setActiveChartTab('packages')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeChartTab === 'packages' 
                  ? 'bg-teal-600 text-white' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Packages
            </button>
            <button
              onClick={() => setActiveChartTab('locations')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeChartTab === 'locations' 
                  ? 'bg-teal-600 text-white' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Locations
            </button>
          </div>

          {/* CHARTS SECTION */}
          <div className="space-y-6">
            {/* Financial Line Chart */}
            <div className={`${activeChartTab === 'financial' ? 'block' : 'hidden lg:block'} bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden`}>
              <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                Financial Health (Revenue vs Expenses)
              </h2>
              <div className="h-56 sm:h-64 md:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.financialHealth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), undefined]}
                      contentStyle={tooltipStyle}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#2A9D8F" strokeWidth={2.5} dot={{ r: 3, fill: "#2A9D8F" }} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={12} className="text-teal-500" />
                  <span className="text-[0.6rem] sm:text-[0.65rem] font-medium text-slate-600 dark:text-slate-400">
                    Net Profit: <span className="font-bold text-teal-600">{formatCurrency(data.summary.netIncome)}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendingDown size={12} className="text-red-500" />
                  <span className="text-[0.6rem] sm:text-[0.65rem] font-medium text-slate-600 dark:text-slate-400">
                    Expenses: <span className="font-bold text-red-600">{formatCurrency(data.summary.expenses)}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Package Popularity Chart */}
              <div className={`${activeChartTab === 'packages' ? 'block' : 'hidden lg:block'} bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm`}>
                <div className="flex items-center gap-2 mb-4">
                  <Package size={14} className="text-teal-500" />
                  <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Package Popularity
                  </h2>
                </div>
                <div className="h-48 sm:h-52 w-full">
                  {data.packagePopularity && data.packagePopularity.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={data.packagePopularity} 
                          innerRadius={40} 
                          outerRadius={60} 
                          paddingAngle={4} 
                          dataKey="students"
                          label={({ name, percent }) => percent > 0.08 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''}
                          labelLine={false}
                        >
                          {data.packagePopularity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PACKAGE_COLORS[index % PACKAGE_COLORS.length]} />
                          ))}
                        </Pie>
<<<<<<< HEAD
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          formatter={(value) => [value, 'Students']}
                          contentStyle={tooltipStyle}
                        />
=======
                        <Tooltip formatter={(value) => [value, 'Students']} contentStyle={tooltipStyle} />
>>>>>>> 161ce3d432b72b099b0b2445f6e5ce85b388d975
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-[0.7rem] text-slate-400">No package data available</p>
                    </div>
                  )}
                </div>
                
                {/* Legend - Responsive grid */}
                {data.packagePopularity && data.packagePopularity.length > 0 && (
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-4">
                    {data.packagePopularity.map((pkg, index) => (
                      <div key={pkg.name} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PACKAGE_COLORS[index % PACKAGE_COLORS.length] }}></div>
                        <span className="text-[0.55rem] sm:text-[0.6rem] font-medium text-slate-600 dark:text-slate-400 truncate">
                          {pkg.name}: {pkg.students}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Students by Location Chart */}
              <div className={`${activeChartTab === 'locations' ? 'block' : 'hidden lg:block'} bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm`}>
                <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  Students by Location
                </h2>
                <div className="h-48 sm:h-52 w-full">
                  {data.regionDistribution && data.regionDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.regionDistribution} layout="vertical" margin={{ left: 0, right: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="region" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          width={75} 
                          tick={{ fontSize: 8, fill: '#64748b', fontWeight: 500 }}
                        />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          formatter={(value) => [value, 'Students']}
                          contentStyle={tooltipStyle}
                        />
                        <Bar dataKey="students" fill="#2A9D8F" radius={[0, 6, 6, 0]}>
                          <LabelList 
                            dataKey="students" 
                            position="right" 
                            fill="#64748b" 
                            style={{ fontSize: '8px', fontWeight: 500 }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-[0.7rem] text-slate-400">No location data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RECENT APPLICATIONS */}
          {data.recentApplications && data.recentApplications.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-slate-100 dark:border-slate-800">
                <div className="text-center sm:text-left">
                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">
                    Recent Applications
                  </h2>
                  <p className="text-[0.55rem] sm:text-[0.6rem] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    Student registration applications pending review
                  </p>
                </div>
                <Link
<<<<<<< HEAD
                  to="/applications"
=======
                  to="/admin/applications"
>>>>>>> 161ce3d432b72b099b0b2445f6e5ce85b388d975
                  className="px-3 sm:px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[0.6rem] sm:text-[0.65rem] font-medium uppercase tracking-wider hover:bg-teal-500 hover:text-white transition-all"
                >
                  View All
                </Link>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr className="text-[0.55rem] sm:text-[0.6rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <th className="px-4 sm:px-5 py-3 text-left">ID</th>
                      <th className="px-4 sm:px-5 py-3 text-left">Date</th>
                      <th className="px-4 sm:px-5 py-3 text-left">Student Name</th>
                      <th className="px-4 sm:px-5 py-3 text-left">Location</th>
                      <th className="px-4 sm:px-5 py-3 text-left">Priority</th>
                      <th className="px-4 sm:px-5 py-3 text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.recentApplications.map((app) => {
                      const priority = getPriority(app.age);
                      return (
                        <tr key={app.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 sm:px-5 py-3 align-middle">
                            <span className="text-[0.65rem] sm:text-[0.7rem] font-mono font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                              {app.id}
                            </span>
                          </td>
                          <td className="px-4 sm:px-5 py-3 align-middle">
                            <span className="text-[0.65rem] sm:text-[0.7rem] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                              {app.date}
                            </span>
                          </td>
                          <td className="px-4 sm:px-5 py-3 align-middle">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center font-semibold text-[0.65rem] flex-shrink-0">
                                {app.studentName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-[0.7rem] sm:text-[0.75rem] font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px] sm:max-w-none">
                                {app.studentName}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-5 py-3 align-middle">
                            <span className="text-[0.65rem] sm:text-[0.7rem] text-slate-600 dark:text-slate-300 whitespace-nowrap">
                              {app.location}
                            </span>
                          </td>
                          <td className="px-4 sm:px-5 py-3 align-middle">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[0.55rem] sm:text-[0.6rem] font-mono font-semibold uppercase tracking-wider whitespace-nowrap ${priority.color}`}>
                              {priority.label}
                            </span>
                          </td>
                          <td className="px-4 sm:px-5 py-3 text-right align-middle">
                            <button
                              onClick={() => handleViewApplication(app)}
                              className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-lg text-[0.6rem] sm:text-[0.65rem] font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-teal-500 hover:text-white whitespace-nowrap"
                            >
                              <Eye size={12} />
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View - Fixed: No hooks inside map */}
              <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
                {data.recentApplications.map((app) => {
                  const priority = getPriority(app.age);
                  return (
                    <MobileApplicationCard 
                      key={app.id}
                      app={app}
                      priority={priority}
                      onView={() => handleViewApplication(app)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Application Review Modal */}
      {isModalOpen && selectedApplication && (
        <ApplicationReviewModal 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedApplication(null);
          }}
          onRefresh={() => {
            console.log("Refresh data");
          }}
        />
      )}
    </>
  );
};

const KpiCard = ({ title, value, growth, icon }) => (
  <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
    <div className="flex items-center justify-between mb-2">
      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      {growth && (
        <span className="text-[0.55rem] sm:text-[0.6rem] font-mono font-semibold bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-1.5 sm:px-2 py-0.5 rounded-full">
          +{growth}%
        </span>
      )}
    </div>
    <p className="text-[0.55rem] sm:text-[0.6rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
      {title}
    </p>
    <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">
      {value}
    </h3>
  </div>
);

export default Dashboard;




