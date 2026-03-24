// import React, { useState, useMemo } from "react";
// import { 
//   MapPin, Calendar as CalendarIcon, Search, X, 
//   Clock, AlertCircle, CheckCircle2, Edit3, Trash2, 
//   Users, ChevronRight, ArrowLeft, UserPlus, 
//   Filter, History, Settings2
// } from "lucide-react";

// import SearchBar from "../components/SearchBar";
// import Pagination from "../components/Pagination";

// const Schedule = () => {
//   // --- 1. DATA ---
//   const places = ["All Places", "Burin", "Grand Falls", "Marystown", "St. John's", "Mount Pearl"];
//   const residentAreas = ["All Areas", "Burin Bay Arm", "Burin Heritage", "Salt Pond", "Epworth", "Marystown", "St. John's"];

//   const [instructors, setInstructors] = useState([
//     { id: 1, name: "John Doe", place: "St. John's", currentTask: "City Driving", load: "High", startDate: "2026-03-01", endDate: "2026-03-15" },
//     { id: 2, name: "Jane Smith", place: "Marystown", currentTask: "Parking Drills", load: "Medium", startDate: "2026-03-01", endDate: "2026-03-07" },
//     { id: 3, name: "Sarah Connor", place: "Burin", currentTask: "Unassigned", load: "Low", startDate: null, endDate: null },
//     { id: 4, name: "Mike Ross", place: "Grand Falls", currentTask: "Mock Road Test", load: "High", startDate: "2026-03-05", endDate: "2026-03-20" },
//   ]);

//   const [studentPool] = useState([
//     { id: 'S1', name: "Muhammed Salman", area: "burin loc1", pickup: "Residence Lot 4", email: "salman@tech.com", progress: 40 },
//     { id: 'S2', name: "Alex Rivera", area: "Burin Heritage", pickup: "Heritage Museum", email: "alex@drive.com", progress: 65 },
//     { id: 'S3', name: "Sam Chen", area: "buurin loc2", pickup: "Main Gate", email: "sam@drive.com", progress: 30 },
//     { id: 'S4', name: "Yuki Tanaka", area: "Salt Pond", pickup: "Epworth Well", email: "yuki@global.com", progress: 90 },
//     { id: 'S5', name: "Jordan Lee", area: "burin heritage ", pickup: "Downtown Mall", email: "jordan@example.com", progress: 15 },
//   ]);

//   const [sessions, setSessions] = useState([
//     { id: 1001, instructorId: 2, name: "Muhammed Salman", area: "Marystown", date: "2026-03-02", timeSlot: "09:00 - 10:00", pickup: "Residence Lot 4", status: "Active" },
//   ]);

//   // --- 2. STATES ---
//   const [viewMode, setViewMode] = useState("instructors"); 
//   const [activeSubTab, setActiveSubTab] = useState("assign"); 
//   const [selectedInstructor, setSelectedInstructor] = useState(null);
//   const [selectedPlace, setSelectedPlace] = useState("All Places");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [studentSearch, setStudentSearch] = useState("");
//   const [areaFilter, setAreaFilter] = useState("All Areas");
//   const [dateFilter, setDateFilter] = useState("");

//   const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
//   const [selectedForSession, setSelectedForSession] = useState(null);
//   const [editingSession, setEditingSession] = useState(null);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const [formData, setFormData] = useState({ date: "", startTime: "09:00", endTime: "10:00" });

//   // --- 3. LOGIC ---
//   const getTaskStatus = (endDate) => {
//     if (!endDate) return { label: "Idle", color: "text-slate-400 bg-slate-100 dark:bg-slate-800", icon: <Clock size={10}/> };
//     if (new Date() > new Date(endDate)) return { label: "Expired", color: "text-rose-600 bg-rose-100 dark:bg-rose-900/20", icon: <AlertCircle size={10}/> };
//     return { label: "Assigned", color: "text-teal-600 bg-teal-100 dark:bg-teal-900/20", icon: <CheckCircle2 size={10}/> };
//   };

//   const instructorsList = useMemo(() => {
//     const filtered = instructors.filter((ins) => {
//       const matchesPlace = selectedPlace === "All Places" || ins.place === selectedPlace;
//       const matchesSearch = ins.name.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesPlace && matchesSearch;
//     });
//     return filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//   }, [selectedPlace, searchQuery, instructors, currentPage]);

//   const filteredStudents = studentPool.filter(s => 
//     (s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.area.toLowerCase().includes(studentSearch.toLowerCase())) &&
//     (areaFilter === "All Areas" || s.area === areaFilter)
//   );

//   const activeSessions = sessions.filter(s => 
//     s.instructorId === selectedInstructor?.id && s.status === "Active" && (dateFilter === "" || s.date === dateFilter)
//   );

//   const historySessions = sessions.filter(s => 
//     s.instructorId === selectedInstructor?.id && s.status === "Completed" && (dateFilter === "" || s.date === dateFilter)
//   );

//   const handleSaveSession = () => {
//     if (editingSession) {
//       setSessions(prev => prev.map(s => s.id === editingSession.id ? { ...s, ...formData, timeSlot: `${formData.startTime} - ${formData.endTime}` } : s));
//       setEditingSession(null);
//     } else {
//       const newEntry = { ...selectedForSession, ...formData, id: Date.now(), instructorId: selectedInstructor.id, status: "Active", timeSlot: `${formData.startTime} - ${formData.endTime}` };
//       setSessions([...sessions, newEntry]);
//       setSelectedForSession(null);
//     }
//   };

//   return (
//     <div className="p-3 sm:p-6 lg:p-10 bg-slate-50 dark:bg-[#020617] min-h-screen font-['Lexend'] transition-colors duration-300 pb-20 text-slate-900 dark:text-white">
//       <div className="max-w-7xl mx-auto space-y-8">
        
//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
//           <div className="text-center lg:text-left w-full">
//             {viewMode === "manage" && (
//               <button onClick={() => setViewMode("instructors")} className="flex items-center gap-2 text-indigo-600 font-black uppercase text-[10px] tracking-widest mb-4 hover:gap-3 transition-all active:scale-95">
//                 <ArrowLeft size={14}/> Back to Instructors
//               </button>
//             )}
//             <h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase italic leading-none">
//               Duty <span className="text-indigo-600">{viewMode === "instructors" ? "Dispatch" : "Audit"}</span>
//             </h1>
//           </div>
//           {viewMode === "instructors" && <div className="w-full lg:max-w-md"><SearchBar onSearch={setSearchQuery} /></div>}
//         </div>

//         {viewMode === "instructors" ? (
//           <>
//             <div className="flex flex-wrap justify-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
//               {places.map((place) => (
//                 <button key={place} onClick={() => setSelectedPlace(place)} className={`px-4 py-2 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all ${selectedPlace === place ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-indigo-600"}`}>{place}</button>
//               ))}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
//               {instructorsList.map((ins) => {
//                 const status = getTaskStatus(ins.endDate);
//                 return (
//                   <div key={ins.id} className="group bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl transition-all hover:border-indigo-500 relative">
//                     <div className="flex justify-between items-start mb-6">
//                       <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${status.color}`}>{status.icon} {status.label}</div>
//                       <button onClick={() => { setSelectedInstructor(ins); setViewMode("manage"); }} className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 active:scale-95 shadow-lg flex items-center gap-2">
//                         <Settings2 size={14}/> Manage
//                       </button>
//                     </div>
//                     <div className="flex items-center gap-4 sm:gap-5 cursor-pointer" onClick={() => { setSelectedInstructor(ins); setIsAssignModalOpen(true); }}>
//                       <div className="size-12 sm:size-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shrink-0">{ins.name.charAt(0)}</div>
//                       <div className="overflow-hidden">
//                         <h3 className="font-black text-base sm:text-lg truncate">{ins.name}</h3>
//                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{ins.place}</p>
//                       </div>
//                     </div>
//                     <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
//                        <p className="text-[9px] font-black text-indigo-600 uppercase mb-2 italic truncate">{ins.currentTask}</p>
//                        <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-black text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-700">
//                           <span>{ins.startDate || "---"}</span>
//                           <ChevronRight size={12} className="text-slate-300"/>
//                           <span>{ins.endDate || "---"}</span>
//                        </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="flex justify-center pt-8 w-full">
//               <Pagination currentPage={currentPage} totalItems={instructors.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
//             </div>
//           </>
//         ) : (
//           <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
//             <div className="flex flex-wrap bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 w-full sm:w-fit gap-1.5">
//               {[{ id: "assign", label: "Assign", icon: <UserPlus size={14}/> }, { id: "active", label: "Active", icon: <Clock size={14}/> }, { id: "history", label: "History", icon: <History size={14}/> }].map(tab => (
//                 <button key={tab.id} onClick={() => setActiveSubTab(tab.id)} className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95 ${activeSubTab === tab.id ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-indigo-600"}`}>
//                   {tab.icon} {tab.label}
//                 </button>
//               ))}
//             </div>

//             {activeSubTab === "assign" && (
//               <div className="space-y-6">
//                 <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
//                   <div className="relative flex-1">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
//                     <input type="text" placeholder="Search..." className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 outline-none font-bold text-sm text-slate-800 dark:text-white" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} />
//                   </div>
//                   <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold text-xs outline-none border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-white">
//                     {residentAreas.map(a => <option key={a} value={a}>{a}</option>)}
//                   </select>
//                 </div>
//                 <div className="bg-white dark:bg-slate-900 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-x-auto">
//                   <table className="w-full text-left min-w-112.5">
//                     <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                       <tr><th className="px-6 py-5 text-slate-900 dark:text-white">Learner</th><th className="px-6 py-5 text-slate-900 dark:text-white">Address</th><th className="px-6 py-5 text-right text-slate-900 dark:text-white">Action</th></tr>
//                     </thead>
//                     <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
//                       {filteredStudents.map(s => (
//                         <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-indigo-900/10">
//                           <td className="px-6 py-5 font-bold uppercase text-xs sm:text-sm text-slate-900 dark:text-white">{s.name}</td>
//                           <td className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase">{s.area}</td>
//                           <td className="px-6 py-5 text-right">
//                             <button onClick={() => { setSelectedForSession(s); setFormData({...formData, date: selectedInstructor.startDate || ""}) }} className="px-4 sm:px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-indigo-700">Assign</button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {(activeSubTab === "active" || activeSubTab === "history") && (
//               <div className="space-y-4">
//                 <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm gap-4">
//                    <h3 className="text-xs sm:text-sm font-black uppercase italic tracking-tighter text-indigo-600">{activeSubTab === "active" ? "Roster" : "Logs"}</h3>
//                    <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold text-xs text-slate-800 dark:text-white border-none outline-none" />
//                 </div>
//                 <div className="grid grid-cols-1 gap-4">
//                   {(activeSubTab === "active" ? activeSessions : historySessions).map(slot => (
//                     <div key={slot.id} className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//                       <div className="flex items-center gap-4 w-full sm:w-auto">
//                         <div className="size-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 shrink-0"><Clock size={20}/></div>
//                         <div className="overflow-hidden">
//                           <p className="text-base font-black uppercase italic truncate text-slate-900 dark:text-white">{slot.name}</p>
//                           <p className="text-[10px] font-bold text-teal-600 uppercase truncate"><MapPin size={10} className="inline mr-1"/>{slot.pickup}</p>
//                         </div>
//                       </div>
//                       <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-none border-slate-100 dark:border-slate-800">
//                         <div className="text-left sm:text-right mr-4 sm:mr-0">
//                           <p className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-200">{slot.timeSlot}</p>
//                           <p className="text-[9px] font-bold text-slate-400 uppercase">{slot.date}</p>
//                         </div>
//                         <div className="flex gap-2">
//                           {activeSubTab === "active" && (
//                             <>
//                               <button onClick={() => { setEditingSession(slot); setFormData({date: slot.date, startTime: slot.timeSlot.split(' - ')[0], endTime: slot.timeSlot.split(' - ')[1]})}} className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl active:scale-90"><Edit3 size={18}/></button>
//                               <button onClick={() => setSessions(prev => prev.filter(s => s.id !== slot.id))} className="p-2.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl active:scale-90"><Trash2 size={18}/></button>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {(activeSubTab === "active" ? activeSessions : historySessions).length === 0 && (
//                     <div className="py-20 text-center text-slate-300 font-black uppercase text-xs tracking-widest italic border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">No manifests found</div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* REUSABLE MODAL (SCHEDULE & EDIT) */}
//       {(selectedForSession || editingSession) && (
//         <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-4xl shadow-2xl w-full max-w-lg border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-300 text-slate-800 dark:text-white">
//             <div className="flex justify-between items-start mb-6 sm:mb-8">
//                <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter">{editingSession ? "Reschedule" : "Assign Slot"}</h3>
//                <button onClick={() => { setSelectedForSession(null); setEditingSession(null); }} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full"><X size={24}/></button>
//             </div>
//             <div className="space-y-5">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Session Date</label>
//                 <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold text-sm dark:text-white border border-slate-100 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <input type="time" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold text-sm text-slate-900 dark:text-white border-none" />
//                 <input type="time" value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 font-bold text-sm text-slate-900 dark:text-white border-none" />
//               </div>
//               <div className="flex gap-3 pt-2">
//                 <button onClick={() => { setSelectedForSession(null); setEditingSession(null); }} className="flex-1 py-3.5 text-[10px] font-black uppercase text-slate-400 hover:text-rose-500">Discard</button>
//                 <button onClick={handleSaveSession} className="flex-1 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-lg active:scale-95 transition-all">Confirm</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* TASK ASSIGNMENT MODAL (WORK BLOCK) */}
//       {isAssignModalOpen && (
//         <Modal instructor={selectedInstructor} onClose={() => setIsAssignModalOpen(false)} onSave={(updatedData) => { setInstructors(prev => prev.map(i => i.id === selectedInstructor.id ? {...i, ...updatedData} : i)); setIsAssignModalOpen(false); }} />
//       )}
//     </div>
//   );
// };

// const Modal = ({ instructor, onClose, onSave }) => {
//   const [task, setTask] = useState(instructor.currentTask || "Parking Section Handling");
//   const [start, setStart] = useState(instructor.startDate || "");
//   const [end, setEnd] = useState(instructor.endDate || "");
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
//       <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-300 text-slate-800 dark:text-white">
//         <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
//           <h2 className="text-lg sm:text-xl font-black uppercase italic tracking-tight">Assign <span className="text-indigo-600">Work Block</span></h2>
//           <button onClick={onClose}><X size={20} className="text-slate-400 hover:text-rose-500" /></button>
//         </div>
//         <div className="p-6 sm:p-8 space-y-6">
//           <select value={task} onChange={(e) => setTask(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-sm outline-none text-slate-900 dark:text-white border-none">
//             <option>Parking Section Handling</option><option>City Traffic Navigation</option><option>Highway Entry/Exit Drills</option>
//           </select>
//           <div className="grid grid-cols-2 gap-4">
//             <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-xs text-slate-900 dark:text-white border-none" />
//             <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl font-bold text-xs text-slate-900 dark:text-white border-none" />
//           </div>
//           <button onClick={() => onSave({ currentTask: task, startDate: start, endDate: end })} className="w-full py-4 sm:py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95">Confirm Dispatch</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;




















import React, { useState, useMemo } from "react";
import { 
  MapPin, Calendar as CalendarIcon, Search, X, 
  Clock, AlertCircle, CheckCircle2, Edit3, Trash2, 
  Users, ChevronRight, ArrowLeft, UserPlus, 
  Filter, History, Settings2, PlusCircle, Save,
  CalendarDays
} from "lucide-react";

import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const Schedule = () => {
  // --- 1. DUMMY DATA (Matching API Structure) ---
  const [allLocations] = useState([
    { id: 1, province_name: "Burin" },
    { id: 2, province_name: "Grand Falls" },
    { id: 3, province_name: "Marystown" },
    { id: 4, province_name: "St. John's" },
    { id: 5, province_name: "Mount Pearl" }
  ]);

  const [instructors, setInstructors] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      place: "St. John's",
      location_id: 4,
      workBlocks: [
        { id: 101, task: "City Driving", start: "2026-03-01", end: "2026-03-15", startTime: "09:00", endTime: "17:00", location_id: 4 }
      ]
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      place: "Marystown",
      location_id: 3,
      workBlocks: [
        { id: 201, task: "Parking Drills", start: "2026-03-01", end: "2026-03-07", startTime: "08:00", endTime: "12:00", location_id: 3 }
      ]
    },
    { 
      id: 3, 
      name: "Sarah Connor", 
      place: "Burin",
      location_id: 1,
      workBlocks: []
    },
    { 
      id: 4, 
      name: "Mike Ross", 
      place: "Grand Falls",
      location_id: 2,
      workBlocks: [
        { id: 401, task: "Mock Road Test", start: "2026-03-05", end: "2026-03-20", startTime: "13:00", endTime: "18:00", location_id: 2 }
      ]
    }
  ]);

  const [availableStudents] = useState([
    { id: 1, user: { name: "Muhammed Salman" }, street_address: "Residence Lot 4, Burin", location: "Burin" },
    { id: 2, user: { name: "Alex Rivera" }, street_address: "Heritage Museum, Marystown", location: "Marystown" },
    { id: 3, user: { name: "Sam Chen" }, street_address: "Main Gate, Grand Falls", location: "Grand Falls" },
    { id: 4, user: { name: "Yuki Tanaka" }, street_address: "Epworth Well, St. John's", location: "St. John's" },
    { id: 5, user: { name: "Jordan Lee" }, street_address: "Downtown Mall, Mount Pearl", location: "Mount Pearl" },
  ]);

  const [blockAssignments, setBlockAssignments] = useState([
    { id: 1001, student_id: 1, student: { user: { name: "Muhammed Salman" } }, student_location: "Residence Lot 4", date: "2026-03-02", start_time: "09:00", end_time: "10:00", schedule_id: 101, attendance: null },
    { id: 1002, student_id: 2, student: { user: { name: "Alex Rivera" } }, student_location: "Heritage Museum", date: "2026-03-03", start_time: "10:00", end_time: "11:00", schedule_id: 101, attendance: null },
    { id: 1003, student_id: 3, student: { user: { name: "Sam Chen" } }, student_location: "Main Gate", date: "2026-03-01", start_time: "14:00", end_time: "15:00", schedule_id: 201, attendance: { id: 1, status: "Present" } }
  ]);

  // --- 2. STATES ---
  const [viewMode, setViewMode] = useState("instructors");
  const [activeSubTab, setActiveSubTab] = useState("assign");
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("All Places");
  const [searchQuery, setSearchQuery] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [areaFilter, setAreaFilter] = useState("All Areas");
  const [dateFilter, setDateFilter] = useState("");
  const [activeBlockId, setActiveBlockId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [isNewDutyModalOpen, setIsNewDutyModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedForSession, setSelectedForSession] = useState(null);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingDutyId, setEditingDutyId] = useState(null);

  // Form data for duty block
  const [newDutyData, setNewDutyData] = useState({
    task_description: "",
    start_date: "",
    end_date: "",
    start_time: "08:00",
    end_time: "17:00",
  });

  // Form data for assignment
  const [formData, setFormData] = useState({ 
    date: "", 
    startTime: "09:00", 
    endTime: "10:00", 
    location: "", 
    blockId: "",
    assignmentId: null
  });

  // --- 3. FILTERS & MEMO ---
  const dynamicPlaces = useMemo(() => ["All Places", ...allLocations.map(l => l.province_name)], [allLocations]);
  
  const instructorsList = useMemo(() => {
    return instructors.filter(ins => 
      (selectedPlace === "All Places" || ins.place === selectedPlace) && 
      ins.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedPlace, searchQuery, instructors]);
  
  const paginatedInstructors = instructorsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Filter assignments for current block
  const blockAssignmentsForBlock = useMemo(() => {
    if (!activeBlockId) return [];
    return blockAssignments.filter(a => a.schedule_id === parseInt(activeBlockId));
  }, [blockAssignments, activeBlockId]);

  // Students not yet assigned to current block
  const studentsNotYetAssigned = useMemo(() => {
    const assignedStudentIds = blockAssignmentsForBlock.map(a => a.student_id);
    return availableStudents.filter(s => !assignedStudentIds.includes(s.id));
  }, [availableStudents, blockAssignmentsForBlock]);

  // Filtered available students based on search
  const filteredAvailableStudents = useMemo(() => {
    return studentsNotYetAssigned.filter(s => 
      (s.user?.name || "").toLowerCase().includes(studentSearch.toLowerCase())
    );
  }, [studentsNotYetAssigned, studentSearch]);

  // Active sessions (no attendance recorded yet)
  const activeSessions = useMemo(() => {
    return blockAssignmentsForBlock.filter(a => !a.attendance);
  }, [blockAssignmentsForBlock]);

  // History sessions (have attendance recorded)
  const historySessions = useMemo(() => {
    return blockAssignmentsForBlock.filter(a => a.attendance);
  }, [blockAssignmentsForBlock]);

  // Get selected block details
  const selectedBlock = useMemo(() => {
    if (!activeBlockId || !selectedInstructor) return null;
    return selectedInstructor.workBlocks.find(b => b.id === parseInt(activeBlockId));
  }, [activeBlockId, selectedInstructor]);

  // --- 4. HANDLERS FOR DUTY BLOCKS ---
  const handleAddDuty = () => {
    setIsEditMode(false);
    setEditingDutyId(null);
    setNewDutyData({
      task_description: "",
      start_date: "",
      end_date: "",
      start_time: "08:00",
      end_time: "17:00",
    });
    setIsNewDutyModalOpen(true);
  };

  const handleEditDuty = (block) => {
    setIsEditMode(true);
    setEditingDutyId(block.id);
    setNewDutyData({
      task_description: block.task,
      start_date: block.start,
      end_date: block.end,
      start_time: block.startTime,
      end_time: block.endTime,
    });
    setIsNewDutyModalOpen(true);
  };

  const handleSaveDuty = () => {
    if (!newDutyData.task_description || !newDutyData.start_date || !newDutyData.end_date) {
      alert("Please fill all fields");
      return;
    }

    const newBlock = {
      id: isEditMode ? editingDutyId : Date.now(),
      task: newDutyData.task_description,
      start: newDutyData.start_date,
      end: newDutyData.end_date,
      startTime: newDutyData.start_time,
      endTime: newDutyData.end_time,
      location_id: selectedInstructor.location_id
    };

    if (isEditMode) {
      setInstructors(prev => prev.map(ins => 
        ins.id === selectedInstructor.id 
          ? { ...ins, workBlocks: ins.workBlocks.map(b => b.id === editingDutyId ? newBlock : b) }
          : ins
      ));
      setSelectedInstructor(prev => ({
        ...prev,
        workBlocks: prev.workBlocks.map(b => b.id === editingDutyId ? newBlock : b)
      }));
    } else {
      setInstructors(prev => prev.map(ins => 
        ins.id === selectedInstructor.id 
          ? { ...ins, workBlocks: [...ins.workBlocks, newBlock] }
          : ins
      ));
      setSelectedInstructor(prev => ({
        ...prev,
        workBlocks: [...prev.workBlocks, newBlock]
      }));
    }
    
    setIsNewDutyModalOpen(false);
    alert(isEditMode ? "Duty block updated!" : "Duty block created!");
  };

  const handleDeleteDuty = (blockId) => {
    if (!window.confirm("Delete this duty block? All student assignments will be removed.")) return;
    
    // Remove all assignments for this block
    setBlockAssignments(prev => prev.filter(a => a.schedule_id !== blockId));
    
    // Remove the block from instructor
    setInstructors(prev => prev.map(ins => 
      ins.id === selectedInstructor.id 
        ? { ...ins, workBlocks: ins.workBlocks.filter(b => b.id !== blockId) }
        : ins
    ));
    setSelectedInstructor(prev => ({
      ...prev,
      workBlocks: prev.workBlocks.filter(b => b.id !== blockId)
    }));
    
    if (activeBlockId === blockId.toString()) {
      setActiveBlockId("");
    }
    
    alert("Duty block deleted!");
  };

  // --- 5. HANDLERS FOR ASSIGNMENTS ---
  const handleAssignStudent = (student) => {
    if (!activeBlockId) {
      alert("Please select a duty block first");
      return;
    }
    
    setSelectedForSession(student);
    setEditingAssignment(null);
    setFormData({
      date: selectedBlock?.start || "",
      startTime: selectedBlock?.startTime || "09:00",
      endTime: selectedBlock?.endTime || "10:00",
      location: student.street_address || "",
      blockId: activeBlockId,
      assignmentId: null
    });
    setIsAssignModalOpen(true);
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setSelectedForSession(assignment.student);
    setFormData({
      date: assignment.date,
      startTime: assignment.start_time,
      endTime: assignment.end_time,
      location: assignment.student_location,
      blockId: activeBlockId,
      assignmentId: assignment.id
    });
    setIsAssignModalOpen(true);
  };

  const handleDeleteAssignment = (assignmentId) => {
    if (!window.confirm("Remove this student from the block?")) return;
    setBlockAssignments(prev => prev.filter(a => a.id !== assignmentId));
  };

  const handleCompleteSession = (assignmentId) => {
    setBlockAssignments(prev => prev.map(a => 
      a.id === assignmentId 
        ? { ...a, attendance: { id: Date.now(), status: "Present" } }
        : a
    ));
  };

  const handleSaveAssignment = () => {
    if (!formData.date) {
      alert("Please select a date");
      return;
    }

    if (editingAssignment) {
      setBlockAssignments(prev => prev.map(a => 
        a.id === editingAssignment.id 
          ? { ...a, 
              date: formData.date, 
              start_time: formData.startTime, 
              end_time: formData.endTime,
              student_location: formData.location
            }
          : a
      ));
    } else {
      const newAssignment = {
        id: Date.now(),
        student_id: selectedForSession.id,
        student: selectedForSession,
        student_location: formData.location,
        date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        schedule_id: parseInt(activeBlockId),
        attendance: null
      };
      setBlockAssignments(prev => [...prev, newAssignment]);
    }
    
    setIsAssignModalOpen(false);
    setSelectedForSession(null);
    setEditingAssignment(null);
    alert(editingAssignment ? "Session updated!" : "Student assigned!");
  };

  if (!instructors.length) return <div className="p-20 text-center text-slate-400">Loading schedule data...</div>;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-6 md:py-8">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-center lg:text-left w-full">
            {viewMode === "manage" && (
              <button 
                onClick={() => { 
                  setViewMode("instructors"); 
                  setActiveBlockId(""); 
                  setSelectedInstructor(null);
                }} 
                className="flex items-center gap-1.5 text-teal-600 font-medium text-[0.7rem] uppercase tracking-wider mb-3 hover:gap-2 transition-all"
              >
                <ArrowLeft size={12}/> Back to instructors
              </button>
            )}
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
              Duty <span className="text-teal-600">{viewMode === "instructors" ? "Dispatch" : "Management"}</span>
            </h1>
            <p className="text-[0.65rem] font-soro text-slate-500 mt-0.5">
              {viewMode === "instructors" ? "Manage instructor schedules and assignments" : "Configure duty blocks and student sessions"}
            </p>
          </div>
          {viewMode === "instructors" && (
            <div className="w-full lg:max-w-xs">
              <SearchBar onSearch={setSearchQuery} placeholder="Search instructors..." />
            </div>
          )}
        </div>

        {viewMode === "instructors" ? (
          <>
            {/* Location Filters */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {dynamicPlaces.map((place) => (
                <button 
                  key={place} 
                  onClick={() => setSelectedPlace(place)} 
                  className={`px-3 py-1.5 rounded-lg text-[0.6rem] font-soro font-semibold uppercase tracking-wider transition-all ${
                    selectedPlace === place 
                      ? "bg-teal-500 text-white shadow-sm" 
                      : "bg-white dark:bg-slate-900 text-slate-500 hover:text-teal-600 border border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {place}
                </button>
              ))}
            </div>

            {/* Instructor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedInstructors.map((ins) => {
                const hasBlocks = ins.workBlocks && ins.workBlocks.length > 0;
                const blockCount = hasBlocks ? ins.workBlocks.length : 0;
                const activeSessionsCount = blockAssignments.filter(a => 
                  ins.workBlocks.some(b => b.id === a.schedule_id) && !a.attendance
                ).length;

                return (
                  <div key={ins.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex gap-2">
                        <div className={`px-2 py-0.5 rounded-full text-[0.55rem] font-soro font-semibold ${
                          hasBlocks 
                            ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                        }`}>
                          {blockCount} Block{blockCount !== 1 ? 's' : ''}
                        </div>
                        {activeSessionsCount > 0 && (
                          <div className="px-2 py-0.5 rounded-full text-[0.55rem] font-soro font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-600">
                            {activeSessionsCount} Active
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => { setSelectedInstructor(ins); setViewMode("manage"); }} 
                        className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.6rem] font-medium transition-all"
                      >
                        Manage
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center font-semibold text-base">
                        {ins.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">{ins.name}</h3>
                        <p className="text-[0.6rem] font-soro text-slate-500 flex items-center gap-1">
                          <MapPin size={10}/> {ins.place}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Pagination */}
            {instructorsList.length > itemsPerPage && (
              <div className="flex justify-center pt-6">
                <Pagination 
                  currentPage={currentPage} 
                  totalItems={instructorsList.length} 
                  itemsPerPage={itemsPerPage} 
                  onPageChange={setCurrentPage} 
                />
              </div>
            )}
          </>
        ) : (
          /* MANAGEMENT VIEW */
          <div className="space-y-6">
            
            {/* ADD DUTY BLOCK BUTTON */}
            <div className="flex justify-end">
              <button 
                onClick={handleAddDuty}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all"
              >
                <PlusCircle size={14} /> Add Duty Block
              </button>
            </div>

            {/* DUTY BLOCKS LIST */}
            <div className="space-y-3">
              <h2 className="text-[0.7rem] font-soro font-semibold text-teal-600 uppercase tracking-wider">
                Duty Blocks
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {selectedInstructor?.workBlocks.map(block => (
                  <div key={block.id} className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
                    activeBlockId === block.id.toString() 
                      ? "bg-teal-50 dark:bg-teal-900/20 border-teal-300 dark:border-teal-700" 
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  }`}>
                    <div className="flex-1 cursor-pointer" onClick={() => setActiveBlockId(block.id.toString())}>
                      <h4 className="text-[0.75rem] font-medium text-slate-800 dark:text-white">{block.task}</h4>
                      <p className="text-[0.55rem] font-soro text-slate-500">
                        {block.start} - {block.end}
                      </p>
                      <p className="text-[0.5rem] font-soro text-slate-400">
                        {block.startTime} - {block.endTime}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEditDuty(block)} className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors">
                        <Edit3 size={12} />
                      </button>
                      <button onClick={() => handleDeleteDuty(block.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                {selectedInstructor?.workBlocks.length === 0 && (
                  <div className="col-span-full text-center py-8 text-[0.65rem] text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <CalendarDays size={20} className="mx-auto mb-2 text-slate-400" />
                    No duty blocks scheduled. Click "Add Duty Block" to create one.
                  </div>
                )}
              </div>
            </div>

            {/* DUTY BLOCK SELECTOR DROPDOWN */}
            {selectedInstructor?.workBlocks.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <label className="text-[0.6rem] font-soro font-semibold text-teal-600 uppercase tracking-wider block mb-2">
                  Select Duty Block to Manage Assignments
                </label>
                <select 
                  value={activeBlockId} 
                  onChange={(e) => setActiveBlockId(e.target.value)} 
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.75rem] outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="">Choose a block to manage assignments...</option>
                  {selectedInstructor?.workBlocks?.map(block => (
                    <option key={block.id} value={block.id}>
                      {block.task} ({block.start}) • {block.startTime}-{block.endTime}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Only show tabs and assignment section if a block is selected */}
            {activeBlockId && (
              <>
                {/* Tabs */}
                <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 w-fit">
                  {[
                    { id: "assign", label: "Assign Students", icon: <UserPlus size={12}/> }, 
                    { id: "active", label: "Active Sessions", icon: <Clock size={12}/> },
                    { id: "history", label: "History", icon: <History size={12}/> }
                  ].map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveSubTab(tab.id)} 
                      className={`px-3 py-1.5 rounded-md text-[0.6rem] font-medium flex items-center gap-1.5 transition-all ${
                        activeSubTab === tab.id 
                          ? "bg-teal-500 text-white" 
                          : "text-slate-500 hover:text-teal-600"
                      }`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </div>

                {/* TAB: ASSIGN */}
                {/* {activeSubTab === "assign" && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
                      <input 
                        type="text" 
                        placeholder="Search students..." 
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[0.7rem] outline-none focus:ring-1 focus:ring-teal-500"
                        value={studentSearch} 
                        onChange={(e) => setStudentSearch(e.target.value)} 
                      />
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/30 text-[0.55rem] font-soro font-semibold text-slate-500 uppercase tracking-wider">
                          <tr>
                            <th className="px-4 py-3">Student</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {filteredAvailableStudents.map(s => {
                            const alreadyAssigned = blockAssignments.some(a => a.student_id === s.id && a.schedule_id === parseInt(activeBlockId));
                            return (
                              <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                                <td className="px-4 py-3">
                                  <span className="text-[0.7rem] font-medium text-slate-800 dark:text-white">{s.user?.name}</span>
                                </td>
                                <td className="px-4 py-3">
                                  <p className="text-[0.6rem] text-slate-500 flex items-center gap-1">
                                    <MapPin size={10}/> {s.location}
                                  </p>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  {alreadyAssigned ? (
                                    <span className="text-[0.6rem] text-slate-400">Already assigned</span>
                                  ) : (
                                   <button 
                                      onClick={() => handleAssignStudent(s)} 
                                      className="px-3 py-1 bg-teal-100 text-white rounded-md text-[0.6rem] font-medium hover:bg-teal-700 transition-all"
                                    >
                                      Assign
                                    </button> 
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {filteredAvailableStudents.length === 0 && (
                        <div className="py-8 text-center text-[0.65rem] text-slate-400">No students available for this block</div>
                      )}
                    </div>
                  </div>
                )} */}


                {/* TAB: ASSIGN */}
{activeSubTab === "assign" && (
  <div className="space-y-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
      <input 
        type="text" 
        placeholder="Search students..." 
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[0.7rem] outline-none focus:ring-1 focus:ring-teal-500"
        value={studentSearch} 
        onChange={(e) => setStudentSearch(e.target.value)} 
      />
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 dark:bg-slate-800/30 text-[0.55rem] font-mono font-semibold text-slate-500 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">Student</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {filteredAvailableStudents.map(s => {
            const alreadyAssigned = blockAssignments.some(a => a.student_id === s.id && a.schedule_id === parseInt(activeBlockId));
            return (
              <tr key={s.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-150">
                <td className="px-4 py-3">
                  <span className="text-[0.75rem] font-medium text-slate-800 dark:text-white">{s.user?.name}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <MapPin size={10} className="text-slate-400" />
                    </div>
                    <span className="text-[0.65rem] text-slate-500 dark:text-slate-400">{s.location}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  {alreadyAssigned ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[0.6rem] text-slate-400">
                      <CheckCircle2 size={10} />
                      Assigned
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleAssignStudent(s)} 
                      className="px-3 py-1.5 rounded-lg text-[0.6rem] font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 bg-teal-500 hover:bg-teal-600 text-white shadow-sm hover:shadow"
                    >
                      Assign
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {filteredAvailableStudents.length === 0 && (
        <div className="py-10 text-center">
          <div className="inline-flex flex-col items-center gap-2">
            <Users size={24} className="text-slate-300 dark:text-slate-600" />
            <p className="text-[0.7rem] text-slate-400">No students available for this block</p>
          </div>
        </div>
      )}
    </div>
  </div>
)}

                {/* TAB: ACTIVE */}
                {activeSubTab === "active" && (
                  <div className="space-y-3">
                    {activeSessions.length > 0 ? (
                      activeSessions.map(session => (
                        <div key={session.id} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-[0.75rem] font-medium text-slate-800 dark:text-white">{session.student?.user?.name}</h4>
                              <span className="px-2 py-0.5 rounded-full text-[0.55rem] font-soro font-semibold bg-teal-100 dark:bg-teal-900/30 text-teal-600">Active</span>
                            </div>
                            <div className="flex gap-3 text-[0.6rem] text-slate-500 mt-1">
                              <span className="flex items-center gap-1"><CalendarIcon size={10}/> {session.date}</span>
                              <span className="flex items-center gap-1"><Clock size={10}/> {session.start_time} - {session.end_time}</span>
                              <span className="flex items-center gap-1"><MapPin size={10}/> {session.student_location}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleEditAssignment(session)} className="p-1.5 text-amber-500 hover:bg-amber-50 rounded transition-colors">
                              <Edit3 size={12}/>
                            </button>
                            {/* <button onClick={() => handleCompleteSession(session.id)} className="p-1.5 text-green-500 hover:bg-green-50 rounded transition-colors">
                              <CheckCircle2 size={12}/>
                            </button> */}
                            <button onClick={() => handleDeleteAssignment(session.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors">
                              <Trash2 size={12}/>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-[0.65rem] text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                        No active sessions for this block
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: HISTORY */}
                {activeSubTab === "history" && (
                  <div className="space-y-3">
                    {historySessions.length > 0 ? (
                      historySessions.map(session => (
                        <div key={session.id} className="p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center opacity-75">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-[0.7rem] font-medium text-slate-600 dark:text-slate-400">{session.student?.user?.name}</h4>
                              <span className="px-2 py-0.5 rounded-full text-[0.55rem] font-soro font-semibold bg-slate-200 dark:bg-slate-700 text-slate-500">Completed</span>
                            </div>
                            <p className="text-[0.55rem] text-slate-500 mt-1">
                              {session.date} • {session.start_time} - {session.end_time}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-teal-600">
                            <CheckCircle2 size={12} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-[0.65rem] text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                        No history for this block
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* MODAL: ADD/EDIT DUTY BLOCK */}
      {isNewDutyModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                {isEditMode ? 'Edit' : 'Add'} Duty Block
              </h3>
              <button onClick={() => setIsNewDutyModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">Task Description</label>
                <input 
                  type="text" 
                  placeholder="e.g., City Driving, Highway Practice" 
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.75rem] outline-none focus:ring-1 focus:ring-teal-500" 
                  value={newDutyData.task_description} 
                  onChange={(e) => setNewDutyData({...newDutyData, task_description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.7rem] outline-none" value={newDutyData.start_date} onChange={(e) => setNewDutyData({...newDutyData, start_date: e.target.value})} />
                </div>
                <div>
                  <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">End Date</label>
                  <input type="date" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.7rem] outline-none" value={newDutyData.end_date} onChange={(e) => setNewDutyData({...newDutyData, end_date: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">Start Time</label>
                  <input type="time" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.7rem] outline-none" value={newDutyData.start_time} onChange={(e) => setNewDutyData({...newDutyData, start_time: e.target.value})} />
                </div>
                <div>
                  <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">End Time</label>
                  <input type="time" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.7rem] outline-none" value={newDutyData.end_time} onChange={(e) => setNewDutyData({...newDutyData, end_time: e.target.value})} />
                </div>
              </div>
              <button onClick={handleSaveDuty} className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all mt-2">
                {isEditMode ? "Update Block" : "Create Block"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASSIGN/EDIT STUDENT SESSION */}
      {isAssignModalOpen && selectedForSession && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                {editingAssignment ? "Edit Session" : "Assign Student"}
              </h3>
              <button onClick={() => setIsAssignModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-[0.6rem] font-soro text-slate-500">Student</p>
                <p className="text-sm font-medium text-slate-800 dark:text-white">{selectedForSession.user?.name}</p>
              </div>
              <div>
                <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">Session Date</label>
                <input type="date" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.75rem] outline-none" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">Start Time</label>
                  <input type="time" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.7rem] outline-none" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} />
                </div>
                <div>
                  <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">End Time</label>
                  <input type="time" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.7rem] outline-none" value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="text-[0.6rem] font-soro font-semibold text-slate-500 mb-1 block">Pickup Location</label>
                <input type="text" placeholder="Pickup address" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.75rem] outline-none" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>
              <button onClick={handleSaveAssignment} className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all mt-2">
                {editingAssignment ? "Update Session" : "Confirm Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;