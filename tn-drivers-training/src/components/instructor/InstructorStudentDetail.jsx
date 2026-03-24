// import React, { useState } from "react";
// import { 
//   X, Mail, CheckCircle, XCircle, Save, 
//   Clock, Edit2, Check, Calendar, FileText, 
//   MapPin, History, Plus, Award, MessageSquare
// } from "lucide-react";

// export default function InstructorStudentDetail({ student, onClose }) {
//   const [activeTab, setActiveTab] = useState("Overview");
  
//   const [progress, setProgress] = useState(student.progress || 0);
//   const [isEditingProgress, setIsEditingProgress] = useState(false);
  
//   const [evaluations, setEvaluations] = useState([
//     { 
//       id: 1, 
//       title: "Lane Discipline", 
//       score: 4, 
//       remark: "Maintains position well, but needs quicker mirror checks.",
//       studentFeedback: "I find it hard to judge the distance in the side mirrors while moving fast."
//     },
//     { 
//       id: 2, 
//       title: "Parallel Parking", 
//       score: 3, 
//       remark: "Good understanding of steps, work on curb distance.",
//       studentFeedback: "The reference points are helping, but I get confused when there's a car behind me."
//     }
//   ]);

//   const [editingEvalId, setEditingEvalId] = useState(null);
//   const [tempEval, setTempEval] = useState({ score: 0, remark: "" });

//   const evaluationOptions = [
//     "Mirror Checks", "Lane Discipline", "Parallel Parking", 
//     "Highway Merging", "Blind Spot Observation", 
//     "Emergency Braking", "Intersection Safety"
//   ];
//   const [newEval, setNewEval] = useState({ title: evaluationOptions[0], score: 5, remark: "" });

//   const [sessions, setSessions] = useState([
//     { id: 101, date: "2026-02-25", time: "10:00 AM", pickup: "Student Residence", session: "Highway Merging Prep", status: "Upcoming", notes: "" },
//     { id: 102, date: "2026-02-28", time: "02:30 PM", pickup: "Downtown Library", session: "Mock Road Test", status: "Upcoming", notes: "" },
//     { id: 103, date: "2026-02-20", time: "09:00 AM", pickup: "Student Residence", session: "Intersection Safety", status: "Completed", attendance: "Present", notes: "Excellent spatial awareness." },
//   ]);
//   const [activeSessionId, setActiveSessionId] = useState(null);
//   const [editFields, setEditFields] = useState({ notes: "" });

//   const handleSaveEvalEdit = (id) => {
//     setEvaluations(prev => prev.map(ev => 
//       ev.id === id ? { ...ev, score: tempEval.score, remark: tempEval.remark } : ev
//     ));
//     setEditingEvalId(null);
//   };

//   const handleAddNewEval = (e) => {
//     e.preventDefault();
//     setEvaluations([...evaluations, { ...newEval, id: Date.now() }]);
//     setNewEval({ title: evaluationOptions[0], score: 5, remark: "" });
//     setActiveTab("Overview");
//   };

//   const markAttendance = (id, status) => {
//     setSessions(prev => prev.map(s => 
//       s.id === id ? { ...s, status: "Completed", attendance: status } : s
//     ));
//   };

//   const saveSessionDetails = (id) => {
//     setSessions(prev => prev.map(s => 
//       s.id === id ? { ...s, notes: editFields.notes } : s
//     ));
//     setActiveSessionId(null);
//   };

//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 font-['Lexend']">
//       <div className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[95vh] sm:h-[92vh] rounded-4xl sm:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800">
        
//         {/* HEADER - Responsive Flex */}
//         <header className="p-6 sm:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-slate-900 shrink-0 gap-4">
//           <div className="flex items-center gap-4 sm:gap-8">
//             <div className="size-16 sm:size-24 rounded-2xl sm:rounded-4xl bg-indigo-600 flex items-center justify-center text-2xl sm:text-4xl font-black text-white shadow-xl shrink-0">{student.name.charAt(0)}</div>
//             <div className="space-y-1 sm:space-y-2">
//               <div className="flex flex-wrap gap-2">
//                 <span className="px-3 sm:px-4 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[8px] sm:text-[10px] font-black uppercase tracking-widest border border-indigo-100">{student.licenseClass || "Class 7 L"}</span>
//                 <span className="px-3 sm:px-4 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[8px] sm:text-[10px] font-black uppercase tracking-widest border border-emerald-100">{student.paymentStatus || "Paid"}</span>
//               </div>
//               <h2 className="text-2xl sm:text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{student.name}</h2>
//               <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium truncate max-w-50 sm:max-w-none">
//                 <Mail size={14} className="text-indigo-500 shrink-0" />
//                 <span className="dark:text-slate-300 truncate">{student.email}</span>
//               </div>
//             </div>
//           </div>
//           <button onClick={onClose} className="absolute sm:relative top-6 right-6 sm:top-0 sm:right-0 p-2 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-xl sm:rounded-2xl text-slate-400 hover:text-rose-500 transition-all"><X size={24} /></button>
//         </header>

//         {/* NAVIGATION - Responsive Scrollable */}
//         <nav className="flex px-4 sm:px-12 border-b border-slate-50 dark:border-slate-800 gap-4 sm:gap-12 bg-slate-50/30 dark:bg-slate-950/20 overflow-x-auto no-scrollbar">
//           {["Overview", "Attendance and History", "Skill Evaluation"].map(tab => (
//             <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 sm:py-6 text-[9px] sm:text-[11px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${activeTab === tab ? "text-indigo-600" : "text-slate-400 dark:text-slate-500"}`}>
//               {tab}
//               {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />}
//             </button>
//           ))}
//         </nav>

//         {/* CONTENT - Responsive Padding */}
//         <div className="flex-1 overflow-y-auto p-4 sm:p-10 custom-scrollbar">
          
//           {/* 1. OVERVIEW */}
//           {activeTab === "Overview" && (
//             <div className="space-y-6 sm:space-y-10 animate-in fade-in duration-300">
//               <section className="bg-indigo-50/50 dark:bg-indigo-900/10 p-6 sm:p-10 rounded-4xl sm:rounded-[3rem] border border-indigo-100/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//                 <div className="flex-1 w-full max-w-xl">
//                   <h4 className="text-[10px] font-black text-indigo-600 uppercase mb-4 tracking-widest">Training Progress</h4>
//                   <div className="flex items-end gap-4 mb-4">
//                     <span className="text-4xl sm:text-6xl font-black text-slate-800 dark:text-white">{progress}%</span>
//                     <button onClick={() => setIsEditingProgress(!isEditingProgress)} className="mb-2 p-2 bg-white dark:bg-slate-800 rounded-lg text-indigo-600 shadow-sm transition-all active:scale-95">
//                       {isEditingProgress ? <Check size={16}/> : <Edit2 size={16}/>}
//                     </button>
//                   </div>
//                   {isEditingProgress ? (
//                     <input type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(e.target.value)} className="w-full accent-indigo-600 h-2 bg-white dark:bg-slate-700 rounded-full appearance-none cursor-pointer" />
//                   ) : (
//                     <div className="w-full bg-white dark:bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
//                       <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
//                     </div>
//                   )}
//                 </div>
//               </section>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
//                 {evaluations.map((ev) => (
//                   <div key={ev.id} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-4xl sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 sm:space-y-6 group relative">
//                     <div className="flex justify-between items-start">
//                       <h4 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">{ev.title}</h4>
//                       <div className="flex items-center gap-2 sm:gap-3">
//                         <span className="text-2xl sm:text-3xl font-black text-indigo-600">{ev.score}<span className="text-sm text-slate-300">/5</span></span>
//                         <button onClick={() => { setEditingEvalId(ev.id); setTempEval({ score: ev.score, remark: ev.remark }); }} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-slate-50 dark:bg-slate-700 rounded-lg text-indigo-600"><Edit2 size={14}/></button>
//                       </div>
//                     </div>
                    
//                     {editingEvalId === ev.id ? (
//                       <div className="space-y-4">
//                         <input type="number" min="1" max="5" value={tempEval.score} onChange={(e) => setTempEval({...tempEval, score: parseInt(e.target.value)})} className="w-full p-3 rounded-xl border border-indigo-100 bg-slate-50 dark:bg-slate-900 font-bold text-indigo-600 dark:text-white outline-none" />
//                         <textarea value={tempEval.remark} onChange={(e) => setTempEval({...tempEval, remark: e.target.value})} className="w-full p-4 rounded-xl border border-indigo-100 bg-slate-50 dark:bg-slate-900 text-sm dark:text-white outline-none" rows={3} />
//                         <button onClick={() => handleSaveEvalEdit(ev.id)} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest">Update Assessment</button>
//                       </div>
//                     ) : (
//                       <>
//                         <div className="flex gap-1.5 sm:gap-2">
//                           {[1, 2, 3, 4, 5].map((step) => (
//                             <div key={step} className={`h-1.5 sm:h-2 flex-1 rounded-full ${step <= ev.score ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-700'}`} />
//                           ))}
//                         </div>
//                         <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
//                           <p className="text-[9px] font-black text-indigo-600 uppercase mb-2 tracking-widest">Instructor Remark</p>
//                           <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic">"{ev.remark}"</p>
//                         </div>
//                         <div className="p-4 sm:p-6 bg-emerald-50/30 dark:bg-emerald-900/5 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
//                           <div className="flex items-center gap-2 mb-2">
//                             <MessageSquare size={14} className="text-emerald-500" />
//                             <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Student Feedback</p>
//                           </div>
//                           <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">"{ev.studentFeedback || "No feedback yet."}"</p>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* 2. ATTENDANCE & HISTORY */}
//           {activeTab === "Attendance and History" && (
//             <div className="space-y-10 sm:space-y-12 animate-in slide-in-from-left-4">
//               <section className="space-y-4 sm:space-y-6">
//                 <div className="flex items-center gap-3 ml-1 sm:ml-2">
//                   <Calendar className="text-indigo-600" size={20}/>
//                   <h3 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Upcoming Sessions</h3>
//                 </div>
//                 <div className="grid gap-4">
//                   {sessions.filter(s => s.status === "Upcoming").map(s => (
//                     <div key={s.id} className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-2xl sm:rounded-[2.5rem] border-2 border-indigo-50 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between shadow-sm gap-6">
//                       <div className="flex items-center gap-4 sm:gap-6">
//                         <div className="size-12 sm:size-14 rounded-xl sm:rounded-2xl bg-indigo-50 dark:bg-indigo-900 text-indigo-600 flex items-center justify-center font-black text-xs sm:text-base shrink-0">#{s.id}</div>
//                         <div className="space-y-1">
//                           <p className="text-base sm:text-lg font-black text-slate-800 dark:text-white uppercase truncate max-w-50 sm:max-w-none">{s.session}</p>
//                           <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
//                             <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500"><Clock size={12}/> {s.date} @ {s.time}</span>
//                             <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-indigo-500"><MapPin size={12}/> {s.pickup}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-t lg:border-t-0 pt-4 lg:pt-0">
//                          <button onClick={() => markAttendance(s.id, "Present")} className="flex-1 lg:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-teal-500 text-white rounded-xl font-black text-[8px] sm:text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Mark Present</button>
//                          <button onClick={() => markAttendance(s.id, "Absent")} className="flex-1 lg:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-rose-500 text-white rounded-xl font-black text-[8px] sm:text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Mark Absent</button>
//                          <button onClick={() => { setActiveSessionId(s.id); setEditFields({ notes: s.notes }); }} className="p-2 sm:p-3 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shrink-0"><FileText size={18}/></button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>

//               <section className="space-y-4 sm:space-y-6">
//                 <div className="flex items-center gap-3 ml-1 sm:ml-2">
//                   <History className="text-slate-400" size={20}/>
//                   <h3 className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Completed Sessions</h3>
//                 </div>
//                 <div className="grid gap-4 opacity-75">
//                   {sessions.filter(s => s.status === "Completed").map(s => (
//                     <div key={s.id} className="p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-900/20 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                       <div className="flex items-center gap-4 sm:gap-6">
//                         <div className={`size-12 sm:size-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-black shrink-0 ${s.attendance === 'Present' ? 'bg-teal-50 text-teal-600' : 'bg-rose-50 text-rose-600'}`}>
//                           {s.attendance === 'Present' ? <CheckCircle size={20}/> : <XCircle size={20}/>}
//                         </div>
//                         <div>
//                           <p className="text-sm font-bold text-slate-800 dark:text-white uppercase">{s.session}</p>
//                           <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate max-w-37.5 sm:max-w-none">{s.date} • {s.pickup} • {s.attendance}</p>
//                         </div>
//                       </div>
//                       <div className="sm:max-w-50 lg:max-w-md text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
//                         <p className="text-[10px] sm:text-xs text-slate-400 italic">"{s.notes || "No notes recorded."}"</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             </div>
//           )}

//           {/* 3. SKILL EVALUATION FORM */}
//           {activeTab === "Skill Evaluation" && (
//             <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 pb-10">
//               <form onSubmit={handleAddNewEval} className="bg-slate-50 dark:bg-slate-800/30 p-6 sm:p-12 rounded-4xl sm:rounded-[3rem] border border-slate-100 dark:border-slate-800 space-y-6 sm:space-y-8 shadow-sm">
//                 <div className="text-center space-y-1 sm:space-y-2 mb-4 sm:mb-8">
//                    <h3 className="text-xl sm:text-3xl font-black italic uppercase tracking-tighter text-slate-800 dark:text-white">New Evaluation</h3>
//                    <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest sm:tracking-[0.2em] text-indigo-600">Add a new skill assessment category</p>
//                 </div>
                
//                 <div className="space-y-1 sm:space-y-2">
//                   <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-400 ml-1">Category Title</label>
//                   <select 
//                     value={newEval.title} 
//                     onChange={(e) => setNewEval({...newEval, title: e.target.value})} 
//                     className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs sm:text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
//                   >
//                     {evaluationOptions.map(option => (
//                       <option key={option} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
//                   <div className="space-y-1 sm:space-y-2">
//                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-400 ml-1">Score (1-5)</label>
//                     <input 
//                       type="number" min="1" max="5" 
//                       value={newEval.score} 
//                       onChange={(e) => setNewEval({...newEval, score: parseInt(e.target.value)})} 
//                       className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-black text-lg sm:text-xl outline-none" 
//                     />
//                   </div>
//                   <div className="flex items-end pb-2 sm:pb-4 overflow-hidden">
//                      <div className="flex gap-1.5 sm:gap-2">
//                        {[1, 2, 3, 4, 5].map(b => <div key={b} className={`h-1.5 sm:h-2 w-6 sm:w-8 rounded-full ${b <= newEval.score ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`} />)}
//                      </div>
//                   </div>
//                 </div>

//                 <div className="space-y-1 sm:space-y-2">
//                   <label className="text-[9px] sm:text-[10px] font-black uppercase text-slate-400 ml-1">Instructor Remarks</label>
//                   <textarea 
//                     rows={4} 
//                     value={newEval.remark} 
//                     onChange={(e) => setNewEval({...newEval, remark: e.target.value})} 
//                     className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-white text-xs sm:text-sm outline-none" 
//                     placeholder="Feedback..." required 
//                   />
//                 </div>
//                 <button type="submit" className="w-full py-3 sm:py-4 bg-indigo-600 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95">Save New Evaluation</button>
//               </form>
//             </div>
//           )}
//         </div>

//         {/* SESSION DETAIL MODAL - Fully Responsive */}
//         {activeSessionId && (
//           <div className="fixed inset-0 z-120 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-6">
//             <div className="bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-2xl sm:rounded-[3rem] shadow-2xl w-full max-w-lg border border-indigo-100 dark:border-indigo-900">
//                <h3 className="text-lg sm:text-xl font-black uppercase italic mb-4 sm:mb-6 text-slate-800 dark:text-white">Edit Session Details</h3>
//                <div className="space-y-4 sm:space-y-6">
//                  <div>
//                    <label className="text-[8px] sm:text-[10px] font-black uppercase text-slate-400 mb-1 sm:mb-2 block tracking-widest">Pickup Location</label>
//                    <div className="w-full p-3 sm:p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-300 italic truncate">
//                      {sessions.find(s => s.id === activeSessionId)?.pickup}
//                    </div>
//                  </div>
//                  <div>
//                    <label className="text-[8px] sm:text-[10px] font-black uppercase text-slate-400 mb-1 sm:mb-2 block tracking-widest">Instructor Remarks</label>
//                    <textarea 
//                     value={editFields.notes} 
//                     onChange={(e) => setEditFields({...editFields, notes: e.target.value})} 
//                     className="w-full p-3 sm:p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-none outline-none text-xs sm:text-sm font-medium text-slate-800 dark:text-white ring-1 ring-slate-100 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-500" 
//                     rows={4} 
//                     placeholder="Session feedback..." 
//                   />
//                  </div>
//                </div>
//                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6 sm:mt-8">
//                  <button onClick={() => setActiveSessionId(null)} className="py-3 sm:py-4 text-[9px] sm:text-[10px] font-black uppercase text-slate-400 order-2 sm:order-1">Cancel</button>
//                  <button onClick={() => saveSessionDetails(activeSessionId)} className="flex-1 py-3 sm:py-4 bg-indigo-600 text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest order-1 sm:order-2 shadow-lg active:scale-95 transition-all">Save Notes</button>
//                </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


























import React, { useState } from "react";
import { 
  X, Mail, CheckCircle, XCircle, 
  Clock, Calendar, FileText, 
  MapPin, History, Award, Edit2,
  Loader2, AlertCircle, User,
  Phone, BookOpen, Save, MessageSquare,
  Star, Calendar as CalendarIcon
} from "lucide-react";

// Dummy data for the student
const dummyStudent = {
  id: 1,
  name: "James Harrison",
  email: "james.harrison@email.com",
  phone: "(709) 555-0123",
  studentId: "STU-001",
  package: "Full GDL Bundle",
  progress: 65,
  status: "Active",
  payment: "Balance Due",
  location: "St. John's",
  address: "123 Main Street",
  city: "St. John's"
};

// Dummy attendance history
const dummyAttendanceHistory = [
  {
    id: 101,
    date: "2026-03-15",
    start_time: "10:00",
    end_time: "11:30",
    student_location: "123 Main Street, St. John's",
    attendance: { status: "present" },
    schedule: { task_description: "Highway Driving" },
    evaluation: { id: 1, score: 85, instructor_remarks: "Good progress, needs more confidence on merging." }
  },
  {
    id: 102,
    date: "2026-03-12",
    start_time: "14:00",
    end_time: "15:30",
    student_location: "123 Main Street, St. John's",
    attendance: { status: "present" },
    schedule: { task_description: "Parallel Parking" },
    evaluation: { id: 2, score: 78, instructor_remarks: "Good understanding of steps, work on curb distance." }
  },
  {
    id: 103,
    date: "2026-03-08",
    start_time: "09:00",
    end_time: "10:30",
    student_location: "123 Main Street, St. John's",
    attendance: { status: "absent" },
    schedule: { task_description: "City Driving" },
    evaluation: null
  },
  {
    id: 104,
    date: "2026-03-05",
    start_time: "13:00",
    end_time: "14:30",
    student_location: "123 Main Street, St. John's",
    attendance: { status: "present" },
    schedule: { task_description: "Lane Discipline" },
    evaluation: { id: 3, score: 92, instructor_remarks: "Excellent lane discipline and mirror checks." }
  }
];

// Dummy upcoming sessions
const dummyUpcomingSessions = [
  {
    id: 201,
    date: "2026-03-22",
    start_time: "10:00",
    end_time: "11:30",
    student_location: "123 Main Street, St. John's",
    schedule: { task_description: "Highway Merging" }
  },
  {
    id: 202,
    date: "2026-03-24",
    start_time: "14:00",
    end_time: "15:30",
    student_location: "123 Main Street, St. John's",
    schedule: { task_description: "Emergency Braking" }
  },
  {
    id: 203,
    date: "2026-03-26",
    start_time: "09:00",
    end_time: "11:00",
    student_location: "123 Main Street, St. John's",
    schedule: { task_description: "Mock Road Test" }
  }
];

export default function InstructorStudentDetail({ student = dummyStudent, onClose }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Student data - using dummy data
  const [attendanceHistory, setAttendanceHistory] = useState(dummyAttendanceHistory);
  const [upcomingSessions, setUpcomingSessions] = useState(dummyUpcomingSessions);
  const [evaluations, setEvaluations] = useState(
    dummyAttendanceHistory
      .filter(a => a.evaluation)
      .map(a => ({
        id: a.evaluation.id,
        assignment_id: a.id,
        date: a.date,
        test_type: a.schedule?.task_description || 'Assessment',
        score: a.evaluation.score,
        remarks: a.evaluation.instructor_remarks,
      }))
  );
  const [progress, setProgress] = useState(student.progress || 65);
  
  // Edit states
  const [isEditingProgress, setIsEditingProgress] = useState(false);
  const [editedProgress, setEditedProgress] = useState(progress);
  const [saving, setSaving] = useState(false);
  
  // Evaluation states
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [isEditingEvaluation, setIsEditingEvaluation] = useState(false);
  const [evaluationForm, setEvaluationForm] = useState({
    score: 0,
    remarks: "",
    test_type: ""
  });

  // Save progress
  const saveProgress = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setProgress(editedProgress);
      setIsEditingProgress(false);
      setSaving(false);
      alert("Progress updated successfully!");
    }, 500);
  };

  // Handle progress change
  const handleProgressChange = (value) => {
    const newProgress = parseInt(value) || 0;
    const safeProgress = Math.min(100, Math.max(0, newProgress));
    setEditedProgress(safeProgress);
  };

  // Open evaluation editor
  const openEvaluationEditor = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setEvaluationForm({
      score: evaluation.score || 0,
      remarks: evaluation.remarks || "",
      test_type: evaluation.test_type || ""
    });
    setIsEditingEvaluation(true);
  };

  // Save evaluation
  const saveEvaluation = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setEvaluations(prev => prev.map(e => 
        e.id === selectedEvaluation.id 
          ? { ...e, ...evaluationForm }
          : e
      ));
      setIsEditingEvaluation(false);
      setSelectedEvaluation(null);
      setSaving(false);
      alert("Evaluation updated successfully!");
    }, 500);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl">
          <Loader2 className="animate-spin text-teal-600 mx-auto mb-4" size={48} />
          <p className="text-sm font-['DM_Sans'] font-medium text-gray-600 dark:text-gray-300">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl text-center max-w-md">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <p className="text-sm font-['DM_Sans'] font-medium text-red-600 mb-4">{error}</p>
          <button onClick={onClose} className="px-6 py-2 bg-teal-600 text-white rounded-lg text-xs font-['DM_Mono'] font-bold">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[95vh] sm:h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* HEADER */}
        <header className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-slate-900 shrink-0 gap-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="size-16 sm:size-20 rounded-2xl bg-teal-600 flex items-center justify-center text-2xl sm:text-3xl font-['Sora'] font-bold text-white shadow-xl shrink-0">
              {student.name?.charAt(0) || '?'}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 rounded-lg text-[8px] sm:text-[9px] font-['DM_Mono'] font-bold uppercase tracking-wider border border-teal-100 dark:border-teal-800">
                  {student.package || "Standard Package"}
                </span>
                <span className={`px-3 py-1 rounded-lg text-[8px] sm:text-[9px] font-['DM_Mono'] font-bold uppercase tracking-wider border ${
                  student.payment === 'Paid' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {student.payment || "Balance Due"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-['Sora'] font-bold text-slate-800 dark:text-white tracking-tight">
                {student.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-slate-500 text-xs sm:text-sm font-['DM_Sans']">
                <div className="flex items-center gap-1">
                  <Mail size={12} className="text-teal-500" />
                  <span>{student.email}</span>
                </div>
                {student.phone && (
                  <div className="flex items-center gap-1">
                    <Phone size={12} className="text-teal-500" />
                    <span>{student.phone}</span>
                  </div>
                )}
                {student.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-teal-500" />
                    <span>{student.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="absolute sm:relative top-4 right-4 sm:top-0 sm:right-0 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-500 transition-all"
          >
            <X size={20} />
          </button>
        </header>

        {/* TABS */}
        <nav className="flex px-6 sm:px-8 border-b border-slate-100 dark:border-slate-800 gap-4 sm:gap-6 bg-slate-50/30 dark:bg-slate-950/20 overflow-x-auto no-scrollbar">
          {["Overview", "Upcoming", "Evaluations", "History"].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`py-4 text-[10px] sm:text-[11px] font-['DM_Mono'] font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                activeTab === tab ? "text-teal-600" : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 rounded-t-full" />}
            </button>
          ))}
        </nav>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
          
          {/* OVERVIEW TAB */}
          {activeTab === "Overview" && (
            <div className="space-y-8">
              {/* Progress Card */}
              <div className="bg-teal-50/30 dark:bg-teal-950/20 p-8 rounded-2xl border border-teal-100 dark:border-teal-800/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-['DM_Mono'] font-bold text-teal-600 uppercase tracking-wider">Training Progress</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-['Sora'] font-bold text-teal-600">
                      {isEditingProgress ? editedProgress : progress}%
                    </span>
                    {!isEditingProgress ? (
                      <button 
                        onClick={() => {
                          setEditedProgress(progress);
                          setIsEditingProgress(true);
                        }}
                        className="p-2 bg-white dark:bg-slate-800 rounded-lg text-teal-600 hover:bg-teal-50 transition-all"
                        title="Edit Progress"
                      >
                        <Edit2 size={16} />
                      </button>
                    ) : (
                      <button 
                        onClick={saveProgress}
                        disabled={saving}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
                        title="Save Progress"
                      >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                {isEditingProgress ? (
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={editedProgress || 0} 
                      onChange={(e) => handleProgressChange(e.target.value)}
                      className="w-full accent-teal-600 h-3 bg-white dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {
                          setIsEditingProgress(false);
                          setEditedProgress(progress);
                        }}
                        className="px-4 py-2 text-sm font-['DM_Sans'] font-medium text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-full bg-white dark:bg-slate-800 h-3 rounded-full overflow-hidden mb-4">
                      <div 
                        className="bg-teal-500 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-center text-sm font-['DM_Sans']">
                      <span className="font-medium text-slate-600 dark:text-slate-400">
                        Overall Progress: <span className="font-bold text-teal-600">{progress}%</span> complete
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Package and Student Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen size={18} className="text-teal-600" />
                    <h4 className="text-xs font-['DM_Mono'] font-bold text-slate-400 uppercase">Package Details</h4>
                  </div>
                  <p className="text-lg font-['Sora'] font-bold text-slate-800 dark:text-white mb-2">{student.package}</p>
                </div>

                <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <User size={18} className="text-teal-600" />
                    <h4 className="text-xs font-['DM_Mono'] font-bold text-slate-400 uppercase">Student Info</h4>
                  </div>
                  <p className="text-sm font-['DM_Sans'] text-slate-600 dark:text-slate-300 mb-1">ID: STU-{String(student.id).padStart(3, '0')}</p>
                  <p className="text-sm font-['DM_Sans'] text-slate-600 dark:text-slate-300">Location: {student.location || 'N/A'}</p>
                </div>
              </div>

              {/* Recent Evaluations Preview */}
              {evaluations.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h4 className="text-xs font-['DM_Mono'] font-bold text-slate-400 uppercase mb-4">Recent Evaluations</h4>
                  <div className="space-y-3">
                    {evaluations.slice(0, 2).map(evalItem => (
                      <div key={evalItem.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <div>
                          <p className="text-sm font-['DM_Sans'] font-semibold text-slate-800 dark:text-white">{evalItem.test_type}</p>
                          <p className="text-xs font-['DM_Mono'] text-slate-500">{evalItem.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-['Sora'] font-bold text-teal-600">{Math.round(evalItem.score)}%</span>
                          <button 
                            onClick={() => {
                              setActiveTab("Evaluations");
                              openEvaluationEditor(evalItem);
                            }}
                            className="p-1.5 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-lg hover:bg-teal-200"
                          >
                            <Edit2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* UPCOMING SESSIONS TAB */}
          {activeTab === "Upcoming" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <CalendarIcon size={18} className="text-teal-600" />
                <h3 className="text-xs font-['DM_Mono'] font-bold text-slate-400 uppercase tracking-wider">Upcoming Sessions</h3>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-teal-100 dark:border-teal-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center font-['Sora'] font-bold">
                          {new Date(session.date).getDate()}
                        </div>
                        <div>
                          <p className="text-base font-['Sora'] font-bold text-slate-800 dark:text-white">
                            {session.schedule?.task_description || 'Driving Lesson'}
                          </p>
                          <div className="flex flex-wrap gap-3 mt-1">
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Calendar size={12} /> {session.date}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-500">
                              <Clock size={12} /> {session.start_time} - {session.end_time}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-teal-500">
                              <MapPin size={12} /> {session.student_location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 rounded-full text-[10px] font-['DM_Mono'] font-bold uppercase tracking-wider self-start sm:self-center">
                        Upcoming
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <CalendarIcon size={40} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-sm font-['DM_Sans'] font-medium text-slate-400">No upcoming sessions</p>
                </div>
              )}
            </div>
          )}

          {/* EVALUATIONS TAB */}
          {activeTab === "Evaluations" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-teal-600" />
                <h3 className="text-xs font-['DM_Mono'] font-bold text-slate-400 uppercase tracking-wider">Student Evaluations</h3>
              </div>

              {evaluations.length > 0 ? (
                <div className="space-y-4">
                  {evaluations.map((evalItem) => (
                    <div key={evalItem.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                      
                      <div className="p-5 bg-slate-50 dark:bg-slate-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="size-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                            <Award size={18} className="text-teal-600" />
                          </div>
                          <div>
                            <h4 className="font-['Sora'] font-bold text-slate-800 dark:text-white">{evalItem.test_type}</h4>
                            <p className="text-xs font-['DM_Mono'] text-slate-500">{evalItem.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-2xl font-['Sora'] font-bold text-teal-600">{Math.round(evalItem.score)}</span>
                            <span className="text-sm text-slate-400">/100</span>
                          </div>
                          <button 
                            onClick={() => openEvaluationEditor(evalItem)}
                            className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-lg hover:bg-teal-200 transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="bg-teal-50/30 dark:bg-teal-950/20 p-4 rounded-lg border border-teal-100 dark:border-teal-800/30">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare size={14} className="text-teal-600" />
                            <span className="text-[10px] font-['DM_Mono'] font-bold text-teal-600 uppercase tracking-wider">Instructor Remarks</span>
                          </div>
                          <p className="text-sm font-['DM_Sans'] text-slate-600 dark:text-slate-300 italic">
                            "{evalItem.remarks || 'No remarks added'}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <Star size={40} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-sm font-['DM_Sans'] font-medium text-slate-400">No evaluations found</p>
                </div>
              )}
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === "History" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <History size={18} className="text-teal-600" />
                <h3 className="text-xs font-['DM_Mono'] font-bold text-slate-400 uppercase tracking-wider">Session History</h3>
              </div>

              {attendanceHistory.length > 0 ? (
                <div className="space-y-3">
                  {attendanceHistory.map((session) => (
                    <div 
                      key={session.id} 
                      className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${
                          session.attendance?.status === 'present' 
                            ? 'bg-teal-50 text-teal-600' 
                            : 'bg-rose-50 text-rose-600'
                        }`}>
                          {session.attendance?.status === 'present' 
                            ? <CheckCircle size={18} /> 
                            : <XCircle size={18} />
                          }
                        </div>
                        <div>
                          <p className="text-sm font-['DM_Sans'] font-semibold text-slate-800 dark:text-white">
                            {session.schedule?.task_description || 'Driving Lesson'}
                          </p>
                          <div className="flex flex-wrap items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[10px] font-['DM_Mono'] font-bold text-slate-500">
                              <Calendar size={10} /> {session.date}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-['DM_Mono'] font-bold text-slate-500">
                              <Clock size={10} /> {session.start_time} - {session.end_time}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-['DM_Mono'] font-bold text-teal-500">
                              <MapPin size={10} /> {session.student_location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 border-t sm:border-t-0 pt-3 sm:pt-0">
                        <span className={`px-3 py-1 rounded-full text-[8px] font-['DM_Mono'] font-bold uppercase ${
                          session.attendance?.status === 'present' 
                            ? 'bg-teal-100 text-teal-700' 
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          {session.attendance?.status || 'Unknown'}
                        </span>
                        {session.evaluation && (
                          <button
                            onClick={() => {
                              const evalItem = evaluations.find(e => e.assignment_id === session.id);
                              if (evalItem) {
                                setActiveTab("Evaluations");
                                openEvaluationEditor(evalItem);
                              }
                            }}
                            className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-[8px] font-['DM_Mono'] font-bold uppercase hover:bg-teal-200 transition-colors"
                          >
                            View Score
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                  <History size={40} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-sm font-['DM_Sans'] font-medium text-slate-400">No attendance history found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-['DM_Mono'] font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Evaluation Edit Modal */}
      {isEditingEvaluation && selectedEvaluation && (
        <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-2xl shadow-2xl border border-teal-100 dark:border-teal-900 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-['Sora'] font-bold uppercase text-teal-600">Edit Evaluation</h3>
              <button 
                onClick={() => {
                  setIsEditingEvaluation(false);
                  setSelectedEvaluation(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-['DM_Mono'] font-bold uppercase text-slate-400 mb-2 block">Test Type</label>
                <input 
                  type="text"
                  value={evaluationForm.test_type}
                  onChange={(e) => setEvaluationForm({...evaluationForm, test_type: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-['DM_Sans']"
                />
              </div>

              <div>
                <label className="text-xs font-['DM_Mono'] font-bold uppercase text-slate-400 mb-2 block">Score (0-100)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100"
                    value={evaluationForm.score}
                    onChange={(e) => setEvaluationForm({...evaluationForm, score: parseInt(e.target.value) || 0})}
                    className="flex-1 accent-teal-600"
                  />
                  <span className="text-2xl font-['Sora'] font-bold text-teal-600 w-16 text-center">
                    {evaluationForm.score}%
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-['DM_Mono'] font-bold uppercase text-slate-400 mb-2 block">Instructor Remarks</label>
                <textarea 
                  rows={4}
                  value={evaluationForm.remarks}
                  onChange={(e) => setEvaluationForm({...evaluationForm, remarks: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-['DM_Sans']"
                  placeholder="Add your feedback..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => {
                    setIsEditingEvaluation(false);
                    setSelectedEvaluation(null);
                  }}
                  className="flex-1 py-3 text-sm font-['DM_Sans'] font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveEvaluation}
                  disabled={saving}
                  className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-['DM_Mono'] font-bold text-sm hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}