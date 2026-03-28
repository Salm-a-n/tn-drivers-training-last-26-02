// import React, { useState } from "react";

// const NewPackage = ({ onClose, onAdd }) => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [licenseClass, setLicenseClass] = useState("Class 5");
//   const [hours, setHours] = useState(""); // New state for time

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name || !price || !hours) return;

//     onAdd({
//       id: Date.now(),
//       name,
//       price: parseFloat(price),
//       licenseClass,
//       hours: parseInt(hours), // Adding the time value here
//       sessions: Math.ceil(parseInt(hours) / 1.5), // Optional: auto-calc sessions
//     });
    
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md">
//       <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 transition-colors">
//         <div className="bg-teal p-8 text-white relative">
//           <h3 className="text-2xl font-black">Create Package</h3>
//           <p className="text-teal-50 text-sm">Set curriculum time and pricing</p>
//           <button onClick={onClose} className="absolute top-4 right-4 font-bold text-white hover:text-gray-200 transition">X</button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-5">
//           <div>
//             <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Package Name</label>
//             <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-teal rounded-2xl px-5 py-3 outline-none transition-all dark:text-white font-bold" placeholder="e.g. Full GDL Program" />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Total Hours</label>
//               <input type="number" required value={hours} onChange={(e) => setHours(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-teal rounded-2xl px-5 py-3 outline-none dark:text-white font-bold" placeholder="e.g. 12" />
//             </div>
//             <div>
//               <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Price ($)</label>
//               <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-teal rounded-2xl px-5 py-3 outline-none dark:text-white font-bold" placeholder="450" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">License Class</label>
//             <select value={licenseClass} onChange={(e) => setLicenseClass(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3 outline-none dark:text-white border-2 border-transparent focus:border-teal font-bold">
//               <option>Class 7 L</option>
//               <option>Class 7 N</option>
//               <option>Class 5</option>
//               <option>Class 1</option>
//             </select>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button type="button" onClick={onClose} className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors">Discard</button>
//             <button type="submit" className="flex-1 bg-teal text-white rounded-2xl font-bold shadow-lg shadow-teal/20 hover:opacity-90 transition-all">Save Package</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewPackage;












import React, { useState } from "react";
import { X, Package, Clock, DollarSign, GraduationCap, Plus, Zap } from "lucide-react";

const NewPackage = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [licenseClass, setLicenseClass] = useState("Class 5");
  const [hours, setHours] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!name.trim()) {
      alert("Please enter package name");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      alert("Please enter a valid price");
      return;
    }
    if (!hours || parseInt(hours) <= 0) {
      alert("Please enter valid hours");
      return;
    }

    setIsSubmitting(true);

    // Create new package object
    const newPackage = {
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price),
      licenseClass: licenseClass,
      hours: parseInt(hours),
      sessions: Math.ceil(parseInt(hours) / 1.5),
    };

    console.log("Creating new package:", newPackage);
    
    // Call the onAdd callback with the new package
    onAdd(newPackage);
    
    // Close modal after short delay to show loading state
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-950 w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Create New <span className="text-teal-600 dark:text-teal-400">Package</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Configure pricing and curriculum details
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Package Name Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Package size={14} className="text-teal-500" />
                Package Name *
              </label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm font-medium text-slate-900 dark:text-white transition-all placeholder:text-slate-400" 
                placeholder="e.g., Full GDL Program" 
              />
            </div>

            {/* Hours and Price Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Clock size={14} className="text-teal-500" />
                  Total Hours *
                </label>
                <input 
                  type="number" 
                  required 
                  min="1"
                  step="1"
                  value={hours} 
                  onChange={(e) => setHours(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm font-medium text-slate-900 dark:text-white transition-all" 
                  placeholder="12" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign size={14} className="text-teal-500" />
                  Base Price *
                </label>
                <input 
                  type="number" 
                  required 
                  min="0"
                  step="0.01"
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm font-medium text-slate-900 dark:text-white transition-all" 
                  placeholder="450" 
                />
              </div>
            </div>

            {/* License Class Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <GraduationCap size={14} className="text-teal-500" />
                License Class *
              </label>
              <div className="relative">
                <select 
                  value={licenseClass} 
                  onChange={(e) => setLicenseClass(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm font-medium text-slate-900 dark:text-white transition-all cursor-pointer appearance-none"
                >
                  <option>Class 7 L</option>
                  <option>Class 7 N</option>
                  <option>Class 5</option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                  <option>Class 3</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {name && price && hours && (
              <div className="mt-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={14} className="text-teal-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Package Preview</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-slate-800 dark:text-white">{name || '—'}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{licenseClass} • {hours || '0'} hours</p>
                  </div>
                  <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    ${price ? parseFloat(price).toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button 
                type="button" 
                onClick={onClose} 
                className="flex-1 px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting || !name || !price || !hours}
                className="flex-1 px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Create Package
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPackage;