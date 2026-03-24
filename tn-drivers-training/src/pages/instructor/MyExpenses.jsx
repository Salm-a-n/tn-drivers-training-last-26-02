// import React, { useState, useEffect } from 'react';
// import { 
//   Receipt, Car, Gauge, CloudUpload, ChevronDown, Save, 
//   Landmark, Verified, History, Clock, CheckCircle2, 
//   ShieldCheck, Edit3, AlertTriangle, Calendar
// } from 'lucide-react';

// const MyExpenses = () => {
//   const instructorName = "Marc-André Leclaire"; 
//   const instructorBranch = "Burin";

//   // --- CAR MANAGEMENT STATE ---
//   const [assignedCar, setAssignedCar] = useState({
//     model: "2022 Toyota Corolla",
//     plate: "HJH-412",
//     id: "V-882",
//     odometer: 42500,
//     insurancePolicy: "NF-99234-X",
//     insuranceStart: "2025-03-01",
//     insuranceExpiry: "2026-03-25" 
//   });

//   const [isEditingCar, setIsEditingCar] = useState(false);
//   const [tempCarData, setTempCarData] = useState({ ...assignedCar });
//   const [insuranceStatus, setInsuranceStatus] = useState({ type: 'valid', message: '' });

//   // --- INSURANCE ALERT LOGIC ---
//   useEffect(() => {
//     const today = new Date();
//     const expiry = new Date(assignedCar.insuranceExpiry);
//     const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

//     if (diffDays < 0) {
//       setInsuranceStatus({ type: 'expired', message: 'Insurance Expired! Contact Admin Immediately.' });
//     } else if (diffDays <= 30) {
//       setInsuranceStatus({ type: 'warning', message: `Attention: Insurance expiring in ${diffDays} days.` });
//     } else {
//       setInsuranceStatus({ type: 'valid', message: 'Insurance coverage is active and valid.' });
//     }
//   }, [assignedCar.insuranceExpiry]);

//   const handleCarUpdate = () => {
//     setAssignedCar({ ...tempCarData });
//     setIsEditingCar(false);
//   };

//   const [formData, setFormData] = useState({
//     date: new Date().toISOString().split('T')[0],
//     category: 'Fuel',
//     merchant: '',
//     totalAmount: '',
//     receipt: null
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.receipt) {
//       alert("Please attach a receipt before submitting.");
//       return;
//     }
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       alert("Expense submitted successfully!");
//     }, 1500);
//   };

//   return (
//     <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      
//       {/* 1. Header & Stats */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase italic leading-none">
//             My <span className="text-[#008B8B]">Expenses</span>
//           </h1>
//           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 italic">Personal Reimbursements • {instructorBranch}</p>
//         </div>
//         <div className="flex gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
//            <div className="text-right border-r border-slate-200 dark:border-slate-800 pr-4">
//              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Pending</p>
//              <p className="text-xl font-black text-orange-500 mt-1">$120.45</p>
//            </div>
//            <div className="text-right pl-2">
//              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Reimbursed</p>
//              <p className="text-xl font-black text-emerald-500 mt-1">$80.20</p>
//            </div>
//         </div>
//       </div>

//       {/* 2. INSURANCE COMPLIANCE ALERT */}
//       <div className={`p-4 rounded-2xl flex items-center gap-3 border transition-all ${
//         insuranceStatus.type === 'valid' 
//           ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-600' 
//           : 'bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20 text-rose-600 animate-pulse'
//       }`}>
//         {insuranceStatus.type === 'valid' ? <CheckCircle2 size={18}/> : <AlertTriangle size={18}/>}
//         <p className="text-[10px] font-black uppercase tracking-[0.15em]">{insuranceStatus.message}</p>
//       </div>

//       {/* 3. MY CAR MANAGEMENT SECTION */}
//       <section className="bg-white dark:bg-[#111827] text-slate-900 dark:text-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300 relative overflow-hidden group">
//         <Car className="absolute -right-10 -top-10 size-48 opacity-5 dark:opacity-10 group-hover:rotate-12 transition-transform duration-700 text-slate-900 dark:text-white" />
        
//         <div className="relative z-10">
//           <div className="flex justify-between items-center mb-8">
//             <div className="flex items-center gap-3">
//               <div className="bg-[#008B8B] p-3 rounded-2xl shadow-lg text-white">
//                 <ShieldCheck size={20} />
//               </div>
//               <div>
//                 <h2 className="text-sm font-black uppercase tracking-widest leading-none italic">My Assigned Car</h2>
//                 <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1">Asset ID: {assignedCar.id}</p>
//               </div>
//             </div>

//             {!isEditingCar ? (
//               <button 
//                 onClick={() => setIsEditingCar(true)}
//                 className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black text-slate-900 dark:text-white uppercase transition-all"
//               >
//                 <Edit3 size={14} /> Update Logs
//               </button>
//             ) : (
//               <div className="flex gap-2">
//                 <button onClick={() => setIsEditingCar(false)} className="px-4 py-2 text-[10px] font-black uppercase text-slate-400">Cancel</button>
//                 <button onClick={handleCarUpdate} className="px-5 py-2.5 bg-[#008B8B] text-white rounded-xl text-[10px] font-black uppercase shadow-lg">Save Changes</button>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//             <div className="space-y-1">
//               <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">Model</p>
//               <p className="text-sm font-black italic text-slate-900 dark:text-white">{assignedCar.model} <span className="opacity-30 ml-1">🔒</span></p>
//             </div>
//             <div className="space-y-1">
//               <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">License Plate</p>
//               <p className="text-sm font-black italic text-slate-900 dark:text-white">{assignedCar.plate} <span className="opacity-30 ml-1">🔒</span></p>
//             </div>
            
//             <EditableField isEditing={isEditingCar} label="Odometer" value={tempCarData.odometer} type="number" suffix="KM" onChange={(val) => setTempCarData({...tempCarData, odometer: val})} />
//             <EditableField isEditing={isEditingCar} label="Insurance Policy" value={tempCarData.insurancePolicy} onChange={(val) => setTempCarData({...tempCarData, insurancePolicy: val})} />
//             <EditableField isEditing={isEditingCar} label="Starting Date" value={tempCarData.insuranceStart} type="date" onChange={(val) => setTempCarData({...tempCarData, insuranceStart: val})} />
//             <EditableField isEditing={isEditingCar} label="Expiry Date" value={tempCarData.insuranceExpiry} type="date" color="text-rose-500" onChange={(val) => setTempCarData({...tempCarData, insuranceExpiry: val})} />
//           </div>
//         </div>
//       </section>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 transition-colors">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-sm font-black text-[#008B8B] uppercase tracking-[0.2em] flex items-center gap-3">
//                   <Receipt size={18} /> Transaction Details
//                 </h2>
//                 <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-500 uppercase tracking-widest">{instructorName}</span>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <ExpenseInput label="Date of Purchase" type="date" value={formData.date} onChange={(val) => setFormData({...formData, date: val})} />
//                 <ExpenseSelect label="Category" options={['Fuel', 'Maintenance', 'Parking', 'Supplies']} value={formData.category} onChange={(val) => setFormData({...formData, category: val})} />
//                 <ExpenseInput label="Merchant Name" placeholder="e.g. Petro-Canada" value={formData.merchant} onChange={(val) => setFormData({...formData, merchant: val})} />
//                 <ExpenseSelect label="Vehicle Used" options={[`${assignedCar.model} (${assignedCar.id})`]} value={formData.vehicle} onChange={(val) => setFormData({...formData, vehicle: val})} />
//               </div>
//             </section>
            
//             <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 transition-colors">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
//                 <div className="space-y-4">
//                   <label className="text-[10px] font-black text-[#008B8B] uppercase tracking-widest ml-1 flex items-center gap-2 italic">
//                     <Landmark size={14} /> Total Amount (CAD)
//                   </label>
//                   <div className="relative">
//                     <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#008B8B] font-black text-2xl">$</span>
//                     <input required type="number" step="0.01" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-3xl pl-12 pr-6 py-6 text-3xl font-black dark:text-white focus:ring-4 focus:ring-[#008B8B]/10 outline-none" placeholder="0.00" value={formData.totalAmount} onChange={(e) => setFormData({...formData, totalAmount: e.target.value})} />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Evidence / Receipt</label>
//                   <div className={`relative h-32 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 ${formData.receipt ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-200 dark:border-slate-800 hover:border-[#008B8B] hover:bg-[#008B8B]/5'}`}>
//                     <input required type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => setFormData({...formData, receipt: e.target.files[0]})} />
//                     <CloudUpload size={24} className="text-slate-400 mb-1" />
//                     <p className="text-[10px] font-black uppercase text-slate-400 italic truncate max-w-[150px]">{formData.receipt ? formData.receipt.name : "Click to Attach"}</p>
//                   </div>
//                 </div>
//               </div>
//               <button disabled={isSubmitting} className="w-full py-5 bg-[#008B8B] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50">
//                 {isSubmitting ? "Submitting..." : "Submit Claim"}
//               </button>
//             </section>
//           </form>
//         </div>

//         {/* 5. Sidebar History */}
//         <div className="space-y-6">
//           <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
//              <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/20">
//                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                   <History size={14} /> Claim History
//                 </h3>
//              </div>
//              <div className="divide-y divide-slate-100 dark:divide-slate-800">
//                 <ClaimRow date="Feb 24" cat="Fuel" price="65.00" status="Approved" />
//                 <ClaimRow date="Feb 22" cat="Service" price="120.45" status="Pending" />
//              </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- HELPER COMPONENTS ---

// const EditableField = ({ isEditing, label, value, onChange, type = "text", suffix = "", color = "" }) => (
//   <div className="space-y-1">
//     <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">{label}</p>
//     {isEditing ? (
//       <input 
//         type={type} 
//         className="bg-slate-100 dark:bg-white/10 border-none rounded-lg px-2 py-1 text-sm font-black w-full outline-none focus:ring-1 focus:ring-[#008B8B] text-slate-900 dark:text-white"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     ) : (
//       <p className={`text-sm font-black italic ${color || 'text-slate-900 dark:text-white'}`}>{value} {suffix}</p>
//     )}
//   </div>
// );

// const ExpenseInput = ({ label, type, placeholder, value, onChange }) => (
//   <div className="space-y-1.5">
//     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
//     <input 
//       required 
//       type={type} 
//       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#008B8B]/20 outline-none transition-all" 
//       placeholder={placeholder} 
//       value={value} 
//       onChange={(e) => onChange(e.target.value)} 
//     />
//   </div>
// );

// const ExpenseSelect = ({ label, options, value, onChange }) => (
//   <div className="space-y-1.5 relative">
//     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
//     <div className="relative group">
//       <select 
//         className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#008B8B]/20 outline-none appearance-none cursor-pointer transition-all" 
//         value={value} 
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//       </select>
//       <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-[#008B8B] transition-colors" />
//     </div>
//   </div>
// );

// const ClaimRow = ({ date, cat, price, status }) => (
//   <div className="p-6 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all cursor-pointer">
//     <div>
//       <p className="text-xs font-black text-slate-900 dark:text-white uppercase italic tracking-tight">{cat}</p>
//       <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase mt-0.5">{date}</p>
//     </div>
//     <div className="text-right">
//       <p className="text-sm font-black text-slate-900 dark:text-white italic">${price}</p>
//       <div className={`flex items-center justify-end gap-1 text-[8px] font-black uppercase mt-1 ${status === 'Approved' ? 'text-emerald-500' : 'text-orange-500'}`}>
//         {status === 'Approved' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
//         {status}
//       </div>
//     </div>
//   </div>
// );

// export default MyExpenses;




// import React, { useState, useEffect, useMemo } from 'react';
// import { 
//   Receipt, Car, CloudUpload, ChevronDown, Clock, CheckCircle2, 
//   ShieldCheck, Edit3, Plus, Eye, Trash2, X, FileText, AlertTriangle, Save, MessageSquare, Bell
// } from 'lucide-react';

// // Dummy data for assigned car
// const dummyAssignedCar = {
//   id: 1,
//   car_name: "Toyota Corolla 2022",
//   odometer: "45230",
//   insurance_number: "INS-8823-9942",
//   rc_number: "RC-3321-AB",
//   insurance_expiry: "2026-04-15",
//   rc_expiry: "2027-01-20",
//   number_plate: "V-882",
//   color: "Silver",
//   model: "Corolla LE"
// };

// // Dummy expenses data
// const dummyExpenses = [
//   {
//     id: 1,
//     category: "Fuel",
//     amount: 85.50,
//     status: "approved",
//     payment_method: "card",
//     description: "Fuel for highway driving lessons in Burin area. 2 full tanks for student practice sessions.",
//     receipt_path: "dummy-receipt-1.pdf",
//     admin_remarks: "Approved - Valid fuel expense",
//     created_at: "2026-03-15"
//   },
//   {
//     id: 2,
//     category: "Maintenance",
//     amount: 450.00,
//     status: "pending",
//     payment_method: "cash",
//     description: "Vehicle V-882 - Oil change, tire rotation, and brake inspection. Regular monthly maintenance.",
//     receipt_path: "dummy-receipt-2.pdf",
//     admin_remarks: "",
//     created_at: "2026-03-14"
//   },
//   {
//     id: 3,
//     category: "Parking",
//     amount: 25.00,
//     status: "pending",
//     payment_method: "cash",
//     description: "Parking fee at downtown St. John's during student pickup.",
//     receipt_path: "dummy-receipt-3.pdf",
//     admin_remarks: "",
//     created_at: "2026-03-13"
//   },
//   {
//     id: 4,
//     category: "Fuel",
//     amount: 120.75,
//     status: "approved",
//     payment_method: "online",
//     description: "Fuel for Marystown to Burin student pickups. 3 round trips this week.",
//     receipt_path: "dummy-receipt-4.pdf",
//     admin_remarks: "Approved - Valid travel expenses",
//     created_at: "2026-03-12"
//   },
//   {
//     id: 5,
//     category: "Supplies",
//     amount: 35.99,
//     status: "pending",
//     payment_method: "cash",
//     description: "Training cones for parallel parking practice. Purchased from local sports store.",
//     receipt_path: "dummy-receipt-5.pdf",
//     admin_remarks: "",
//     created_at: "2026-03-11"
//   },
//   {
//     id: 6,
//     category: "Maintenance",
//     amount: 320.50,
//     status: "pending",
//     payment_method: "card",
//     description: "Windshield replacement for vehicle V-883. Stone chip cracked during highway lesson.",
//     receipt_path: "dummy-receipt-6.pdf",
//     admin_remarks: "",
//     created_at: "2026-03-10"
//   }
// ];

// const MyExpenses = () => {
//   const [loading, setLoading] = useState(false);
//   const [expenses, setExpenses] = useState([]);
//   const [assignedCar, setAssignedCar] = useState(null);
//   const [isEditingCar, setIsEditingCar] = useState(false);
//   const [carFormData, setCarFormData] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedExpense, setSelectedExpense] = useState(null);
//   const [isEditingExpense, setIsEditingExpense] = useState(false); 
  
//   const [formData, setFormData] = useState({
//     category: 'Fuel', 
//     payment_method: 'cash', 
//     amount: '', 
//     description: '', 
//     receipt: null,
//     id: null
//   });

//   // --- LOGIC: CHECK FOR EXPIRY IN 1 MONTH ---
//   const expiryAlerts = useMemo(() => {
//     if (!assignedCar) return [];
//     const alerts = [];
//     const today = new Date();
//     const nextMonth = new Date();
//     nextMonth.setMonth(today.getMonth() + 1);

//     const checkExpiry = (dateStr, label) => {
//       if (!dateStr) return;
//       const expiryDate = new Date(dateStr);
//       if (expiryDate <= nextMonth && expiryDate >= today) {
//         alerts.push(`${label} is expiring soon (${dateStr})`);
//       } else if (expiryDate < today) {
//         alerts.push(`${label} has EXPIRED!`);
//       }
//     };

//     checkExpiry(assignedCar.insurance_expiry, "Insurance");
//     checkExpiry(assignedCar.rc_expiry, "RC Document");
    
//     return alerts;
//   }, [assignedCar]);

//   // Initialize with dummy data
//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => {
//       setAssignedCar(dummyAssignedCar);
//       setCarFormData({
//         odometer: dummyAssignedCar.odometer,
//         insurance_number: dummyAssignedCar.insurance_number,
//         rc_number: dummyAssignedCar.rc_number,
//         insurance_expiry: dummyAssignedCar.insurance_expiry?.split('T')[0] || '',
//         rc_expiry: dummyAssignedCar.rc_expiry?.split('T')[0] || '',
//       });
//       setExpenses(dummyExpenses);
//       setLoading(false);
//     }, 500);
//   }, []);

//   const handleCarUpdate = async () => {
//     // Simulate API call
//     setTimeout(() => {
//       setAssignedCar({
//         ...assignedCar,
//         odometer: carFormData.odometer,
//         insurance_number: carFormData.insurance_number,
//         rc_number: carFormData.rc_number,
//         insurance_expiry: carFormData.insurance_expiry,
//         rc_expiry: carFormData.rc_expiry,
//       });
//       setIsEditingCar(false);
//       alert("Vehicle logs updated.");
//     }, 500);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (isEditingExpense) {
//       // Update existing expense
//       const updatedExpenses = expenses.map(exp => 
//         exp.id === formData.id 
//           ? { 
//               ...exp, 
//               category: formData.category,
//               payment_method: formData.payment_method,
//               amount: parseFloat(formData.amount),
//               description: formData.description,
//               status: 'pending'
//             }
//           : exp
//       );
//       setExpenses(updatedExpenses);
//       alert("Claim updated successfully!");
//     } else {
//       // Create new expense
//       const newExpense = {
//         id: expenses.length + 1,
//         category: formData.category,
//         amount: parseFloat(formData.amount),
//         status: "pending",
//         payment_method: formData.payment_method,
//         description: formData.description,
//         receipt_path: `dummy-receipt-${expenses.length + 1}.pdf`,
//         admin_remarks: "",
//         created_at: new Date().toISOString().split('T')[0]
//       };
//       setExpenses([newExpense, ...expenses]);
//       alert("Claim submitted successfully!");
//     }
    
//     setIsModalOpen(false);
//     setIsEditingExpense(false);
//     setFormData({
//       category: 'Fuel', 
//       payment_method: 'cash', 
//       amount: '', 
//       description: '', 
//       receipt: null,
//       id: null
//     });
//   };

//   const handleDeleteExpense = (expenseId) => {
//     if (window.confirm("Are you sure you want to delete this claim?")) {
//       setExpenses(expenses.filter(exp => exp.id !== expenseId));
//       setSelectedExpense(null);
//       alert("Claim deleted successfully!");
//     }
//   };

//   const startEditExpense = (expense) => {
//     setFormData({
//       category: expense.category,
//       payment_method: expense.payment_method,
//       amount: expense.amount,
//       description: expense.description,
//       receipt: null,
//       id: expense.id
//     });
//     setIsEditingExpense(true);
//     setIsModalOpen(true);
//     setSelectedExpense(null);
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#020617] flex items-center justify-center">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent mx-auto mb-4"></div>
//         <p className="text-gray-600 dark:text-white font-black uppercase italic">Syncing...</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto space-y-8 pb-20 p-4 bg-gray-50 dark:bg-[#020617] min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-['Sora'] font-bold tracking-tight text-slate-800 dark:text-white">
//             My <span className="text-teal-600">Expenses</span>
//           </h1>
//           <p className="text-[0.65rem] font-['DM_Mono'] text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
//             Track and manage your expense claims
//           </p>
//         </div>
//         <button 
//           onClick={() => { setIsEditingExpense(false); setIsModalOpen(true); setFormData({
//             category: 'Fuel', 
//             payment_method: 'cash', 
//             amount: '', 
//             description: '', 
//             receipt: null,
//             id: null
//           }); }} 
//           className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-['DM_Mono'] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
//         >
//           <Plus size={16} /> New Claim
//         </button>
//       </div>

//       {/* VEHICLE SECTION WITH EXPIRY ALERTS */}
//       {assignedCar && (
//         <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-md">
//           <Car className="absolute -right-10 -top-10 size-40 opacity-5 dark:opacity-10 text-gray-400 dark:text-white" />
          
//           <div className="relative z-10 space-y-5">
//             {/* --- EXPIRY ALERT BANNER --- */}
//             {expiryAlerts.length > 0 && (
//               <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 p-4 rounded-xl flex items-center gap-4">
//                 <div className="bg-rose-500 p-2 rounded-lg text-white shadow-lg shadow-rose-500/20">
//                   <Bell size={18}/>
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-[9px] font-['DM_Mono'] font-bold uppercase text-rose-600 dark:text-rose-400 tracking-wider">Compliance Warning</p>
//                   <div className="flex flex-wrap gap-x-4 gap-y-1">
//                     {expiryAlerts.map((msg, i) => (
//                       <span key={i} className="text-xs font-['DM_Sans'] font-medium text-rose-700 dark:text-rose-300 italic">• {msg}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <div className="bg-teal-50 dark:bg-teal-950/30 p-2 rounded-lg">
//                   <ShieldCheck size={18} className="text-teal-600 dark:text-teal-400" />
//                 </div>
//                 <h2 className="text-xs font-['DM_Mono'] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Vehicle Assets</h2>
//               </div>
//               {!isEditingCar ? (
//                 <button 
//                   onClick={() => setIsEditingCar(true)} 
//                   className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-['DM_Mono'] font-bold uppercase text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
//                 >
//                   <Edit3 size={12} /> Update Logs
//                 </button>
//               ) : (
//                 <div className="flex gap-2">
//                   <button 
//                     onClick={() => setIsEditingCar(false)} 
//                     className="px-3 py-1.5 text-[9px] font-['DM_Mono'] font-bold uppercase text-slate-500 hover:text-slate-700 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={handleCarUpdate} 
//                     className="bg-teal-600 px-4 py-1.5 rounded-lg text-[9px] font-['DM_Mono'] font-bold uppercase text-white hover:bg-teal-700 transition-all"
//                   >
//                     <Save size={12} className="inline mr-1"/> Save
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//               <StaticField label="Model" value={assignedCar.car_name} locked />
//               <EditableField isEditing={isEditingCar} label="Odometer" value={carFormData.odometer} onChange={(v) => setCarFormData({...carFormData, odometer: v})} type="number" />
//               <EditableField isEditing={isEditingCar} label="Policy No" value={carFormData.insurance_number} onChange={(v) => setCarFormData({...carFormData, insurance_number: v})} />
//               <EditableField isEditing={isEditingCar} label="RC Number" value={carFormData.rc_number} onChange={(v) => setCarFormData({...carFormData, rc_number: v})} />
//               <EditableField isEditing={isEditingCar} label="Ins. Expiry" value={carFormData.insurance_expiry} onChange={(v) => setCarFormData({...carFormData, insurance_expiry: v})} type="date" color={expiryAlerts.some(m => m.includes("Insurance")) ? "text-rose-600 dark:text-rose-400 underline" : ""} />
//               <EditableField isEditing={isEditingCar} label="RC Expiry" value={carFormData.rc_expiry} onChange={(v) => setCarFormData({...carFormData, rc_expiry: v})} type="date" color={expiryAlerts.some(m => m.includes("RC Document")) ? "text-rose-600 dark:text-rose-400 underline" : ""} />
//             </div>
//           </div>
//         </section>
//       )}

//       {/* EXPENSE TABLE */}
//       <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[500px]">
//             <thead>
//               <tr className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
//                 <th className="px-6 py-4 text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Category</th>
//                 <th className="px-6 py-4 text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider text-center">Amount</th>
//                 <th className="px-6 py-4 text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider text-center">Status</th>
//                 <th className="px-6 py-4 text-[10px] font-['DM_Mono'] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider text-right">Action</th>
//                </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
//               {expenses.map((ex) => (
//                 <tr key={ex.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
//                   <td className="px-6 py-4 font-['DM_Sans'] font-semibold text-slate-800 dark:text-white text-sm">{ex.category}</td>
//                   <td className="px-6 py-4 text-center font-['DM_Sans'] font-semibold text-slate-800 dark:text-white">${ex.amount}</td>
//                   <td className="px-6 py-4 text-center">
//                     <span className={`px-2.5 py-1 rounded-lg text-[9px] font-['DM_Mono'] font-bold uppercase ${
//                       ex.status === 'approved' 
//                         ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
//                         : 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
//                     }`}>
//                       {ex.status}
//                     </span>
//                    </td>
//                   <td className="px-6 py-4 text-right">
//                     <button 
//                       onClick={() => setSelectedExpense(ex)} 
//                       className="p-2 text-slate-400 hover:text-teal-600 transition-colors"
//                       title="View Details"
//                     >
//                       <Eye size={18} />
//                     </button>
//                    </td>
//                  </tr>
//               ))}
//             </tbody>
//            </table>
//         </div>
//         {expenses.length === 0 && (
//           <div className="p-10 text-center">
//             <p className="text-slate-400 font-['DM_Mono'] text-sm">No expenses found</p>
//           </div>
//         )}
//       </div>

//       {/* VIEW MODAL WITH ADMIN REMARKS */}
//       {selectedExpense && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in zoom-in duration-200">
//           <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
//             <div className="p-5 bg-slate-50 dark:bg-slate-800/30 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
//               <h3 className="text-sm font-['DM_Mono'] font-bold uppercase text-teal-600">Claim Detail</h3>
//               <button onClick={() => setSelectedExpense(null)} className="text-slate-400 hover:text-slate-600">
//                 <X size={18}/>
//               </button>
//             </div>
//             <div className="p-5 space-y-5">
//               {selectedExpense.admin_remarks && (
//                 <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 rounded-lg flex gap-2">
//                   <div className="bg-rose-500 p-1.5 rounded-lg text-white h-fit">
//                     <MessageSquare size={12}/>
//                   </div>
//                   <div>
//                     <p className="text-[7px] font-['DM_Mono'] font-bold text-rose-600 dark:text-rose-400 uppercase mb-1">Admin Feedback</p>
//                     <p className="text-xs font-['DM_Sans'] font-medium text-rose-700 dark:text-rose-300 italic">"{selectedExpense.admin_remarks}"</p>
//                   </div>
//                 </div>
//               )}
//               <div className="grid grid-cols-2 gap-4 text-center">
//                 <DetailItem label="Status" value={selectedExpense.status} color={selectedExpense.status === 'approved' ? 'text-emerald-600' : 'text-amber-600'} />
//                 <DetailItem label="Total" value={`$${selectedExpense.amount}`} />
//                 <DetailItem label="Category" value={selectedExpense.category} />
//                 <DetailItem label="Method" value={selectedExpense.payment_method} />
//               </div>
//               <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
//                 <p className="text-[8px] font-['DM_Mono'] font-bold text-teal-600 uppercase mb-1">Description</p>
//                 <p className="text-xs font-['DM_Sans'] text-slate-700 dark:text-slate-300">
//                   {selectedExpense.description || 'No notes.'}
//                 </p>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
//                 <div className="flex items-center gap-2 text-[9px] font-['DM_Mono'] font-bold uppercase text-slate-600">
//                   <FileText size={12} className="text-teal-600"/> Receipt
//                 </div>
//                 <button className="text-[8px] font-['DM_Mono'] font-bold text-teal-600 uppercase hover:text-teal-700 transition-colors">
//                   View Document
//                 </button>
//               </div>
//               {selectedExpense.status === 'pending' && (
//                 <div className="grid grid-cols-2 gap-3 pt-2">
//                   <button 
//                     onClick={() => startEditExpense(selectedExpense)} 
//                     className="py-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg font-['DM_Mono'] font-bold text-[9px] uppercase text-slate-700 hover:bg-slate-200 transition-colors"
//                   >
//                     <Edit3 size={12} className="inline mr-1"/> Edit
//                   </button>
//                   <button 
//                     onClick={() => handleDeleteExpense(selectedExpense.id)} 
//                     className="py-2.5 bg-rose-50 dark:bg-rose-950/30 text-rose-600 rounded-lg font-['DM_Mono'] font-bold text-[9px] uppercase hover:bg-rose-100 transition-colors"
//                   >
//                     <Trash2 size={12} className="inline mr-1"/> Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ADD/EDIT MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
//           <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl">
//             <h2 className="text-lg font-['Sora'] font-bold text-teal-600 mb-5">
//               {isEditingExpense ? "Edit Claim" : "New Reimbursement"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div className="grid grid-cols-2 gap-4">
//                 <ExpenseSelect label="Category" options={['Fuel', 'Maintenance', 'Parking', 'Supplies']} value={formData.category} onChange={(v)=>setFormData({...formData, category:v})}/>
//                 <ExpenseSelect label="Payment" options={['cash', 'online', 'card']} value={formData.payment_method} onChange={(v)=>setFormData({...formData, payment_method:v})}/>
//                 <ExpenseInput label="Amount ($)" type="number" placeholder="0.00" value={formData.amount} onChange={(v)=>setFormData({...formData, amount:v})}/>
//                 <div className="space-y-1">
//                   <label className="text-[9px] font-['DM_Mono'] font-bold text-slate-500 uppercase tracking-wider">Receipt</label>
//                   <div className="relative h-12 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:border-teal-500 transition-colors cursor-pointer">
//                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e)=>setFormData({...formData, receipt: e.target.files[0]})}/>
//                     <CloudUpload size={14}/>
//                     <p className="ml-1 text-[8px] font-['DM_Mono'] font-bold uppercase">
//                       {formData.receipt ? formData.receipt.name : "Attach Image"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <textarea 
//                 className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm font-['DM_Sans'] min-h-[80px] outline-none focus:ring-2 focus:ring-teal-500/50 transition-all" 
//                 placeholder="Reimbursement details..." 
//                 value={formData.description} 
//                 onChange={(e)=>setFormData({...formData, description:e.target.value})}
//               />
//               <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg font-['DM_Mono'] font-bold text-xs uppercase tracking-wider hover:bg-teal-700 transition-all active:scale-95">
//                 {isEditingExpense ? "Update Claim" : "Submit Claim"}
//               </button>
//               <button 
//                 type="button" 
//                 onClick={() => { setIsModalOpen(false); setIsEditingExpense(false); }} 
//                 className="w-full text-slate-500 font-['DM_Mono'] font-bold text-[9px] uppercase hover:text-slate-700 transition-colors"
//               >
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // --- HELPERS ---
// const StaticField = ({ label, value, locked }) => (
//   <div className="space-y-1">
//     <p className="text-[8px] font-['DM_Mono'] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
//     <p className="text-sm font-['DM_Sans'] font-semibold text-slate-800 dark:text-white">
//       {value || 'N/A'} {locked && <span className="opacity-20 ml-1">🔒</span>}
//     </p>
//   </div>
// );

// const EditableField = ({ isEditing, label, value, onChange, type = "text", color = "" }) => (
//   <div className="space-y-1">
//     <p className="text-[8px] font-['DM_Mono'] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
//     {isEditing ? (
//       <input 
//         type={type} 
//         className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-sm font-['DM_Sans'] outline-none focus:ring-2 focus:ring-teal-500/50" 
//         value={value || ''} 
//         onChange={(e) => onChange(e.target.value)} 
//       />
//     ) : (
//       <p className={`text-sm font-['DM_Sans'] font-semibold ${color || 'text-slate-800 dark:text-white'}`}>
//         {value || 'N/A'}
//       </p>
//     )}
//   </div>
// );

// const DetailItem = ({ label, value, color }) => (
//   <div>
//     <p className="text-[7px] font-['DM_Mono'] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
//     <p className={`text-sm font-['DM_Sans'] font-semibold ${color || 'text-slate-800 dark:text-white'}`}>{value}</p>
//   </div>
// );

// const ExpenseInput = ({ label, type, placeholder, value, onChange }) => (
//   <div className="space-y-1">
//     <label className="text-[9px] font-['DM_Mono'] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
//     <input 
//       required 
//       type={type} 
//       className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-['DM_Sans'] text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/50 transition-all" 
//       placeholder={placeholder} 
//       value={value} 
//       onChange={(e)=>onChange(e.target.value)}
//     />
//   </div>
// );

// const ExpenseSelect = ({ label, options, value, onChange }) => (
//   <div className="space-y-1">
//     <label className="text-[9px] font-['DM_Mono'] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
//     <select 
//       className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-['DM_Sans'] text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-teal-500/50 transition-all" 
//       value={value} 
//       onChange={(e)=>onChange(e.target.value)}
//     >
//       {options.map(o => <option key={o} value={o}>{o}</option>)}
//     </select>
//   </div>
// );

// export default MyExpenses;













import React, { useState, useEffect, useMemo } from 'react';
import { 
  Receipt, Car, CloudUpload, ChevronDown, Clock, CheckCircle2, 
  ShieldCheck, Edit3, Plus, Eye, Trash2, X, FileText, AlertTriangle, Save, MessageSquare, Bell, Search, ScanEye
} from 'lucide-react';

// Dummy data for assigned car
const dummyAssignedCar = {
  id: 1,
  car_name: "Toyota Corolla 2022",
  odometer: "45230",
  insurance_number: "INS-8823-9942",
  rc_number: "RC-3321-AB",
  insurance_expiry: "2026-04-15",
  rc_expiry: "2027-01-20",
  number_plate: "V-882",
  color: "Silver",
  model: "Corolla LE"
};

// Dummy expenses data
const dummyExpenses = [
  {
    id: 1,
    category: "Fuel",
    amount: 85.50,
    status: "approved",
    payment_method: "card",
    description: "Fuel for highway driving lessons in Burin area. 2 full tanks for student practice sessions.",
    receipt_path: "dummy-receipt-1.pdf",
    admin_remarks: "Approved - Valid fuel expense",
    created_at: "2026-03-15"
  },
  {
    id: 2,
    category: "Maintenance",
    amount: 450.00,
    status: "pending",
    payment_method: "cash",
    description: "Vehicle V-882 - Oil change, tire rotation, and brake inspection. Regular monthly maintenance.",
    receipt_path: "dummy-receipt-2.pdf",
    admin_remarks: "",
    created_at: "2026-03-14"
  },
  {
    id: 3,
    category: "Parking",
    amount: 25.00,
    status: "pending",
    payment_method: "cash",
    description: "Parking fee at downtown St. John's during student pickup.",
    receipt_path: "dummy-receipt-3.pdf",
    admin_remarks: "",
    created_at: "2026-03-13"
  },
  {
    id: 4,
    category: "Fuel",
    amount: 120.75,
    status: "approved",
    payment_method: "online",
    description: "Fuel for Marystown to Burin student pickups. 3 round trips this week.",
    receipt_path: "dummy-receipt-4.pdf",
    admin_remarks: "Approved - Valid travel expenses",
    created_at: "2026-03-12"
  },
  {
    id: 5,
    category: "Supplies",
    amount: 35.99,
    status: "pending",
    payment_method: "cash",
    description: "Training cones for parallel parking practice. Purchased from local sports store.",
    receipt_path: "dummy-receipt-5.pdf",
    admin_remarks: "",
    created_at: "2026-03-11"
  },
  {
    id: 6,
    category: "Maintenance",
    amount: 320.50,
    status: "pending",
    payment_method: "card",
    description: "Windshield replacement for vehicle V-883. Stone chip cracked during highway lesson.",
    receipt_path: "dummy-receipt-6.pdf",
    admin_remarks: "",
    created_at: "2026-03-10"
  }
];

const MyExpenses = () => {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [assignedCar, setAssignedCar] = useState(null);
  const [isEditingCar, setIsEditingCar] = useState(false);
  const [carFormData, setCarFormData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditingExpense, setIsEditingExpense] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [formData, setFormData] = useState({
    category: 'Fuel', 
    payment_method: 'cash', 
    amount: '', 
    description: '', 
    receipt: null,
    id: null
  });

  // --- LOGIC: CHECK FOR EXPIRY IN 1 MONTH ---
  const expiryAlerts = useMemo(() => {
    if (!assignedCar) return [];
    const alerts = [];
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    const checkExpiry = (dateStr, label) => {
      if (!dateStr) return;
      const expiryDate = new Date(dateStr);
      if (expiryDate <= nextMonth && expiryDate >= today) {
        alerts.push(`${label} is expiring soon (${dateStr})`);
      } else if (expiryDate < today) {
        alerts.push(`${label} has EXPIRED!`);
      }
    };

    checkExpiry(assignedCar.insurance_expiry, "Insurance");
    checkExpiry(assignedCar.rc_expiry, "RC Document");
    
    return alerts;
  }, [assignedCar]);

  // Initialize with dummy data
  useEffect(() => {
    setTimeout(() => {
      setAssignedCar(dummyAssignedCar);
      setCarFormData({
        odometer: dummyAssignedCar.odometer,
        insurance_number: dummyAssignedCar.insurance_number,
        rc_number: dummyAssignedCar.rc_number,
        insurance_expiry: dummyAssignedCar.insurance_expiry?.split('T')[0] || '',
        rc_expiry: dummyAssignedCar.rc_expiry?.split('T')[0] || '',
      });
      setExpenses(dummyExpenses);
      setLoading(false);
    }, 500);
  }, []);

  // Filter expenses
  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || exp.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleCarUpdate = async () => {
    setTimeout(() => {
      setAssignedCar({
        ...assignedCar,
        odometer: carFormData.odometer,
        insurance_number: carFormData.insurance_number,
        rc_number: carFormData.rc_number,
        insurance_expiry: carFormData.insurance_expiry,
        rc_expiry: carFormData.rc_expiry,
      });
      setIsEditingCar(false);
      alert("Vehicle logs updated.");
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isEditingExpense) {
      const updatedExpenses = expenses.map(exp => 
        exp.id === formData.id 
          ? { 
              ...exp, 
              category: formData.category,
              payment_method: formData.payment_method,
              amount: parseFloat(formData.amount),
              description: formData.description,
              status: 'pending'
            }
          : exp
      );
      setExpenses(updatedExpenses);
      alert("Claim updated successfully!");
    } else {
      const newExpense = {
        id: expenses.length + 1,
        category: formData.category,
        amount: parseFloat(formData.amount),
        status: "pending",
        payment_method: formData.payment_method,
        description: formData.description,
        receipt_path: `dummy-receipt-${expenses.length + 1}.pdf`,
        admin_remarks: "",
        created_at: new Date().toISOString().split('T')[0]
      };
      setExpenses([newExpense, ...expenses]);
      alert("Claim submitted successfully!");
    }
    
    setIsModalOpen(false);
    setIsEditingExpense(false);
    setFormData({
      category: 'Fuel', 
      payment_method: 'cash', 
      amount: '', 
      description: '', 
      receipt: null,
      id: null
    });
  };

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      setExpenses(expenses.filter(exp => exp.id !== expenseId));
      setSelectedExpense(null);
      alert("Claim deleted successfully!");
    }
  };

  const startEditExpense = (expense) => {
    setFormData({
      category: expense.category,
      payment_method: expense.payment_method,
      amount: expense.amount,
      description: expense.description,
      receipt: null,
      id: expense.id
    });
    setIsEditingExpense(true);
    setIsModalOpen(true);
    setSelectedExpense(null);
  };

  // Calculate stats
  const totalApproved = expenses.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.amount, 0);
  const totalPending = expenses.filter(e => e.status === 'pending').length;

  if (loading) return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-sm font-mono text-slate-500">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
      
      {/* HEADER */}
      <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
              My <span className="text-teal-600 dark:text-teal-400">Expenses</span>
            </h1>
            <p className="text-[0.65rem] font-sora text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
              Track and manage your expense claims
            </p>
          </div>
          <button 
            onClick={() => { setIsEditingExpense(false); setIsModalOpen(true); setFormData({
              category: 'Fuel', 
              payment_method: 'cash', 
              amount: '', 
              description: '', 
              receipt: null,
              id: null
            }); }} 
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all"
          >
            <Plus size={14} /> New Claim
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 md:px-8 pb-8 overflow-y-auto custom-scrollbar">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-1">Total Approved</p>
            <p className="text-xl font-semibold text-teal-600">${totalApproved.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-1">Pending Claims</p>
            <p className="text-xl font-semibold text-amber-600">{totalPending}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
            <p className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-1">Total Claims</p>
            <p className="text-xl font-semibold text-slate-800 dark:text-white">{expenses.length}</p>
          </div>
        </div>

        {/* Vehicle Section */}
        {assignedCar && (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Car size={16} className="text-teal-500" />
                <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Vehicle Assets</h3>
              </div>
              {!isEditingCar ? (
                <button 
                  onClick={() => setIsEditingCar(true)} 
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[0.65rem] font-medium text-slate-700 hover:bg-slate-200 transition-all"
                >
                  <Edit3 size={12} /> Update Logs
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsEditingCar(false)} 
                    className="px-3 py-1 text-[0.65rem] font-medium text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleCarUpdate} 
                    className="bg-teal-500 px-3 py-1 rounded-lg text-[0.65rem] font-medium text-white hover:bg-teal-600"
                  >
                    <Save size={12} className="inline mr-1"/> Save
                  </button>
                </div>
              )}
            </div>
            
            {expiryAlerts.length > 0 && (
              <div className="mx-4 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                <Bell size={14} className="text-red-500" />
                <div className="flex flex-wrap gap-2">
                  {expiryAlerts.map((msg, i) => (
                    <span key={i} className="text-[0.65rem] text-red-600 dark:text-red-400">{msg}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <StaticField label="Model" value={assignedCar.car_name} />
                <EditableField isEditing={isEditingCar} label="Odometer" value={carFormData.odometer} onChange={(v) => setCarFormData({...carFormData, odometer: v})} type="number" />
                <EditableField isEditing={isEditingCar} label="Policy No" value={carFormData.insurance_number} onChange={(v) => setCarFormData({...carFormData, insurance_number: v})} />
                <EditableField isEditing={isEditingCar} label="RC Number" value={carFormData.rc_number} onChange={(v) => setCarFormData({...carFormData, rc_number: v})} />
                <EditableField isEditing={isEditingCar} label="Ins. Expiry" value={carFormData.insurance_expiry} onChange={(v) => setCarFormData({...carFormData, insurance_expiry: v})} type="date" />
                <EditableField isEditing={isEditingCar} label="RC Expiry" value={carFormData.rc_expiry} onChange={(v) => setCarFormData({...carFormData, rc_expiry: v})} type="date" />
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-6">
          <div className="grid grid-cols-2 md:flex gap-2 flex-1">
            <div className="group relative">
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
              >
                <option>All</option>
                <option>pending</option>
                <option>approved</option>
              </select>
            </div>

            <div className="group relative hidden md:block">
              <select 
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
              >
                <option>All Categories</option>
                <option>Fuel</option>
                <option>Maintenance</option>
                <option>Parking</option>
                <option>Supplies</option>
              </select>
            </div>
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search by category or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Expenses Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                <tr className="text-[0.75rem] font-sora font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3 text-center">Amount</th>
                  <th className="px-5 py-3 text-center">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-5 py-3">
                      <span className="text-[0.8rem] font-medium text-slate-800 dark:text-white">{exp.category}</span>
                      <p className="text-[0.55rem] font-mono text-slate-400 mt-0.5">{exp.created_at}</p>
                     </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-[0.8rem] font-semibold text-teal-600">${exp.amount.toFixed(2)}</span>
                     </td>
                    <td className="px-5 py-3 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[0.6rem] font-sora font-semibold uppercase tracking-wider ${
                        exp.status === 'approved' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      }`}>
                        {exp.status}
                      </span>
                     </td>
                    <td className="px-5 py-3 text-right">
                      <button 
                        onClick={() => setSelectedExpense(exp)} 
                        className="p-1.5 text-slate-400 dark:text-slate-500 rounded-lg transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 active:scale-95"
                        title="View Details"
                      >
                        <ScanEye size={18} className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
                      </button>
                     </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredExpenses.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[0.7rem] font-sora text-slate-400">No expenses found matching your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedExpense && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/30">
              <h3 className="text-sm font-semibold text-teal-600">Claim Details</h3>
              <button onClick={() => setSelectedExpense(null)} className="p-1 hover:bg-slate-100 rounded-lg">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {selectedExpense.admin_remarks && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-2">
                  <MessageSquare size={14} className="text-red-500" />
                  <div>
                    <p className="text-[0.55rem] font-mono font-semibold text-red-600 mb-1">Admin Feedback</p>
                    <p className="text-[0.7rem] text-red-700 dark:text-red-300">"{selectedExpense.admin_remarks}"</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <DetailItem label="Status" value={selectedExpense.status} color={selectedExpense.status === 'approved' ? 'text-green-600' : 'text-amber-600'} />
                <DetailItem label="Amount" value={`$${selectedExpense.amount}`} />
                <DetailItem label="Category" value={selectedExpense.category} />
                <DetailItem label="Method" value={selectedExpense.payment_method} />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3">
                <p className="text-[0.55rem] font-mono font-semibold text-teal-600 mb-1">Description</p>
                <p className="text-[0.7rem] text-slate-600 dark:text-slate-300">{selectedExpense.description || 'No description'}</p>
              </div>
              {selectedExpense.status === 'pending' && (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button 
                    onClick={() => startEditExpense(selectedExpense)} 
                    className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[0.65rem] font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <Edit3 size={12} className="inline mr-1"/> Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteExpense(selectedExpense.id)} 
                    className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg text-[0.65rem] font-medium hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={12} className="inline mr-1"/> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-sm font-semibold text-teal-600">{isEditingExpense ? "Edit Claim" : "New Reimbursement"}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <ExpenseSelect label="Category" options={['Fuel', 'Maintenance', 'Parking', 'Supplies']} value={formData.category} onChange={(v)=>setFormData({...formData, category:v})}/>
                <ExpenseSelect label="Payment" options={['cash', 'online', 'card']} value={formData.payment_method} onChange={(v)=>setFormData({...formData, payment_method:v})}/>
                <ExpenseInput label="Amount ($)" type="number" placeholder="0.00" value={formData.amount} onChange={(v)=>setFormData({...formData, amount:v})}/>
                <div>
                  <label className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-1 block">Receipt</label>
                  <div className="relative h-10 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:border-teal-500 transition-colors cursor-pointer">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e)=>setFormData({...formData, receipt: e.target.files[0]})}/>
                    <CloudUpload size={12}/>
                    <p className="ml-1 text-[0.6rem] font-mono truncate max-w-[120px]">
                      {formData.receipt ? formData.receipt.name : "Attach"}
                    </p>
                  </div>
                </div>
              </div>
              <textarea 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-[0.7rem] font-sora min-h-[80px] outline-none focus:ring-1 focus:ring-teal-500" 
                placeholder="Reimbursement details..." 
                value={formData.description} 
                onChange={(e)=>setFormData({...formData, description:e.target.value})}
              />
              <button type="submit" className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all">
                {isEditingExpense ? "Update Claim" : "Submit Claim"}
              </button>
              <button 
                type="button" 
                onClick={() => { setIsModalOpen(false); setIsEditingExpense(false); }} 
                className="w-full text-[0.65rem] font-medium text-slate-500 hover:text-slate-700 transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- HELPERS ---
const StaticField = ({ label, value }) => (
  <div>
    <p className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-0.5">{label}</p>
    <p className="text-[0.7rem] font-medium text-slate-800 dark:text-white">{value || 'N/A'}</p>
  </div>
);

const EditableField = ({ isEditing, label, value, onChange, type = "text" }) => (
  <div>
    <p className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-0.5">{label}</p>
    {isEditing ? (
      <input 
        type={type} 
        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-[0.7rem] font-sora outline-none focus:ring-1 focus:ring-teal-500" 
        value={value || ''} 
        onChange={(e) => onChange(e.target.value)} 
      />
    ) : (
      <p className="text-[0.7rem] font-medium text-slate-800 dark:text-white">{value || 'N/A'}</p>
    )}
  </div>
);

const DetailItem = ({ label, value, color }) => (
  <div>
    <p className="text-[0.5rem] font-mono font-semibold text-slate-400 mb-0.5">{label}</p>
    <p className={`text-[0.7rem] font-medium ${color || 'text-slate-800 dark:text-white'}`}>{value}</p>
  </div>
);

const ExpenseInput = ({ label, type, placeholder, value, onChange }) => (
  <div>
    <label className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-0.5 block">{label}</label>
    <input 
      required 
      type={type} 
      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-[0.7rem] font-sora outline-none focus:ring-1 focus:ring-teal-500" 
      placeholder={placeholder} 
      value={value} 
      onChange={(e)=>onChange(e.target.value)}
    />
  </div>
);

const ExpenseSelect = ({ label, options, value, onChange }) => (
  <div>
    <label className="text-[0.55rem] font-mono font-semibold text-slate-500 mb-0.5 block">{label}</label>
    <select 
      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1.5 text-[0.7rem] font-sora outline-none focus:ring-1 focus:ring-teal-500" 
      value={value} 
      onChange={(e)=>onChange(e.target.value)}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default MyExpenses;