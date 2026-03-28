// import React, { useState } from 'react';
// import { 
//   X, Car, Hash, Palette, FileText, Gauge, 
//   Upload, MapPin, ChevronDown, CalendarDays 
// } from 'lucide-react';

// const RegisterVehicleModal = ({ onClose, onRegister }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     plate: '',
//     color: '',
//     location: 'St. John’s / Mount Pearl',
//     km: '',
//     insuranceExpiry: '', // New Field
//     rcExpiry: '',        // New Field
//     insuranceFile: null
//   });

//   const locations = [
//     "Burin",
//     "Grand Falls",
//     "Marystown",
//     "St. John’s / Mount Pearl"
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onRegister(formData);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
//       <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
//       <div className="bg-white dark:bg-[#111827] w-full max-w-xl rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
//         {/* Header */}
//         <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
//           <div>
//             <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic leading-none">
//               Register <span className="text-[#008B8B]">Vehicle</span>
//             </h2>
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 text-teal-600">Compliance & Asset Onboarding</p>
//           </div>
//           <button onClick={onClose} className="p-2 bg-white dark:bg-slate-800 rounded-full text-slate-400 hover:text-rose-500 shadow-sm transition-all active:scale-90">
//             <X size={20}/>
//           </button>
//         </div>

//         {/* Form Content */}
//         <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto scrollbar-hide">
          
//           {/* Section 1: Basic Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <Car size={14} className="text-[#008B8B]"/> Vehicle Name
//               </label>
//               <input required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#008B8B]/20 outline-none" placeholder="2024 Toyota Corolla" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <Hash size={14} className="text-[#008B8B]"/> Number Plate
//               </label>
//               <input required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#008B8B]/20 outline-none uppercase" placeholder="VXB-102" value={formData.plate} onChange={(e) => setFormData({...formData, plate: e.target.value})} />
//             </div>
//           </div>

//           {/* Section 2: Specs */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <Palette size={14} className="text-[#008B8B]"/> Vehicle Color
//               </label>
//               <input required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#008B8B]/20 outline-none" placeholder="Midnight Blue" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} />
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <Gauge size={14} className="text-[#008B8B]"/> Kilometer (KM)
//               </label>
//               <input required type="number" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#008B8B]/20 outline-none" placeholder="12500" value={formData.km} onChange={(e) => setFormData({...formData, km: e.target.value})} />
//             </div>
//           </div>

//           {/* Section 3: Compliance Dates (NEW) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800">
//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <CalendarDays size={14} className="text-orange-500"/> Insurance Expiry
//               </label>
//               <input required type="date" className="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-orange-500/20" value={formData.insuranceExpiry} onChange={(e) => setFormData({...formData, insuranceExpiry: e.target.value})} />
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <CalendarDays size={14} className="text-blue-500"/> RC Expiry
//               </label>
//               <input required type="date" className="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-2.5 text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20" value={formData.rcExpiry} onChange={(e) => setFormData({...formData, rcExpiry: e.target.value})} />
//             </div>
//           </div>

//           {/* Location Field */}
//           <div className="space-y-2">
//             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <MapPin size={14} className="text-[#008B8B]"/> Assign Branch Location
//             </label>
//             <div className="relative">
//               <select required className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3.5 text-sm font-bold dark:text-white focus:ring-2 focus:ring-[#008B8B]/20 outline-none appearance-none cursor-pointer" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}>
//                 {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
//               </select>
//               <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
//             </div>
//           </div>

//           {/* Insurance Upload */}
//           <div className="space-y-2">
//             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <FileText size={14} className="text-[#008B8B]"/> Insurance Document
//             </label>
//             <div className="relative group">
//               <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => setFormData({...formData, insuranceFile: e.target.files[0]})} />
//               <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 text-center group-hover:border-[#008B8B] group-hover:bg-[#008B8B]/5 transition-all">
//                 <Upload className="mx-auto text-slate-300 group-hover:text-[#008B8B] mb-2" size={32}/>
//                 <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
//                   {formData.insuranceFile ? formData.insuranceFile.name : "Click or drag insurance PDF/Image"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="pt-4 flex gap-4">
//             <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">Discard</button>
//             <button type="submit" className="flex-[2] py-4 bg-[#008B8B] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-[#008B8B]/20 hover:scale-[1.02] active:scale-95 transition-all">Add to Fleet</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterVehicleModal;






import React, { useState } from 'react';
import { 
  X, Car, Hash, Palette, FileText, Gauge, 
  Upload, MapPin, ChevronDown, CalendarDays 
} from 'lucide-react';

const RegisterVehicleModal = ({ onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    plate: '',
    color: '',
    location: 'St. John’s / Mount Pearl',
    km: '',
    insuranceExpiry: '',
    rcExpiry: '',
    insuranceFile: null
  });

  const locations = [
    "Burin",
    "Grand Falls",
    "Marystown",
    "St. John’s / Mount Pearl"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-950 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Register New <span className="text-teal-600 dark:text-teal-400">Vehicle</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Add a new vehicle to the fleet with all compliance details
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          
          {/* Basic Info Section */}
          <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Car size={14} className="text-teal-500" /> Vehicle Name
                </label>
                <input 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" 
                  placeholder="e.g., 2024 Toyota Corolla" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Hash size={14} className="text-teal-500" /> Number Plate
                </label>
                <input 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all uppercase" 
                  placeholder="e.g., VXB-102" 
                  value={formData.plate} 
                  onChange={(e) => setFormData({...formData, plate: e.target.value})} 
                />
              </div>
            </div>
          </section>

          {/* Vehicle Specifications */}
          <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
              Vehicle Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Palette size={14} className="text-teal-500" /> Vehicle Color
                </label>
                <input 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" 
                  placeholder="e.g., Midnight Blue" 
                  value={formData.color} 
                  onChange={(e) => setFormData({...formData, color: e.target.value})} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Gauge size={14} className="text-teal-500" /> Odometer (KM)
                </label>
                <input 
                  required 
                  type="number" 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" 
                  placeholder="e.g., 12500" 
                  value={formData.km} 
                  onChange={(e) => setFormData({...formData, km: e.target.value})} 
                />
              </div>
            </div>
          </section>

          {/* Compliance Dates */}
          <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
              Compliance & Documentation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <CalendarDays size={14} className="text-amber-500" /> Insurance Expiry Date
                </label>
                <input 
                  required 
                  type="date" 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" 
                  value={formData.insuranceExpiry} 
                  onChange={(e) => setFormData({...formData, insuranceExpiry: e.target.value})} 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <CalendarDays size={14} className="text-blue-500" /> RC Expiry Date
                </label>
                <input 
                  required 
                  type="date" 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all" 
                  value={formData.rcExpiry} 
                  onChange={(e) => setFormData({...formData, rcExpiry: e.target.value})} 
                />
              </div>
            </div>
          </section>

          {/* Location Assignment */}
          <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
              Location Assignment
            </h3>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} className="text-teal-500" /> Assigned Branch Location
              </label>
              <div className="relative">
                <select 
                  required 
                  className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none appearance-none cursor-pointer transition-all" 
                  value={formData.location} 
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                >
                  {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
            </div>
          </section>

          {/* Insurance Document Upload */}
          <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
              Insurance Document
            </h3>
            <div className="relative group">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                onChange={(e) => setFormData({...formData, insuranceFile: e.target.files[0]})} 
              />
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center group-hover:border-teal-500 group-hover:bg-teal-50 dark:group-hover:bg-teal-950/20 transition-all cursor-pointer">
                <Upload className="mx-auto text-slate-400 group-hover:text-teal-500 mb-3" size={40} />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {formData.insuranceFile ? formData.insuranceFile.name : "Click or drag insurance document (PDF/Image)"}
                </p>
                <p className="text-xs text-slate-400 mt-1">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-[2] px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Register Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterVehicleModal;