// import React, { useState, useEffect } from "react";
// import { 
//   Mail, Loader2, Calendar, Clock, 
//   CreditCard, Award, User, ShieldCheck, 
//   AlertCircle, PlusCircle, Check, DollarSign,
//   MapPin, Phone, BookOpen, Hash, FileText,
//   CreditCard as CardIcon, Calendar as CalendarIcon,
//   UserCircle, Download, Edit, Trash2, MessageCircle, X, Save
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
    
//     // Address fields for editing
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
    
//     // Foreign license
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

//   // Initialize edit form data when data loads
//   useEffect(() => {
//     // Simulate loading
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
    
//     // Simulate payment recording
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
    
//     // Update the main data with edited values
//     setData({
//       ...data,
//       name: editFormData.name,
//       email: editFormData.email,
//       phone: editFormData.phone,
//       street_address: editFormData.street_address,
//       appartment: editFormData.appartment,
//       city: editFormData.city,
//       postal_code: editFormData.postal_code,
//       state: editFormData.state,
//       country: editFormData.country,
//       permit_number: editFormData.permit_number,
//       parent_name: editFormData.parent_name,
//       parent_email: editFormData.parent_email,
//       parent_phone: editFormData.parent_phone,
//       experience: editFormData.experience,
//       additional_notes: editFormData.additional_notes,
//       has_foreign_license: editFormData.has_foreign_license,
//       foreign_license_number: editFormData.foreign_license_number,
//       foreign_street_address: editFormData.foreign_street_address,
//       foreign_appartment: editFormData.foreign_appartment,
//       foreign_city: editFormData.foreign_city,
//       foreign_state: editFormData.foreign_state,
//       foreign_postal_code: editFormData.foreign_postal_code,
//       foreign_country: editFormData.foreign_country,
//     });
    
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
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/80 backdrop-blur-md">
//       <div className="text-center">
//         <Loader2 className="animate-spin text-indigo-500 mb-4 mx-auto" size={48} />
//         <p className="text-white font-black uppercase tracking-widest text-[10px]">Accessing Registry...</p>
//       </div>
//     </div>
//   );

//   if (error || !data) return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/80">
//       <div className="bg-white dark:bg-gray-900 p-12 rounded-[3rem] text-center max-w-md">
//         <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
//         <p className="text-gray-500 text-sm mb-6">{error || "Student not found"}</p>
//         <button onClick={onClose} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-xs">Return</button>
//       </div>
//     </div>
//   );

//   // Edit Form Modal
//   if (isEditing) {
//     return (
//       <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 overflow-y-auto">
//         <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-[3rem] shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          
//           {/* Edit Header */}
//           <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-black uppercase tracking-tighter">Edit Student Information</h2>
//               <p className="text-sm opacity-90 mt-1">Update personal details for {data.name}</p>
//             </div>
//             <button 
//               onClick={() => setIsEditing(false)}
//               className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           {/* Edit Form */}
//           <form onSubmit={handleEditSubmit} className="p-8 max-h-[70vh] overflow-y-auto">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               {/* Personal Information */}
//               <div className="col-span-2">
//                 <h3 className="text-lg font-black text-indigo-600 mb-4 flex items-center gap-2">
//                   <User size={20} /> Personal Information
//                 </h3>
//               </div>
              
//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={editFormData.name}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editFormData.email}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Phone Number</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={editFormData.phone}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Permit Number</label>
//                 <input
//                   type="text"
//                   name="permit_number"
//                   value={editFormData.permit_number}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               {/* Address Information */}
//               <div className="col-span-2 mt-4">
//                 <h3 className="text-lg font-black text-indigo-600 mb-4 flex items-center gap-2">
//                   <MapPin size={20} /> Address Information
//                 </h3>
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Street Address</label>
//                 <input
//                   type="text"
//                   name="street_address"
//                   value={editFormData.street_address}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Apartment/Suite</label>
//                 <input
//                   type="text"
//                   name="appartment"
//                   value={editFormData.appartment}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">City</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={editFormData.city}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Postal Code</label>
//                 <input
//                   type="text"
//                   name="postal_code"
//                   value={editFormData.postal_code}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Province/State</label>
//                 <input
//                   type="text"
//                   name="state"
//                   value={editFormData.state}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Country</label>
//                 <input
//                   type="text"
//                   name="country"
//                   value={editFormData.country}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               {/* Parent/Guardian Information */}
//               <div className="col-span-2 mt-4">
//                 <h3 className="text-lg font-black text-indigo-600 mb-4 flex items-center gap-2">
//                   <Users size={20} /> Parent/Guardian Information
//                 </h3>
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Parent Name</label>
//                 <input
//                   type="text"
//                   name="parent_name"
//                   value={editFormData.parent_name}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Parent Email</label>
//                 <input
//                   type="email"
//                   name="parent_email"
//                   value={editFormData.parent_email}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Parent Phone</label>
//                 <input
//                   type="tel"
//                   name="parent_phone"
//                   value={editFormData.parent_phone}
//                   onChange={handleInputChange}
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                 />
//               </div>

//               {/* Foreign License */}
//               <div className="col-span-2 mt-4">
//                 <h3 className="text-lg font-black text-indigo-600 mb-4 flex items-center gap-2">
//                   <FileText size={20} /> Foreign License Information
//                 </h3>
//               </div>

//               <div className="col-span-2 flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
//                 <input
//                   type="checkbox"
//                   name="has_foreign_license"
//                   checked={editFormData.has_foreign_license}
//                   onChange={handleInputChange}
//                   className="w-5 h-5 accent-indigo-600"
//                   id="has_foreign_license"
//                 />
//                 <label htmlFor="has_foreign_license" className="font-medium">Student has foreign license</label>
//               </div>

//               {editFormData.has_foreign_license && (
//                 <>
//                   <div className="space-y-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Foreign License Number</label>
//                     <input
//                       type="text"
//                       name="foreign_license_number"
//                       value={editFormData.foreign_license_number}
//                       onChange={handleInputChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Foreign Country</label>
//                     <input
//                       type="text"
//                       name="foreign_country"
//                       value={editFormData.foreign_country}
//                       onChange={handleInputChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                     />
//                   </div>

//                   <div className="space-y-2 md:col-span-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Foreign Street Address</label>
//                     <input
//                       type="text"
//                       name="foreign_street_address"
//                       value={editFormData.foreign_street_address}
//                       onChange={handleInputChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Foreign Apartment</label>
//                     <input
//                       type="text"
//                       name="foreign_appartment"
//                       value={editFormData.foreign_appartment}
//                       onChange={handleInputChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Foreign City</label>
//                     <input
//                       type="text"
//                       name="foreign_city"
//                       value={editFormData.foreign_city}
//                       onChange={handleInputChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Foreign State</label>
//                     <input
//                       type="text"
//                       name="foreign_state"
//                       value={editFormData.foreign_state}
//                       onChange={handleInputChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-xs font-bold text-gray-500 uppercase">Foreign Postal Code</label>
//                     <input
//                       type="text"
//                       name="foreign_postal_code"
//                       value={editFormData.foreign_postal_code}
//                       onChange={handleInputChange}
//                       className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium"
//                     />
//                   </div>
//                 </>
//               )}

//               {/* Additional Notes */}
//               <div className="col-span-2 mt-4">
//                 <label className="text-xs font-bold text-gray-500 uppercase">Additional Notes</label>
//                 <textarea
//                   name="additional_notes"
//                   value={editFormData.additional_notes}
//                   onChange={handleInputChange}
//                   rows="3"
//                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-medium mt-2"
//                 />
//               </div>
//             </div>

//             {/* Form Actions */}
//             <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(false)}
//                 className="px-8 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-black text-sm uppercase hover:bg-gray-300 dark:hover:bg-gray-700 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm uppercase hover:bg-indigo-700 transition flex items-center gap-2"
//               >
//                 <Save size={18} /> Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/90 backdrop-blur-xl p-4 md:p-10 overflow-y-auto">
//       <div className="bg-white dark:bg-gray-900 w-full max-w-6xl min-h-[90vh] rounded-[3.5rem] shadow-2xl relative border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col my-auto">
        
//         <button onClick={onClose} className="absolute top-8 right-8 z-20 bg-white/10 hover:bg-red-500 hover:text-white text-gray-400 h-12 w-12 flex items-center justify-center rounded-2xl transition-all border border-gray-100 dark:border-gray-800 shadow-xl font-bold">✕</button>

//         {/* Header with Student Basic Info */}
//         <div className="p-10 md:p-16 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             {/* Profile Picture */}
//             <div className="h-44 w-44 rounded-[3.5rem] bg-indigo-600 flex items-center justify-center text-7xl font-black text-white italic shadow-2xl border-4 border-white dark:border-gray-800 overflow-hidden">
//               {data.profile_picture ? (
//                 <img src={data.profile_picture} className="h-full w-full object-cover" alt="Profile" />
//               ) : (
//                 <UserCircle size={80} />
//               )}
//             </div>
            
//             {/* Student Info */}
//             <div className="flex-1 text-center lg:text-left">
//               <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-4">
//                 <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
//                   data.paymentStatus === 'Paid' 
//                     ? 'bg-emerald-100 text-emerald-600 border-emerald-200' 
//                     : 'bg-amber-100 text-amber-600 border-amber-200'
//                 }`}>
//                   {data.paymentStatus}
//                 </span>
//                 <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
//                   data.status === 'active' 
//                     ? 'bg-green-100 text-green-600 border-green-200'
//                     : data.status === 'pending'
//                     ? 'bg-yellow-100 text-yellow-600 border-yellow-200'
//                     : 'bg-red-100 text-red-600 border-red-200'
//                 }`}>
//                   {data.status}
//                 </span>
//                 <span className="px-4 py-1.5 bg-purple-100 text-purple-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-purple-200">
//                   Permit: {data.permit_number || 'N/A'}
//                 </span>
//               </div>
//               <h2 className="text-5xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter mb-2">{data.name}</h2>
//               <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-500 font-bold uppercase text-[10px] tracking-widest">
//                 <span className="flex items-center gap-2">
//                   <Mail size={14} className="text-indigo-500"/> {data.email}
//                 </span>
//                 <span className="flex items-center gap-2">
//                   <Phone size={14} className="text-indigo-500"/> {data.phone || 'N/A'}
//                 </span>
//                 <span className="flex items-center gap-2">
//                   <MapPin size={14} className="text-indigo-500"/> {data.location || 'N/A'}
//                 </span>
//               </div>
//             </div>

//             {/* Right Side - Balance Card and Status Actions */}
//             <div className="flex flex-col items-stretch gap-4 min-w-[240px]">
//               {/* Balance Card */}
//               <div className="bg-white dark:bg-gray-950 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl text-center">
//                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Due to Pay</p>
//                 <p className="text-3xl font-black text-gray-900 dark:text-white italic">CAD {data.balanceCAD}</p>
//               </div>
              
//               {/* Status Action Buttons */}
//               <div className="flex flex-col gap-2">
//                 {data.status === 'active' ? (
//                   <button 
//                     onClick={() => handleBlockToggle('block')}
//                     className="w-full px-4 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <ShieldCheck size={14} />
//                     Block Student
//                   </button>
//                 ) : data.status === 'blocked' ? (
//                   <button 
//                     onClick={() => handleBlockToggle('unblock')}
//                     className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <ShieldCheck size={14} />
//                     Unblock Student
//                   </button>
//                 ) : data.status === 'pending' ? (
//                   <div className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg">
//                     <Clock size={14} />
//                     Pending Approval
//                   </div>
//                 ) : null}

//                 {/* Edit Profile Button */}
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="w-full px-4 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
//                 >
//                   <Edit size={14} />
//                   Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs Navigation */}
//         <div className="flex px-16 bg-white dark:bg-gray-900 border-b border-gray-50 dark:border-gray-800 gap-10 overflow-x-auto no-scrollbar">
//           {["Overview", "Attendance & Schedule", "Skill Evaluation", "Payment History"].map((tab) => (
//             <button 
//               key={tab} 
//               onClick={() => setActiveTab(tab)} 
//               className={`py-8 whitespace-nowrap text-xs font-black uppercase tracking-widest relative transition-all ${
//                 activeTab === tab ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-indigo-600 rounded-t-full" />}
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="flex-1 p-10 md:p-16 overflow-y-auto">
          
//           {/* OVERVIEW TAB */}
//           {activeTab === "Overview" && (
//             <div className="space-y-10">
//               {/* Student Details Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Personal Information */}
//                 <div className="col-span-1 bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-lg">
//                   <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-indigo-600 mb-6">
//                     <User size={18}/> Personal Details
//                   </h4>
//                   <div className="space-y-4">
//                     <div className="pb-3 border-b border-gray-100">
//                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
//                       <p className="font-bold text-gray-900 dark:text-white">{data.name}</p>
//                     </div>
//                     <div className="pb-3 border-b border-gray-100">
//                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
//                       <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                         <Mail size={14} className="text-indigo-400"/>
//                         {data.email}
//                       </p>
//                     </div>
//                     <div className="pb-3 border-b border-gray-100">
//                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
//                       <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                         <Phone size={14} className="text-indigo-400"/>
//                         {data.phone || 'Not provided'}
//                       </p>
//                     </div>
//                     <div className="pb-3 border-b border-gray-100">
//                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Province</p>
//                       <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                         <MapPin size={14} className="text-indigo-400"/>
//                         {data.location || data.province || 'N/A'}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-wider mb-1">Permit Number</p>
//                       <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                         <FileText size={14} className="text-indigo-400"/>
//                         {data.permit_number || 'Not issued'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Package & Enrollment Details */}
//                 <div className="col-span-1 bg-indigo-50 dark:bg-indigo-950/20 p-8 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/40 shadow-lg">
//                   <h4 className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-indigo-600 mb-6">
//                     <BookOpen size={18}/> Enrollment Details
//                   </h4>
//                   <div className="space-y-4">
//                     <div className="flex justify-between items-center pb-3 border-b border-indigo-100/50">
//                       <span className="text-gray-500 font-bold text-xs uppercase">Selected Package</span>
//                       <span className="font-black text-gray-900 dark:text-white text-lg">
//                         {data.packageName || 'Standard Course'}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center pb-3 border-b border-indigo-100/50">
//                       <span className="text-gray-500 font-bold text-xs uppercase">Package Amount</span>
//                       <span className="font-black text-indigo-600 text-xl">
//                         CAD {data.totalPackageAmount}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center pb-3 border-b border-indigo-100/50">
//                       <span className="text-gray-500 font-bold text-xs uppercase">Total Paid</span>
//                       <span className="font-black text-emerald-600 text-xl">
//                         CAD {data.totalPaid}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-500 font-bold text-xs uppercase">Training Hours</span>
//                       <span className="font-black text-gray-900 dark:text-white">
//                         {data.hoursLogged} / {data.totalHours} Hours
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Instructor Details */}
//                 <div className="col-span-1 bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
//                   <div className="absolute -right-4 -bottom-4 opacity-10">
//                     <User size={120}/>
//                   </div>
//                   <h4 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-6">
//                     <Award size={18}/> Assigned Instructor
//                   </h4>
                  
//                   {data.instructor && data.instructor !== 'Unassigned' ? (
//                     <div className="space-y-4 relative z-10">
//                       <div>
//                         <p className="text-2xl font-black italic uppercase tracking-tighter mb-1">
//                           {data.instructor}
//                         </p>
//                         <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
//                           Lead Instructor
//                         </p>
//                       </div>
                      
//                       {data.instructorEmail && (
//                         <div className="flex items-center gap-3 text-sm">
//                           <Mail size={16} className="text-indigo-400"/>
//                           <span className="opacity-90">{data.instructorEmail}</span>
//                         </div>
//                       )}
                      
//                       {data.instructorPhone && (
//                         <div className="flex items-center gap-3 text-sm">
//                           <Phone size={16} className="text-indigo-400"/>
//                           <span className="opacity-90">{data.instructorPhone}</span>
//                         </div>
//                       )}
                      
//                       <div className="mt-4 pt-4 border-t border-indigo-800/50">
//                         <p className="text-[9px] font-black uppercase tracking-wider text-indigo-400 mb-1">
//                           Specialization
//                         </p>
//                         <p className="text-sm font-bold">Class 5 & 7 Instruction</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="text-center py-6">
//                       <p className="text-2xl font-black italic opacity-50 mb-2">Unassigned</p>
//                       <p className="text-xs text-indigo-300">No instructor assigned yet</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* ATTENDANCE & SCHEDULE TAB */}
//           {activeTab === "Attendance & Schedule" && (
//             <div className="space-y-8">
//               {/* Sub-tabs for Attendance/Upcoming */}
//               <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
//                 <button
//                   onClick={() => setScheduleTab('attendance')}
//                   className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
//                     scheduleTab === 'attendance'
//                       ? 'bg-indigo-600 text-white'
//                       : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Clock size={16} className="inline mr-2" />
//                   Attendance History
//                 </button>
//                 <button
//                   onClick={() => setScheduleTab('upcoming')}
//                   className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
//                     scheduleTab === 'upcoming'
//                       ? 'bg-indigo-600 text-white'
//                       : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Calendar size={16} className="inline mr-2" />
//                   Upcoming Schedule
//                 </button>
//               </div>

//               {/* Attendance History */}
//               {scheduleTab === 'attendance' && (
//                 <div className="space-y-6">
//                   <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
//                     Complete Attendance Log ({data.attendance?.length || 0} sessions)
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {data.attendance?.length > 0 ? (
//                       data.attendance.map((log, i) => (
//                         <div key={i} className="p-6 bg-gray-50 dark:bg-gray-800/40 rounded-3xl border border-gray-100 flex justify-between items-center group hover:shadow-lg transition">
//                           <div className="flex items-center gap-4">
//                             <div className={`p-3 rounded-2xl ${
//                               log.status === 'present' 
//                                 ? 'bg-green-100 text-green-600' 
//                                 : 'bg-amber-100 text-amber-600'
//                             }`}>
//                               <Clock size={20}/>
//                             </div>
//                             <div>
//                               <p className="font-bold text-gray-900 dark:text-white uppercase text-sm">
//                                 {log.session || 'Driving Session'}
//                               </p>
//                               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">
//                                 {log.date}
//                               </p>
//                             </div>
//                           </div>
//                           <span className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-xl border ${
//                             log.status === 'present' 
//                               ? 'bg-green-100 text-green-600 border-green-200' 
//                               : log.status === 'absent'
//                               ? 'bg-rose-100 text-rose-600 border-rose-200'
//                               : 'bg-gray-100 text-gray-600 border-gray-200'
//                           }`}>
//                             {log.status}
//                           </span>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="col-span-2 text-center py-16 bg-gray-50 dark:bg-gray-800/20 rounded-[2.5rem]">
//                         <Clock size={48} className="mx-auto text-gray-400 mb-4" />
//                         <p className="text-gray-500 font-bold">No attendance records found</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* Upcoming Schedule */}
//               {scheduleTab === 'upcoming' && (
//                 <div className="space-y-6">
//                   <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
//                     Upcoming Sessions
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {data.upcomingSchedules?.length > 0 ? (
//                       data.upcomingSchedules.map((schedule, i) => (
//                         <div key={i} className="p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900 rounded-3xl border border-indigo-100 dark:border-indigo-900/40 flex justify-between items-center">
//                           <div className="flex items-center gap-4">
//                             <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
//                               <CalendarIcon size={20}/>
//                             </div>
//                             <div>
//                               <p className="font-black text-gray-900 dark:text-white uppercase text-sm">
//                                 {schedule.sessionType || 'Driving Lesson'}
//                               </p>
//                               <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">
//                                 {schedule.date} • {schedule.time}
//                               </p>
//                             </div>
//                           </div>
//                           <span className="text-[9px] font-black uppercase px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-xl border border-indigo-200">
//                             {schedule.duration || '2 hours'}
//                           </span>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="col-span-2 text-center py-16 bg-gray-50 dark:bg-gray-800/20 rounded-[2.5rem]">
//                         <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
//                         <p className="text-gray-500 font-bold">No upcoming sessions scheduled</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* SKILL EVALUATION TAB */}
//           {activeTab === "Skill Evaluation" && (
//             <div className="space-y-8">
//               {/* Header with stats */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-[2rem] text-white shadow-xl">
//                   <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Total Evaluations</p>
//                   <p className="text-4xl font-black">{data.evaluations?.length || 0}</p>
//                 </div>
//                 <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-[2rem] text-white shadow-xl">
//                   <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Average Score</p>
//                   <p className="text-4xl font-black">
//                     {data.evaluations?.length > 0 
//                       ? Math.round(data.evaluations.reduce((acc, curr) => acc + curr.score, 0) / data.evaluations.length) 
//                       : 0}%
//                   </p>
//                 </div>
//                 <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-[2rem] text-white shadow-xl">
//                   <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Tests Completed</p>
//                   <p className="text-4xl font-black">{data.evaluations?.length || 0}</p>
//                 </div>
//               </div>

//               {/* Evaluations List */}
//               <div className="space-y-6">
//                 <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
//                   <Award size={18} className="text-indigo-500"/>
//                   Skill Assessment Records
//                 </h3>
                
//                 {data.evaluations?.length > 0 ? (
//                   <div className="grid grid-cols-1 gap-6">
//                     {data.evaluations.map((item, i) => (
//                       <div key={i} className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden hover:shadow-xl transition-all">
//                         {/* Header */}
//                         <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 border-b border-gray-100 dark:border-gray-800">
//                           <div className="flex flex-wrap items-center justify-between gap-4">
//                             <div className="flex items-center gap-4">
//                               <div className="h-14 w-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
//                                 <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">#{i + 1}</span>
//                               </div>
//                               <div>
//                                 <div className="flex items-center gap-3 mb-1">
//                                   <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl text-[9px] font-black uppercase tracking-wider">
//                                     {item.category || 'Driving Test'}
//                                   </span>
//                                   <span className="text-xs text-gray-500 flex items-center gap-1">
//                                     <Calendar size={12}/>
//                                     {item.date || 'N/A'}
//                                   </span>
//                                 </div>
//                                 <h4 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
//                                   {item.test_type || 'Practical Evaluation'}
//                                 </h4>
//                               </div>
//                             </div>
//                             <div className="flex items-center gap-4">
//                               <div className="text-right">
//                                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Score</p>
//                                 <div className="flex items-center gap-2">
//                                   <span className="text-4xl font-black text-indigo-600">{item.score}</span>
//                                   <span className="text-sm text-gray-400">/100</span>
//                                 </div>
//                               </div>
//                               <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center">
//                                 <span className="text-2xl font-black text-white">{item.score}%</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Progress Bar */}
//                         <div className="px-6 pt-4">
//                           <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
//                             <div 
//                               className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
//                               style={{ width: `${item.score}%` }}
//                             />
//                           </div>
//                         </div>

//                         {/* Instructor Remarks & Student Reply */}
//                         <div className="p-6 space-y-4">
//                           {/* Instructor Remark */}
//                           <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border-l-4 border-indigo-500">
//                             <div className="flex items-start gap-3">
//                               <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center flex-shrink-0">
//                                 <User size={16} className="text-indigo-600"/>
//                               </div>
//                               <div className="flex-1">
//                                 <div className="flex items-center justify-between mb-2">
//                                   <span className="text-xs font-black text-indigo-600 uppercase tracking-wider">Instructor Remark</span>
//                                   <span className="text-[9px] text-gray-400">{item.remark_date || 'N/A'}</span>
//                                 </div>
//                                 <p className="text-sm text-gray-700 dark:text-gray-300">
//                                   "{item.note || 'No remarks provided'}"
//                                 </p>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Student Reply (if exists) */}
//                           {item.student_reply ? (
//                             <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-5 border-l-4 border-blue-500 ml-8">
//                               <div className="flex items-start gap-3">
//                                 <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
//                                   <User size={16} className="text-blue-600"/>
//                                 </div>
//                                 <div className="flex-1">
//                                   <div className="flex items-center justify-between mb-2">
//                                     <span className="text-xs font-black text-blue-600 uppercase tracking-wider">Student Reply</span>
//                                     <span className="text-[9px] text-gray-400">{item.reply_date || 'N/A'}</span>
//                                   </div>
//                                   <p className="text-sm text-gray-700 dark:text-gray-300">
//                                     "{item.student_reply}"
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           ) : (
//                             <div className="bg-gray-50/50 dark:bg-gray-800/20 rounded-xl p-5 border border-dashed border-gray-300 dark:border-gray-700 ml-8">
//                               <div className="flex items-center gap-3">
//                                 <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                                   <MessageCircle size={16} className="text-gray-500"/>
//                                 </div>
//                                 <p className="text-xs text-gray-500 italic">No reply from student yet</p>
//                               </div>
//                             </div>
//                           )}
//                         </div>

//                         {/* Footer with view-only indicator */}
//                         <div className="bg-gray-50/50 dark:bg-gray-800/20 px-6 py-3 border-t border-gray-100 dark:border-gray-800">
//                           <div className="flex items-center justify-end text-[9px] text-gray-400 uppercase tracking-wider">
//                             <ShieldCheck size={12} className="mr-1" />
//                             Admin View Only • No Editing Allowed
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/20 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
//                     <Award size={60} className="mx-auto text-gray-400 mb-4" />
//                     <p className="text-gray-500 font-bold text-lg mb-2">No Evaluations Found</p>
//                     <p className="text-gray-400 text-sm">Skill assessments will appear here once completed</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* PAYMENT HISTORY TAB */}
//           {activeTab === "Payment History" && (
//             <div className="space-y-10">
//               {/* Payment Form */}
//               <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900 p-10 rounded-[3rem] border-2 border-dashed border-indigo-200 dark:border-indigo-900/40">
//                 <h4 className="text-xs font-black uppercase tracking-widest mb-8 text-indigo-600 flex items-center gap-3">
//                   <PlusCircle size={20}/> Record New Payment
//                 </h4>
//                 <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                   <div className="relative">
//                     <input 
//                       type="number" 
//                       step="0.01"
//                       placeholder="Amount" 
//                       className="w-full bg-white dark:bg-gray-900 pl-12 pr-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm font-bold outline-none focus:border-indigo-300" 
//                       value={formData.amount_total} 
//                       onChange={e => setFormData({...formData, amount_total: e.target.value})} 
//                       required 
//                     />
//                     <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
//                   </div>
                  
//                   <div className="relative">
//                     <input 
//                       type="text" 
//                       placeholder="Transaction ID" 
//                       className="w-full bg-white dark:bg-gray-900 pl-12 pr-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm font-bold outline-none focus:border-indigo-300"
//                       value={formData.transaction_id} 
//                       onChange={e => setFormData({...formData, transaction_id: e.target.value})} 
//                     />
//                     <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
//                   </div>
                  
//                   <select 
//                     className="bg-white dark:bg-gray-900 px-6 py-4 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm font-bold outline-none focus:border-indigo-300"
//                     value={formData.payment_method} 
//                     onChange={e => setFormData({...formData, payment_method: e.target.value})}
//                   >
//                     <option value="Cash">Cash</option>
//                     <option value="E-Transfer">E-Transfer</option>
//                     <option value="Credit Card">Credit Card</option>
//                     <option value="Debit Card">Debit Card</option>
//                     <option value="Bank Transfer">Bank Transfer</option>
//                   </select>
                  
//                   <button 
//                     type="submit" 
//                     disabled={payLoading} 
//                     className="bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl py-4 flex justify-center items-center hover:bg-indigo-700 transition disabled:opacity-50"
//                   >
//                     {payLoading ? <Loader2 className="animate-spin" size={16} /> : "Record Payment"}
//                   </button>
//                 </form>
//               </div>

//               {/* Payment History Table */}
//               <div className="bg-white dark:bg-gray-950 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left border-collapse">
//                     <thead className="bg-gray-50 dark:bg-gray-800/50">
//                       <tr>
//                         <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
//                         <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
//                         <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Method</th>
//                         <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
//                         <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                       {data.payments?.length > 0 ? (
//                         data.payments.map((p, i) => (
//                           <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition">
//                             <td className="p-6 font-bold text-sm">{p.date}</td>
//                             <td className="p-6 font-black text-indigo-600 text-lg">CAD {p.amount}</td>
//                             <td className="p-6 font-bold text-gray-600 dark:text-gray-400 text-xs uppercase">
//                               {p.method || 'N/A'}
//                             </td>
//                             <td className="p-6 font-mono text-xs text-gray-500">
//                               {p.transaction_id || '—'}
//                             </td>
//                             <td className="p-6">
//                               <span className={`px-3 py-1 text-[9px] font-black rounded-lg uppercase ${
//                                 p.status === 'succeeded' 
//                                   ? 'bg-green-50 text-green-600 border border-green-200' 
//                                   : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
//                               }`}>
//                                 {p.status}
//                               </span>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="5" className="p-12 text-center text-gray-500">
//                             <CreditCard size={40} className="mx-auto mb-4 text-gray-400" />
//                             No payment records found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950 backdrop-blur-sm">
      <div className="text-center">
        <Loader2 className="animate-spin text-terra-600 dark:text-terra-400 mx-auto mb-4" size={48} />
        <p className="text-gray-500 dark:text-gray-400 font-mono text-xs tracking-wider">Loading student records...</p>
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-950 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 p-12 rounded-3xl text-center max-w-md shadow-xl border border-gray-100 dark:border-gray-800">
        <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{error || "Student not found"}</p>
        <button onClick={onClose} className="w-full py-3 bg-terra-600 text-white rounded-xl font-semibold text-sm">Return</button>
      </div>
    </div>
  );

  // Edit Form Modal
  if (isEditing) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Student Information</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update personal details for {data.name}</p>
            </div>
            <button 
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleEditSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="col-span-2">
                <h3 className="text-sm font-semibold text-terra-600 dark:text-terra-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">Personal Information</h3>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200 dark:focus:ring-terra-800"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Permit Number</label>
                <input
                  type="text"
                  name="permit_number"
                  value={editFormData.permit_number}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="col-span-2 mt-4">
                <h3 className="text-sm font-semibold text-terra-600 dark:text-terra-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">Address Information</h3>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Street Address</label>
                <input
                  type="text"
                  name="street_address"
                  value={editFormData.street_address}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Apartment/Suite</label>
                <input
                  type="text"
                  name="appartment"
                  value={editFormData.appartment}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">City</label>
                <input
                  type="text"
                  name="city"
                  value={editFormData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Postal Code</label>
                <input
                  type="text"
                  name="postal_code"
                  value={editFormData.postal_code}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Province/State</label>
                <input
                  type="text"
                  name="state"
                  value={editFormData.state}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Country</label>
                <input
                  type="text"
                  name="country"
                  value={editFormData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="col-span-2 mt-4">
                <h3 className="text-sm font-semibold text-terra-600 dark:text-terra-400 mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">Parent/Guardian Information</h3>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Parent Name</label>
                <input
                  type="text"
                  name="parent_name"
                  value={editFormData.parent_name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Parent Email</label>
                <input
                  type="email"
                  name="parent_email"
                  value={editFormData.parent_email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Parent Phone</label>
                <input
                  type="tel"
                  name="parent_phone"
                  value={editFormData.parent_phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>

              <div className="col-span-2 mt-4">
                <label className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase">Additional Notes</label>
                <textarea
                  name="additional_notes"
                  value={editFormData.additional_notes}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-medium text-gray-900 dark:text-white mt-2 focus:outline-none focus:border-terra-400 focus:ring-1 focus:ring-terra-200"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-terra-600 text-white rounded-xl font-semibold text-sm hover:bg-terra-700 transition flex items-center gap-2"
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 w-full max-w-6xl min-h-[90vh] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col my-auto">
        
        <button onClick={onClose} className="absolute top-6 right-6 z-20 w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl flex items-center justify-center transition-all">✕</button>

        {/* Header with Student Basic Info */}
        <div className="p-8 md:p-10 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="h-28 w-28 rounded-2xl bg-terra-100 dark:bg-terra-900/30 flex items-center justify-center text-4xl font-bold text-terra-600 dark:text-terra-400 shadow-sm border-2 border-terra-200 dark:border-terra-800">
              {data.name.charAt(0)}
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${
                  data.paymentStatus === 'Paid' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' 
                    : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                }`}>
                  {data.paymentStatus}
                </span>
                <span className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border ${
                  data.status === 'active' 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    : data.status === 'pending'
                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                    : 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                }`}>
                  {data.status}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  Permit: {data.permit_number || 'N/A'}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">{data.name}</h2>
              <div className="flex flex-wrap justify-center lg:justify-start gap-5 text-gray-500 dark:text-gray-400 text-xs font-mono">
                <span className="flex items-center gap-1.5"><Mail size={12}/> {data.email}</span>
                <span className="flex items-center gap-1.5"><Phone size={12}/> {data.phone || 'N/A'}</span>
                <span className="flex items-center gap-1.5"><MapPin size={12}/> {data.location || 'N/A'}</span>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-3 min-w-[200px]">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                <p className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Balance Due</p>
                <p className="text-2xl font-bold text-terra-600 dark:text-terra-400">CAD {data.balanceCAD}</p>
              </div>
              
              <div className="flex flex-col gap-2">
                {data.status === 'active' ? (
                  <button 
                    onClick={() => handleBlockToggle('block')}
                    className="px-4 py-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-900/30 transition flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={14} /> Block Student
                  </button>
                ) : data.status === 'blocked' ? (
                  <button 
                    onClick={() => handleBlockToggle('unblock')}
                    className="px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={14} /> Unblock Student
                  </button>
                ) : null}

                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Edit size={14} /> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex px-6 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 gap-8 overflow-x-auto no-scrollbar">
          {["Overview", "Attendance & Schedule", "Skill Evaluation", "Payment History"].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`py-4 whitespace-nowrap text-sm font-semibold tracking-wide relative transition-all ${
                activeTab === tab ? "text-terra-600 dark:text-terra-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-terra-600 dark:bg-terra-500 rounded-full" />}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {/* OVERVIEW TAB */}
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-terra-600 dark:text-terra-400 uppercase tracking-wider mb-5">
                  <User size={16}/> Personal Details
                </h4>
                <div className="space-y-3">
                  <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Full Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
                  </div>
                  <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{data.email}</p>
                  </div>
                  <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Phone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{data.phone || 'Not provided'}</p>
                  </div>
                  <div className="pb-2 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Location</p>
                    <p className="font-medium text-gray-900 dark:text-white">{data.location || data.province || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase mb-1">Permit Number</p>
                    <p className="font-medium text-gray-900 dark:text-white">{data.permit_number || 'Not issued'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-terra-600 dark:text-terra-400 uppercase tracking-wider mb-5">
                  <BookOpen size={16}/> Enrollment Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Package</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{data.packageName || 'Standard Course'}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Total Amount</span>
                    <span className="font-semibold text-terra-600 dark:text-terra-400">CAD {data.totalPackageAmount}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Paid</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">CAD {data.totalPaid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{data.hoursLogged} / {data.totalHours} hrs</span>
                  </div>
                </div>
              </div>

              <div className="bg-terra-900 dark:bg-terra-950 rounded-2xl p-6 text-white shadow-sm">
                <h4 className="flex items-center gap-2 text-xs font-mono font-bold text-terra-300 uppercase tracking-wider mb-5">
                  <Award size={16}/> Assigned Instructor
                </h4>
                {data.instructor && data.instructor !== 'Unassigned' ? (
                  <div>
                    <p className="text-xl font-semibold mb-1">{data.instructor}</p>
                    <p className="text-xs text-terra-300 mb-4">Lead Instructor</p>
                    {data.instructorEmail && (
                      <div className="flex items-center gap-2 text-xs mb-2"><Mail size={12}/> {data.instructorEmail}</div>
                    )}
                    {data.instructorPhone && (
                      <div className="flex items-center gap-2 text-xs"><Phone size={12}/> {data.instructorPhone}</div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm opacity-60">No instructor assigned</p>
                )}
              </div>
            </div>
          )}

          {/* ATTENDANCE & SCHEDULE TAB */}
          {activeTab === "Attendance & Schedule" && (
            <div className="space-y-6">
              <div className="flex gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
                <button
                  onClick={() => setScheduleTab('attendance')}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    scheduleTab === 'attendance'
                      ? 'bg-terra-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Clock size={14} className="inline mr-1.5" />
                  Attendance History
                </button>
                <button
                  onClick={() => setScheduleTab('upcoming')}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    scheduleTab === 'upcoming'
                      ? 'bg-terra-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Calendar size={14} className="inline mr-1.5" />
                  Upcoming Schedule
                </button>
              </div>

              {scheduleTab === 'attendance' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.attendance?.map((log, i) => (
                    <div key={i} className="p-5 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${
                          log.status === 'present' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-amber-100 dark:bg-amber-900/20'
                        }`}>
                          <Clock size={16} className={log.status === 'present' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}/>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{log.session || 'Driving Session'}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">{log.date}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-lg ${
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.upcomingSchedules?.map((schedule, i) => (
                    <div key={i} className="p-5 bg-terra-50 dark:bg-terra-950/30 rounded-2xl border border-terra-100 dark:border-terra-800 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-terra-100 dark:bg-terra-900/30 rounded-xl"><Calendar size={16} className="text-terra-600 dark:text-terra-400"/></div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{schedule.sessionType || 'Driving Lesson'}</p>
                          <p className="text-xs text-terra-600 dark:text-terra-400 font-mono">{schedule.date} • {schedule.time}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-3 py-1 bg-terra-100 dark:bg-terra-900/30 text-terra-700 dark:text-terra-400 rounded-lg">
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
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-terra-50 dark:bg-terra-950/30 p-5 rounded-2xl text-center">
                  <p className="text-[10px] font-mono text-terra-600 dark:text-terra-400 uppercase tracking-wider">Total Tests</p>
                  <p className="text-2xl font-bold text-terra-700 dark:text-terra-400">{data.evaluations?.length || 0}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-5 rounded-2xl text-center">
                  <p className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Average Score</p>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    {data.evaluations?.length > 0 
                      ? Math.round(data.evaluations.reduce((a, c) => a + c.score, 0) / data.evaluations.length) 
                      : 0}%
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800/50 p-5 rounded-2xl text-center">
                  <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completed</p>
                  <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{data.evaluations?.length || 0}</p>
                </div>
              </div>

              {data.evaluations?.map((item, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-5 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-mono text-terra-600 dark:text-terra-400 uppercase bg-terra-100 dark:bg-terra-900/30 px-2 py-0.5 rounded">{item.category}</span>
                        <h4 className="font-semibold text-gray-900 dark:text-white mt-2">{item.test_type}</h4>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-terra-600 dark:text-terra-400">{item.score}</span>
                        <span className="text-sm text-gray-400 dark:text-gray-500">/100</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl">
                      <p className="text-xs font-mono text-terra-600 dark:text-terra-400 uppercase mb-2">Instructor Feedback</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">"{item.note}"</p>
                    </div>
                    {item.student_reply && (
                      <div className="bg-terra-50 dark:bg-terra-950/30 p-4 rounded-xl mt-3">
                        <p className="text-xs font-mono text-terra-600 dark:text-terra-400 uppercase mb-2">Student Reply</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">"{item.student_reply}"</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAYMENT HISTORY TAB */}
          {activeTab === "Payment History" && (
            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                <h4 className="text-xs font-mono font-bold text-terra-600 dark:text-terra-400 uppercase mb-5">Record New Payment</h4>
                <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.01"
                      placeholder="Amount" 
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-terra-400" 
                      value={formData.amount_total} 
                      onChange={e => setFormData({...formData, amount_total: e.target.value})} 
                      required 
                    />
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={14}/>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Transaction ID" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-terra-400"
                    value={formData.transaction_id} 
                    onChange={e => setFormData({...formData, transaction_id: e.target.value})} 
                  />
                  <select 
                    className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-terra-400"
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
                    className="bg-terra-600 text-white font-semibold text-sm rounded-xl py-3 flex justify-center items-center hover:bg-terra-700 transition disabled:opacity-50"
                  >
                    {payLoading ? <Loader2 className="animate-spin" size={16} /> : "Record Payment"}
                  </button>
                </form>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="p-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                      <th className="p-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                      <th className="p-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                      <th className="p-4 text-[10px] font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {data.payments?.map((p, i) => (
                      <tr key={i}>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">{p.date}</td>
                        <td className="p-4 font-semibold text-terra-600 dark:text-terra-400">CAD {p.amount}</td>
                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{p.method || 'N/A'}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 text-[9px] font-mono font-bold bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">succeeded</span>
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