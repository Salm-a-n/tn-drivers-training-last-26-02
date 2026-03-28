// import React, { useState } from 'react';
// import InstructorDetailModal from '../components/InstructorDetailModal';
// import InstructorRegistrationModal from '../components/InstructorRegistrationModal';
// import { 
//   Search, BadgeCheck, AlertTriangle, Eye, RefreshCcw, Car, 
//   Download, Plus, X, Phone, User, Ban, CheckCircle
// } from 'lucide-react';

// const Instructors = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locationFilter, setLocationFilter] = useState('All Locations');
//   const [selectedInstructor, setSelectedInstructor] = useState(null);
//   const [isRegModalOpen, setIsRegModalOpen] = useState(false);

//   const [instructors, setInstructors] = useState([
//     { 
//       id: "INST-9821", 
//       name: "Jean Dupont", 
//       contact: "709-555-0123", 
//       email: "jean.d@example.com",
//       dob: "1985-06-12",
//       address: "123 Maple Leaf Ave, Toronto, ON",
//       license: "D1234-56789-01234",
//       expiry: "2026-03-10", 
//       vehicle: "Toyota Corolla", 
//       plate: "V-882", 
//       success: 92, 
//       location: "Burin",
//       status: "Active",
//       students: [
//         { id: "STU-101", name: "Alice Cooper", progress: "60%" },
//         { id: "STU-102", name: "Bob Marley", progress: "20%" }
//       ]
//     },
//     { 
//       id: "INST-1122", 
//       name: "Marc Leblanc", 
//       contact: "709-555-9988", 
//       email: "m.leblanc@example.com",
//       dob: "1982-11-05",
//       address: "77 Water St, Burin, NL",
//       license: "L5544-33221-11223",
//       expiry: "2025-12-30", 
//       vehicle: "Hyundai Elantra", 
//       plate: "V-901", 
//       success: 95, 
//       location: "Burin",
//       status: "Active",
//       students: [{ id: "STU-105", name: "Kevin Hart", progress: "10%" }]
//     },
//     { 
//       id: "INST-4432", 
//       name: "Sarah Miller", 
//       contact: "709-555-4432", 
//       email: "s.miller@example.com",
//       dob: "1990-02-20",
//       address: "456 Oak St, St. John's, NL",
//       license: "S9876-54321-09876",
//       expiry: "2026-05-20", 
//       vehicle: "Honda Civic", 
//       plate: "V-104", 
//       success: 88, 
//       location: "St. John’s / Mount Pearl",
//       status: "Blocked",
//       students: []
//     },
//     { 
//       id: "INST-5566", 
//       name: "David Smith", 
//       contact: "709-555-6677", 
//       email: "d.smith@example.com",
//       dob: "1988-08-15",
//       address: "12 Pine Rd, Grand Falls, NL",
//       license: "K1122-33445-55667",
//       expiry: "2027-01-10", 
//       vehicle: "Ford Focus", 
//       plate: "V-302", 
//       success: 90, 
//       location: "Grand Falls",
//       status: "Active",
//       students: [{ id: "STU-109", name: "Emma Watson", progress: "45%" }]
//     }
//   ]);

//   const handleAddInstructor = (newIns) => {
//     const formattedInstructor = {
//       ...newIns,
//       id: `INST-${Math.floor(1000 + Math.random() * 9000)}`,
//       success: 0, 
//       status: "Active",
//       students: []
//     };
//     setInstructors((prev) => [...prev, formattedInstructor]);
//   };

//   const handleUpdateInstructor = (id, updatedFields) => {
//     setInstructors(prev => prev.map(ins => 
//       ins.id === id ? { ...ins, ...updatedFields } : ins
//     ));
//     if (selectedInstructor && selectedInstructor.id === id) {
//       setSelectedInstructor(prev => ({ ...prev, ...updatedFields }));
//     }
//   };

//   const toggleBlockStatus = (id) => {
//     setInstructors(prev => prev.map(ins => 
//       ins.id === id ? { ...ins, status: ins.status === "Blocked" ? "Active" : "Blocked" } : ins
//     ));
//   };

//   const filteredInstructors = instructors.filter(ins => {
//     const matchesLocation = locationFilter === 'All Locations' || ins.location === locationFilter;
//     const matchesSearch = ins.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           ins.id.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesLocation && matchesSearch;
//   });

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-slate-200 transition-colors duration-300">
      
//       <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-4 md:px-8 py-4 sticky top-0 z-20 transition-all">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 max-w-350 mx-auto">
//           <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
//             <div className="relative w-full md:w-72">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
//               <input 
//                 className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal/50 dark:text-white" 
//                 placeholder="Search name or ID..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <select 
//               value={locationFilter} 
//               onChange={(e) => setLocationFilter(e.target.value)}
//               className="w-full md:w-48 px-4 py-2.5 bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none dark:text-white appearance-none cursor-pointer"
//             >
//               <option>All Locations</option>
//               <option value="Burin">Burin</option>
//               <option value="Grand Falls">Grand Falls</option>
//               <option value="Marystown">Marystown</option>
//               <option value="St. John’s / Mount Pearl">St. John’s / Mount Pearl</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-3 w-full lg:w-auto">
//             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase transition-all hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-transparent md:border-slate-200 md:dark:border-slate-800">
//               <Download size={16} /> <span className="hidden sm:inline">Export</span>
//             </button>
//             <button 
//               onClick={() => setIsRegModalOpen(true)} 
//               className="flex-2 md:flex-none flex items-center justify-center gap-2 bg-teal px-6 py-2.5 text-white rounded-xl shadow-lg shadow-teal/20 transition-all active:scale-95 text-sm font-bold whitespace-nowrap"
//             >
//               <Plus size={20} /> New Instructor
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="p-4 md:p-8 space-y-6 max-w-350 mx-auto w-full">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//           <div>
//             <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Instructors Management</h1>
//             <p className="text-xs md:text-sm text-slate-500">Manage performance, status, and students reassignments.</p>
//           </div>
//         </div>

//         <section className="space-y-4">
//           {/* Card View for Mobile (Always shows actions) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
//             {filteredInstructors.map((ins) => (
//               <div key={ins.id} className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-4">
//                 <div className="flex justify-between items-start">
//                   <div className="flex items-center gap-3">
//                     <div className={`size-12 rounded-2xl flex items-center justify-center font-bold text-white text-lg ${ins.status === 'Blocked' ? 'bg-slate-400' : 'bg-teal'}`}>
//                       {ins.name[0]}
//                     </div>
//                     <div>
//                       <h3 className="font-bold dark:text-white text-sm">{ins.name}</h3>
//                       <p className="text-[10px] text-slate-500 uppercase font-medium">{ins.id} • {ins.location}</p>
//                     </div>
//                   </div>
//                   <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
//                     ins.status === "Active" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10" : "bg-rose-100 text-rose-600 dark:bg-rose-500/10"
//                   }`}>
//                     {ins.status}
//                   </span>
//                 </div>
                
//                 <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
//                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success: {ins.success}%</span>
//                   <div className="flex gap-2">
//                     <button onClick={() => setSelectedInstructor(ins)} className="p-2 bg-sky-100 dark:bg-sky-500/10 text-sky-600 rounded-lg"><Eye size={16} /></button>
//                     <button onClick={() => toggleBlockStatus(ins.id)} className={`p-2 rounded-lg ${ins.status === 'Blocked' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
//                       {ins.status === 'Blocked' ? <CheckCircle size={16} /> : <Ban size={16} />}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Table for Desktop (Hover effect logic) */}
//           <div className="hidden lg:block bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead className="bg-slate-50 dark:bg-[#1f2937] text-[10px] font-black uppercase tracking-widest text-slate-500">
//                   <tr>
//                     <th className="px-6 py-4">Instructor Details</th>
//                     <th className="px-6 py-4">Status</th>
//                     <th className="px-6 py-4">Success Rate</th>
//                     <th className="px-6 py-4 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
//                   {filteredInstructors.map((ins) => (
//                     // Added 'group' class to the row for hover logic
//                     <tr key={ins.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-3">
//                           <div className={`size-10 rounded-full flex items-center justify-center font-bold text-white text-sm ${ins.status === 'Blocked' ? 'bg-slate-400' : 'bg-teal'}`}>
//                             {ins.name[0]}
//                           </div>
//                           <div>
//                             <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{ins.name}</p>
//                             <p className="text-[10px] text-slate-500 mt-0.5">ID: {ins.id} • {ins.location}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5">
//                         <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
//                           ins.status === "Active" ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400"
//                         }`}>
//                           {ins.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-white">
//                           {ins.success}%
//                         </div>
//                       </td>
//                       <td className="px-6 py-5 text-right">
//                         {/* Added transition and opacity logic for the hover effect */}
//                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
//                           <button 
//                             onClick={() => setSelectedInstructor(ins)} 
//                             className="p-2 bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-200"
//                             title="View"
//                           >
//                             <Eye size={16} />
//                           </button>
//                           <button 
//                             onClick={() => toggleBlockStatus(ins.id)} 
//                             className={`p-2 rounded-lg ${ins.status === 'Blocked' ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'}`}
//                             title={ins.status === 'Blocked' ? 'Unblock' : 'Block'}
//                           >
//                             {ins.status === 'Blocked' ? <CheckCircle size={16} /> : <Ban size={16} />}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </section>
//       </main>

//       <InstructorRegistrationModal 
//         isOpen={isRegModalOpen} 
//         onClose={() => setIsRegModalOpen(false)} 
//         onAdd={handleAddInstructor}
//       />
      
//       {selectedInstructor && (
//         <InstructorDetailModal 
//           instructor={selectedInstructor} 
//           onClose={() => setSelectedInstructor(null)} 
//           allInstructors={instructors.filter(i => i.id !== selectedInstructor.id)}
//           onUpdate={handleUpdateInstructor}
//         />
//       )}
//     </div>
//   );
// };

// export default Instructors;




// import React, { useState } from 'react';
// import InstructorDetailModal from '../components/InstructorDetailModal';
// import InstructorRegistrationModal from '../components/InstructorRegistrationModal';
// import { 
//   Search, Eye, Download, Plus
// } from 'lucide-react';

// const Instructors = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locationFilter, setLocationFilter] = useState('All Locations');
//   const [selectedInstructor, setSelectedInstructor] = useState(null);
//   const [isRegModalOpen, setIsRegModalOpen] = useState(false);

//   const [instructors, setInstructors] = useState([
//     { 
//       id: "INST-9821", 
//       name: "Jean Dupont", 
//       contact: "709-555-0123", 
//       email: "jean.d@example.com",
//       dob: "1985-06-12",
//       address: "123 Maple Leaf Ave, Toronto, ON",
//       license: "D1234-56789-01234",
//       expiry: "2026-03-10", 
//       vehicle: "Toyota Corolla", 
//       plate: "V-882", 
//       success: 92, 
//       location: "Burin",
//       status: "Active",
//       students: [
//         { id: "STU-101", name: "Alice Cooper", progress: "60%" },
//         { id: "STU-102", name: "Bob Marley", progress: "20%" }
//       ]
//     },
//     { 
//       id: "INST-1122", 
//       name: "Marc Leblanc", 
//       contact: "709-555-9988", 
//       email: "m.leblanc@example.com",
//       dob: "1982-11-05",
//       address: "77 Water St, Burin, NL",
//       license: "L5544-33221-11223",
//       expiry: "2025-12-30", 
//       vehicle: "Hyundai Elantra", 
//       plate: "V-901", 
//       success: 95, 
//       location: "Burin",
//       status: "Active",
//       students: [{ id: "STU-105", name: "Kevin Hart", progress: "10%" }]
//     },
//     { 
//       id: "INST-4432", 
//       name: "Sarah Miller", 
//       contact: "709-555-4432", 
//       email: "s.miller@example.com",
//       dob: "1990-02-20",
//       address: "456 Oak St, St. John's, NL",
//       license: "S9876-54321-09876",
//       expiry: "2026-05-20", 
//       vehicle: "Honda Civic", 
//       plate: "V-104", 
//       success: 88, 
//       location: "St. John’s / Mount Pearl",
//       status: "Blocked",
//       students: []
//     },
//     { 
//       id: "INST-5566", 
//       name: "David Smith", 
//       contact: "709-555-6677", 
//       email: "d.smith@example.com",
//       dob: "1988-08-15",
//       address: "12 Pine Rd, Grand Falls, NL",
//       license: "K1122-33445-55667",
//       expiry: "2027-01-10", 
//       vehicle: "Ford Focus", 
//       plate: "V-302", 
//       success: 90, 
//       location: "Grand Falls",
//       status: "Active",
//       students: [{ id: "STU-109", name: "Emma Watson", progress: "45%" }]
//     }
//   ]);

//   const handleAddInstructor = (newIns) => {
//     const formattedInstructor = {
//       ...newIns,
//       id: `INST-${Math.floor(1000 + Math.random() * 9000)}`,
//       success: 0, 
//       status: "Active",
//       students: []
//     };
//     setInstructors((prev) => [...prev, formattedInstructor]);
//   };

//   const handleUpdateInstructor = (id, updatedFields) => {
//     setInstructors(prev => prev.map(ins => 
//       ins.id === id ? { ...ins, ...updatedFields } : ins
//     ));
//     if (selectedInstructor && selectedInstructor.id === id) {
//       setSelectedInstructor(prev => ({ ...prev, ...updatedFields }));
//     }
//   };

//   const handleToggleBlockStatus = (id) => {
//     setInstructors(prev => prev.map(ins => 
//       ins.id === id ? { ...ins, status: ins.status === "Blocked" ? "Active" : "Blocked" } : ins
//     ));
//   };

//   const filteredInstructors = instructors.filter(ins => {
//     const matchesLocation = locationFilter === 'All Locations' || ins.location === locationFilter;
//     const matchesSearch = ins.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           ins.id.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesLocation && matchesSearch;
//   });

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 transition-colors duration-300 font-['Sora','Inter',system-ui]">
      
//       {/* HEADER */}
//       <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 md:px-8 py-4 sticky top-0 z-20 transition-all">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row gap-3 w-full lg:w-auto">
//             <div className="relative w-full md:w-72">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
//               <input 
//                 className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[0.7rem] font-mono outline-none focus:ring-1 focus:ring-teal-500 dark:text-slate-200 placeholder:text-slate-400" 
//                 placeholder="Search name or ID..." 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <select 
//               value={locationFilter} 
//               onChange={(e) => setLocationFilter(e.target.value)}
//               className="w-full md:w-44 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[0.7rem] font-mono outline-none dark:text-slate-200 appearance-none cursor-pointer focus:ring-1 focus:ring-teal-500"
//             >
//               <option>All Locations</option>
//               <option value="Burin">Burin</option>
//               <option value="Grand Falls">Grand Falls</option>
//               <option value="Marystown">Marystown</option>
//               <option value="St. John’s / Mount Pearl">St. John’s / Mount Pearl</option>
//             </select>
//           </div>

//           <div className="flex items-center gap-2 w-full lg:w-auto">
//             <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-slate-600 dark:text-slate-400 font-medium text-[0.7rem] uppercase tracking-wider transition-all hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
//               <Download size={14} /> Export
//             </button>
//             <button 
//               onClick={() => setIsRegModalOpen(true)} 
//               className="flex-1 md:flex-none flex items-center justify-center gap-1.5 bg-teal-500 hover:bg-teal-600 px-5 py-2 text-white rounded-lg shadow-sm transition-all active:scale-95 text-[0.7rem] font-semibold whitespace-nowrap"
//             >
//               <Plus size={14} /> New Instructor
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main className="p-4 md:p-8 space-y-5 max-w-7xl mx-auto w-full">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//           <div>
//            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
//               Instructor <span className="text-teal-600 dark:text-teal-400">Management</span>
//             </h1>
//             <p className="text-[0.8rem] font-soro text-slate-500 mt-0.5">Manage performance, status, and student assignments</p>
//           </div>
//           <div className="text-[0.6rem] font-mono text-slate-400">
//             Total: {filteredInstructors.length} instructors
//           </div>
//         </div>

//         {/* CARDS - Mobile View */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:hidden">
//           {filteredInstructors.map((ins) => (
//             <div key={ins.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm space-y-3">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-3">
//                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-white text-sm ${ins.status === 'Blocked' ? 'bg-slate-400' : 'bg-teal-500'}`}>
//                     {ins.name[0]}
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-sm text-slate-800 dark:text-white">{ins.name}</h3>
//                     <p className="text-[0.6rem] font-mono text-slate-500">{ins.id} • {ins.location}</p>
//                   </div>
//                 </div>
//                 <span className={`px-2 py-0.5 rounded text-[0.55rem] font-mono font-semibold uppercase ${
//                   ins.status === "Active" 
//                     ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
//                     : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
//                 }`}>
//                   {ins.status}
//                 </span>
//               </div>
              
//               <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
//                 <span className="text-[0.6rem] font-mono font-semibold text-slate-500">Success: {ins.success}%</span>
//                 <button 
//                   onClick={() => setSelectedInstructor(ins)} 
//                   className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
//                 >
//                   <Eye size={14} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* TABLE - Desktop View */}
//         <div className="hidden lg:block bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-left">
//               <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
//                 <tr className="text-[0.6rem] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                   <th className="px-6 py-4">Instructor Information</th>
//                   <th className="px-6 py-4">Location</th>
//                   <th className="px-6 py-4">Current Status</th>
//                   <th className="px-6 py-4 text-right">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                 {filteredInstructors.map((ins) => (
//                   <tr key={ins.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-white text-sm ${ins.status === 'Blocked' ? 'bg-slate-400' : 'bg-teal-500'}`}>
//                           {ins.name[0]}
//                         </div>
//                         <div>
//                           <p className="text-[0.8rem] font-medium text-slate-800 dark:text-white leading-tight">{ins.name}</p>
//                           <p className="text-[0.6rem] font-mono text-slate-500 mt-0.5">ID: {ins.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-1.5">
//                         <span className="text-[0.7rem] text-slate-600 dark:text-slate-300">{ins.location}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`inline-flex px-2 py-0.5 rounded text-[0.55rem] font-mono font-semibold uppercase ${
//                         ins.status === "Active" 
//                           ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" 
//                           : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
//                       }`}>
//                         {ins.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-right">
//                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
//                         <button 
//                           onClick={() => setSelectedInstructor(ins)} 
//                           className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
//                           title="View Details"
//                         >
//                           <Eye size={14} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
          
//           {filteredInstructors.length === 0 && (
//             <div className="py-12 text-center">
//               <p className="text-[0.7rem] font-mono text-slate-400">No instructors found matching your filters.</p>
//             </div>
//           )}
//         </div>
//       </main>

//       <InstructorRegistrationModal 
//         isOpen={isRegModalOpen} 
//         onClose={() => setIsRegModalOpen(false)} 
//         onAdd={handleAddInstructor}
//       />
      
//       {selectedInstructor && (
//         <InstructorDetailModal 
//           instructor={selectedInstructor} 
//           onClose={() => setSelectedInstructor(null)} 
//           allInstructors={instructors.filter(i => i.id !== selectedInstructor.id)}
//           onUpdate={handleUpdateInstructor}
//           onToggleBlock={handleToggleBlockStatus}
//         />
//       )}
//     </div>
//   );
// };

// export default Instructors;









import React, { useState } from 'react';
import InstructorDetailModal from '../components/InstructorDetailModal';
import InstructorRegistrationModal from '../components/InstructorRegistrationModal';
import Pagination from '../components/Pagination';
import { 
  Search, ScanEye, MapPin, Mail, Phone, Calendar, 
  Trash2, UserPlus, Download, Plus, ChevronRight, AlertCircle
} from 'lucide-react';

const Instructors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All'); // Added status filter state
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [instructors, setInstructors] = useState([
    { 
      id: "INST-9821", 
      name: "Jean Dupont", 
      contact: "709-555-0123", 
      email: "jean.d@example.com",
      dob: "1985-06-12",
      address: "123 Maple Leaf Ave, Toronto, ON",
      license: "D1234-56789-01234",
      expiry: "2026-03-10", 
      vehicle: "Toyota Corolla", 
      plate: "V-882", 
      success: 92, 
      location: "Burin",
      status: "Active",
      students: [
        { id: "STU-101", name: "Alice Cooper", progress: "60%" },
        { id: "STU-102", name: "Bob Marley", progress: "20%" }
      ]
    },
    { 
      id: "INST-1122", 
      name: "Marc Leblanc", 
      contact: "709-555-9988", 
      email: "m.leblanc@example.com",
      dob: "1982-11-05",
      address: "77 Water St, Burin, NL",
      license: "L5544-33221-11223",
      expiry: "2025-12-30", 
      vehicle: "Hyundai Elantra", 
      plate: "V-901", 
      success: 95, 
      location: "Burin",
      status: "Active",
      students: [{ id: "STU-105", name: "Kevin Hart", progress: "10%" }]
    },
    { 
      id: "INST-4432", 
      name: "Sarah Miller", 
      contact: "709-555-4432", 
      email: "s.miller@example.com",
      dob: "1990-02-20",
      address: "456 Oak St, St. John's, NL",
      license: "S9876-54321-09876",
      expiry: "2026-05-20", 
      vehicle: "Honda Civic", 
      plate: "V-104", 
      success: 88, 
      location: "St. John’s / Mount Pearl",
      status: "Blocked",
      students: []
    },
    { 
      id: "INST-5566", 
      name: "David Smith", 
      contact: "709-555-6677", 
      email: "d.smith@example.com",
      dob: "1988-08-15",
      address: "12 Pine Rd, Grand Falls, NL",
      license: "K1122-33445-55667",
      expiry: "2027-01-10", 
      vehicle: "Ford Focus", 
      plate: "V-302", 
      success: 90, 
      location: "Grand Falls",
      status: "Active",
      students: [{ id: "STU-109", name: "Emma Watson", progress: "45%" }]
    }
  ]);

  const locations = ["Burin", "Grand Falls", "Marystown", "St. John’s / Mount Pearl"];

  const handleAddInstructor = (newIns) => {
    const formattedInstructor = {
      ...newIns,
      id: `INST-${Math.floor(1000 + Math.random() * 9000)}`,
      success: 0, 
      status: "Active",
      students: []
    };
    setInstructors((prev) => [...prev, formattedInstructor]);
  };

  const handleUpdateInstructor = (id, updatedFields) => {
    setInstructors(prev => prev.map(ins => 
      ins.id === id ? { ...ins, ...updatedFields } : ins
    ));
    if (selectedInstructor && selectedInstructor.id === id) {
      setSelectedInstructor(prev => ({ ...prev, ...updatedFields }));
    }
  };

  const handleToggleBlockStatus = (id) => {
    setInstructors(prev => prev.map(ins => 
      ins.id === id ? { ...ins, status: ins.status === "Blocked" ? "Active" : "Blocked" } : ins
    ));
  };

  const handleDeleteInstructor = (id) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      setInstructors(prev => prev.filter(ins => ins.id !== id));
    }
  };

  // Updated filter logic with status filter
  const filteredInstructors = instructors.filter(ins => {
    const matchesLocation = locationFilter === 'All' || ins.location === locationFilter;
    const matchesStatus = statusFilter === 'All' || ins.status === statusFilter;
    const matchesSearch = ins.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ins.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ins.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLocation && matchesStatus && matchesSearch;
  });

  // Pagination logic
  const totalItems = filteredInstructors.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInstructors = filteredInstructors.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      
      {/* 1. ADAPTIVE HEADER */}
      <header className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
              Instructor <span className="text-teal-600 dark:text-teal-400">Management</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              Manage instructor profiles, performance metrics, and student assignments
            </p>
          </div>
          
          {/* New Instructor Button */}
          <div className="flex justify-end w-full md:w-auto">
            <button 
              onClick={() => setIsRegModalOpen(true)} 
              className="w-full md:w-auto px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[0.8rem] font-medium text-slate-900 dark:text-white hover:bg-teal-600 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Plus size={18} /> New Instructor
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col w-full lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4 mb-6">
          {/* Filter Group - First row on mobile, inline on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2 sm:gap-3 flex-1">
            
            {/* Location Filter - Full width on mobile */}
            <div className="group relative w-full">
              <select 
                value={locationFilter} 
                onChange={(e) => { setLocationFilter(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
              >
                <option value="All">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Status Filter - Full width on mobile */}
            <div className="group relative w-full">
              <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Search Bar - Full width on mobile, fixed width on larger screens */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by Name, ID or Email..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
            />
          </div>
        </div>
      </header>

      {/* 2. RESPONSIVE TABLE CONTAINER */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8 overflow-x-hidden">
        <div className="max-w-[1800px] mx-auto">
          
          {/* MOBILE VIEW (Cards) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {paginatedInstructors.map((ins) => (
              <div key={ins.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-all">
                {ins.status === 'Blocked' && <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500" />}
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      ins.status === 'Blocked' 
                        ? 'bg-slate-400 dark:bg-slate-600 text-white' 
                        : 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
                    }`}>
                      {ins.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight">{ins.name}</h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">ID: #{ins.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                    ins.status === 'Active' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {ins.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Mail size={16} className="text-teal-500 shrink-0" /> 
                    <span className="truncate">{ins.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin size={16} className="text-teal-500 shrink-0" /> 
                    <span>{ins.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <Phone size={16} className="text-teal-500 shrink-0" /> 
                    <span>{ins.contact}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedInstructor(ins)}
                    className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <ScanEye size={18} /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW (Table) */}
          <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Instructor Details</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Location</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Contact & Vehicle</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginatedInstructors.map((ins) => (
                    <tr key={ins.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shadow-sm ${
                            ins.status === 'Blocked' 
                              ? 'bg-slate-400 dark:bg-slate-600' 
                              : 'bg-teal-500'
                          }`}>
                            {ins.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-base font-bold text-slate-800 dark:text-white">{ins.name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{ins.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <MapPin size={14} className="text-teal-500" /> {ins.location}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-slate-700 dark:text-slate-300">{ins.contact}</div>
                        <div className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">{ins.vehicle} • {ins.plate}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          ins.status === 'Active' 
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                            : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${ins.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                          {ins.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => setSelectedInstructor(ins)}
                          className="p-2.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-xl transition-all"
                        >
                          <ScanEye size={22} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredInstructors.length === 0 && (
            <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <AlertCircle className="mx-auto text-slate-300 mb-4" size={56} />
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No instructors found matching your filters.</p>
              <button 
                onClick={() => {
                  setLocationFilter("All");
                  setStatusFilter("All");
                  setSearchTerm("");
                  setCurrentPage(1);
                }} 
                className="mt-4 text-teal-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Pagination and Export Button Section */}
      {(totalItems > itemsPerPage || filteredInstructors.length > 0) && (
        <div className="px-4 sm:px-6 lg:px-8 pb-8">
          {/* Pagination */}
          {totalItems > itemsPerPage && (
            <div className="flex justify-center py-4">
              <Pagination 
                currentPage={currentPage} 
                totalItems={totalItems} 
                itemsPerPage={itemsPerPage} 
                onPageChange={handlePageChange} 
              />
            </div>
          )}
          
          {/* Export Button - Full width on mobile, right-aligned on larger screens */}
          <div className="flex justify-end mt-4">
            <button className="w-full sm:w-auto px-6 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-[0.85rem] font-medium text-slate-900 dark:text-white hover:bg-teal-600 hover:text-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm">
              <Download size={18} /> Export Instructors List
            </button>
          </div>
        </div>
      )}

      <InstructorRegistrationModal 
        isOpen={isRegModalOpen} 
        onClose={() => setIsRegModalOpen(false)} 
        onAdd={handleAddInstructor}
      />
      
      {selectedInstructor && (
        <InstructorDetailModal 
          instructor={selectedInstructor} 
          onClose={() => setSelectedInstructor(null)} 
          allInstructors={instructors.filter(i => i.id !== selectedInstructor.id)}
          onUpdate={handleUpdateInstructor}
          onToggleBlock={handleToggleBlockStatus}
          onDelete={handleDeleteInstructor}
        />
      )}
    </div>
  );
};

export default Instructors;