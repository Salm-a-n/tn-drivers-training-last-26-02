
import React from "react";
import { X } from "lucide-react";

// NEW: Receiving onAdd prop
const InstructorRegisterModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // NEW: Collect form data
    const formData = new FormData(e.target);
    const data = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      contact: formData.get("phone"),
      email: formData.get("email"),
      dob: formData.get("dob"),
      location: formData.get("location"),
      address: formData.get("streetAddress"),
      license: formData.get("instructorLicense"),
      expiry: formData.get("expiry"),
      vehicle: "Vehicle TBD", // Can add inputs for these later
      plate: "Plate TBD",
    };

    onAdd(data); // Pass to parent
    onClose();
  };

  const handleReset = () => {
    const form = document.getElementById("instructorRegForm");
    if (form) form.reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-7xl h-full max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Register New <span className="text-teal-600 dark:text-teal-400">Instructor</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Fill in the details to add a new instructor to the system
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
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
          <form id="instructorRegForm" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Personal Information */}
            <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">First Name</label>
                  <input 
                    name="firstName" 
                    type="text" 
                    placeholder="e.g., Jean" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Last Name</label>
                  <input 
                    name="lastName" 
                    type="text" 
                    placeholder="e.g., Dupont" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Date of Birth</label>
                  <input 
                    name="dob" 
                    type="date" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Address</label>
                  <input 
                    name="email" 
                    type="email" 
                    placeholder="jean.dupont@example.ca" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Phone Number</label>
                  <input 
                    name="phone" 
                    type="tel" 
                    placeholder="+1 (709) 555-0123" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Primary Language</label>
                  <select 
                    name="language" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>Bilingual (EN/FR)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 md:col-span-3">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Assigned Location</label>
                  <select 
                    name="location" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required
                  >
                    <option value="">Select a location</option>
                    <option value="Burin">Burin</option>
                    <option value="Grand Falls">Grand Falls</option>
                    <option value="Marystown">Marystown</option>
                    <option value="St. John’s / Mount Pearl">St. John’s / Mount Pearl</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Residential Address */}
            <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                Residential Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Street Address</label>
                  <input 
                    name="streetAddress" 
                    type="text" 
                    placeholder="123 Maple Leaf Ave" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">City</label>
                  <input 
                    name="city" 
                    type="text" 
                    placeholder="St. John's" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Province</label>
                  <select 
                    name="province" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  >
                    <option>Newfoundland and Labrador</option>
                    <option>Ontario</option>
                    <option>Quebec</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Postal Code</label>
                  <input 
                    name="postalCode" 
                    type="text" 
                    placeholder="A1B 2C3" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Licensing & Certifications */}
            <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                Licensing & Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Driver's License #</label>
                  <input 
                    name="driversLicense" 
                    type="text" 
                    placeholder="D1234-56789-01234" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Instructor License #</label>
                  <input 
                    name="instructorLicense" 
                    type="text" 
                    placeholder="INST-88291-AB" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">License Expiry Date</label>
                  <input 
                    name="expiry" 
                    type="date" 
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    required 
                  />
                </div>
              </div>
              
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-3">Qualified to Teach (Classes)</label>
              <div className="flex flex-wrap gap-3">
                {["Class 5 (Car)", "Class 6 (Motorcycle)", "Class 1 (Commercial)", "Class 4 (Ambulance/Taxi)"].map((cls) => (
                  <label key={cls} className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all">
                    <input type="checkbox" name="classes" value={cls} className="rounded text-teal-600 focus:ring-teal-500/20" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cls}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Compliance & Documentation */}
            <section className="bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-5 flex items-center gap-2">
                <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                Compliance & Documentation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[{ label: "Criminal Record Check", sub: "Valid 6 months" }, { label: "Vulnerable Sector Search", sub: "Teaching minors" }].map((doc) => (
                    <div key={doc.label} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-white">{doc.label}</p>
                        <p className="text-xs text-slate-500 uppercase font-medium mt-0.5">{doc.sub}</p>
                      </div>
                      <button type="button" className="text-teal-600 dark:text-teal-400 text-xs font-semibold flex items-center gap-1 hover:underline transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload
                      </button>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">Driver Abstract (3-Year)</p>
                      <p className="text-xs text-slate-500 uppercase font-medium mt-0.5">Less than 6 demerits</p>
                    </div>
                    <button type="button" className="text-teal-600 dark:text-teal-400 text-xs font-semibold flex items-center gap-1 hover:underline transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">Employment Status</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input type="radio" name="status" value="Full-time" defaultChecked className="text-teal-600 focus:ring-teal-500/20" /> Full-time
                      </label>
                      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input type="radio" name="status" value="Contractor" className="text-teal-600 focus:ring-teal-500/20" /> Contractor
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <button 
            type="button" 
            onClick={handleReset} 
            className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            Reset Form
          </button>
          <button 
            type="submit" 
            form="instructorRegForm" 
            className="px-8 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            Complete Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorRegisterModal;