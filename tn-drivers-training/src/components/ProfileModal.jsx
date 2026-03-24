// import React, { useState } from "react";
// import ChangePasswordModal from "./ChangePasswordModal";

// const ProfileModal = ({ onClose }) => {
//   // Dummy user data (replace with API later)
//   const [user, setUser] = useState({
//     username: "Admin",
//     email: "teranovaAdmin@gmail.com.com",
//     profilePicture:
//       "https://ui-avatars.com/api/?name=Admin&background=003366&color=fff",
//   });

//   const [editing, setEditing] = useState(false);
//   const [changePasswordOpen, setChangePasswordOpen] = useState(false);

//   // (replace with API call later)
//   const handleSave = () => {
//     console.log("Updated user:", user);
//     setEditing(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-slate-500 hover:text-red-500"
//         >
//           ✕
//         </button>

//         {/* Header Section */}
//         <div className="flex flex-col items-center space-y-4">
//           <div className="relative">
//             <img
//               src={user.profilePicture}
//               alt="profile"
//               className="w-28 h-28 rounded-full object-cover border-4 border-teal"
//             />

//             {/* Edit camra Icon */}
//             {editing && (
//               <div className="absolute bottom-0 right-0 bg-teal p-1 rounded-full cursor-pointer">
//                 <label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       if (file) {
//                         const reader = new FileReader();
//                         reader.onload = () =>
//                           setUser({
//                             ...user,
//                             profilePicture: reader.result,
//                           });
//                         reader.readAsDataURL(file);
//                       }
//                     }}
//                   />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-white"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 7h4l2-3h6l2 3h4a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zM12 11a3 3 0 100 6 3 3 0 000-6z"
//                       />
//                     </svg>




//                 </label>
//               </div>
//             )}
//           </div>

//           {/* Username */}
//           {editing ? (
//             <input
//               type="text"
//               value={user.username}
//               onChange={(e) =>
//                 setUser({ ...user, username: e.target.value })
//               }
//               className="w-full text-center px-4 py-2 rounded-lg border dark:bg-slate-800"
//             />
//           ) : (
//             <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
//           )}

//           {/* Email */}
//           <p className="text-sm text-slate-500">{user.email}</p>

//           {/* Action Buttons */}
//           <div className="flex flex-col w-full space-y-2 mt-2">
//             {editing ? (
//               <button
//                 onClick={handleSave}
//                 className="w-full py-2 bg-teal text-white rounded-lg"
//               >
//                 Save Profile
//               </button>
//             ) : (
//               <>
//                 <button
//                   onClick={() => setEditing(true)}
//                   className="w-full py-2 bg-teal text-white rounded-lg"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   onClick={() => setChangePasswordOpen(true)}
//                   className="w-full py-2 bg-red-500 text-white rounded-lg"
//                 >
//                   Change Password
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Change Password Modal */}
//         {changePasswordOpen && (
//           <ChangePasswordModal onClose={() => setChangePasswordOpen(false)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileModal;









import React, { useState, useEffect } from "react";
import { X, Camera, User, Mail, Shield, Save, Lock, Eye, EyeOff, CheckCircle, Loader2, LogOut, ChevronLeft } from "lucide-react";

const ProfileModal = ({ onClose }) => {
  // Dummy user data
  const [user, setUser] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@terranova.com",
    role: "Administrator",
    profile_picture: "https://i.pravatar.cc/150?u=admin1nn"
  });

  // States
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [view, setView] = useState('profile'); // 'profile' or 'password'
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form states
  const [profileName, setProfileName] = useState(user.name);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [showPass, setShowPass] = useState(false);

  // Auto-clear message
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setUser({ ...user, name: profileName, profile_picture: previewImage || user.profile_picture });
      setMessage({ type: 'success', text: 'Profile updated!' });
      setSaving(false);
      setEditing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
      {/* Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-200 dark:border-slate-800">
        
        {/* Header Area */}
        <div className="relative h-24 bg-gradient-to-r from-teal-500 to-emerald-600">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Avatar Overlay */}
        <div className="relative flex justify-center -mt-12">
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 p-1 shadow-xl">
              <img
                src={previewImage || user.profile_picture}
                alt="Avatar"
                className="w-full h-full object-cover rounded-[1.25rem]"
              />
            </div>
            {editing && (
              <label className="absolute -bottom-2 -right-2 bg-teal-500 p-2 rounded-xl text-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <input type="file" className="hidden" onChange={handleImageChange} />
                <Camera size={16} />
              </label>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 pt-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">{user.name}</h2>
            <p className="text-xs font-medium text-teal-600 dark:text-teal-400 uppercase tracking-widest">{user.role}</p>
          </div>

          {message.text && (
            <div className={`mb-4 p-3 rounded-xl text-xs font-semibold text-center animate-in fade-in slide-in-from-top-2 ${
              message.type === 'success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-rose-50 text-rose-600'
            }`}>
              {message.text}
            </div>
          )}

          {view === 'profile' ? (
            <div className="space-y-4">
              {/* Form Fields */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    disabled={!editing}
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 outline-none transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    readOnly
                    type="text"
                    value={user.email}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                {editing ? (
                  <button 
                    onClick={handleUpdateProfile}
                    className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Save Identity
                  </button>
                ) : (
                  <button 
                    onClick={() => setEditing(true)}
                    className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold text-sm transition-colors"
                  >
                    Modify Profile
                  </button>
                )}
                
                <div className="pt-2 flex flex-col gap-2">
                  <button 
                    onClick={() => setView('password')}
                    className="py-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <Lock size={14} /> Security
                  </button>
                 
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
              <button onClick={() => setView('profile')} className="flex items-center gap-1 text-slate-400 hover:text-teal-500 text-xs font-bold mb-2 transition-colors">
                <ChevronLeft size={14} /> Back to Profile
              </button>
              
              <div className="space-y-3">
                <input 
                  type="password" 
                  placeholder="Current Password" 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                />
                <input 
                  type="password" 
                  placeholder="New Password" 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                />
                <button className="w-full py-3 bg-slate-900 dark:bg-teal-500 text-white rounded-2xl font-bold text-sm">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;