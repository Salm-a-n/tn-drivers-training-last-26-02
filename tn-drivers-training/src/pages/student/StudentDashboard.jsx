
import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, User, Award, BookOpen, 
  CheckCircle, Car, Users, AlertCircle, Star,Phone,
  Sun, Cloud, X, Send, Loader2
} from 'lucide-react';

const StudentDashboard = () => {
  // Dummy student data
  const [student] = useState({
    name: "Michael Chen",
    package: {
      name: "Full Driver Training Course",
      hours: 40,
      completed_hours: 18,
      remaining_hours: 22,
      progress: 45,
      start_date: "2026-01-15",
      end_date: "2026-04-15",
      includes: [
        "In-car lessons (30 hours)",
        "Online theory (10 hours)",
        "Road test preparation",
        "Vehicle for road test"
      ]
    },
    instructor: {
      name: "Sarah Johnson",
      email: "sarah.johnson@terranova.com",
      phone: "+1 (709) 555-0890",
      avatar: null,
      rating: 4.8,
      experience: "8 years",
      specialization: "Defensive Driving"
    }
  });

  // Reschedule Modal State
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    pickupLocation: '',
    reason: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Dummy schedule data
  const [schedules] = useState([
    {
      id: 1,
      date: "2026-03-25",
      time: "09:00 AM - 10:30 AM",
      startTime: "09:00",
      endTime: "10:30",
      location: "St. John's Driving School",
      pickupLocation: "St. John's Driving School",
      instructor: "Sarah Johnson",
      status: "upcoming",
      topic: "Parallel Parking & City Driving"
    },
    {
      id: 2,
      date: "2026-03-27",
      time: "02:00 PM - 03:30 PM",
      startTime: "14:00",
      endTime: "15:30",
      location: "St. John's Driving School",
      pickupLocation: "St. John's Driving School",
      instructor: "Sarah Johnson",
      status: "upcoming",
      topic: "Highway Merging & Lane Changes"
    },
    {
      id: 3,
      date: "2026-03-20",
      time: "06:00 PM - 08:00 PM",
      startTime: "18:00",
      endTime: "20:00",
      location: "Online - Zoom",
      pickupLocation: "Online",
      instructor: "David Miller",
      status: "completed",
      topic: "Traffic Rules & Regulations",
      attended: true,
      score: 88
    },
    {
      id: 4,
      date: "2026-03-18",
      time: "10:00 AM - 11:30 AM",
      startTime: "10:00",
      endTime: "11:30",
      location: "St. John's Driving School",
      pickupLocation: "St. John's Driving School",
      instructor: "Sarah Johnson",
      status: "completed",
      topic: "Basic Maneuvers & Parking",
      attended: true,
      score: 85
    },
    {
      id: 5,
      date: "2026-03-15",
      time: "01:00 PM - 02:30 PM",
      startTime: "13:00",
      endTime: "14:30",
      location: "Service NL - Mount Pearl",
      pickupLocation: "Service NL - Mount Pearl",
      instructor: "Sarah Johnson",
      status: "completed",
      topic: "Full Road Test Simulation",
      attended: true,
      score: 82
    }
  ]);

  const [activeScheduleTab, setActiveScheduleTab] = useState("upcoming");

  const upcomingSchedules = schedules.filter(s => s.status === 'upcoming');
  const completedSchedules = schedules.filter(s => s.status === 'completed');

  // Format date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatShortDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Get weather/icon based on time
  const getWeatherIcon = () => {
    const hour = new Date().getHours();
    if (hour < 12) return <Sun className="w-5 h-5 text-yellow-500" />;
    if (hour < 17) return <Sun className="w-5 h-5 text-orange-500" />;
    return <Cloud className="w-5 h-5 text-slate-500" />;
  };

  // Handle reschedule request
  const handleRescheduleRequest = (schedule) => {
    setRescheduleModal(schedule);
    setRescheduleForm({
      date: schedule.date,
      startTime: schedule.startTime || schedule.time.split(' - ')[0],
      endTime: schedule.endTime || schedule.time.split(' - ')[1],
      pickupLocation: schedule.pickupLocation || schedule.location,
      reason: ''
    });
  };

  const handleRescheduleSubmit = async () => {
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Reschedule request submitted for ${rescheduleModal.topic}\n\nNew Date: ${rescheduleForm.date}\nTime: ${rescheduleForm.startTime} - ${rescheduleForm.endTime}\nLocation: ${rescheduleForm.pickupLocation}\nReason: ${rescheduleForm.reason || 'Not specified'}`);
      setRescheduleModal(null);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-8xl mx-auto">
      
      {/* Welcome Section with Stats */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900 rounded-3xl shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative px-6 sm:px-8 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-8">
            {/* Left Side - Welcome Message */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                {getWeatherIcon()}
                <span className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight">
                {getGreeting()}, {student.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-teal-100 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                Ready for your next driving session? You're making great progress! Keep up the momentum.
              </p>
              
              {/* Quick Stats - Responsive grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4">
                  <p className="text-teal-100 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Completed</p>
                  <p className="text-white text-2xl sm:text-3xl font-bold">{student.package.completed_hours}<span className="text-base sm:text-lg text-teal-200">/{student.package.hours}h</span></p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4">
                  <p className="text-teal-100 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Progress</p>
                  <p className="text-white text-2xl sm:text-3xl font-bold">{student.package.progress}%</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-4">
                  <p className="text-teal-100 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1">Upcoming</p>
                  <p className="text-white text-2xl sm:text-3xl font-bold">{upcomingSchedules.length} <span className="text-base sm:text-lg text-teal-200">Classes</span></p>
                </div>
              </div>
            </div>

            {/* Right Side - Progress Ring - Hidden on mobile, visible on tablet+ */}
            <div className="hidden sm:flex flex-col items-center bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-white/10">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="50%" cy="50%" r="45%"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50%" cy="50%" r="45%"
                    stroke="white" 
                    strokeWidth="8" 
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - student.package.progress / 100)}`}
                    className="transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white text-2xl sm:text-3xl font-bold">{student.package.progress}%</p>
                  </div>
                </div>
              </div>
              <p className="text-white/90 font-medium text-xs sm:text-sm mt-3 sm:mt-4 uppercase tracking-wider">Course Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Package & Instructor Info Cards - IMPROVED PACKAGE SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Current Package Card - Enhanced Layout */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
          <div className="p-6 sm:p-8 flex flex-col h-full">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-xl">
                  <BookOpen size={22} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {student.package.name}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {student.package.hours} Hours Total • {student.package.includes.length} Core Components
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stats Grid - Better organized */}
            <div className="grid  mb-6 text-center">
              {/* <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Duration
                </p>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-teal-500" />
                  <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">
                    {formatShortDate(student.package.start_date)} — {formatShortDate(student.package.end_date)}
                  </p>
                </div>
              </div> */}
              <div className="bg-slate-50 dark:bg-slate-800/50  rounded-2xl p-4">
                <p className="text-xs md:text-md  font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Remaining Hours
                </p>
                <p className="text-slate-800 dark:text-slate-200 font-bold text-2xl">
                  {student.package.remaining_hours}
                  <span className="text-sm font-normal text-slate-500"> / {student.package.hours}h</span>
                </p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <span>Overall Progress</span>
                <span className="text-teal-600 dark:text-teal-400">{student.package.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-teal-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${student.package.progress}%` }}
                />
              </div>
            </div>

            {/* Package Includes - Responsive grid */}
            <div className="mt-auto">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                What's Included
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {student.package.includes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">
                    <CheckCircle size={18} className="text-teal-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Instructor Card - Enhanced */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
          <div className="p-6 sm:p-8 flex flex-col h-full">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Award size={22} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Your Instructor
                </h2>
              </div>
            </div>
            
            {/* Instructor Info - Responsive layout */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-teal-500/20 flex-shrink-0 border-4 border-white dark:border-slate-900">
                {student.instructor.name.charAt(0)}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {student.instructor.name}
                </h3>
                <p className="text-teal-600 dark:text-teal-400 font-semibold mb-3">
                  {student.instructor.specialization}
                </p>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="inline-flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 px-3 py-1.5 rounded-lg text-sm font-bold">
                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                    {student.instructor.rating} ★
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium">
                    <Clock size={14} />
                    {student.instructor.experience} Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <User size={16} className="text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-sm font-medium break-all">{student.instructor.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <Phone size={16} className="text-teal-600 dark:text-teal-400" />
                </div>
                <span className="text-sm font-medium">{student.instructor.phone}</span>
              </div>
            </div>

            <button className="mt-auto w-full py-3.5 bg-teal-50 hover:bg-teal-100 dark:bg-teal-900/20 dark:hover:bg-teal-900/40 text-teal-700 dark:text-teal-400 rounded-xl font-bold text-sm transition-all shadow-sm">
              Message Instructor
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Section - IMPROVED RESPONSIVE LAYOUT */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
              <Calendar size={24} className="text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Schedule</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your upcoming and completed sessions</p>
            </div>
          </div>

          {/* Modern Pills for Tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveScheduleTab("upcoming")}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeScheduleTab === "upcoming"
                  ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              Upcoming ({upcomingSchedules.length})
            </button>
            <button
              onClick={() => setActiveScheduleTab("completed")}
              className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeScheduleTab === "completed"
                  ? "bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              Completed ({completedSchedules.length})
            </button>
          </div>
        </div>

        {/* Upcoming Schedules - Responsive arrangement */}
        {activeScheduleTab === "upcoming" && (
          <div className="space-y-4">
            {upcomingSchedules.length > 0 ? (
              upcomingSchedules.map((schedule, index) => (
                <div 
                  key={schedule.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-l-teal-500 border-y border-r border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-5 sm:p-6">
                    {/* Mobile Layout (stacked) */}
                    <div className="block md:hidden">
                      {/* Date and Topic */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar size={16} className="text-teal-500" />
                            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                              {formatDate(schedule.date)}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            {schedule.topic}
                          </h3>
                        </div>
                        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-2 text-center min-w-[60px]">
                          <p className="text-teal-600 dark:text-teal-400 text-xs font-bold uppercase">
                            {new Date(schedule.date).toLocaleDateString('en-US', { month: 'short' })}
                          </p>
                          <p className="text-slate-900 dark:text-white text-xl font-bold">
                            {new Date(schedule.date).getDate()}
                          </p>
                        </div>
                      </div>
                      
                      {/* Details Grid - Mobile */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                          <Clock size={16} className="text-teal-500" />
                          <span>{schedule.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                          <MapPin size={16} className="text-teal-500" />
                          <span>{schedule.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg">
                          <Users size={16} className="text-teal-500" />
                          <span>Instructor: {schedule.instructor}</span>
                        </div>
                      </div>
                      
                      {/* Action Button */}
                      <button 
                        onClick={() => handleRescheduleRequest(schedule)}
                        className="w-full px-6 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:border-teal-500 hover:text-teal-600 transition-all"
                      >
                        Reschedule Session
                      </button>
                    </div>

                    {/* Desktop Layout (horizontal) */}
                    <div className="hidden md:flex md:items-center md:justify-between gap-6">
                      {/* Left side - Date Cube + Info */}
                      <div className="flex items-center gap-6 flex-1">
                        {/* Date Cube */}
                        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800/50 rounded-xl p-3 text-center min-w-[90px]">
                          <p className="text-teal-600 dark:text-teal-400 text-xs font-bold uppercase mb-1">
                            {new Date(schedule.date).toLocaleDateString('en-US', { month: 'short' })}
                          </p>
                          <p className="text-slate-900 dark:text-white text-2xl font-black">
                            {new Date(schedule.date).getDate()}
                          </p>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                            {schedule.topic}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                              <Clock size={16} className="text-teal-500" />
                              {schedule.time}
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                              <MapPin size={16} className="text-teal-500" />
                              {schedule.location}
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
                              <Users size={16} className="text-teal-500" />
                              {schedule.instructor}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button 
                        onClick={() => handleRescheduleRequest(schedule)}
                        className="px-6 py-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:border-teal-500 hover:text-teal-600 transition-all whitespace-nowrap"
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-12 text-center">
                <Calendar size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No upcoming sessions</p>
                <p className="text-slate-500 dark:text-slate-500 mt-2">You don't have any classes scheduled right now.</p>
              </div>
            )}
          </div>
        )}

        {/* Completed Schedules - Responsive arrangement */}
        {activeScheduleTab === "completed" && (
          <div className="space-y-4">
            {completedSchedules.length > 0 ? (
              completedSchedules.map((schedule, index) => (
                <div 
                  key={schedule.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-l-slate-300 dark:border-l-slate-600 border-y border-r border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="p-5 sm:p-6">
                    {/* Mobile Layout */}
                    <div className="block md:hidden">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar size={16} className="text-slate-400" />
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {formatDate(schedule.date)}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300 line-through">
                            {schedule.topic}
                          </h3>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                          <span className="text-green-600 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                            <CheckCircle size={12} /> Done
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Clock size={14} />
                          <span>{schedule.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin size={14} />
                          <span>{schedule.location}</span>
                        </div>
                      </div>
                      
                      {schedule.score && (
                        <div className="flex items-center gap-2 text-sm font-bold text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg w-fit">
                          <Star size={14} className="fill-yellow-500" />
                          Score: {schedule.score}%
                        </div>
                      )}
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex md:items-center gap-6">
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-3 text-center min-w-[90px] opacity-70">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">
                          {new Date(schedule.date).toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 text-2xl font-black">
                          {new Date(schedule.date).getDate()}
                        </p>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 line-through">
                            {schedule.topic}
                          </h3>
                          <span className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                            <CheckCircle size={12} /> Completed
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock size={16} /> {schedule.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={16} /> {schedule.location}
                          </span>
                          {schedule.score && (
                            <span className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md font-bold">
                              <Star size={14} className="fill-yellow-500" /> Score: {schedule.score}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-12 text-center">
                <CheckCircle size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p className="text-lg font-bold text-slate-700 dark:text-slate-300">No completed sessions</p>
                <p className="text-slate-500 dark:text-slate-500 mt-2">Your finished classes will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reschedule Modal - Responsive */}
      {rescheduleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Request Reschedule
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {rescheduleModal.topic}
                </p>
              </div>
              <button 
                onClick={() => setRescheduleModal(null)} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white hover:text-red-500 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto">
              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Preferred Date
                </label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={rescheduleForm.date}
                  onChange={(e) => setRescheduleForm({...rescheduleForm, date: e.target.value})}
                  className="w-full px-4 sm:px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    Start Time
                  </label>
                  <input 
                    type="time" 
                    value={rescheduleForm.startTime}
                    onChange={(e) => setRescheduleForm({...rescheduleForm, startTime: e.target.value})}
                    className="w-full px-4 sm:px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
                    End Time
                  </label>
                  <input 
                    type="time" 
                    value={rescheduleForm.endTime}
                    onChange={(e) => setRescheduleForm({...rescheduleForm, endTime: e.target.value})}
                    className="w-full px-4 sm:px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Pickup Location
                </label>
                <input 
                  type="text" 
                  value={rescheduleForm.pickupLocation}
                  onChange={(e) => setRescheduleForm({...rescheduleForm, pickupLocation: e.target.value})}
                  className="w-full px-4 sm:px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  placeholder="Enter pickup location"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Reason for Reschedule <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea 
                  rows={4}
                  value={rescheduleForm.reason}
                  onChange={(e) => setRescheduleForm({...rescheduleForm, reason: e.target.value})}
                  className="w-full px-4 sm:px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
                  placeholder="Please provide a brief reason..."
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 p-6 sm:p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <button 
                onClick={() => setRescheduleModal(null)} 
                className="flex-1 px-6 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleRescheduleSubmit}
                disabled={submitting}
                className="flex-1 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {submitting ? "Sending..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;