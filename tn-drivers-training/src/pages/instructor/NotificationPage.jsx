import React, { useState, useEffect } from "react";
import { 
  Bell, Info, AlertTriangle, CheckCircle, Mail, 
  X, Loader2, Calendar, Clock, Filter, 
  CheckCheck, Trash2, UserPlus, DollarSign, 
  RefreshCw, Shield, AlertCircle, UserCheck
} from "lucide-react";

const InstructorNotificationPage = () => {
  // Dummy notifications data
  const dummyNotifications = [
    {
      id: 1,
      type: "StudentAssignedNotification",
      message: "New student James Harrison has been assigned to you for City Driving lessons",
      is_read: false,
      created_at: "2026-03-24 09:30 AM",
      read_at: null,
      data: {
        student_name: "James Harrison",
        course: "City Driving",
        location: "St. John's"
      }
    },
    {
      id: 2,
      type: "PaymentReceivedNotification",
      message: "Payment of $450.00 received for student Sarah Williams - Class 5 GDL Package",
      is_read: false,
      created_at: "2026-03-23 02:15 PM",
      read_at: null,
      data: {
        amount: 450.00,
        student: "Sarah Williams",
        package: "Class 5 GDL Package"
      }
    },
    {
      id: 3,
      type: "WelcomeStudentNotification",
      message: "Welcome to Terra Nova! Student Marc-André Leclaire has completed registration",
      is_read: true,
      created_at: "2026-03-22 11:45 AM",
      read_at: "2026-03-22 03:20 PM",
      data: {
        student: "Marc-André Leclaire",
        location: "Grand Falls"
      }
    },
    {
      id: 4,
      type: "InstructorChangedNotification",
      message: "Student Emily Chen has been reassigned to your schedule for Highway Practice",
      is_read: false,
      created_at: "2026-03-22 08:15 AM",
      read_at: null,
      data: {
        student: "Emily Chen",
        previous_instructor: "Jane Smith",
        course: "Highway Practice"
      }
    },
    {
      id: 5,
      type: "ExpenseNotification",
      message: "Monthly fuel expense claim approved - $320.50",
      is_read: true,
      created_at: "2026-03-21 10:00 AM",
      read_at: "2026-03-21 02:30 PM",
      data: {
        amount: 320.50,
        category: "Fuel",
        month: "March 2026"
      }
    },
    {
      id: 6,
      type: "StudentAssignedNotification",
      message: "New student David Miller has been assigned to you for Parking Drills",
      is_read: false,
      created_at: "2026-03-20 01:20 PM",
      read_at: null,
      data: {
        student_name: "David Miller",
        course: "Parking Drills",
        location: "Mount Pearl"
      }
    },
    {
      id: 7,
      type: "PaymentReceivedNotification",
      message: "Payment of $850.00 received for student Sophia Rodriguez - Premium Package",
      is_read: false,
      created_at: "2026-03-19 04:45 PM",
      read_at: null,
      data: {
        amount: 850.00,
        student: "Sophia Rodriguez",
        package: "Premium Package"
      }
    },
    {
      id: 8,
      type: "WelcomeStudentNotification",
      message: "Welcome to Terra Nova! Student Alex Rivera has completed registration",
      is_read: true,
      created_at: "2026-03-18 09:30 AM",
      read_at: "2026-03-18 11:15 AM",
      data: {
        student: "Alex Rivera",
        location: "Marystown"
      }
    },
    {
      id: 9,
      type: "StudentAssignedNotification",
      message: "New student Yuki Tanaka has been assigned to you for Highway Driving",
      is_read: false,
      created_at: "2026-03-17 03:00 PM",
      read_at: null,
      data: {
        student_name: "Yuki Tanaka",
        course: "Highway Driving",
        location: "St. John's"
      }
    },
    {
      id: 10,
      type: "PaymentReceivedNotification",
      message: "Payment of $1,200.00 received for student Jordan Lee - Full G License Bundle",
      is_read: false,
      created_at: "2026-03-16 11:30 AM",
      read_at: null,
      data: {
        amount: 1200.00,
        student: "Jordan Lee",
        package: "Full G License Bundle"
      }
    }
  ];

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const itemsPerPage = 5;

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
  }, [filter]);

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
    if (!confirm('Delete this notification?')) return;
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
    if (type.includes('StudentAssigned')) {
      return <UserPlus size={20} className="text-teal-500" />;
    } else if (type.includes('PaymentReceived')) {
      return <DollarSign size={20} className="text-green-500" />;
    } else if (type.includes('WelcomeStudent')) {
      return <UserCheck size={20} className="text-purple-500" />;
    } else if (type.includes('InstructorChanged')) {
      return <RefreshCw size={20} className="text-orange-500" />;
    } else if (type.includes('Expense')) {
      return <AlertCircle size={20} className="text-amber-500" />;
    } else {
      return <Bell size={20} className="text-indigo-500" />;
    }
  };

  const getNotificationColor = (type) => {
    if (type.includes('StudentAssigned')) return 'bg-teal-50 dark:bg-teal-900/20 border-teal-100 dark:border-teal-800';
    if (type.includes('PaymentReceived')) return 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800';
    if (type.includes('WelcomeStudent')) return 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800';
    if (type.includes('InstructorChanged')) return 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800';
    if (type.includes('Expense')) return 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800';
    return 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800';
  };

  const currentNotifications = getPaginatedNotifications();

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-white dark:from-gray-950 dark:to-slate-900 min-h-screen" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
      
      <main className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6">
        
        {/* Header with Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className=" text-xl md:text-2xl font-['Sora'] font-bold text-slate-800 dark:text-white">
              Notifications <span className="text-teal-600">& Alerts</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
              Stay updated with your teaching activities
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Unread Badge */}
            <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-black text-slate-600 dark:text-slate-300">
                {unreadCount} Unread
              </span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={18} className={`text-slate-600 dark:text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* Mark All Read Button */}
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-teal-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-teal-600 transition-all flex items-center gap-2 shadow-lg"
              >
                <CheckCheck size={14} />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 border ${
            message.type === 'success' 
              ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
          }`}>
            {message.type === 'success' ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
            <span className="text-sm font-bold">{message.text}</span>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 w-fit">
          {[
            { key: 'all', label: 'All', icon: <Bell size={14} /> },
            { key: 'unread', label: 'Unread', icon: <Bell size={14} className="text-teal-500" /> },
            { key: 'read', label: 'Read', icon: <CheckCheck size={14} /> }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                filter === tab.key
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-slate-500 hover:text-teal-600 dark:text-slate-400'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
              <p className="mt-4 text-slate-500 font-bold">Loading notifications...</p>
            </div>
          ) : currentNotifications.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
              <Bell size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg mb-2">No notifications found</p>
              <p className="text-sm text-slate-400">You're all caught up!</p>
            </div>
          ) : (
            currentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`group bg-white dark:bg-slate-800 rounded-2xl border-2 transition-all hover:shadow-lg ${
                  !notification.is_read 
                    ? 'border-teal-500/30 bg-teal-50/30 dark:bg-teal-950/20' 
                    : 'border-slate-200 dark:border-slate-700 hover:border-teal-500/30'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type, notification.data)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-teal-600">
                            {notification.type.replace('Notification', '')}
                          </span>
                          {!notification.is_read && (
                            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 rounded-full text-[8px] font-black uppercase">
                              New
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-3 text-[9px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {notification.created_at}
                          </span>
                          {notification.read_at && (
                            <span className="flex items-center gap-1 text-teal-500">
                              <CheckCheck size={10} />
                              Read
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="font-bold text-slate-800 dark:text-slate-200 mb-3">
                        {notification.message}
                      </p>

                      {/* Additional Data */}
                      {notification.data && Object.keys(notification.data).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Object.entries(notification.data).map(([key, value]) => {
                            if (key !== 'message' && key !== 'type' && value) {
                              return (
                                <div key={key} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-[8px] font-soro text-slate-600 dark:text-slate-300">
                                  <span className="font-black uppercase mr-1">{key}:</span>
                                  <span>{String(value)}</span>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-2 mt-2">
                        {!notification.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-2 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                            title="Mark as read"
                          >
                            <CheckCheck size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>
            <span className="text-xs text-slate-500">
              Page {currentPage} of {totalPages} • {totalItems} total
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default InstructorNotificationPage;