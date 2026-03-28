// import React, { useState, useEffect, useMemo } from 'react';
// import { 
//   Search, Download, CheckCircle, Filter, 
//   RotateCw, Eye, X, FileText, AlertCircle, HelpCircle, Receipt, Plus, Save, Loader2, Tag, AlignLeft, ChevronDown, ChevronUp
// } from 'lucide-react';

// const Finances = () => {
//   const [loading, setLoading] = useState(true);
//   const [expenses, setExpenses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All Status');
//   const [selectedExpense, setSelectedExpense] = useState(null);
//   const [adminRemarks, setAdminRemarks] = useState('');
//   const [expandedMobile, setExpandedMobile] = useState(null);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   const dummyExpenses = [
//     {
//       id: 1,
//       instructor: { user: { name: 'Marc-André LeBlanc' } },
//       category: 'Fuel',
//       amount: 85.50,
//       status: 'pending',
//       description: 'Fuel for highway driving lessons in Burin area. 2 full tanks for student practice sessions.',
//       receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
//       admin_remarks: '',
//       date: '2026-03-15'
//     },
//     {
//       id: 2,
//       instructor: { user: { name: 'Sarah Chen' } },
//       category: 'Maintenance',
//       amount: 450.00,
//       status: 'approved',
//       description: 'Vehicle V-882 - Oil change, tire rotation, and brake inspection.',
//       receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
//       admin_remarks: 'Approved - Regular maintenance schedule',
//       date: '2026-03-14'
//     },
//     {
//       id: 3,
//       instructor: { user: { name: 'David Miller' } },
//       category: 'Parking',
//       amount: 25.00,
//       status: 'rejected',
//       description: 'Parking fee at downtown St. John\'s during student pickup.',
//       receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
//       admin_remarks: 'Rejected - Parking fees should be included in daily rate',
//       date: '2026-03-13'
//     },
//     {
//       id: 4,
//       instructor: { user: { name: 'Patricia Walsh' } },
//       category: 'Fuel',
//       amount: 120.75,
//       status: 'approved',
//       description: 'Fuel for Marystown to Burin student pickups.',
//       receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
//       admin_remarks: 'Approved - Valid travel expenses',
//       date: '2026-03-12'
//     },
//     {
//       id: 5,
//       instructor: { user: { name: 'Jean-François Roy' } },
//       category: 'Supplies',
//       amount: 35.99,
//       status: 'pending',
//       description: 'Training cones for parallel parking practice.',
//       receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
//       admin_remarks: '',
//       date: '2026-03-11'
//     },
//     {
//       id: 6,
//       instructor: { user: { name: 'Emily Murphy' } },
//       category: 'Maintenance',
//       amount: 320.50,
//       status: 'pending',
//       description: 'Windshield replacement for vehicle V-883.',
//       receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
//       admin_remarks: '',
//       date: '2026-03-10'
//     }
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setExpenses(dummyExpenses);
//       setLoading(false);
//     }, 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleStatusUpdate = (id, newStatus) => {
//     setExpenses(prev => prev.map(ex => 
//       ex.id === id 
//         ? { ...ex, status: newStatus, admin_remarks: adminRemarks } 
//         : ex
//     ));
//     setSelectedExpense(null);
//     setAdminRemarks('');
//     alert(`Claim successfully ${newStatus}.`);
//   };

//   const filteredExpenses = useMemo(() => {
//     return expenses.filter(exp => {
//       const instructorName = exp.instructor?.user?.name || '';
//       const matchesSearch = instructorName.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesStatus = statusFilter === 'All Status' || exp.status.toLowerCase() === statusFilter.toLowerCase();
//       return matchesSearch && matchesStatus;
//     });
//   }, [searchTerm, statusFilter, expenses]);

//   const stats = useMemo(() => {
//     const total = expenses.filter(e => e.status === 'approved').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
//     return [
//       { label: "Pending", value: expenses.filter(e => e.status === 'pending').length, color: "text-amber-500" },
//       { label: "Approved Total", value: `$${total.toFixed(2)}`, color: "text-emerald-500" },
//       { label: "Queries", value: expenses.filter(e => e.status === 'rejected').length, color: "text-rose-500" }
//     ];
//   }, [expenses]);

//   if (loading) return (
//     <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-[#0f172a]">
//       <div className="text-center">
//         <Loader2 className="animate-spin text-teal-600 mx-auto mb-4" size={48} />
//         <p className="text-sm font-mono font-bold uppercase tracking-widest text-slate-600 dark:text-white">
//           Accessing Secure Financial Core...
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300">
//       <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 pb-24">
        
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
//               Financial <span className="text-teal-600">Control</span>
//             </h1>
//             <p className="text-[0.6rem] sm:text-[0.65rem] font-mono text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
//               Manage and approve instructor expense claims
//             </p>
//           </div>
//           <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
//             <Download size={14}/> Export History
//           </button>
//         </div>

//         {/* Stats Cards - Responsive Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
//           {stats.map((s, i) => (
//             <div key={i} className="bg-white dark:bg-[#111827] p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
//               <p className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-slate-400 mb-1">{s.label}</p>
//               <p className={`text-xl sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Mobile Filter Toggle */}
//         <div className="lg:hidden">
//           <button
//             onClick={() => setShowMobileFilters(!showMobileFilters)}
//             className="w-full flex items-center justify-between p-3 bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800"
//           >
//             <span className="text-xs font-mono font-bold uppercase">Filters</span>
//             {showMobileFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//           </button>
//         </div>

//         {/* Search & Filter Bar */}
//         <div className={`${showMobileFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-3 lg:gap-4 bg-white dark:bg-[#111827] p-3 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800`}>
//           <div className="flex items-center gap-2 px-3 flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl py-2">
//             <Search size={16} className="text-slate-400 flex-shrink-0" />
//             <input 
//               className="bg-transparent border-none outline-none text-sm w-full dark:text-white font-medium" 
//               placeholder="Filter by instructor name..." 
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <select 
//             value={statusFilter} 
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="w-full lg:w-auto bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-mono font-bold uppercase py-2.5 px-4 dark:text-white outline-none border-none cursor-pointer"
//           >
//             <option>All Status</option>
//             <option>Pending</option>
//             <option>Approved</option>
//             <option>Rejected</option>
//           </select>
//         </div>

//         {/* Desktop Table View */}
//         <div className="hidden md:block bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl sm:rounded-2xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left min-w-[640px]">
//               <thead className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
//                 <tr>
//                   <th className="px-4 py-3 sm:px-6 sm:py-4">Instructor</th>
//                   <th className="px-4 py-3 sm:px-6 sm:py-4">Category</th>
//                   <th className="px-4 py-3 sm:px-6 sm:py-4 text-center">Amount</th>
//                   <th className="px-4 py-3 sm:px-6 sm:py-4 text-center">Status</th>
//                   <th className="px-4 py-3 sm:px-6 sm:py-4 text-right">Verification</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                 {filteredExpenses.map((exp) => (
//                   <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
//                     <td className="px-4 py-3 sm:px-6 sm:py-4">
//                       <div className="font-semibold text-slate-800 dark:text-white">{exp.instructor?.user?.name || 'N/A'}</div>
//                       <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5">{exp.date}</div>
//                     </td>
//                     <td className="px-4 py-3 sm:px-6 sm:py-4">
//                       <span className="px-2 py-1 rounded-lg text-[8px] sm:text-[9px] font-mono font-bold uppercase bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400">
//                         {exp.category}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 sm:px-6 sm:py-4 text-center font-semibold text-slate-900 dark:text-white">
//                       ${parseFloat(exp.amount).toFixed(2)}
//                     </td>
//                     <td className="px-4 py-3 sm:px-6 sm:py-4 text-center">
//                       <span className={`px-2 py-1 rounded-lg text-[8px] sm:text-[9px] font-mono font-bold uppercase ${
//                         exp.status === 'approved' 
//                           ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
//                           : exp.status === 'pending' 
//                           ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' 
//                           : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
//                       }`}>
//                         {exp.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 sm:px-6 sm:py-4 text-right">
//                       <button 
//                         onClick={() => { 
//                           setSelectedExpense(exp); 
//                           setAdminRemarks(exp.admin_remarks || ''); 
//                         }} 
//                         className="p-1.5 sm:p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30 rounded-lg transition-all"
//                       >
//                         <Eye size={16} className="sm:size-[18px]" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {filteredExpenses.length === 0 && (
//             <p className="p-6 sm:p-10 text-center text-[9px] sm:text-[10px] font-mono font-bold uppercase text-slate-500 italic">
//               No records matching the current filter
//             </p>
//           )}
//         </div>

//         {/* Mobile Card View */}
//         <div className="md:hidden space-y-3">
//           {filteredExpenses.map((exp) => (
//             <div key={exp.id} className="bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
//               <div className="p-4">
//                 <div className="flex justify-between items-start mb-3">
//                   <div>
//                     <h3 className="font-semibold text-slate-800 dark:text-white">{exp.instructor?.user?.name || 'N/A'}</h3>
//                     <p className="text-[10px] font-mono text-slate-400">{exp.date}</p>
//                   </div>
//                   <span className={`px-2 py-1 rounded-lg text-[8px] font-mono font-bold uppercase ${
//                     exp.status === 'approved' 
//                       ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400' 
//                       : exp.status === 'pending' 
//                       ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400' 
//                       : 'bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400'
//                   }`}>
//                     {exp.status}
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between items-center mb-3">
//                   <div>
//                     <span className="px-2 py-0.5 rounded-lg text-[8px] font-mono font-bold uppercase bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400">
//                       {exp.category}
//                     </span>
//                   </div>
//                   <div className="text-lg font-bold text-slate-900 dark:text-white">
//                     ${parseFloat(exp.amount).toFixed(2)}
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setExpandedMobile(expandedMobile === exp.id ? null : exp.id)}
//                   className="w-full flex items-center justify-between py-2 text-xs text-slate-500"
//                 >
//                   <span>{expandedMobile === exp.id ? 'Hide Details' : 'Show Details'}</span>
//                   {expandedMobile === exp.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                 </button>

//                 {expandedMobile === exp.id && (
//                   <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
//                     <div className="bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg">
//                       <p className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Description</p>
//                       <p className="text-xs text-slate-600 dark:text-slate-300">{exp.description || 'No description'}</p>
//                     </div>
//                     <button
//                       onClick={() => { 
//                         setSelectedExpense(exp); 
//                         setAdminRemarks(exp.admin_remarks || ''); 
//                       }}
//                       className="w-full py-2 bg-teal-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2"
//                     >
//                       <Eye size={14} /> Review Claim
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//           {filteredExpenses.length === 0 && (
//             <p className="p-8 text-center text-[10px] font-mono font-bold uppercase text-slate-500 italic">
//               No records matching the current filter
//             </p>
//           )}
//         </div>
//       </main>

//       {/* ADMIN REVIEW MODAL - Responsive */}
//       {selectedExpense && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedExpense(null)} />
//           <div className="relative z-10 w-full max-w-4xl bg-white dark:bg-[#111827] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
            
//             {/* Modal Content - Responsive */}
//             <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
//               {/* Left side: Evidence Viewer */}
//               <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 flex flex-col items-center justify-center border-b md:border-r border-slate-200 dark:border-slate-800">
//                 <p className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase mb-3 tracking-wider">Visual Evidence</p>
//                 <img 
//                   src={selectedExpense.receipt_path} 
//                   className="max-w-full max-h-[40vh] sm:max-h-[50vh] object-contain rounded-lg shadow-lg" 
//                   alt="Instructor Receipt" 
//                 />
//                 <a 
//                   href={selectedExpense.receipt_path} 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="mt-3 text-[10px] sm:text-xs font-mono font-bold text-teal-600 hover:underline flex items-center gap-1"
//                 >
//                   <FileText size={12} /> View Full Receipt
//                 </a>
//               </div>

//               {/* Right side: Detailed Analysis */}
//               <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col space-y-4 overflow-y-auto">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-[8px] sm:text-[9px] font-mono font-bold text-teal-600 uppercase tracking-wider mb-1">Instructor Profile</p>
//                     <h2 className="text-lg sm:text-xl font-bold dark:text-white">{selectedExpense.instructor?.user?.name}</h2>
//                     <p className="text-[8px] sm:text-[9px] font-mono text-slate-500 mt-1">Submitted on {selectedExpense.date}</p>
//                   </div>
//                   <button 
//                     onClick={() => setSelectedExpense(null)} 
//                     className="p-1.5 sm:p-2 text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full transition-colors"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 sm:gap-3">
//                   <div className="bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-700">
//                     <p className="text-[7px] sm:text-[8px] font-mono font-bold text-slate-400 uppercase mb-1">Claim Amount</p>
//                     <p className="text-lg sm:text-xl font-bold text-teal-600">${parseFloat(selectedExpense.amount).toFixed(2)}</p>
//                   </div>
//                   <div className="bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-700">
//                     <p className="text-[7px] sm:text-[8px] font-mono font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><Tag size={8}/> Category</p>
//                     <p className="text-xs font-mono font-bold uppercase text-teal-600">{selectedExpense.category}</p>
//                   </div>
//                 </div>

//                 {/* DESCRIPTION SECTION */}
//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-700">
//                   <p className="text-[7px] sm:text-[8px] font-mono font-bold text-slate-400 uppercase mb-2 flex items-center gap-1"><AlignLeft size={8}/> Description</p>
//                   <p className="text-xs sm:text-sm font-medium dark:text-slate-300 leading-relaxed">
//                     {selectedExpense.description || "No description provided."}
//                   </p>
//                 </div>

//                 {/* Admin Remarks Input */}
//                 <div className="space-y-2">
//                   <p className="text-[8px] sm:text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Review Remarks</p>
//                   <textarea 
//                     className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm font-medium dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
//                     placeholder="State reason for approval or rejection..."
//                     rows="2"
//                     value={adminRemarks}
//                     onChange={(e) => setAdminRemarks(e.target.value)}
//                   />
//                 </div>

//                 <div className="flex flex-col gap-2 pt-2">
//                   <button 
//                     onClick={() => handleStatusUpdate(selectedExpense.id, 'approved')} 
//                     className="w-full py-2.5 sm:py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
//                   >
//                     <CheckCircle size={14}/> Approve & Reconcile
//                   </button>
//                   <button 
//                     onClick={() => handleStatusUpdate(selectedExpense.id, 'rejected')} 
//                     className="w-full py-2.5 sm:py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-mono font-bold text-[9px] sm:text-[10px] uppercase tracking-wider shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
//                   >
//                     <X size={14}/> Flag / Reject Claim
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Finances;












import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Download, CheckCircle, Filter, 
  RotateCw, ScanEye, X, FileText, AlertCircle, HelpCircle, Receipt, Plus, Save, Loader2, Tag, AlignLeft, ChevronDown, ChevronUp, MapPin, Mail, Phone, Calendar
} from 'lucide-react';

const Finances = () => {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [adminRemarks, setAdminRemarks] = useState('');
  const [expandedMobile, setExpandedMobile] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const dummyExpenses = [
    {
      id: 1,
      instructor: { user: { name: 'Marc-André LeBlanc' } },
      instructor_id: "INS-001",
      category: 'Fuel',
      amount: 85.50,
      status: 'pending',
      description: 'Fuel for highway driving lessons in Burin area. 2 full tanks for student practice sessions.',
      receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      admin_remarks: '',
      date: '2026-03-15',
      location: 'Burin'
    },
    {
      id: 2,
      instructor: { user: { name: 'Sarah Chen' } },
      instructor_id: "INS-002",
      category: 'Maintenance',
      amount: 450.00,
      status: 'approved',
      description: 'Vehicle V-882 - Oil change, tire rotation, and brake inspection.',
      receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      admin_remarks: 'Approved - Regular maintenance schedule',
      date: '2026-03-14',
      location: 'St. John\'s'
    },
    {
      id: 3,
      instructor: { user: { name: 'David Miller' } },
      instructor_id: "INS-003",
      category: 'Parking',
      amount: 25.00,
      status: 'rejected',
      description: 'Parking fee at downtown St. John\'s during student pickup.',
      receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      admin_remarks: 'Rejected - Parking fees should be included in daily rate',
      date: '2026-03-13',
      location: 'St. John\'s'
    },
    {
      id: 4,
      instructor: { user: { name: 'Patricia Walsh' } },
      instructor_id: "INS-004",
      category: 'Fuel',
      amount: 120.75,
      status: 'approved',
      description: 'Fuel for Marystown to Burin student pickups.',
      receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      admin_remarks: 'Approved - Valid travel expenses',
      date: '2026-03-12',
      location: 'Marystown'
    },
    {
      id: 5,
      instructor: { user: { name: 'Jean-François Roy' } },
      instructor_id: "INS-005",
      category: 'Supplies',
      amount: 35.99,
      status: 'pending',
      description: 'Training cones for parallel parking practice.',
      receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      admin_remarks: '',
      date: '2026-03-11',
      location: 'Grand Falls'
    },
    {
      id: 6,
      instructor: { user: { name: 'Emily Murphy' } },
      instructor_id: "INS-006",
      category: 'Maintenance',
      amount: 320.50,
      status: 'pending',
      description: 'Windshield replacement for vehicle V-883.',
      receipt_path: 'https://th.bing.com/th/id/OIP.nDZzallriTt0EIhH_Rua2QAAAA?w=182&h=236&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
      admin_remarks: '',
      date: '2026-03-10',
      location: 'Burin'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpenses(dummyExpenses);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setExpenses(prev => prev.map(ex => 
      ex.id === id 
        ? { ...ex, status: newStatus, admin_remarks: adminRemarks } 
        : ex
    ));
    setSelectedExpense(null);
    setAdminRemarks('');
    alert(`Claim successfully ${newStatus}.`);
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter(exp => {
      const instructorName = exp.instructor?.user?.name || '';
      const matchesSearch = instructorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exp.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || exp.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, expenses]);

  const stats = useMemo(() => {
    const total = expenses.filter(e => e.status === 'approved').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    return [
      { label: "Pending", value: expenses.filter(e => e.status === 'pending').length, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
      { label: "Approved Total", value: `$${total.toFixed(2)}`, color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-900/20" },
      { label: "Rejected", value: expenses.filter(e => e.status === 'rejected').length, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" }
    ];
  }, [expenses]);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={48} />
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Loading financial data...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      
      {/* HEADER */}
      <header className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
              Financial <span className="text-teal-600 dark:text-teal-400">Control</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              Manage and approve instructor expense claims
            </p>
          </div>
          <div className="flex justify-end w-full md:w-auto">
            <button className="w-full md:w-auto px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-teal-600 hover:text-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              <Download size={18} /> Export History
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col w-full lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4 mb-6">
          {/* Filter Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2 sm:gap-3 flex-1">
            
            {/* Status Filter */}
            <div className="group relative w-full">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm cursor-pointer"
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="group relative w-full">
              <select 
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm cursor-pointer"
              >
                <option>All Categories</option>
                <option>Fuel</option>
                <option>Maintenance</option>
                <option>Parking</option>
                <option>Supplies</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by instructor or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className={`${s.bg} rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm`}>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8 overflow-x-hidden">
        <div className="max-w-[1800px] mx-auto">
          
          {/* MOBILE VIEW */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredExpenses.map((exp) => (
              <div key={exp.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-white">{exp.instructor?.user?.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">ID: {exp.instructor_id} • {exp.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    exp.status === 'approved' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' : 
                    exp.status === 'pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {exp.status}
                  </span>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Tag size={16} className="text-teal-500 shrink-0" /> 
                    <span>{exp.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={16} className="text-teal-500 shrink-0" /> 
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-bold text-teal-600 dark:text-teal-400">${parseFloat(exp.amount).toFixed(2)}</span>
                    
                  </div>
                  <button 
                      onClick={() => { 
                        setSelectedExpense(exp); 
                        setAdminRemarks(exp.admin_remarks || ''); 
                      }}
                    className="w-full flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                    >
                      <ScanEye size={18} /> View Details
                    </button>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW */}
          <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Instructor</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Location</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</th>
                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredExpenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-slate-800 dark:text-white">{exp.instructor?.user?.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">ID: {exp.instructor_id}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex px-2 py-1 rounded-lg text-[10px] justify-center w-25 font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400">
                          {exp.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-base font-bold text-teal-600 dark:text-teal-400">${parseFloat(exp.amount).toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                          <MapPin size={14} className="text-teal-500" /> {exp.location}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{exp.date}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 w-25 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          exp.status === 'approved' ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400' : 
                          exp.status === 'pending' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' :
                          'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full justify-center ${
                            exp.status === 'approved' ? 'bg-teal-500' : 
                            exp.status === 'pending' ? 'bg-amber-500 animate-pulse' : 
                            'bg-red-500'
                          }`} />
                          {exp.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button 
                          onClick={() => { 
                            setSelectedExpense(exp); 
                            setAdminRemarks(exp.admin_remarks || ''); 
                          }}
                          className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-all"
                          title="Review Claim"
                        >
                          <ScanEye size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredExpenses.length === 0 && (
              <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl m-6">
                <Receipt size={56} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No expenses found matching your filters.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setStatusFilter('All');}} 
                  className="mt-4 text-teal-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ADMIN REVIEW MODAL */}
      {selectedExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-950 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
            
            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Left side: Evidence Viewer */}
              <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-800/30 p-6 flex flex-col items-center justify-center border-b md:border-r border-slate-200 dark:border-slate-800 overflow-y-auto">
                <div className="text-center mb-4">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Visual Evidence</p>
                </div>
                <img 
                  src={selectedExpense.receipt_path} 
                  className="max-w-full max-h-[50vh] object-contain rounded-xl shadow-lg" 
                  alt="Receipt" 
                />
                <a 
                  href={selectedExpense.receipt_path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 text-sm font-medium text-teal-600 hover:underline flex items-center gap-2"
                >
                  <FileText size={16} /> View Full Receipt
                </a>
              </div>

              {/* Right side: Detailed Analysis */}
              <div className="w-full md:w-1/2 p-6 flex flex-col space-y-5 overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">Instructor</p>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">{selectedExpense.instructor?.user?.name}</h2>
                    <p className="text-sm text-slate-500 mt-1">Submitted on {selectedExpense.date}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedExpense(null)} 
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Claim Amount</p>
                    <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">${parseFloat(selectedExpense.amount).toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Category</p>
                    <p className="text-sm font-bold uppercase text-teal-600 dark:text-teal-400">{selectedExpense.category}</p>
                  </div>
                </div>

                {/* Description Section */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Description</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedExpense.description || "No description provided."}
                  </p>
                </div>

                {/* Location Info */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-teal-500" />
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</p>
                  </div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{selectedExpense.location}</p>
                </div>

                {/* Admin Remarks Input */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Review Remarks</label>
                  <textarea 
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all resize-none"
                    placeholder="State reason for approval or rejection..."
                    rows="3"
                    value={adminRemarks}
                    onChange={(e) => setAdminRemarks(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => handleStatusUpdate(selectedExpense.id, 'approved')} 
                    className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                  >
                    <CheckCircle size={16} /> Approve & Reconcile
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(selectedExpense.id, 'rejected')} 
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <X size={16} /> Reject Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finances;