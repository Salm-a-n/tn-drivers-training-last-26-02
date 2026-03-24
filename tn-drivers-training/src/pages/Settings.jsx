// import React, { useState } from 'react';
// import { 
//   MapPin, ShieldCheck, Mail, Save, X, Eye, 
//   Smartphone, CheckCircle, Slash, ChevronRight, Bell, Plus, Edit3, Trash2
// } from 'lucide-react';

// const Settings = () => {
//   const [postalCodes, setPostalCodes] = useState(['V6B', 'V7C', 'M5V', 'H2X']);
//   const [newCode, setNewCode] = useState('');
  
//   // Tax Regions State
//   const [taxRegions, setTaxRegions] = useState([
//     { id: 1, city: "Burin", province: "NL", taxName: "HST", rate: 0.15 },
//     { id: 2, city: "St. John's", province: "NL", taxName: "HST", rate: 0.15 },
//     { id: 3, city: "Grand Falls", province: "NL", taxName: "HST", rate: 0.15 },
//     { id: 4, city: "Marystown", province: "NL", taxName: "HST", rate: 0.20 }
//   ]);

//   // Modal State
//   const [showTaxModal, setShowTaxModal] = useState(false);
//   const [editingRegion, setEditingRegion] = useState(null);
//   const [regionForm, setRegionForm] = useState({ city: '', province: 'NL', taxName: 'HST', rate: 15 });

//   const addPostalCode = () => {
//     if (newCode && !postalCodes.includes(newCode.toUpperCase())) {
//       setPostalCodes([...postalCodes, newCode.toUpperCase()]);
//       setNewCode('');
//     }
//   };

//   const removeCode = (code) => {
//     setPostalCodes(postalCodes.filter(c => c !== code));
//   };

//   // --- TAX CRUD LOGIC ---
//   const handleSaveRegion = (e) => {
//     e.preventDefault();
//     const newRegion = {
//       ...regionForm,
//       id: editingRegion ? editingRegion.id : Date.now(),
//       rate: parseFloat(regionForm.rate) / 100 // Convert percentage to decimal
//     };

//     if (editingRegion) {
//       setTaxRegions(taxRegions.map(r => r.id === editingRegion.id ? newRegion : r));
//     } else {
//       setTaxRegions([...taxRegions, newRegion]);
//     }
    
//     closeTaxModal();
//   };

//   const openTaxModal = (region = null) => {
//     if (region) {
//       setEditingRegion(region);
//       setRegionForm({ ...region, rate: region.rate * 100 });
//     } else {
//       setEditingRegion(null);
//       setRegionForm({ city: '', province: 'NL', taxName: 'HST', rate: 15 });
//     }
//     setShowTaxModal(true);
//   };

//   const closeTaxModal = () => {
//     setShowTaxModal(false);
//     setEditingRegion(null);
//   };

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      
//       {/* HEADER */}
//       <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
//         <div className="flex items-center gap-2 text-sm overflow-hidden">
//           <span className="text-slate-400 font-medium hidden xs:inline">Settings</span>
//           <ChevronRight size={14} className="text-slate-300 hidden xs:inline" />
//           <span className="text-slate-800 dark:text-white font-bold uppercase text-[10px] tracking-widest truncate">Configuration</span>
//         </div>
//         <div className="flex items-center gap-2 md:gap-4 shrink-0">
//           <button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-3 md:px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg transition-all active:scale-95">
//             <Save size={14} /> <span>Save Changes</span>
//           </button>
//         </div>
//       </header>

//       <main className="flex-1 overflow-y-auto p-4 md:p-8">
//         <div className="max-w-5xl mx-auto space-y-8 pb-10">
//           <div className="space-y-1">
//             <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
//               System <span className="text-[#0ea5e9]">Rules</span>
//             </h2>
//             <p className="text-xs md:text-sm text-slate-500 font-medium">Manage priority regions, access controls, and automated messaging.</p>
//           </div>

//           {/* PRIORITY AREA CONFIGURATOR */}
//           <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
//             <div className="p-5 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
//               <div className="size-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center">
//                 <MapPin size={20} />
//               </div>
//               <h3 className="text-sm md:text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight leading-none">Priority Areas</h3>
//             </div>
//             <div className="p-6 space-y-4">
//               <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
//                 {postalCodes.map((code) => (
//                   <div key={code} className="flex items-center gap-2 bg-[#0ea5e9]/10 text-[#0ea5e9] px-3 py-1.5 rounded-lg text-xs font-black border border-[#0ea5e9]/20">
//                     {code}
//                     <button onClick={() => removeCode(code)} className="hover:text-rose-500 transition-colors">
//                       <X size={12} />
//                     </button>
//                   </div>
//                 ))}
//                 <input 
//                   className="bg-transparent border-none focus:ring-0 text-xs flex-1 dark:text-white font-bold" 
//                   placeholder="Add code..." 
//                   value={newCode}
//                   onChange={(e) => setNewCode(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && addPostalCode()}
//                 />
//               </div>
//             </div>
//           </section>

//           {/* TAX COMPLIANCE SECTION */}
//           <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
//             <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="size-11 rounded-2xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 flex items-center justify-center font-bold text-xl">$</div>
//                 <div>
//                   <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">Tax Compliance</h3>
//                   <p className="text-[9px] text-slate-400 uppercase font-black tracking-wider">GST/HST Regional Rates</p>
//                 </div>
//               </div>
//               <button 
//                 onClick={() => openTaxModal()}
//                 className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-xl transition-all shadow-lg"
//               >
//                 <Plus size={18} />
//               </button>
//             </div>
            
//             <div className="p-6">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className="text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
//                       <th className="pb-4">Region/City</th>
//                       <th className="pb-4">Type</th>
//                       <th className="pb-4">Rate (%)</th>
//                       <th className="pb-4 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
//                     {taxRegions.map((region) => (
//                       <tr key={region.id} className="text-xs font-bold text-slate-700 dark:text-slate-300">
//                         <td className="py-4 font-black">{region.city} ({region.province})</td>
//                         <td className="py-4">
//                           <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-[9px] uppercase">{region.taxName}</span>
//                         </td>
//                         <td className="py-4">{(region.rate * 100).toFixed(1)}%</td>
//                         <td className="py-4 text-right flex justify-end gap-2">
//                           <button onClick={() => openTaxModal(region)} className="p-2 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg">
//                             <Edit3 size={14} />
//                           </button>
//                           <button onClick={() => setTaxRegions(taxRegions.filter(r => r.id !== region.id))} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg">
//                             <Trash2 size={14} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </section>

//           {/* PERMISSIONS MATRIX */}
//           <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
//             <div className="p-5 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
//               <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
//                 <ShieldCheck size={20} />
//               </div>
//               <h3 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-tight">Permissions Matrix</h3>
//             </div>
//             <div className="hidden md:block overflow-x-auto text-xs">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="bg-slate-50/50 dark:bg-slate-900 text-[10px] text-slate-400 font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
//                     <th className="px-8 py-5">System Capability</th>
//                     <th className="px-6 py-5 text-center">Admin</th>
//                     <th className="px-6 py-5 text-center">Instructor</th>
//                     <th className="px-6 py-5 text-center">Student</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
//                   <PermissionRow label="Full View / Edit" admin instructor={false} student={false} />
//                   <PermissionRow label="Manage Assigned Students" admin instructor student={false} />
//                   <PermissionRow label="Book Lessons & Progress" admin instructor student />
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           {/* TEMPLATES GRID */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <TemplateCard icon={<Mail size={18} />} title="Welcome" type="Email Template" defaultVal="Hi {student_name}, welcome to DriveSmart!" />
//             <TemplateCard icon={<Smartphone size={18} />} title="Reminder" type="SMS Notification" defaultVal="Reminder: Hi {student_name}, lesson tomorrow." />
//           </div>
//         </div>
//       </main>

//       {/* TAX MODAL */}
//       {showTaxModal && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
//           <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
//             <div className="p-8 bg-teal-500 text-white">
//               <h3 className="text-xl font-black uppercase italic">{editingRegion ? 'Edit Region' : 'Add New Region'}</h3>
//               <p className="text-xs font-bold opacity-80">Configure local tax rates for Newfoundland</p>
//             </div>
//             <form onSubmit={handleSaveRegion} className="p-8 space-y-4">
//               <div>
//                 <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">City Name</label>
//                 <input required value={regionForm.city} onChange={(e) => setRegionForm({...regionForm, city: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3 dark:text-white font-bold" />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Tax Name (HST/GST)</label>
//                   <input required value={regionForm.taxName} onChange={(e) => setRegionForm({...regionForm, taxName: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3 dark:text-white font-bold" />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Rate (%)</label>
//                   <input type="number" step="0.1" required value={regionForm.rate} onChange={(e) => setRegionForm({...regionForm, rate: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3 dark:text-white font-bold" />
//                 </div>
//               </div>
//               <div className="flex gap-4 pt-4">
//                 <button type="button" onClick={closeTaxModal} className="flex-1 py-4 text-slate-400 font-bold hover:text-slate-600">Cancel</button>
//                 <button type="submit" className="flex-1 bg-teal-500 text-white rounded-2xl font-black shadow-lg shadow-teal-500/20">Save Region</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // --- HELPER COMPONENTS ---

// const PermissionRow = ({ label, admin, instructor, student }) => (
//   <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
//     <td className="px-8 py-5 font-bold text-slate-800 dark:text-white uppercase tracking-tight">{label}</td>
//     <td className="px-6 py-5 text-center">{admin ? <CheckCircle className="inline text-sky-500" size={18}/> : <Slash className="inline text-slate-200 dark:text-slate-800" size={16}/>}</td>
//     <td className="px-6 py-5 text-center">{instructor ? <CheckCircle className="inline text-sky-500" size={18}/> : <Slash className="inline text-slate-200 dark:text-slate-800" size={16}/>}</td>
//     <td className="px-6 py-5 text-center">{student ? <CheckCircle className="inline text-sky-500" size={18}/> : <Slash className="inline text-slate-200 dark:text-slate-800" size={16}/>}</td>
//   </tr>
// );

// const TemplateCard = ({ icon, title, type, defaultVal }) => (
//   <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
//     <div className="p-5 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
//       <div className="size-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-sm text-sky-500">
//         {icon}
//       </div>
//       <div>
//         <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{type}</h3>
//         <h4 className="text-base font-bold text-slate-800 dark:text-white uppercase italic">{title}</h4>
//       </div>
//     </div>
//     <div className="p-6 space-y-4">
//       <textarea className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-2xl text-xs font-bold p-4 dark:text-white outline-none focus:ring-1 focus:ring-sky-500" rows="3" defaultValue={defaultVal} />
//       <div className="flex justify-end">
//         <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-500 dark:text-white tracking-widest hover:bg-slate-50">Update</button>
//       </div>
//     </div>
//   </div>
// );

// export default Settings;











import React, { useState } from 'react';
import { 
  MapPin, ShieldCheck, Mail, Save, X, Eye, 
  Smartphone, CheckCircle, Slash, ChevronRight, Bell, Plus, Edit3, Trash2
} from 'lucide-react';

const Settings = () => {
  const [postalCodes, setPostalCodes] = useState(['V6B', 'V7C', 'M5V', 'H2X']);
  const [newCode, setNewCode] = useState('');
  
  // Tax Regions State
  const [taxRegions, setTaxRegions] = useState([
    { id: 1, city: "Burin", province: "NL", taxName: "HST", rate: 0.15 },
    { id: 2, city: "St. John's", province: "NL", taxName: "HST", rate: 0.15 },
    { id: 3, city: "Grand Falls", province: "NL", taxName: "HST", rate: 0.15 },
    { id: 4, city: "Marystown", province: "NL", taxName: "HST", rate: 0.20 }
  ]);

  // Modal State
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);
  const [regionForm, setRegionForm] = useState({ city: '', province: 'NL', taxName: 'HST', rate: 15 });

  const addPostalCode = () => {
    if (newCode && !postalCodes.includes(newCode.toUpperCase())) {
      setPostalCodes([...postalCodes, newCode.toUpperCase()]);
      setNewCode('');
    }
  };

  const removeCode = (code) => {
    setPostalCodes(postalCodes.filter(c => c !== code));
  };

  // --- TAX CRUD LOGIC ---
  const handleSaveRegion = (e) => {
    e.preventDefault();
    const newRegion = {
      ...regionForm,
      id: editingRegion ? editingRegion.id : Date.now(),
      rate: parseFloat(regionForm.rate) / 100
    };

    if (editingRegion) {
      setTaxRegions(taxRegions.map(r => r.id === editingRegion.id ? newRegion : r));
    } else {
      setTaxRegions([...taxRegions, newRegion]);
    }
    
    closeTaxModal();
  };

  const openTaxModal = (region = null) => {
    if (region) {
      setEditingRegion(region);
      setRegionForm({ ...region, rate: region.rate * 100 });
    } else {
      setEditingRegion(null);
      setRegionForm({ city: '', province: 'NL', taxName: 'HST', rate: 15 });
    }
    setShowTaxModal(true);
  };

  const closeTaxModal = () => {
    setShowTaxModal(false);
    setEditingRegion(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
      
      {/* HEADER - Removed Save Button */}
      <header className="h-14 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-[0.7rem] font-medium">Settings</span>
          <ChevronRight size={12} className="text-slate-400" />
          <span className="text-slate-800 dark:text-white font-medium text-[0.7rem] uppercase tracking-wider">Configuration</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6 pb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
              System <span className="text-teal-600">Rules</span>
            </h2>
            <p className="text-[0.65rem] text-slate-500">Manage priority regions, access controls, and automated messaging.</p>
          </div>

          {/* PRIORITY AREA CONFIGURATOR */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center">
                <MapPin size={16} />
              </div>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Priority Areas</h3>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg border border-slate-200 dark:border-slate-700">
                {postalCodes.map((code) => (
                  <div key={code} className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 px-2.5 py-1 rounded-md text-[0.7rem] font-medium border border-teal-200 dark:border-teal-800">
                    {code}
                    <button onClick={() => removeCode(code)} className="hover:text-red-500 transition-colors">
                      <X size={10} />
                    </button>
                  </div>
                ))}
                <input 
                  className="bg-transparent border-none focus:outline-none text-[0.7rem] flex-1 dark:text-slate-200 placeholder:text-slate-400" 
                  placeholder="Add postal code..." 
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addPostalCode()}
                />
              </div>
            </div>
          </section>

          {/* TAX COMPLIANCE SECTION */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-500 flex items-center justify-center font-bold text-sm">$</div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Tax Compliance</h3>
                  <p className="text-[0.55rem] text-slate-400 uppercase tracking-wider">GST/HST Regional Rates</p>
                </div>
              </div>
              <button 
                onClick={() => openTaxModal()}
                className="bg-teal-500 hover:bg-teal-600 text-white p-1.5 rounded-lg transition-all"
              >
                <Plus size={14} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[0.55rem] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                      <th className="pb-2">Region/City</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Rate (%)</th>
                      <th className="pb-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {taxRegions.map((region) => (
                      <tr key={region.id} className="text-[0.7rem] text-slate-700 dark:text-slate-300">
                        <td className="py-3 font-medium">{region.city} ({region.province})</td>
                        <td className="py-3">
                          <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[0.6rem] font-soro">{region.taxName}</span>
                        </td>
                        <td className="py-3">{(region.rate * 100).toFixed(1)}%</td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end gap-1">
                            <button onClick={() => openTaxModal(region)} className="p-1 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded transition-colors">
                              <Edit3 size={12} />
                            </button>
                            <button onClick={() => setTaxRegions(taxRegions.filter(r => r.id !== region.id))} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* PERMISSIONS MATRIX */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center">
                  <ShieldCheck size={16} />
                </div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Permissions Matrix</h3>
              </div>
            </div>
            <div className="overflow-x-auto p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[0.55rem] text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-2">System Capability</th>
                    <th className="pb-2 text-center">Admin</th>
                    <th className="pb-2 text-center">Instructor</th>
                    <th className="pb-2 text-center">Student</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <PermissionRow label="Full View / Edit" admin instructor={false} student={false} />
                  <PermissionRow label="Manage Assigned Students" admin instructor student={false} />
                  <PermissionRow label="Book Lessons & Progress" admin instructor student />
                </tbody>
              </table>
            </div>
          </section>

          {/* TEMPLATES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TemplateCard icon={<Mail size={14} />} title="Welcome" type="Email Template" defaultVal="Hi {student_name}, welcome to Terra Nova!" />
            <TemplateCard icon={<Smartphone size={14} />} title="Reminder" type="SMS Notification" defaultVal="Reminder: Hi {student_name}, lesson tomorrow at {time}." />
          </div>
        </div>
      </main>

      {/* TAX MODAL */}
      {showTaxModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-semibold text-slate-800 dark:text-white">
                {editingRegion ? 'Edit Region' : 'Add New Region'}
              </h3>
              <p className="text-[0.6rem] text-slate-500 mt-0.5">Configure local tax rates</p>
            </div>
            <form onSubmit={handleSaveRegion} className="p-5 space-y-4">
              <div>
                <label className="block text-[0.6rem] font-semibold text-slate-500 mb-1">City Name</label>
                <input required value={regionForm.city} onChange={(e) => setRegionForm({...regionForm, city: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none text-[0.75rem] dark:text-slate-200" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.6rem] font-semibold text-slate-500 mb-1">Tax Name</label>
                  <input required value={regionForm.taxName} onChange={(e) => setRegionForm({...regionForm, taxName: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none text-[0.75rem] dark:text-slate-200" />
                </div>
                <div>
                  <label className="block text-[0.6rem] font-semibold text-slate-500 mb-1">Rate (%)</label>
                  <input type="number" step="0.1" required value={regionForm.rate} onChange={(e) => setRegionForm({...regionForm, rate: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 outline-none text-[0.75rem] dark:text-slate-200" />
                </div>
              </div>
              <div className="flex gap-3 pt-3">
                <button type="button" onClick={closeTaxModal} className="flex-1 px-3 py-2 text-[0.7rem] font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-3 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all">Save Region</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPER COMPONENTS ---

const PermissionRow = ({ label, admin, instructor, student }) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
    <td className="py-3 text-[0.7rem] font-medium text-slate-700 dark:text-slate-300">{label}</td>
    <td className="py-3 text-center">{admin ? <CheckCircle className="inline text-teal-500" size={14} /> : <Slash className="inline text-slate-300 dark:text-slate-600" size={12} />}</td>
    <td className="py-3 text-center">{instructor ? <CheckCircle className="inline text-teal-500" size={14} /> : <Slash className="inline text-slate-300 dark:text-slate-600" size={12} />}</td>
    <td className="py-3 text-center">{student ? <CheckCircle className="inline text-teal-500" size={14} /> : <Slash className="inline text-slate-300 dark:text-slate-600" size={12} />}</td>
  </tr>
);

const TemplateCard = ({ icon, title, type, defaultVal }) => (
  <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
    <div className="p-4 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 text-teal-500">
        {icon}
      </div>
      <div>
        <h3 className="text-[0.55rem] font-semibold text-slate-400 uppercase tracking-wider">{type}</h3>
        <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{title}</h4>
      </div>
    </div>
    <div className="p-4 space-y-3">
      <textarea className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-[0.7rem] font-medium p-3 dark:text-slate-200 outline-none focus:ring-1 focus:ring-teal-500 resize-none" rows="3" defaultValue={defaultVal} />
      <div className="flex justify-end">
        <button className="px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.65rem] font-medium transition-all">Update Template</button>
      </div>
    </div>
  </div>
);

export default Settings;