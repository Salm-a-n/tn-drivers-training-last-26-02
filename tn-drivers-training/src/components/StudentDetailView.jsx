// import React, { useState, useEffect } from "react";
// import { 
//   Mail, Loader2, Calendar, Clock, 
//   CreditCard, Award, User, ShieldCheck, 
//   AlertCircle, PlusCircle, Check, DollarSign,
//   MapPin, Phone, BookOpen, Hash, FileText,
//   CalendarIcon, UserCircle, Download, Edit, Trash2, MessageCircle, X, Save
// } from "lucide-react";

// export default function StudentDetailView({ studentId, onClose }) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [scheduleTab, setScheduleTab] = useState("attendance");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editFormData, setEditFormData] = useState({});

//   // Payment Form State
//   const [payLoading, setPayLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     amount_total: "",
//     payment_method: "Cash",
//     transaction_id: "", 
//     status: "succeeded",
//   });

//   // Dummy student data
//   const dummyStudentData = {
//     id: studentId || 1,
//     name: "John Smith",
//     email: "john.smith@email.com",
//     phone: "(709) 555-0123",
//     status: "active",
//     isActive: true,
//     profile_picture: null,
//     permit_number: "P1234567",
//     location: "St. John's",
//     locationName: "St. John's",
//     province: "NL",
//     packageName: "Full G License Bundle",
//     packageAmount: 1200,
//     totalPackageAmount: "1200.00",
//     totalPaid: "450.00",
//     balanceCAD: "750.00",
//     paymentStatus: "Balance Due",
//     hoursLogged: 8,
//     totalHours: 20,
//     instructor: "Marc-André LeBlanc",
//     instructorName: "Marc-André LeBlanc",
//     instructorEmail: "marc.leblanc@terranova.com",
//     instructorPhone: "(709) 555-9876",
//     licenseClass: "Class 5",
    
//     street_address: "123 Main Street",
//     appartment: "Apt 4B",
//     city: "St. John's",
//     postal_code: "A1B 2C3",
//     state: "NL",
//     country: "Canada",
//     parent_name: "Robert Smith",
//     parent_email: "robert.smith@email.com",
//     parent_phone: "(709) 555-4567",
//     experience: "2 years driving experience",
//     additional_notes: "Student prefers evening lessons",
    
//     has_foreign_license: true,
//     foreign_license_number: "FOREIGN12345",
//     foreign_street_address: "456 Park Avenue",
//     foreign_appartment: "12C",
//     foreign_city: "London",
//     foreign_state: "Greater London",
//     foreign_postal_code: "SW1A 1AA",
//     foreign_country: "United Kingdom",

//     attendance: [
//       { date: "2026-03-10", session: "10:00 - 11:30", status: "present" },
//       { date: "2026-03-08", session: "14:00 - 15:30", status: "present" },
//       { date: "2026-03-05", session: "09:00 - 10:30", status: "absent" },
//       { date: "2026-03-03", session: "13:00 - 14:30", status: "present" },
//       { date: "2026-02-28", session: "11:00 - 12:30", status: "present" },
//     ],

//     upcomingSchedules: [
//       { date: "2026-03-17", time: "10:00 - 11:30", sessionType: "Highway Driving", duration: "1.5 hours" },
//       { date: "2026-03-19", time: "14:00 - 15:30", sessionType: "Parallel Parking", duration: "1.5 hours" },
//       { date: "2026-03-22", time: "09:00 - 11:00", sessionType: "Mock Road Test", duration: "2 hours" },
//     ],

//     evaluations: [
//       { 
//         id: 1, 
//         category: "Basic Control", 
//         test_type: "Parking Skills", 
//         score: 85, 
//         note: "Good control, needs more practice with parallel parking",
//         student_reply: "I'll practice more this week",
//         date: "Mar 10, 2026",
//         remark_date: "Mar 10, 2026",
//         reply_date: "Mar 11, 2026"
//       },
//       { 
//         id: 2, 
//         category: "Road Skills", 
//         test_type: "City Driving", 
//         score: 78, 
//         note: "Needs to work on shoulder checks and lane changes",
//         student_reply: null,
//         date: "Mar 05, 2026",
//         remark_date: "Mar 05, 2026",
//         reply_date: null
//       },
//       { 
//         id: 3, 
//         category: "Advanced", 
//         test_type: "Highway Merging", 
//         score: 92, 
//         note: "Excellent highway skills, confident merging",
//         student_reply: "Thank you! The highway practice helped a lot",
//         date: "Feb 28, 2026",
//         remark_date: "Feb 28, 2026",
//         reply_date: "Mar 01, 2026"
//       },
//     ],

//     payments: [
//       { date: "Mar 01, 2026", amount: 250.00, method: "E-Transfer", transaction_id: "ET12345678", status: "succeeded" },
//       { date: "Feb 15, 2026", amount: 200.00, method: "Cash", transaction_id: null, status: "succeeded" },
//       { date: "Feb 01, 2026", amount: 450.00, method: "Credit Card", transaction_id: "CC87654321", status: "succeeded" },
//     ]
//   };

//   useEffect(() => {
//     setTimeout(() => {
//       setData(dummyStudentData);
//       setEditFormData({
//         name: dummyStudentData.name,
//         email: dummyStudentData.email,
//         phone: dummyStudentData.phone,
//         street_address: dummyStudentData.street_address,
//         appartment: dummyStudentData.appartment,
//         city: dummyStudentData.city,
//         postal_code: dummyStudentData.postal_code,
//         state: dummyStudentData.state,
//         country: dummyStudentData.country,
//         permit_number: dummyStudentData.permit_number,
//         parent_name: dummyStudentData.parent_name,
//         parent_email: dummyStudentData.parent_email,
//         parent_phone: dummyStudentData.parent_phone,
//         experience: dummyStudentData.experience,
//         additional_notes: dummyStudentData.additional_notes,
//         has_foreign_license: dummyStudentData.has_foreign_license,
//         foreign_license_number: dummyStudentData.foreign_license_number,
//         foreign_street_address: dummyStudentData.foreign_street_address,
//         foreign_appartment: dummyStudentData.foreign_appartment,
//         foreign_city: dummyStudentData.foreign_city,
//         foreign_state: dummyStudentData.foreign_state,
//         foreign_postal_code: dummyStudentData.foreign_postal_code,
//         foreign_country: dummyStudentData.foreign_country,
//       });
//       setLoading(false);
//     }, 1000);
//   }, [studentId]);

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     setPayLoading(true);
    
//     setTimeout(() => {
//       const newPayment = {
//         date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
//         amount: parseFloat(formData.amount_total),
//         method: formData.payment_method,
//         transaction_id: formData.transaction_id || 'MANUAL-' + Math.floor(Math.random() * 10000),
//         status: "succeeded"
//       };
      
//       setData({
//         ...data,
//         payments: [newPayment, ...data.payments],
//         totalPaid: (parseFloat(data.totalPaid) + parseFloat(formData.amount_total)).toFixed(2),
//         balanceCAD: (parseFloat(data.balanceCAD) - parseFloat(formData.amount_total)).toFixed(2),
//         paymentStatus: (parseFloat(data.balanceCAD) - parseFloat(formData.amount_total)) <= 0 ? 'Paid' : 'Balance Due'
//       });
      
//       setFormData({ 
//         amount_total: "", 
//         payment_method: "Cash", 
//         transaction_id: "", 
//         status: "succeeded"
//       });
      
//       setPayLoading(false);
//       alert("Payment recorded successfully!");
//     }, 1000);
//   };

//   const handleBlockToggle = (action) => {
//     if (!confirm(`Are you sure you want to ${action} this student?`)) return;
    
//     setData({
//       ...data,
//       status: action === 'block' ? 'blocked' : 'active',
//       isActive: action === 'unblock'
//     });
//     alert(`Student ${action}ed successfully!`);
//   };

//   const handleEditSubmit = (e) => {
//     e.preventDefault();
//     setData({ ...data, ...editFormData });
//     setIsEditing(false);
//     alert("Student information updated successfully!");
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditFormData({
//       ...editFormData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   if (loading) return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950 backdrop-blur-sm">
//       <div className="text-center">
//         <Loader2 className="animate-spin text-terra-600 dark:text-terra-400 mx-auto mb-4" size={48} />
//         <p className="text-gray-500 dark:text-gray-400 font-mono text-xs tracking-wider">Loading student records...</p>
//       </div>
//     </div>
//   );

//   if (error || !data) return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950 backdrop-blur-sm">
//       <div className="bg-white dark:bg-gray-900 p-12 rounded-3xl text-center max-w-md shadow-xl border border-gray-100 dark:border-gray-800">
//         <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
//         <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{error || "Student not found"}</p>
//         <button onClick={onClose} className="w-full py-3 bg-terra-600 text-white rounded-xl font-semibold text-sm">Return</button>
//       </div>
//     </div>
//   );

//   // Edit Form Modal
//   if (isEditing) {
//     return (
//       <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
//         <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          
//           <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Student Information</h2>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update personal details for {data.name}</p>
//             </div>
//             <button 
//               onClick={() => setIsEditing(false)}
//               className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
//             >
//               <X size={20} className="text-gray-500 dark:text-gray-400" />
//             </button>
//           </div>

//           <form onSubmit={handleEditSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
//               <div className="col-span-2">
//                 <h3 className="text-sm font-semibold text-terra-600 dark:text-terra-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">Personal Information</h3>
//               </div>
              
//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editFormData.name}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200 dark:focus:ring-terra-800"
//                   required
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editFormData.email}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                   required
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={editFormData.phone}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Permit Number</label>
//                 <input
//                   type="text"
//                   name="permit_number"
//                   value={editFormData.permit_number}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="col-span-2 mt-4">
//                 <h3 className="text-sm font-semibold text-terra-600 dark:text-terra-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">Address Information</h3>
//               </div>

//               <div className="space-y-1 md:col-span-2">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Street Address</label>
//                 <input
//                   type="text"
//                   name="street_address"
//                   value={editFormData.street_address}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Apartment/Suite</label>
//                 <input
//                   type="text"
//                   name="appartment"
//                   value={editFormData.appartment}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={editFormData.city}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Postal Code</label>
//                 <input
//                   type="text"
//                   name="postal_code"
//                   value={editFormData.postal_code}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Province/State</label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={editFormData.state}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={editFormData.country}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="col-span-2 mt-4">
//                 <h3 className="text-sm font-semibold text-terra-600 dark:text-terra-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">Parent/Guardian Information</h3>
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Parent Name</label>
//                 <input
//                   type="text"
//                   name="parent_name"
//                   value={editFormData.parent_name}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Parent Email</label>
//                 <input
//                   type="email"
//                   name="parent_email"
//                   value={editFormData.parent_email}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="space-y-1">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Parent Phone</label>
//                 <input
//                   type="tel"
//                   name="parent_phone"
//                   value={editFormData.parent_phone}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>

//               <div className="col-span-2 mt-4">
//                 <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Additional Notes</label>
//                 <textarea
//                   name="additional_notes"
//                   value={editFormData.additional_notes}
//                   onChange={handleInputChange}
//                   rows="2"
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white mt-2 focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(false)}
//                 className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2.5 bg-terra-600 text-white rounded-xl font-semibold text-sm hover:bg-terra-700 transition flex items-center gap-2"
//               >
//                 <Save size={16} /> Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
//       <div className="bg-white dark:bg-gray-900 w-full max-w-6xl min-h-[90vh] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col my-auto">
        
//         <button onClick={onClose} className="absolute top-6 right-6 z-20 w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl flex items-center justify-center transition-all">✕</button>

//         {/* Header with Student Basic Info */}
//         <div className="p-8 md:p-10 border-b border-gray-100 dark:border-gray-800">
//           <div className="flex flex-col lg:flex-row items-center gap-8">
//             <div className="h-28 w-28 rounded-2xl bg-terra-100 dark:bg-terra-900/30 flex items-center justify-center text-4xl font-bold text-terra-600 dark:text-terra-400 shadow-sm border-2 border-terra-200 dark:border-terra-800">
//               {data.name.charAt(0)}
//             </div>
            
//             <div className="flex-1 text-center lg:text-left">
//               <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3">
//                 <span className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${
//                   data.paymentStatus === 'Paid' 
//                     ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
//                     : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
//                 }`}>
//                   {data.paymentStatus}
//                 </span>
//                 <span className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${
//                   data.status === 'active' 
//                     ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
//                     : data.status === 'pending'
//                     ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
//                     : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
//                 }`}>
//                   {data.status}
//                 </span>
//                 <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-200 dark:border-gray-700">
//                   Permit: {data.permit_number || 'N/A'}
//                 </span>
//               </div>
//               <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">{data.name}</h2>
//               <div className="flex flex-wrap justify-center lg:justify-start gap-5 text-gray-500 dark:text-gray-400 text-xs font-mono">
//                 <span className="flex items-center gap-1.5"><Mail size={12}/> {data.email}</span>
//                 <span className="flex items-center gap-1.5"><Phone size={12}/> {data.phone || 'N/A'}</span>
//                 <span className="flex items-center gap-1.5"><MapPin size={12}/> {data.location || 'N/A'}</span>
//               </div>
//             </div>

//             <div className="flex flex-col items-stretch gap-3 min-w-[200px]">
//               <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
//                 <p className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Balance Due</p>
//                 <p className="text-2xl font-bold text-terra-600 dark:text-terra-400">CAD {data.balanceCAD}</p>
//               </div>
              
//               <div className="flex flex-col gap-2">
//                 {data.status === 'active' ? (
//                   <button 
//                     onClick={() => handleBlockToggle('block')}
//                     className="px-4 py-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition flex items-center justify-center gap-2"
//                   >
//                     <ShieldCheck size={14} /> Block Student
//                   </button>
//                 ) : data.status === 'blocked' ? (
//                   <button 
//                     onClick={() => handleBlockToggle('unblock')}
//                     className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition flex items-center justify-center gap-2"
//                   >
//                     <ShieldCheck size={14} /> Unblock Student
//                   </button>
//                 ) : null}

//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
//                 >
//                   <Edit size={14} /> Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Navigation */}
//         <div className="flex px-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 gap-8 overflow-x-auto no-scrollbar">
//           {["Overview", "Attendance & Schedule", "Skill Evaluation", "Payment History"].map((tab) => (
//             <button 
//               key={tab} 
//               onClick={() => setActiveTab(tab)} 
//               className={`py-4 whitespace-nowrap text-sm font-semibold tracking-wide relative transition-all ${
//                 activeTab === tab ? "text-terra-600 dark:text-terra-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-terra-600 dark:bg-terra-500 rounded-full" />}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          
//           {/* OVERVIEW TAB */}
//           {activeTab === "Overview" && (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
//                 <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-terra-600 dark:text-terra-400 uppercase tracking-wider mb-5">
//                   <User size={16}/> Personal Details
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
//                     <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Full Name</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
//                   </div>
//                   <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
//                     <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Email</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{data.email}</p>
//                   </div>
//                   <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
//                     <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Phone</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{data.phone || 'Not provided'}</p>
//                   </div>
//                   <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
//                     <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Location</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{data.location || data.province || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Permit Number</p>
//                     <p className="font-medium text-gray-900 dark:text-white">{data.permit_number || 'Not issued'}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
//                 <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-terra-600 dark:text-terra-400 uppercase tracking-wider mb-5">
//                   <BookOpen size={16}/> Enrollment Details
//                 </h4>
//                 <div className="space-y-3">
//                   <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
//                     <span className="text-xs text-gray-500 dark:text-gray-400">Package</span>
//                     <span className="font-semibold text-gray-900 dark:text-white">{data.packageName || 'Standard Course'}</span>
//                   </div>
//                   <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
//                     <span className="text-xs text-gray-500 dark:text-gray-400">Total Amount</span>
//                     <span className="font-semibold text-terra-600 dark:text-terra-400">CAD {data.totalPackageAmount}</span>
//                   </div>
//                   <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
//                     <span className="text-xs text-gray-500 dark:text-gray-400">Paid</span>
//                     <span className="font-semibold text-emerald-600 dark:text-emerald-400">CAD {data.totalPaid}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
//                     <span className="font-semibold text-gray-900 dark:text-white">{data.hoursLogged} / {data.totalHours} hrs</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-terra-900 dark:bg-terra-950 rounded-2xl p-6 text-white shadow-sm">
//                 <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-terra-300 uppercase tracking-wider mb-5">
//                   <Award size={16}/> Assigned Instructor
//                 </h4>
//                 {data.instructor && data.instructor !== 'Unassigned' ? (
//                   <div>
//                     <p className="text-xl font-semibold mb-1">{data.instructor}</p>
//                     <p className="text-xs text-terra-300 mb-4">Lead Instructor</p>
//                     {data.instructorEmail && (
//                       <div className="flex items-center gap-2 text-xs mb-2"><Mail size={12}/> {data.instructorEmail}</div>
//                     )}
//                     {data.instructorPhone && (
//                       <div className="flex items-center gap-2 text-xs"><Phone size={12}/> {data.instructorPhone}</div>
//                     )}
//                   </div>
//                 ) : (
//                   <p className="text-sm opacity-60">No instructor assigned</p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* ATTENDANCE & SCHEDULE TAB */}
//           {activeTab === "Attendance & Schedule" && (
//             <div className="space-y-6">
//               <div className="flex gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
//                 <button
//                   onClick={() => setScheduleTab('attendance')}
//                   className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
//                     scheduleTab === 'attendance'
//                       ? 'bg-terra-600 text-white'
//                       : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   <Clock size={14} className="inline mr-1.5" />
//                   Attendance History
//                 </button>
//                 <button
//                   onClick={() => setScheduleTab('upcoming')}
//                   className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
//                     scheduleTab === 'upcoming'
//                       ? 'bg-terra-600 text-white'
//                       : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//                   }`}
//                 >
//                   <Calendar size={14} className="inline mr-1.5" />
//                   Upcoming Schedule
//                 </button>
//               </div>

//               {scheduleTab === 'attendance' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {data.attendance?.map((log, i) => (
//                     <div key={i} className="p-5 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 flex justify-between items-center">
//                       <div className="flex items-center gap-3">
//                         <div className={`p-2 rounded-xl ${
//                           log.status === 'present' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-amber-100 dark:bg-amber-900/20'
//                         }`}>
//                           <Clock size={16} className={log.status === 'present' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}/>
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-900 dark:text-white">{log.session || 'Driving Session'}</p>
//                           <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">{log.date}</p>
//                         </div>
//                       </div>
//                       <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-lg ${
//                         log.status === 'present' 
//                           ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
//                           : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
//                       }`}>
//                         {log.status}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {scheduleTab === 'upcoming' && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {data.upcomingSchedules?.map((schedule, i) => (
//                     <div key={i} className="p-5 bg-terra-50 dark:bg-terra-950/30 rounded-2xl border border-terra-100 dark:border-terra-800 flex justify-between items-center">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-terra-100 dark:bg-terra-900/30 rounded-xl"><Calendar size={16} className="text-terra-600 dark:text-terra-400"/></div>
//                         <div>
//                           <p className="font-medium text-gray-900 dark:text-white">{schedule.sessionType || 'Driving Lesson'}</p>
//                           <p className="text-xs text-terra-600 dark:text-terra-400 font-mono">{schedule.date} • {schedule.time}</p>
//                         </div>
//                       </div>
//                       <span className="text-[10px] font-mono font-bold px-3 py-1 bg-terra-100 dark:bg-terra-900/30 text-terra-700 dark:text-terra-400 rounded-lg">
//                         {schedule.duration}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* SKILL EVALUATION TAB */}
//           {activeTab === "Skill Evaluation" && (
//             <div className="space-y-6">
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="bg-terra-50 dark:bg-terra-950/30 p-5 rounded-2xl text-center">
//                   <p className="text-[10px] font-mono text-terra-600 dark:text-terra-400 uppercase tracking-wider">Total Tests</p>
//                   <p className="text-2xl font-bold text-terra-700 dark:text-terra-400">{data.evaluations?.length || 0}</p>
//                 </div>
//                 <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-2xl text-center">
//                   <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Average Score</p>
//                   <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
//                     {data.evaluations?.length > 0 
//                       ? Math.round(data.evaluations.reduce((a, c) => a + c.score, 0) / data.evaluations.length) 
//                       : 0}%
//                   </p>
//                 </div>
//                 <div className="bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl text-center">
//                   <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completed</p>
//                   <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{data.evaluations?.length || 0}</p>
//                 </div>
//               </div>

//               {data.evaluations?.map((item, i) => (
//                 <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
//                   <div className="p-5 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-800">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <span className="text-xs font-mono text-terra-600 dark:text-terra-400 uppercase bg-terra-100 dark:bg-terra-900/30 px-2 py-0.5 rounded">{item.category}</span>
//                         <h4 className="font-semibold text-gray-900 dark:text-white mt-2">{item.test_type}</h4>
//                         <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.date}</p>
//                       </div>
//                       <div className="text-right">
//                         <span className="text-2xl font-bold text-terra-600 dark:text-terra-400">{item.score}</span>
//                         <span className="text-sm text-gray-400 dark:text-gray-500">/100</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="p-5">
//                     <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl">
//                       <p className="text-xs font-mono text-terra-600 dark:text-terra-400 uppercase mb-2">Instructor Feedback</p>
//                       <p className="text-sm text-gray-700 dark:text-gray-300">"{item.note}"</p>
//                     </div>
//                     {item.student_reply && (
//                       <div className="bg-terra-50 dark:bg-terra-950/30 p-4 rounded-xl mt-3">
//                         <p className="text-xs font-mono text-terra-600 dark:text-terra-400 uppercase mb-2">Student Reply</p>
//                         <p className="text-sm text-gray-700 dark:text-gray-300">"{item.student_reply}"</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* PAYMENT HISTORY TAB */}
//           {activeTab === "Payment History" && (
//             <div className="space-y-8">
//               <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
//                 <h4 className="text-xs font-mono font-bold text-terra-600 dark:text-terra-400 uppercase mb-5">Record New Payment</h4>
//                 <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                   <div className="relative">
//                     <input 
//                       type="number" 
//                       step="0.01"
//                       placeholder="Amount" 
//                       className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-terra-400" 
//                       value={formData.amount_total} 
//                       onChange={e => setFormData({...formData, amount_total: e.target.value})} 
//                       required 
//                     />
//                     <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14}/>
//                   </div>
//                   <input 
//                     type="text" 
//                     placeholder="Transaction ID" 
//                     className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-terra-400"
//                     value={formData.transaction_id} 
//                     onChange={e => setFormData({...formData, transaction_id: e.target.value})} 
//                   />
//                   <select 
//                     className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-terra-400"
//                     value={formData.payment_method} 
//                     onChange={e => setFormData({...formData, payment_method: e.target.value})}
//                   >
//                     <option value="Cash">Cash</option>
//                     <option value="E-Transfer">E-Transfer</option>
//                     <option value="Credit Card">Credit Card</option>
//                   </select>
//                   <button 
//                     type="submit" 
//                     disabled={payLoading} 
//                     className="bg-terra-600 text-white font-semibold text-sm rounded-xl py-3 flex justify-center items-center hover:bg-terra-700 transition disabled:opacity-50"
//                   >
//                     {payLoading ? <Loader2 className="animate-spin" size={16} /> : "Record Payment"}
//                   </button>
//                 </form>
//               </div>

//               <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
//                 <table className="w-full text-left">
//                   <thead className="bg-gray-50 dark:bg-gray-800/50">
//                     <tr>
//                       <th className="p-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
//                       <th className="p-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
//                       <th className="p-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
//                       <th className="p-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                     {data.payments?.map((p, i) => (
//                       <tr key={i}>
//                         <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{p.date}</td>
//                         <td className="p-4 font-semibold text-terra-600 dark:text-terra-400">CAD {p.amount}</td>
//                         <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{p.method || 'N/A'}</td>
//                         <td className="p-4">
//                           <span className="px-2 py-1 text-[9px] font-mono font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">succeeded</span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import { 
  Mail, Loader2, Calendar, Clock, 
  CreditCard, Award, User, ShieldCheck, 
  AlertCircle, PlusCircle, Check, DollarSign,
  MapPin, Phone, BookOpen, Hash, FileText,
  CalendarIcon, UserCircle, Download, Edit, Trash2, MessageCircle, X, Save
} from "lucide-react";

export default function StudentDetailView({ studentId, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [scheduleTab, setScheduleTab] = useState("attendance");
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  // Payment Form State
  const [payLoading, setPayLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount_total: "",
    payment_method: "Cash",
    transaction_id: "", 
    status: "succeeded",
  });

  // Dummy student data
  const dummyStudentData = {
    id: studentId || 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(709) 555-0123",
    status: "active",
    isActive: true,
    profile_picture: null,
    permit_number: "P1234567",
    location: "St. John's",
    locationName: "St. John's",
    province: "NL",
    packageName: "Full G License Bundle",
    packageAmount: 1200,
    totalPackageAmount: "1200.00",
    totalPaid: "450.00",
    balanceCAD: "750.00",
    paymentStatus: "Balance Due",
    hoursLogged: 8,
    totalHours: 20,
    instructor: "Marc-André LeBlanc",
    instructorName: "Marc-André LeBlanc",
    instructorEmail: "marc.leblanc@terranova.com",
    instructorPhone: "(709) 555-9876",
    licenseClass: "Class 5",
    
    street_address: "123 Main Street",
    appartment: "Apt 4B",
    city: "St. John's",
    postal_code: "A1B 2C3",
    state: "NL",
    country: "Canada",
    parent_name: "Robert Smith",
    parent_email: "robert.smith@email.com",
    parent_phone: "(709) 555-4567",
    experience: "2 years driving experience",
    additional_notes: "Student prefers evening lessons",
    
    has_foreign_license: true,
    foreign_license_number: "FOREIGN12345",
    foreign_street_address: "456 Park Avenue",
    foreign_appartment: "12C",
    foreign_city: "London",
    foreign_state: "Greater London",
    foreign_postal_code: "SW1A 1AA",
    foreign_country: "United Kingdom",

    attendance: [
      { date: "2026-03-10", session: "10:00 - 11:30", status: "present" },
      { date: "2026-03-08", session: "14:00 - 15:30", status: "present" },
      { date: "2026-03-05", session: "09:00 - 10:30", status: "absent" },
      { date: "2026-03-03", session: "13:00 - 14:30", status: "present" },
      { date: "2026-02-28", session: "11:00 - 12:30", status: "present" },
    ],

    upcomingSchedules: [
      { date: "2026-03-17", time: "10:00 - 11:30", sessionType: "Highway Driving", duration: "1.5 hours" },
      { date: "2026-03-19", time: "14:00 - 15:30", sessionType: "Parallel Parking", duration: "1.5 hours" },
      { date: "2026-03-22", time: "09:00 - 11:00", sessionType: "Mock Road Test", duration: "2 hours" },
    ],

    evaluations: [
      { 
        id: 1, 
        category: "Basic Control", 
        test_type: "Parking Skills", 
        score: 85, 
        note: "Good control, needs more practice with parallel parking",
        student_reply: "I'll practice more this week",
        date: "Mar 10, 2026",
        remark_date: "Mar 10, 2026",
        reply_date: "Mar 11, 2026"
      },
      { 
        id: 2, 
        category: "Road Skills", 
        test_type: "City Driving", 
        score: 78, 
        note: "Needs to work on shoulder checks and lane changes",
        student_reply: null,
        date: "Mar 05, 2026",
        remark_date: "Mar 05, 2026",
        reply_date: null
      },
      { 
        id: 3, 
        category: "Advanced", 
        test_type: "Highway Merging", 
        score: 92, 
        note: "Excellent highway skills, confident merging",
        student_reply: "Thank you! The highway practice helped a lot",
        date: "Feb 28, 2026",
        remark_date: "Feb 28, 2026",
        reply_date: "Mar 01, 2026"
      },
    ],

    payments: [
      { date: "Mar 01, 2026", amount: 250.00, method: "E-Transfer", transaction_id: "ET12345678", status: "succeeded" },
      { date: "Feb 15, 2026", amount: 200.00, method: "Cash", transaction_id: null, status: "succeeded" },
      { date: "Feb 01, 2026", amount: 450.00, method: "Credit Card", transaction_id: "CC87654321", status: "succeeded" },
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setData(dummyStudentData);
      setEditFormData({
        name: dummyStudentData.name,
        email: dummyStudentData.email,
        phone: dummyStudentData.phone,
        street_address: dummyStudentData.street_address,
        appartment: dummyStudentData.appartment,
        city: dummyStudentData.city,
        postal_code: dummyStudentData.postal_code,
        state: dummyStudentData.state,
        country: dummyStudentData.country,
        permit_number: dummyStudentData.permit_number,
        parent_name: dummyStudentData.parent_name,
        parent_email: dummyStudentData.parent_email,
        parent_phone: dummyStudentData.parent_phone,
        experience: dummyStudentData.experience,
        additional_notes: dummyStudentData.additional_notes,
        has_foreign_license: dummyStudentData.has_foreign_license,
        foreign_license_number: dummyStudentData.foreign_license_number,
        foreign_street_address: dummyStudentData.foreign_street_address,
        foreign_appartment: dummyStudentData.foreign_appartment,
        foreign_city: dummyStudentData.foreign_city,
        foreign_state: dummyStudentData.foreign_state,
        foreign_postal_code: dummyStudentData.foreign_postal_code,
        foreign_country: dummyStudentData.foreign_country,
      });
      setLoading(false);
    }, 1000);
  }, [studentId]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setPayLoading(true);
    
    setTimeout(() => {
      const newPayment = {
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amount: parseFloat(formData.amount_total),
        method: formData.payment_method,
        transaction_id: formData.transaction_id || 'MANUAL-' + Math.floor(Math.random() * 10000),
        status: "succeeded"
      };
      
      setData({
        ...data,
        payments: [newPayment, ...data.payments],
        totalPaid: (parseFloat(data.totalPaid) + parseFloat(formData.amount_total)).toFixed(2),
        balanceCAD: (parseFloat(data.balanceCAD) - parseFloat(formData.amount_total)).toFixed(2),
        paymentStatus: (parseFloat(data.balanceCAD) - parseFloat(formData.amount_total)) <= 0 ? 'Paid' : 'Balance Due'
      });
      
      setFormData({ 
        amount_total: "", 
        payment_method: "Cash", 
        transaction_id: "", 
        status: "succeeded"
      });
      
      setPayLoading(false);
      alert("Payment recorded successfully!");
    }, 1000);
  };

  const handleBlockToggle = (action) => {
    if (!confirm(`Are you sure you want to ${action} this student?`)) return;
    
    setData({
      ...data,
      status: action === 'block' ? 'blocked' : 'active',
      isActive: action === 'unblock'
    });
    alert(`Student ${action}ed successfully!`);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, ...editFormData });
    setIsEditing(false);
    alert("Student information updated successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  if (loading) return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 backdrop-blur-sm">
      <div className="text-center">
        <Loader2 className="animate-spin text-teal-600 dark:text-teal-400 mx-auto mb-4" size={48} />
        <p className="text-sm sm:text-base font-mono text-slate-500 dark:text-slate-400 tracking-wider">Loading student records...</p>
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-12 rounded-2xl text-center max-w-md shadow-xl border border-slate-200 dark:border-slate-800">
        <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6">{error || "Student not found"}</p>
        <button onClick={onClose} className="w-full py-3 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition">Return</button>
      </div>
    </div>
  );

  // Edit Form Modal
  if (isEditing) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
          
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Edit Student Information</h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">Update personal details for {data.name}</p>
            </div>
            <button 
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          <form onSubmit={handleEditSubmit} className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              
              <div className="col-span-2">
                <h3 className="text-sm sm:text-base font-semibold text-teal-600 dark:text-teal-400 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">Personal Information</h3>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Permit Number</label>
                <input
                  type="text"
                  name="permit_number"
                  value={editFormData.permit_number}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="col-span-2 mt-2">
                <h3 className="text-sm sm:text-base font-semibold text-teal-600 dark:text-teal-400 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">Address Information</h3>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Street Address</label>
                <input
                  type="text"
                  name="street_address"
                  value={editFormData.street_address}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Apartment/Suite</label>
                <input
                  type="text"
                  name="appartment"
                  value={editFormData.appartment}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">City</label>
                <input
                  type="text"
                  name="city"
                  value={editFormData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Postal Code</label>
                <input
                  type="text"
                  name="postal_code"
                  value={editFormData.postal_code}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Province/State</label>
                <input
                  type="text"
                  name="state"
                  value={editFormData.state}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Country</label>
                <input
                  type="text"
                  name="country"
                  value={editFormData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="col-span-2 mt-2">
                <h3 className="text-sm sm:text-base font-semibold text-teal-600 dark:text-teal-400 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">Parent/Guardian Information</h3>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Parent Name</label>
                <input
                  type="text"
                  name="parent_name"
                  value={editFormData.parent_name}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Parent Email</label>
                <input
                  type="email"
                  name="parent_email"
                  value={editFormData.parent_email}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Parent Phone</label>
                <input
                  type="tel"
                  name="parent_phone"
                  value={editFormData.parent_phone}
                  onChange={handleInputChange}
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>

              <div className="col-span-2 mt-2">
                <label className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase">Additional Notes</label>
                <textarea
                  name="additional_notes"
                  value={editFormData.additional_notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium text-sm sm:text-base text-slate-900 dark:text-white mt-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 sm:px-7 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-sm sm:text-base hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 sm:px-7 py-2.5 bg-teal-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-teal-700 transition flex items-center gap-2"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm p-3 sm:p-4 md:p-8 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl min-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto">
        
        <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-xl flex items-center justify-center transition-all">
          ✕
        </button>

        {/* Header with Student Basic Info */}
        <div className="p-5 sm:p-7 md:p-9 lg:p-10 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col lg:flex-row items-center gap-5 sm:gap-7 md:gap-9">
            <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-2xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-4xl sm:text-5xl font-bold text-teal-600 dark:text-teal-400 shadow-sm border-2 border-teal-200 dark:border-teal-800">
              {data.name.charAt(0)}
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3 sm:mb-4">
                <span className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider border ${
                  data.paymentStatus === 'Paid' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                }`}>
                  {data.paymentStatus}
                </span>
                <span className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider border ${
                  data.status === 'active' 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : data.status === 'pending'
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                    : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                }`}>
                  {data.status}
                </span>
                <span className="px-3 sm:px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-xs sm:text-sm font-mono font-bold uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                  Permit: {data.permit_number || 'N/A'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{data.name}</h2>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 text-slate-500 dark:text-slate-400 text-sm sm:text-base font-mono">
                <span className="flex items-center gap-2"><Mail size={14} /> {data.email}</span>
                <span className="flex items-center gap-2"><Phone size={14} /> {data.phone || 'N/A'}</span>
                <span className="flex items-center gap-2"><MapPin size={14} /> {data.location || 'N/A'}</span>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-3 w-full lg:w-auto min-w-[200px] sm:min-w-[220px]">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                <p className="text-xs sm:text-sm font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Balance Due</p>
                <p className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-400">CAD {data.balanceCAD}</p>
              </div>
              
              <div className="flex flex-row lg:flex-col gap-2">
                {data.status === 'active' ? (
                  <button 
                    onClick={() => handleBlockToggle('block')}
                    className="flex-1 lg:w-full px-4 sm:px-5 py-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm sm:text-base font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={16} /> Block Student
                  </button>
                ) : data.status === 'blocked' ? (
                  <button 
                    onClick={() => handleBlockToggle('unblock')}
                    className="flex-1 lg:w-full px-4 sm:px-5 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm sm:text-base font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={16} /> Unblock Student
                  </button>
                ) : null}

                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 lg:w-full px-4 sm:px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm sm:text-base font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Edit size={16} /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Fixed for mobile scrolling */}
        <div className="relative">
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div className="flex px-5 sm:px-7 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-4 sm:gap-6 md:gap-8 min-w-max">
              {["Overview", "Attendance & Schedule", "Skill Evaluation", "Payment History"].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base font-semibold tracking-wide relative transition-all ${
                    activeTab === tab ? "text-teal-600 dark:text-teal-400" : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-500 rounded-full" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8 overflow-y-auto">
          
          {/* OVERVIEW TAB */}
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="flex items-center gap-2 text-sm sm:text-base font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4 sm:mb-5">
                  <User size={16} /> Personal Details
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="pb-2 sm:pb-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase mb-1">Full Name</p>
                    <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white break-words">{data.name}</p>
                  </div>
                  <div className="pb-2 sm:pb-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase mb-1">Email</p>
                    <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white break-words">{data.email}</p>
                  </div>
                  <div className="pb-2 sm:pb-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase mb-1">Phone</p>
                    <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">{data.phone || 'Not provided'}</p>
                  </div>
                  <div className="pb-2 sm:pb-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase mb-1">Location</p>
                    <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white break-words">{data.location || data.province || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 uppercase mb-1">Permit Number</p>
                    <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">{data.permit_number || 'Not issued'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/30 p-4 sm:p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="flex items-center gap-2 text-sm sm:text-base font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-4 sm:mb-5">
                  <BookOpen size={16} /> Enrollment Details
                </h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap justify-between gap-2 pb-2 sm:pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-sm sm:text-base text-slate-500 dark:text-slate-400">Package</span>
                    <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white text-right break-words">{data.packageName || 'Standard Course'}</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 pb-2 sm:pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-sm sm:text-base text-slate-500 dark:text-slate-400">Total Amount</span>
                    <span className="font-semibold text-sm sm:text-base text-teal-600 dark:text-teal-400">CAD {data.totalPackageAmount}</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 pb-2 sm:pb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-sm sm:text-base text-slate-500 dark:text-slate-400">Paid</span>
                    <span className="font-semibold text-sm sm:text-base text-emerald-600 dark:text-emerald-400">CAD {data.totalPaid}</span>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2">
                    <span className="text-sm sm:text-base text-slate-500 dark:text-slate-400">Progress</span>
                    <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">{data.hoursLogged} / {data.totalHours} hrs</span>
                  </div>
                </div>
              </div>

              <div className="bg-teal-900 dark:bg-teal-950 rounded-2xl p-4 sm:p-5 md:p-6 text-white shadow-sm">
                <h4 className="flex items-center gap-2 text-sm sm:text-base font-mono font-bold text-teal-300 uppercase tracking-wider mb-4 sm:mb-5">
                  <Award size={16} /> Assigned Instructor
                </h4>
                {data.instructor && data.instructor !== 'Unassigned' ? (
                  <div>
                    <p className="text-base sm:text-lg md:text-xl font-semibold mb-1.5 break-words">{data.instructor}</p>
                    <p className="text-sm sm:text-base text-teal-300 mb-3 sm:mb-4">Lead Instructor</p>
                    {data.instructorEmail && (
                      <div className="flex items-center gap-2 text-sm sm:text-base mb-2 break-words"><Mail size={14} className="flex-shrink-0"/> {data.instructorEmail}</div>
                    )}
                    {data.instructorPhone && (
                      <div className="flex items-center gap-2 text-sm sm:text-base break-words"><Phone size={14} className="flex-shrink-0"/> {data.instructorPhone}</div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm sm:text-base opacity-60">No instructor assigned</p>
                )}
              </div>
            </div>
          )}

          {/* ATTENDANCE & SCHEDULE TAB */}
          {activeTab === "Attendance & Schedule" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-wrap gap-2 sm:gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <button
                  onClick={() => setScheduleTab('attendance')}
                  className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    scheduleTab === 'attendance'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Clock size={12} className="inline mr-1 sm:mr-2" />
                  Attendance History
                </button>
                <button
                  onClick={() => setScheduleTab('upcoming')}
                  className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    scheduleTab === 'upcoming'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Calendar size={12} className="inline mr-1 sm:mr-2" />
                  Upcoming Schedule
                </button>
              </div>

              {scheduleTab === 'attendance' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {data.attendance?.map((log, i) => (
                    <div key={i} className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className={`p-1.5 sm:p-2 rounded-xl flex-shrink-0 ${
                          log.status === 'present' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-amber-100 dark:bg-amber-900/20'
                        }`}>
                          <Clock size={14} className={log.status === 'present' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}/>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white truncate">{log.session || 'Driving Session'}</p>
                          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-mono">{log.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs sm:text-sm font-mono font-bold px-2 sm:px-3 py-1 rounded-lg whitespace-nowrap flex-shrink-0 ${
                        log.status === 'present' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                          : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {scheduleTab === 'upcoming' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {data.upcomingSchedules?.map((schedule, i) => (
                    <div key={i} className="p-4 sm:p-5 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-800 flex justify-between items-center gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="p-1.5 sm:p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex-shrink-0"><Calendar size={14} className="text-teal-600 dark:text-teal-400"/></div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white truncate">{schedule.sessionType || 'Driving Lesson'}</p>
                          <p className="text-xs sm:text-sm text-teal-600 dark:text-teal-400 font-mono truncate">{schedule.date} • {schedule.time}</p>
                        </div>
                      </div>
                      <span className="text-xs sm:text-sm font-mono font-bold px-2 sm:px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-lg whitespace-nowrap flex-shrink-0">
                        {schedule.duration}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SKILL EVALUATION TAB */}
          {activeTab === "Skill Evaluation" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-teal-50 dark:bg-teal-950/30 p-4 sm:p-5 rounded-2xl text-center">
                  <p className="text-xs sm:text-sm font-mono text-teal-600 dark:text-teal-400 uppercase tracking-wider">Total Tests</p>
                  <p className="text-2xl sm:text-3xl font-bold text-teal-700 dark:text-teal-400">{data.evaluations?.length || 0}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 sm:p-5 rounded-2xl text-center">
                  <p className="text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Average Score</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                    {data.evaluations?.length > 0 
                      ? Math.round(data.evaluations.reduce((a, c) => a + c.score, 0) / data.evaluations.length) 
                      : 0}%
                  </p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 sm:p-5 rounded-2xl text-center">
                  <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-slate-600 dark:text-slate-400">{data.evaluations?.length || 0}</p>
                </div>
              </div>

              {data.evaluations?.map((item, i) => (
                <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                  <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <span className="text-xs sm:text-sm font-mono text-teal-600 dark:text-teal-400 uppercase bg-teal-100 dark:bg-teal-900/30 px-2 py-1 rounded inline-block">{item.category}</span>
                        <h4 className="font-semibold text-base sm:text-lg text-slate-900 dark:text-white mt-2 break-words">{item.test_type}</h4>
                        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1">{item.date}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-2xl sm:text-3xl font-bold text-teal-600 dark:text-teal-400">{item.score}</span>
                        <span className="text-sm sm:text-base text-slate-400 dark:text-slate-500">/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="bg-slate-50 dark:bg-slate-800/30 p-3 sm:p-4 rounded-xl">
                      <p className="text-xs sm:text-sm font-mono text-teal-600 dark:text-teal-400 uppercase mb-2">Instructor Feedback</p>
                      <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 break-words">"{item.note}"</p>
                    </div>
                    {item.student_reply && (
                      <div className="bg-teal-50 dark:bg-teal-950/30 p-3 sm:p-4 rounded-xl mt-3">
                        <p className="text-xs sm:text-sm font-mono text-teal-600 dark:text-teal-400 uppercase mb-2">Student Reply</p>
                        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 break-words">"{item.student_reply}"</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAYMENT HISTORY TAB */}
          {activeTab === "Payment History" && (
            <div className="space-y-5 sm:space-y-7">
              <div className="bg-slate-50 dark:bg-slate-800/30 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-sm sm:text-base font-mono font-bold text-teal-600 dark:text-teal-400 uppercase mb-4">Record New Payment</h4>
                <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="Amount" 
                      className="w-full pl-7 sm:pl-8 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none focus:border-teal-400" 
                      value={formData.amount_total} 
                      onChange={e => setFormData({...formData, amount_total: e.target.value})} 
                      required 
                    />
                    <DollarSign className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={14}/>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Transaction ID" 
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none focus:border-teal-400"
                    value={formData.transaction_id} 
                    onChange={e => setFormData({...formData, transaction_id: e.target.value})} 
                  />
                  <select 
                    className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none focus:border-teal-400"
                    value={formData.payment_method} 
                    onChange={e => setFormData({...formData, payment_method: e.target.value})}
                  >
                    <option value="Cash">Cash</option>
                    <option value="E-Transfer">E-Transfer</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                  <button 
                    type="submit" 
                    disabled={payLoading} 
                    className="bg-teal-600 text-white font-semibold text-sm sm:text-base rounded-xl py-2.5 sm:py-3 flex justify-center items-center hover:bg-teal-700 transition disabled:opacity-50"
                  >
                    {payLoading ? <Loader2 className="animate-spin" size={16} /> : "Record Payment"}
                  </button>
                </form>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left min-w-[500px]">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>
                      <th className="p-3 sm:p-4 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
                      <th className="p-3 sm:p-4 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
                      <th className="p-3 sm:p-4 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Method</th>
                      <th className="p-3 sm:p-4 text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {data.payments?.map((p, i) => (
                      <tr key={i}>
                        <td className="p-3 sm:p-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 whitespace-nowrap">{p.date}</td>
                        <td className="p-3 sm:p-4 font-semibold text-sm sm:text-base text-teal-600 dark:text-teal-400 whitespace-nowrap">CAD {p.amount}</td>
                        <td className="p-3 sm:p-4 text-sm sm:text-base text-slate-500 dark:text-slate-400">{p.method || 'N/A'}</td>
                        <td className="p-3 sm:p-4">
                          <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg whitespace-nowrap">succeeded</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}