// import React, { useState } from "react";

// import SearchBar from "../../components/SearchBar";
// import Pagination from "../../components/Pagination";
// import InstructorStudentDetail from "../../components/instructor/InstructorStudentDetail";
// import { Eye, MapPin } from "lucide-react";

// const MyStudents = () => {
//   const [query, setQuery] = useState("");
//   const [section, setSection] = useState("All");
//   const [page, setPage] = useState(1);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   // Mock Student Data
//   const [students] = useState([
//     { id: "STU-001", name: "Alex Rivera", location: "Burin", progress: 65, status: "Active", email: "alex@example.com", package: "Full GDL", payment: "Balance Due" },
//     { id: "STU-003", name: "Yuki Tanaka", location: "Burin", progress: 100, status: "Completed", email: "yuki@example.com", package: "Pro Highway", payment: "Paid" },
//     { id: "STU-004", name: "Muhammed Salman", location: "burin", progress: 40, status: "Active", email: "salman@tech.com", package: "Basic 10hr", payment: "Balance Due" },
//   ]);

//   const filteredStudents = students.filter(s => {
//     const matchesSearch = s.name.toLowerCase().includes(query.toLowerCase());
//     if (section === "Completed") return matchesSearch && s.progress === 100;
//     if (section === "In Progress") return matchesSearch && s.progress < 100;
//     return matchesSearch;
//   });

//   return (
//     <div className="flex-1 bg-slate-50 dark:bg-gray-950 min-h-screen font-['Lexend']">
      
      
//       <main className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
        
//         {/* Filter Header - Stacked on Mobile, Row on Desktop */}
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-4 md:gap-6">
//           <div className="w-full lg:max-w-md">
//             <SearchBar onSearch={(val) => setQuery(val)} placeholder="Filter your students..." />
//           </div>
          
//           <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
//             {["All", "In Progress", "Completed"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setSection(tab)}
//                 className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
//                   section === tab ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-indigo-600"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* --- DESKTOP TABLE VIEW (Visible on md and up) --- */}
//         <div className="hidden md:block bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-slate-50/50 dark:bg-gray-800/40 border-b border-slate-100 dark:border-gray-800 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
//                 <th className="px-8 py-6">Student & ID</th>
//                 <th className="px-8 py-6">Location</th>
//                 <th className="px-8 py-6">Progress</th>
//                 <th className="px-8 py-6 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50 dark:divide-gray-800">
//               {filteredStudents.map((s) => (
//                 <tr key={s.id} className="group hover:bg-slate-50/50 dark:hover:bg-gray-800/20 transition-all cursor-pointer" onClick={() => setSelectedStudent(s)}>
//                   <td className="px-8 py-5 flex items-center gap-4">
//                     <div className="size-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">{s.name.charAt(0)}</div>
//                     <div>
//                       <p className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</p>
//                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{s.id}</p>
//                     </div>
//                   </td>
//                   <td className="px-8 py-5">
//                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
//                       <MapPin size={12} className="text-teal-500" /> {s.location}
//                     </div>
//                   </td>
//                   <td className="px-8 py-5">
//                     <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//                       <div className={`h-full rounded-full transition-all ${s.progress === 100 ? 'bg-teal-500' : 'bg-indigo-600'}`} style={{ width: `${s.progress}%` }} />
//                     </div>
//                     <span className="text-[9px] font-black text-slate-400 uppercase mt-1 inline-block">{s.progress}% Complete</span>
//                   </td>
//                   <td className="px-8 py-5 text-right">
//                     <button className="opacity-0 group-hover:opacity-100 p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
//                       <Eye size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* --- MOBILE CARD VIEW (Visible on small screens only) --- */}
//         <div className="grid grid-cols-1 gap-4 md:hidden">
//           {filteredStudents.map((s) => (
//             <div 
//               key={s.id} 
//               onClick={() => setSelectedStudent(s)}
//               className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md active:scale-[0.98] transition-transform"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className="flex items-center gap-3">
//                   <div className="size-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">{s.name.charAt(0)}</div>
//                   <div>
//                     <p className="text-sm font-bold text-slate-800 dark:text-white">{s.name}</p>
//                     <p className="text-[10px] font-black text-slate-400 uppercase">{s.id}</p>
//                   </div>
//                 </div>
//                 <div className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase ${s.progress === 100 ? 'bg-teal-50 text-teal-600' : 'bg-indigo-50 text-indigo-600'}`}>
//                   {s.progress === 100 ? 'Completed' : 'In Progress'}
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
//                   <MapPin size={12} className="text-teal-500" /> {s.location}
//                 </div>
                
//                 <div className="space-y-1">
//                   <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
//                     <span>Course Progress</span>
//                     <span>{s.progress}%</span>
//                   </div>
//                   <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//                     <div className={`h-full rounded-full ${s.progress === 100 ? 'bg-teal-500' : 'bg-indigo-600'}`} style={{ width: `${s.progress}%` }} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Pagination - Simplified for mobile if needed */}
//         <div className="p-4 md:p-8 flex justify-center border-t border-slate-100 dark:border-slate-800">
//           <Pagination currentPage={page} totalItems={filteredStudents.length} itemsPerPage={10} onPageChange={setPage} />
//         </div>
//       </main>

//       {selectedStudent && (
//         <InstructorStudentDetail student={selectedStudent} onClose={() => setSelectedStudent(null)} />
//       )}
//     </div>
//   );
// };

// export default MyStudents;





// import React, { useState } from "react";
// import SearchBar from "../../components/SearchBar";
// import Pagination from "../../components/Pagination";
// import InstructorStudentDetail from "../../components/instructor/InstructorStudentDetail";
// import { Eye, MapPin, Loader2, AlertCircle, UserCheck, Phone, Mail } from "lucide-react";

// // Dummy data for students
// const dummyStudents = [
//   {
//     id: 1,
//     name: "James Harrison",
//     email: "james.harrison@email.com",
//     phone: "(709) 555-0123",
//     studentId: "STU-001",
//     package: "Full GDL Bundle",
//     progress: 65,
//     status: "Active",
//     location: "St. John's",
//     address: "123 Main Street",
//     city: "St. John's"
//   },
//   {
//     id: 2,
//     name: "Sarah Williams",
//     email: "sarah.williams@email.com",
//     phone: "(709) 555-0456",
//     studentId: "STU-002",
//     package: "Standard Package",
//     progress: 100,
//     status: "Completed",
//     location: "Burin",
//     address: "45 Harbour Drive",
//     city: "Burin"
//   },
//   {
//     id: 3,
//     name: "Marc-André Leclaire",
//     email: "marc.leclaire@email.com",
//     phone: "(709) 555-0789",
//     studentId: "STU-003",
//     package: "Premium Package",
//     progress: 30,
//     status: "Active",
//     location: "Grand Falls",
//     address: "78 Churchill Road",
//     city: "Grand Falls"
//   },
//   {
//     id: 4,
//     name: "Emily Chen",
//     email: "emily.chen@email.com",
//     phone: "(709) 555-0321",
//     studentId: "STU-004",
//     package: "Basic Starter",
//     progress: 45,
//     status: "Active",
//     location: "Marystown",
//     address: "12 Park Avenue",
//     city: "Marystown"
//   },
//   {
//     id: 5,
//     name: "David Miller",
//     email: "david.miller@email.com",
//     phone: "(709) 555-0654",
//     studentId: "STU-005",
//     package: "Full GDL Bundle",
//     progress: 85,
//     status: "Active",
//     location: "Mount Pearl",
//     address: "90 Commonwealth Ave",
//     city: "Mount Pearl"
//   },
//   {
//     id: 6,
//     name: "Sophia Rodriguez",
//     email: "sophia.rodriguez@email.com",
//     phone: "(709) 555-0987",
//     studentId: "STU-006",
//     package: "Advanced City",
//     progress: 20,
//     status: "Active",
//     location: "St. John's",
//     address: "34 Water Street",
//     city: "St. John's"
//   },
//   {
//     id: 7,
//     name: "Liam Murphy",
//     email: "liam.murphy@email.com",
//     phone: "(709) 555-0214",
//     studentId: "STU-007",
//     package: "Standard Package",
//     progress: 100,
//     status: "Completed",
//     location: "Burin",
//     address: "67 Marine Drive",
//     city: "Burin"
//   },
//   {
//     id: 8,
//     name: "Olivia Tremblay",
//     email: "olivia.tremblay@email.com",
//     phone: "(709) 555-0543",
//     studentId: "STU-008",
//     package: "Premium Package",
//     progress: 55,
//     status: "Active",
//     location: "Grand Falls",
//     address: "23 Riverside Blvd",
//     city: "Grand Falls"
//   },
//   {
//     id: 9,
//     name: "Noah Bélanger",
//     email: "noah.belanger@email.com",
//     phone: "(709) 555-0876",
//     studentId: "STU-009",
//     package: "Full GDL Bundle",
//     progress: 12,
//     status: "Active",
//     location: "Marystown",
//     address: "8 Sunset Lane",
//     city: "Marystown"
//   },
//   {
//     id: 10,
//     name: "Emma Walsh",
//     email: "emma.walsh@email.com",
//     phone: "(709) 555-0109",
//     studentId: "STU-010",
//     package: "Basic Starter",
//     progress: 92,
//     status: "Active",
//     location: "Mount Pearl",
//     address: "56 Ridge Road",
//     city: "Mount Pearl"
//   }
// ];

// const MyStudents = () => {
//   const [query, setQuery] = useState("");
//   const [section, setSection] = useState("All");
//   const [page, setPage] = useState(1);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [students] = useState(dummyStudents);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const itemsPerPage = 10;

//   // Filter students based on search and section
//   const filteredStudents = students.filter(s => {
//     const matchesSearch = s.name?.toLowerCase().includes(query.toLowerCase()) ||
//                          s.studentId?.toLowerCase().includes(query.toLowerCase()) ||
//                          (s.email && s.email.toLowerCase().includes(query.toLowerCase()));
//     if (section === "Completed") return matchesSearch && s.progress === 100;
//     if (section === "In Progress") return matchesSearch && s.progress < 100;
//     return matchesSearch;
//   });

//   // Pagination
//   const paginatedStudents = filteredStudents.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   // Calculate stats
//   const totalStudents = students.length;
//   const activeCount = students.filter(s => s.progress < 100).length;
//   const completedCount = students.filter(s => s.progress === 100).length;

//   if (loading) {
//     return (
//       <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen">
//         <main className="p-4 md:p-10 max-w-7xl mx-auto">
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader2 className="animate-spin text-teal-600 mb-4" size={48} />
//             <p className="text-sm font-['DM_Sans'] font-medium text-gray-600 dark:text-gray-300">Loading your students...</p>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen">
//         <main className="p-4 md:p-10 max-w-7xl mx-auto">
//           <div className="flex flex-col items-center justify-center py-20">
//             <AlertCircle className="text-red-500 mb-4" size={48} />
//             <p className="text-sm font-['DM_Sans'] font-medium text-red-600 mb-4">{error}</p>
//             <button 
//               onClick={() => window.location.reload()}
//               className="px-6 py-2 bg-teal-600 text-white rounded-lg text-xs font-['DM_Mono'] font-bold hover:bg-teal-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen">
//       <main className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
        
//         {/* Header */}
//         <div>
//           <h1 className="text-xl md:text-2xl font-['Sora'] font-bold tracking-tight text-slate-800 dark:text-white">
//             My <span className="text-teal-600">Students</span>
//           </h1>
//           <p className="text-[0.65rem] font-['DM_Mono'] text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
//             Manage and track your assigned students
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
//             <p className="text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Total Students</p>
//             <p className="text-2xl font-['Sora'] font-bold text-teal-600">{totalStudents}</p>
//           </div>
//           <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
//             <p className="text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Active</p>
//             <p className="text-2xl font-['Sora'] font-bold text-emerald-600">{activeCount}</p>
//           </div>
//           <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
//             <p className="text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">Completed</p>
//             <p className="text-2xl font-['Sora'] font-bold text-blue-600">{completedCount}</p>
//           </div>
//         </div>
        
//         {/* Filter Header */}
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-4 md:gap-6">
//           <div className="w-full lg:max-w-md">
//             <SearchBar onSearch={(val) => {
//               setQuery(val);
//               setPage(1);
//             }} placeholder="Search by name, ID or email..." />
//           </div>
          
//           <div className="flex w-full md:w-auto overflow-x-auto no-scrollbar bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
//             {["All", "In Progress", "Completed"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => {
//                   setSection(tab);
//                   setPage(1);
//                 }}
//                 className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-[9px] md:text-[10px] font-['DM_Mono'] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
//                   section === tab ? "bg-teal-600 text-white shadow-sm" : "text-slate-500 hover:text-teal-600"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Empty State */}
//         {students.length === 0 && (
//           <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
//             <UserCheck size={48} className="mx-auto text-slate-400 mb-4" />
//             <p className="text-sm font-['DM_Sans'] font-medium text-slate-500">No students assigned to you yet</p>
//           </div>
//         )}

//         {/* Desktop Table View */}
//         {students.length > 0 && (
//           <>
//             <div className="hidden md:block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left min-w-[600px]">
//                   <thead>
//                     <tr className="bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
//                       <th className="px-6 py-4 text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Student & ID</th>
//                       <th className="px-6 py-4 text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Package</th>
//                       <th className="px-6 py-4 text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Contact</th>
//                       <th className="px-6 py-4 text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider text-right">Actions</th>
//                      </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                     {paginatedStudents.map((s) => (
//                       <tr 
//                         key={s.id} 
//                         className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all cursor-pointer" 
//                         onClick={() => setSelectedStudent(s)}
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center font-['DM_Mono'] font-bold text-sm flex-shrink-0">
//                               {s.name?.charAt(0) || '?'}
//                             </div>
//                             <div>
//                               <p className="text-sm font-['DM_Sans'] font-semibold text-slate-800 dark:text-white">{s.name}</p>
//                               <p className="text-[9px] font-['DM_Mono'] font-bold text-slate-400 uppercase tracking-tighter">{s.studentId}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className="text-xs font-['DM_Sans'] font-medium text-slate-600 dark:text-slate-400">{s.package}</span>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="text-xs space-y-0.5">
//                             <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
//                               <Mail size={12} className="text-teal-500" /> {s.email}
//                             </p>
//                             <p className="text-slate-500 dark:text-slate-500 flex items-center gap-1">
//                               <Phone size={12} className="text-teal-500" /> {s.phone}
//                             </p>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <button 
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setSelectedStudent(s);
//                             }}
//                             className="opacity-0 group-hover:opacity-100 p-2 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-all duration-200"
//                             title="View Student Details"
//                           >
//                             <Eye size={18} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Mobile Card View */}
//             <div className="grid grid-cols-1 gap-3 md:hidden">
//               {paginatedStudents.map((s) => (
//                 <div 
//                   key={s.id} 
//                   onClick={() => setSelectedStudent(s)}
//                   className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center font-['DM_Mono'] font-bold text-sm">
//                         {s.name?.charAt(0) || '?'}
//                       </div>
//                       <div>
//                         <p className="text-sm font-['DM_Sans'] font-semibold text-slate-800 dark:text-white">{s.name}</p>
//                         <p className="text-[10px] font-['DM_Mono'] font-bold text-slate-400 uppercase">{s.studentId}</p>
//                       </div>
//                     </div>
//                     <span className={`px-2 py-0.5 rounded-lg text-[8px] font-['DM_Mono'] font-bold uppercase ${
//                       s.progress === 100 
//                         ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
//                         : 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
//                     }`}>
//                       {s.progress === 100 ? 'Completed' : 'Active'}
//                     </span>
//                   </div>

//                   <div className="space-y-2">
//                     <div className="flex justify-between text-[10px]">
//                       <span className="font-['DM_Mono'] font-medium text-slate-500">Package:</span>
//                       <span className="font-['DM_Sans'] font-semibold text-teal-600">{s.package}</span>
//                     </div>
                    
//                     <div className="flex items-center gap-1 text-[10px] text-slate-500">
//                       <Mail size={12} className="text-teal-500 flex-shrink-0" />
//                       <span className="truncate">{s.email}</span>
//                     </div>
                    
//                     <div className="flex items-center gap-1 text-[10px] text-slate-500">
//                       <Phone size={12} className="text-teal-500 flex-shrink-0" />
//                       <span>{s.phone}</span>
//                     </div>
                    
//                     {/* Progress Bar */}
//                     <div className="mt-2">
//                       <div className="flex justify-between text-[8px] font-['DM_Mono'] font-bold text-slate-400 mb-1">
//                         <span>Progress</span>
//                         <span>{s.progress}%</span>
//                       </div>
//                       <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
//                         <div 
//                           className={`h-full rounded-full ${s.progress === 100 ? 'bg-blue-500' : 'bg-teal-500'}`} 
//                           style={{ width: `${s.progress}%` }} 
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {filteredStudents.length > itemsPerPage && (
//               <div className="p-4 flex justify-center border-t border-slate-100 dark:border-slate-800">
//                 <Pagination 
//                   currentPage={page} 
//                   totalItems={filteredStudents.length} 
//                   itemsPerPage={itemsPerPage} 
//                   onPageChange={setPage} 
//                 />
//               </div>
//             )}
//           </>
//         )}
//       </main>

//       {selectedStudent && (
//         <InstructorStudentDetail 
//           student={selectedStudent} 
//           onClose={() => setSelectedStudent(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default MyStudents;























import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import InstructorStudentDetail from "../../components/instructor/InstructorStudentDetail";
import { ScanEye, MapPin, Loader2, AlertCircle, UserCheck, Phone, Mail, Search } from "lucide-react";

// Dummy data for students
const dummyStudents = [
  {
    id: 1,
    name: "James Harrison",
    email: "james.harrison@email.com",
    phone: "(709) 555-0123",
    studentId: "STU-001",
    package: "Full GDL Bundle",
    progress: 65,
    status: "Active",
    location: "St. John's",
    address: "123 Main Street",
    city: "St. John's"
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    phone: "(709) 555-0456",
    studentId: "STU-002",
    package: "Standard Package",
    progress: 100,
    status: "Completed",
    location: "Burin",
    address: "45 Harbour Drive",
    city: "Burin"
  },
  {
    id: 3,
    name: "Marc-André Leclaire",
    email: "marc.leclaire@email.com",
    phone: "(709) 555-0789",
    studentId: "STU-003",
    package: "Premium Package",
    progress: 30,
    status: "Active",
    location: "Grand Falls",
    address: "78 Churchill Road",
    city: "Grand Falls"
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "(709) 555-0321",
    studentId: "STU-004",
    package: "Basic Starter",
    progress: 45,
    status: "Active",
    location: "Marystown",
    address: "12 Park Avenue",
    city: "Marystown"
  },
  {
    id: 5,
    name: "David Miller",
    email: "david.miller@email.com",
    phone: "(709) 555-0654",
    studentId: "STU-005",
    package: "Full GDL Bundle",
    progress: 85,
    status: "Active",
    location: "Mount Pearl",
    address: "90 Commonwealth Ave",
    city: "Mount Pearl"
  },
  {
    id: 6,
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@email.com",
    phone: "(709) 555-0987",
    studentId: "STU-006",
    package: "Advanced City",
    progress: 20,
    status: "Active",
    location: "St. John's",
    address: "34 Water Street",
    city: "St. John's"
  },
  {
    id: 7,
    name: "Liam Murphy",
    email: "liam.murphy@email.com",
    phone: "(709) 555-0214",
    studentId: "STU-007",
    package: "Standard Package",
    progress: 100,
    status: "Completed",
    location: "Burin",
    address: "67 Marine Drive",
    city: "Burin"
  },
  {
    id: 8,
    name: "Olivia Tremblay",
    email: "olivia.tremblay@email.com",
    phone: "(709) 555-0543",
    studentId: "STU-008",
    package: "Premium Package",
    progress: 55,
    status: "Active",
    location: "Grand Falls",
    address: "23 Riverside Blvd",
    city: "Grand Falls"
  },
  {
    id: 9,
    name: "Noah Bélanger",
    email: "noah.belanger@email.com",
    phone: "(709) 555-0876",
    studentId: "STU-009",
    package: "Full GDL Bundle",
    progress: 12,
    status: "Active",
    location: "Marystown",
    address: "8 Sunset Lane",
    city: "Marystown"
  },
  {
    id: 10,
    name: "Emma Walsh",
    email: "emma.walsh@email.com",
    phone: "(709) 555-0109",
    studentId: "STU-010",
    package: "Basic Starter",
    progress: 92,
    status: "Active",
    location: "Mount Pearl",
    address: "56 Ridge Road",
    city: "Mount Pearl"
  }
];

const MyStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students] = useState(dummyStudents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const itemsPerPage = 8;

  // Filter students based on search and status
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (statusFilter === "Completed") return matchesSearch && s.progress === 100;
    if (statusFilter === "In Progress") return matchesSearch && s.progress < 100;
    return matchesSearch;
  });

  // Pagination
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Calculate stats
  const totalStudents = students.length;
  const activeCount = students.filter(s => s.progress < 100).length;
  const completedCount = students.filter(s => s.progress === 100).length;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={48} />
          <p className="text-sm font-mono font-bold uppercase tracking-widest text-slate-500">Loading your students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
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
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      
      {/* HEADER */}
      <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
              My <span className="text-teal-600 dark:text-teal-400">Students</span>
            </h1>
            <p className="text-[0.65rem] font-sora text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
              Manage and track your assigned students
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-6">
          <div className="grid grid-cols-2 md:flex gap-2 flex-1">
            
            {/* Status Filter */}
            <div className="group relative">
              <select 
                value={statusFilter} 
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
              >
                <option>All</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="group relative hidden md:block">
              <select 
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
              >
                <option>All Locations</option>
                <option>Burin</option>
                <option>St. John's</option>
                <option>Grand Falls</option>
                <option>Marystown</option>
                <option>Mount Pearl</option>
              </select>
            </div>
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search by name, ID or email..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-1">Total Students</p>
            <p className="text-xl font-semibold text-teal-600">{totalStudents}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-1">In Progress</p>
            <p className="text-xl font-semibold text-emerald-600">{activeCount}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-1">Completed</p>
            <p className="text-xl font-semibold text-blue-600">{completedCount}</p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 md:px-8 pb-8 overflow-y-auto custom-scrollbar">
        
        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-12 text-center border border-slate-200 dark:border-slate-800">
            <UserCheck size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-sm font-sora text-slate-500">No students found matching your filters</p>
          </div>
        )}

        {/* Mobile Card View */}
        {filteredStudents.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {paginatedStudents.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => setSelectedStudent(s)}
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-all active:scale-[0.98] cursor-pointer"
                >
                  {s.progress < 100 && <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />}
                  {s.progress === 100 && <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />}
                  
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-[0.85rem] font-medium text-slate-800 dark:text-white">{s.name}</h3>
                      <p className="text-[0.6rem] font-sora text-slate-400 uppercase tracking-tighter">ID: {s.studentId}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[0.6rem] font-sora font-semibold uppercase tracking-wider ${
                      s.progress === 100 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                        : 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
                    }`}>
                      {s.progress === 100 ? 'Completed' : 'Active'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[0.7rem] text-slate-600 dark:text-slate-400">
                      <Mail size={12} className="text-teal-500" /> {s.email}
                    </div>
                    <div className="flex items-center gap-2 text-[0.7rem] text-slate-600 dark:text-slate-400">
                      <Phone size={12} className="text-teal-500" /> {s.phone}
                    </div>
                    <div className="flex items-center gap-2 text-[0.7rem] text-slate-600 dark:text-slate-400">
                      <MapPin size={12} className="text-teal-500" /> {s.location}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[0.55rem] font-mono text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{s.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${s.progress === 100 ? 'bg-blue-500' : 'bg-teal-500'}`} 
                        style={{ width: `${s.progress}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(s);
                      }}
                      className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <ScanEye size={14} /> View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                  <tr className="text-[0.75rem] font-sora font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="px-5 py-3">Student & ID</th>
                    <th className="px-5 py-3">Package</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Progress</th>
                    <th className="px-5 py-3 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginatedStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                            {s.name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <div className="text-[0.8rem] font-medium text-slate-800 dark:text-white leading-tight">
                              {s.name}
                            </div>
                            <div className="text-[0.6rem] font-sora text-slate-400 mt-0.5">ID: {s.studentId}</div>
                          </div>
                        </div>
                       </td>
                      <td className="px-5 py-3">
                        <span className="text-[0.7rem] text-slate-600 dark:text-slate-300">{s.package}</span>
                       </td>
                      <td className="px-5 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[0.65rem] text-slate-500">
                            <Mail size={12} className="text-teal-500" />
                            <span className="truncate max-w-[150px]">{s.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[0.65rem] text-slate-500">
                            <Phone size={12} className="text-teal-500" />
                            <span>{s.phone}</span>
                          </div>
                        </div>
                       </td>
                      <td className="px-5 py-3">
                        <div className="w-24">
                          <div className="flex justify-between text-[0.55rem] font-mono text-slate-400 mb-0.5">
                            <span>Progress</span>
                            <span>{s.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${s.progress === 100 ? 'bg-blue-500' : 'bg-teal-500'}`} 
                              style={{ width: `${s.progress}%` }} 
                            />
                          </div>
                        </div>
                       </td>
                      <td className="px-5 py-3 text-right">
                        <button 
                          onClick={() => setSelectedStudent(s)}
                          className="group relative p-1.5 text-slate-400 dark:text-slate-500 rounded-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 active:scale-95"
                          title="View Student Details"
                        >
                          <ScanEye size={18} className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                        </button>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {paginatedStudents.length === 0 && (
                <div className="py-16 text-center">
                  <p className="text-[0.7rem] font-sora text-slate-400">No students found matching your filters.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredStudents.length > itemsPerPage && (
              <div className="flex justify-center pt-6">
                <Pagination 
                  currentPage={page} 
                  totalItems={filteredStudents.length} 
                  itemsPerPage={itemsPerPage} 
                  onPageChange={handlePageChange} 
                />
              </div>
            )}
          </>
        )}
      </div>

      {selectedStudent && (
        <InstructorStudentDetail 
          student={selectedStudent} 
          onClose={() => setSelectedStudent(null)} 
        />
      )}
    </div>
  );
};

export default MyStudents;