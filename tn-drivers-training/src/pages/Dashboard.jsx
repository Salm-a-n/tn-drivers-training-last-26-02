
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
//   XAxis, YAxis, CartesianGrid, BarChart, Bar, LabelList
// } from "recharts";
// import { Users, UserCheck, GraduationCap, DollarSign, FileText, Clock, Eye, Package, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
// import ApplicationReviewModal from "../components/ApplicationReviewModal";

// // Move MobileApplicationCard to separate component to avoid hooks inside map
// const MobileApplicationCard = ({ app, priority, onView }) => {
//   return (
//     <div className="p-4">
//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-3 flex-1">
//           <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center font-semibold text-sm flex-shrink-0">
//             {app.studentName.split(' ').map(n => n[0]).join('')}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="font-semibold text-slate-800 dark:text-white truncate">{app.studentName}</p>
//             <p className="text-[0.6rem] font-mono text-slate-500">{app.date} • {app.location}</p>
//           </div>
//           <span className={`px-2 py-0.5 rounded-full text-[0.55rem] font-mono font-semibold uppercase whitespace-nowrap ${priority.color}`}>
//             {priority.label}
//           </span>
//         </div>
//       </div>
//       <div className="flex justify-end mt-3">
//         <button
//           onClick={onView}
//           className="px-4 py-2 bg-teal-600 text-white rounded-lg text-[0.65rem] font-medium w-full sm:w-auto"
//         >
//           Review Application
//         </button>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   const [data, setData] = useState(null);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [expandedMobile, setExpandedMobile] = useState(null);
//   const [showMobileStats, setShowMobileStats] = useState(true);
//   const [activeChartTab, setActiveChartTab] = useState('financial');

//   const dummyData = {
//     summary: { 
//       totalStudents: 1284, 
//       activeStudents: 342, 
//       instructors: 28, 
//       revenue: 85000,
//       expenses: 32500,
//       netIncome: 52500
//     },
//     financialHealth: [
//       { month: "Jan", revenue: 12000, expenses: 4000 },
//       { month: "Feb", revenue: 15000, expenses: 5500 },
//       { month: "Mar", revenue: 18000, expenses: 6000 },
//       { month: "Apr", revenue: 22000, expenses: 8000 },
//       { month: "May", revenue: 25000, expenses: 7500 },
//       { month: "Jun", revenue: 30000, expenses: 9000 },
//     ],
//     packagePopularity: [
//       { name: "Basic Starter", students: 245 },
//       { name: "Standard Package", students: 420 },
//       { name: "Premium Package", students: 189 },
//       { name: "Full GDL Bundle", students: 98 },
//       { name: "Advanced City", students: 156 }
//     ],
//     todaySessions: [
//       { name: "Done", value: 14 },
//       { name: "Plan", value: 22 },
//       { name: "Lost", value: 3 },
//     ],
//     regionDistribution: [
//       { region: "BURIN", students: 210 },
//       { region: "Grand Falls", students: 180 },
//       { region: "Marystown", students: 320 },
//       { region: "St. John's", students: 250 },
//       { region: "Mount Pearl", students: 145 }
//     ],
//     recentApplications: [
//       { id: "APP-001", date: "2026-03-23", studentName: "James Harrison", location: "Burin", age: 17, status: "pending" },
//       { id: "APP-002", date: "2026-03-22", studentName: "Sarah Williams", location: "St. John's", age: 19, status: "pending" },
//       { id: "APP-003", date: "2026-03-22", studentName: "Marc-André Leclaire", location: "Grand Falls", age: 16, status: "pending" },
//       { id: "APP-004", date: "2026-03-21", studentName: "Emily Chen", location: "Marystown", age: 21, status: "pending" },
//       { id: "APP-005", date: "2026-03-20", studentName: "David Miller", location: "St. John's", age: 15, status: "pending" },
//       { id: "APP-006", date: "2026-03-19", studentName: "Sophia Rodriguez", location: "Burin", age: 20, status: "pending" },
//     ],
//   };

//   useEffect(() => { 
//     setData(dummyData); 
//   }, []);
  
//   if (!data) return null;

//   const getPriority = (age) => {
//     if (age < 18) return { label: "Normal", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" };
//     return { label: "High Priority", color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" };
//   };

//   const handleViewApplication = (app) => {
//     setSelectedApplication(app);
//     setIsModalOpen(true);
//   };

//   const formatCurrency = (value) => {
//     if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
//     if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
//     return `$${value}`;
//   };

//   const PACKAGE_COLORS = ["#2A9D8F", "#6366F1", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
//   const SESSION_COLORS = ["#2A9D8F", "#6366F1", "#EF4444"];

//   const tooltipStyle = {
//     backgroundColor: '#1e293b',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '11px',
//     color: '#ffffff',
//     padding: '8px 12px'
//   };

//   return (
//     <>
//       <div className="w-full min-h-screen p-3 sm:p-4 md:p-6 bg-slate-50 dark:bg-slate-950 transition-colors" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
//         <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">

//           {/* ================= HEADER ================= */}
//           <header className="text-center lg:text-left">
//             <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
//               Admin  <span className="text-teal-600 dark:text-teal-400">Dashboard</span>
//             </h1>
//             <p className="text-[0.6rem] sm:text-[1rem] lg:text-[1.2rem] font-soro text-slate-700 dark:text-slate-300 uppercase tracking-wider mt-1">
//               Real-time visibility into school operations
//             </p>
//           </header>

//           {/* Mobile Stats Toggle */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setShowMobileStats(!showMobileStats)}
//               className="w-full flex items-center justify-between p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
//             >
//               <span className="text-xs font-mono font-semibold uppercase">Key Metrics</span>
//               {showMobileStats ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//             </button>
//           </div>

//           {/* KPI GRID - Responsive */}
//           <div className={`${showMobileStats ? 'grid' : 'hidden'} lg:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4`}>
//             <KpiCard title="Students" value={data.summary.totalStudents} growth={12} icon={<Users />} />
//             <KpiCard title="Active" value={data.summary.activeStudents} growth={5} icon={<UserCheck />} />
//             <KpiCard title="Instructors" value={data.summary.instructors} icon={<GraduationCap />} />
//             <KpiCard
//               title="Revenue"
//               value={formatCurrency(data.summary.revenue)}
//               growth={8}
//               icon={<DollarSign />}
//             />
//           </div>

//           {/* Mobile Chart Tabs */}
//           <div className="flex lg:hidden gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
//             <button
//               onClick={() => setActiveChartTab('financial')}
//               className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
//                 activeChartTab === 'financial' 
//                   ? 'bg-teal-600 text-white' 
//                   : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
//               }`}
//             >
//               Financial
//             </button>
//             <button
//               onClick={() => setActiveChartTab('packages')}
//               className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
//                 activeChartTab === 'packages' 
//                   ? 'bg-teal-600 text-white' 
//                   : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
//               }`}
//             >
//               Packages
//             </button>
//             <button
//               onClick={() => setActiveChartTab('locations')}
//               className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
//                 activeChartTab === 'locations' 
//                   ? 'bg-teal-600 text-white' 
//                   : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
//               }`}
//             >
//               Locations
//             </button>
//           </div>

//           {/* CHARTS SECTION */}
//           <div className="space-y-6">
//             {/* Financial Line Chart */}
//             <div className={`${activeChartTab === 'financial' ? 'block' : 'hidden lg:block'} bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden`}>
//               <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
//                 Financial Health (Revenue vs Expenses)
//               </h2>
//               <div className="h-56 sm:h-64 md:h-72 w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={data.financialHealth}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
//                     <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
//                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
//                     <Tooltip 
//                       formatter={(value) => [formatCurrency(value), undefined]}
//                       contentStyle={tooltipStyle}
//                     />
//                     <Line type="monotone" dataKey="revenue" stroke="#2A9D8F" strokeWidth={2.5} dot={{ r: 3, fill: "#2A9D8F" }} name="Revenue" />
//                     <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Expenses" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 pt-2 border-t border-slate-100 dark:border-slate-800">
//                 <div className="flex items-center gap-1.5">
//                   <TrendingUp size={12} className="text-teal-500" />
//                   <span className="text-[0.6rem] sm:text-[0.65rem] font-medium text-slate-600 dark:text-slate-400">
//                     Net Profit: <span className="font-bold text-teal-600">{formatCurrency(data.summary.netIncome)}</span>
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-1.5">
//                   <TrendingDown size={12} className="text-red-500" />
//                   <span className="text-[0.6rem] sm:text-[0.65rem] font-medium text-slate-600 dark:text-slate-400">
//                     Expenses: <span className="font-bold text-red-600">{formatCurrency(data.summary.expenses)}</span>
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//               {/* Package Popularity Chart */}
//               <div className={`${activeChartTab === 'packages' ? 'block' : 'hidden lg:block'} bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm`}>
//                 <div className="flex items-center gap-2 mb-4">
//                   <Package size={14} className="text-teal-500" />
//                   <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                     Package Popularity
//                   </h2>
//                 </div>
//                 <div className="h-48 sm:h-52 w-full">
//                   {data.packagePopularity && data.packagePopularity.length > 0 ? (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie 
//                           data={data.packagePopularity} 
//                           innerRadius={40} 
//                           outerRadius={60} 
//                           paddingAngle={4} 
//                           dataKey="students"
//                           label={({ name, percent }) => percent > 0.08 ? `${name} (${(percent * 100).toFixed(0)}%)` : ''}
//                           labelLine={false}
//                         >
//                           {data.packagePopularity.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={PACKAGE_COLORS[index % PACKAGE_COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip 
//                           cursor={{ fill: 'transparent' }}
//                           formatter={(value) => [value, 'Students']}
//                           contentStyle={tooltipStyle}
//                         />
//                         <Tooltip formatter={(value) => [value, 'Students']} contentStyle={tooltipStyle} />

//                       </PieChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <div className="h-full flex items-center justify-center">
//                       <p className="text-[0.7rem] text-slate-400">No package data available</p>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Legend - Responsive grid */}
//                 {data.packagePopularity && data.packagePopularity.length > 0 && (
//                   <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-4">
//                     {data.packagePopularity.map((pkg, index) => (
//                       <div key={pkg.name} className="flex items-center gap-1.5">
//                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PACKAGE_COLORS[index % PACKAGE_COLORS.length] }}></div>
//                         <span className="text-[0.55rem] sm:text-[0.6rem] font-medium text-slate-600 dark:text-slate-400 truncate">
//                           {pkg.name}: {pkg.students}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Students by Location Chart */}
//               <div className={`${activeChartTab === 'locations' ? 'block' : 'hidden lg:block'} bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm`}>
//                 <h2 className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
//                   Students by Location
//                 </h2>
//                 <div className="h-48 sm:h-52 w-full">
//                   {data.regionDistribution && data.regionDistribution.length > 0 ? (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart data={data.regionDistribution} layout="vertical" margin={{ left: 0, right: 20 }}>
//                         <XAxis type="number" hide />
//                         <YAxis 
//                           dataKey="region" 
//                           type="category" 
//                           axisLine={false} 
//                           tickLine={false} 
//                           width={75} 
//                           tick={{ fontSize: 8, fill: '#64748b', fontWeight: 500 }}
//                         />
//                         <Tooltip 
//                           cursor={{ fill: 'transparent' }}
//                           formatter={(value) => [value, 'Students']}
//                           contentStyle={tooltipStyle}
//                         />
//                         <Bar dataKey="students" fill="#2A9D8F" radius={[0, 6, 6, 0]}>
//                           <LabelList 
//                             dataKey="students" 
//                             position="right" 
//                             fill="#64748b" 
//                             style={{ fontSize: '8px', fontWeight: 500 }}
//                           />
//                         </Bar>
//                       </BarChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <div className="h-full flex items-center justify-center">
//                       <p className="text-[0.7rem] text-slate-400">No location data available</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* RECENT APPLICATIONS */}
//           {data.recentApplications && data.recentApplications.length > 0 && (
//             <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
//               <div className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-slate-100 dark:border-slate-800">
//                 <div className="text-center sm:text-left">
//                   <h2 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white">
//                     Recent Applications
//                   </h2>
//                   <p className="text-[0.55rem] sm:text-[0.6rem] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
//                     Student registration applications pending review
//                   </p>
//                 </div>
//                 <Link
//                   to="/applications"

//                   className="px-3 sm:px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[0.6rem] sm:text-[0.65rem] font-medium uppercase tracking-wider hover:bg-teal-500 hover:text-white transition-all"
//                 >
//                   View All
//                 </Link>
//               </div>

//               {/* Desktop Table View */}
//               <div className="hidden md:block overflow-x-auto">
//                 <table className="w-full min-w-[600px]">
//                   <thead className="bg-slate-50 dark:bg-slate-800/50">
//                     <tr className="text-[0.55rem] sm:text-[0.6rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                       <th className="px-4 sm:px-5 py-3 text-left">ID</th>
//                       <th className="px-4 sm:px-5 py-3 text-left">Date</th>
//                       <th className="px-4 sm:px-5 py-3 text-left">Student Name</th>
//                       <th className="px-4 sm:px-5 py-3 text-left">Location</th>
//                       <th className="px-4 sm:px-5 py-3 text-left">Priority</th>
//                       <th className="px-4 sm:px-5 py-3 text-right">Action</th>
//                       </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                     {data.recentApplications.map((app) => {
//                       const priority = getPriority(app.age);
//                       return (
//                         <tr key={app.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
//                           <td className="px-4 sm:px-5 py-3 align-middle">
//                             <span className="text-[0.65rem] sm:text-[0.7rem] font-mono font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
//                               {app.id}
//                             </span>
//                           </td>
//                           <td className="px-4 sm:px-5 py-3 align-middle">
//                             <span className="text-[0.65rem] sm:text-[0.7rem] font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
//                               {app.date}
//                             </span>
//                           </td>
//                           <td className="px-4 sm:px-5 py-3 align-middle">
//                             <div className="flex items-center gap-2">
//                               <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center font-semibold text-[0.65rem] flex-shrink-0">
//                                 {app.studentName.split(' ').map(n => n[0]).join('')}
//                               </div>
//                               <span className="text-[0.7rem] sm:text-[0.75rem] font-medium text-slate-800 dark:text-slate-200 truncate max-w-[120px] sm:max-w-none">
//                                 {app.studentName}
//                               </span>
//                             </div>
//                           </td>
//                           <td className="px-4 sm:px-5 py-3 align-middle">
//                             <span className="text-[0.65rem] sm:text-[0.7rem] text-slate-600 dark:text-slate-300 whitespace-nowrap">
//                               {app.location}
//                             </span>
//                           </td>
//                           <td className="px-4 sm:px-5 py-3 align-middle">
//                             <span className={`inline-flex px-2 py-0.5 rounded-full text-[0.55rem] sm:text-[0.6rem] font-mono font-semibold uppercase tracking-wider whitespace-nowrap ${priority.color}`}>
//                               {priority.label}
//                             </span>
//                           </td>
//                           <td className="px-4 sm:px-5 py-3 text-right align-middle">
//                             <button
//                               onClick={() => handleViewApplication(app)}
//                               className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-lg text-[0.6rem] sm:text-[0.65rem] font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-teal-500 hover:text-white whitespace-nowrap"
//                             >
//                               <Eye size={12} />
//                               View
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Mobile Card View - Fixed: No hooks inside map */}
//               <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
//                 {data.recentApplications.map((app) => {
//                   const priority = getPriority(app.age);
//                   return (
//                     <MobileApplicationCard 
//                       key={app.id}
//                       app={app}
//                       priority={priority}
//                       onView={() => handleViewApplication(app)}
//                     />
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Application Review Modal */}
//       {isModalOpen && selectedApplication && (
//         <ApplicationReviewModal 
//           onClose={() => {
//             setIsModalOpen(false);
//             setSelectedApplication(null);
//           }}
//           onRefresh={() => {
//             console.log("Refresh data");
//           }}
//         />
//       )}
//     </>
//   );
// };

// const KpiCard = ({ title, value, growth, icon }) => (
//   <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
//     <div className="flex items-center justify-between mb-2">
//       <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">
//         {React.cloneElement(icon, { size: 18 })}
//       </div>
//       {growth && (
//         <span className="text-[0.55rem] sm:text-[0.6rem] font-mono font-semibold bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-1.5 sm:px-2 py-0.5 rounded-full">
//           +{growth}%
//         </span>
//       )}
//     </div>
//     <p className="text-[0.55rem] sm:text-[0.6rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
//       {title}
//     </p>
//     <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white">
//       {value}
//     </h3>
//   </div>
// );

// export default Dashboard;





















import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, BarChart, Bar, LabelList
} from "recharts";
import { 
  Users, UserCheck, GraduationCap, DollarSign, FileText, Clock, Eye, 
  Package, TrendingUp, TrendingDown, ChevronDown, ChevronUp, 
  MapPin, Calendar, Star, Award, ArrowUpRight, Sparkles,
  ShieldCheck, Zap, Globe, Target, Briefcase, BookOpen
} from "lucide-react";
import ApplicationReviewModal from "../components/ApplicationReviewModal";

// ================= STYLES & CONSTANTS =================
const PACKAGE_COLORS = ["#2A9D8F", "#6366F1", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
const SESSION_COLORS = ["#2A9D8F", "#6366F1", "#EF4444"];

const tooltipStyle = {
  backgroundColor: '#1e293b',
  border: 'none',
  borderRadius: '12px',
  fontSize: '13px',
  color: '#ffffff',
  padding: '8px 12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
};

// ================= HELPER FUNCTIONS =================
const formatCurrency = (value) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value}`;
};

const getPriority = (age) => {
  if (age < 18) return { 
    label: "Normal", 
    color: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
    width: "w-30"
  };
  return { 
    label: "High Priority", 
    color: "bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800",
    width: "w-30"
  };
};

// ================= MOBILE APPLICATION CARD =================
const MobileApplicationCard = ({ app, priority, onView }) => {
  return (
    <div className="group p-4 border-b border-slate-100 dark:border-slate-800 transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-transparent dark:hover:from-teal-900/20">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/50 dark:to-teal-800/30 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-300">
              {app.studentName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-800 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors text-sm">
              {app.studentName}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              <Calendar size={10} className="text-slate-400 group-hover:text-teal-500 transition-colors flex-shrink-0" />
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">{app.date}</p>
              <MapPin size={10} className="text-slate-400 ml-1 group-hover:text-teal-500 transition-colors flex-shrink-0" />
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">{app.location}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 sm:flex-col sm:items-end">
          <span className={`px-2 py-1 rounded-full text-xs font-mono font-bold uppercase whitespace-nowrap transition-all duration-300 group-hover:scale-105 text-center ${priority.color} ${priority.width}`}>
            {priority.label}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-3">
        <button
          onClick={onView}
          className="group/btn relative px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg text-xs font-semibold w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-105"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Review Application
            <Eye size={12} className="group-hover/btn:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  );
};

// ================= KPI CARD WITH HOVER EFFECTS =================
const KpiCard = ({ title, value, growth, icon, subtitle }) => {
  const isPositiveGrowth = growth && growth > 0;
  
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-105">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-transparent to-emerald-50 dark:from-teal-900/20 dark:via-transparent dark:to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-200/30 to-emerald-200/30 dark:from-teal-500/10 dark:to-emerald-500/10 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center mb-2 sm:mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/60 dark:to-teal-800/40 text-teal-600 dark:text-teal-400 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
              {React.cloneElement(icon, { size: 18, strokeWidth: 1.8 })}
            </div>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {title}
        </p>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {value}
        </h3>
        
        {growth && (
          <div className={`flex items-center justify-center gap-1 mt-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[0.55rem] sm:text-xs font-bold font-mono transition-all duration-300 group-hover:scale-105 ${
            isPositiveGrowth 
              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 group-hover:bg-green-200 dark:group-hover:bg-green-900/60'
              : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 group-hover:bg-red-200 dark:group-hover:bg-red-900/60'
          }`}>
            {isPositiveGrowth ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {isPositiveGrowth ? '+' : ''}{growth}%
          </div>
        )}
        
        {subtitle && (
          <p className="text-[0.55rem] sm:text-xs text-slate-400 dark:text-slate-500 mt-2 font-mono group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
            {subtitle}
          </p>
        )}
      </div>
      
      {/* Decorative corner sparkle */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles size={10} className="text-teal-400/60" />
      </div>
    </div>
  );
};

// ================= CHART CARD WITH HOVER EFFECTS =================
const ChartCard = ({ title, icon, children }) => {
  return (
    <div className="group relative overflow-hidden bg-white dark:bg-slate-900 p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-emerald-50/30 dark:from-teal-900/10 dark:via-transparent dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3 sm:mb-5">
          <div className="p-1 sm:p-1.5 rounded-lg bg-teal-100 dark:bg-teal-900/30 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/50 transition-all duration-300 group-hover:scale-110">
            {React.cloneElement(icon, { size: 12, className: "text-teal-600 group-hover:text-teal-500 transition-colors" })}
          </div>
          <h2 className="text-[0.65rem] sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

// ================= MAIN DASHBOARD COMPONENT =================
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-x-hidden">
        <div className=" mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          {/* ================= HEADER ================= */}
          <header className="rounded-2xl bg-gradient-to-r from-teal-600/10 via-emerald-600/5 to-teal-600/10 dark:from-teal-500/5 dark:via-emerald-500/5 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-2">
                <ShieldCheck className="text-teal-500 transition-all duration-300 hover:scale-110 hover:rotate-12" size={24} />
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                  <span className="text-slate-800 dark:text-white">Admin</span>
                  <span className="text-teal-600 dark:text-teal-400 ml-2 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">Dashboard</span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm md:text-base font-mono text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center justify-center lg:justify-start gap-2">
                <Zap size={12} className="text-teal-500 transition-all duration-300 hover:scale-110" />
                Real-time visibility into school operations
              </p>
            </div>
          </header>

          {/* KPI GRID - Always visible */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <KpiCard 
              title="Total Students" 
              value={data.summary.totalStudents.toLocaleString()} 
              icon={<Users />} 
            />
            <KpiCard 
              title="Active Students" 
              value={data.summary.activeStudents.toLocaleString()} 
              icon={<UserCheck />} 
            />
            <KpiCard 
              title="Instructors" 
              value={data.summary.instructors} 
              icon={<GraduationCap />} 
            />
            <KpiCard
              title="Revenue"
              value={formatCurrency(data.summary.revenue)}
              icon={<DollarSign />}
            />
          </div>

          {/* CHARTS SECTION - Always visible, responsive grid */}
          <div className="space-y-4 sm:space-y-6">
            {/* Financial Line Chart */}
            <ChartCard title="Financial Health (Revenue vs Expenses)" icon={<TrendingUp />}>
              <div className="h-48 sm:h-56 md:h-64 lg:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.financialHealth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(v) => formatCurrency(v)} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), undefined]}
                      contentStyle={tooltipStyle}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#2A9D8F" strokeWidth={2.5} dot={{ r: 3, fill: "#2A9D8F" }} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2, fill: "#EF4444" }} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4 sm:mt-5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 transition-all duration-300 hover:scale-105 hover:bg-teal-100 dark:hover:bg-teal-900/40">
                  <TrendingUp size={10} className="text-teal-500" />
                  <span className="text-[0.6rem] sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Net Profit: <span className="font-bold text-teal-600">{formatCurrency(data.summary.netIncome)}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 transition-all duration-300 hover:scale-105 hover:bg-red-100 dark:hover:bg-red-900/40">
                  <TrendingDown size={10} className="text-red-500" />
                  <span className="text-[0.6rem] sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                    Expenses: <span className="font-bold text-red-600">{formatCurrency(data.summary.expenses)}</span>
                  </span>
                </div>
              </div>
            </ChartCard>

            {/* Two column charts - Responsive grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* Package Popularity Chart */}
              <ChartCard title="Package Popularity" icon={<Package />}>
                <div className="h-40 sm:h-48 md:h-52 w-full">
                  {data.packagePopularity && data.packagePopularity.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie 
                          data={data.packagePopularity} 
                          innerRadius={40} 
                          outerRadius={60} 
                          paddingAngle={3} 
                          dataKey="students"
                          label={({ name, percent }) => percent > 0.08 ? `${name.split(' ')[0]} (${(percent * 100).toFixed(0)}%)` : ''}
                          labelLine={false}
                        >
                          {data.packagePopularity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PACKAGE_COLORS[index % PACKAGE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} Students`, name]}
                          contentStyle={tooltipStyle}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-xs sm:text-sm text-slate-400">No package data available</p>
                    </div>
                  )}
                </div>
                
                {/* Legend */}
                {data.packagePopularity && data.packagePopularity.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-4 sm:mt-5 pt-2">
                    {data.packagePopularity.map((pkg, index) => (
                      <div key={pkg.name} className="flex items-center gap-2 group/legend transition-all duration-300 hover:translate-x-1">
                        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 group-hover/legend:scale-110" style={{ backgroundColor: PACKAGE_COLORS[index % PACKAGE_COLORS.length] }}></div>
                        <span className="text-[0.65rem] sm:text-sm font-medium text-slate-600 dark:text-slate-400 truncate group-hover/legend:text-teal-600 dark:group-hover/legend:text-teal-400 transition-colors">
                          {pkg.name}: <span className="font-bold text-slate-800 dark:text-white">{pkg.students}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </ChartCard>

              {/* Students by Location Chart - No hover effect on bars */}
              <ChartCard title="Students by Location" icon={<Globe />}>
                <div className="h-40 sm:h-48 md:h-52 w-full">
                  {data.regionDistribution && data.regionDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={data.regionDistribution} 
                        layout="vertical" 
                        margin={{ left: 0, right: 20 }}
                      >
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="region" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          width={70} 
                          tick={{ fontSize: 9, fill: '#64748b', fontWeight: 600 }}
                        />
                        <Tooltip 
                          formatter={(value) => [value, 'Students']}
                          contentStyle={tooltipStyle}
                          cursor={false}
                        />
                        <Bar 
                          dataKey="students" 
                          fill="#2A9D8F" 
                          radius={[0, 6, 6, 0]}
                          activeBar={false}
                          isAnimationActive={true}
                        >
                          <LabelList 
                            dataKey="students" 
                            position="right" 
                            fill="#2A9D8F" 
                            style={{ fontSize: '9px', fontWeight: 700 }}
                          />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-xs sm:text-sm text-slate-400">No location data available</p>
                    </div>
                  )}
                </div>
              </ChartCard>
            </div>
          </div>

          {/* RECENT APPLICATIONS */}
          {data.recentApplications && data.recentApplications.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-500 hover:shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-slate-100 dark:border-slate-800">
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={14} className="text-teal-500 transition-all duration-300 hover:scale-110" />
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">
                      Recent Applications
                    </h2>
                  </div>
                  <p className="text-[0.55rem] sm:text-xs font-mono text-slate-500 dark:text-slate-400">
                    Student registration applications pending review
                  </p>
                </div>
                <Link
                  to="/applications"
                  className="group/btn relative px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[0.6rem] sm:text-xs font-bold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-1">
                    View All
                    <ArrowUpRight size={10} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </div>

              {/* Desktop Table View - Fixed overflow */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr className="text-[0.55rem] sm:text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      <th className="px-4 sm:px-5 py-3 sm:py-4 text-left">ID</th>
                      <th className="px-4 sm:px-5 py-3 sm:py-4 text-left">Date</th>
                      <th className="px-4 sm:px-5 py-3 sm:py-4 text-left">Student Name</th>
                      <th className="px-4 sm:px-5 py-3 sm:py-4 text-left">Location</th>
                      <th className="px-4 sm:px-5 py-3 sm:py-4 text-left">Priority</th>
                      <th className="px-4 sm:px-5 py-3 sm:py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.recentApplications.map((app) => {
                      const priority = getPriority(app.age);
                      return (
                        <tr key={app.id} className="group/row transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-transparent dark:hover:from-teal-900/20">
                          <td className="px-4 sm:px-5 py-3 sm:py-4 align-middle">
                            <span className="text-[0.65rem] sm:text-sm font-mono font-bold text-teal-600 dark:text-teal-400 group-hover/row:text-teal-500 transition-colors">
                              {app.id}
                            </span>
                          </td>
                          <td className="px-4 sm:px-5 py-3 sm:py-4 align-middle">
                            <span className="text-[0.65rem] sm:text-sm font-mono text-slate-500 dark:text-slate-400">
                              {app.date}
                            </span>
                          </td>
                          <td className="px-4 sm:px-5 py-3 sm:py-4 align-middle">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-xl blur-md opacity-0 group-hover/row:opacity-50 transition-opacity duration-300"></div>
                                <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/50 dark:to-teal-800/30 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-[0.6rem] sm:text-xs shadow-md group-hover/row:scale-110 transition-transform duration-300">
                                  {app.studentName.split(' ').map(n => n[0]).join('')}
                                </div>
                              </div>
                              <span className="text-[0.7rem] sm:text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover/row:text-teal-600 dark:group-hover/row:text-teal-400 transition-colors">
                                {app.studentName}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-5 py-3 sm:py-4 align-middle">
                            <div className="flex items-center gap-1">
                              <MapPin size={9} className="text-slate-400 group-hover/row:text-teal-500 transition-colors" />
                              <span className="text-[0.65rem] sm:text-sm text-slate-600 dark:text-slate-300">
                                {app.location}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 sm:px-5 py-3 sm:py-4 align-middle">
                            <span className={`inline-flex items-center justify-center px-2 sm:px-3 py-1 rounded-full text-[0.55rem] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 group-hover/row:scale-105 ${priority.color} ${priority.width}`}>
                              {priority.label}
                            </span>
                          </td>
                          <td className="px-4 sm:px-5 py-3 sm:py-4 text-right align-middle">
                            <button
                              onClick={() => handleViewApplication(app)}
                              className="group/btn inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-lg text-[0.6rem] sm:text-xs font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-600 hover:to-emerald-600 hover:text-white hover:shadow-lg hover:scale-105"
                            >
                              <Eye size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                              Review
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
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

export default Dashboard;