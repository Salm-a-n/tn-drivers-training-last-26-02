import React, { useState, useEffect } from "react";
import { 
  Bell, CheckCheck, Trash2, X, 
  UserPlus, CreditCard, RefreshCw, AlertCircle,
  Calendar, User, DollarSign, MessageCircle, Mail, Clock
} from "lucide-react";

// Dummy Data Generator
const generateDummyNotifications = () => {
  const types = [
    { type: "StudentAssigned", icon: <UserPlus size={18} className="text-blue-500" />, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600" },
    { type: "PaymentReceived", icon: <DollarSign size={18} className="text-green-500" />, color: "bg-green-100 dark:bg-green-900/30 text-green-600" },
    { type: "WelcomeStudent", icon: <User size={18} className="text-purple-500" />, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600" },
    { type: "InstructorChanged", icon: <RefreshCw size={18} className="text-orange-500" />, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" },
    { type: "LessonReminder", icon: <Calendar size={18} className="text-indigo-500" />, color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600" },
    { type: "InvoiceGenerated", icon: <CreditCard size={18} className="text-amber-500" />, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600" }
  ];

  const messages = {
    StudentAssigned: "New student assigned to your class",
    PaymentReceived: "Payment received successfully",
    WelcomeStudent: "New student registration completed",
    InstructorChanged: "Your instructor has been changed",
    LessonReminder: "Upcoming lesson reminder",
    InvoiceGenerated: "New invoice generated"
  };

  const names = ["Alex Rivera", "Sam Chen", "Jordan Smith", "Maria Garcia", "Yuki Tanaka", "James Wilson", "Emma Davis", "Liam Brown"];
  const amounts = [450.00, 320.50, 680.00, 275.30, 890.00, 150.00];
  const courses = ["Class 5 GDL", "Class 7 L", "Highway Driving", "Parking Practice", "Defensive Driving", "Road Test Prep"];

  return Array.from({ length: 25 }, (_, i) => {
    const typeData = types[i % types.length];
    const isRead = i % 3 === 0;
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const date = daysAgo > 0 
      ? `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
      : `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;

    let data = {};
    if (typeData.type === "StudentAssigned") {
      data = { student_name: names[i % names.length], course: courses[i % courses.length] };
    } else if (typeData.type === "PaymentReceived") {
      data = { amount: `$${amounts[i % amounts.length].toFixed(2)}`, transaction_id: `TXN-${Math.floor(Math.random() * 100000)}` };
    } else if (typeData.type === "WelcomeStudent") {
      data = { student_name: names[i % names.length], email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@email.com` };
    } else if (typeData.type === "InstructorChanged") {
      data = { new_instructor: ["John Doe", "Jane Smith", "Sarah Connor"][i % 3], old_instructor: ["Mike Ross", "Rachel Zane", "Harvey Specter"][i % 3] };
    } else if (typeData.type === "LessonReminder") {
      data = { date: "Tomorrow, 2:30 PM", location: ["Burin", "St. John's", "Marystown"][i % 3] };
    } else if (typeData.type === "InvoiceGenerated") {
      data = { invoice_no: `INV-${String(1000 + i).slice(-4)}`, amount: `$${amounts[i % amounts.length].toFixed(2)}`, due_date: `${Math.floor(Math.random() * 30)} days` };
    }

    return {
      id: i + 1,
      type: typeData.type,
      message: messages[typeData.type],
      data: data,
      is_read: isRead,
      read_at: isRead ? (daysAgo > 0 ? `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago` : `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`) : null,
      created_at: date,
      icon: typeData.icon,
      iconColor: typeData.color
    };
  });
};

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const dummyData = generateDummyNotifications();
      setNotifications(dummyData);
      setUnreadCount(dummyData.filter(n => !n.is_read).length);
      setLoading(false);
    }, 800);
  }, []);

  const getFilteredNotifications = () => {
    let filtered = [...notifications];
    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.is_read);
    } else if (filter === 'read') {
      filtered = filtered.filter(n => n.is_read);
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalFiltered = () => {
    if (filter === 'unread') return notifications.filter(n => !n.is_read).length;
    if (filter === 'read') return notifications.filter(n => n.is_read).length;
    return notifications.length;
  };

  const totalPages = Math.ceil(getTotalFiltered() / itemsPerPage);
  const paginatedNotifications = getFilteredNotifications();

  const handleMarkAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === id ? { ...n, is_read: true, read_at: 'Just now' } : n
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, is_read: true, read_at: 'Just now' }))
    );
    setUnreadCount(0);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this notification?')) return;
    setNotifications(prev => prev.filter(n => n.id !== id));
    const remainingUnread = notifications.filter(n => n.id !== id && !n.is_read).length;
    setUnreadCount(remainingUnread);
  };

  const getNotificationIcon = (notification) => {
    return notification.icon;
  };

  const getNotificationColor = (isRead) => {
    return isRead 
      ? 'bg-white dark:bg-slate-900' 
      : 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-teal-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-0 sm:p-4">
      {/* Responsive Modal Container */}
      <div className="w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl bg-white dark:bg-slate-950 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 sm:slide-in-from-right sm:w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
              <Bell size={18} className="text-teal-600 dark:text-teal-400 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                Notifications
              </h2>
              <p className="text-[10px] sm:text-xs text-slate-800 dark:text-slate-400">
                {unreadCount} unread • {notifications.length} total
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="p-1.5 sm:p-2 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                title="Mark all as read"
              >
                <CheckCheck size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px] text-slate-400 hover:text-red-500 " />
            </button>
          </div>
        </div>

        {/* Filter Tabs - Horizontal Scroll on Mobile */}
        <div className="px-4 sm:px-6 py-2 sm:py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'read', label: 'Read' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id);
                  setCurrentPage(1);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-300 hover:text-teal-600 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="h-[calc(100vh-200px)] sm:max-h-[50vh] lg:max-h-[55vh] overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
              <p className="text-md text-slate-800 dark:text-slate-300 mt-43">Loading notifications...</p>
            </div>
          ) : paginatedNotifications.length === 0 ? (
            <div className="py-20 text-center">
              <Bell size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-bold text-base sm:text-lg">No notifications found</p>
              <p className="text-md sm:text-sm text-slate-400 mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 sm:p-5 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/30 ${getNotificationColor(notification.is_read)}`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notification.iconColor} bg-opacity-100 dark:bg-opacity-20`}>
                      {getNotificationIcon(notification)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                        <div className="flex-1">
                          <p className={`text-sm md:text-md lg:text-lg xl:text-xl font-semibold ${notification.is_read ? 'text-slate-900 dark:text-slate-300' : 'text-slate-800 dark:text-white'}`}>
                            {notification.message}
                          </p>
                          {notification.data && Object.keys(notification.data).length > 0 && (
                            <div className="mt-2 text-xs text-slate-900 dark:text-slate-400 space-y-1">
                              {Object.entries(notification.data).map(([key, value]) => {
                                const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                                return (
                                  <div key={key} className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] sm:text-[14px] xl:text-[16px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{formattedKey}:</span>
                                    <span className="text-xs sm:text-sm lg:text-lg font-bold text-slate-900 dark:text-slate-300 uppercase tracking-wider">{String(value)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
                            <span className="text-[11px] sm:text-[16px] text-slate-400 flex items-center gap-1">
                              <Clock size={14} />
                              {notification.created_at}
                            </span>
                            {notification.read_at && (
                              <span className="text-[11px] sm:text-[16
                              px] text-teal-600 dark:text-teal-400 flex items-center gap-1">
                                <CheckCheck size={14} />
                                Read {notification.read_at}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 flex-shrink-0 self-start sm:self-auto">
                          {!notification.is_read && (
                            <button
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="p-1.5 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <CheckCheck size={12} className="sm:w-[14px] sm:h-[14px]" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notification.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={12} className="sm:w-[14px] sm:h-[14px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Page <span className="font-bold text-slate-700 dark:text-white">{currentPage}</span> of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;