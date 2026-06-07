// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FiSearch, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { RiArrowDropDownLine } from "react-icons/ri";

// export default function DashboardNavbar() {
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [hasNotification, setHasNotification] = useState(true);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close the dropdown if the user clicks anywhere outside of it
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="w-full bg-[#1a1a1f] border-b border-white/5 px-5 py-2.5 flex items-center justify-between gap-4 shadow-lg">
//       {/* Search Bar */}
//       <div
//         className={`flex items-center gap-2.5 flex-1 max-w-xl bg-[#26262d] rounded-md px-3.5 py-2 transition-all duration-200 ${
//           searchFocused
//             ? "ring-1 ring-indigo-500/60 bg-[#2c2c35]"
//             : "ring-1 ring-transparent hover:ring-white/10"
//         }`}
//       >
//         <FiSearch
//           className={`text-base shrink-0 transition-colors duration-200 ${
//             searchFocused ? "text-indigo-400" : "text-gray-500"
//           }`}
//         />
//         <input
//           type="text"
//           placeholder="Search applications, jobs, or talent..."
//           onFocus={() => setSearchFocused(true)}
//           onBlur={() => setSearchFocused(false)}
//           className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none w-full font-light tracking-wide"
//         />
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-3">
//         {/* Notification Bell */}
//         <button
//           onClick={() => setHasNotification(false)}
//           className="relative p-2 rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-all duration-150 group"
//           aria-label="Notifications"
//         >
//           <IoMdNotificationsOutline className="text-xl" />
//           {hasNotification && (
//             <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full ring-2 ring-[#1a1a1f]" />
//           )}
//         </button>

//         {/* Divider */}
//         <div className="h-7 w-px bg-white/10" />

//         {/* User Profile Container */}
//         <div className="relative" ref={dropdownRef}>
//           <button 
//             onClick={() => setIsProfileOpen(!isProfileOpen)}
//             className="flex items-center gap-2.5 pl-1 pr-1 py-1 rounded-md hover:bg-white/5 transition-all duration-150 group"
//           >
//             {/* Avatar */}
//             <div className="relative">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shadow-md shadow-indigo-900/30">
//                 AS
//               </div>
//               {/* Online indicator */}
//               <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#1a1a1f]" />
//             </div>

//             {/* Name & Company */}
//             <div className="text-left hidden sm:block">
//               <p className="text-gray-200 text-xs font-medium leading-tight tracking-wide">
//                 Alex Sterling
//               </p>
//               <p className="text-gray-500 text-[10px] leading-tight tracking-wider">
//                 TechPro Inc.
//               </p>
//             </div>

//             <RiArrowDropDownLine 
//               className={`text-gray-500 text-xl transition-transform duration-200 group-hover:text-gray-300 ${
//                 isProfileOpen ? "rotate-180 text-gray-300" : ""
//               }`} 
//             />
//           </button>

//           {/* Dropdown Menu */}
//           {isProfileOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-[#212127] border border-white/5 rounded-md shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
//               <a
//                 href="#profile"
//                 className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
//                 onClick={() => setIsProfileOpen(false)}
//               >
//                 <FiUser className="text-sm text-gray-400" />
//                 Your Profile
//               </a>
//               <a
//                 href="#settings"
//                 className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
//                 onClick={() => setIsProfileOpen(false)}
//               >
//                 <FiSettings className="text-sm text-gray-400" />
//                 Settings
//               </a>
              
//               <div className="border-t border-white/5 my-1" />
              
//               <button
//                 onClick={() => {
//                   setIsProfileOpen(false);
//                   console.log("Signing out...");
//                 }}
//                 className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
//               >
//                 <FiLogOut className="text-sm" />
//                 Sign out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function DashboardNavbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Mock notifications array
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Application Received",
      description: "Sarah Jenkins applied for Senior React Developer.",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Interview Scheduled",
      description: "Your interview with TechPro team is set for tomorrow.",
      time: "2h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Profile Viewed",
      description: "4 companies viewed your profile this week.",
      time: "1d ago",
      unread: false,
    },
  ]);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Determine if there are any remaining unread notifications
  const hasUnread = notifications.some((n) => n.unread);

  // Handle outside clicks to close separate dropdown structures
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark an individual item as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <nav className="w-full bg-[#1a1a1f] border-b border-white/5 px-5 py-2.5 flex items-center justify-between gap-4 shadow-lg">
      {/* Search Bar */}
      <div
        className={`flex items-center gap-2.5 flex-1 max-w-xl bg-[#26262d] rounded-md px-3.5 py-2 transition-all duration-200 ${
          searchFocused
            ? "ring-1 ring-indigo-500/60 bg-[#2c2c35]"
            : "ring-1 ring-transparent hover:ring-white/10"
        }`}
      >
        <FiSearch
          className={`text-base shrink-0 transition-colors duration-200 ${
            searchFocused ? "text-indigo-400" : "text-gray-500"
          }`}
        />
        <input
          type="text"
          placeholder="Search applications, jobs, or talent..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className="bg-transparent text-sm text-gray-300 placeholder-gray-600 outline-none w-full font-light tracking-wide"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Notification Container */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className={`relative p-2 rounded-md transition-all duration-150 ${
              isNotificationOpen 
                ? "text-gray-200 bg-white/5" 
                : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            }`}
            aria-label="Notifications"
          >
            <IoMdNotificationsOutline className="text-xl" />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full ring-2 ring-[#1a1a1f]" />
            )}
          </button>

          {/* Notification Dropdown Menu */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#212127] border border-white/5 rounded-md shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-100">
              <div className="px-4 py-2.5 border-b border-white/5 flex items-center justify-between bg-[#1e1e24]">
                <span className="text-xs font-medium text-gray-200">Notifications</span>
                {hasUnread && (
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({...n, unread: false})))}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notification List Scroll Wrapper */}
              <div className="max-h-80 overflow-y-auto divide-y divide-white/[0.03]">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-gray-500">
                    No new notifications
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markAsRead(item.id)}
                      className={`p-3.5 flex gap-3 cursor-pointer text-left transition-colors ${
                        item.unread 
                          ? "bg-indigo-500/[0.02] hover:bg-indigo-500/[0.05]" 
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Active State Dot Indicator */}
                      <div className="shrink-0 pt-1">
                        <span className={`block w-1.5 h-1.5 rounded-full ${item.unread ? 'bg-indigo-400' : 'bg-transparent'}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <p className={`text-xs truncate ${item.unread ? 'text-gray-100 font-medium' : 'text-gray-400'}`}>
                            {item.title}
                          </p>
                          <span className="text-[10px] text-gray-500 whitespace-nowrap shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-7 w-px bg-white/10" />

        {/* User Profile Container */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2.5 pl-1 pr-1 py-1 rounded-md hover:bg-white/5 transition-all duration-150 group"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shadow-md shadow-indigo-900/30">
                AS
              </div>
              {/* Online indicator */}
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#1a1a1f]" />
            </div>

            {/* Name & Company */}
            <div className="text-left hidden sm:block">
              <p className="text-gray-200 text-xs font-medium leading-tight tracking-wide">
                Alex Sterling
              </p>
              <p className="text-gray-500 text-[10px] leading-tight tracking-wider">
                TechPro Inc.
              </p>
            </div>

            <RiArrowDropDownLine 
              className={`text-gray-500 text-xl transition-transform duration-200 group-hover:text-gray-300 ${
                isProfileOpen ? "rotate-180 text-gray-300" : ""
              }`} 
            />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#212127] border border-white/5 rounded-md shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
              <a
                href="#profile"
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <FiUser className="text-sm text-gray-400" />
                Your Profile
              </a>
              <a
                href="#settings"
                className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <FiSettings className="text-sm text-gray-400" />
                Settings
              </a>
              
              <div className="border-t border-white/5 my-1" />
              
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  console.log("Signing out...");
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left"
              >
                <FiLogOut className="text-sm" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}