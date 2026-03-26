

// import React, { useState } from 'react';
// import { 
//   X, Car, Hash, Palette, MapPin, 
//   Gauge, UserCircle, Edit3, Save, 
//   ChevronDown, ShieldCheck, Trash2, CalendarDays, FileText
// } from 'lucide-react';

// const VehicleDetailModal = ({ vehicle, onClose, onUpdate, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ ...vehicle });

//   // Instructor list filtered by branch location
//   const instructorsByLocation = {
//     "Burin": ["Jean Dupont", "Marc-André Leclaire"],
//     "Grand Falls": ["Robert Smith", "Yuki Tanaka"],
//     "Marystown": ["Sam Chen", "Maria Garcia"],
//     "St. John's": ["Sarah Miller", "Alex Rivera"],
//     "Mount Pearl": ["Sarah Miller", "Alex Rivera"]
//   };

//   const availableInstructors = instructorsByLocation[formData.location] || [];

//   const handleSave = () => {
//     onUpdate(formData);
//     setIsEditing(false);
//   };

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to decommission this asset?')) {
//       onDelete(formData.id);
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/50 dark:bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      
//       {/* Modal Container */}
//       <div className="bg-white dark:bg-[#111827] w-full max-w-2xl rounded-t-2xl md:rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom md:zoom-in-95 duration-300 flex flex-col max-h-[95vh]">
        
//         {/* 1. HEADER */}
//         <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/30">
//           <div>
//             <h2 className="text-xl md:text-2xl font-['Sora'] font-bold text-gray-900 dark:text-white uppercase tracking-tight">
//               Asset <span className="text-terra-600">Intelligence</span>
//             </h2>
//             <p className="text-[10px] font-['DM_Mono'] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mt-1">VIN: {formData.vin}</p>
//           </div>
//           <div className="flex gap-2">
//             {!isEditing ? (
//               <button 
//                 onClick={() => setIsEditing(true)} 
//                 className="p-2.5 bg-terra-50 dark:bg-terra-950/30 text-terra-600 rounded-full hover:bg-terra-100 dark:hover:bg-terra-900/50 transition-all shadow-sm active:scale-90"
//                 title="Edit Vehicle"
//               >
//                 <Edit3 size={18} />
//               </button>
//             ) : (
//               <button 
//                 onClick={handleSave} 
//                 className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-lg active:scale-90"
//                 title="Save Changes"
//               >
//                 <Save size={18} />
//               </button>
//             )}
//             <button 
//               onClick={onClose} 
//               className="p-2.5 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all active:scale-90"
//               title="Close"
//             >
//               <X size={18} />
//             </button>
//           </div>
//         </div>

//         {/* 2. MODAL CONTENT */}
//         <div className="p-6 space-y-6 overflow-y-auto">
          
//           {/* Main Attributes Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <DataField 
//               icon={<Car size={14} />} 
//               label="Vehicle Name" 
//               value={formData.name} 
//               isEditing={isEditing} 
//               onChange={(val) => setFormData({...formData, name: val})} 
//             />
//             <DataField 
//               icon={<Hash size={14} />} 
//               label="Plate Number" 
//               value={formData.plate} 
//               isEditing={isEditing} 
//               className="uppercase" 
//               onChange={(val) => setFormData({...formData, plate: val})} 
//             />
//             <DataField 
//               icon={<Palette size={14} />} 
//               label="Color" 
//               value={formData.color} 
//               isEditing={isEditing} 
//               onChange={(val) => setFormData({...formData, color: val})} 
//             />
//             <DataField 
//               icon={<Gauge size={14} />} 
//               label="Mileage (KM)" 
//               value={formData.km} 
//               isEditing={isEditing} 
//               type="number" 
//               onChange={(val) => setFormData({...formData, km: val})} 
//             />
            
//             {/* COMPLIANCE DATES */}
//             <DataField 
//               icon={<CalendarDays size={14} />} 
//               label="Insurance Expiry" 
//               value={formData.insuranceExpiry} 
//               isEditing={isEditing} 
//               type="date" 
//               onChange={(val) => setFormData({...formData, insuranceExpiry: val})} 
//             />
//             <DataField 
//               icon={<CalendarDays size={14} />} 
//               label="RC Expiry" 
//               value={formData.rcExpiry} 
//               isEditing={isEditing} 
//               type="date" 
//               onChange={(val) => setFormData({...formData, rcExpiry: val})} 
//             />
//           </div>

//           <div className="h-px bg-gray-100 dark:bg-slate-800 w-full" />

//           {/* Location & Instructor Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-gray-100 dark:border-slate-800">
//             <div className="space-y-2">
//               <label className="text-[10px] font-['DM_Mono'] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
//                 <MapPin size={12} className="text-terra-600"/> Branch Location
//               </label>
//               {isEditing ? (
//                 <div className="relative">
//                   <select 
//                     className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-terra-500/30 focus:border-terra-500 appearance-none cursor-pointer"
//                     value={formData.location}
//                     onChange={(e) => setFormData({...formData, location: e.target.value, instructor: 'Unassigned'})}
//                   >
//                     <option>Burin</option>
//                     <option>Grand Falls</option>
//                     <option>Marystown</option>
//                     <option>St. John's</option>
//                     <option>Mount Pearl</option>
//                   </select>
//                   <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//                 </div>
//               ) : ( 
//                 <p className="text-sm font-medium text-gray-900 dark:text-white px-1 uppercase">{formData.location}</p> 
//               )}
//             </div>

//             <div className="space-y-2">
//               <label className="text-[10px] font-['DM_Mono'] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
//                 <UserCircle size={12} className="text-terra-600"/> Assigned Instructor
//               </label>
//               <div className="relative">
//                 <select 
//                   disabled={!isEditing}
//                   className={`w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium outline-none appearance-none ${
//                     !isEditing 
//                       ? 'text-gray-500 bg-gray-50 dark:bg-slate-800 cursor-default' 
//                       : 'text-gray-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-terra-500/30'
//                   }`}
//                   value={formData.instructor}
//                   onChange={(e) => setFormData({...formData, instructor: e.target.value})}
//                 >
//                   <option value="Unassigned">Unassigned</option>
//                   {availableInstructors.map(name => ( 
//                     <option key={name} value={name}>{name}</option> 
//                   ))}
//                 </select>
//                 {isEditing && <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
//               </div>
//             </div>
//           </div>

//           {/* DOCUMENT SECTION */}
//           <div className="bg-gray-900 rounded-2xl p-5 text-white flex items-center justify-between relative group overflow-hidden border border-terra-600/30 shadow-lg">
//             <div className="relative z-10 flex items-center gap-5">
//               <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-terra-400 border border-white/10">
//                 <FileText size={28} />
//               </div>
//               <div>
//                 <p className="text-[8px] font-['DM_Mono'] font-semibold text-terra-400 uppercase tracking-wider mb-1">Onboarded Documentation</p>
//                 <h4 className="text-sm font-semibold uppercase tracking-tight">Insurance_Policy_{formData.plate || 'Asset'}.pdf</h4>
//                 <div className="flex gap-3 mt-2">
//                   <button className="text-[9px] font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all border border-white/5">
//                     View Policy
//                   </button>
//                   {isEditing && (
//                     <button className="text-[9px] font-semibold uppercase tracking-wider bg-terra-600/20 text-terra-400 hover:bg-terra-600/30 px-3 py-1.5 rounded-lg transition-all border border-terra-600/20">
//                       Replace File
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <ShieldCheck size={100} className="absolute -right-6 -bottom-6 text-white/5 group-hover:rotate-12 transition-all duration-700" />
//           </div>

//           {/* 3. PRIMARY ACTION FOOTER */}
//           <div className="pt-2">
//             {isEditing ? (
//               <div className="flex flex-col sm:flex-row gap-3">
//                 <button 
//                   onClick={() => setIsEditing(false)} 
//                   className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all hover:bg-gray-200 dark:hover:bg-slate-700"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   onClick={handleSave} 
//                   className="flex-[2] py-3 bg-terra-600 text-white rounded-xl font-semibold text-xs uppercase tracking-wider shadow-lg shadow-terra-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-terra-700"
//                 >
//                   <Save size={14} /> Save Changes
//                 </button>
//               </div>
//             ) : (
//               <button 
//                 onClick={handleDelete} 
//                 className="w-full py-3 text-rose-600 dark:text-rose-400 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all border border-dashed border-transparent hover:border-rose-200 dark:hover:border-rose-800"
//               >
//                 <Trash2 size={14} /> Decommission Asset
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DataField = ({ icon, label, value, isEditing, onChange, type = "text", className = "" }) => (
//   <div className="space-y-2">
//     <label className="text-[10px] font-['DM_Mono'] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
//       <span className="text-terra-600">{icon}</span> {label}
//     </label>
//     {isEditing ? (
//       <input 
//         type={type} 
//         className={`w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-terra-500/30 focus:border-terra-500 outline-none transition-all ${className}`} 
//         value={value || ''} 
//         onChange={(e) => onChange(e.target.value)} 
//       />
//     ) : (
//       <p className={`text-sm font-medium text-gray-900 dark:text-white px-1 py-1 ${className}`}>{value || 'Not Set'}</p>
//     )}
//   </div>
// );

// export default VehicleDetailModal;
















import React, { useState, useEffect } from 'react';
import {
    X, Car, Hash, Palette, MapPin,
    Gauge, Edit3, Save,
    ChevronDown, ShieldCheck, Trash2, CalendarDays, FileText, Bookmark, User, AlertCircle
} from 'lucide-react';

// Dummy locations
const dummyLocations = [
    { id: 1, name: "Burin", province_name: "Burin" },
    { id: 2, name: "St. John's", province_name: "St. John's" },
    { id: 3, name: "Grand Falls", province_name: "Grand Falls" },
    { id: 4, name: "Marystown", province_name: "Marystown" },
    { id: 5, name: "Mount Pearl", province_name: "Mount Pearl" }
];

// Dummy instructors
const dummyInstructors = [
    { id: 1, user: { name: "Jean Dupont" }, car_id: 1 },
    { id: 2, user: { name: "Sarah Miller" }, car_id: 2 },
    { id: 3, user: { name: "Robert Smith" }, car_id: 3 },
    { id: 4, user: { name: "David Chen" }, car_id: 5 }
];

const VehicleDetailModal = ({ 
    vehicle = null, 
    onClose, 
    onUpdate, 
    onDelete, 
    locations = dummyLocations, 
    instructors = dummyInstructors 
}) => {
    // Helper function to format ISO dates to YYYY-MM-DD for input fields
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return dateStr.split('T')[0];
    };

    // Default dummy vehicle if none provided
    const defaultVehicle = {
        id: 1,
        vin: "2T1BURHE3NC123456",
        name: "2022 Toyota Corolla",
        plate: "V-882",
        location: "Burin",
        location_id: 1,
        instructor: "Jean Dupont",
        instructor_id: 1,
        winterReady: true,
        status: "Available",
        km: "45230",
        color: "Silver",
        insuranceNo: "INS-12345",
        insuranceExpiry: "2026-12-01",
        rcNo: "RC-12345",
        rcExpiry: "2027-05-15",
        carDocument: null
    };

    const currentVehicle = vehicle || defaultVehicle;
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ 
        ...currentVehicle,
        insuranceExpiry: formatDate(currentVehicle.insuranceExpiry),
        rcExpiry: formatDate(currentVehicle.rcExpiry)
    });
    const [newFile, setNewFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [saveSuccess, setSaveSuccess] = useState(false);
    
    // Check if vehicle is assigned to an instructor
    const isVehicleAssigned = currentVehicle.instructor && 
                              currentVehicle.instructor !== null && 
                              currentVehicle.instructor !== 'Unassigned';

    const handleSave = async () => {
        setLoading(true);
        setErrors({});
        
        // Simulate API call
        setTimeout(() => {
            // Validate required fields
            const newErrors = {};
            if (!formData.name) newErrors.car_name = ['Vehicle name is required'];
            if (!formData.plate) newErrors.number_plate = ['Plate number is required'];
            
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                setLoading(false);
                return;
            }
            
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 2000);
            setIsEditing(false);
            setNewFile(null);
            if (onUpdate) onUpdate();
            setLoading(false);
        }, 800);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to decommission this asset?')) {
            if (onDelete) onDelete(currentVehicle.id);
            onClose();
        }
    };

    // Get location name from location_id
    const getLocationName = () => {
        if (formData.location) return formData.location;
        const loc = locations.find(l => l.id === formData.location_id);
        return loc?.name || 'Not Assigned';
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-t-2xl md:rounded-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[95vh]">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
                    <div>
                        <h2 className="text-base font-semibold tracking-tight text-slate-800 dark:text-white">
                            Asset <span className="text-teal-600 dark:text-teal-400">Intelligence</span>
                        </h2>
                        <p className="text-[0.55rem] font-mono text-slate-400 uppercase tracking-wider mt-0.5">VIN: {formData.vin || 'N/A'}</p>
                    </div>
                    <div className="flex gap-2">
                        {!isEditing ? (
                            <button 
                                onClick={() => setIsEditing(true)} 
                                className="p-1.5 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all"
                            >
                                <Edit3 size={16} />
                            </button>
                        ) : (
                            <button 
                                onClick={handleSave} 
                                disabled={loading} 
                                className="p-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all disabled:opacity-60"
                            >
                                {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
                            </button>
                        )}
                        <button 
                            onClick={onClose} 
                            className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-all"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {/* Success Message */}
                {saveSuccess && (
                    <div className="mx-6 mt-3 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                        <p className="text-[0.7rem] text-green-600 dark:text-green-400">Vehicle updated successfully!</p>
                    </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DataField 
                            icon={<Car size={14}/>} 
                            label="Vehicle Name" 
                            value={formData.name} 
                            isEditing={isEditing} 
                            onChange={v => setFormData({...formData, name: v})} 
                            error={errors.car_name?.[0]} 
                        />
                        <DataField 
                            icon={<Hash size={14}/>} 
                            label="Plate Number" 
                            value={formData.plate} 
                            isEditing={isEditing} 
                            onChange={v => setFormData({...formData, plate: v})} 
                            className="uppercase" 
                            error={errors.number_plate?.[0]} 
                        />
                        <DataField 
                            icon={<Palette size={14}/>} 
                            label="Color" 
                            value={formData.color} 
                            isEditing={isEditing} 
                            onChange={v => setFormData({...formData, color: v})} 
                            error={errors.color?.[0]} 
                        />
                        <DataField 
                            icon={<Gauge size={14}/>} 
                            label="Odometer (KM)" 
                            value={formData.km} 
                            isEditing={isEditing} 
                            type="number" 
                            onChange={v => setFormData({...formData, km: v})} 
                            error={errors.odometer?.[0]} 
                        />
                    </div>

                    {/* Compliance Section */}
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="text-[0.6rem] font-mono font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <ShieldCheck size={12} className="text-teal-500" /> Compliance Documents
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <DataField 
                                    icon={<ShieldCheck size={14}/>} 
                                    label="Insurance No." 
                                    value={formData.insuranceNo} 
                                    isEditing={isEditing} 
                                    onChange={v => setFormData({...formData, insuranceNo: v})} 
                                    error={errors.insurance_number?.[0]} 
                                />
                                <DataField 
                                    icon={<CalendarDays size={14}/>} 
                                    label="Insurance Expiry" 
                                    value={formData.insuranceExpiry} 
                                    isEditing={isEditing} 
                                    type="date" 
                                    onChange={v => setFormData({...formData, insuranceExpiry: v})} 
                                    error={errors.insurance_expiry?.[0]} 
                                />
                            </div>
                            <div className="space-y-4">
                                <DataField 
                                    icon={<Bookmark size={14}/>} 
                                    label="RC Number" 
                                    value={formData.rcNo} 
                                    isEditing={isEditing} 
                                    onChange={v => setFormData({...formData, rcNo: v})} 
                                    error={errors.rc_number?.[0]} 
                                />
                                <DataField 
                                    icon={<CalendarDays size={14}/>} 
                                    label="RC Expiry" 
                                    value={formData.rcExpiry} 
                                    isEditing={isEditing} 
                                    type="date" 
                                    onChange={v => setFormData({...formData, rcExpiry: v})} 
                                    error={errors.rc_expiry?.[0]} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location & Instructor Section */}
                    <div className="bg-teal-50/30 dark:bg-teal-900/10 p-4 rounded-xl border border-teal-100 dark:border-teal-800 space-y-4">
                        <h3 className="text-[0.6rem] font-mono font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <MapPin size={12} className="text-teal-500" /> Assignment Details
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Location Field */}
                            <div className="space-y-1.5">
                                <label className="text-[0.55rem] font-mono font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                    <MapPin size={10} className="text-teal-500" /> Branch Location
                                </label>
                                {isEditing ? (
                                    isVehicleAssigned ? (
                                        <div className="w-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2 text-xs font-medium text-amber-700 dark:text-amber-400 flex items-center gap-2">
                                            <AlertCircle size={12} />
                                            <span>Location locked - vehicle assigned to instructor</span>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <select
                                                className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-xs font-medium dark:text-white outline-none focus:ring-1 focus:ring-teal-500 appearance-none cursor-pointer"
                                                value={formData.location_id || ''}
                                                onChange={(e) => {
                                                    const id = parseInt(e.target.value);
                                                    const loc = locations.find(l => l.id === id);
                                                    setFormData({ ...formData, location_id: id, location: loc?.name || '' });
                                                }}
                                            >
                                                <option value="">Select Location</option>
                                                {locations.map(loc => (
                                                    <option key={loc.id} value={loc.id}>
                                                        {loc.name || loc.province_name}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    )
                                ) : (
                                    <p className="text-sm font-medium text-slate-800 dark:text-white px-1">
                                        {getLocationName()}
                                    </p>
                                )}
                            </div>

                            {/* Instructor Field */}
                            <div className="space-y-1.5">
                                <label className="text-[0.55rem] font-mono font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                                    <User size={10} className={`${isVehicleAssigned ? 'text-teal-500' : 'text-slate-400'}`} /> Assigned Instructor
                                </label>
                                <div className={`w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm font-medium ${
                                    isVehicleAssigned 
                                        ? 'text-slate-800 dark:text-white' 
                                        : 'text-slate-400 dark:text-slate-500'
                                }`}>
                                    {isVehicleAssigned ? currentVehicle.instructor : 'Unassigned'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Document Section */}
                    <div className="bg-slate-900 dark:bg-slate-800 rounded-xl p-4 text-white flex items-center justify-between relative group overflow-hidden border border-teal-500/20">
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-teal-400 border border-white/10">
                                <FileText size={20} />
                            </div>
                            <div>
                                <p className="text-[0.55rem] font-mono text-teal-400 uppercase tracking-wider mb-0.5">Onboarded Documentation</p>
                                <p className="text-xs font-medium truncate max-w-[150px]">
                                    {newFile ? newFile.name : `Doc_${formData.plate || 'Asset'}.pdf`}
                                </p>
                                <div className="flex gap-2 mt-2">
                                    {formData.carDocument && (
                                        <a href="#" className="text-[0.55rem] font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-all">
                                            View
                                        </a>
                                    )}
                                    {isEditing && (
                                        <label className="text-[0.55rem] font-mono uppercase tracking-wider bg-teal-500/20 text-teal-400 px-2 py-1 rounded cursor-pointer">
                                            Replace
                                            <input type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={(e) => setNewFile(e.target.files[0])} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                        <ShieldCheck size={80} className="absolute -right-4 -bottom-4 text-white opacity-5 rotate-12 group-hover:rotate-0 transition-all duration-700" />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2">
                        {isEditing ? (
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => { 
                                        setIsEditing(false); 
                                        setErrors({}); 
                                        setFormData({ 
                                            ...currentVehicle,
                                            insuranceExpiry: formatDate(currentVehicle.insuranceExpiry),
                                            rcExpiry: formatDate(currentVehicle.rcExpiry)
                                        }); 
                                    }} 
                                    className="flex-1 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg text-[0.7rem] font-medium transition-all"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleSave} 
                                    disabled={loading} 
                                    className="flex-1 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={12} />} 
                                    Save Changes
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={handleDelete} 
                                className="w-full py-2 text-red-500 font-medium text-[0.7rem] uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all border border-dashed border-transparent hover:border-red-200"
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

const DataField = ({ icon, label, value, isEditing, onChange, type = 'text', className = '', error }) => (
    <div className="space-y-1.5">
        <label className="text-[0.55rem] font-mono font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-teal-500">{icon}</span> {label}
        </label>
        {isEditing ? (
            <input
                type={type}
                className={`w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium dark:text-white outline-none focus:ring-1 focus:ring-teal-500 transition-all ${className}`}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
            />
        ) : (
            <p className={`text-sm font-medium text-slate-800 dark:text-white px-1 ${className}`}>
                {value || 'Not Set'}
            </p>
        )}
        {error && <p className="text-[0.55rem] text-red-500 font-mono mt-0.5">{error}</p>}
    </div>
);

export default VehicleDetailModal;