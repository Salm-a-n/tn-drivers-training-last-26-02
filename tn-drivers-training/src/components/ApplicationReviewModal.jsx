// import React, { useState } from 'react';
// import { X, Printer, CheckCircle, Loader2 } from 'lucide-react';

// const ApplicationReviewModal = ({ onClose, onRefresh }) => {
//     const [loading, setLoading] = useState(false);
//     const [submitting, setSubmitting] = useState(false);
    
//     // Dummy student data
//     const [data] = useState({
//         user: {
//             name: 'John Smith',
//             email: 'john.smith@email.com',
//             phone: '(709) 555-0123'
//         },
//         package: {
//             package_name: 'Standard Driving Package'
//         },
//         street_address: '123 Main Street',
//         appartment: 'Apt 4B',
//         city: 'St. John\'s',
//         province_text: 'Newfoundland and Labrador',
//         postal_code: 'A1B 2C3',
//         parent_name: 'Robert Smith',
//         permit_number: 'P1234567',
//         permit_issue_date: '2024-01-15',
//         experience: '2 years driving experience',
//         has_foreign_license: true,
//         foreign_license_number: 'FOREIGN12345',
//         foreign_street_address: '456 Park Avenue',
//         foreign_appartment: '12C',
//         foreign_city: 'London',
//         foreign_state: 'Greater London',
//         foreign_postal_code: 'SW1A 1AA',
//         foreign_country: 'United Kingdom'
//     });

//     // Dummy onboarding data
//     const [onboarding] = useState({
//         packages: [
//             { id: 1, package_name: 'Basic Package', amount: 450 },
//             { id: 2, package_name: 'Standard Package', amount: 650 },
//             { id: 3, package_name: 'Premium Package', amount: 850 },
//             { id: 4, package_name: 'Full G License Bundle', amount: 1200 }
//         ],
//         instructors: [
//             { id: 1, name: 'Marc-André LeBlanc' },
//             { id: 2, name: 'Sarah Chen' },
//             { id: 3, name: 'David Miller' },
//             { id: 4, name: 'Patricia Walsh' }
//         ]
//     });

//     const [selectedPackage, setSelectedPackage] = useState('');
//     const [selectedInstructor, setSelectedInstructor] = useState('');

//     const handleActivate = async () => {
//         setSubmitting(true);
        
//         // Simulate API call
//         setTimeout(() => {
//             alert("Student activated! Notifications sent.");
//             if (onRefresh) onRefresh();
//             if (onClose) onClose();
//             setSubmitting(false);
//         }, 1500);
//     };

//     const handlePrint = () => {
//         window.print();
//     };

//     const handleClose = () => {
//         if (onClose) {
//             onClose();
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4">
//             <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                
//                 {/* Header - Hidden on Print */}
//                 <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-900 print:hidden">
//                     <div>
//                         <h2 className="text-xl font-bold dark:text-white">Application Review</h2>
//                         <p className="text-xs text-slate-500">Verify details and assign instructor</p>
//                     </div>
//                     <div className="flex gap-2">
//                         <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl hover:bg-slate-200 transition-colors">
//                             <Printer size={18} /> Print
//                         </button>
//                         <button onClick={handleClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
//                             <X size={24} />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-8">
//                     {loading ? (
//                         <div className="flex flex-col items-center justify-center py-20 gap-4">
//                             <Loader2 className="animate-spin text-teal" size={40} />
//                             <p className="text-slate-500 animate-pulse">Fetching complete profile...</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-8">
//                             {/* PRINTABLE AREA STARTS HERE */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-10" id="printable-area">
                                
//                                 {/* SECTION 1: PERSONAL PROFILE */}
//                                 <section>
//                                     <h3 className="text-[10px] font-black text-teal uppercase tracking-[0.2em] mb-4">Personal Profile</h3>
//                                     <div className="space-y-3 text-sm">
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Full Name</span> 
//                                             <span className="font-semibold dark:text-white">{data.user.name}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Email</span> 
//                                             <span className="font-semibold dark:text-white">{data.user.email}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Phone</span> 
//                                             <span className="font-semibold dark:text-white">{data.user.phone}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Street Address</span> 
//                                             <span className="font-semibold dark:text-white">{data.street_address}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Apartment</span> 
//                                             <span className="font-semibold dark:text-white">{data.appartment || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">City</span> 
//                                             <span className="font-semibold dark:text-white">{data.city}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Location</span> 
//                                             <span className="font-semibold dark:text-white">{data.province_text}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Postal Code</span> 
//                                             <span className="font-semibold dark:text-white">{data.postal_code}</span>
//                                         </p>
//                                     </div>
//                                 </section>

//                                 {/* SECTION 2: REGISTRATION DETAILS */}
//                                 <section>
//                                     <h3 className="text-[10px] font-black text-teal uppercase tracking-[0.2em] mb-4">Registration Details</h3>
//                                     <div className="space-y-3 text-sm">
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Applied Package</span> 
//                                             <span className="font-semibold text-amber-600">{data.package.package_name}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Parent Name</span> 
//                                             <span className="font-semibold dark:text-white">{data.parent_name || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Permit Number</span> 
//                                             <span className="font-semibold dark:text-white font-mono">{data.permit_number || 'NOT PROVIDED'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Issue Date</span> 
//                                             <span className="font-semibold dark:text-white">{data.permit_issue_date || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Experience</span> 
//                                             <span className="font-semibold dark:text-white">{data.experience || 'Beginner'}</span>
//                                         </p>
//                                     </div>
//                                 </section>

//                                 {/* SECTION 3: FOREIGN LICENCE */}
//                                 <section className="md:col-span-2">
//                                     <h3 className="text-[10px] font-black text-teal uppercase tracking-[0.2em] mb-4">Foreign Licence Profile</h3>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm">
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Has Foreign Licence?</span> 
//                                             <span className={`font-bold ${data.has_foreign_license ? 'text-emerald-500' : 'text-slate-400'}`}>
//                                                 {data.has_foreign_license ? 'YES' : 'NO'}
//                                             </span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Licence Number</span> 
//                                             <span className="font-semibold dark:text-white">{data.foreign_license_number || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Street Address</span> 
//                                             <span className="font-semibold dark:text-white">{data.foreign_street_address || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Apartment/Suite</span> 
//                                             <span className="font-semibold dark:text-white">{data.foreign_appartment || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">City</span> 
//                                             <span className="font-semibold dark:text-white">{data.foreign_city || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">State/Province</span> 
//                                             <span className="font-semibold dark:text-white">{data.foreign_state || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Postal Code</span> 
//                                             <span className="font-semibold dark:text-white">{data.foreign_postal_code || 'N/A'}</span>
//                                         </p>
//                                         <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
//                                             <span className="text-slate-400">Country</span> 
//                                             <span className="font-semibold dark:text-white">{data.foreign_country || 'N/A'}</span>
//                                         </p>
//                                     </div>
//                                 </section>
//                             </div>

//                             {/* ACTIVATION PANEL - Hidden on Print */}
//                             <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-gray-700 print:hidden">
//                                 <h3 className="text-sm font-bold mb-4 flex items-center gap-2 dark:text-white">
//                                     <CheckCircle size={18} className="text-teal" /> Final Approval & Assignment
//                                 </h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="space-y-1">
//                                         <label className="text-[10px] font-bold text-slate-400 uppercase">Package Selection</label>
//                                         <select 
//                                             className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal dark:text-white"
//                                             value={selectedPackage}
//                                             onChange={(e) => setSelectedPackage(e.target.value)}
//                                         >
//                                             <option value="">Select Package...</option>
//                                             {onboarding.packages.map(pkg => (
//                                                 <option key={pkg.id} value={pkg.id}>{pkg.package_name} (${pkg.amount})</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="space-y-1">
//                                         <label className="text-[10px] font-bold text-slate-400 uppercase">Assign Instructor</label>
//                                         <select 
//                                             className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal dark:text-white"
//                                             value={selectedInstructor}
//                                             onChange={(e) => setSelectedInstructor(e.target.value)}
//                                         >
//                                             <option value="">Select Instructor...</option>
//                                             {onboarding.instructors.map(ins => (
//                                                 <option key={ins.id} value={ins.id}>{ins.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <button 
//                                     onClick={handleActivate}
//                                     disabled={submitting || !selectedInstructor || !selectedPackage}
//                                     className="w-full mt-6 py-4 bg-teal hover:bg-[#007373] text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal/20"
//                                 >
//                                     {submitting ? "Processing Enrolment..." : "Confirm & Activate Student Account"}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <style>{`
//                 @media print {
//                     body * { visibility: hidden; }
//                     #printable-area, #printable-area * { visibility: visible; }
//                     #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ApplicationReviewModal;
















// import React, { useState } from 'react';
// import { X, CheckCircle, Loader2 } from 'lucide-react';

// const ApplicationReviewModal = ({ onClose, onRefresh }) => {
//     const [loading, setLoading] = useState(false);
//     const [submitting, setSubmitting] = useState(false);
    
//     // Dummy student data
//     const [data] = useState({
//         user: {
//             name: 'John Smith',
//             email: 'john.smith@email.com',
//             phone: '(709) 555-0123'
//         },
//         package: {
//             package_name: 'Standard Driving Package'
//         },
//         street_address: '123 Main Street',
//         appartment: 'Apt 4B',
//         city: 'St. John\'s',
//         province_text: 'Newfoundland and Labrador',
//         postal_code: 'A1B 2C3',
//         parent_name: 'Robert Smith',
//         permit_number: 'P1234567',
//         permit_issue_date: '2024-01-15',
//         experience: '2 years driving experience',
//         has_foreign_license: true,
//         foreign_license_number: 'FOREIGN12345',
//         foreign_street_address: '456 Park Avenue',
//         foreign_appartment: '12C',
//         foreign_city: 'London',
//         foreign_state: 'Greater London',
//         foreign_postal_code: 'SW1A 1AA',
//         foreign_country: 'United Kingdom'
//     });

//     // Dummy onboarding data
//     const [onboarding] = useState({
//         packages: [
//             { id: 1, package_name: 'Basic Package', amount: 450 },
//             { id: 2, package_name: 'Standard Package', amount: 650 },
//             { id: 3, package_name: 'Premium Package', amount: 850 },
//             { id: 4, package_name: 'Full G License Bundle', amount: 1200 }
//         ],
//         instructors: [
//             { id: 1, name: 'Marc-André LeBlanc' },
//             { id: 2, name: 'Sarah Chen' },
//             { id: 3, name: 'David Miller' },
//             { id: 4, name: 'Patricia Walsh' }
//         ]
//     });

//     const [selectedPackage, setSelectedPackage] = useState('');
//     const [selectedInstructor, setSelectedInstructor] = useState('');

//     const handleActivate = async () => {
//         setSubmitting(true);
        
//         // Simulate API call
//         setTimeout(() => {
//             alert("Student activated! Notifications sent.");
//             if (onRefresh) onRefresh();
//             if (onClose) onClose();
//             setSubmitting(false);
//         }, 1500);
//     };

//     const handleClose = () => {
//         if (onClose) {
//             onClose();
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//             <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                
//                 {/* Header */}
//                 <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
//                     <div>
//                         <h2 className="text-base font-semibold tracking-tight text-slate-800 dark:text-white">
//                             Application Review
//                         </h2>
//                         <p className="text-[0.8rem] font-mono text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
//                             Verify details and assign instructor
//                         </p>
//                     </div>
//                     <button 
//                         onClick={handleClose} 
//                         className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-800 transition-all"
//                     >
//                         <X size={14} />
//                     </button>
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-6">
//                     {loading ? (
//                         <div className="flex flex-col items-center justify-center py-20 gap-3">
//                             <Loader2 className="animate-spin text-teal-500" size={32} />
//                             <p className="text-[0.7rem] font-mono text-slate-500">Fetching complete profile...</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-6">
//                             {/* PRINTABLE AREA STARTS HERE */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="printable-area">
                                
//                                 {/* SECTION 1: PERSONAL PROFILE */}
//                                 <section>
//                                     <h3 className="text-[1 rem] font-sora font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
//                                         Personal Profile
//                                     </h3>
//                                     <div className="space-y-2 text-sm">
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Full Name</span> 
//                                             <span className="text-[0.9rem] font-medium text-slate-800 dark:text-slate-200">{data.user.name}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Email</span> 
//                                             <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.user.email}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Phone</span> 
//                                             <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.user.phone}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Street Address</span> 
//                                             <span className="text-[0.9rem] font-medium text-slate-800 dark:text-slate-200">{data.street_address}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Apartment</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.appartment || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">City</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.city}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Location</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.province_text}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Postal Code</span> 
//                                             <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.postal_code}</span>
//                                         </div>
//                                     </div>
//                                 </section>

//                                 {/* SECTION 2: REGISTRATION DETAILS */}
//                                 <section>
//                                     <h3 className="text-[1rem] font-sora font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
//                                         Registration Details
//                                     </h3>
//                                     <div className="space-y-2 text-sm">
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Applied Package</span> 
//                                             <span className="text-[0.9rem] font-semibold text-amber-600 dark:text-amber-400">{data.package.package_name}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Parent Name</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.parent_name || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Permit Number</span> 
//                                             <span className="text-[0.9rem] font-mono text-slate-600 dark:text-slate-400">{data.permit_number || 'NOT PROVIDED'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Issue Date</span> 
//                                             <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.permit_issue_date || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Experience</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.experience || 'Beginner'}</span>
//                                         </div>
//                                     </div>
//                                 </section>

//                                 {/* SECTION 3: FOREIGN LICENCE */}
//                                 <section className="md:col-span-2">
//                                     <h3 className="text-[1rem] font-sora font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
//                                         Foreign Licence Profile
//                                     </h3>
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Has Foreign Licence?</span> 
//                                             <span className={`text-[0.9rem] font-mono font-semibold ${data.has_foreign_license ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
//                                                 {data.has_foreign_license ? 'YES' : 'NO'}
//                                             </span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Licence Number</span> 
//                                             <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.foreign_license_number || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Street Address</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_street_address || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Apartment/Suite</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_appartment || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">City</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_city || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">State/Province</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_state || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Postal Code</span> 
//                                             <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.foreign_postal_code || 'N/A'}</span>
//                                         </div>
//                                         <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
//                                             <span className="text-[0.8rem] font-sora text-slate-500">Country</span> 
//                                             <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_country || 'N/A'}</span>
//                                         </div>
//                                     </div>
//                                 </section>
//                             </div>

//                             {/* ACTIVATION PANEL */}
//                             <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
//                                 <h3 className="text-[1rem] font-sora font-semibold mb-3 flex items-center gap-2 text-slate-700 dark:text-slate-300">
//                                     <CheckCircle size={14} className="text-teal-500" /> Final Approval & Assignment
//                                 </h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="space-y-1">
//                                         <label className="text-[1rem] font-sora font-semibold text-slate-500 uppercase tracking-wider">Package Selection</label>
//                                         <select 
//                                             className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-[0.7rem] font-sora outline-none focus:ring-1 focus:ring-teal-500 dark:text-slate-300 transition-all"
//                                             value={selectedPackage}
//                                             onChange={(e) => setSelectedPackage(e.target.value)}
//                                         >
//                                             <option value="">Select Package...</option>
//                                             {onboarding.packages.map(pkg => (
//                                                 <option key={pkg.id} value={pkg.id}>{pkg.package_name} (${pkg.amount})</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="space-y-1">
//                                         <label className="text-[1rem] font-sora font-semibold text-slate-500 uppercase tracking-wider">Assign Instructor</label>
//                                         <select 
//                                             className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-[0.7rem] font-sora outline-none focus:ring-1 focus:ring-teal-500 dark:text-slate-300 transition-all"
//                                             value={selectedInstructor}
//                                             onChange={(e) => setSelectedInstructor(e.target.value)}
//                                         >
//                                             <option value="">Select Instructor...</option>
//                                             {onboarding.instructors.map(ins => (
//                                                 <option key={ins.id} value={ins.id}>{ins.name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <button 
//                                     onClick={handleActivate}
//                                     disabled={submitting || !selectedInstructor || !selectedPackage}
//                                     className="w-full mt-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium text-[0.75rem] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
//                                 >
//                                     {submitting ? (
//                                         <span className="flex items-center justify-center gap-2">
//                                             <Loader2 className="animate-spin" size={14} /> Processing Enrolment...
//                                         </span>
//                                     ) : (
//                                         "Confirm & Activate Student Account"
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <style>{`
//                 @media print {
//                     body * { visibility: hidden; }
//                     #printable-area, #printable-area * { visibility: visible; }
//                     #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; background: white; }
//                 }
//             `}</style>
//         </div>
//     );
// };

// export default ApplicationReviewModal;












//last tested 27-03




import React, { useState } from 'react';
import { X, CheckCircle, Loader2, User, FileText, Globe } from 'lucide-react';

const ApplicationReviewModal = ({ onClose, onRefresh }) => {
    const [loading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    
    // Dummy student data
    const [data] = useState({
        user: {
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '(709) 555-0123'
        },
        package: {
            package_name: 'Standard Driving Package'
        },
        street_address: '123 Main Street',
        appartment: 'Apt 4B',
        city: 'St. John\'s',
        province_text: 'Newfoundland and Labrador',
        postal_code: 'A1B 2C3',
        parent_name: 'Robert Smith',
        permit_number: 'P1234567',
        permit_issue_date: '2024-01-15',
        experience: '2 years driving experience',
        has_foreign_license: true,
        foreign_license_number: 'FOREIGN12345',
        foreign_street_address: '456 Park Avenue',
        foreign_appartment: '12C',
        foreign_city: 'London',
        foreign_state: 'Greater London',
        foreign_postal_code: 'SW1A 1AA',
        foreign_country: 'United Kingdom'
    });

    const [onboarding] = useState({
        packages: [
            { id: 1, package_name: 'Basic Package', amount: 450 },
            { id: 2, package_name: 'Standard Package', amount: 650 },
            { id: 3, package_name: 'Premium Package', amount: 850 },
            { id: 4, package_name: 'Full G License Bundle', amount: 1200 }
        ],
        instructors: [
            { id: 1, name: 'Marc-André LeBlanc' },
            { id: 2, name: 'Sarah Chen' },
            { id: 3, name: 'David Miller' },
            { id: 4, name: 'Patricia Walsh' }
        ]
    });

    const [selectedPackage, setSelectedPackage] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState('');

    const handleActivate = async () => {
        setSubmitting(true);
        setTimeout(() => {
            alert("Student activated!");
            if (onRefresh) onRefresh();
            if (onClose) onClose();
            setSubmitting(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 p-2 sm:p-4 transition-all">
            {/* Increased max-width to 6xl for large screens */}
            <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
                
                {/* Header: Better Spacing & Font */}
                <div className="px-6 py-5 sm:px-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 dark:text-white">
                            Application Review
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Verify student details and assign a professional instructor.
                        </p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-slate-200 dark:border-slate-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 sm:p-10 custom-scrollbar">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <Loader2 className="animate-spin text-teal-500" size={40} />
                            <p className="text-sm font-medium text-slate-500">Retrieving student profile...</p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {/* PRINTABLE AREA: Large gap-12 for 1920px clarity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16" id="printable-area">
                                
                                {/* SECTION 1: PERSONAL PROFILE */}
                                <section>
                                    <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                                        <User size={16} /> Personal Profile
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Full Name', value: data.user.name },
                                            { label: 'Email Address', value: data.user.email, mono: true },
                                            { label: 'Phone Number', value: data.user.phone, mono: true },
                                            { label: 'Street Address', value: data.street_address },
                                            { label: 'Apartment', value: data.appartment || 'N/A' },
                                            { label: 'City', value: data.city },
                                            { label: 'Province', value: data.province_text },
                                            { label: 'Postal Code', value: data.postal_code, mono: true },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 pb-3">
                                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</span> 
                                                <span className={`text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 ${item.mono ? 'font-mono' : ''}`}>
                                                    {item.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* SECTION 2: REGISTRATION DETAILS */}
                                <section>
                                    <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                                        <FileText size={16} /> Registration Details
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/20 mb-4 flex justify-between items-center">
                                            <span className="text-sm font-bold text-amber-800 dark:text-amber-400">Applied Package</span>
                                            <span className="text-base font-bold text-amber-600">{data.package.package_name}</span>
                                        </div>
                                        {[
                                            { label: 'Parent/Guardian', value: data.parent_name || 'N/A' },
                                            { label: 'Permit Number', value: data.permit_number || 'NOT PROVIDED', mono: true },
                                            { label: 'Issue Date', value: data.permit_issue_date || 'N/A' },
                                            { label: 'Experience Level', value: data.experience || 'Beginner' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/50 pb-3">
                                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</span> 
                                                <span className={`text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 ${item.mono ? 'font-mono' : ''}`}>
                                                    {item.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* SECTION 3: FOREIGN LICENCE (Full Width on Desktop) */}
                                <section className="lg:col-span-2 pt-4">
                                    <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                                        <Globe size={16} /> Foreign Licence Profile
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                                        {[
                                            { label: 'Has Foreign Licence?', value: data.has_foreign_license ? 'YES' : 'NO', highlight: true },
                                            { label: 'Licence Number', value: data.foreign_license_number, mono: true },
                                            { label: 'Country', value: data.foreign_country },
                                            { label: 'Address', value: data.foreign_street_address },
                                            { label: 'City/State', value: `${data.foreign_city}, ${data.foreign_state}` },
                                            { label: 'Postal Code', value: data.foreign_postal_code, mono: true },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex flex-col border-b border-slate-100 dark:border-slate-800/50 pb-3">
                                                <span className="text-xs font-bold text-slate-400 uppercase mb-1">{item.label}</span> 
                                                <span className={`text-sm sm:text-base font-semibold ${item.highlight ? 'text-emerald-600' : 'text-slate-800 dark:text-slate-200'}`}>
                                                    {item.value || '—'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* ACTIVATION PANEL: More prominent spacing */}
                            <div className="bg-slate-50 dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 mt-10 shadow-inner">
                                <h3 className="text-base sm:text-lg font-bold mb-6 flex items-center gap-3 text-slate-800 dark:text-slate-200">
                                    <CheckCircle size={20} className="text-teal-500" /> Final Approval & Instructor Assignment
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">Confirm Package</label>
                                        <select 
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:text-slate-200 transition-all shadow-sm"
                                            value={selectedPackage}
                                            onChange={(e) => setSelectedPackage(e.target.value)}
                                        >
                                            <option value="">Select Package...</option>
                                            {onboarding.packages.map(pkg => (
                                                <option key={pkg.id} value={pkg.id}>{pkg.package_name} (${pkg.amount})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase ml-1">Assign Professional Instructor</label>
                                        <select 
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:text-slate-200 transition-all shadow-sm"
                                            value={selectedInstructor}
                                            onChange={(e) => setSelectedInstructor(e.target.value)}
                                        >
                                            <option value="">Select Instructor...</option>
                                            {onboarding.instructors.map(ins => (
                                                <option key={ins.id} value={ins.id}>{ins.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleActivate}
                                    disabled={submitting || !selectedInstructor || !selectedPackage}
                                    className="w-full mt-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm sm:text-base transition-all disabled:opacity-40 disabled:grayscale shadow-lg shadow-teal-500/20"
                                >
                                    {submitting ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <Loader2 className="animate-spin" size={20} /> Finalizing Enrollment...
                                        </span>
                                    ) : (
                                        "Activate Student Account & Send Credentials"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
                
                @media print {
                    body * { visibility: hidden; }
                    #printable-area, #printable-area * { visibility: visible; }
                    #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 40px; background: white; }
                }
            `}</style>
        </div>
    );
};

export default ApplicationReviewModal;