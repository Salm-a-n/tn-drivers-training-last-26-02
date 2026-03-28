// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// const Sidebar = ({ isOpen, setIsOpen }) => {
//   const navigate = useNavigate();

//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("theme") === "dark";
//   });

//   // Theme Sync
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   const handleLogout = () => {
//     console.log("User logged out");
//     navigate("/login");
//     setIsOpen(false);
//   };

//   const menuItems = [
//     { name: "Dashboard", icon: "dashboard", path: "/admin" },
//     { name: "Applications", icon: "assignment", path: "/admin/applications" },
//     { name: "Students", icon: "group", path: "/admin/students" },
//     { name: "Instructors", icon: "badge", path: "/admin/instructors" },
//     { name: "fleet", icon: "directions_car", path: "/admin/fleet" },
//     { name: "Packages", icon: "inventory_2", path: "/admin/packages" },
//     { name: "Schedule", icon: "calendar_today", path: "/admin/schedule" },
//     // { name: "Attendance", icon: "fact_check", path: "/attendance" },
//     // { name: "Tests", icon: "quiz", path: "/tests" },
//     { name: "Payments", icon: "payments", path: "/admin/payments" },
//     { name: "Expenses", icon: "receipt_long", path: "/admin/finances" },
//   ];


//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900
//           border-r border-slate-200 dark:border-slate-800
//           flex flex-col
//           overflow-y-auto
//           transition-transform duration-300 transform
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:relative md:flex
//         `}
//       >
//         {/* LOGO */}
//         <div className="p-6 flex items-center space-x-3">
//           <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center text-white shadow-md">
//             <span className="material-symbols-outlined">
//               all_inclusive
//             </span>
//           </div>
//           <div>
//             <h2 className="text-lg font-bold tracking-tight text-navy dark:text-white leading-tight">
//               Terra Nova
//             </h2>
//             <p className="text-[10px] uppercase tracking-wider font-semibold text-teal">
//               Drivers Training
//             </p>
//           </div>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="px-3 space-y-1 pb-4">
//   {menuItems.map((item) => (
//     <NavLink
//       key={item.name}
//       to={item.path}
//       // ADD THIS LINE BELOW
//       end={item.path === "/admin"} 
//       onClick={() => setIsOpen(false)}
//       className={({ isActive }) =>
//         `${
//           isActive
//             ? "active-nav text-white"
//             : "text-slate-500 dark:text-slate-400 hover:bg-teal/5"
//         } flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300`
//       }
//     >
//       <span className="material-symbols-outlined text-[20px]">
//         {item.icon}
//       </span>
//       <span className="text-[14px]">{item.name}</span>
//     </NavLink>
//   ))}
// </nav>

//         {/* BOTTOM SECTION */}
//         <div className="px-3 pb-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
//           {/* Appearance Toggle */}
//           <div className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-teal/5 transition-colors">
//             <div className="flex items-center space-x-3">
//               <span className="material-symbols-outlined text-[20px] text-slate-500 dark:text-cyan">
//                 {darkMode ? "dark_mode" : "light_mode"}
//               </span>
//               <span className="text-[14px] text-slate-500 dark:text-slate-400">
//                 Appearance
//               </span>
//             </div>

//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
//                 darkMode ? "bg-teal" : "bg-slate-300"
//               }`}
//             >
//               <div
//                 className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
//                   darkMode ? "translate-x-5" : ""
//                 }`}
//               />
//             </button>
//           </div>

//           {/* SETTINGS - Updated to use NavLink */}
//           <NavLink 
//             to="/admin/settings"
//             onClick={() => setIsOpen(false)}
//             className={({ isActive }) =>
//               `${
//                 isActive
//                   ? "active-nav text-white shadow-lg"
//                   : "text-slate-500 dark:text-slate-400 hover:bg-teal/5"
//               } flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-300`
//             }
//           >
//             <span className="material-symbols-outlined text-[20px]">
//               settings
//             </span>
//             <span className="text-[14px]">Settings</span>
//           </NavLink>

//           {/* LOGOUT */}
//           <button
//             onClick={handleLogout}
//             className="mt-1 w-full flex items-center space-x-3 px-4 py-2 rounded-lg
//                        bg-red-100 dark:bg-red-900/30
//                        text-red-600 dark:text-red-400
//                        hover:bg-red-200 dark:hover:bg-red-900/50
//                        transition-all duration-300 font-semibold"
//           >
//             <span className="material-symbols-outlined text-[20px]">
//               logout
//             </span>
//             <span className="text-[14px]">Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;



























import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Theme Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
    setIsOpen(false);
  };

  const menuItems = [
    { name: "Dashboard", icon: "⊞", path: "/Dashboard", section: "Main" },
    { name: "Applications", icon: "📋", path: "/Applications", section: "Main" },
    { name: "Students", icon: "👤", path: "/Students", section: "Main" },
    { name: "Instructors", icon: "🪪", path: "/Instructors", section: "Main" },
    { name: "Fleet", icon: "🚗", path: "/Fleet", section: "Main" },
    { name: "Packages", icon: "📦", path: "/Packages", section: "Finance" },
    { name: "Payments", icon: "💳", path: "/Payments", section: "Finance" },
    { name: "Expenses", icon: "🧾", path: "/Finances", section: "Finance" },
    { name: "Schedule", icon: "📅", path: "/Schedule", section: "System" },
  ];

  // Group menu items by section
  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR - White background, clean design */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-220px bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
          flex flex-col
          overflow-y-auto
          transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:flex
          shadow-[3px_0_16px_rgba(0,0,0,0.08)]
        `}
      >
        {/* HEADER with house icon and brand */}
        <div className=" border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">

            <div className="w-54.5 h-15 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white dark:bg-white shadow-md">
              <img 
                src="/logo.webp" 
                alt="Terra Nova Logo" 
                className="w-70 h-20 object-contain p-1"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://ui-avatars.com/api/?name=TN&background=008B8B&color=fff&size=40";
                }}
              />
            </div>
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* NAVIGATION with sections */}
        <nav className="flex-1 overflow-y-auto  px-2">
          {Object.entries(groupedItems).map(([section, items]) => (
            <div key={section}>
              <div className="text-[0.90rem] font-soro font-semibold tracking-[0.20rem] uppercase text-slate-400 dark:text-slate-500 px-3 pt-4 pb-1.5">
                {section}
              </div>
              {items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/Dashboard"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 my-0.5 rounded-md font-medium text-[1.rem] transition-all duration-200
                    ${isActive 
                      ? "bg-teal-500 text-white shadow-sm font-semibold" 
                      : "text-slate-600 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400 hover:pl-4"
                    }`
                  }
                >
                  <span className="text-[0.82rem] w-4 text-center flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="whitespace-nowrap">{item.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* BOTTOM SECTION */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-3 pb-4 px-2">
          {/* Appearance Toggle */}
          <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors group">
            <div className="flex items-center gap-2.5">
              <span className="text-[1rem] text-slate-500 dark:text-slate-400">
                {darkMode ? "🌙" : "☀️"}
              </span>
              <span className="text-[1rem] font-medium text-slate-600 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                Appearance
              </span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-all duration-300 ${
                darkMode ? "bg-teal-500" : "bg-slate-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${
                  darkMode ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>

          {/* SETTINGS */}
          <NavLink
            to="/Settings"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 my-0.5 rounded-md font-medium text-[1rem] transition-all duration-200
              ${isActive 
                ? "bg-teal-500 text-white shadow-sm font-semibold" 
                : "text-slate-600 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 dark:hover:text-teal-400 hover:pl-4"
              }`
            }
          >
            <span className="text-[0.82rem] w-4 text-center">⚙️</span>
            <span>Settings</span>
          </NavLink>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-2 w-full flex items-center gap-2.5 px-3 py-2 rounded-md
                       bg-red-50 dark:bg-red-900/20
                       text-red-600 dark:text-red-400
                       hover:bg-red-100 dark:hover:bg-red-900/40
                       transition-all duration-200 font-medium text-[0.78rem]"
          >
            <span className="text-[1rem] w-4 text-center">↪</span>
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;







