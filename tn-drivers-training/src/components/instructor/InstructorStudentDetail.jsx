import React, { useState } from "react";
import { 
  X, Mail, CheckCircle, XCircle, 
  Clock, Calendar, FileText, 
  MapPin, History, Award, Edit2,
  Loader2, AlertCircle, User,
  Phone, BookOpen, Save, MessageSquare,
  Star, Calendar as CalendarIcon, ChevronRight
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

  const saveProgress = async () => {
    setSaving(true);
    setTimeout(() => {
      setProgress(editedProgress);
      setIsEditingProgress(false);
      setSaving(false);
      alert("Progress updated successfully!");
    }, 500);
  };

  const handleProgressChange = (value) => {
    const newProgress = parseInt(value) || 0;
    const safeProgress = Math.min(100, Math.max(0, newProgress));
    setEditedProgress(safeProgress);
  };

  const openEvaluationEditor = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setEvaluationForm({
      score: evaluation.score || 0,
      remarks: evaluation.remarks || "",
      test_type: evaluation.test_type || ""
    });
    setIsEditingEvaluation(true);
  };

  const saveEvaluation = async () => {
    setSaving(true);
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-2xl">
          <Loader2 className="animate-spin text-teal-600 mx-auto mb-4" size={48} />
          <p className="text-sm font-semibold text-slate-500">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
        <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-2xl text-center max-w-md">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <p className="text-sm font-medium text-red-600 mb-4">{error}</p>
          <button onClick={onClose} className="px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
<div className="bg-white dark:bg-slate-950 w-full max-w-7xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden h-[90vh] max-h-[90vh]">        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-lg sm:text-xl">
              {student.name?.charAt(0) || '?'}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white truncate">
                  {student.name}
                </h2>
                <span className={`px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                  student.payment === 'Paid' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                }`}>
                  {student.payment || "Balance Due"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs md:text-sm lg:text-md text-slate-800 dark:text-slate-300">
                <span className="flex items-center gap-1 min-w-0">
                  <Mail size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-teal-500 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-[150px] md:max-w-none">{student.email}</span>
                </span>
                {student.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-teal-500 shrink-0" />
                    <span className="truncate">{student.phone}</span>
                  </span>
                )}
                {student.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-teal-500 shrink-0" />
                    <span className="truncate">{student.location}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <X size={16} className="sm:w-5 sm:h-5  hover:text-red-500" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex px-4 sm:px-6 md:px-8 border-b border-slate-200 dark:border-slate-800 gap-1 bg-slate-50 dark:bg-slate-800/30 overflow-x-auto">
          {["Overview", "Upcoming", "Evaluations", "History"].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all relative whitespace-nowrap ${
                activeTab === tab 
                  ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-600" 
                  : "text-slate-500 dark:text-slate-400 hover:text-teal-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar">
          
          {/* OVERVIEW TAB */}
          {activeTab === "Overview" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Progress Card */}
              <div className="bg-teal-50 dark:bg-teal-900/10 p-4 sm:p-6 rounded-xl border border-teal-100 dark:border-teal-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <h3 className="text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">Training Progress</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-400">
                      {isEditingProgress ? editedProgress : progress}%
                    </span>
                    {!isEditingProgress ? (
                      <button 
                        onClick={() => {
                          setEditedProgress(progress);
                          setIsEditingProgress(true);
                        }}
                        className="p-1 bg-white dark:bg-slate-800 rounded-lg text-teal-600 hover:bg-teal-50 transition-all"
                        title="Edit Progress"
                      >
                        <Edit2 size={12} className="sm:w-4 sm:h-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={saveProgress}
                        disabled={saving}
                        className="p-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50"
                        title="Save Progress"
                      >
                        {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                      </button>
                    )}
                  </div>
                </div>
                
                {isEditingProgress ? (
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={editedProgress || 0} 
                      onChange={(e) => handleProgressChange(e.target.value)}
                      className="w-full accent-teal-600 h-2 bg-white dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {
                          setIsEditingProgress(false);
                          setEditedProgress(progress);
                        }}
                        className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-full bg-white dark:bg-slate-800 h-2 sm:h-3 rounded-full overflow-hidden mb-3">
                      <div 
                        className="bg-teal-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-400">
                      <span className="font-semibold">Overall Progress:</span> {progress}% complete
                    </p>
                  </>
                )}
              </div>

              {/* Package and Student Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <BookOpen size={14} className="sm:w-4 sm:h-4 text-teal-500" />
                    <h4 className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Package Details</h4>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">{student.package}</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <User size={14} className="sm:w-4 sm:h-4 text-teal-500" />
                    <h4 className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Student Info</h4>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-400">ID: {student.studentId}</p>
                  <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-400 mt-1">Location: {student.location || 'N/A'}</p>
                </div>
              </div>

              {/* Recent Evaluations Preview */}
              {evaluations.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5">
                  <h4 className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 sm:mb-4">Recent Evaluations</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {evaluations.slice(0, 2).map(evalItem => (
                      <div key={evalItem.id} className="flex flex-wrap items-center justify-between gap-2 p-2 sm:p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">{evalItem.test_type}</p>
                          <p className="text-[12px] sm:text-xs  text-slate-800">{evalItem.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-base sm:text-lg font-bold text-teal-600">{Math.round(evalItem.score)}%</span>
                          <button 
                            onClick={() => {
                              setActiveTab("Evaluations");
                              openEvaluationEditor(evalItem);
                            }}
                            className="p-1 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          >
                            <Edit2 size={12} className="sm:w-4 sm:h-4" />
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
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <CalendarIcon size={16} className="sm:w-5 sm:h-5 text-teal-500" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Upcoming Sessions</h3>
              </div>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {upcomingSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center font-bold text-base sm:text-lg">
                          {new Date(session.date).getDate()}
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                            {session.schedule?.task_description || 'Driving Lesson'}
                          </p>
                          <div className="flex flex-wrap gap-2 sm:gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                              <Calendar size={10} className="sm:w-3 sm:h-3" /> {session.date}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                              <Clock size={10} className="sm:w-3 sm:h-3" /> {session.start_time} - {session.end_time}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] sm:text-xs text-teal-500">
                              <MapPin size={10} className="sm:w-3 sm:h-3" /> <span className="truncate max-w-[100px] sm:max-w-none">{session.student_location}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="px-2 sm:px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider self-start sm:self-center whitespace-nowrap">
                        Upcoming
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 sm:py-12 text-center bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                  <CalendarIcon size={32} className="sm:w-12 sm:h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-slate-500">No upcoming sessions</p>
                </div>
              )}
            </div>
          )}

          {/* EVALUATIONS TAB */}
          {activeTab === "Evaluations" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <Star size={16} className="sm:w-5 sm:h-5 text-teal-500" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Student Evaluations</h3>
              </div>

              {evaluations.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {evaluations.map((evalItem) => (
                    <div key={evalItem.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                      <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                            <Award size={14} className="sm:w-5 sm:h-5 text-teal-600" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white">{evalItem.test_type}</h4>
                            <p className="text-[10px] sm:text-xs text-slate-500">{evalItem.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="text-right">
                            <span className="text-lg sm:text-2xl font-bold text-teal-600">{Math.round(evalItem.score)}</span>
                            <span className="text-[10px] sm:text-sm text-slate-400">/100</span>
                          </div>
                          <button 
                            onClick={() => openEvaluationEditor(evalItem)}
                            className="p-1.5 sm:p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-lg hover:bg-teal-200 transition-all"
                          >
                            <Edit2 size={12} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare size={12} className="sm:w-3.5 sm:h-3.5 text-teal-500" />
                          <span className="text-[9px] sm:text-[10px] font-semibold text-teal-600 uppercase tracking-wider">Instructor Remarks</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic">
                          "{evalItem.remarks || 'No remarks added'}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 sm:py-12 text-center bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                  <Star size={32} className="sm:w-12 sm:h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-slate-500">No evaluations found</p>
                </div>
              )}
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === "History" && (
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <History size={16} className="sm:w-5 sm:h-5 text-teal-500" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Session History</h3>
              </div>

              {attendanceHistory.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {attendanceHistory.map((session) => (
                    <div 
                      key={session.id} 
                      className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          session.attendance?.status === 'present' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                        }`}>
                          {session.attendance?.status === 'present' 
                            ? <CheckCircle size={14} className="sm:w-5 sm:h-5" /> 
                            : <XCircle size={14} className="sm:w-5 sm:h-5" />
                          }
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
                            {session.schedule?.task_description || 'Driving Lesson'}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500">
                              <Calendar size={8} className="sm:w-2.5 sm:h-2.5" /> {session.date}
                            </span>
                            <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-500">
                              <Clock size={8} className="sm:w-2.5 sm:h-2.5" /> {session.start_time} - {session.end_time}
                            </span>
                            <span className="flex items-center gap-1 text-[9px] sm:text-[10px] text-teal-500">
                              <MapPin size={8} className="sm:w-2.5 sm:h-2.5" /> <span className="truncate max-w-[100px] sm:max-w-none">{session.student_location}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-bold uppercase tracking-wider ${
                          session.attendance?.status === 'present' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
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
                            className="px-1.5 sm:px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-[7px] sm:text-[8px] font-bold uppercase tracking-wider hover:bg-teal-200 transition-colors whitespace-nowrap"
                          >
                            View Score
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 sm:py-12 text-center bg-slate-50 dark:bg-slate-800/30 rounded-xl">
                  <History size={32} className="sm:w-12 sm:h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2 sm:mb-3" />
                  <p className="text-xs sm:text-sm text-slate-500">No attendance history found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-xs sm:text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Evaluation Edit Modal */}
      {isEditingEvaluation && selectedEvaluation && (
        <div className="fixed inset-0 z-[60] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-950 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">Edit Evaluation</h3>
              <button 
                onClick={() => {
                  setIsEditingEvaluation(false);
                  setSelectedEvaluation(null);
                }}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Test Type</label>
                <input 
                  type="text"
                  value={evaluationForm.test_type}
                  onChange={(e) => setEvaluationForm({...evaluationForm, test_type: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="e.g., Highway Driving"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Score (0-100)</label>
                <div className="flex items-center gap-3 sm:gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="100"
                    value={evaluationForm.score}
                    onChange={(e) => setEvaluationForm({...evaluationForm, score: parseInt(e.target.value) || 0})}
                    className="flex-1 accent-teal-600 h-2"
                  />
                  <span className="text-xl sm:text-2xl font-bold text-teal-600 w-12 sm:w-16 text-center">
                    {evaluationForm.score}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Instructor Remarks</label>
                <textarea 
                  rows={3}
                  value={evaluationForm.remarks}
                  onChange={(e) => setEvaluationForm({...evaluationForm, remarks: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
                  placeholder="Add your feedback..."
                />
              </div>

              <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                <button 
                  onClick={() => {
                    setIsEditingEvaluation(false);
                    setSelectedEvaluation(null);
                  }}
                  className="flex-1 px-4 sm:px-6 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-xs sm:text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveEvaluation}
                  disabled={saving}
                  className="flex-1 px-4 sm:px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
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