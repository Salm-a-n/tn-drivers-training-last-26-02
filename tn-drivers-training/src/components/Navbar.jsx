import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import NotificationModal from "./NotificationModal";
import { Bell, Home } from "lucide-react";

const Navbar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [unreadCount, setUnreadCount] = useState(0);

  // Dummy unread count - in real app, this would come from API
  useEffect(() => {
    // Simulate fetching unread count
    setUnreadCount(3);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pageTitle =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const dateStr = currentTime.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-300"
          >
            <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-xl">
              {isOpen ? "close" : "menu"}
            </span>
          </button>

          {/* PAGE TITLE SECTION */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
              <Home className="w-4 h-4 text-teal-600 dark:text-teal-400" strokeWidth={1.8} />
            </div>
            <div>
              <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                {pageTitle}
              </h1>
              <div className="hidden sm:flex items-center gap-1.5 text-xs sm:text-lg md:text-xl lg:text-2xl text-slate-800 dark:text-slate-300 font-medium">
                <span>{dateStr}</span>
                <span className="text-slate-350">•</span>
                <span>{timeStr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(true)}
              className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
              title="View Notifications"
            >
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors" strokeWidth={1.7} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </button>

            {/* Optional: Show unread count badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>

          {/* Profile Section */}
          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 group"
            title="Profile Settings"
          >
            <img
              src="https://i.pravatar.cc/36"
              alt="profile"
              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 group-hover:border-teal-300 transition-colors"
            />
            <span className="hidden sm:inline text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Admin
            </span>
          </button>
        </div>
      </header>

      {/* MODALS */}
      {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
      {showNotifications && <NotificationModal onClose={() => setShowNotifications(false)} />}
    </>
  );
};

export default Navbar;








// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import ProfileModal from "./ProfileModal";
// import { Bell, Home } from "lucide-react";

// const Navbar = ({ isOpen, setIsOpen }) => {
//   const location = useLocation();
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showProfile, setShowProfile] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   const notifications = [
//     { id: 1, message: "New student registered" },
//     { id: 2, message: "Payment received" },
//     { id: 3, message: "Instructor assigned to a new course" },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const pageTitle =
//     location.pathname === "/"
//       ? "Dashboard"
//       : location.pathname.replace("/", "").replace("-", " ");

//   const dateStr = currentTime.toLocaleDateString(undefined, {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//   });
//   const timeStr = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   return (
//     <>
//       <header className="relative flex items-center justify-between px-4 md:px-6 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">

//         {/* LEFT SECTION */}
//         <div className="flex items-center gap-3 md:gap-4">
//           {/* MOBILE MENU BUTTON */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-300"
//           >
//             <span className="material-symbols-outlined text-slate-700 dark:text-slate-300 text-xl">
//               {isOpen ? "close" : "menu"}
//             </span>
//           </button>

//           {/* PAGE TITLE SECTION */}
//           <div className="flex items-center gap-2">
//             <div className="w-7 h-7 md:w-8 md:h-8 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
//               <Home className="w-4 h-4 md:w-4.5 md:h-4.5 text-teal-600 dark:text-teal-400" strokeWidth={1.8} />
//             </div>
//             <div>
//               <h1 className="text-[0.95rem] sm:text-[1.3rem] md:text-[1.5rem] font-semibold tracking-tight text-slate-800 dark:text-slate-100 leading-tight">
//                 {pageTitle}
//               </h1>
//               <div className="hidden sm:flex items-center gap-1.5 text-[0.75rem] md:text-[1rem] lg:text-[1.1rem] text-slate-500 dark:text-slate-400 font-mono tracking-wide">
//                 <span>{dateStr}</span>
//                 <span className="text-slate-400">•</span>
//                 <span>{timeStr}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SECTION */}
//         <div className="flex items-center gap-2 sm:gap-3">

//           {/* Notification Button */}
//           <div className="relative">
//             <button
//               onClick={() => setShowNotifications(!showNotifications)}
//               className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
//             >
//               <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" strokeWidth={1.7} />
//               {notifications.length > 0 && (
//                 <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
//               )}
//             </button>

//             {showNotifications && (
//               <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden">
//                 <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700">
//                   <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
//                     Notifications
//                   </span>
//                 </div>
//                 <div className="max-h-64 overflow-y-auto">
//                   {notifications.map((n) => (
//                     <div
//                       key={n.id}
//                       className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0"
//                     >
//                       <div className="text-[0.75rem] font-medium text-slate-700 dark:text-slate-300">
//                         {n.message}
//                       </div>
//                       <div className="text-[0.6rem] text-slate-400 dark:text-slate-500 mt-1 font-mono">
//                         Just now
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Profile Section */}
//           <button
//             onClick={() => setShowProfile(true)}
//             className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
//           >
//             <img
//               src="https://i.pravatar.cc/36"
//               alt="profile"
//               className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
//             />
//             <span className="text-[0.7rem] sm:text-[0.75rem] font-medium text-slate-700 dark:text-slate-300">
//               Admin
//             </span>
//           </button>
//         </div>
//       </header>

//       {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}
//     </>
//   );
// };

// export default Navbar;