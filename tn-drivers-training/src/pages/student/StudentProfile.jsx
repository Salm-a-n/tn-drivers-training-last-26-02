import React, { useState } from 'react';
import { 
  User,Users, Mail, Phone, Calendar, MapPin, Home, 
  CreditCard, FileText, AlertCircle, Edit2, 
  Save, X, Globe, Car, Award, BookOpen,
  CheckCircle, ChevronRight, Building, Hash
} from 'lucide-react';


const StudentProfile = () => {
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Dummy student data matching the model
  const [studentData, setStudentData] = useState({
    // Basic Info
    user: {
      name: "Vijay",
      email: "vijay@canada.com",
      phone: "+1 (709) 555-0123",
      profile_picture: null
    },
    dob: "1998-05-15",
    
    // Package Info (read-only)
    package: {
      id: 1,
      name: "Full Driver Training Course",
      hours: 40,
      price: 1299.99,
      includes: ["In-car lessons", "Road test preparation", "Online theory"]
    },
    
    // Instructor Info (read-only)
    instructor: {
      id: 1,
      user: {
        name: "Sarah Johnson",
        email: "sarah.johnson@terranova.com",
        phone: "+1 (709) 555-0890"
      },
      specialization: "Defensive Driving"
    },
    
    // Address Information
    street_address: "123 Main Street",
    appartment: "Apt 4B",
    city: "St. John's",
    province: "Newfoundland and Labrador",
    state: "NL",
    country: "Canada",
    postal_code: "A1B 2C3",
    
    // Parent/Guardian Information
    parent_name: "David Chen",
    parent_email: "david.chen@example.com",
    parent_phone: "+1 (709) 555-0456",
    
    // Permit Information
    permit_number: "DL-789-456-123",
    permit_issue_date: "2024-01-15",
    
    // Foreign License Information
    has_foreign_license: false,
    foreign_license_number: "",
    foreign_street_address: "",
    foreign_appartment: "",
    foreign_city: "",
    foreign_state: "",
    foreign_postal_code: "",
    foreign_country: "",
    
    // Additional Info
    experience: "Basic driving experience with 10 hours of practice",
    additional_notes: "Student prefers automatic transmission vehicles. Available for evening classes."
  });

  // State for editing form
  const [editForm, setEditForm] = useState({ ...studentData });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEditForm(prev => ({ ...prev, [name]: checked }));
      if (!checked) {
        // Clear foreign license fields if unchecked
        setEditForm(prev => ({
          ...prev,
          foreign_license_number: "",
          foreign_street_address: "",
          foreign_appartment: "",
          foreign_city: "",
          foreign_state: "",
          foreign_postal_code: "",
          foreign_country: ""
        }));
      }
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditForm(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setEditForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setStudentData({ ...editForm });
      setIsEditing(false);
      setSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditForm({ ...studentData });
    setIsEditing(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Profile Section Component
  const ProfileSection = ({ title, icon: Icon, children, className = "" }) => (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm ${className}`}>
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-teal-50/50 to-transparent dark:from-teal-900/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
            <Icon size={18} className="text-teal-600 dark:text-teal-400" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h2>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  const InfoRow = ({ label, value, colSpan = "col-span-1" }) => (
    <div className={colSpan}>
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
        {label}
      </label>
      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {value || 'Not provided'}
      </p>
    </div>
  );

  const EditField = ({ label, name, type = "text", placeholder = "", options = [], colSpan = "col-span-1", rows = 3 }) => {
    if (type === "textarea") {
      return (
        <div className={colSpan}>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            {label}
          </label>
          <textarea
            name={name}
            value={editForm[name] || ''}
            onChange={handleInputChange}
            rows={rows}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
            placeholder={placeholder}
          />
        </div>
      );
    }
    
    if (type === "checkbox") {
      return (
        <div className={colSpan}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name={name}
              checked={editForm[name] || false}
              onChange={handleInputChange}
              className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
          </label>
        </div>
      );
    }
    
    if (type === "select") {
      return (
        <div className={colSpan}>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
            {label}
          </label>
          <select
            name={name}
            value={editForm[name] || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          >
            <option value="">Select...</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    }
    
    return (
      <div className={colSpan}>
        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={editForm[name] || ''}
          onChange={handleInputChange}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-8xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                My <span className="text-teal-600">Profile</span>
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                View and manage your personal information
              </p>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm transition-all shadow-sm"
              >
                <Edit2 size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm transition-all shadow-sm disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="space-y-6">
            
            {/* Basic Information */}
            <ProfileSection title="Basic Information" icon={User}>
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4 md:col-span-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {studentData.user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{studentData.user.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{studentData.user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">{studentData.user.phone}</span>
                      </div>
                    </div>
                  </div>
                  <InfoRow label="Date of Birth" value={formatDate(studentData.dob)} />
                  <InfoRow label="Age" value={`${new Date().getFullYear() - new Date(studentData.dob).getFullYear()} years`} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditField label="Full Name" name="user.name" type="text" />
                  <EditField label="Email" name="user.email" type="email" />
                  <EditField label="Phone" name="user.phone" type="tel" />
                  <EditField label="Date of Birth" name="dob" type="date" />
                </div>
              )}
            </ProfileSection>

            {/* Package & Instructor Information (Read-only) */}
            <ProfileSection title="Course Information" icon={BookOpen}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={18} className="text-teal-600" />
                    <h3 className="font-bold text-slate-800 dark:text-white">Selected Package</h3>
                  </div>
                  <p className="text-lg font-bold text-teal-600">{studentData.package.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {studentData.package.hours} hours • ${studentData.package.price}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {studentData.package.includes.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <CheckCircle size={10} className="text-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Car size={18} className="text-teal-600" />
                    <h3 className="font-bold text-slate-800 dark:text-white">Assigned Instructor</h3>
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-white">{studentData.instructor.user.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{studentData.instructor.specialization}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Mail size={12} />
                      {studentData.instructor.user.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Phone size={12} />
                      {studentData.instructor.user.phone}
                    </div>
                  </div>
                </div>
              </div>
            </ProfileSection>

            {/* Address Information */}
            <ProfileSection title="Address Information" icon={MapPin}>
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoRow label="Street Address" value={studentData.street_address} />
                  <InfoRow label="Apartment" value={studentData.appartment} />
                  <InfoRow label="City" value={studentData.city} />
                  <InfoRow label="Province" value={studentData.province} />
                  <InfoRow label="Postal Code" value={studentData.postal_code} />
                  <InfoRow label="Country" value={studentData.country} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditField label="Street Address" name="street_address" type="text" />
                  <EditField label="Apartment" name="appartment" type="text" />
                  <EditField label="City" name="city" type="text" />
                  <EditField label="Province" name="province" type="text" />
                  <EditField label="Postal Code" name="postal_code" type="text" />
                  <EditField label="Country" name="country" type="text" />
                </div>
              )}
            </ProfileSection>

            {/* Parent/Guardian Information */}
            <ProfileSection title="Parent/Guardian Information" icon={Users}>
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoRow label="Parent Name" value={studentData.parent_name} />
                  <InfoRow label="Parent Email" value={studentData.parent_email} />
                  <InfoRow label="Parent Phone" value={studentData.parent_phone} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditField label="Parent Name" name="parent_name" type="text" />
                  <EditField label="Parent Email" name="parent_email" type="email" />
                  <EditField label="Parent Phone" name="parent_phone" type="tel" />
                </div>
              )}
            </ProfileSection>

            {/* Permit Information */}
            <ProfileSection title="Driver's Permit Information" icon={CreditCard}>
              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoRow label="Permit Number" value={studentData.permit_number} />
                  <InfoRow label="Issue Date" value={formatDate(studentData.permit_issue_date)} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditField label="Permit Number" name="permit_number" type="text" />
                  <EditField label="Issue Date" name="permit_issue_date" type="date" />
                </div>
              )}
            </ProfileSection>

            {/* Foreign License Information */}
            <ProfileSection title="Foreign License Information" icon={Globe}>
              {!isEditing ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={studentData.has_foreign_license}
                      readOnly
                      disabled
                      className="w-4 h-4 rounded border-slate-300 text-teal-600"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Has foreign driver's license
                    </span>
                  </div>
                  
                  {studentData.has_foreign_license && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <InfoRow label="License Number" value={studentData.foreign_license_number} />
                      <InfoRow label="Street Address" value={studentData.foreign_street_address} />
                      <InfoRow label="Apartment" value={studentData.foreign_appartment} />
                      <InfoRow label="City" value={studentData.foreign_city} />
                      <InfoRow label="State/Province" value={studentData.foreign_state} />
                      <InfoRow label="Postal Code" value={studentData.foreign_postal_code} />
                      <InfoRow label="Country" value={studentData.foreign_country} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <EditField label="Has Foreign License" name="has_foreign_license" type="checkbox" />
                  
                  {editForm.has_foreign_license && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                      <EditField label="License Number" name="foreign_license_number" type="text" />
                      <EditField label="Street Address" name="foreign_street_address" type="text" />
                      <EditField label="Apartment" name="foreign_appartment" type="text" />
                      <EditField label="City" name="foreign_city" type="text" />
                      <EditField label="State/Province" name="foreign_state" type="text" />
                      <EditField label="Postal Code" name="foreign_postal_code" type="text" />
                      <EditField label="Country" name="foreign_country" type="text" />
                    </div>
                  )}
                </div>
              )}
            </ProfileSection>

            {/* Additional Information */}
            <ProfileSection title="Additional Information" icon={FileText}>
              {!isEditing ? (
                <div className="grid grid-cols-1 gap-6">
                  <InfoRow label="Driving Experience" value={studentData.experience} colSpan="col-span-2" />
                  <InfoRow label="Additional Notes" value={studentData.additional_notes} colSpan="col-span-2" />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <EditField label="Driving Experience" name="experience" type="textarea" rows={3} />
                  <EditField label="Additional Notes" name="additional_notes" type="textarea" rows={3} />
                </div>
              )}
            </ProfileSection>
          </div>
        </div>
      </div>
    </div>
  );
};

// Missing import for Users icon


export default StudentProfile;