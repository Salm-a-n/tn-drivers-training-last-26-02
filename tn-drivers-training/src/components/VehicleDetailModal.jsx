// import React, { useState } from 'react';
// import { 
//   X, Car, Hash, Palette, MapPin, 
//   Gauge, UserCircle, Edit3, Save, 
//   ChevronDown, ShieldCheck, Trash2, CalendarDays, FileText
// } from 'lucide-react';

// const VehicleDetailModal = ({ vehicle, onClose, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ ...vehicle });

//   // Instructor list filtered by branch location
//   const instructorsByLocation = {
//     "Burin": ["Jean Dupont", "Marc-André Leclaire"],
//     "Grand Falls": ["Robert Smith", "Yuki Tanaka"],
//     "Marystown": ["Sam Chen", "Maria Garcia"],
//     "St. John’s / Mount Pearl": ["Sarah Miller", "Alex Rivera"]
//   };

//   const availableInstructors = instructorsByLocation[formData.location] || [];

//   const handleSave = () => {
//     onUpdate(formData);
//     setIsEditing(false);
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
//       {/* Modal Container */}
//       <div className="bg-white dark:bg-[#111827] w-full max-w-2xl rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
        
//         {/* 1. HEADER */}
//         <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/50">
//           <div>
//             <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic leading-none">
//               Asset <span className="text-[#008B8B]">Intelligence</span>
//             </h2>
//             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">VIN: {formData.vin}</p>
//           </div>
//           <div className="flex gap-2">
//             {!isEditing ? (
//               <button onClick={() => setIsEditing(true)} className="p-2.5 bg-[#008B8B]/10 text-[#008B8B] rounded-full hover:bg-[#008B8B] hover:text-white transition-all shadow-sm active:scale-90"><Edit3 size={20}/></button>
//             ) : (
//               <button onClick={handleSave} className="p-2.5 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all shadow-lg active:scale-90"><Save size={20}/></button>
//             )}
//             <button onClick={onClose} className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-rose-500 transition-all active:scale-90"><X size={20}/></button>
//           </div>
//         </div>

//         {/* 2. MODAL CONTENT */}
//         <div className="p-8 space-y-8 overflow-y-auto scrollbar-hide">
          
//           {/* Main Attributes Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <DataField icon={<Car size={16}/>} label="Vehicle Name" value={formData.name} isEditing={isEditing} onChange={(val) => setFormData({...formData, name: val})} />
//             <DataField icon={<Hash size={16}/>} label="Plate Number" value={formData.plate} isEditing={isEditing} className="uppercase" onChange={(val) => setFormData({...formData, plate: val})} />
//             <DataField icon={<Palette size={16}/>} label="Color" value={formData.color} isEditing={isEditing} onChange={(val) => setFormData({...formData, color: val})} />
//             <DataField icon={<Gauge size={16}/>} label="Mileage (KM)" value={formData.km} isEditing={isEditing} type="number" onChange={(val) => setFormData({...formData, km: val})} />
            
//             {/* COMPLIANCE DATES */}
//             <DataField icon={<CalendarDays size={16}/>} label="Insurance Expiry" value={formData.insuranceExpiry} isEditing={isEditing} type="date" onChange={(val) => setFormData({...formData, insuranceExpiry: val})} />
//             <DataField icon={<CalendarDays size={16}/>} label="RC Expiry" value={formData.rcExpiry} isEditing={isEditing} type="date" onChange={(val) => setFormData({...formData, rcExpiry: val})} />
//           </div>

//           <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

//           {/* Location & Instructor Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800">
//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <MapPin size={14} className="text-[#008B8B]"/> Branch Location
//               </label>
//               {isEditing ? (
//                 <div className="relative">
//                   <select 
//                     className="w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white outline-none ring-1 ring-slate-200 dark:ring-slate-700 appearance-none cursor-pointer"
//                     value={formData.location}
//                     onChange={(e) => setFormData({...formData, location: e.target.value, instructor: 'Unassigned'})}
//                   >
//                     <option>Burin</option>
//                     <option>Grand Falls</option>
//                     <option>Marystown</option>
//                     <option>St. John’s / Mount Pearl</option>
//                   </select>
//                   <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
//                 </div>
//               ) : ( <p className="text-sm font-bold dark:text-white px-1 uppercase">{formData.location}</p> )}
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//                 <UserCircle size={14} className="text-[#008B8B]"/> Assigned Instructor
//               </label>
//               <div className="relative">
//                 <select 
//                   disabled={!isEditing}
//                   className={`w-full bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-3 text-sm font-bold outline-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-[#008B8B]/30 appearance-none ${!isEditing ? 'text-slate-500 opacity-80' : 'text-[#008B8B]'}`}
//                   value={formData.instructor}
//                   onChange={(e) => setFormData({...formData, instructor: e.target.value})}
//                 >
//                   <option value="Unassigned">Select Instructor...</option>
//                   {availableInstructors.map(name => ( <option key={name} value={name}>{name}</option> ))}
//                 </select>
//                 {isEditing && <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#008B8B] pointer-events-none" />}
//               </div>
//             </div>
//           </div>

//           {/* RESTORED DOCUMENT VIEW */}
//           <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white flex items-center justify-between relative group overflow-hidden border-2 border-[#008B8B]/20 shadow-xl">
//             <div className="relative z-10 flex items-center gap-6">
//               <div className="size-16 rounded-[1.25rem] bg-white/10 flex items-center justify-center text-[#008B8B] border border-white/10">
//                  <FileText size={32} />
//               </div>
//               <div>
//                 <p className="text-[9px] font-black text-[#008B8B] uppercase tracking-[0.2em] mb-1">Onboarded Documentation</p>
//                 <h4 className="text-base font-bold italic uppercase leading-tight tracking-tight">Insurance_Policy_{formData.plate}.pdf</h4>
//                 <div className="flex gap-4 mt-3">
//                   <button className="text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all active:scale-95 border border-white/5">View Policy</button>
//                   {isEditing && <button className="text-[10px] font-black uppercase tracking-widest bg-[#008B8B]/20 text-[#008B8B] px-4 py-2 rounded-lg transition-all active:scale-95 border border-[#008B8B]/20">Replace File</button>}
//                 </div>
//               </div>
//             </div>
//             <ShieldCheck size={120} className="absolute -right-4 -bottom-4 text-white opacity-5 rotate-12 group-hover:rotate-0 transition-all duration-700" />
//           </div>

//           {/* 3. PRIMARY ACTION FOOTER (Visible Save Button) */}
//           <div className="pt-4">
//             {isEditing ? (
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button onClick={() => setIsEditing(false)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-slate-200">Cancel Edit</button>
//                 <button onClick={handleSave} className="flex-[2] py-4 bg-[#008B8B] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#008B8B]/20 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-[#007b7b]">
//                   <Save size={16}/> Update Asset Details
//                 </button>
//               </div>
//             ) : (
//               <button className="w-full py-4 text-rose-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-2xl transition-all border border-dashed border-transparent hover:border-rose-200">
//                 <Trash2 size={16}/> Decommission Asset
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DataField = ({ icon, label, value, isEditing, onChange, type="text", className="" }) => (
//   <div className="space-y-2">
//     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
//       <span className="text-[#008B8B]">{icon}</span> {label}
//     </label>
//     {isEditing ? (
//       <input type={type} className={`w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold dark:text-white ring-1 ring-slate-100 dark:ring-slate-700 focus:ring-2 focus:ring-[#008B8B]/20 outline-none transition-all ${className}`} value={value || ''} onChange={(e) => onChange(e.target.value)} />
//     ) : (
//       <p className={`text-sm font-bold text-slate-800 dark:text-white px-1 py-1 ${className}`}>{value || 'Not Set'}</p>
//     )}
//   </div>
// );

// export default VehicleDetailModal;








import React, { useState } from 'react';
import { 
  X, Car, Hash, Palette, MapPin, 
  Gauge, UserCircle, Edit3, Save, 
  ChevronDown, ShieldCheck, Trash2, CalendarDays, FileText
} from 'lucide-react';

const VehicleDetailModal = ({ vehicle, onClose, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...vehicle });

  // Instructor list filtered by branch location
  const instructorsByLocation = {
    "Burin": ["Jean Dupont", "Marc-André Leclaire"],
    "Grand Falls": ["Robert Smith", "Yuki Tanaka"],
    "Marystown": ["Sam Chen", "Maria Garcia"],
    "St. John's": ["Sarah Miller", "Alex Rivera"],
    "Mount Pearl": ["Sarah Miller", "Alex Rivera"]
  };

  const availableInstructors = instructorsByLocation[formData.location] || [];

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to decommission this asset?')) {
      onDelete(formData.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 dark:bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="bg-white dark:bg-[#111827] w-full max-w-2xl rounded-t-2xl md:rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
        
        {/* 1. HEADER */}
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
          <div>
            <h2 className="text-xl md:text-2xl font-['Sora'] font-bold text-gray-900 dark:text-white uppercase tracking-tight">
              Asset <span className="text-terra-600">Intelligence</span>
            </h2>
            <p className="text-[10px] font-['DM_Mono'] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">VIN: {formData.vin}</p>
          </div>
          <div className="flex gap-2">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)} 
                className="p-2.5 bg-terra-50 dark:bg-terra-950/30 text-terra-600 rounded-full hover:bg-terra-100 dark:hover:bg-terra-900/50 transition-all shadow-sm active:scale-90"
                title="Edit Vehicle"
              >
                <Edit3 size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSave} 
                className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-lg active:scale-90"
                title="Save Changes"
              >
                <Save size={18} />
              </button>
            )}
            <button 
              onClick={onClose} 
              className="p-2.5 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2. MODAL CONTENT */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Main Attributes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <DataField 
              icon={<Car size={14} />} 
              label="Vehicle Name" 
              value={formData.name} 
              isEditing={isEditing} 
              onChange={(val) => setFormData({...formData, name: val})} 
            />
            <DataField 
              icon={<Hash size={14} />} 
              label="Plate Number" 
              value={formData.plate} 
              isEditing={isEditing} 
              className="uppercase" 
              onChange={(val) => setFormData({...formData, plate: val})} 
            />
            <DataField 
              icon={<Palette size={14} />} 
              label="Color" 
              value={formData.color} 
              isEditing={isEditing} 
              onChange={(val) => setFormData({...formData, color: val})} 
            />
            <DataField 
              icon={<Gauge size={14} />} 
              label="Mileage (KM)" 
              value={formData.km} 
              isEditing={isEditing} 
              type="number" 
              onChange={(val) => setFormData({...formData, km: val})} 
            />
            
            {/* COMPLIANCE DATES */}
            <DataField 
              icon={<CalendarDays size={14} />} 
              label="Insurance Expiry" 
              value={formData.insuranceExpiry} 
              isEditing={isEditing} 
              type="date" 
              onChange={(val) => setFormData({...formData, insuranceExpiry: val})} 
            />
            <DataField 
              icon={<CalendarDays size={14} />} 
              label="RC Expiry" 
              value={formData.rcExpiry} 
              isEditing={isEditing} 
              type="date" 
              onChange={(val) => setFormData({...formData, rcExpiry: val})} 
            />
          </div>

          <div className="h-px bg-gray-100 dark:bg-slate-800 w-full" />

          {/* Location & Instructor Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-gray-100 dark:border-slate-800">
            <div className="space-y-2">
              <label className="text-[10px] font-['DM_Mono'] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={12} className="text-terra-600"/> Branch Location
              </label>
              {isEditing ? (
                <div className="relative">
                  <select 
                    className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-terra-500/30 focus:border-terra-500 appearance-none cursor-pointer"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value, instructor: 'Unassigned'})}
                  >
                    <option>Burin</option>
                    <option>Grand Falls</option>
                    <option>Marystown</option>
                    <option>St. John's</option>
                    <option>Mount Pearl</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              ) : ( 
                <p className="text-sm font-medium text-gray-900 dark:text-white px-1 uppercase">{formData.location}</p> 
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-['DM_Mono'] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <UserCircle size={12} className="text-terra-600"/> Assigned Instructor
              </label>
              <div className="relative">
                <select 
                  disabled={!isEditing}
                  className={`w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium outline-none appearance-none ${
                    !isEditing 
                      ? 'text-gray-500 bg-gray-50 dark:bg-slate-800 cursor-default' 
                      : 'text-gray-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-terra-500/30'
                  }`}
                  value={formData.instructor}
                  onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                >
                  <option value="Unassigned">Unassigned</option>
                  {availableInstructors.map(name => ( 
                    <option key={name} value={name}>{name}</option> 
                  ))}
                </select>
                {isEditing && <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
              </div>
            </div>
          </div>

          {/* DOCUMENT SECTION */}
          <div className="bg-gray-900 rounded-2xl p-5 text-white flex items-center justify-between relative group overflow-hidden border border-terra-600/30 shadow-lg">
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-terra-400 border border-white/10">
                <FileText size={28} />
              </div>
              <div>
                <p className="text-[8px] font-['DM_Mono'] font-semibold text-terra-400 uppercase tracking-wider mb-1">Onboarded Documentation</p>
                <h4 className="text-sm font-semibold uppercase tracking-tight">Insurance_Policy_{formData.plate || 'Asset'}.pdf</h4>
                <div className="flex gap-3 mt-2">
                  <button className="text-[9px] font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all border border-white/5">
                    View Policy
                  </button>
                  {isEditing && (
                    <button className="text-[9px] font-semibold uppercase tracking-wider bg-terra-600/20 text-terra-400 hover:bg-terra-600/30 px-3 py-1.5 rounded-lg transition-all border border-terra-600/20">
                      Replace File
                    </button>
                  )}
                </div>
              </div>
            </div>
            <ShieldCheck size={100} className="absolute -right-6 -bottom-6 text-white/5 group-hover:rotate-12 transition-all duration-700" />
          </div>

          {/* 3. PRIMARY ACTION FOOTER */}
          <div className="pt-2">
            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all hover:bg-gray-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  className="flex-[2] py-3 bg-terra-600 text-white rounded-xl font-semibold text-xs uppercase tracking-wider shadow-lg shadow-terra-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-terra-700"
                >
                  <Save size={14} /> Save Changes
                </button>
              </div>
            ) : (
              <button 
                onClick={handleDelete} 
                className="w-full py-3 text-rose-600 dark:text-rose-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all border border-dashed border-transparent hover:border-rose-200 dark:hover:border-rose-800"
              >
                <Trash2 size={14} /> Decommission Asset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DataField = ({ icon, label, value, isEditing, onChange, type = "text", className = "" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-['DM_Mono'] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
      <span className="text-terra-600">{icon}</span> {label}
    </label>
    {isEditing ? (
      <input 
        type={type} 
        className={`w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-terra-500/30 focus:border-terra-500 outline-none transition-all ${className}`} 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)} 
      />
    ) : (
      <p className={`text-sm font-medium text-gray-900 dark:text-white px-1 py-1 ${className}`}>{value || 'Not Set'}</p>
    )}
  </div>
);

export default VehicleDetailModal;