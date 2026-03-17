import React, { useState } from 'react';
import { 
  User, Mail, Phone, Lock, MapPin, 
  Home, Globe, Car, Loader2,
  CheckCircle, AlertCircle, Calendar, Award, 
  Hash, Briefcase, Camera, ArrowRight, ArrowLeft, X,
  PenTool, Users, MapPinned
} from 'lucide-react';

// Static Data for Selects
const DUMMY_LOCATIONS = [
  { id: 1, province_name: "Ontario", tax_rate: 13 },
  { id: 2, province_name: "British Columbia", tax_rate: 12 },
  { id: 3, province_name: "Alberta", tax_rate: 5 },
];

const DUMMY_PACKAGES = [
  { id: 101, name: "Starter", amount: 500, class: "5" },
  { id: 102, name: "Standard", amount: 800, class: "5" },
  { id: 103, name: "Premium", amount: 1200, class: "5" },
];

export default function RegistrationPage({ initialData = null, onBack }) {
  const isEditMode = !!initialData;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isUnder18, setIsUnder18] = useState(initialData?.isUnder18 || false);
  const [showForeignAddress, setShowForeignAddress] = useState(initialData?.has_foreign_license || false);

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
    if (name === 'has_foreign_license') setShowForeignAddress(checked);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: 'success', text: 'Form Processed Successfully!' });
    }, 1500);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-white text-xs focus:border-teal-500 outline-none transition-all placeholder:text-white/20";
  const labelClass = "block text-[9px] font-black text-teal-400 uppercase tracking-widest mb-1.5";

  return (
    <div className="min-h-screen bg-[#0a0b0d] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#12141a] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        
        {/* SIDEBAR */}
        <div className={`md:w-64 p-8 text-white flex flex-col justify-between ${isEditMode ? 'bg-indigo-600' : 'bg-teal-600'}`}>
          <div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter mb-1">{isEditMode ? "Edit" : "Join"}</h1>
            <p className="text-[10px] font-bold opacity-60 uppercase mb-8">TerraDriving</p>
            <div className="space-y-4">
              {[1, 2, 3].map(s => (
                <div key={s} className={`flex items-center gap-3 ${step === s ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="h-7 w-7 rounded-lg bg-white text-black flex items-center justify-center text-[10px] font-black">{s}</div>
                  <span className="text-[9px] font-black uppercase">Step {s}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onBack} className="text-[10px] font-black uppercase flex items-center gap-2 opacity-50 hover:opacity-100"><X size={14}/> Close</button>
        </div>

        {/* FORM AREA */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar text-left">
            {message.text && <div className="mb-6 p-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-400 text-[10px] font-black uppercase text-center">{message.text}</div>}

            <form onSubmit={handleFinalSubmit} className="space-y-8">
              
              {/* STEP 1: PACKAGE & LOCATION */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                   <h2 className="text-sm font-black text-white uppercase italic flex items-center gap-2"><Award size={18} className="text-teal-400"/> Program Selection</h2>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                     {DUMMY_PACKAGES.map(pkg => (
                       <div key={pkg.id} onClick={() => setFormData({...formData, package_id: pkg.id})}
                        className={`p-4 rounded-2xl cursor-pointer border-2 transition-all ${formData.package_id === pkg.id ? 'bg-teal-500 border-white' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                        <p className="text-sm font-black text-white italic">{pkg.name}</p>
                        <p className="text-[10px] font-bold text-white/60">CAD {pkg.amount}</p>
                       </div>
                     ))}
                   </div>
                   <div>
                     <label className={labelClass}>Training Location Province</label>
                     <select name="province" value={formData.province} onChange={handleChange} className={inputClass}>
                       <option value="">Choose province</option>
                       {DUMMY_LOCATIONS.map(loc => <option key={loc.id} value={loc.id} className="bg-slate-900">{loc.province_name}</option>)}
                     </select>
                   </div>
                </div>
              )}

              {/* STEP 2: ALL PERSONAL & USER FIELDS */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                   <h2 className="text-sm font-black text-white uppercase italic flex items-center gap-2"><User size={18} className="text-teal-400"/> Personal & Account</h2>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="md:col-span-2"><label className={labelClass}>Full Name</label><input name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Legal Name" /></div>
                     <div><label className={labelClass}>Phone</label><input name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="Number" /></div>
                     <div className="md:col-span-2"><label className={labelClass}>Email Address</label><input name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="Email" /></div>
                     <div><label className={labelClass}>Experience</label><input name="experience" value={formData.experience} onChange={handleChange} className={inputClass} placeholder="e.g. 2 years" /></div>
                     
                     {!isEditMode && (
                       <>
                         <div><label className={labelClass}>Password</label><input type="password" name="password" onChange={handleChange} className={inputClass} placeholder="Min 8 chars" /></div>
                         <div><label className={labelClass}>Confirm Password</label><input type="password" name="password_confirmation" onChange={handleChange} className={inputClass} placeholder="Repeat" /></div>
                       </>
                     )}
                     
                     <div><label className={labelClass}>Permit Number</label><input name="permit_number" value={formData.permit_number} onChange={handleChange} className={inputClass} placeholder="License #" /></div>
                     <div><label className={labelClass}>Permit Issue Date</label><input type="date" name="permit_issue_date" value={formData.permit_issue_date} onChange={handleChange} className={inputClass} /></div>
                     <div className="flex items-center gap-3 pt-4"><input type="checkbox" checked={isUnder18} onChange={(e) => setIsUnder18(e.target.checked)} className="h-4 w-4 accent-teal-500" /><span className="text-[10px] font-bold text-white/50 uppercase">Student Under 18</span></div>
                   </div>
                   <div><label className={labelClass}>Profile Picture</label><input type="file" onChange={(e) => setFormData({...formData, profile_picture: e.target.files[0]})} className={inputClass} /></div>
                </div>
              )}

              {/* STEP 3: ALL ADDRESS & FOREIGN FIELDS */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                   <h2 className="text-sm font-black text-white uppercase italic flex items-center gap-2"><Home size={18} className="text-teal-400"/> Address & Documents</h2>
                   
                   {/* Canadian Address */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-white/5 rounded-2xl">
                     <div className="md:col-span-3 text-[10px] font-black text-teal-400 uppercase tracking-widest">Local Residence</div>
                     <div className="md:col-span-2"><label className={labelClass}>Street Address</label><input name="street_address" value={formData.street_address} onChange={handleChange} className={inputClass} /></div>
                     <div><label className={labelClass}>Apt/Suite</label><input name="appartment" value={formData.appartment} onChange={handleChange} className={inputClass} /></div>
                     <div><label className={labelClass}>City</label><input name="city" value={formData.city} onChange={handleChange} className={inputClass} /></div>
                     <div><label className={labelClass}>State/Province</label><input name="state" value={formData.state} onChange={handleChange} className={inputClass} /></div>
                     <div><label className={labelClass}>Postal Code</label><input name="postal_code" value={formData.postal_code} onChange={handleChange} className={inputClass} /></div>
                   </div>

                   <div className="flex items-center gap-3"><input type="checkbox" name="has_foreign_license" checked={formData.has_foreign_license} onChange={handleChange} className="h-4 w-4 accent-teal-500" /><span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">I Hold a Foreign License</span></div>

                   {/* Foreign Address Fields (Preserved) */}
                   {showForeignAddress && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-white/5 rounded-2xl border border-teal-500/20">
                       <div className="md:col-span-3 text-[10px] font-black text-teal-400 uppercase tracking-widest">Foreign License Details</div>
                       <div className="md:col-span-2"><label className={labelClass}>Foreign Street</label><input name="foreign_street_address" value={formData.foreign_street_address} onChange={handleChange} className={inputClass} /></div>
                       <div><label className={labelClass}>Foreign Apt</label><input name="foreign_appartment" value={formData.foreign_appartment} onChange={handleChange} className={inputClass} /></div>
                       <div><label className={labelClass}>Foreign City</label><input name="foreign_city" value={formData.foreign_city} onChange={handleChange} className={inputClass} /></div>
                       <div><label className={labelClass}>Foreign Country</label><input name="foreign_country" value={formData.foreign_country} onChange={handleChange} className={inputClass} /></div>
                       <div><label className={labelClass}>Foreign License #</label><input name="foreign_license_number" value={formData.foreign_license_number} onChange={handleChange} className={inputClass} /></div>
                     </div>
                   )}

                   {/* Parent Info (Preserved) */}
                   {isUnder18 && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-indigo-500/5 rounded-2xl border border-indigo-500/20">
                        <div className="md:col-span-3 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Parent/Guardian Info</div>
                        <div><label className={labelClass}>Guardian Name</label><input name="parent_name" value={formData.parent_name} onChange={handleChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Guardian Email</label><input name="parent_email" value={formData.parent_email} onChange={handleChange} className={inputClass} /></div>
                        <div><label className={labelClass}>Guardian Phone</label><input name="parent_phone" value={formData.parent_phone} onChange={handleChange} className={inputClass} /></div>
                     </div>
                   )}

                   <div><label className={labelClass}>Additional Notes</label><textarea name="additional_notes" value={formData.additional_notes} onChange={handleChange} rows="2" className={inputClass} placeholder="Medical info or requests..." /></div>
                </div>
              )}
            </form>
          </div>

          {/* FOOTER NAV */}
          <div className="p-8 border-t border-white/5 bg-black/20 backdrop-blur-md flex justify-between">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="text-[10px] font-black uppercase text-white/40 hover:text-white flex items-center gap-2"><ArrowLeft size={14}/> Back</button>
            ) : <div/>}

            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="px-10 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-400 transition-all flex items-center gap-2 font-black">Next Step <ArrowRight size={14}/></button>
            ) : (
              <button onClick={handleFinalSubmit} disabled={loading} className={`px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center gap-2 ${isEditMode ? 'bg-indigo-600' : 'bg-teal-600'}`}>
                {loading ? <Loader2 className="animate-spin" size={14}/> : <CheckCircle size={14}/>}
                {isEditMode ? 'Update Profile' : 'Complete Registration'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}