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
















import React, { useState } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';

const ApplicationReviewModal = ({ onClose, onRefresh }) => {
    const [loading, setLoading] = useState(false);
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

    // Dummy onboarding data
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
        
        // Simulate API call
        setTimeout(() => {
            alert("Student activated! Notifications sent.");
            if (onRefresh) onRefresh();
            if (onClose) onClose();
            setSubmitting(false);
        }, 1500);
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
                    <div>
                        <h2 className="text-base font-semibold tracking-tight text-slate-800 dark:text-white">
                            Application Review
                        </h2>
                        <p className="text-[0.8rem] font-mono text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
                            Verify details and assign instructor
                        </p>
                    </div>
                    <button 
                        onClick={handleClose} 
                        className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-800 transition-all"
                    >
                        <X size={14} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <Loader2 className="animate-spin text-teal-500" size={32} />
                            <p className="text-[0.7rem] font-mono text-slate-500">Fetching complete profile...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* PRINTABLE AREA STARTS HERE */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="printable-area">
                                
                                {/* SECTION 1: PERSONAL PROFILE */}
                                <section>
                                    <h3 className="text-[1 rem] font-sora font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
                                        Personal Profile
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Full Name</span> 
                                            <span className="text-[0.9rem] font-medium text-slate-800 dark:text-slate-200">{data.user.name}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Email</span> 
                                            <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.user.email}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Phone</span> 
                                            <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.user.phone}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Street Address</span> 
                                            <span className="text-[0.9rem] font-medium text-slate-800 dark:text-slate-200">{data.street_address}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Apartment</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.appartment || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">City</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.city}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Location</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.province_text}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Postal Code</span> 
                                            <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.postal_code}</span>
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION 2: REGISTRATION DETAILS */}
                                <section>
                                    <h3 className="text-[1rem] font-sora font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
                                        Registration Details
                                    </h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Applied Package</span> 
                                            <span className="text-[0.9rem] font-semibold text-amber-600 dark:text-amber-400">{data.package.package_name}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Parent Name</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.parent_name || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Permit Number</span> 
                                            <span className="text-[0.9rem] font-mono text-slate-600 dark:text-slate-400">{data.permit_number || 'NOT PROVIDED'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Issue Date</span> 
                                            <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.permit_issue_date || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Experience</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.experience || 'Beginner'}</span>
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION 3: FOREIGN LICENCE */}
                                <section className="md:col-span-2">
                                    <h3 className="text-[1rem] font-sora font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
                                        Foreign Licence Profile
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Has Foreign Licence?</span> 
                                            <span className={`text-[0.9rem] font-mono font-semibold ${data.has_foreign_license ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                                                {data.has_foreign_license ? 'YES' : 'NO'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Licence Number</span> 
                                            <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.foreign_license_number || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Street Address</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_street_address || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Apartment/Suite</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_appartment || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">City</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_city || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">State/Province</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_state || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Postal Code</span> 
                                            <span className="text-[0.9rem] font-mono text-slate-700 dark:text-slate-300">{data.foreign_postal_code || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between items-baseline border-b border-slate-100 dark:border-slate-800 pb-2">
                                            <span className="text-[0.8rem] font-sora text-slate-500">Country</span> 
                                            <span className="text-[0.9rem] text-slate-700 dark:text-slate-300">{data.foreign_country || 'N/A'}</span>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* ACTIVATION PANEL */}
                            <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-lg border border-slate-200 dark:border-slate-700">
                                <h3 className="text-[1rem] font-sora font-semibold mb-3 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                    <CheckCircle size={14} className="text-teal-500" /> Final Approval & Assignment
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[1rem] font-sora font-semibold text-slate-500 uppercase tracking-wider">Package Selection</label>
                                        <select 
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-[0.7rem] font-sora outline-none focus:ring-1 focus:ring-teal-500 dark:text-slate-300 transition-all"
                                            value={selectedPackage}
                                            onChange={(e) => setSelectedPackage(e.target.value)}
                                        >
                                            <option value="">Select Package...</option>
                                            {onboarding.packages.map(pkg => (
                                                <option key={pkg.id} value={pkg.id}>{pkg.package_name} (${pkg.amount})</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[1rem] font-sora font-semibold text-slate-500 uppercase tracking-wider">Assign Instructor</label>
                                        <select 
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg text-[0.7rem] font-sora outline-none focus:ring-1 focus:ring-teal-500 dark:text-slate-300 transition-all"
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
                                    className="w-full mt-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium text-[0.75rem] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                    {submitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="animate-spin" size={14} /> Processing Enrolment...
                                        </span>
                                    ) : (
                                        "Confirm & Activate Student Account"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <style>{`
                @media print {
                    body * { visibility: hidden; }
                    #printable-area, #printable-area * { visibility: visible; }
                    #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; background: white; }
                }
            `}</style>
        </div>
    );
};

export default ApplicationReviewModal;