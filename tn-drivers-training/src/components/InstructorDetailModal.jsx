import React, { useState } from 'react';
import { 
  X, User, Mail, Phone, MapPin, 
  Car, Users, MoveHorizontal, AlertCircle, 
  ShieldCheck, Edit3, Save, Loader2,
  FileText, Calendar, Briefcase, BadgeCheck,
  Ban, CheckCircle, Trash2
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
  onToggleBlock,
  onDelete 
}) => {
  const [transferingStudent, setTransferingStudent] = useState(null);
  const [newInstructorId, setNewInstructorId] = useState('');
  const [currentLocation, setCurrentLocation] = useState(instructor?.location || instructor?.assigned_location || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  const handleDelete = async () => {
    // Only allow deletion if instructor is blocked
    if (editData.status !== "Blocked") {
      alert(`Cannot delete ${editData.name} because they are not blocked. Please block the instructor first.`);
      return;
    }
    
    if (!window.confirm(`Are you sure you want to permanently delete ${editData.name}? This action cannot be undone.`)) {
      return;
    }
    
    setDeleteLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Instructor ${editData.name} deleted successfully!`);
      if (onDelete) {
        onDelete(instructor.id);
      }
      onClose();
      setDeleteLoading(false);
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
  
  // Check if delete is allowed (only when blocked)
  const canDelete = editData.status === "Blocked";
  const deleteTooltip = !canDelete ? "Only blocked instructors can be deleted" : "";

  const DataField = ({ label, name, value, onChange, isEditing, type = "text" }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{label}</label>
      {isEditing ? (
        <input 
          type={type} 
          name={name} 
          value={value || ''} 
          onChange={onChange} 
          className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none text-sm font-medium text-slate-900 dark:text-white transition-all"
        />
      ) : (
        <div className="px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 min-h-[42px] flex items-center">
          {value || <span className="text-slate-400 text-xs italic">Not Provided</span>}
        </div>
      )}
    </div>
  );

  const SelectField = ({ label, name, value, onChange, isEditing, options, disabled }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{label}</label>
      {isEditing ? (
        <select 
          name={name} 
          value={value || ''} 
          onChange={onChange} 
          disabled={disabled}
          className={`w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 outline-none text-sm font-medium transition-all
            ${disabled 
              ? 'bg-slate-100 dark:bg-slate-800 cursor-not-allowed text-slate-400' 
              : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 cursor-pointer'
            }`}
        >
          <option value="">Select {label}...</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <div className="px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 capitalize min-h-[42px] flex items-center">
          {value || '---'}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-950 w-full max-w-7xl h-full max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 gap-3 sm:gap-4">
  {/* Left Section - Avatar and Info */}
  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-sm sm:text-base md:text-lg flex-shrink-0">
      {editData.name?.[0] || 'I'}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
        <h2 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-slate-800 dark:text-white truncate">
          {editData.name}
        </h2>
        <span className={`text-[9px] sm:text-[10px] md:text-xs font-semibold px-1.5 sm:px-2 md:px-3 py-0.5 rounded-full whitespace-nowrap ${
          editData.status === 'Active' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        }`}>
          {editData.status}
        </span>
      </div>
      <p className="text-[10px] sm:text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
        ID: {instructor.id}
      </p>
    </div>
  </div>
  
  {/* Right Section - Action Buttons */}
  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
    {/* Block/Unblock Button */}
    <div className="relative group">
      <button 
        onClick={handleToggleBlock}
        disabled={blockLoading || (editData.status === "Active" && !canBlock)}
        title={blockTooltip}
        className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-all ${
          editData.status === "Blocked" 
            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30" 
            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
        } ${(editData.status === "Active" && !canBlock) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {blockLoading ? <Loader2 className="animate-spin" size={12} /> : editData.status === "Blocked" ? <CheckCircle size={12} /> : <Ban size={12} />}
        <span>{editData.status === "Blocked" ? 'Activate' : 'Block'}</span>
      </button>
      {editData.status === "Active" && !canBlock && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
          {blockTooltip}
        </div>
      )}
    </div>
    
    {/* Delete Button - Only visible for blocked instructors */}
    {editData.status === "Blocked" && (
      <button 
        onClick={handleDelete}
        disabled={deleteLoading}
        title={deleteTooltip}
        className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-all bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer"
      >
        {deleteLoading ? <Loader2 className="animate-spin" size={12} /> : <Trash2 size={12} />}
        <span>Delete</span>
      </button>
    )}
    
    {/* Edit/Save Button */}
    <button 
      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
      disabled={loading}
      className={`flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-lg font-semibold text-[10px] sm:text-xs md:text-sm transition-all ${
        isEditing 
          ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20' 
          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
      }`}
    >
      {loading ? <Loader2 className="animate-spin" size={12} /> : isEditing ? <Save size={12} /> : <Edit3 size={12} />}
      <span>{isEditing ? 'Save' : 'Edit'}</span>
    </button>
    
    {/* Close Button */}
    <button 
      onClick={onClose} 
      className="p-1 sm:p-1.5 md:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
    >
      <X size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
    </button>
  </div>
</div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          
          {/* Warning Banner - Show if trying to block with students */}
          {editData.status === "Active" && hasStudents && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <span className="font-semibold">Cannot Block:</span> This instructor has {instructor.students.length} active student(s). Please transfer all students before blocking.
              </p>
            </div>
          )}
          
          {/* Edit Mode Warning */}
          {isEditing && hasStudents && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <span className="font-semibold">Note:</span> Assigned Location and Status are locked because this instructor has active students. Reassign students before changing.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Personal Profile Section */}
              <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                  Account & Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <DataField label="Full Name" name="name" value={editData.name} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="Email Address" name="email" value={editData.email} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="Phone Number" name="phone" value={editData.phone} onChange={handleChange} isEditing={isEditing} />
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
                  <DataField label="Primary Language" name="language" value={editData.language} onChange={handleChange} isEditing={isEditing} />
                </div>
              </section>

              {/* Address Section */}
              <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                  Address & Location
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
              <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                  Professional & Licensing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <DataField label="Driver's License #" name="licence_no" value={editData.licence_no} onChange={handleChange} isEditing={isEditing} />
                  <DataField label="Instructor License #" name="inst_license_no" value={editData.inst_license_no} onChange={handleChange} isEditing={isEditing} />
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
              <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                  <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                  Vehicle Assignment
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Vehicle</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">{instructor.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Plate Number</p>
                    <p className="text-sm font-mono font-semibold text-slate-800 dark:text-white uppercase">{instructor.plate}</p>
                  </div>
                </div>
              </section>

              {/* Active Students Section */}
              <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                    Active Students
                  </h3>
                  <span className="text-xs font-semibold bg-white dark:bg-slate-900 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {instructor.students?.length || 0}
                  </span>
                </div>

                <div className="space-y-2">
                  {instructor.students?.map(stu => (
                    <div key={stu.id} className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center group hover:shadow-sm transition-all">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{stu.name}</p>
                        <p className="text-xs font-mono text-slate-500 mt-0.5">{stu.city} • {stu.permit_number}</p>
                      </div>
                      <button 
                        onClick={() => setTransferingStudent(stu)}
                        className="p-2 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-all"
                        title="Transfer to same-location staff"
                      >
                        <MoveHorizontal size={16} />
                      </button>
                    </div>
                  ))}
                  {(!instructor.students || instructor.students.length === 0) && (
                    <p className="text-center py-6 text-sm text-slate-400 italic">No active students assigned.</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all"
          >
            Close Profile
          </button>
        </footer>

        {/* TRANSFER STUDENT MODAL */}
        {transferingStudent && (
          <div className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">Transfer Student</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Reassigning <span className="font-semibold text-teal-600">{transferingStudent.name}</span>
                  </p>
                </div>
                <button onClick={() => setTransferingStudent(null)} className="p-1 text-slate-400 hover:text-red-500 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                    Target Instructor ({currentLocation})
                  </label>
                  <select 
                    value={newInstructorId}
                    onChange={(e) => setNewInstructorId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
                  >
                    <option value="">Select instructor...</option>
                    {availableSameLocationStaff.map(i => (
                      <option key={i.id} value={i.id}>{i.name} ({i.students?.length || 0} students)</option>
                    ))}
                  </select>
                  {availableSameLocationStaff.length === 0 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">No other instructors available in this location</p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setTransferingStudent(null)} 
                    className="flex-1 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleTransfer} 
                    disabled={!newInstructorId || availableSameLocationStaff.length === 0}
                    className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-teal-500/20"
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