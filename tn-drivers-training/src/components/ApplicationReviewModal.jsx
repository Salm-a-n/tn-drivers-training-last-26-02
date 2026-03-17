import React, { useState } from 'react';
import { X, Printer, CheckCircle, Loader2 } from 'lucide-react';

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

    const handlePrint = () => {
        window.print();
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                
                {/* Header - Hidden on Print */}
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-900 print:hidden">
                    <div>
                        <h2 className="text-xl font-bold dark:text-white">Application Review</h2>
                        <p className="text-xs text-slate-500">Verify details and assign instructor</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl hover:bg-slate-200 transition-colors">
                            <Printer size={18} /> Print
                        </button>
                        <button onClick={handleClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-teal" size={40} />
                            <p className="text-slate-500 animate-pulse">Fetching complete profile...</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* PRINTABLE AREA STARTS HERE */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10" id="printable-area">
                                
                                {/* SECTION 1: PERSONAL PROFILE */}
                                <section>
                                    <h3 className="text-[10px] font-black text-teal uppercase tracking-[0.2em] mb-4">Personal Profile</h3>
                                    <div className="space-y-3 text-sm">
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Full Name</span> 
                                            <span className="font-semibold dark:text-white">{data.user.name}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Email</span> 
                                            <span className="font-semibold dark:text-white">{data.user.email}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Phone</span> 
                                            <span className="font-semibold dark:text-white">{data.user.phone}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Street Address</span> 
                                            <span className="font-semibold dark:text-white">{data.street_address}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Apartment</span> 
                                            <span className="font-semibold dark:text-white">{data.appartment || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">City</span> 
                                            <span className="font-semibold dark:text-white">{data.city}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Location</span> 
                                            <span className="font-semibold dark:text-white">{data.province_text}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Postal Code</span> 
                                            <span className="font-semibold dark:text-white">{data.postal_code}</span>
                                        </p>
                                    </div>
                                </section>

                                {/* SECTION 2: REGISTRATION DETAILS */}
                                <section>
                                    <h3 className="text-[10px] font-black text-teal uppercase tracking-[0.2em] mb-4">Registration Details</h3>
                                    <div className="space-y-3 text-sm">
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Applied Package</span> 
                                            <span className="font-semibold text-amber-600">{data.package.package_name}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Parent Name</span> 
                                            <span className="font-semibold dark:text-white">{data.parent_name || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Permit Number</span> 
                                            <span className="font-semibold dark:text-white font-mono">{data.permit_number || 'NOT PROVIDED'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Issue Date</span> 
                                            <span className="font-semibold dark:text-white">{data.permit_issue_date || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Experience</span> 
                                            <span className="font-semibold dark:text-white">{data.experience || 'Beginner'}</span>
                                        </p>
                                    </div>
                                </section>

                                {/* SECTION 3: FOREIGN LICENCE */}
                                <section className="md:col-span-2">
                                    <h3 className="text-[10px] font-black text-teal uppercase tracking-[0.2em] mb-4">Foreign Licence Profile</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm">
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Has Foreign Licence?</span> 
                                            <span className={`font-bold ${data.has_foreign_license ? 'text-emerald-500' : 'text-slate-400'}`}>
                                                {data.has_foreign_license ? 'YES' : 'NO'}
                                            </span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Licence Number</span> 
                                            <span className="font-semibold dark:text-white">{data.foreign_license_number || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Street Address</span> 
                                            <span className="font-semibold dark:text-white">{data.foreign_street_address || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Apartment/Suite</span> 
                                            <span className="font-semibold dark:text-white">{data.foreign_appartment || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">City</span> 
                                            <span className="font-semibold dark:text-white">{data.foreign_city || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">State/Province</span> 
                                            <span className="font-semibold dark:text-white">{data.foreign_state || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Postal Code</span> 
                                            <span className="font-semibold dark:text-white">{data.foreign_postal_code || 'N/A'}</span>
                                        </p>
                                        <p className="flex justify-between border-b border-slate-50 dark:border-gray-800 pb-2">
                                            <span className="text-slate-400">Country</span> 
                                            <span className="font-semibold dark:text-white">{data.foreign_country || 'N/A'}</span>
                                        </p>
                                    </div>
                                </section>
                            </div>

                            {/* ACTIVATION PANEL - Hidden on Print */}
                            <div className="bg-slate-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-gray-700 print:hidden">
                                <h3 className="text-sm font-bold mb-4 flex items-center gap-2 dark:text-white">
                                    <CheckCircle size={18} className="text-teal" /> Final Approval & Assignment
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase">Package Selection</label>
                                        <select 
                                            className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal dark:text-white"
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
                                        <label className="text-[10px] font-bold text-slate-400 uppercase">Assign Instructor</label>
                                        <select 
                                            className="w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal dark:text-white"
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
                                    className="w-full mt-6 py-4 bg-teal hover:bg-[#007373] text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal/20"
                                >
                                    {submitting ? "Processing Enrolment..." : "Confirm & Activate Student Account"}
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
                    #printable-area { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
                }
            `}</style>
        </div>
    );
};

export default ApplicationReviewModal;