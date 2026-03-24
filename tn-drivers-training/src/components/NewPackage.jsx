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

    console.log("Creating new package:", newPackage); // Debug log
    
    // Call the onAdd callback with the new package
    onAdd(newPackage);
    
    // Close modal after short delay to show loading state
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-white">
                Create New Package
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Configure pricing and curriculum details
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Package Name Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <Package size={14} className="text-teal-500" />
              Package Name *
            </label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none text-sm font-medium text-slate-900 dark:text-slate-200 transition-all placeholder:text-slate-400" 
              placeholder="e.g., Full GDL Program" 
            />
          </div>

          {/* Hours and Price Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none text-sm font-medium text-slate-900 dark:text-slate-200 transition-all" 
                placeholder="12" 
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
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
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none text-sm font-medium text-slate-900 dark:text-slate-200 transition-all" 
                placeholder="450" 
              />
            </div>
          </div>

          {/* License Class Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <GraduationCap size={14} className="text-teal-500" />
              License Class *
            </label>
            <select 
              value={licenseClass} 
              onChange={(e) => setLicenseClass(e.target.value)} 
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none text-sm font-medium text-slate-900 dark:text-slate-200 transition-all cursor-pointer"
            >
              <option>Class 7 L</option>
              <option>Class 7 N</option>
              <option>Class 5</option>
              <option>Class 1</option>
              <option>Class 2</option>
              <option>Class 3</option>
            </select>
          </div>

          {/* Preview Section */}
          {name && price && hours && (
            <div className="mt-4 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={12} className="text-teal-500" />
                <span className="text-[10px] font-soro font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Package Preview</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{name || '—'}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{licenseClass} • {hours || '0'} hours</p>
                </div>
                <p className="text-lg font-bold text-teal-600 dark:text-teal-400">
                  ${price ? parseFloat(price).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !name || !price || !hours}
              className="flex-1 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
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
  );
};

export default NewPackage;