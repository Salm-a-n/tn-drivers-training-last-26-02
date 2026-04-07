
import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Clock, MapPin, User, Award, BookOpen, 
  CheckCircle, Car, Users, AlertCircle, Star, 
  Sun, Cloud, X, Send, Loader2, FileText,
  TrendingUp, Target, ThumbsUp, MessageCircle,
  ClipboardList, Activity, BarChart3, CheckSquare,
  AlertTriangle, Info, Download, ChevronDown, ChevronUp,
  Clock as ClockIcon, Calendar as CalendarIcon
} from 'lucide-react';

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, variant = 'default' }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = variant === 'compact' ? 3 : 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        Previous
      </button>
      
      <div className="flex gap-1 sm:gap-2">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`min-w-[32px] sm:min-w-[40px] px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-teal-600 text-white'
                : page === '...'
                ? 'bg-transparent text-slate-500 dark:text-slate-400 cursor-default'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

const TestEvaluationPage = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [studentResponse, setStudentResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendancePage, setAttendancePage] = useState(1);
  const [evaluationPage, setEvaluationPage] = useState(1);
  const itemsPerPage = 5;
  const textareaRef = useRef(null);

  // Dummy data matching TestEvaluation model structure
  const [evaluations] = useState([
    {
      id: 1,
      assignment_id: 101,
      test_type: "Parking Test",
      score: 85,
      instructor_remarks: "Good parallel parking skills. Need to improve on angle parking. Overall good control of the vehicle during parking maneuvers.",
      student_reply: null,
      created_at: "2026-03-25",
      assignment: {
        id: 101,
        schedule_date: "2026-03-25",
        start_time: "10:00 AM",
        end_time: "11:30 AM",
        location: "St. John's Driving School",
        instructor: {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.johnson@terranova.com"
        }
      }
    },
    {
      id: 2,
      assignment_id: 102,
      test_type: "Road Test - City Driving",
      score: 82,
      instructor_remarks: "Good handling of city traffic. Need to improve lane changing confidence and mirror checking frequency. Overall safe driving practices.",
      student_reply: "Thank you for the feedback. I will work on my lane changing confidence.",
      created_at: "2026-03-20",
      assignment: {
        id: 102,
        schedule_date: "2026-03-20",
        start_time: "01:00 PM",
        end_time: "02:30 PM",
        location: "St. John's Downtown",
        instructor: {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.johnson@terranova.com"
        }
      }
    },
    {
      id: 3,
      assignment_id: 103,
      test_type: "Highway Driving Evaluation",
      score: 78,
      instructor_remarks: "Student struggles with highway merging speed and confidence. Needs more practice with maintaining consistent highway speed and safe following distances.",
      student_reply: null,
      created_at: "2026-03-18",
      assignment: {
        id: 103,
        schedule_date: "2026-03-18",
        start_time: "02:00 PM",
        end_time: "03:30 PM",
        location: "Trans-Canada Highway",
        instructor: {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.johnson@terranova.com"
        }
      }
    },
    {
      id: 4,
      assignment_id: 104,
      test_type: "Theory Test - Module 1",
      score: 92,
      instructor_remarks: "Excellent understanding of traffic rules and regulations. Demonstrated strong knowledge of road signs and right-of-way rules.",
      student_reply: "I studied hard for this test. Happy with the result!",
      created_at: "2026-03-15",
      assignment: {
        id: 104,
        schedule_date: "2026-03-15",
        start_time: "06:00 PM",
        end_time: "07:00 PM",
        location: "Online",
        instructor: {
          id: 2,
          name: "David Miller",
          email: "david.miller@terranova.com"
        }
      }
    },
    {
      id: 5,
      assignment_id: 105,
      test_type: "Mock Road Test",
      score: 75,
      instructor_remarks: "Student needs improvement in overall confidence and decision making. Good basic skills but hesitation in traffic situations.",
      student_reply: null,
      created_at: "2026-03-12",
      assignment: {
        id: 105,
        schedule_date: "2026-03-12",
        start_time: "10:00 AM",
        end_time: "12:00 PM",
        location: "Service NL - Mount Pearl",
        instructor: {
          id: 1,
          name: "Sarah Johnson",
          email: "sarah.johnson@terranova.com"
        }
      }
    },
    {
      id: 6,
      assignment_id: 106,
      test_type: "Night Driving Assessment",
      score: 88,
      instructor_remarks: "Good adaptation to night driving conditions. Handled glare from oncoming traffic well. Maintained appropriate speeds.",
      student_reply: "Night driving was challenging but I enjoyed it.",
      created_at: "2026-03-10",
      assignment: {
        id: 106,
        schedule_date: "2026-03-10",
        start_time: "07:00 PM",
        end_time: "08:30 PM",
        location: "St. John's City",
        instructor: {
          id: 3,
          name: "Michael Brown",
          email: "michael.brown@terranova.com"
        }
      }
    }
  ]);

  // Dummy attendance data matching Attendance model
  const [attendances] = useState([
    {
      id: 1,
      assignment_id: 101,
      status: "present",
      marked_at: "2026-03-25 09:55:00",
      assignment: {
        id: 101,
        schedule_date: "2026-03-25",
        start_time: "10:00 AM",
        end_time: "11:30 AM",
        test_evaluation: {
          test_type: "Parking Test"
        },
        instructor: {
          name: "Sarah Johnson"
        }
      }
    },
    {
      id: 2,
      assignment_id: 102,
      status: "present",
      marked_at: "2026-03-20 13:55:00",
      assignment: {
        id: 102,
        schedule_date: "2026-03-20",
        start_time: "01:00 PM",
        end_time: "02:30 PM",
        test_evaluation: {
          test_type: "Road Test - City Driving"
        },
        instructor: {
          name: "Sarah Johnson"
        }
      }
    },
    {
      id: 3,
      assignment_id: 103,
      status: "present",
      marked_at: "2026-03-18 13:58:00",
      assignment: {
        id: 103,
        schedule_date: "2026-03-18",
        start_time: "02:00 PM",
        end_time: "03:30 PM",
        test_evaluation: {
          test_type: "Highway Driving Evaluation"
        },
        instructor: {
          name: "Sarah Johnson"
        }
      }
    },
    {
      id: 4,
      assignment_id: 104,
      status: "present",
      marked_at: "2026-03-15 17:55:00",
      assignment: {
        id: 104,
        schedule_date: "2026-03-15",
        start_time: "06:00 PM",
        end_time: "07:00 PM",
        test_evaluation: {
          test_type: "Theory Test - Module 1"
        },
        instructor: {
          name: "David Miller"
        }
      }
    },
    {
      id: 5,
      assignment_id: 105,
      status: "present",
      marked_at: "2026-03-12 09:55:00",
      assignment: {
        id: 105,
        schedule_date: "2026-03-12",
        start_time: "10:00 AM",
        end_time: "12:00 PM",
        test_evaluation: {
          test_type: "Mock Road Test"
        },
        instructor: {
          name: "Sarah Johnson"
        }
      }
    },
    {
      id: 6,
      assignment_id: 106,
      status: "present",
      marked_at: "2026-03-10 18:55:00",
      assignment: {
        id: 106,
        schedule_date: "2026-03-10",
        start_time: "07:00 PM",
        end_time: "08:30 PM",
        test_evaluation: {
          test_type: "Night Driving Assessment"
        },
        instructor: {
          name: "Michael Brown"
        }
      }
    },
    {
      id: 7,
      assignment_id: 107,
      status: "present",
      marked_at: "2026-03-05 09:55:00",
      assignment: {
        id: 107,
        schedule_date: "2026-03-05",
        start_time: "10:00 AM",
        end_time: "11:30 AM",
        test_evaluation: {
          test_type: "Defensive Driving"
        },
        instructor: {
          name: "Sarah Johnson"
        }
      }
    },
    {
      id: 8,
      assignment_id: 108,
      status: "present",
      marked_at: "2026-02-28 13:55:00",
      assignment: {
        id: 108,
        schedule_date: "2026-02-28",
        start_time: "01:00 PM",
        end_time: "02:30 PM",
        test_evaluation: {
          test_type: "Winter Driving"
        },
        instructor: {
          name: "Michael Brown"
        }
      }
    }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Focus textarea when selected test changes
  useEffect(() => {
    if (selectedTest && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [selectedTest]);

  // Pagination logic for attendance
  const attendanceTotalPages = Math.ceil(attendances.length / itemsPerPage);
  const paginatedAttendances = attendances.slice(
    (attendancePage - 1) * itemsPerPage,
    attendancePage * itemsPerPage
  );

  // Pagination logic for evaluations
  const evaluationTotalPages = Math.ceil(evaluations.length / itemsPerPage);
  const paginatedEvaluations = evaluations.slice(
    (evaluationPage - 1) * itemsPerPage,
    evaluationPage * itemsPerPage
  );

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format datetime
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    return new Date(dateTimeString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get score color based on percentage
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (score >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800';
    if (score >= 80) return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800';
    if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
    if (score >= 60) return 'bg-orange-100 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800';
    return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800';
  };

  const getStatusBadge = (score) => {
    if (score >= 80) {
      return <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold flex items-center gap-1"><CheckCircle size={12} /> Passed</span>;
    } else if (score >= 70) {
      return <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg text-xs font-bold flex items-center gap-1"><AlertTriangle size={12} /> Needs Improvement</span>;
    } else if (score >= 60) {
      return <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-bold flex items-center gap-1"><AlertCircle size={12} /> Borderline</span>;
    }
    return <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-bold flex items-center gap-1"><AlertCircle size={12} /> Failed</span>;
  };

  const handleSubmitResponse = async (evaluationId) => {
    if (!studentResponse.trim()) {
      alert('Please enter your response before submitting.');
      return;
    }
    
    setSubmitting(true);
    setTimeout(() => {
      alert(`Your response has been submitted for evaluation #${evaluationId}\n\nResponse: ${studentResponse}`);
      setStudentResponse('');
      setSelectedTest(null);
      setSubmitting(false);
    }, 1000);
  };

  const handleTextareaChange = (e, evaluationId) => {
    e.stopPropagation();
    setSelectedTest(evaluationId);
    setStudentResponse(e.target.value);
  };

  const handleCardHeaderClick = (evaluationId, isExpanded) => {
    if (selectedTest === evaluationId) {
      return;
    }
    
    if (isExpanded) {
      setExpandedCard(null);
    } else {
      setExpandedCard(evaluationId);
    }
  };

  // Calculate stats
  const totalTests = evaluations.length;
  const averageScore = Math.round(evaluations.reduce((sum, e) => sum + e.score, 0) / totalTests);
  const passedTests = evaluations.filter(e => e.score >= 80).length;
  const presentCount = attendances.filter(a => a.status === 'present').length;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={48} />
          <p className="text-slate-600 dark:text-slate-400">Loading your evaluations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="max-w-8xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Header */}
          <div className="mb-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
              Tests & <span className="text-teal-600 dark:text-teal-400">Evaluations</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              View your test results, instructor feedback, and session history
            </p>
          </div>

          {/* Stats Summary - Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Tests</p>
                <ClipboardList size={14} className="sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">{totalTests}</p>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">Completed evaluations</p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg. Score</p>
                <BarChart3 size={14} className="sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-teal-600 dark:text-teal-400">{averageScore}%</p>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">Overall performance</p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Passed</p>
                <ThumbsUp size={14} className="sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{passedTests}</p>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">Successful tests</p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Attendance</p>
                <CheckSquare size={14} className="sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">{presentCount}/{attendances.length}</p>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mt-1">Sessions attended</p>
            </div>
          </div>

          {/* Attendance History Section with Pagination */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <ClockIcon size={18} className="text-teal-600 dark:text-teal-400" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">Attendance History</h2>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {(attendancePage - 1) * itemsPerPage + 1} - {Math.min(attendancePage * itemsPerPage, attendances.length)} of {attendances.length}
                </span>
              </div>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Test Type</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Marked At</th>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {paginatedAttendances.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-3 text-sm text-slate-700 dark:text-slate-300">
                        {formatDate(record.assignment.schedule_date)}
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-700 dark:text-slate-300">
                        {record.assignment.test_evaluation?.test_type || 'N/A'}
                      </td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold capitalize">
                          {record.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">
                        {formatDateTime(record.marked_at)}
                       </td>
                      <td className="px-5 py-3 text-sm text-slate-700 dark:text-slate-300">
                        {record.assignment.instructor.name}
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View for Attendance */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedAttendances.map((record) => (
                <div key={record.id} className="p-4 space-y-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                          {record.assignment.test_evaluation?.test_type || 'N/A'}
                        </h3>
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold capitalize">
                          {record.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(record.assignment.schedule_date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} />
                          {record.assignment.start_time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg">
                      <span className="text-slate-500 dark:text-slate-400 block mb-1">Marked At</span>
                      <p className="text-slate-700 dark:text-slate-300 font-medium text-xs">
                        {formatDateTime(record.marked_at)}
                      </p>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg">
                      <span className="text-slate-500 dark:text-slate-400 block mb-1">Instructor</span>
                      <p className="text-slate-700 dark:text-slate-300 font-medium text-xs">
                        {record.assignment.instructor.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination for Attendance */}
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800">
              <Pagination 
                currentPage={attendancePage}
                totalPages={attendanceTotalPages}
                onPageChange={setAttendancePage}
                variant="compact"
              />
            </div>
          </div>

          {/* Evaluations List with Pagination */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white">Test Results & Evaluations</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Showing {(evaluationPage - 1) * itemsPerPage + 1} - {Math.min(evaluationPage * itemsPerPage, evaluations.length)} of {evaluations.length}
              </span>
            </div>
            
            {evaluations.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <FileText size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p className="text-slate-500 dark:text-slate-400 font-medium">No evaluations found</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Your test results will appear here</p>
              </div>
            ) : (
              <>
                {paginatedEvaluations.map((evaluation) => {
                  const isExpanded = expandedCard === evaluation.id;
                  const hasResponded = evaluation.student_reply && evaluation.student_reply.trim() !== '';
                  const isSelectedForResponse = selectedTest === evaluation.id;
                  
                  const toggleExpand = (e) => {
                    e.stopPropagation();
                    if (isExpanded) {
                      setExpandedCard(null);
                    } else {
                      setExpandedCard(evaluation.id);
                    }
                  };

                  const handleResponseClick = (e) => {
                    e.stopPropagation();
                    if (!isSelectedForResponse) {
                      setSelectedTest(evaluation.id);
                      setStudentResponse('');
                    }
                  };

                  return (
                    <div key={evaluation.id} className={`bg-white dark:bg-slate-900 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      evaluation.score >= 80
                        ? 'border-green-200 dark:border-green-800'
                        : evaluation.score >= 70
                        ? 'border-yellow-200 dark:border-yellow-800'
                        : 'border-orange-200 dark:border-orange-800'
                    }`}>
                      
                      {/* Card Header */}
                      {/* Card Header */}
<div 
  className="p-4 sm:p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
  onClick={() => handleCardHeaderClick(evaluation.id, isExpanded)}
>
  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {getStatusBadge(evaluation.score)}
      </div>
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2 break-words">
        {evaluation.test_type}
      </h3>
      <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-slate-600 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar size={12} />
          {formatDate(evaluation.assignment.schedule_date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {evaluation.assignment.start_time}
        </span>
        <span className="flex items-center gap-1">
          <User size={12} />
          {evaluation.assignment.instructor.name}
        </span>
      </div>
    </div>
    
    {/* Score Display - Shows on all screen sizes */}
    <div className="flex-shrink-0 self-start sm:self-center">
      {/* Mobile Score Badge (smaller version) */}
      <div className="sm:hidden">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl ${getScoreBgColor(evaluation.score)}`}>
          <span className={`text-base font-bold ${getScoreColor(evaluation.score)}`}>
            {evaluation.score}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">/100</span>
        </div>
      </div>
      
      {/* Desktop Score Display (larger version) */}
      <div className={`hidden sm:inline-flex flex-col items-center p-2 sm:p-3 rounded-xl ${getScoreBgColor(evaluation.score)}`}>
        <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${getScoreColor(evaluation.score)}`}>
          {evaluation.score}
        </span>
        <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">/100</span>
      </div>
    </div>
  </div>
  
  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
    <div className="flex items-center gap-2 text-xs">
      {hasResponded && (
        <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
          <CheckCircle size={12} />
          <span className="hidden xs:inline">You responded</span>
          <span className="xs:hidden">Responded</span>
        </span>
      )}
    </div>
    <button 
      onClick={toggleExpand}
      className="text-teal-600 dark:text-teal-400 text-xs font-semibold flex items-center gap-1 hover:underline"
    >
      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      <span className="hidden xs:inline">{isExpanded ? 'Show Less' : 'View Details'}</span>
    </button>
  </div>
</div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-slate-100 dark:border-slate-800">
                          {/* Instructor Remarks */}
                          <div className="mb-4 sm:mb-5 p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <MessageCircle size={14} className="sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400" />
                              <h4 className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">Instructor's Remarks</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {evaluation.instructor_remarks}
                            </p>
                          </div>

                          {/* Location Info */}
                          <div className="mb-4 sm:mb-5 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <MapPin size={12} className="sm:w-3.5 sm:h-3.5 text-blue-600 dark:text-blue-400" />
                              <h4 className="text-[10px] sm:text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Location</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 break-words">
                              {evaluation.assignment.location}
                            </p>
                          </div>

                          {/* Previous Student Response */}
                          {hasResponded && (
                            <div className="mb-4 sm:mb-5 p-3 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                              <div className="flex items-center gap-2 mb-2">
                                <MessageCircle size={12} className="sm:w-3.5 sm:h-3.5 text-teal-600 dark:text-teal-400" />
                                <h4 className="text-[10px] sm:text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Your Previous Response</h4>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 break-words">
                                {evaluation.student_reply}
                              </p>
                            </div>
                          )}

                          {/* Student Response Section */}
                          <div 
                            className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700"
                            onClick={handleResponseClick}
                          >
                            <label className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-2">
                              <MessageCircle size={14} className="sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400" />
                              {hasResponded ? 'Update Your Response' : 'Your Response'}
                            </label>
                            <textarea
                              ref={isSelectedForResponse ? textareaRef : null}
                              rows={3}
                              value={isSelectedForResponse ? studentResponse : (hasResponded ? evaluation.student_reply : '')}
                              onChange={(e) => handleTextareaChange(e, evaluation.id)}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={(e) => {
                                e.stopPropagation();
                                if (!isSelectedForResponse) {
                                  setSelectedTest(evaluation.id);
                                  setStudentResponse(hasResponded ? evaluation.student_reply : '');
                                }
                              }}
                              disabled={submitting}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Share your thoughts about this test/evaluation..."
                            />
                            {isSelectedForResponse && studentResponse !== (hasResponded ? evaluation.student_reply : '') && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSubmitResponse(evaluation.id);
                                }}
                                disabled={submitting}
                                className="mt-3 px-4 sm:px-5 py-1.5 sm:py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                                Submit Response
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Pagination for Evaluations */}
                <Pagination 
                  currentPage={evaluationPage}
                  totalPages={evaluationTotalPages}
                  onPageChange={setEvaluationPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEvaluationPage;