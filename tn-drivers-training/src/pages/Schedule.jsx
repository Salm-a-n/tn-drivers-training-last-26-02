// import React, { useState, useMemo } from "react";
// import { 
//   MapPin, Calendar as CalendarIcon, Search, X, 
//   Clock, AlertCircle, CheckCircle2, Edit3, Trash2, 
//   Users, ChevronRight, ArrowLeft, UserPlus, 
//   Filter, History, Settings2, PlusCircle, Save,
//   CalendarDays
// } from "lucide-react";

// import Pagination from "../components/Pagination";

// const Schedule = () => {
//   // --- 1. DUMMY DATA (Matching API Structure) ---
//   const [allLocations] = useState([
//     { id: 1, province_name: "Burin" },
//     { id: 2, province_name: "Grand Falls" },
//     { id: 3, province_name: "Marystown" },
//     { id: 4, province_name: "St. John's" },
//     { id: 5, province_name: "Mount Pearl" }
//   ]);

//   const [instructors, setInstructors] = useState([
//     { 
//       id: 1, 
//       name: "John Doe", 
//       place: "St. John's",
//       location_id: 4,
//       workBlocks: [
//         { id: 101, task: "City Driving", start: "2026-03-01", end: "2026-03-15", startTime: "09:00", endTime: "17:00", location_id: 4 }
//       ]
//     },
//     { 
//       id: 2, 
//       name: "Jane Smith", 
//       place: "Marystown",
//       location_id: 3,
//       workBlocks: [
//         { id: 201, task: "Parking Drills", start: "2026-03-01", end: "2026-03-07", startTime: "08:00", endTime: "12:00", location_id: 3 }
//       ]
//     },
//     { 
//       id: 3, 
//       name: "Sarah Connor", 
//       place: "Burin",
//       location_id: 1,
//       workBlocks: []
//     },
//     { 
//       id: 4, 
//       name: "Mike Ross", 
//       place: "Grand Falls",
//       location_id: 2,
//       workBlocks: [
//         { id: 401, task: "Mock Road Test", start: "2026-03-05", end: "2026-03-20", startTime: "13:00", endTime: "18:00", location_id: 2 }
//       ]
//     }
//   ]);

//   const [availableStudents] = useState([
//     { id: 1, user: { name: "Muhammed Salman" }, street_address: "Residence Lot 4, Burin", location: "Burin" },
//     { id: 2, user: { name: "Alex Rivera" }, street_address: "Heritage Museum, Marystown", location: "Marystown" },
//     { id: 3, user: { name: "Sam Chen" }, street_address: "Main Gate, Grand Falls", location: "Grand Falls" },
//     { id: 4, user: { name: "Yuki Tanaka" }, street_address: "Epworth Well, St. John's", location: "St. John's" },
//     { id: 5, user: { name: "Jordan Lee" }, street_address: "Downtown Mall, Mount Pearl", location: "Mount Pearl" },
//   ]);

//   const [blockAssignments, setBlockAssignments] = useState([
//     { id: 1001, student_id: 1, student: { user: { name: "Muhammed Salman" } }, student_location: "Residence Lot 4", date: "2026-03-02", start_time: "09:00", end_time: "10:00", schedule_id: 101, attendance: null },
//     { id: 1002, student_id: 2, student: { user: { name: "Alex Rivera" } }, student_location: "Heritage Museum", date: "2026-03-03", start_time: "10:00", end_time: "11:00", schedule_id: 101, attendance: null },
//     { id: 1003, student_id: 3, student: { user: { name: "Sam Chen" } }, student_location: "Main Gate", date: "2026-03-01", start_time: "14:00", end_time: "15:00", schedule_id: 201, attendance: { id: 1, status: "Present" } }
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
//   const [activeBlockId, setActiveBlockId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Modal states
//   const [isNewDutyModalOpen, setIsNewDutyModalOpen] = useState(false);
//   const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
//   const [selectedForSession, setSelectedForSession] = useState(null);
//   const [editingAssignment, setEditingAssignment] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [editingDutyId, setEditingDutyId] = useState(null);

//   // Form data for duty block
//   const [newDutyData, setNewDutyData] = useState({
//     task_description: "",
//     start_date: "",
//     end_date: "",
//     start_time: "08:00",
//     end_time: "17:00",
//   });

//   // Form data for assignment
//   const [formData, setFormData] = useState({ 
//     date: "", 
//     startTime: "09:00", 
//     endTime: "10:00", 
//     location: "", 
//     blockId: "",
//     assignmentId: null
//   });

//   // --- 3. FILTERS & MEMO ---
//   const dynamicPlaces = useMemo(() => ["All Places", ...allLocations.map(l => l.province_name)], [allLocations]);
  
//   const instructorsList = useMemo(() => {
//     return instructors.filter(ins => 
//       (selectedPlace === "All Places" || ins.place === selectedPlace) && 
//       ins.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [selectedPlace, searchQuery, instructors]);
  
//   const paginatedInstructors = instructorsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   // Filter assignments for current block
//   const blockAssignmentsForBlock = useMemo(() => {
//     if (!activeBlockId) return [];
//     return blockAssignments.filter(a => a.schedule_id === parseInt(activeBlockId));
//   }, [blockAssignments, activeBlockId]);

//   // Students not yet assigned to current block
//   const studentsNotYetAssigned = useMemo(() => {
//     const assignedStudentIds = blockAssignmentsForBlock.map(a => a.student_id);
//     return availableStudents.filter(s => !assignedStudentIds.includes(s.id));
//   }, [availableStudents, blockAssignmentsForBlock]);

//   // Filtered available students based on search
//   const filteredAvailableStudents = useMemo(() => {
//     return studentsNotYetAssigned.filter(s => 
//       (s.user?.name || "").toLowerCase().includes(studentSearch.toLowerCase())
//     );
//   }, [studentsNotYetAssigned, studentSearch]);

//   // Active sessions (no attendance recorded yet)
//   const activeSessions = useMemo(() => {
//     return blockAssignmentsForBlock.filter(a => !a.attendance);
//   }, [blockAssignmentsForBlock]);

//   // History sessions (have attendance recorded)
//   const historySessions = useMemo(() => {
//     return blockAssignmentsForBlock.filter(a => a.attendance);
//   }, [blockAssignmentsForBlock]);

//   // Get selected block details
//   const selectedBlock = useMemo(() => {
//     if (!activeBlockId || !selectedInstructor) return null;
//     return selectedInstructor.workBlocks.find(b => b.id === parseInt(activeBlockId));
//   }, [activeBlockId, selectedInstructor]);

//   // --- 4. HANDLERS FOR DUTY BLOCKS ---
//   const handleAddDuty = () => {
//     setIsEditMode(false);
//     setEditingDutyId(null);
//     setNewDutyData({
//       task_description: "",
//       start_date: "",
//       end_date: "",
//       start_time: "08:00",
//       end_time: "17:00",
//     });
//     setIsNewDutyModalOpen(true);
//   };

//   const handleEditDuty = (block) => {
//     setIsEditMode(true);
//     setEditingDutyId(block.id);
//     setNewDutyData({
//       task_description: block.task,
//       start_date: block.start,
//       end_date: block.end,
//       start_time: block.startTime,
//       end_time: block.endTime,
//     });
//     setIsNewDutyModalOpen(true);
//   };

//   const handleSaveDuty = () => {
//     if (!newDutyData.task_description || !newDutyData.start_date || !newDutyData.end_date) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newBlock = {
//       id: isEditMode ? editingDutyId : Date.now(),
//       task: newDutyData.task_description,
//       start: newDutyData.start_date,
//       end: newDutyData.end_date,
//       startTime: newDutyData.start_time,
//       endTime: newDutyData.end_time,
//       location_id: selectedInstructor.location_id
//     };

//     if (isEditMode) {
//       setInstructors(prev => prev.map(ins => 
//         ins.id === selectedInstructor.id 
//           ? { ...ins, workBlocks: ins.workBlocks.map(b => b.id === editingDutyId ? newBlock : b) }
//           : ins
//       ));
//       setSelectedInstructor(prev => ({
//         ...prev,
//         workBlocks: prev.workBlocks.map(b => b.id === editingDutyId ? newBlock : b)
//       }));
//     } else {
//       setInstructors(prev => prev.map(ins => 
//         ins.id === selectedInstructor.id 
//           ? { ...ins, workBlocks: [...ins.workBlocks, newBlock] }
//           : ins
//       ));
//       setSelectedInstructor(prev => ({
//         ...prev,
//         workBlocks: [...prev.workBlocks, newBlock]
//       }));
//     }
    
//     setIsNewDutyModalOpen(false);
//     alert(isEditMode ? "Duty block updated!" : "Duty block created!");
//   };

//   const handleDeleteDuty = (blockId) => {
//     if (!window.confirm("Delete this duty block? All student assignments will be removed.")) return;
    
//     setBlockAssignments(prev => prev.filter(a => a.schedule_id !== blockId));
//     setInstructors(prev => prev.map(ins => 
//       ins.id === selectedInstructor.id 
//         ? { ...ins, workBlocks: ins.workBlocks.filter(b => b.id !== blockId) }
//         : ins
//     ));
//     setSelectedInstructor(prev => ({
//       ...prev,
//       workBlocks: prev.workBlocks.filter(b => b.id !== blockId)
//     }));
    
//     if (activeBlockId === blockId.toString()) {
//       setActiveBlockId("");
//     }
    
//     alert("Duty block deleted!");
//   };

//   // --- 5. HANDLERS FOR ASSIGNMENTS ---
//   const handleAssignStudent = (student) => {
//     if (!activeBlockId) {
//       alert("Please select a duty block first");
//       return;
//     }
    
//     setSelectedForSession(student);
//     setEditingAssignment(null);
//     setFormData({
//       date: selectedBlock?.start || "",
//       startTime: selectedBlock?.startTime || "09:00",
//       endTime: selectedBlock?.endTime || "10:00",
//       location: student.street_address || "",
//       blockId: activeBlockId,
//       assignmentId: null
//     });
//     setIsAssignModalOpen(true);
//   };

//   const handleEditAssignment = (assignment) => {
//     setEditingAssignment(assignment);
//     setSelectedForSession(assignment.student);
//     setFormData({
//       date: assignment.date,
//       startTime: assignment.start_time,
//       endTime: assignment.end_time,
//       location: assignment.student_location,
//       blockId: activeBlockId,
//       assignmentId: assignment.id
//     });
//     setIsAssignModalOpen(true);
//   };

//   const handleDeleteAssignment = (assignmentId) => {
//     if (!window.confirm("Remove this student from the block?")) return;
//     setBlockAssignments(prev => prev.filter(a => a.id !== assignmentId));
//   };

//   const handleCompleteSession = (assignmentId) => {
//     setBlockAssignments(prev => prev.map(a => 
//       a.id === assignmentId 
//         ? { ...a, attendance: { id: Date.now(), status: "Present" } }
//         : a
//     ));
//   };

//   const handleSaveAssignment = () => {
//     if (!formData.date) {
//       alert("Please select a date");
//       return;
//     }

//     if (editingAssignment) {
//       setBlockAssignments(prev => prev.map(a => 
//         a.id === editingAssignment.id 
//           ? { ...a, 
//               date: formData.date, 
//               start_time: formData.startTime, 
//               end_time: formData.endTime,
//               student_location: formData.location
//             }
//           : a
//       ));
//     } else {
//       const newAssignment = {
//         id: Date.now(),
//         student_id: selectedForSession.id,
//         student: selectedForSession,
//         student_location: formData.location,
//         date: formData.date,
//         start_time: formData.startTime,
//         end_time: formData.endTime,
//         schedule_id: parseInt(activeBlockId),
//         attendance: null
//       };
//       setBlockAssignments(prev => [...prev, newAssignment]);
//     }
    
//     setIsAssignModalOpen(false);
//     setSelectedForSession(null);
//     setEditingAssignment(null);
//     alert(editingAssignment ? "Session updated!" : "Student assigned!");
//   };

//   if (!instructors.length) return <div className="p-20 text-center text-slate-400">Loading schedule data...</div>;

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
//       <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <div className="max-w-[1920px] mx-auto">
          
//           {/* HEADER */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//             <div>
//               {viewMode === "manage" && (
//                 <button 
//                   onClick={() => { 
//                     setViewMode("instructors"); 
//                     setActiveBlockId(""); 
//                     setSelectedInstructor(null);
//                   }} 
//                   className="flex items-center gap-2 text-teal-600 font-semibold text-sm mb-3 hover:gap-3 transition-all"
//                 >
//                   <ArrowLeft size={16}/> Back to instructors
//                 </button>
//               )}
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
//                 Duty <span className="text-teal-600 dark:text-teal-400">{viewMode === "instructors" ? "Dispatch" : "Management"}</span>
//               </h1>
//               <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
//                 {viewMode === "instructors" ? "Manage instructor schedules and assignments" : "Configure duty blocks and student sessions"}
//               </p>
//             </div>
//             {viewMode === "instructors" && (
//               <div className="relative w-full md:w-auto md:min-w-[300px]">
//                 <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search instructors..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
//                 />
//               </div>
//             )}
//           </div>

//           {viewMode === "instructors" ? (
//             <>
//               {/* Location Filters */}
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {dynamicPlaces.map((place) => (
//                   <button 
//                     key={place} 
//                     onClick={() => setSelectedPlace(place)} 
//                     className={`px-3 py-1.5 rounded-xl text-md font-medium transition-all ${
//                       selectedPlace === place 
//                         ? "bg-teal-600 text-white shadow-sm" 
//                         : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-teal-600 border border-slate-200 dark:border-slate-700"
//                     }`}
//                   >
//                     {place}
//                   </button>
//                 ))}
//               </div>

//               {/* Instructor Cards */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                 {paginatedInstructors.map((ins) => {
//                   const hasBlocks = ins.workBlocks && ins.workBlocks.length > 0;
//                   const blockCount = hasBlocks ? ins.workBlocks.length : 0;
//                   const activeSessionsCount = blockAssignments.filter(a => 
//                     ins.workBlocks.some(b => b.id === a.schedule_id) && !a.attendance
//                   ).length;

//                   return (
//                     <div key={ins.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5">
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex gap-2">
//                           <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
//                             hasBlocks 
//                               ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" 
//                               : "bg-slate-100 dark:bg-slate-800 text-slate-500"
//                           }`}>
//                             {blockCount} Block{blockCount !== 1 ? 's' : ''}
//                           </span>
//                           {activeSessionsCount > 0 && (
//                             <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
//                               {activeSessionsCount} Active
//                             </span>
//                           )}
//                         </div>
//                         <button 
//                           onClick={() => { setSelectedInstructor(ins); setViewMode("manage"); }} 
//                           className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium transition-all"
//                         >
//                           Manage
//                         </button>
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-lg">
//                           {ins.name.charAt(0)}
//                         </div>
//                         <div>
//                           <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-teal-600 transition-colors">
//                             {ins.name}
//                           </h3>
//                           <p className="text-md font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
//                             <MapPin size={12} className="text-teal-500" /> {ins.place}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
              
//               {/* Pagination */}
//               {instructorsList.length > itemsPerPage && (
//                 <div className="flex justify-center pt-8 pb-4">
//                   <Pagination 
//                     currentPage={currentPage} 
//                     totalItems={instructorsList.length} 
//                     itemsPerPage={itemsPerPage} 
//                     onPageChange={setCurrentPage} 
//                   />
//                 </div>
//               )}
//             </>
//           ) : (
//             /* MANAGEMENT VIEW */
//             <div className="space-y-6">
              
//               {/* ADD DUTY BLOCK BUTTON */}
//               <div className="flex justify-end">
//                 <button 
//                   onClick={handleAddDuty}
//                   className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-teal-600 hover:text-white dark:hover:bg-slate-800 transition-all flex items-center gap-2"
//                 >
//                   <PlusCircle size={16} /> Add Duty Block
//                 </button>
//               </div>

//               {/* DUTY BLOCKS LIST */}
//               <div className="space-y-3">
//                 <h2 className="text-md font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
//                   Duty Blocks
//                 </h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {selectedInstructor?.workBlocks.map(block => (
//                     <div key={block.id} className={`group relative p-4 rounded-xl border transition-all duration-300 ${
//                       activeBlockId === block.id.toString() 
//                         ? "bg-teal-50 dark:bg-teal-900/20 border-teal-300 dark:border-teal-700 shadow-md" 
//                         : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md"
//                     }`}>
//                       <div className="flex-1 cursor-pointer" onClick={() => setActiveBlockId(block.id.toString())}>
//                         <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{block.task}</h4>
//                         <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
//                           {block.start} - {block.end}
//                         </p>
//                         <p className="text-sm font-mono text-slate-400 mt-1">
//                           {block.startTime} - {block.endTime}
//                         </p>
//                       </div>
//                       <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
//                         <button onClick={() => handleEditDuty(block)} className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors">
//                           <Edit3 size={14} />
//                         </button>
//                         <button onClick={() => handleDeleteDuty(block.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
//                           <Trash2 size={14} />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                   {selectedInstructor?.workBlocks.length === 0 && (
//                     <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
//                       <CalendarDays size={48} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
//                       <p className="text-sm text-slate-500">No duty blocks scheduled.</p>
//                       <button 
//                         onClick={handleAddDuty}
//                         className="mt-3 text-teal-600 font-medium text-sm hover:underline"
//                       >
//                         Click here to create one
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* DUTY BLOCK SELECTOR DROPDOWN */}
//               {selectedInstructor?.workBlocks.length > 0 && (
//                 <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
//                   <label className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
//                     Select Duty Block to Manage Assignments
//                   </label>
//                   <select 
//                     value={activeBlockId} 
//                     onChange={(e) => setActiveBlockId(e.target.value)} 
//                     className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
//                   >
//                     <option value="">Choose a block to manage assignments...</option>
//                     {selectedInstructor?.workBlocks?.map(block => (
//                       <option key={block.id} value={block.id}>
//                         {block.task} ({block.start}) • {block.startTime}-{block.endTime}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {/* Only show tabs and assignment section if a block is selected */}
//               {activeBlockId && (
//                 <>
//                   {/* Tabs */}
//                   <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 w-fit">
//                     {[
//                       { id: "assign", label: "Assign Students", icon: <UserPlus size={14}/> }, 
//                       { id: "active", label: "Active Sessions", icon: <Clock size={14}/> },
//                       { id: "history", label: "History", icon: <History size={14}/> }
//                     ].map(tab => (
//                       <button 
//                         key={tab.id} 
//                         onClick={() => setActiveSubTab(tab.id)} 
//                         className={`px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
//                           activeSubTab === tab.id 
//                             ? "bg-teal-600 text-white shadow-sm" 
//                             : "text-slate-600 dark:text-slate-400 hover:text-teal-600"
//                         }`}
//                       >
//                         {tab.icon} {tab.label}
//                       </button>
//                     ))}
//                   </div>

//                   {/* TAB: ASSIGN */}
//                   {activeSubTab === "assign" && (
//                     <div className="space-y-4">
//                       <div className="relative">
//                         <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
//                         <input 
//                           type="text" 
//                           placeholder="Search students..." 
//                           className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
//                           value={studentSearch} 
//                           onChange={(e) => setStudentSearch(e.target.value)} 
//                         />
//                       </div>

//                       <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
//                         <table className="w-full text-left">
//                           <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
//                             <tr className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
//                               <th className="px-6 py-4">Student</th>
//                               <th className="px-6 py-4">Location</th>
//                               <th className="px-6 py-4 text-right">Action</th>
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//                             {filteredAvailableStudents.map(s => {
//                               const alreadyAssigned = blockAssignments.some(a => a.student_id === s.id && a.schedule_id === parseInt(activeBlockId));
//                               return (
//                                 <tr key={s.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
//                                   <td className="px-6 py-4">
//                                     <span className="text-md font-semibold text-slate-800 dark:text-white">{s.user?.name}</span>
//                                   </td>
//                                   <td className="px-6 py-4">
//                                     <div className="flex items-center gap-2">
//                                       <MapPin size={12} className="text-teal-500" />
//                                       <span className="text-md text-slate-600 dark:text-slate-400">{s.location}</span>
//                                     </div>
//                                   </td>
//                                   <td className="px-6 py-4 text-right">
//                                     {alreadyAssigned ? (
//                                       <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500">
//                                         <CheckCircle2 size={12} />
//                                         Assigned
//                                       </span>
//                                     ) : (
//                                       <button 
//                                         onClick={() => handleAssignStudent(s)} 
//                                         className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
//                                       >
//                                         Assign
//                                       </button>
//                                     )}
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                         {filteredAvailableStudents.length === 0 && (
//                           <div className="py-12 text-center">
//                             <Users size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
//                             <p className="text-md text-slate-500">No students available for this block</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {/* TAB: ACTIVE */}
//                   {activeSubTab === "active" && (
//                     <div className="space-y-3">
//                       {activeSessions.length > 0 ? (
//                         activeSessions.map(session => (
//                           <div key={session.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:shadow-md transition-all">
//                             <div>
//                               <div className="flex items-center gap-2 mb-2">
//                                 <h4 className="text-sm font-bold text-slate-800 dark:text-white">{session.student?.user?.name}</h4>
//                                 <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
//                                   Active
//                                 </span>
//                               </div>
//                               <div className="flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
//                                 <span className="flex items-center gap-1"><CalendarIcon size={12} /> {session.date}</span>
//                                 <span className="flex items-center gap-1"><Clock size={12} /> {session.start_time} - {session.end_time}</span>
//                                 <span className="flex items-center gap-1"><MapPin size={12} /> {session.student_location}</span>
//                               </div>
//                             </div>
//                             <div className="flex gap-2">
//                               <button onClick={() => handleEditAssignment(session)} className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors">
//                                 <Edit3 size={14} />
//                               </button>
//                               <button onClick={() => handleDeleteAssignment(session.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
//                                 <Trash2 size={14} />
//                               </button>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
//                           <Clock size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
//                           <p className="text-sm text-slate-500">No active sessions for this block</p>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   {/* TAB: HISTORY */}
//                   {activeSubTab === "history" && (
//                     <div className="space-y-3">
//                       {historySessions.length > 0 ? (
//                         historySessions.map(session => (
//                           <div key={session.id} className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 opacity-75">
//                             <div>
//                               <div className="flex items-center gap-2 mb-2">
//                                 <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">{session.student?.user?.name}</h4>
//                                 <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-700 text-slate-500">
//                                   Completed
//                                 </span>
//                               </div>
//                               <p className="text-xs text-slate-500">
//                                 {session.date} • {session.start_time} - {session.end_time}
//                               </p>
//                             </div>
//                             <div className="flex items-center gap-1 text-teal-600">
//                               <CheckCircle2 size={16} />
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
//                           <History size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
//                           <p className="text-sm text-slate-500">No history for this block</p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* MODAL: ADD/EDIT DUTY BLOCK */}
//       {/* MODAL: ADD/EDIT DUTY BLOCK */}
// {isNewDutyModalOpen && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
//     <div className="bg-white dark:bg-slate-950 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
//       <div className="flex items-center justify-between px-8 py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
//         <div>
//           <h2 className="text-xl font-bold text-slate-800 dark:text-white">
//             {isEditMode ? 'Edit' : 'Add'} <span className="text-teal-600 dark:text-teal-400">Duty Block</span>
//           </h2>
//           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//             {isEditMode ? 'Modify existing duty block details' : 'Create a new duty block for instructor'}
//           </p>
//         </div>
//         <button 
//           onClick={() => setIsNewDutyModalOpen(false)} 
//           className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
//         >
//           <X size={20} />
//         </button>
//       </div>
      
//       <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
//         <div className="space-y-6">
//           {/* Task Description */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
//               <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
//               Task Description
//             </label>
//             <input 
//               type="text" 
//               placeholder="e.g., City Driving, Highway Practice" 
//               className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400" 
//               value={newDutyData.task_description} 
//               onChange={(e) => setNewDutyData({...newDutyData, task_description: e.target.value})}
//             />
//           </div>

//           {/* Date Range */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
//               <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
//               Date Range
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">Start Date</label>
//                 <input 
//                   type="date" 
//                   className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
//                   value={newDutyData.start_date} 
//                   onChange={(e) => setNewDutyData({...newDutyData, start_date: e.target.value})} 
//                 />
//               </div>
//               <div>
//                 <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">End Date</label>
//                 <input 
//                   type="date" 
//                   className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
//                   value={newDutyData.end_date} 
//                   onChange={(e) => setNewDutyData({...newDutyData, end_date: e.target.value})} 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Time Range */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
//               <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
//               Time Range
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">Start Time</label>
//                 <input 
//                   type="time" 
//                   className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
//                   value={newDutyData.start_time} 
//                   onChange={(e) => setNewDutyData({...newDutyData, start_time: e.target.value})} 
//                 />
//               </div>
//               <div>
//                 <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">End Time</label>
//                 <input 
//                   type="time" 
//                   className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
//                   value={newDutyData.end_time} 
//                   onChange={(e) => setNewDutyData({...newDutyData, end_time: e.target.value})} 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Preview Section */}
//           {newDutyData.task_description && newDutyData.start_date && newDutyData.end_date && (
//             <div className="mt-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center gap-2 mb-3">
//                 <CalendarDays size={14} className="text-teal-500" />
//                 <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Block Preview</span>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-base font-bold text-slate-800 dark:text-white">{newDutyData.task_description}</p>
//                 <p className="text-sm text-slate-600 dark:text-slate-300">
//                   <span className="font-semibold">Dates:</span> {newDutyData.start_date} - {newDutyData.end_date}
//                 </p>
//                 <p className="text-sm text-slate-600 dark:text-slate-300">
//                   <span className="font-semibold">Hours:</span> {newDutyData.start_time} - {newDutyData.end_time}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Buttons */}
//       <div className="flex gap-3 px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
//         <button 
//           onClick={() => setIsNewDutyModalOpen(false)} 
//           className="flex-1 px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
//         >
//           Cancel
//         </button>
//         <button 
//           onClick={handleSaveDuty} 
//           className="flex-1 px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0"
//         >
//           {isEditMode ? "Update Block" : "Create Block"}
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//       {/* MODAL: ASSIGN/EDIT STUDENT SESSION */}
//       {/* MODAL: ASSIGN/EDIT STUDENT SESSION */}
// {isAssignModalOpen && selectedForSession && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
//     <div className="bg-white dark:bg-slate-950 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
//       <div className="flex items-center justify-between px-8 py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
//         <div>
//           <h2 className="text-xl font-bold text-slate-800 dark:text-white">
//             {editingAssignment ? "Edit" : "Assign"} <span className="text-teal-600 dark:text-teal-400">Student Session</span>
//           </h2>
//           <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
//             {editingAssignment ? "Modify existing session details" : "Assign a student to this duty block"}
//           </p>
//         </div>
//         <button 
//           onClick={() => setIsAssignModalOpen(false)} 
//           className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
//         >
//           <X size={20} />
//         </button>
//       </div>
      
//       <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
//         <div className="space-y-6">
//           {/* Student Information Card */}
//           <div className="p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-lg">
//                 {selectedForSession.user?.name.charAt(0)}
//               </div>
//               <div>
//                 <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Student</p>
//                 <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5">{selectedForSession.user?.name}</p>
//                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
//                   <MapPin size={10} /> {selectedForSession.location}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Session Details */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
//               <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
//               Session Details
//             </label>
//             <div className="grid grid-cols-1 gap-4">
//               <div>
//                 <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">Session Date</label>
//                 <input 
//                   type="date" 
//                   className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
//                   value={formData.date} 
//                   onChange={(e) => setFormData({...formData, date: e.target.value})} 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Time Range */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
//               <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
//               Time Slot
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">Start Time</label>
//                 <input 
//                   type="time" 
//                   className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
//                   value={formData.startTime} 
//                   onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
//                 />
//               </div>
//               <div>
//                 <label className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mb-1 block">End Time</label>
//                 <input 
//                   type="time" 
//                   className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
//                   value={formData.endTime} 
//                   onChange={(e) => setFormData({...formData, endTime: e.target.value})} 
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Pickup Location */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
//               <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
//               Pickup Location
//             </label>
//             <input 
//               type="text" 
//               placeholder="Enter pickup address" 
//               className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400" 
//               value={formData.location} 
//               onChange={(e) => setFormData({...formData, location: e.target.value})} 
//             />
//           </div>

//           {/* Preview Section */}
//           {formData.date && formData.startTime && formData.endTime && (
//             <div className="mt-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
//               <div className="flex items-center gap-2 mb-3">
//                 <Clock size={14} className="text-teal-500" />
//                 <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Session Preview</span>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-semibold text-slate-800 dark:text-white">{selectedForSession.user?.name}</p>
//                 <p className="text-sm text-slate-600 dark:text-slate-300">
//                   <span className="font-semibold">Date:</span> {formData.date}
//                 </p>
//                 <p className="text-sm text-slate-600 dark:text-slate-300">
//                   <span className="font-semibold">Time:</span> {formData.startTime} - {formData.endTime}
//                 </p>
//                 <p className="text-sm text-slate-600 dark:text-slate-300">
//                   <span className="font-semibold">Location:</span> {formData.location || "Not specified"}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Buttons */}
//       <div className="flex gap-3 px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
//         <button 
//           onClick={() => setIsAssignModalOpen(false)} 
//           className="flex-1 px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
//         >
//           Cancel
//         </button>
//         <button 
//           onClick={handleSaveAssignment} 
//           className="flex-1 px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0"
//         >
//           {editingAssignment ? "Update Session" : "Confirm Assignment"}
//         </button>
//       </div>
//     </div>
//   </div>
// )}
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
    
    setBlockAssignments(prev => prev.filter(a => a.schedule_id !== blockId));
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
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-[1920px] mx-auto">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="w-full md:w-auto text-center md:text-left">
              {viewMode === "manage" && (
                <button 
                  onClick={() => { 
                    setViewMode("instructors"); 
                    setActiveBlockId(""); 
                    setSelectedInstructor(null);
                  }} 
                  className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm mb-3 hover:gap-3 transition-all"
                >
                  <ArrowLeft size={16}/> Back to instructors
                </button>
              )}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
                Duty <span className="text-teal-600 dark:text-teal-400">{viewMode === "instructors" ? "Dispatch" : "Management"}</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                {viewMode === "instructors" ? "Manage instructor schedules and assignments" : "Configure duty blocks and student sessions"}
              </p>
            </div>
            {viewMode === "instructors" && (
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                />
              </div>
            )}
          </div>

          {viewMode === "instructors" ? (
            <>
              {/* Location Filters - Centered on mobile */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {dynamicPlaces.map((place) => (
                  <button 
                    key={place} 
                    onClick={() => setSelectedPlace(place)} 
                    className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      selectedPlace === place 
                        ? "bg-teal-600 text-white shadow-sm" 
                        : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-teal-600 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {place}
                  </button>
                ))}
              </div>

              {/* Instructor Cards - Centered on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedInstructors.map((ins) => {
                  const hasBlocks = ins.workBlocks && ins.workBlocks.length > 0;
                  const blockCount = hasBlocks ? ins.workBlocks.length : 0;
                  const activeSessionsCount = blockAssignments.filter(a => 
                    ins.workBlocks.some(b => b.id === a.schedule_id) && !a.attendance
                  ).length;

                  return (
                    <div key={ins.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 mx-auto w-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2 flex-wrap">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                            hasBlocks 
                              ? "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400" 
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          }`}>
                            {blockCount} Block{blockCount !== 1 ? 's' : ''}
                          </span>
                          {activeSessionsCount > 0 && (
                            <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                              {activeSessionsCount} Active
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => { setSelectedInstructor(ins); setViewMode("manage"); }} 
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-medium transition-all"
                        >
                          Manage
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-lg flex-shrink-0">
                          {ins.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-teal-600 transition-colors truncate">
                            {ins.name}
                          </h3>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={12} className="text-teal-500 flex-shrink-0" /> 
                            <span className="truncate">{ins.place}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Pagination */}
              {instructorsList.length > itemsPerPage && (
                <div className="flex justify-center pt-8 pb-4">
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
              
              {/* ADD DUTY BLOCK BUTTON - Centered on mobile */}
              <div className="flex justify-center md:justify-end">
                <button 
                  onClick={handleAddDuty}
                  className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-teal-600 hover:text-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle size={16} /> Add Duty Block
                </button>
              </div>

              {/* DUTY BLOCKS LIST */}
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider text-center md:text-left">
                  Duty Blocks
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedInstructor?.workBlocks.map(block => (
                    <div key={block.id} className={`group relative p-4 rounded-xl border transition-all duration-300 w-full ${
                      activeBlockId === block.id.toString() 
                        ? "bg-teal-50 dark:bg-teal-900/20 border-teal-300 dark:border-teal-700 shadow-md" 
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md"
                    }`}>
                      <div className="flex-1 cursor-pointer" onClick={() => setActiveBlockId(block.id.toString())}>
                        <h4 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white mb-1 truncate">{block.task}</h4>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                          {block.start} - {block.end}
                        </p>
                        <p className="text-xs font-mono text-slate-400 mt-1">
                          {block.startTime} - {block.endTime}
                        </p>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button onClick={() => handleEditDuty(block)} className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => handleDeleteDuty(block.id)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {selectedInstructor?.workBlocks.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <CalendarDays size={48} className="mx-auto mb-3 text-slate-300 dark:text-slate-600" />
                      <p className="text-sm text-slate-500">No duty blocks scheduled.</p>
                      <button 
                        onClick={handleAddDuty}
                        className="mt-3 text-teal-600 font-medium text-sm hover:underline"
                      >
                        Click here to create one
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* DUTY BLOCK SELECTOR DROPDOWN */}
              {/* DUTY BLOCK SELECTOR DROPDOWN */}
{selectedInstructor?.workBlocks.length > 0 && (
  <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800">
    <label className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2 text-center md:text-left">
      Select Duty Block to Manage Assignments
    </label>
    <select 
      value={activeBlockId} 
      onChange={(e) => setActiveBlockId(e.target.value)} 
      className="w-full px-3 sm:px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer"
    >
      <option value="">Choose a block to manage assignments...</option>
      {selectedInstructor?.workBlocks?.map(block => (
        <option key={block.id} value={block.id} className="text-xs sm:text-sm">
          {block.task} ({block.start}) • {block.startTime}-{block.endTime}
        </option>
      ))}
    </select>
  </div>
)}

{/* Only show tabs and assignment section if a block is selected */}
{activeBlockId && (
  <>
    {/* Tabs - Responsive with horizontal scroll on mobile */}
    <div className="relative">
      <div className="flex justify-center md:justify-start">
        <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 overflow-x-auto w-full sm:w-auto scrollbar-hide">
          {[
            { id: "assign", label: "Assign Students", icon: <UserPlus size={14}/> }, 
            { id: "active", label: "Active Sessions", icon: <Clock size={14}/> },
            { id: "history", label: "History", icon: <History size={14}/> }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveSubTab(tab.id)} 
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 sm:gap-2 transition-all whitespace-nowrap ${
                activeSubTab === tab.id 
                  ? "bg-teal-600 text-white shadow-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:text-teal-600"
              }`}
            >
              {tab.icon} 
              <span className="hidden xs:inline">{tab.label}</span>
              <span className="xs:hidden">
                {tab.id === "assign" ? "Assign" : tab.id === "active" ? "Active" : "History"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* TAB: ASSIGN - Responsive layout */}
    {activeSubTab === "assign" && (
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            value={studentSearch} 
            onChange={(e) => setStudentSearch(e.target.value)} 
          />
        </div>

        {/* Students Table/Cards - Responsive */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Desktop Table View - Hidden on mobile */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                <tr className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Student</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4">Location</th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredAvailableStudents.map(s => {
                  const alreadyAssigned = blockAssignments.some(a => a.student_id === s.id && a.schedule_id === parseInt(activeBlockId));
                  return (
                    <tr key={s.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">{s.user?.name}</span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-teal-500 flex-shrink-0" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">{s.location}</span>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                        {alreadyAssigned ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500">
                            <CheckCircle2 size={12} />
                            Assigned
                          </span>
                        ) : (
                          <button 
                            onClick={() => handleAssignStudent(s)} 
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
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
          </div>

          {/* Mobile Cards View - Visible only on mobile */}
          <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
            {filteredAvailableStudents.length > 0 ? (
              filteredAvailableStudents.map(s => {
                const alreadyAssigned = blockAssignments.some(a => a.student_id === s.id && a.schedule_id === parseInt(activeBlockId));
                return (
                  <div key={s.id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-base font-bold text-slate-800 dark:text-white">{s.user?.name}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin size={12} className="text-teal-500" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">{s.location}</span>
                        </div>
                      </div>
                      {alreadyAssigned ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500">
                          <CheckCircle2 size={12} />
                          Assigned
                        </span>
                      ) : (
                        <button 
                          onClick={() => handleAssignStudent(s)} 
                          className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
                        >
                          Assign
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center">
                <Users size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <p className="text-sm text-slate-500">No students available for this block</p>
              </div>
            )}
          </div>

          {/* Empty State for both views */}
          {filteredAvailableStudents.length === 0 && (
            <div className="py-12 text-center sm:hidden">
              <Users size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm text-slate-500">No students available for this block</p>
            </div>
          )}
        </div>
      </div>
    )}

    {/* TAB: ACTIVE - Responsive layout */}
    {activeSubTab === "active" && (
      <div className="space-y-3">
        {activeSessions.length > 0 ? (
          activeSessions.map(session => (
            <div key={session.id} className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:shadow-md transition-all">
              <div className="flex-1 w-full min-w-0">
                <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 mb-2">
                  <h4 className="text-base sm:text-sm font-bold text-slate-800 dark:text-white truncate flex-1">
                    {session.student?.user?.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 whitespace-nowrap">
                    Active
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1"><CalendarIcon size={12} /> {session.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {session.start_time} - {session.end_time}</span>
                  <span className="flex items-center gap-1 truncate"><MapPin size={12} /> <span className="truncate">{session.student_location}</span></span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0 self-end sm:self-center">
                <button onClick={() => handleEditAssignment(session)} className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => handleDeleteAssignment(session.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
            <Clock size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-500">No active sessions for this block</p>
          </div>
        )}
      </div>
    )}

    {/* TAB: HISTORY - Responsive layout */}
    {activeSubTab === "history" && (
      <div className="space-y-3">
        {historySessions.length > 0 ? (
          historySessions.map(session => (
            <div key={session.id} className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 opacity-75 hover:opacity-100 transition-opacity">
              <div className="flex-1 w-full min-w-0">
                <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 mb-2">
                  <h4 className="text-base sm:text-sm font-medium text-slate-600 dark:text-slate-400 truncate flex-1">
                    {session.student?.user?.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-700 text-slate-500 whitespace-nowrap">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {session.date} • {session.start_time} - {session.end_time}
                </p>
              </div>
              <div className="flex items-center gap-1 text-teal-600 flex-shrink-0 self-end sm:self-center">
                <CheckCircle2 size={16} />
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
            <History size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-500">No history for this block</p>
          </div>
        )}
      </div>
    )}
  </>
)}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD/EDIT DUTY BLOCK */}
      {isNewDutyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-950 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                  {isEditMode ? 'Edit' : 'Add'} <span className="text-teal-600 dark:text-teal-400">Duty Block</span>
                </h2>
                <p className="text-xs sm:text-sm md:text-md text-slate-600 dark:text-slate-400 mt-1">
                  {isEditMode ? 'Modify existing duty block details' : 'Create a new duty block for instructor'}
                </p>
              </div>
              <button 
                onClick={() => setIsNewDutyModalOpen(false)} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
              <div className="space-y-5 sm:space-y-6">
                {/* Task Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
                    Task Description
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., City Driving, Highway Practice" 
                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400" 
                    value={newDutyData.task_description} 
                    onChange={(e) => setNewDutyData({...newDutyData, task_description: e.target.value})}
                  />
                </div>

                {/* Date Range */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
                    Date Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[15px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Start Date</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                        value={newDutyData.start_date} 
                        onChange={(e) => setNewDutyData({...newDutyData, start_date: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="text-[15px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">End Date</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                        value={newDutyData.end_date} 
                        onChange={(e) => setNewDutyData({...newDutyData, end_date: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                {/* Time Range */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
                    Time Range
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[15px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">Start Time</label>
                      <input 
                        type="time" 
                        className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                        value={newDutyData.start_time} 
                        onChange={(e) => setNewDutyData({...newDutyData, start_time: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="text-[15px] font-medium text-slate-600 dark:text-slate-400 mb-1 block">End Time</label>
                      <input 
                        type="time" 
                        className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                        value={newDutyData.end_time} 
                        onChange={(e) => setNewDutyData({...newDutyData, end_time: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                {newDutyData.task_description && newDutyData.start_date && newDutyData.end_date && (
                  <div className="mt-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarDays size={14} className="text-teal-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Block Preview</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-bold text-slate-800 dark:text-white">{newDutyData.task_description}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Dates:</span> {newDutyData.start_date} - {newDutyData.end_date}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Hours:</span> {newDutyData.start_time} - {newDutyData.end_time}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <button 
                onClick={() => setIsNewDutyModalOpen(false)} 
                className="flex-1 px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveDuty} 
                className="flex-1 px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {isEditMode ? "Update Block" : "Create Block"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASSIGN/EDIT STUDENT SESSION */}
      {isAssignModalOpen && selectedForSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-950 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                  {editingAssignment ? "Edit" : "Assign"} <span className="text-teal-600 dark:text-teal-400">Student Session</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {editingAssignment ? "Modify existing session details" : "Assign a student to this duty block"}
                </p>
              </div>
              <button 
                onClick={() => setIsAssignModalOpen(false)} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
              <div className="space-y-5 sm:space-y-6">
                {/* Student Information Card */}
                <div className="p-5 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-lg flex-shrink-0">
                      {selectedForSession.user?.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Student</p>
                      <p className="text-base font-bold text-slate-800 dark:text-white mt-0.5 truncate">{selectedForSession.user?.name}</p>
                      <p className="text-sm text-slate-700 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin size={10} /> <span className="truncate">{selectedForSession.location}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
                    Session Details
                  </label>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-[15px] font-medium text-slate-700 dark:text-slate-400 mb-1 block">Session Date</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                        value={formData.date} 
                        onChange={(e) => setFormData({...formData, date: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                {/* Time Range */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
                    Time Slot
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[15px] font-medium text-slate-700 dark:text-slate-400 mb-1 block">Start Time</label>
                      <input 
                        type="time" 
                        className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                        value={formData.startTime} 
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
                      />
                    </div>
                    <div>
                      <label className="text-[15px] font-medium text-slate-700 dark:text-slate-400 mb-1 block">End Time</label>
                      <input 
                        type="time" 
                        className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                        value={formData.endTime} 
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
                    Pickup Location
                  </label>
                  <input 
                    type="text" 
                    placeholder="Enter pickup address" 
                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder:text-slate-400" 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})} 
                  />
                </div>

                {/* Preview Section */}
                {formData.date && formData.startTime && formData.endTime && (
                  <div className="mt-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={14} className="text-teal-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Session Preview</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">{selectedForSession.user?.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Date:</span> {formData.date}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Time:</span> {formData.startTime} - {formData.endTime}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        <span className="font-semibold">Location:</span> {formData.location || "Not specified"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
              <button 
                onClick={() => setIsAssignModalOpen(false)} 
                className="flex-1 px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveAssignment} 
                className="flex-1 px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
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