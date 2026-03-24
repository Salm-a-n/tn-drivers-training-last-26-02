// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const EditPackage = ({ pkg, onClose, onUpdate }) => {
//   // Use state to handle form inputs
//   const [name, setName] = useState(pkg.name);
//   const [price, setPrice] = useState(pkg.price);
//   const [licenseClass, setLicenseClass] = useState(pkg.licenseClass);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Pass the updated object back to Packages.jsx
//     onUpdate({
//       ...pkg, // keep the original id
//       name: name,
//       price: parseFloat(price),
//       licenseClass: licenseClass
//     });
    
//     onClose(); // Close modal
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//       <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
//         <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-black uppercase tracking-tight">Edit Package</h2>
//             <p className="text-indigo-100 text-xs">Update curriculum details</p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
//             <X size={24} />
//           </button>
//         </div>
        
//         <form className="p-8 space-y-5" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Package Name</label>
//             <input 
//               type="text" 
//               value={name} 
//               onChange={(e) => setName(e.target.value)}
//               className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-5 py-3 outline-none transition-all dark:text-white font-bold" 
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Price ($ CAD)</label>
//               <input 
//                 type="number" 
//                 value={price} 
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-indigo-500 rounded-2xl px-5 py-3 outline-none transition-all dark:text-white font-bold" 
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">License Class</label>
//               <select 
//                 value={licenseClass} 
//                 onChange={(e) => setLicenseClass(e.target.value)}
//                 className="w-full bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3 outline-none dark:text-white border-2 border-transparent focus:border-indigo-500 font-bold"
//               >
//                 <option>Class 7 L</option>
//                 <option>Class 7 N</option>
//                 <option>Class 5</option>
//                 <option>Class 1</option>
//               </select>
//             </div>
//           </div>

//           <div className="pt-6 flex gap-3">
//             <button 
//               type="button" 
//               onClick={onClose} 
//               className="flex-1 py-4 font-bold text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all"
//             >
//               Update Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditPackage;

























import React, { useState } from 'react';
import { X, Package, DollarSign, GraduationCap, Save } from 'lucide-react';

const EditPackage = ({ pkg, onClose, onUpdate }) => {
  const [name, setName] = useState(pkg.name);
  const [price, setPrice] = useState(pkg.price);
  const [licenseClass, setLicenseClass] = useState(pkg.licenseClass);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("Please enter package name");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    setIsSubmitting(true);
    
    // Pass the updated object back to Packages.jsx
    onUpdate({
      ...pkg,
      name: name.trim(),
      price: parseFloat(price),
      licenseClass: licenseClass
    });
    
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-white">
                Edit Package
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Update package details
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
              Package Name
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none text-sm font-medium text-slate-900 dark:text-slate-200 transition-all" 
              placeholder="Package name"
            />
          </div>

          {/* Price and License Class Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <DollarSign size={14} className="text-teal-500" />
                Base Price
              </label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 outline-none text-sm font-medium text-slate-900 dark:text-slate-200 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                <GraduationCap size={14} className="text-teal-500" />
                License Class
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
          </div>

          {/* Preview Section */}
          {name && price && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-teal-500 rounded-full"></div>
                <span className="text-[10px] font-soro font-semibold uppercase tracking-wider text-slate-500">Preview</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">{name || '—'}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{licenseClass}</p>
                </div>
                <p className="text-base font-semibold text-teal-600 dark:text-teal-400">
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
              disabled={isSubmitting || !name || !price}
              className="flex-1 px-4 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all active:scale-95 shadow-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Update Package
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPackage;