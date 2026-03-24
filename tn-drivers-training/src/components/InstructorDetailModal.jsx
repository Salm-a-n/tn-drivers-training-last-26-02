// import React, { useState } from 'react';
// import { 
//   X, User, Mail, Phone, MapPin, 
//   Car, Users, MoveHorizontal, AlertCircle, 
//   ShieldCheck 
// } from 'lucide-react';

// const InstructorDetailModal = ({ instructor, onClose, allInstructors, onUpdate }) => {
//   const [transferingStudent, setTransferingStudent] = useState(null);
//   const [newInstructorId, setNewInstructorId] = useState('');
//   const [currentLocation, setCurrentLocation] = useState(instructor?.location || '');

//   if (!instructor) return null;

//   // Logic to filter instructors who are in the SAME location as the current instructor
//   const availableSameLocationStaff = allInstructors.filter(
//     (staff) => staff.location === currentLocation
//   );

//   const handleTransfer = () => {
//     if (!newInstructorId) return alert("Please select a target instructor");
//     const targetName = availableSameLocationStaff.find(i => i.id === newInstructorId)?.name;
//     alert(`Successfully transferred ${transferingStudent.name} to ${targetName} (within ${currentLocation})`);
//     setTransferingStudent(null);
//     setNewInstructorId('');
//   };

//   const handleLocationUpdate = (e) => {
//     const newLoc = e.target.value;
//     setCurrentLocation(newLoc);
//     // NEW: Notify parent about the update
//     onUpdate(instructor.id, { location: newLoc });
//     console.log(`Updating ${instructor.name}'s location to: ${newLoc}`);
//   };

//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-['Lexend']">
//       <div className="bg-[#f0f7ff] dark:bg-background-dark w-full max-w-5xl h-full max-h-[92vh] rounded-4xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all">
        
//         {/* HEADER */}
//         <header className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 shrink-0">
//           <div className="flex items-center gap-4">
//             <div className={`size-14 rounded-3xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ${instructor.status === 'Blocked' ? 'bg-slate-400' : 'bg-teal'}`}>
//               {instructor.name[0]}
//             </div>
//             <div>
//               <div className="flex items-center gap-3">
//                 <h2 className="text-xl font-bold text-slate-900 dark:text-white">{instructor.name}</h2>
//                 <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${instructor.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
//                   {instructor.status}
//                 </span>
//               </div>
//               <p className="text-xs text-slate-500 font-medium">Instructor ID: {instructor.id}</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
//             <X size={24}/>
//           </button>
//         </header>

//         {/* SCROLLABLE BODY */}
//         <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
//             {/* LEFT COLUMN: PERSONAL & OPERATIONS */}
//             <div className="space-y-8">
//               <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
//                 <h3 className="text-sm font-bold text-[#2563eb] uppercase tracking-widest mb-6 flex items-center gap-2">
//                   <User size={18}/> Personal Profile
//                 </h3>
//                 <div className="grid grid-cols-2 gap-6 text-sm">
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase font-black">Full Name</p>
//                     <p className="font-bold text-slate-900 dark:text-slate-200">{instructor.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase font-black">Date of Birth</p>
//                     <p className="font-bold text-slate-900 dark:text-slate-200">{instructor.dob || '1985-06-12'}</p>
//                   </div>
//                   <div className="col-span-2">
//                     <p className="text-[10px] text-slate-400 uppercase font-black">Email</p>
//                     <p className="font-bold text-slate-900 dark:text-slate-200 break-all">{instructor.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase font-black">Phone</p>
//                     <p className="font-bold text-slate-900 dark:text-slate-200">{instructor.contact}</p>
//                   </div>
//                 </div>
//               </section>

//               {/* Editable Location Box */}
//               <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-[#2563eb]">
//                 <h3 className="text-sm font-bold text-[#2563eb] uppercase tracking-widest mb-4 flex items-center gap-2">
//                   <MapPin size={18}/> Assigned Operations
//                 </h3>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Branch Location</label>
//                     <select 
//                       value={currentLocation}
//                       onChange={handleLocationUpdate}
//                       className="w-full p-3 rounded-xl bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
//                     >
//                       <option value="Burin">Burin</option>
//                       <option value="Grand Falls">Grand Falls</option>
//                       <option value="Marystown">Marystown</option>
//                       <option value="St. John’s / Mount Pearl">St. John’s / Mount Pearl</option>
//                     </select>
//                     <p className="text-[9px] text-[#2563eb] mt-2 font-bold uppercase tracking-tight">
//                       * Transfers restricted to staff in {currentLocation}
//                     </p>
//                   </div>
//                 </div>
//               </section>
//             </div>

//             {/* RIGHT COLUMN: VEHICLE & STUDENTS */}
//             <div className="space-y-8">
//               <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
//                 <h3 className="text-sm font-bold text-[#2563eb] uppercase tracking-widest mb-6 flex items-center gap-2">
//                   <ShieldCheck size={18}/> Licensing & Vehicle
//                 </h3>
//                 <div className="grid grid-cols-2 gap-6 text-sm">
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase font-black">License Number</p>
//                     <p className="font-mono font-bold text-slate-900 dark:text-slate-200">{instructor.license || 'INST-88291-AB'}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase font-black">Expiry Date</p>
//                     <p className="font-bold text-rose-500">{instructor.expiry}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase font-black">Vehicle</p>
//                     <p className="font-bold text-slate-900 dark:text-slate-200">{instructor.vehicle}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-slate-400 uppercase font-black">Plate</p>
//                     <p className="font-mono font-bold text-slate-900 dark:text-slate-200 uppercase">{instructor.plate}</p>
//                   </div>
//                 </div>
//               </section>

//               {/* Active Students List */}
//               <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-sm font-bold text-[#2563eb] uppercase tracking-widest flex items-center gap-2">
//                     <Users size={18}/> Active Students
//                   </h3>
//                   <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 px-3 py-1 rounded-full text-xs font-black">
//                     {instructor.students?.length || 0}
//                   </span>
//                 </div>

//                 <div className="space-y-3">
//                   {instructor.students?.map(stu => (
//                     <div key={stu.id} className="p-4 rounded-xl bg-slate-50 dark:bg-background-dark border border-slate-100 dark:border-slate-800 flex justify-between items-center group">
//                       <div>
//                         <p className="font-bold text-sm text-slate-900 dark:text-white">{stu.name}</p>
//                         <p className="text-[10px] text-slate-500 uppercase font-medium">Progress: {stu.progress}</p>
//                       </div>
//                       <button 
//                         onClick={() => setTransferingStudent(stu)}
//                         className="p-2 text-teal hover:bg-teal hover:text-white rounded-lg transition-all shadow-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
//                         title="Transfer to same-location staff"
//                       >
//                         <MoveHorizontal size={18}/>
//                       </button>
//                     </div>
//                   ))}
//                   {(!instructor.students || instructor.students.length === 0) && (
//                     <p className="text-center py-4 text-xs text-slate-400 italic">No active students found.</p>
//                   )}
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <footer className="px-8 py-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center shrink-0">
//           <div className="flex items-center gap-2 text-rose-500">
//             {instructor.status === 'Blocked' && (
//               <>
//                 <AlertCircle size={16}/>
//                 <span className="text-[10px] font-black uppercase">Service Suspended</span>
//               </>
//             )}
//           </div>
//           <button 
//             onClick={onClose}
//             className="px-10 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-sm shadow-lg active:scale-95 transition-transform"
//           >
//             Close Profile
//           </button>
//         </footer>

//         {/* TRANSFER STUDENT OVERLAY */}
//         {transferingStudent && (
//           <div className="absolute inset-0 z-100 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-6">
//             <div className="bg-white dark:bg-slate-900 p-8 rounded-4xl shadow-2xl w-full max-w-md border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-4">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h4 className="font-bold text-lg text-slate-900 dark:text-white">Relocate Student</h4>
//                   <p className="text-xs text-slate-500 font-medium">Reassigning <span className="text-teal font-bold">{transferingStudent.name}</span></p>
//                   <p className="text-[10px] text-blue-500 font-bold uppercase mt-1 tracking-wider italic">Within branch: {currentLocation}</p>
//                 </div>
//                 <button onClick={() => setTransferingStudent(null)} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={20}/></button>
//               </div>
              
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Target Instructor ({currentLocation} Staff)</label>
//                   <select 
//                     value={newInstructorId}
//                     onChange={(e) => setNewInstructorId(e.target.value)}
//                     className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-background-dark border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white outline-none"
//                   >
//                     <option value="">Select compatible staff...</option>
//                     {availableSameLocationStaff.length > 0 ? (
//                       availableSameLocationStaff.map(i => (
//                         <option key={i.id} value={i.id}>{i.name} (Load: {i.students?.length || 0})</option>
//                       ))
//                     ) : (
//                       <option disabled>No other instructors available in {currentLocation}</option>
//                     )}
//                   </select>
//                 </div>

//                 <div className="flex gap-3 pt-2">
//                   <button onClick={() => setTransferingStudent(null)} className="flex-1 py-3.5 text-sm font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors">Cancel</button>
//                   <button 
//                     onClick={handleTransfer} 
//                     disabled={availableSameLocationStaff.length === 0}
//                     className="flex-1 py-3.5 bg-teal disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl text-sm font-bold shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
//                   >
//                     Confirm Reassignment
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InstructorDetailModal;


















import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, MapPin, 
  Car, Users, MoveHorizontal, AlertCircle, 
  ShieldCheck, Edit3, Save, Loader2,
  FileText, Calendar, Briefcase, BadgeCheck,
  Ban, CheckCircle
} from 'lucide-react';

// Dummy Data
const dummyInstructor = {
  id: "INS-001",
  name: "Marc-André LeBlanc",
  email: "marc.leblanc@terranova.com",
  phone: "(709) 555-0123",
  status: "Active",
  dob: "1985-06-12",
  location: "St. John's / Mount Pearl",
  license: "INST-88291-AB",
  expiry: "2026-12-31",
  vehicle: "Toyota Corolla",
  plate: "TERRA-01",
  language: "English, French",
  qualifications: "Class 1 Instructor, Defensive Driving Certified",
  emp_status: "Full-time",
  licence_no: "DL-88291-AB",
  inst_license_no: "INSTR-2024-001",
  street_address: "45 Education Drive",
  city: "St. John's",
  province: "Newfoundland and Labrador",
  postal_code: "A1A 1A1",
  country: "Canada",
  assigned_location: "St. John's / Mount Pearl",
  students: [
    { id: "STU-001", name: "James Harrison", progress: "75%", city: "St. John's", permit_number: "P1234567" },
    { id: "STU-002", name: "Sarah Williams", progress: "45%", city: "Mount Pearl", permit_number: "P2345678" },
    { id: "STU-003", name: "Emily Chen", progress: "90%", city: "St. John's", permit_number: "P3456789" },
  ],
  documents: {
    criminal_cert: "criminal_cert_marc.pdf",
    vulnerable_sector: "vulnerable_sector_marc.pdf",
    driver_abstract: "driver_abstract_marc.pdf"
  }
};

const dummyAllInstructors = [
  { id: "INS-002", name: "Sarah Chen", location: "St. John's / Mount Pearl", students: [{ id: "STU-004" }], status: "Active" },
  { id: "INS-003", name: "David Miller", location: "St. John's / Mount Pearl", students: [{ id: "STU-005" }, { id: "STU-006" }], status: "Active" },
  { id: "INS-004", name: "Patricia Walsh", location: "Burin", students: [], status: "Active" },
  { id: "INS-005", name: "Robert Johnson", location: "Marystown", students: [{ id: "STU-007" }], status: "Active" },
];

const InstructorDetailModal = ({ 
  instructor = dummyInstructor, 
  onClose, 
  allInstructors = dummyAllInstructors, 
  onUpdate,
  onToggleBlock 
}) => {
  const [transferingStudent, setTransferingStudent] = useState(null);
  const [newInstructorId, setNewInstructorId] = useState('');
  const [currentLocation, setCurrentLocation] = useState(instructor?.location || instructor?.assigned_location || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);
  const [editData, setEditData] = useState({});

  // Initialize edit data
  React.useEffect(() => {
    if (instructor) {
      setEditData({
        ...instructor,
        name: instructor.name || '',
        email: instructor.email || '',
        phone: instructor.phone || '',
        status: instructor.status || 'active',
        dob: instructor.dob || '',
        language: instructor.language || '',
        street_address: instructor.street_address || '',
        city: instructor.city || '',
        province: instructor.province || '',
        postal_code: instructor.postal_code || '',
        country: instructor.country || 'Canada',
        assigned_location: instructor.assigned_location || instructor.location || '',
        licence_no: instructor.licence_no || instructor.license || '',
        inst_license_no: instructor.inst_license_no || '',
        licence_expiry: instructor.licence_expiry || instructor.expiry || '',
        emp_status: instructor.emp_status || 'Full-time',
        qualifications_to_teach: instructor.qualifications_to_teach || instructor.qualifications || ''
      });
    }
  }, [instructor]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert("Instructor updated successfully!");
      setCurrentLocation(editData.assigned_location);
      setIsEditing(false);
      if (onUpdate) onUpdate(instructor.id, editData);
      setLoading(false);
    }, 1000);
  };

  const handleToggleBlock = async () => {
    // Validation: Cannot block instructor with active students
    if (editData.status === "Active" && instructor.students?.length > 0) {
      alert(`Cannot block ${editData.name} because they have ${instructor.students.length} active student(s). Please transfer all students before blocking.`);
      return;
    }
    
    setBlockLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newStatus = editData.status === "Active" ? "Blocked" : "Active";
      setEditData({ ...editData, status: newStatus });
      if (onToggleBlock) {
        onToggleBlock(instructor.id);
      }
      alert(`Instructor ${newStatus === "Active" ? "activated" : "blocked"} successfully!`);
      setBlockLoading(false);
    }, 800);
  };

  const handleLocationUpdate = (e) => {
    const newLoc = e.target.value;
    setCurrentLocation(newLoc);
    setEditData({ ...editData, assigned_location: newLoc });
    if (onUpdate) onUpdate(instructor.id, { location: newLoc });
  };

  const handleTransfer = () => {
    if (!newInstructorId) return alert("Please select a target instructor");
    const targetName = availableSameLocationStaff.find(i => i.id === newInstructorId)?.name;
    alert(`Successfully transferred ${transferingStudent.name} to ${targetName} (within ${currentLocation})`);
    setTransferingStudent(null);
    setNewInstructorId('');
  };

  if (!instructor) return null;

  const hasStudents = instructor.students?.length > 0;
  const availableSameLocationStaff = allInstructors.filter(
    (staff) => staff.location === currentLocation && staff.id !== instructor.id && staff.status === 'Active'
  );
  
  // Check if block action is allowed
  const canBlock = !hasStudents;
  const blockTooltip = hasStudents ? `Cannot block: ${instructor.students.length} active student(s) assigned` : "";

  const DataField = ({ label, name, value, onChange, isEditing, type = "text" }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[0.7rem] font-mono font-semibold uppercase tracking-wider text-slate-500 ml-1">{label}</label>
      {isEditing ? (
        <input 
          type={type} 
          name={name} 
          value={value || ''} 
          onChange={onChange} 
          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none text-[0.8rem] font-medium text-slate-900 dark:text-slate-200 transition-all"
        />
      ) : (
        <div className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-transparent text-[0.8rem] font-medium text-slate-700 dark:text-slate-300 min-h-[42px] flex items-center">
          {value || <span className="text-slate-400 text-[0.7rem] italic">Not Provided</span>}
        </div>
      )}
    </div>
  );

  const SelectField = ({ label, name, value, onChange, isEditing, options, disabled }) => (
    <div className="flex flex-col gap-1">
      <label className="text-[0.7rem] font-mono font-semibold uppercase tracking-wider text-slate-500 ml-1">{label}</label>
      {isEditing ? (
        <select 
          name={name} 
          value={value || ''} 
          onChange={onChange} 
          disabled={disabled}
          className={`w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 outline-none text-[0.8rem] font-medium transition-all
            ${disabled 
              ? 'bg-slate-100 dark:bg-slate-800 cursor-not-allowed text-slate-400' 
              : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 cursor-pointer'
            }`}
        >
          <option value="">Select {label}...</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <div className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-[0.8rem] font-medium text-slate-700 dark:text-slate-300 capitalize min-h-[42px] flex items-center">
          {value || '---'}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
      <div className="bg-white dark:bg-slate-950 w-full max-w-6xl h-full max-h-[90vh] rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-semibold text-base">
              {editData.name?.[0] || 'I'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold tracking-tight text-slate-800 dark:text-white" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>{editData.name}</h2>
                <span className={`text-[0.65rem] font-mono font-semibold px-2 py-0.5 rounded-full ${editData.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                  {editData.status}
                </span>
              </div>
              <p className="text-[0.65rem] font-mono text-slate-500">ID: {instructor.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {/* Block/Unblock Button with Validation */}
            <div className="relative group">
              <button 
                onClick={handleToggleBlock}
                disabled={blockLoading || (editData.status === "Active" && !canBlock)}
                title={blockTooltip}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-medium text-[0.75rem] transition-all ${
                  editData.status === "Blocked" 
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/40" 
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800/40"
                } ${(editData.status === "Active" && !canBlock) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {blockLoading ? <Loader2 className="animate-spin" size={14} /> : editData.status === "Blocked" ? <CheckCircle size={14} /> : <Ban size={14} />}
                {editData.status === "Blocked" ? 'Activate' : 'Block'}
              </button>
              {editData.status === "Active" && !canBlock && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[0.6rem] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {blockTooltip}
                </div>
              )}
            </div>
            
            {/* Edit/Save Button */}
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={loading}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-medium text-[0.75rem] transition-all ${isEditing ? 'bg-teal-500 hover:bg-teal-600' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'} ${isEditing ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}
            >
              {loading ? <Loader2 className="animate-spin" size={14} /> : isEditing ? <Save size={14} /> : <Edit3 size={14} />}
              {isEditing ? 'Save' : 'Edit'}
            </button>
            
            {/* Close Button */}
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Warning Banner - Show if trying to block with students */}
          {editData.status === "Active" && hasStudents && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg flex items-start gap-2">
              <AlertCircle size={14} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-[0.7rem] text-red-800 dark:text-red-300">
                <span className="font-semibold">Cannot Block:</span> This instructor has {instructor.students.length} active student(s). Please transfer all students before blocking.
              </p>
            </div>
          )}
          
          {/* Edit Mode Warning */}
          {isEditing && hasStudents && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 rounded-lg flex items-start gap-2">
              <AlertCircle size={14} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-[0.7rem] text-amber-800 dark:text-amber-300">
                <span className="font-semibold">Note:</span> Assigned Location and Status are locked because this instructor has active students. Reassign students before changing.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Personal Profile Section */}
              <section className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-[0.7rem] font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User size={14} /> Account & Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DataField label="Full Name" name="name" value={editData.name} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="Email" name="email" value={editData.email} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="Phone" name="phone" value={editData.phone} onChange={handleChange} isEditing={isEditing} />
                  <SelectField 
                    label="Status" 
                    name="status" 
                    value={editData.status} 
                    onChange={handleChange} 
                    isEditing={isEditing} 
                    disabled={hasStudents}
                    options={['Active', 'Inactive', 'Blocked']} 
                  />
                  <DataField label="Date of Birth" name="dob" value={editData.dob} onChange={handleChange} isEditing={isEditing} type="date" />
                  <DataField label="Language" name="language" value={editData.language} onChange={handleChange} isEditing={isEditing} />
                </div>
              </section>

              {/* Address Section */}
              <section className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-[0.7rem] font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <MapPin size={14} /> Address & Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DataField label="Street Address" name="street_address" value={editData.street_address} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="City" name="city" value={editData.city} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="Province" name="province" value={editData.province} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="Postal Code" name="postal_code" value={editData.postal_code} onChange={handleChange} isEditing={isEditing} />
                  <SelectField 
                    label="Assigned Location" 
                    name="assigned_location" 
                    value={editData.assigned_location} 
                    onChange={handleLocationUpdate} 
                    isEditing={isEditing} 
                    disabled={hasStudents}
                    options={['Burin', 'Grand Falls', 'Marystown', "St. John's / Mount Pearl"]} 
                  />
                  <DataField label="Country" name="country" value={editData.country} onChange={handleChange} isEditing={isEditing} />
                </div>
              </section>

              {/* Professional Section */}
              <section className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-[0.7rem] font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Briefcase size={14} /> Professional & Licensing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DataField label="License No" name="licence_no" value={editData.licence_no} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="Instructor License" name="inst_license_no" value={editData.inst_license_no} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="License Expiry" name="licence_expiry" value={editData.licence_expiry} onChange={handleChange} isEditing={isEditing} type="date" />
                  <SelectField label="Employment Status" name="emp_status" value={editData.emp_status} onChange={handleChange} isEditing={isEditing} options={['Full-time', 'Part-time', 'Contract']} />
                  <div className="md:col-span-2">
                    <DataField label="Qualifications" name="qualifications_to_teach" value={editData.qualifications_to_teach} onChange={handleChange} isEditing={isEditing} />
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN - 1/3 width */}
            <div className="space-y-6">
              
              {/* Vehicle Info */}
              <section className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-[0.7rem] font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Car size={14} /> Vehicle Assignment
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-[0.65rem] font-mono text-slate-500">Vehicle</p>
                    <p className="text-[0.85rem] font-medium text-slate-800 dark:text-slate-200">{instructor.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-mono text-slate-500">Plate Number</p>
                    <p className="text-[0.75rem] font-mono font-semibold text-slate-800 dark:text-slate-200 uppercase">{instructor.plate}</p>
                  </div>
                </div>
              </section>

              {/* Active Students Section */}
              <section className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[0.7rem] font-mono font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-2">
                    <Users size={14} /> Active Students
                  </h3>
                  <span className="text-[0.65rem] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-600">
                    {instructor.students?.length || 0}
                  </span>
                </div>

                <div className="space-y-2">
                  {instructor.students?.map(stu => (
                    <div key={stu.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex justify-between items-center group">
                      <div>
                        <p className="text-[0.8rem] font-medium text-slate-800 dark:text-white">{stu.name}</p>
                        <p className="text-[0.65rem] font-mono text-slate-500">{stu.city} • {stu.permit_number}</p>
                      </div>
                      <button 
                        onClick={() => setTransferingStudent(stu)}
                        className="p-1.5 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-all"
                        title="Transfer to same-location staff"
                      >
                        <MoveHorizontal size={14} />
                      </button>
                    </div>
                  ))}
                  {(!instructor.students || instructor.students.length === 0) && (
                    <p className="text-center py-4 text-[0.7rem] text-slate-400 italic">No active students assigned.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="px-6 py-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium text-[0.75rem] transition-all"
          >
            Close Profile
          </button>
        </footer>

        {/* TRANSFER STUDENT MODAL */}
        {transferingStudent && (
          <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-white">Transfer Student</h4>
                  <p className="text-[0.7rem] text-slate-500">Reassigning <span className="font-medium text-teal-600">{transferingStudent.name}</span></p>
                </div>
                <button onClick={() => setTransferingStudent(null)} className="p-1 text-slate-400 hover:text-red-500 rounded-lg">
                  <X size={16} />
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-[0.65rem] font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                    Target Instructor ({currentLocation})
                  </label>
                  <select 
                    value={newInstructorId}
                    onChange={(e) => setNewInstructorId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[0.8rem] outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="">Select instructor...</option>
                    {availableSameLocationStaff.map(i => (
                      <option key={i.id} value={i.id}>{i.name} ({i.students?.length || 0} students)</option>
                    ))}
                  </select>
                  {availableSameLocationStaff.length === 0 && (
                    <p className="text-[0.65rem] text-amber-600 mt-1">No other instructors available in this location</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setTransferingStudent(null)} className="flex-1 px-3 py-2 text-[0.75rem] font-medium text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button 
                    onClick={handleTransfer} 
                    disabled={!newInstructorId || availableSameLocationStaff.length === 0}
                    className="flex-1 px-3 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-[0.75rem] font-medium transition-all"
                  >
                    Confirm Transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDetailModal;