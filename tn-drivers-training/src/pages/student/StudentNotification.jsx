import React, { useState, useEffect } from "react";
import { 
  Bell, Info, AlertTriangle, CheckCircle, Mail, 
  X, Loader2, Calendar, Clock, Filter, 
  CheckCheck, Trash2, UserPlus, DollarSign, 
  RefreshCw, Shield, AlertCircle, UserCheck,
  User, Car, CreditCard, Receipt, FileText,
  Calendar as CalendarIcon, Users, MapPin
} from "lucide-react";

const StudentNotificationPage = () => {
  // Dummy notifications data for students
  const dummyNotifications = [
    {
      id: 1,
      type: "AccountActivationNotification",
      message: "Your account has been successfully activated! Welcome to Terra Nova Driving School.",
      is_read: false,
      created_at: "2026-03-25 08:30 AM",
      read_at: null,
      data: {
        account_status: "Active",
        student_id: "STU-2024-001",
        activation_date: "2026-03-25"
      }
    },
    {
      id: 2,
      type: "InstructorAssignedNotification",
      message: "Instructor Sarah Johnson has been assigned to you for your Full Driver Training Course",
      is_read: false,
      created_at: "2026-03-24 02:15 PM",
      read_at: null,
      data: {
        instructor_name: "Sarah Johnson",
        instructor_rating: "4.8",
        specialization: "Defensive Driving",
        car_model: "Toyota Corolla 2023",
        contact_phone: "+1 (709) 555-0890"
      }
    },
    {
      id: 3,
      type: "ScheduleUpdateNotification",
      message: "Your driving session has been rescheduled to March 28, 2026 at 10:00 AM",
      is_read: false,
      created_at: "2026-03-24 10:45 AM",
      read_at: null,
      data: {
        old_date: "March 27, 2026",
        old_time: "02:00 PM",
        new_date: "March 28, 2026",
        new_time: "10:00 AM",
        topic: "Highway Merging & Lane Changes",
        instructor: "Sarah Johnson",
        location: "St. John's Driving School"
      }
    },
    {
      id: 4,
      type: "PaymentSuccessNotification",
      message: "Payment of $1,299.99 was successful for your Full Driver Training Course",
      is_read: true,
      created_at: "2026-03-23 03:20 PM",
      read_at: "2026-03-23 04:00 PM",
      data: {
        transaction_id: "TXN-8F3A9C2B1D",
        amount: 1299.99,
        payment_method: "VISA **** 4242",
        package_name: "Full Driver Training Course",
        payment_date: "2026-03-23",
        receipt_url: "#",
        status: "Completed"
      }
    },
    {
      id: 5,
      type: "InstructorChangedNotification",
      message: "Your instructor has been changed from David Miller to Sarah Johnson for Highway Practice",
      is_read: false,
      created_at: "2026-03-22 09:00 AM",
      read_at: null,
      data: {
        previous_instructor: "David Miller",
        new_instructor: "Sarah Johnson",
        course: "Highway Practice",
        effective_date: "March 25, 2026"
      }
    },
    {
      id: 6,
      type: "ScheduleReminderNotification",
      message: "Reminder: You have a driving session tomorrow at 09:00 AM",
      is_read: true,
      created_at: "2026-03-21 08:00 AM",
      read_at: "2026-03-21 08:30 AM",
      data: {
        date: "March 22, 2026",
        time: "09:00 AM",
        topic: "Parallel Parking & City Driving",
        location: "St. John's Driving School",
        instructor: "Sarah Johnson"
      }
    },
    {
      id: 7,
      type: "PaymentSuccessNotification",
      message: "Payment of $349.99 was successful for your Winter Driving Package",
      is_read: false,
      created_at: "2026-03-20 11:45 AM",
      read_at: null,
      data: {
        transaction_id: "TXN-4E7B1D9A3C",
        amount: 349.99,
        payment_method: "Mastercard **** 1234",
        package_name: "Winter Driving Package",
        payment_date: "2026-03-20",
        receipt_url: "#",
        status: "Completed"
      }
    },
    {
      id: 8,
      type: "AccountActivationNotification",
      message: "Your email has been verified. You can now book driving sessions.",
      is_read: true,
      created_at: "2026-03-19 04:30 PM",
      read_at: "2026-03-19 05:00 PM",
      data: {
        account_status: "Verified",
        verification_date: "2026-03-19"
      }
    },
    {
      id: 9,
      type: "ScheduleUpdateNotification",
      message: "New driving session has been added to your schedule",
      is_read: false,
      created_at: "2026-03-18 01:00 PM",
      read_at: null,
      data: {
        date: "March 30, 2026",
        time: "02:00 PM - 03:30 PM",
        topic: "Road Test Simulation",
        instructor: "Sarah Johnson",
        location: "Service NL - Mount Pearl"
      }
    },
    {
      id: 10,
      type: "PaymentSuccessNotification",
      message: "Payment of $249.99 was successful for your Refresher Course",
      is_read: true,
      created_at: "2026-03-17 10:15 AM",
      read_at: "2026-03-17 10:45 AM",
      data: {
        transaction_id: "TXN-2A5C8E4F6B",
        amount: 249.99,
        payment_method: "PayPal",
        package_name: "Refresher Course",
        payment_date: "2026-03-17",
        receipt_url: "#",
        status: "Completed"
      }
    },
    {
      id: 11,
      type: "InstructorAssignedNotification",
      message: "Instructor Michael Brown has been assigned to you for your Night Driving Course",
      is_read: false,
      created_at: "2026-03-16 08:00 AM",
      read_at: null,
      data: {
        instructor_name: "Michael Brown",
        instructor_rating: "4.9",
        specialization: "Night Driving Expert",
        car_model: "Honda Civic 2024",
        contact_phone: "+1 (709) 555-0456"
      }
    },
    {
      id: 12,
      type: "ScheduleReminderNotification",
      message: "Reminder: Your driving session starts in 2 hours",
      is_read: true,
      created_at: "2026-03-15 07:00 AM",
      read_at: "2026-03-15 07:15 AM",
      data: {
        date: "March 15, 2026",
        time: "09:00 AM",
        topic: "Basic Maneuvers & Parking",
        location: "St. John's Driving School",
        instructor: "Sarah Johnson"
      }
    }
  ];

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const itemsPerPage = 6;

  // Load dummy data
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      setTimeout(() => {
        setNotifications(dummyNotifications);
        const unread = dummyNotifications.filter(n => !n.is_read).length;
        setUnreadCount(unread);
        setTotalItems(dummyNotifications.length);
        setTotalPages(Math.ceil(dummyNotifications.length / itemsPerPage));
        setLoading(false);
      }, 500);
    };
    loadData();
  }, []);

  // Auto-clear message after 3 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Filter notifications based on selected filter
  const getFilteredNotifications = () => {
    let filtered = [...notifications];
    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.is_read);
    } else if (filter === 'read') {
      filtered = filtered.filter(n => n.is_read);
    }
    return filtered;
  };

  // Paginate filtered notifications
  const getPaginatedNotifications = () => {
    const filtered = getFilteredNotifications();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filtered.slice(start, end);
  };

  // Update pagination when filter changes
  useEffect(() => {
    const filtered = getFilteredNotifications();
    setTotalItems(filtered.length);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [filter, notifications]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setMessage({ type: 'success', text: 'Notifications refreshed' });
    }, 800);
  };

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, is_read: true, read_at: 'Just now' } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
    setMessage({ type: 'success', text: 'Notification marked as read' });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, is_read: true, read_at: 'Just now' })));
    setUnreadCount(0);
    setMessage({ type: 'success', text: 'All notifications marked as read' });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this notification?')) return;
    const notificationToDelete = notifications.find(n => n.id === id);
    setNotifications(notifications.filter(n => n.id !== id));
    if (!notificationToDelete?.is_read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setTotalItems(prev => prev - 1);
    setTotalPages(Math.ceil((totalItems - 1) / itemsPerPage));
    setMessage({ type: 'success', text: 'Notification deleted' });
  };

  const getNotificationIcon = (type, data) => {
    if (type.includes('AccountActivation')) {
      return <Shield size={18} className="text-emerald-500" />;
    } else if (type.includes('InstructorAssigned') || type.includes('InstructorChanged')) {
      return <UserCheck size={18} className="text-blue-500" />;
    } else if (type.includes('ScheduleUpdate') || type.includes('ScheduleReminder')) {
      return <CalendarIcon size={18} className="text-purple-500" />;
    } else if (type.includes('PaymentSuccess')) {
      return <DollarSign size={18} className="text-green-500" />;
    } else {
      return <Bell size={18} className="text-indigo-500" />;
    }
  };

  const getTypeLabel = (type) => {
    if (type.includes('AccountActivation')) return 'Account Activation';
    if (type.includes('InstructorAssigned')) return 'Instructor Assigned';
    if (type.includes('InstructorChanged')) return 'Instructor Changed';
    if (type.includes('ScheduleUpdate')) return 'Schedule Update';
    if (type.includes('ScheduleReminder')) return 'Session Reminder';
    if (type.includes('PaymentSuccess')) return 'Payment Success';
    return 'Notification';
  };

  const currentNotifications = getPaginatedNotifications();

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      
      {/* HEADER */}
      <header className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl  font-bold tracking-tight text-slate-800 dark:text-white">
              Notifications <span className="text-teal-600 dark:text-teal-400">& Alerts</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
              Stay updated with your driving progress, schedule changes, and payment status
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Unread Badge */}
            <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                {unreadCount} Unread
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-all"
              title="Refresh"
            >
              <RefreshCw size={18} className={`text-slate-600 dark:text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* Mark All Read Button */}
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <CheckCheck size={14} />
                Mark All Read
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8 overflow-x-hidden">
        <div className="max-w-[1920px] mx-auto">
          
          {/* Message Alert */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
              message.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
            }`}>
              {message.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'all', label: 'All Notifications', icon: <Bell size={12} />, count: totalItems },
              { key: 'unread', label: 'Unread', icon: <Bell size={12} />, count: unreadCount },
              { key: 'read', label: 'Read', icon: <CheckCheck size={12} />, count: totalItems - unreadCount }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm transition-all flex items-center gap-1 md:gap-2 ${
                  filter === tab.key
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-teal-600 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab.icon}
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  filter === tab.key
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Notifications List */}
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={48} />
              <p className="text-sm font-semibold text-slate-500">Loading notifications...</p>
            </div>
          ) : currentNotifications.length === 0 ? (
            <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <Bell size={56} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No notifications found</p>
              <p className="text-sm text-slate-400 mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all hover:shadow-md ${
                    !notification.is_read 
                      ? 'border-teal-300 dark:border-teal-700 bg-teal-50/30 dark:bg-teal-950/20' 
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                        {getNotificationIcon(notification.type, notification.data)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                              {getTypeLabel(notification.type)}
                            </span>
                            {!notification.is_read && (
                              <span className="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full text-[9px] font-bold uppercase">
                                New
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {notification.created_at}
                            </span>
                            {notification.read_at && (
                              <span className="flex items-center gap-1 text-teal-600">
                                <CheckCheck size={12} />
                                Read
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-sm font-semibold text-slate-800 dark:text-white mb-3">
                          {notification.message}
                        </p>

                        {/* Additional Data - Special handling for different notification types */}
                        {notification.data && Object.keys(notification.data).length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {/* Transaction ID gets special highlight */}
                            {notification.data.transaction_id && (
                              <div className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <span className="text-xs font-semibold text-green-700 dark:text-green-400 flex items-center gap-1">
                                  <Receipt size={12} />
                                  Transaction ID: {notification.data.transaction_id}
                                </span>
                              </div>
                            )}
                            
                            {/* Display other data fields */}
                            {Object.entries(notification.data).map(([key, value]) => {
                              if (key === 'transaction_id') return null;
                              const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                              return (
                                <div key={key} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400">
                                  <span className="font-semibold mr-1">{formattedKey}:</span>
                                  <span>{String(value)}</span>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2 mt-2">
                          {!notification.is_read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1.5 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <CheckCheck size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-8 mt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <span className="text-sm text-slate-500">
                Page <span className="font-bold text-slate-700 dark:text-white">{currentPage}</span> of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentNotificationPage;