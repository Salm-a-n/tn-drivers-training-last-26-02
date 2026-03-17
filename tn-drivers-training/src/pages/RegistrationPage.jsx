import React, { useState } from 'react';
import { 
  User, Mail, Phone, Lock, MapPin, Home, Globe, Car, Loader2,
  CheckCircle, Calendar, Award, Hash, Briefcase, Camera, 
  ArrowRight, ArrowLeft, X, PenTool, Users, FileText, ChevronDown
} from 'lucide-react';

export default function RegistrationPage({ initialData = null, onBack }) {
  const isEditMode = !!initialData;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showForeign, setShowForeign] = useState(initialData?.has_foreign_license || false);
  const [isUnder18, setIsUnder18] = useState(false);

  // ALL ORIGINAL FIELDS PRESERVED
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    password: '',
    password_confirmation: '',
    profile_picture: null,
    package_id: initialData?.package_id || '',
    province: initialData?.province || '',
    street_address: initialData?.street_address || '',
    appartment: initialData?.appartment || '',
    city: initialData?.city || '',
    postal_code: initialData?.postal_code || '',
    state: initialData?.state || '',
    country: 'Canada',
    permit_number: initialData?.permit_number || '',
    permit_issue_date: initialData?.permit_issue_date || '',
    has_foreign_license: initialData?.has_foreign_license || false,
    foreign_license_number: initialData?.foreign_license_number || '',
    parent_name: initialData?.parent_name || '',
    parent_email: initialData?.parent_email || '',
    parent_phone: initialData?.parent_phone || '',
    experience: initialData?.experience || '',
    additional_notes: initialData?.additional_notes || '',
    foreign_street_address: initialData?.foreign_street_address || '',
    foreign_appartment: initialData?.foreign_appartment || '',
    foreign_city: initialData?.foreign_city || '',
    foreign_state: initialData?.foreign_state || '',
    foreign_postal_code: initialData?.foreign_postal_code || '',
    foreign_country: initialData?.foreign_country || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (name === 'has_foreign_license') setShowForeign(checked);
  };

  const inputClass = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all text-slate-900 dark:text-white";
  const labelClass = "block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5 ml-1";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* HEADER / NAVIGATION */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
          <h1 className="font-black italic text-lg tracking-tighter uppercase dark:text-white">
            Terra<span className="text-teal-500">Driving</span>
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
        
        {/* TOP PROGRESS BAR */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1">
          <div 
            className="bg-teal-500 h-full transition-all duration-500" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 md:py-10">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          
          <div className="p-6 md:p-10">
            <div className="mb-8">
              <span className="text-teal-500 font-black text-[10px] uppercase tracking-[0.2em]">Step {step} of 3</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                {step === 1 && "Choose Your Package"}
                {step === 2 && "Personal Details"}
                {step === 3 && "Address & License"}
              </h2>
            </div>

            <form className="space-y-6 text-left">
              
              {/* STEP 1: PACKAGES */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 101, name: "Beginner", price: "450", hours: "10" },
                      { id: 102, name: "Standard", price: "650", hours: "15" },
                      { id: 103, name: "Premium", price: "850", hours: "20" }
                    ].map(pkg => (
                      <label key={pkg.id} className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${formData.package_id === pkg.id ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/10' : 'border-slate-100 dark:border-slate-800'}`}>
                        <div className="flex items-center gap-4">
                          <input type="radio" name="package" checked={formData.package_id === pkg.id} onChange={() => setFormData({...formData, package_id: pkg.id})} className="w-5 h-5 accent-teal-500" />
                          <div>
                            <p className="font-black dark:text-white">{pkg.name}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{pkg.hours} Hours Training</p>
                          </div>
                        </div>
                        <p className="text-lg font-black text-teal-600">${pkg.price}</p>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className={labelClass}>Select Training Province</label>
                    <select name="province" value={formData.province} onChange={handleChange} className={inputClass}>
                      <option value="">Select Province</option>
                      <option value="1">Ontario</option>
                      <option value="2">British Columbia</option>
                      <option value="3">Alberta</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: PERSONAL */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div><label className={labelClass}>Full Name *</label><input name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Legal Name" /></div>
                    <div><label className={labelClass}>Email Address *</label><input name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="mail@example.com" /></div>
                    <div><label className={labelClass}>Phone Number *</label><input name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 ..." /></div>
                    <div><label className={labelClass}>Driving Experience</label><input name="experience" value={formData.experience} onChange={handleChange} className={inputClass} placeholder="e.g. None or 2 Years" /></div>
                    
                    {!isEditMode && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className={labelClass}>Password</label><input type="password" name="password" onChange={handleChange} className={inputClass} placeholder="••••••••" /></div>
                        <div><label className={labelClass}>Confirm</label><input type="password" name="password_confirmation" onChange={handleChange} className={inputClass} placeholder="••••••••" /></div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={labelClass}>Permit Number</label><input name="permit_number" value={formData.permit_number} onChange={handleChange} className={inputClass} /></div>
                      <div><label className={labelClass}>Issue Date</label><input type="date" name="permit_issue_date" value={formData.permit_issue_date} onChange={handleChange} className={inputClass} /></div>
                    </div>

                    <label className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl cursor-pointer">
                      <input type="checkbox" checked={isUnder18} onChange={(e) => setIsUnder18(e.target.checked)} className="h-5 w-5 accent-teal-500" />
                      <span className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase">Student is under 18</span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: ADDRESS & DOCUMENTS */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl space-y-4">
                    <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest border-b border-slate-200 dark:border-slate-700 pb-2">Canadian Residence</p>
                    <input name="street_address" value={formData.street_address} onChange={handleChange} className={inputClass} placeholder="Street Address" />
                    <div className="grid grid-cols-2 gap-3">
                      <input name="appartment" value={formData.appartment} onChange={handleChange} className={inputClass} placeholder="Apt/Suite" />
                      <input name="city" value={formData.city} onChange={handleChange} className={inputClass} placeholder="City" />
                      <input name="state" value={formData.state} onChange={handleChange} className={inputClass} placeholder="Province" />
                      <input name="postal_code" value={formData.postal_code} onChange={handleChange} className={inputClass} placeholder="Postal Code" />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer">
                    <input type="checkbox" name="has_foreign_license" checked={formData.has_foreign_license} onChange={handleChange} className="h-5 w-5 accent-teal-500" />
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Hold a Foreign License</span>
                  </label>

                  {showForeign && (
                    <div className="p-5 bg-teal-500/5 rounded-2xl border border-teal-500/20 space-y-3 animate-in slide-in-from-top-2">
                      <p className="text-[10px] font-black text-teal-600 uppercase">Foreign Details</p>
                      <input name="foreign_street_address" value={formData.foreign_street_address} onChange={handleChange} className={inputClass} placeholder="Street" />
                      <div className="grid grid-cols-2 gap-2">
                        <input name="foreign_country" value={formData.foreign_country} onChange={handleChange} className={inputClass} placeholder="Country" />
                        <input name="foreign_license_number" value={formData.foreign_license_number} onChange={handleChange} className={inputClass} placeholder="License #" />
                      </div>
                    </div>
                  )}

                  {isUnder18 && (
                    <div className="p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/20 space-y-3">
                      <p className="text-[10px] font-black text-indigo-600 uppercase">Guardian Contact</p>
                      <input name="parent_name" value={formData.parent_name} onChange={handleChange} className={inputClass} placeholder="Guardian Name" />
                      <input name="parent_email" value={formData.parent_email} onChange={handleChange} className={inputClass} placeholder="Guardian Email" />
                      <input name="parent_phone" value={formData.parent_phone} onChange={handleChange} className={inputClass} placeholder="Guardian Phone" />
                    </div>
                  )}

                  <div><label className={labelClass}>Additional Notes</label><textarea name="additional_notes" value={formData.additional_notes} onChange={handleChange} rows="3" className={inputClass} placeholder="Special requests..." /></div>
                </div>
              )}
            </form>
          </div>

          {/* STICKY FOOTER BUTTONS */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="text-xs font-black uppercase text-slate-400 hover:text-teal-600 transition flex items-center gap-2">
                <ArrowLeft size={16} /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center gap-2">
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={() => alert('Saved!')} disabled={loading} className="px-10 py-4 bg-teal-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-teal-500/30 flex items-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <CheckCircle size={16} />}
                {isEditMode ? 'Update' : 'Complete'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}