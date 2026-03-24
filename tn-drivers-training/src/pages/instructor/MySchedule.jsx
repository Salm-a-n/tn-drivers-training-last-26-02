import React, { useState } from 'react';
import { 
  CheckCircle, Clock, MapPin, ScanEye, 
  Search, CalendarDays, Edit3, X, 
  RotateCcw, History, Calendar as CalendarIcon,
  ChevronLeft, ChevronRight, UserPlus, Award, Save, Loader2, Briefcase
} from "lucide-react";
import InstructorStudentDetail from "../../components/instructor/InstructorStudentDetail";

const InstructorSchedule = () => {
  // --- STATES ---
  const [activeTab, setActiveTab] = useState("active"); 
  const [query, setQuery] = useState("");
  const [filterArea, setFilterArea] = useState("All Areas");
  const [scheduleDateFilter, setScheduleDateFilter] = useState(""); 
  const [historyDateFilter, setHistoryDateFilter] = useState("");
  const [selectedDutyShift, setSelectedDutyShift] = useState("shift-1");
  
  // MODAL STATES
  const [editingSession, setEditingSession] = useState(null);
  const [selectedForSchedule, setSelectedForSchedule] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [evaluationModal, setEvaluationModal] = useState(null);
  const [evaluationForm, setEvaluationForm] = useState({
    score: 85,
    remarks: "",
    test_type: "Driving Assessment"
  });
  const [savingEvaluation, setSavingEvaluation] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // DUTY SHIFTS
  const dutyShifts = [
    { 
      id: "shift-1", 
      location: "St. John's", 
      task: "City Driving",
      startDate: "2026-03-01",
      endDate: "2026-03-07",
      startTime: "09:00",
      endTime: "17:00"
    },
    { 
      id: "shift-2", 
      location: "Burin", 
      task: "Parallel Parking",
      startDate: "2026-03-01",
      endDate: "2026-03-07",
      startTime: "08:00",
      endTime: "16:00"
    },
    { 
      id: "shift-3", 
      location: "Grand Falls", 
      task: "Highway Driving",
      startDate: "2026-03-05",
      endDate: "2026-03-11",
      startTime: "10:00",
      endTime: "18:00"
    },
    { 
      id: "shift-4", 
      location: "Marystown", 
      task: "Mock Road Test",
      startDate: "2026-03-10",
      endDate: "2026-03-15",
      startTime: "12:00",
      endTime: "20:00"
    }
  ];

  const currentShift = dutyShifts.find(shift => shift.id === selectedDutyShift) || dutyShifts[0];

  const burinAreas = ["All Areas", "Burin Bay Arm", "Burin Heritage", "Salt Pond", "Epworth"];

  // Dummy student pool
  const [studentPool] = useState([
    { id: 'STU-101', name: "Alex Rivera", area: "Burin Heritage", pickup: "Heritage Museum", email: "alex@drive.com", progress: 65, licenseClass: "Class 5 GDL", balanceCAD: 150, phone: "(709) 555-0123", evaluations: [] },
    { id: 'STU-102', name: "Sam Chen", area: "Salt Pond", pickup: "Main Gate", email: "sam@drive.com", progress: 30, licenseClass: "Class 7", balanceCAD: 200, phone: "(709) 555-0456", evaluations: [] },
    { id: 'STU-104', name: "Muhammed Salman", area: "Salt Pond", pickup: "Residence Lot 4", email: "salman@tech.com", progress: 40, licenseClass: "Class 5", balanceCAD: 0, phone: "(709) 555-0789", evaluations: [] },
    { id: 'STU-105', name: "James Harrison", area: "Burin Heritage", pickup: "Heritage Museum", email: "james@drive.com", progress: 75, licenseClass: "Class 5", balanceCAD: 50, phone: "(709) 555-0321", evaluations: [] },
    { id: 'STU-106', name: "Sarah Williams", area: "Epworth", pickup: "Epworth Well", email: "sarah@drive.com", progress: 45, licenseClass: "Class 7", balanceCAD: 100, phone: "(709) 555-0654", evaluations: [] },
  ]);

  // Dummy scheduled students with evaluation data
  const [scheduledStudents, setScheduledStudents] = useState([
    {
      id: 1001,
      name: "Alex Rivera",
      pickup: "Heritage Museum",
      date: "2026-03-24",
      timeSlot: "09:00 - 10:30",
      status: "Active",
      email: "alex@drive.com",
      phone: "(709) 555-0123",
      progress: 65,
      evaluation: null
    },
    {
      id: 1002,
      name: "Sam Chen",
      pickup: "Main Gate",
      date: "2026-03-25",
      timeSlot: "10:30 - 12:00",
      status: "Active",
      email: "sam@drive.com",
      phone: "(709) 555-0456",
      progress: 30,
      evaluation: null
    },
    {
      id: 1003,
      name: "Muhammed Salman",
      pickup: "Residence Lot 4",
      date: "2026-03-22",
      timeSlot: "13:00 - 14:30",
      status: "Completed",
      email: "salman@tech.com",
      phone: "(709) 555-0789",
      progress: 40,
      evaluation: {
        id: 1,
        score: 78,
        remarks: "Good progress, needs more practice with parallel parking.",
        test_type: "Parking Assessment",
        date: "2026-03-22"
      }
    },
    {
      id: 1004,
      name: "James Harrison",
      pickup: "Heritage Museum",
      date: "2026-03-23",
      timeSlot: "14:30 - 16:00",
      status: "Completed",
      email: "james@drive.com",
      phone: "(709) 555-0321",
      progress: 75,
      evaluation: {
        id: 2,
        score: 92,
        remarks: "Excellent highway merging skills!",
        test_type: "Highway Driving",
        date: "2026-03-23"
      }
    }
  ]);

  const [formData, setFormData] = useState({ 
    date: currentShift.startDate, 
    startTime: currentShift.startTime, 
    endTime: currentShift.endTime 
  });

  // --- LOGIC: FILTERS ---
  const availableStudents = studentPool.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(query.toLowerCase());
    const matchesArea = filterArea === "All Areas" || s.area === filterArea;
    const isAlreadyScheduled = scheduledStudents.find(ss => ss.name === s.name && ss.status === 'Active');
    return matchesSearch && matchesArea && !isAlreadyScheduled;
  });

  const activeList = scheduledStudents.filter(s => s.status === 'Active' && (scheduleDateFilter === "" || s.date === scheduleDateFilter));
  const historyList = scheduledStudents.filter(s => s.status === 'Completed' && (historyDateFilter === "" || s.date === historyDateFilter));

  const currentStudents = availableStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(availableStudents.length / itemsPerPage);

  // --- HANDLERS ---
  const startEdit = (session) => {
    setEditingSession(session);
    const times = session.timeSlot.split(" - ");
    setFormData({
      date: session.date,
      startTime: times[0],
      endTime: times[1]
    });
  };

  const handleUpdate = () => {
    setScheduledStudents(prev => prev.map(s => 
      s.id === editingSession.id 
      ? { ...s, date: formData.date, timeSlot: `${formData.startTime} - ${formData.endTime}` } 
      : s
    ));
    setEditingSession(null);
    setFormData({ date: currentShift.startDate, startTime: currentShift.startTime, endTime: currentShift.endTime });
  };

  const confirmSchedule = (student) => {
    const newEntry = { 
      ...student, 
      id: Date.now(), 
      date: formData.date, 
      timeSlot: `${formData.startTime} - ${formData.endTime}`, 
      status: "Active",
      evaluation: null
    };
    setScheduledStudents([newEntry, ...scheduledStudents]);
    setSelectedForSchedule(null);
  };

  // Mark as Present - Opens evaluation modal
  const handleMarkPresent = (session) => {
    setEvaluationModal({
      sessionId: session.id,
      studentName: session.name,
      studentEmail: session.email,
      studentPhone: session.phone,
      existingEvaluation: session.evaluation
    });
    
    if (session.evaluation) {
      setEvaluationForm({
        score: session.evaluation.score,
        remarks: session.evaluation.remarks,
        test_type: session.evaluation.test_type
      });
    } else {
      setEvaluationForm({
        score: 85,
        remarks: "",
        test_type: "Driving Assessment"
      });
    }
  };

  // Mark as Absent
  const handleMarkAbsent = (sessionId) => {
    if (window.confirm("Mark student as ABSENT? This will move the session to history.")) {
      setScheduledStudents(prev => prev.map(item => 
        item.id === sessionId 
          ? { ...item, status: "Completed", attendance: "absent" }
          : item
      ));
    }
  };

  // Save Evaluation
  const handleSaveEvaluation = () => {
    setSavingEvaluation(true);
    
    setTimeout(() => {
      setScheduledStudents(prev => prev.map(item => 
        item.id === evaluationModal.sessionId 
          ? { 
              ...item, 
              status: "Completed",
              attendance: "present",
              evaluation: {
                id: item.evaluation?.id || Date.now(),
                score: evaluationForm.score,
                remarks: evaluationForm.remarks,
                test_type: evaluationForm.test_type,
                date: new Date().toISOString().split('T')[0]
              }
            }
          : item
      ));
      
      setSavingEvaluation(false);
      setEvaluationModal(null);
      alert("Evaluation saved successfully!");
    }, 500);
  };

  const toggleStatus = (id) => {
    setScheduledStudents(prev => prev.map(item => 
      item.id === id ? { ...item, status: item.status === 'Completed' ? 'Active' : 'Completed' } : item
    ));
  };

  // Update form data when duty shift changes
  const handleDutyShiftChange = (shiftId) => {
    const newShift = dutyShifts.find(shift => shift.id === shiftId);
    if (newShift) {
      setSelectedDutyShift(shiftId);
      setFormData({
        date: newShift.startDate,
        startTime: newShift.startTime,
        endTime: newShift.endTime
      });
    }
  };

  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 pb-20">
      <main className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
              Instructor <span className="text-teal-600 dark:text-teal-400">Schedule</span>
            </h1>
          <p className="text-[0.65rem] font-soro text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
            Manage your daily lessons and student sessions
          </p>
        </div>

        {/* DUTY SHIFT SELECTOR */}
       {/* DUTY SHIFT SELECTOR */}
<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
  <div className="p-5">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 bg-teal-50 dark:bg-teal-950/30 rounded-lg">
        <Briefcase size={18} className="text-teal-600 dark:text-teal-400" />
      </div>
      <div>
        <h3 className="text-xs font-soro font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Active Duty Shift</h3>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Select your current shift assignment</p>
      </div>
    </div>
    
    <select 
      value={selectedDutyShift} 
      onChange={(e) => handleDutyShiftChange(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-['DM_Sans'] font-medium text-sm outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all cursor-pointer"
    >
      {dutyShifts.map(shift => (
        <option key={shift.id} value={shift.id} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-white">
          {shift.location} - {shift.task} ({shift.startDate} to {shift.endDate}) • {shift.startTime} - {shift.endTime}
        </option>
      ))}
    </select>
    
    {/* Shift Details Cards */}
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-700">
        <p className="text-[9px] font-soro font-bold uppercase text-slate-400 dark:text-slate-500">Period</p>
        <p className="text-sm font-['DM_Sans'] font-semibold text-slate-700 dark:text-slate-300 mt-1">
          {currentShift.startDate} - {currentShift.endDate}
        </p>
      </div>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-700">
        <p className="text-[9px] font-soro font-bold uppercase text-slate-400 dark:text-slate-500">Daily Hours</p>
        <p className="text-sm font-['DM_Sans'] font-semibold text-slate-700 dark:text-slate-300 mt-1">
          {currentShift.startTime} - {currentShift.endTime}
        </p>
      </div>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-700">
        <p className="text-[9px] font-soro font-bold uppercase text-slate-400 dark:text-slate-500">Location</p>
        <p className="text-sm font-['DM_Sans'] font-semibold text-slate-700 dark:text-slate-300 mt-1">
          {currentShift.location}
        </p>
      </div>
    </div>
  </div>
</div>

        {/* TAB NAVIGATION */}
        <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 w-full md:w-fit gap-1.5">
          {["book", "active", "history"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-lg text-[9px] md:text-[10px] font-soro font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === tab ? "bg-teal-600 text-white shadow-sm" : "text-slate-500 hover:text-teal-600 dark:hover:bg-slate-800"
              }`}
            >
              {tab === "book" ? "Add Sessions" : tab === "active" ? "Active Roster" : "History"}
            </button>
          ))}
        </div>

        {/* --- BOOKING TAB --- */}
        {activeTab === "book" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row gap-4 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search learners..." 
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 outline-none font-['DM_Sans'] font-medium text-sm text-slate-800 dark:text-white" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                />
              </div>
              <select 
                value={filterArea} 
                onChange={(e) => setFilterArea(e.target.value)} 
                className="px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-800 font-soro font-bold text-xs text-slate-800 dark:text-white outline-none cursor-pointer"
              >
                {burinAreas.map(area => <option key={area} value={area}>{area}</option>)}
              </select>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentStudents.map(s => (
                      <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 flex items-center justify-center font-soro font-bold text-sm">
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-['DM_Sans'] font-semibold text-slate-800 dark:text-white">{s.name}</p>
                              <p className="text-[10px] font-soro text-slate-500">{s.area}</p>
                            </div>
                          </div>
                          </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => { 
                              setSelectedForSchedule(s); 
                              setFormData({ 
                                date: currentShift.startDate, 
                                startTime: currentShift.startTime, 
                                endTime: currentShift.endTime 
                              }); 
                            }} 
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg font-soro font-bold text-[9px] uppercase hover:bg-teal-700 transition-all shadow-sm"
                          >
                            Schedule
                          </button>
                          </td>
                         </tr>
                    ))}
                  </tbody>
                 </table>
              </div>
              {availableStudents.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-slate-400 font-soro text-sm">No students available to schedule</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- ACTIVE TAB --- */}
        {activeTab === "active" && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2">
                <CalendarIcon className="text-teal-600" size={18} />
                <h3 className="text-xs font-soro font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Active Sessions</h3>
              </div>
              <input 
                type="date" 
                value={scheduleDateFilter} 
                onChange={(e) => setScheduleDateFilter(e.target.value)} 
                className="w-full md:w-auto px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 font-soro font-bold text-xs text-slate-800 dark:text-white outline-none" 
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {activeList.length > 0 ? (
                activeList.map(s => (
                  <div key={s.id} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="font-['Sora'] font-bold text-slate-800 dark:text-white text-base leading-none mb-1">{s.name}</p>
                        <p className="text-[9px] font-soro font-bold text-teal-600 uppercase flex items-center gap-1">
                          <MapPin size={10} /> {s.pickup}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                      <div className="text-left md:text-right">
                        <p className="text-sm font-soro font-bold text-slate-700 dark:text-slate-200 leading-none mb-1">{s.timeSlot}</p>
                        <p className="text-[8px] font-soro font-bold text-slate-400 uppercase">{s.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleMarkPresent(s)} 
                          className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 hover:bg-green-600 hover:text-white rounded-lg transition-all"
                          title="Mark Present & Add Evaluation"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button 
                          onClick={() => handleMarkAbsent(s.id)} 
                          className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                          title="Mark Absent"
                        >
                          <X size={16} />
                        </button>
                        <button 
                          onClick={() => startEdit(s)} 
                          className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-teal-600 rounded-lg transition-all"
                          title="Edit Session"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => setViewingStudent(s)} 
                          className="group relative p-1.5 text-slate-400 dark:text-slate-500 rounded-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 active:scale-95"   
                          title="View Student"
                        >
                        <ScanEye size={18} className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />

                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-xl border border-slate-200 dark:border-slate-800">
                  <CalendarIcon size={40} className="mx-auto text-slate-400 mb-3" />
                  <p className="text-slate-500 font-soro text-sm">No active sessions found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- HISTORY TAB --- */}
        {activeTab === "history" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2">
                <History size={18} className="text-teal-600" />
                <h3 className="text-xs font-soro font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Completed Sessions</h3>
              </div>
              <input 
                type="date" 
                value={historyDateFilter} 
                onChange={(e) => setHistoryDateFilter(e.target.value)} 
                className="w-full md:w-auto px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 font-soro font-bold text-xs text-slate-800 dark:text-white outline-none" 
              />
            </div>
            
            {historyList.length > 0 ? (
              historyList.map(s => (
                <div key={s.id} className="p-5 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between opacity-75 hover:opacity-100 transition-all">
                  <div>
                    <p className="font-['DM_Sans'] font-semibold text-slate-800 dark:text-white text-sm leading-none mb-1">{s.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <p className="text-[9px] font-soro font-bold text-slate-400 uppercase">{s.date} • {s.timeSlot}</p>
                      {s.evaluation && (
                        <span className="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 rounded-full text-[8px] font-soro font-bold">
                          Score: {s.evaluation.score}%
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleStatus(s.id)} 
                    className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-[8px] font-soro font-bold uppercase hover:bg-teal-700 transition-all active:scale-95 flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> Restore
                  </button>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-900 p-12 text-center rounded-xl border border-slate-200 dark:border-slate-800">
                <History size={40} className="mx-auto text-slate-400 mb-3" />
                <p className="text-slate-500 font-soro text-sm">No completed sessions found</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- MODAL: SCHEDULE & EDIT --- */}
      {(selectedForSchedule || editingSession) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-['Sora'] font-bold uppercase text-slate-800 dark:text-white">
                {editingSession ? "Reschedule Session" : "Assign Session"}
              </h3>
              <button 
                onClick={() => { setSelectedForSchedule(null); setEditingSession(null); }} 
                className="p-2 text-slate-400 hover:text-rose-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] font-soro font-bold uppercase text-slate-500 ml-1">Session Date</label>
                <input 
                  type="date" 
                  min={currentShift.startDate} 
                  max={currentShift.endDate} 
                  value={formData.date} 
                  onChange={(e) => setFormData({...formData, date: e.target.value})} 
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 font-['DM_Sans'] font-medium text-sm text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all outline-none" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-soro font-bold uppercase text-slate-500 ml-1">Start</label>
                  <input 
                    type="time" 
                    value={formData.startTime} 
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})} 
                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 font-['DM_Sans'] font-medium text-sm text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-soro font-bold uppercase text-slate-500 ml-1">End</label>
                  <input 
                    type="time" 
                    value={formData.endTime} 
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})} 
                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 font-['DM_Sans'] font-medium text-sm text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none" 
                  />
                </div>
              </div>
              <button 
                onClick={editingSession ? handleUpdate : () => confirmSchedule(selectedForSchedule)} 
                className="w-full py-3 bg-teal-600 text-white rounded-lg font-soro font-bold text-[10px] uppercase tracking-wider hover:bg-teal-700 shadow-md transition-all active:scale-95"
              >
                {editingSession ? "Confirm Update" : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- EVALUATION MODAL --- */}
      {evaluationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-['Sora'] font-bold text-teal-600">Student Evaluation</h3>
                <p className="text-sm font-['DM_Sans'] text-slate-600 dark:text-slate-400 mt-1">
                  {evaluationModal.studentName}
                </p>
              </div>
              <button 
                onClick={() => setEvaluationModal(null)} 
                className="p-2 text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-soro font-bold uppercase text-slate-500 mb-2 block">Assessment Type</label>
                <input 
                  type="text"
                  value={evaluationForm.test_type}
                  onChange={(e) => setEvaluationForm({...evaluationForm, test_type: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-['DM_Sans'] focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                  placeholder="e.g., Parallel Parking, Highway Driving"
                />
              </div>

              <div>
                <label className="text-[10px] font-soro font-bold uppercase text-slate-500 mb-2 block">Score (0-100)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100"
                    value={evaluationForm.score}
                    onChange={(e) => setEvaluationForm({...evaluationForm, score: parseInt(e.target.value)})}
                    className="flex-1 accent-teal-600"
                  />
                  <span className="text-2xl font-['Sora'] font-bold text-teal-600 w-16 text-center">
                    {evaluationForm.score}%
                  </span>
                </div>
                <div className="flex justify-between text-[8px] font-soro text-slate-400 mt-1">
                  <span>Poor</span>
                  <span>Average</span>
                  <span>Excellent</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-soro font-bold uppercase text-slate-500 mb-2 block">Instructor Remarks</label>
                <textarea 
                  rows={4}
                  value={evaluationForm.remarks}
                  onChange={(e) => setEvaluationForm({...evaluationForm, remarks: e.target.value})}
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-['DM_Sans'] focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
                  placeholder="Add your feedback about the student's performance..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setEvaluationModal(null)} 
                  className="flex-1 py-3 text-sm font-soro font-bold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEvaluation}
                  disabled={savingEvaluation}
                  className="flex-1 py-3 bg-teal-600 text-white rounded-lg font-soro font-bold text-sm hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {savingEvaluation ? <Loader2 size={16} className="animate-spin" /> : <Award size={16} />}
                  {savingEvaluation ? "Saving..." : "Save Evaluation"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewingStudent && (
        <InstructorStudentDetail 
          student={viewingStudent} 
          onClose={() => setViewingStudent(null)} 
        />
      )}
    </div>
  );
};

export default InstructorSchedule;