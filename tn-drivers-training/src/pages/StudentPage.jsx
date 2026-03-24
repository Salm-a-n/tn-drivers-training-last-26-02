// import React, { useState, useEffect, useCallback } from "react";
// import SearchBar from "../components/SearchBar";
// import Pagination from "../components/Pagination";
// import StudentDetailView from "../components/StudentDetailView";
// import { Ban, CheckCircle, Eye } from "lucide-react";

// const locations = ["Burin", "Grand Falls", "Marystown", "St. John's / Mount Pearl"];
// const paymentStatuses = ["Paid", " Due", "Overdue"];
// const systemStatuses = ["Active", "Blocked"];

// const generateStudents = () => {
//   return Array.from({ length: 120 }, (_, i) => {
//     const id = i + 1;
//     const hoursLogged = Math.floor(Math.random() * 13);
//     const daysRemaining = Math.floor(Math.random() * 10);
//     const status = paymentStatuses[i % paymentStatuses.length];
    
//     return {
//       id: id,
//       name: ["Alex Rivera", "Sam Chen", "Jordan Smith", "Maria Garcia", "Yuki Tanaka"][i % 5] + ` ${id}`,
//       instructor: ["John Doe", "Jane Smith", "Sarah Connor"][i % 3],
//       location: locations[i % locations.length],
//       licenseClass: ["Class 7 L", "Class 7 N", "Class 5", "Class 1"][i % 4],
//       hoursLogged: hoursLogged,
//       totalRequiredHours: 12,
//       paymentStatus: status,
//       balanceCAD: status === "Paid" ? 0 : parseFloat((Math.random() * 800 + 100).toFixed(2)),
//       gdlEligibilityMonths: daysRemaining,
//       progress: Math.floor((hoursLogged / 12) * 100),
//       status: "Active",
//       email: `student${id}@drive-academy.ca`,
//       evaluations: [
//         { category: "Lane Discipline", score: 4, note: "Maintains position well." },
//         { category: "Mirror Checks", score: 5, note: "Perfect observation." }
//       ],
//     };
//   });
// };

// const MASTER_DATA = generateStudents();

// export default function StudentPage() {
//   const [students, setStudents] = useState([]);
//   const [masterStudents, setMasterStudents] = useState(MASTER_DATA);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [paymentFilter, setPaymentFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 8;
//   const [viewStudent, setViewStudent] = useState(null);

//   // LOGIC FIX: Handle dynamic list transitions
//   const toggleBlockStatus = (id, e) => {
//     e.stopPropagation();
    
//     const toggle = (s) => s.id === id ? { ...s, status: s.status === "Blocked" ? "Active" : "Blocked" } : s;

//     // 1. Update Master Data
//     setMasterStudents(prev => prev.map(toggle));

//     // 2. Update Current View (with Filter Check)
//     setStudents(prev => {
//       const updatedView = prev.map(toggle);
      
//       // If a status filter is active, remove the student from view if they no longer match
//       if (statusFilter !== "") {
//         return updatedView.filter(s => s.status === statusFilter);
//       }
//       return updatedView;
//     });
//   };

//   const handleSearch = useCallback((val) => {
//     setQuery(val);
//     setPage(1);
//   }, []);

//   const fetchStudents = useCallback(() => {
//     setLoading(true);
//     setTimeout(() => {
//       let filtered = masterStudents.filter((s) =>
//         s.name.toLowerCase().includes(query.toLowerCase())
//       );
      
//       if (locationFilter) filtered = filtered.filter((s) => s.location === locationFilter);
//       if (paymentFilter) filtered = filtered.filter((s) => s.paymentStatus === paymentFilter);
//       if (statusFilter) filtered = filtered.filter((s) => s.status === statusFilter);

//       if (paymentFilter !== "Paid" && paymentFilter !== "") {
//         filtered.sort((a, b) => b.balanceCAD - a.balanceCAD);
//       }
      
//       const start = (page - 1) * limit;
//       setStudents(filtered.slice(start, start + limit));
//       setTotal(filtered.length);
//       setLoading(false);
//     }, 400);
//   }, [page, query, locationFilter, paymentFilter, statusFilter, masterStudents]);

//   useEffect(() => { fetchStudents(); }, [page, query, locationFilter, paymentFilter, statusFilter]);

//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors font-sans">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 mb-12 text-center lg:text-left">
//           <div className="space-y-2">
//             <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight">
//               Network <span className="text-indigo-600">Students</span>
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 font-medium">
//               Managing <span className="text-indigo-600 font-bold">{total}</span> records
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//             <select
//               className="px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-sm font-semibold bg-white dark:bg-gray-900 shadow-sm outline-none cursor-pointer"
//               value={statusFilter}
//               onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
//             >
//               <option value="">All Statuses</option>
//               {systemStatuses.map((stat) => <option key={stat} value={stat}>{stat}</option>)}
//             </select>

//             <select
//               className="px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-sm font-semibold bg-white dark:bg-gray-900 shadow-sm outline-none cursor-pointer"
//               value={locationFilter}
//               onChange={(e) => { setLocationFilter(e.target.value); setPage(1); }}
//             >
//               <option value="">All Regions</option>
//               {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
//             </select>

//             <select
//               className="px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 text-sm font-semibold bg-white dark:bg-gray-900 shadow-sm outline-none cursor-pointer"
//               value={paymentFilter}
//               onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
//             >
//               <option value="">All Payment Status</option>
//               {paymentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
//             </select>
//           </div>
//         </header>

//         <div className="mb-12 flex justify-center"><div className="w-full max-w-2xl"><SearchBar onSearch={handleSearch} /></div></div>

//         {loading ? (
//           <div className="py-32 text-center animate-pulse">
//             <p className="text-gray-400 font-bold uppercase text-[10px]">Filtering Database...</p>
//           </div>
//         ) : (
//           <div className="w-full">
//             <div className="hidden md:block bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
//               <table className="w-full table-fixed text-left">
//                 <thead>
//                   <tr className="bg-gray-50/50 dark:bg-gray-800/40 border-b border-gray-100 dark:border-gray-800">
//                     <th className="w-[28%] px-8 py-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Student</th>
//                     <th className="w-[18%] px-8 py-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Region</th>
//                     <th className="w-[18%] px-8 py-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest text-center">Payment</th>
//                     <th className="w-[18%] px-8 py-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest text-center">Access</th>
//                     <th className="w-[18%] px-8 py-6 font-bold text-gray-400 uppercase text-[10px] tracking-widest text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
//                   {students.map((s) => (
//                     <tr key={s.id} onClick={() => setViewStudent(s)} className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 cursor-pointer transition-colors">
//                       <td className="px-8 py-5 flex items-center gap-3">
//                         <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center font-bold text-white transition-all ${s.status === 'Blocked' ? 'bg-gray-400' : 'bg-indigo-600'}`}>{s.name.charAt(0)}</div>
//                         <div className={`font-bold truncate transition-all ${s.status === 'Blocked' ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-white'}`}>{s.name}</div>
//                       </td>
//                       <td className="px-8 py-5 text-gray-500 text-xs font-semibold">{s.location}</td>
//                       <td className="px-8 py-5 text-center">
//                         <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase ${s.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{s.paymentStatus}</span>
//                       </td>
//                       <td className="px-8 py-5 text-center">
//                         <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${s.status === 'Blocked' ? 'bg-red-500 text-white shadow-sm' : 'bg-indigo-50 text-indigo-600'}`}>
//                           {s.status}
//                         </span>
//                       </td>
//                       <td className="px-8 py-5 text-right">
//                         <div className="invisible group-hover:visible flex justify-end gap-3 transition-all">
//                           <button className="text-indigo-600 hover:text-indigo-800 transition-colors" title="View"><Eye size={18} /></button>
//                           <button 
//                             onClick={(e) => toggleBlockStatus(s.id, e)}
//                             className={`${s.status === 'Blocked' ? 'text-green-500 hover:text-green-700' : 'text-rose-500 hover:text-rose-700'} transition-colors`}
//                             title={s.status === 'Blocked' ? 'Unblock' : 'Block'}
//                           >
//                             {s.status === 'Blocked' ? <CheckCircle size={18} /> : <Ban size={18} />}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* MOBILE VIEW */}
//             <div className="md:hidden grid grid-cols-1 gap-4">
//               {students.map((s) => (
//                 <div key={s.id} onClick={() => setViewStudent(s)} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-md active:scale-95 transition-transform">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-white ${s.status === 'Blocked' ? 'bg-gray-400' : 'bg-indigo-600'}`}>{s.name.charAt(0)}</div>
//                       <div>
//                         <div className={`font-bold ${s.status === 'Blocked' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>{s.name}</div>
//                         <div className="text-[10px] text-gray-400 uppercase tracking-widest">{s.location}</div>
//                       </div>
//                     </div>
//                     <button onClick={(e) => toggleBlockStatus(s.id, e)} className={`${s.status === 'Blocked' ? 'text-green-500' : 'text-rose-500'}`}>
//                       {s.status === 'Blocked' ? <CheckCircle size={20} /> : <Ban size={20} />}
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl text-center">
//                       <p className="text-[8px] font-bold text-gray-400 uppercase mb-1">Payment</p>
//                       <p className={`text-[9px] font-bold uppercase ${s.paymentStatus === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>{s.paymentStatus}</p>
//                     </div>
//                     <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl text-center">
//                       <p className="text-[8px] font-bold text-gray-400 uppercase mb-1">Access</p>
//                       <p className={`text-[9px] font-bold uppercase ${s.status === 'Blocked' ? 'text-red-600' : 'text-indigo-600'}`}>{s.status}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center mt-12 pb-10">
//           <Pagination currentPage={page} totalItems={total} itemsPerPage={limit} onPageChange={setPage} />
//         </div>
//       </div>
//       {viewStudent && <StudentDetailView student={viewStudent} onClose={() => setViewStudent(null)} />}
//     </div>
//   );
// }




// import React, { useState, useEffect, useCallback } from "react";
// import SearchBar from "../components/SearchBar";
// import Pagination from "../components/Pagination";
// import StudentDetailView from "../components/StudentDetailView";
// import { Eye } from "lucide-react";

// const locations = ["Burin", "Grand Falls", "Marystown", "St. John's / Mount Pearl"];
// const paymentStatuses = ["Paid", "Due", "Overdue"];
// const systemStatuses = ["Active", "Blocked"];

// const generateStudents = () => {
//   return Array.from({ length: 120 }, (_, i) => {
//     const id = i + 1;
//     const hoursLogged = Math.floor(Math.random() * 13);
//     const daysRemaining = Math.floor(Math.random() * 10);
//     const status = paymentStatuses[i % paymentStatuses.length];
    
//     return {
//       id: id,
//       name: ["Alex Rivera", "Sam Chen", "Jordan Smith", "Maria Garcia", "Yuki Tanaka"][i % 5] + ` ${id}`,
//       instructor: ["John Doe", "Jane Smith", "Sarah Connor"][i % 3],
//       location: locations[i % locations.length],
//       licenseClass: ["Class 7 L", "Class 7 N", "Class 5", "Class 1"][i % 4],
//       hoursLogged: hoursLogged,
//       totalRequiredHours: 12,
//       paymentStatus: status,
//       balanceCAD: status === "Paid" ? 0 : parseFloat((Math.random() * 800 + 100).toFixed(2)),
//       gdlEligibilityMonths: daysRemaining,
//       progress: Math.floor((hoursLogged / 12) * 100),
//       status: systemStatuses[i % systemStatuses.length],
//       email: `student${id}@drive-academy.ca`,
//       evaluations: [
//         { category: "Lane Discipline", score: 4, note: "Maintains position well." },
//         { category: "Mirror Checks", score: 5, note: "Perfect observation." }
//       ],
//     };
//   });
// };

// const MASTER_DATA = generateStudents();

// export default function StudentPage() {
//   const [students, setStudents] = useState([]);
//   const [masterStudents, setMasterStudents] = useState(MASTER_DATA);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [paymentFilter, setPaymentFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 8;
//   const [viewStudent, setViewStudent] = useState(null);

//   const handleSearch = useCallback((val) => {
//     setQuery(val);
//     setPage(1);
//   }, []);

//   const fetchStudents = useCallback(() => {
//     setLoading(true);
//     setTimeout(() => {
//       let filtered = masterStudents.filter((s) =>
//         s.name.toLowerCase().includes(query.toLowerCase())
//       );
      
//       if (locationFilter) filtered = filtered.filter((s) => s.location === locationFilter);
//       if (paymentFilter) filtered = filtered.filter((s) => s.paymentStatus === paymentFilter);
//       if (statusFilter) filtered = filtered.filter((s) => s.status === statusFilter);

//       if (paymentFilter !== "Paid" && paymentFilter !== "") {
//         filtered.sort((a, b) => b.balanceCAD - a.balanceCAD);
//       }
      
//       const start = (page - 1) * limit;
//       setStudents(filtered.slice(start, start + limit));
//       setTotal(filtered.length);
//       setLoading(false);
//     }, 400);
//   }, [page, query, locationFilter, paymentFilter, statusFilter, masterStudents]);

//   useEffect(() => { fetchStudents(); }, [page, query, locationFilter, paymentFilter, statusFilter]);

//   return (
//     <div className="p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors font-sans">
//       <div className="max-w-7xl mx-auto">
//         <header className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-4 mb-8 text-center lg:text-left">
//           <div className="space-y-1">
//             <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
//               Student  <span className="text-teal-600 dark:text-teal-400">Management</span>
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               Managing <span className="text-terra-600 font-semibold">{total}</span> student records
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//             <select
//               className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200 transition-all cursor-pointer hover:border-terra-300"
//               value={statusFilter}
//               onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
//             >
//               <option value="">All Statuses</option>
//               {systemStatuses.map((stat) => <option key={stat} value={stat}>{stat}</option>)}
//             </select>

//             <select
//               className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200 transition-all cursor-pointer hover:border-terra-300"
//               value={locationFilter}
//               onChange={(e) => { setLocationFilter(e.target.value); setPage(1); }}
//             >
//               <option value="">All Regions</option>
//               {locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
//             </select>

//             <select
//               className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200 transition-all cursor-pointer hover:border-terra-300"
//               value={paymentFilter}
//               onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
//             >
//               <option value="">All Payment Status</option>
//               {paymentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
//             </select>
//           </div>
//         </header>

//         <div className="mb-8 flex justify-center"><div className="w-full max-w-md"><SearchBar onSearch={handleSearch} /></div></div>

//         {loading ? (
//           <div className="py-20 text-center animate-pulse">
//             <p className="text-gray-400 font-medium text-sm">Loading student records...</p>
//           </div>
//         ) : (
//           <div className="w-full">
//             <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden">
//               <table className="w-full table-fixed text-left">
//                 <thead>
//                   <tr className="bg-gray-50/80 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
//                     <th className="w-[28%] px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Student</th>
//                     <th className="w-[18%] px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider">Region</th>
//                     <th className="w-[18%] px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider text-center">Payment</th>
//                     <th className="w-[18%] px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider text-center">Access</th>
//                     <th className="w-[18%] px-6 py-4 font-semibold text-gray-500 uppercase text-[11px] tracking-wider text-right">Actions</th>
//                    </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
//                   {students.map((s) => (
//                     <tr key={s.id} onClick={() => setViewStudent(s)} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className={`h-9 w-9 shrink-0 rounded-xl flex items-center justify-center font-semibold text-white transition-all ${
//                             s.status === 'Blocked' ? 'bg-gray-400 dark:bg-gray-600' : 'bg-terra-600'
//                           }`}>
//                             {s.name.charAt(0)}
//                           </div>
//                           <div className={`font-medium truncate transition-all ${
//                             s.status === 'Blocked' ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-white'
//                           }`}>
//                             {s.name}
//                           </div>
//                         </div>
//                        </td>
//                       <td className="px-6 py-4 text-gray-500 dark:text-gray-400 text-xs font-medium">{s.location}</td>
//                       <td className="px-6 py-4 text-center">
//                         <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase ${
//                           s.paymentStatus === 'Paid' 
//                             ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' 
//                             : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'
//                         }`}>
//                           {s.paymentStatus}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 text-center">
//                         <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase ${
//                           s.status === 'Blocked' 
//                             ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400' 
//                             : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
//                         }`}>
//                           {s.status}
//                         </span>
//                        </td>
//                       <td className="px-6 py-4 text-right">
//                         <button 
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setViewStudent(s);
//                           }}
//                           className="opacity-0 group-hover:opacity-100 p-2 bg-terra-50 dark:bg-terra-950/30 text-terra-600 dark:text-terra-400 rounded-xl hover:bg-terra-100 dark:hover:bg-terra-900/50 hover:text-terra-700 dark:hover:text-terra-300 transition-all duration-200 hover:scale-105 active:scale-95"
//                           title="View Student Details"
//                         >
//                           <Eye size={18} />
//                         </button>
//                        </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* MOBILE VIEW */}
//             <div className="md:hidden grid grid-cols-1 gap-3">
//               {students.map((s) => (
//                 <div key={s.id} onClick={() => setViewStudent(s)} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm active:scale-[0.98] transition-all cursor-pointer">
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex items-center gap-3">
//                       <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-semibold text-white ${
//                         s.status === 'Blocked' ? 'bg-gray-400 dark:bg-gray-600' : 'bg-terra-600'
//                       }`}>
//                         {s.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className={`font-medium ${s.status === 'Blocked' ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
//                           {s.name}
//                         </div>
//                         <div className="text-[10px] text-gray-400 uppercase tracking-wider">{s.location}</div>
//                       </div>
//                     </div>
//                     <button 
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setViewStudent(s);
//                       }}
//                       className="p-2 bg-terra-50 dark:bg-terra-950/30 text-terra-600 dark:text-terra-400 rounded-xl hover:bg-terra-100 dark:hover:bg-terra-900/50 transition-all"
//                     >
//                       <Eye size={16} />
//                     </button>
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-xl text-center">
//                       <p className="text-[9px] font-semibold text-gray-400 uppercase mb-1">Payment</p>
//                       <p className={`text-[10px] font-semibold uppercase ${
//                         s.paymentStatus === 'Paid' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
//                       }`}>
//                         {s.paymentStatus}
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 dark:bg-gray-800/30 p-3 rounded-xl text-center">
//                       <p className="text-[9px] font-semibold text-gray-400 uppercase mb-1">Access</p>
//                       <p className={`text-[10px] font-semibold uppercase ${
//                         s.status === 'Blocked' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
//                       }`}>
//                         {s.status}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex justify-center mt-10 pb-6">
//           <Pagination currentPage={page} totalItems={total} itemsPerPage={limit} onPageChange={setPage} />
//         </div>
//       </div>
//       {viewStudent && <StudentDetailView student={viewStudent} onClose={() => setViewStudent(null)} />}
//     </div>
//   );
// }











// import React, { useState, useEffect, useCallback } from "react";
// import SearchBar from "../components/SearchBar";
// import Pagination from "../components/Pagination";
// import StudentDetailView from "../components/StudentDetailView";
// import { Eye, MapPin, ChevronRight, Trash2, Mail, Phone, Calendar, AlertCircle, Search } from "lucide-react";

// const locations = ["Burin", "Grand Falls", "Marystown", "St. John's / Mount Pearl"];
// const paymentStatuses = ["Paid", "Due", "Overdue"];
// const systemStatuses = ["Active", "Blocked"];

// const generateStudents = () => {
//   return Array.from({ length: 120 }, (_, i) => {
//     const id = i + 1;
//     const hoursLogged = Math.floor(Math.random() * 13);
//     const daysRemaining = Math.floor(Math.random() * 10);
//     const status = paymentStatuses[i % paymentStatuses.length];
    
//     return {
//       id: id,
//       name: ["Alex Rivera", "Sam Chen", "Jordan Smith", "Maria Garcia", "Yuki Tanaka"][i % 5] + ` ${id}`,
//       instructor: ["John Doe", "Jane Smith", "Sarah Connor"][i % 3],
//       location: locations[i % locations.length],
//       licenseClass: ["Class 7 L", "Class 7 N", "Class 5", "Class 1"][i % 4],
//       hoursLogged: hoursLogged,
//       totalRequiredHours: 12,
//       paymentStatus: status,
//       balanceCAD: status === "Paid" ? 0 : parseFloat((Math.random() * 800 + 100).toFixed(2)),
//       gdlEligibilityMonths: daysRemaining,
//       progress: Math.floor((hoursLogged / 12) * 100),
//       status: systemStatuses[i % systemStatuses.length],
//       email: `student${id}@drive-academy.ca`,
//       phone: `(709) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
//       evaluations: [
//         { category: "Lane Discipline", score: 4, note: "Maintains position well." },
//         { category: "Mirror Checks", score: 5, note: "Perfect observation." }
//       ],
//     };
//   });
// };

// const MASTER_DATA = generateStudents();

// export default function StudentPage() {
//   const [students, setStudents] = useState([]);
//   const [masterStudents, setMasterStudents] = useState(MASTER_DATA);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [paymentFilter, setPaymentFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 8;
//   const [viewStudent, setViewStudent] = useState(null);

//   const handleSearch = useCallback((val) => {
//     setQuery(val);
//     setPage(1);
//   }, []);

//   const fetchStudents = useCallback(() => {
//     setLoading(true);
//     setTimeout(() => {
//       let filtered = masterStudents.filter((s) =>
//         s.name.toLowerCase().includes(query.toLowerCase()) ||
//         s.email.toLowerCase().includes(query.toLowerCase())
//       );
      
//       if (locationFilter) filtered = filtered.filter((s) => s.location === locationFilter);
//       if (paymentFilter) filtered = filtered.filter((s) => s.paymentStatus === paymentFilter);
//       if (statusFilter) filtered = filtered.filter((s) => s.status === statusFilter);

//       if (paymentFilter !== "Paid" && paymentFilter !== "") {
//         filtered.sort((a, b) => b.balanceCAD - a.balanceCAD);
//       }
      
//       const start = (page - 1) * limit;
//       setStudents(filtered.slice(start, start + limit));
//       setTotal(filtered.length);
//       setLoading(false);
//     }, 400);
//   }, [page, query, locationFilter, paymentFilter, statusFilter, masterStudents]);

//   useEffect(() => { fetchStudents(); }, [page, query, locationFilter, paymentFilter, statusFilter]);

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      
//       {/* 1. ADAPTIVE HEADER */}
//       <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
//               Student <span className="text-teal-600 dark:text-teal-400">Management</span>
//             </h1>
//             <p className="text-[0.65rem] font-sora text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
//               Managing <span className="text-teal-600 font-semibold">{total}</span> student records
//             </p>
//           </div>
//         </div>

//         {/* Filter Bar */}
//         <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-6">
//           <div className="grid grid-cols-2 md:flex gap-2 flex-1">
            
//             {/* Location Filter */}
//             <div className="group relative">
//               <select 
//                 value={locationFilter} 
//                 onChange={(e) => { setLocationFilter(e.target.value); setPage(1); }}
//                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
//               >
//                 <option value="">All Regions</option>
//                 {locations.map(loc => (
//                   <option key={loc} value={loc}>{loc}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="group relative">
//               <select 
//                 value={paymentFilter} 
//                 onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
//                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
//               >
//                 <option value="">All Payment Status</option>
//                 {paymentStatuses.map(status => (
//                   <option key={status} value={status}>{status}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="group relative hidden md:block">
//               <select 
//                 value={statusFilter} 
//                 onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
//                 className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
//               >
//                 <option value="">All Statuses</option>
//                 {systemStatuses.map(stat => (
//                   <option key={stat} value={stat}>{stat}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="relative w-full md:max-w-xs">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
//             <input
//               type="text"
//               placeholder="Search by Name or Email..."
//               value={query}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400"
//             />
//           </div>
//         </div>
//       </header>

//       {/* 2. RESPONSIVE TABLE CONTAINER */}
//       <div className="flex-1 px-4 md:px-8 pb-8 overflow-y-auto custom-scrollbar">
        
//         {/* MOBILE VIEW */}
//         <div className="grid grid-cols-1 gap-4 md:hidden">
//           {students.map((student) => (
//             <div key={student.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-all">
//               {student.status === 'Blocked' && <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />}
              
//               <div className="flex justify-between items-start mb-3">
//                 <div>
//                   <h3 className="text-[0.85rem] font-medium text-slate-800 dark:text-white">{student.name}</h3>
//                   <p className="text-[0.6rem] font-sora text-slate-400 uppercase tracking-tighter">ID: #{student.id}</p>
//                 </div>
//                 <span className={`px-2 py-0.5 rounded text-[0.6rem] font-sora font-semibold uppercase tracking-wider ${
//                   student.status === 'Blocked' 
//                     ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
//                     : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
//                 }`}>
//                   {student.status}
//                 </span>
//               </div>

//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center gap-2 text-[0.7rem] text-slate-600 dark:text-slate-400">
//                   <Mail size={12} className="text-teal-500" /> {student.email}
//                 </div>
//                 <div className="flex items-center gap-2 text-[0.7rem] text-slate-600 dark:text-slate-400">
//                   <MapPin size={12} className="text-teal-500" /> {student.location}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-2">
//                 <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center">
//                   <p className="text-[0.55rem] font-sora text-slate-400">Payment</p>
//                   <p className={`text-[0.65rem] font-semibold ${
//                     student.paymentStatus === 'Paid' 
//                       ? 'text-green-600 dark:text-green-400' 
//                       : 'text-amber-600 dark:text-amber-400'
//                   }`}>
//                     {student.paymentStatus}
//                   </p>
//                 </div>
//                 <button 
//                   onClick={() => setViewStudent(student)}
//                   className="py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all active:scale-95 flex items-center justify-center gap-1"
//                 >
//                   <Eye size={12} /> View
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* DESKTOP VIEW */}
//         <div className="hidden md:block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
//               <tr className="text-[0.75rem] font-sora font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                 <th className="px-5 py-3">Student Details</th>
//                 <th className="px-5 py-3">Location</th>
//                 <th className="px-5 py-3">Payment</th>
//                 <th className="px-5 py-3">Status</th>
//                 <th className="px-5 py-3 text-right">Actions</th>
//                </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {students.map((student) => (
//                 <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
//                   <td className="px-5 py-3">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-white ${
//                         student.status === 'Blocked' 
//                           ? 'bg-slate-400 dark:bg-slate-600' 
//                           : 'bg-teal-500'
//                       }`}>
//                         {student.name.charAt(0)}
//                       </div>
//                       <div>
//                         <div className="text-[0.8rem] font-medium text-slate-800 dark:text-white leading-tight">
//                           {student.name}
//                         </div>
//                         <div className="text-[0.65rem] text-slate-500 mt-0.5 font-sora">
//                           {student.email}
//                         </div>
//                       </div>
//                     </div>
//                    </td>
//                   <td className="px-5 py-3">
//                     <div className="flex items-center gap-1.5 text-[0.75rem] dark:text-slate-300">
//                       <MapPin size={12} className="text-slate-400 shrink-0" />
//                       <span>{student.location}</span>
//                     </div>
//                     <div className="text-[0.6rem] font-sora text-slate-400 pl-5">{student.licenseClass}</div>
//                    </td>
//                   <td className="px-5 py-3">
//                     <span className={`inline-flex px-2 py-0.5 rounded text-[0.6rem] font-sora font-semibold uppercase tracking-wider ${
//                       student.paymentStatus === 'Paid' 
//                         ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
//                         : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
//                     }`}>
//                       {student.paymentStatus}
//                     </span>
//                     {student.paymentStatus !== 'Paid' && (
//                       <div className="text-[0.55rem] text-amber-600 mt-1">${student.balanceCAD.toFixed(2)} due</div>
//                     )}
//                    </td>
//                   <td className="px-5 py-3">
//                     <span className={`inline-flex px-2 py-0.5 rounded text-[0.6rem] font-sora font-semibold uppercase tracking-wider ${
//                       student.status === 'Blocked' 
//                         ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
//                         : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
//                     }`}>
//                       {student.status}
//                     </span>
//                    </td>
//                   <td className="px-5 py-3 text-right">
//                     <div className="flex items-center justify-end gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-200">
//                       <button 
//                         onClick={() => setViewStudent(student)} 
//                         className="p-1.5 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg transition-colors" 
//                         title="View Details"
//                       >
//                         <Eye size={16} />
//                       </button>
//                     </div>
//                    </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {students.length === 0 && (
//             <div className="py-16 text-center text-slate-400 dark:text-slate-500 text-[0.7rem] font-sora">
//               No students found for these filters.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Pagination */}
//       {total > limit && (
//         <div className="flex justify-center pb-8">
//           <Pagination 
//             currentPage={page} 
//             totalItems={total} 
//             itemsPerPage={limit} 
//             onPageChange={setPage} 
//           />
//         </div>
//       )}

//       {viewStudent && <StudentDetailView student={viewStudent} onClose={() => setViewStudent(null)} />}
//     </div>
//   );
// }
















import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import StudentDetailView from "../components/StudentDetailView";
import { Eye, EyeOff, Maximize2, ScanEye, ExternalLink, MapPin, ChevronRight, Trash2, Mail, Phone, Calendar, AlertCircle, Search } from "lucide-react";
import {  } from "lucide-react";


const locations = ["Burin", "Grand Falls", "Marystown", "St. John's / Mount Pearl"];
const paymentStatuses = ["Paid", "Due", "Overdue"];
const systemStatuses = ["Active", "Blocked"];

const generateStudents = () => {
  return Array.from({ length: 120 }, (_, i) => {
    const id = i + 1;
    const hoursLogged = Math.floor(Math.random() * 13);
    const daysRemaining = Math.floor(Math.random() * 10);
    const status = paymentStatuses[i % paymentStatuses.length];
    
    return {
      id: id,
      name: ["Alex Rivera", "Sam Chen", "Jordan Smith", "Maria Garcia", "Yuki Tanaka"][i % 5] + ` ${id}`,
      instructor: ["John Doe", "Jane Smith", "Sarah Connor"][i % 3],
      location: locations[i % locations.length],
      licenseClass: ["Class 7 L", "Class 7 N", "Class 5", "Class 1"][i % 4],
      hoursLogged: hoursLogged,
      totalRequiredHours: 12,
      paymentStatus: status,
      balanceCAD: status === "Paid" ? 0 : parseFloat((Math.random() * 800 + 100).toFixed(2)),
      gdlEligibilityMonths: daysRemaining,
      progress: Math.floor((hoursLogged / 12) * 100),
      status: systemStatuses[i % systemStatuses.length],
      email: `student${id}@drive-academy.ca`,
      phone: `(709) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      evaluations: [
        { category: "Lane Discipline", score: 4, note: "Maintains position well." },
        { category: "Mirror Checks", score: 5, note: "Perfect observation." }
      ],
    };
  });
};

const MASTER_DATA = generateStudents();

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [masterStudents, setMasterStudents] = useState(MASTER_DATA);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;
  const [viewStudent, setViewStudent] = useState(null);

  const handleSearch = useCallback((val) => {
    setQuery(val);
    setPage(1);
  }, []);

  const fetchStudents = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      let filtered = masterStudents.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.email.toLowerCase().includes(query.toLowerCase())
      );
      
      if (locationFilter) filtered = filtered.filter((s) => s.location === locationFilter);
      if (paymentFilter) filtered = filtered.filter((s) => s.paymentStatus === paymentFilter);
      if (statusFilter) filtered = filtered.filter((s) => s.status === statusFilter);

      if (paymentFilter !== "Paid" && paymentFilter !== "") {
        filtered.sort((a, b) => b.balanceCAD - a.balanceCAD);
      }
      
      const start = (page - 1) * limit;
      setStudents(filtered.slice(start, start + limit));
      setTotal(filtered.length);
      setLoading(false);
    }, 400);
  }, [page, query, locationFilter, paymentFilter, statusFilter, masterStudents]);

  useEffect(() => { fetchStudents(); }, [page, query, locationFilter, paymentFilter, statusFilter]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      
      {/* 1. ADAPTIVE HEADER */}
      <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
              Student <span className="text-teal-600 dark:text-teal-400">Management</span>
            </h1>
            <p className="text-[0.65rem] font-sora text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
              Managing <span className="text-teal-600 font-semibold">{total}</span> student records
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-6">
          <div className="grid grid-cols-2 md:flex gap-2 flex-1">
            
            {/* Location Filter */}
            <div className="group relative">
              <select 
                value={locationFilter} 
                onChange={(e) => { setLocationFilter(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
              >
                <option value="">All Regions</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="group relative">
              <select 
                value={paymentFilter} 
                onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
              >
                <option value="">All Payment Status</option>
                {paymentStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="group relative hidden md:block">
              <select 
                value={statusFilter} 
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
              >
                <option value="">All Statuses</option>
                {systemStatuses.map(stat => (
                  <option key={stat} value={stat}>{stat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search by Name or Email..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400"
            />
          </div>
        </div>
      </header>

      {/* 2. RESPONSIVE TABLE CONTAINER */}
      <div className="flex-1 px-4 md:px-8 pb-8 overflow-y-auto custom-scrollbar">
        
        {/* MOBILE VIEW */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {students.map((student) => (
            <div key={student.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-all">
              {student.status === 'Blocked' && <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />}
              
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-[0.85rem] font-medium text-slate-800 dark:text-white">{student.name}</h3>
                  <p className="text-[0.6rem] font-sora text-slate-400 uppercase tracking-tighter">ID: #{student.id}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[0.6rem] font-sora font-semibold uppercase tracking-wider ${
                  student.status === 'Blocked' 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                }`}>
                  {student.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[0.7rem] text-slate-600 dark:text-slate-400">
                  <Mail size={12} className="text-teal-500" /> {student.email}
                </div>
                <div className="flex items-center gap-2 text-[0.7rem] text-slate-600 dark:text-slate-400">
                  <MapPin size={12} className="text-teal-500" /> {student.location}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-center">
                  <p className="text-[0.55rem] font-sora text-slate-400">Payment</p>
                  <p className={`text-[0.65rem] font-semibold ${
                    student.paymentStatus === 'Paid' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {student.paymentStatus}
                  </p>
                </div>
                {/* <button 
  onClick={() => setViewStudent(student)} 
  className="p-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg transition-all duration-200 hover:bg-teal-500 hover:text-white hover:scale-105 active:scale-95"
  title="View Student Details"
>
  <ScanEye size={16} />
</button> */}
<button 
  onClick={() => setViewStudent(student)} 
  className="group relative w-full py-2.5 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 hover:border-transparent hover:text-white hover:shadow-lg hover:shadow-teal-500/25 active:scale-[0.98] overflow-hidden"
  title="View Student Details"
>
  <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
  <span className="relative z-10 flex items-center gap-2">
    <Eye size={14} className="transition-transform duration-300 group-hover:scale-110" />
  </span>
</button>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
              <tr className="text-[0.75rem] font-sora font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="px-5 py-3">Student Details</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-white ${
                        student.status === 'Blocked' 
                          ? 'bg-slate-400 dark:bg-slate-600' 
                          : 'bg-teal-500'
                      }`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[0.8rem] font-medium text-slate-800 dark:text-white leading-tight">
                          {student.name}
                        </div>
                        <div className="text-[0.65rem] text-slate-500 mt-0.5 font-sora">
                          {student.email}
                        </div>
                      </div>
                    </div>
                   </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-[0.75rem] dark:text-slate-300">
                      <MapPin size={12} className="text-slate-400 shrink-0" />
                      <span>{student.location}</span>
                    </div>
                    <div className="text-[0.6rem] font-sora text-slate-400 pl-5">{student.licenseClass}</div>
                   </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[0.6rem] font-sora font-semibold uppercase tracking-wider ${
                      student.paymentStatus === 'Paid' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                    }`}>
                      {student.paymentStatus}
                    </span>
                    {student.paymentStatus !== 'Paid' && (
                      <div className="text-[0.55rem] text-amber-600 mt-1">${student.balanceCAD.toFixed(2)} due</div>
                    )}
                   </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-[0.6rem] font-sora font-semibold uppercase tracking-wider ${
                      student.status === 'Blocked' 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    }`}>
                      {student.status}
                    </span>
                   </td>
                  {/* <td className="px-5 py-3 text-right">
                    Action button always visible with hover color change
                    <button 
                      onClick={() => setViewStudent(student)} 
                      className="p-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg transition-all duration-200 hover:bg-teal-500 hover:text-white"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                   </td> */}
                   <td className="px-5 py-3 text-right">
  <button 
    onClick={() => setViewStudent(student)} 
    className="
      group relative
      p-2
      text-slate-400 dark:text-slate-500
      rounded-xl 
      transition-all 
      duration-300 
      ease-out
      hover:bg-gradient-to-br 
      hover:from-blue-50 
      hover:to-indigo-50 
      dark:hover:from-blue-500/10 
      dark:hover:to-indigo-500/10
      hover:text-blue-600 
      dark:hover:text-blue-400
      hover:scale-110 
      active:scale-95
      focus:outline-none 
      focus:ring-2 
      focus:ring-blue-500/40
      focus:ring-offset-2
      focus:ring-offset-white 
      dark:focus:ring-offset-slate-900
      shadow-sm
      hover:shadow-md
    "
    title="View Student Details"
  >
    <ScanEye size={18} className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-sm" />
    
    {/* Elegant tooltip */}
    <span className="
      absolute -top-9 left-1/2 -translate-x-1/2 
      px-2.5 py-1 
      bg-slate-800/90 dark:bg-slate-700/90 
      backdrop-blur-sm
      text-white text-[10px] font-medium 
      rounded-lg 
      opacity-0 group-hover:opacity-100 
      transition-all duration-200
      pointer-events-none
      whitespace-nowrap
      shadow-lg
      border border-white/10
      after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2
      after:border-4 after:border-transparent after:border-t-slate-800/90 dark:after:border-t-slate-700/90
    ">
      View {student.name.split(' ')[0]}
    </span>
  </button>
</td>
                 </tr>
              ))}
            </tbody>
           </table>
          {students.length === 0 && (
            <div className="py-16 text-center text-slate-400 dark:text-slate-500 text-[0.7rem] font-sora">
              No students found for these filters.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {total > limit && (
        <div className="flex justify-center pb-8">
          <Pagination 
            currentPage={page} 
            totalItems={total} 
            itemsPerPage={limit} 
            onPageChange={setPage} 
          />
        </div>
      )}

      {viewStudent && <StudentDetailView student={viewStudent} onClose={() => setViewStudent(null)} />}
    </div>
  );
}