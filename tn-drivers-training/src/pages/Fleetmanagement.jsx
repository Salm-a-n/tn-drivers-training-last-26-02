// import React, { useState, useMemo, useEffect } from 'react';
// import VehicleDetailModal from '../components/VehicleDetailModal';
// import RegisterVehicleModal from '../components/RegisterVehicleModal';
// import Pagination from '../components/Pagination';
// import {
//     Search, Car, MapPin, User, Plus,
//     ChevronRight, Filter, AlertTriangle, ShieldAlert, Loader2, ScanEye
// } from 'lucide-react';

// // Dummy Data
// const dummyVehicles = [
//     {
//         id: 1,
//         vin: "2T1BURHE3NC123456",
//         name: "2022 Toyota Corolla",
//         plate: "V-882",
//         location: "Burin",
//         location_id: 1,
//         instructor: "Jean Dupont",
//         instructor_id: 1,
//         winterReady: true,
//         status: "Available",
//         km: "45230",
//         color: "Silver",
//         insuranceNo: "INS-12345",
//         insuranceExpiry: "2026-12-01",
//         rcNo: "RC-12345",
//         rcExpiry: "2027-05-15",
//         carDocument: null
//     },
//     {
//         id: 2,
//         vin: "1HGCP2F85NA987654",
//         name: "2023 Honda Civic",
//         plate: "V-104",
//         location: "St. John's",
//         location_id: 2,
//         instructor: "Sarah Miller",
//         instructor_id: 2,
//         winterReady: false,
//         status: "In Session",
//         km: "12500",
//         color: "Blue",
//         insuranceNo: "INS-67890",
//         insuranceExpiry: "2026-06-01",
//         rcNo: "RC-67890",
//         rcExpiry: "2026-06-20",
//         carDocument: null
//     },
//     {
//         id: 3,
//         vin: "JM1BP1U74M1654321",
//         name: "2021 Mazda 3",
//         plate: "V-229",
//         location: "Grand Falls",
//         location_id: 3,
//         instructor: "Robert Smith",
//         instructor_id: 3,
//         winterReady: true,
//         status: "Service Due",
//         km: "88200",
//         color: "Red",
//         insuranceNo: "INS-24680",
//         insuranceExpiry: "2026-12-31",
//         rcNo: "RC-24680",
//         rcExpiry: "2028-06-01",
//         carDocument: null
//     },
//     {
//         id: 4,
//         vin: "5YJ3E1EA7KF123456",
//         name: "2024 Tesla Model 3",
//         plate: "V-567",
//         location: "Mount Pearl",
//         location_id: 4,
//         instructor: null,
//         instructor_id: null,
//         winterReady: true,
//         status: "Available",
//         km: "3200",
//         color: "White",
//         insuranceNo: "INS-98765",
//         insuranceExpiry: "2026-06-15",
//         rcNo: "RC-98765",
//         rcExpiry: "2028-06-28",
//         carDocument: null
//     },
//     {
//         id: 5,
//         vin: "WBA3A5G59CN123456",
//         name: "2022 BMW 3 Series",
//         plate: "V-890",
//         location: "St. John's",
//         location_id: 2,
//         instructor: "David Chen",
//         instructor_id: 5,
//         winterReady: true,
//         status: "In Session",
//         km: "28750",
//         color: "Black",
//         insuranceNo: "INS-54321",
//         insuranceExpiry: "2026-04-20",
//         rcNo: "RC-54321",
//         rcExpiry: "2027-10-10",
//         carDocument: null
//     },
//     {
//         id: 6,
//         vin: "KM8J3CA46JU123456",
//         name: "2023 Hyundai Tucson",
//         plate: "V-345",
//         location: "Burin",
//         location_id: 1,
//         instructor: null,
//         instructor_id: null,
//         winterReady: false,
//         status: "Maintenance",
//         km: "15600",
//         color: "Gray",
//         insuranceNo: "INS-13579",
//         insuranceExpiry: "2026-01-15",
//         rcNo: "RC-13579",
//         rcExpiry: "2027-03-20",
//         carDocument: null
//     }
// ];

// const dummyLocations = [
//     { id: 1, name: "Burin", province_name: "Burin" },
//     { id: 2, name: "St. John's", province_name: "St. John's" },
//     { id: 3, name: "Grand Falls", province_name: "Grand Falls" },
//     { id: 4, name: "Marystown", province_name: "Marystown" },
//     { id: 5, name: "Mount Pearl", province_name: "Mount Pearl" }
// ];

// const dummyInstructors = [
//     { id: 1, user: { name: "Jean Dupont" }, car_id: 1 },
//     { id: 2, user: { name: "Sarah Miller" }, car_id: 2 },
//     { id: 3, user: { name: "Robert Smith" }, car_id: 3 },
//     { id: 4, user: { name: "David Chen" }, car_id: 5 }
// ];

// const FleetManagement = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [locationFilter, setLocationFilter] = useState('All Locations');
//     const [selectedVehicle, setSelectedVehicle] = useState(null);
//     const [isRegisterOpen, setIsRegisterOpen] = useState(false);
//     const [vehicles, setVehicles] = useState([]);
//     const [instructors] = useState(dummyInstructors);
//     const [locations] = useState(dummyLocations);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 6;

//     // Initialize with dummy data
//     useEffect(() => {
//         setTimeout(() => {
//             setVehicles(dummyVehicles);
//             setLoading(false);
//         }, 800);
//     }, []);

//     // Reset to page 1 when search or filter changes
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchTerm, locationFilter]);

//     // ─── Delete car ────────────────────────────────────────────────────────────
//     const handleDelete = (id) => {
//         if (!window.confirm('Are you sure you want to decommission this asset?')) return;
//         setVehicles(prev => prev.filter(v => v.id !== id));
//         setSelectedVehicle(null);
//     };

//     // ─── Expiry alert logic ────────────────────────────────────────────────────
//     const getExpiryAlert = (dateString) => {
//         if (!dateString) return null;
//         const today = new Date();
//         const expiryDate = new Date(dateString);
//         const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
//         if (diffDays < 0) {
//             return { label: 'Expired', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' };
//         }
//         if (diffDays <= 30) {
//             return { label: `${diffDays}d left`, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' };
//         }
//         return null;
//     };

//     // ─── Calculate statistics ──────────────────────────────────────────────────
//     const stats = useMemo(() => {
//         const filteredByLocation = locationFilter === 'All Locations' 
//             ? vehicles 
//             : vehicles.filter(v => v.location === locationFilter);

//         const total = filteredByLocation.length;
//         const assigned = filteredByLocation.filter(v => v.instructor && v.instructor !== null).length;
//         const active = filteredByLocation.filter(v => v.status === 'Available' || v.status === 'In Session').length;
        
//         const expiredCount = filteredByLocation.filter(v => {
//             const insExpiry = v.insuranceExpiry ? new Date(v.insuranceExpiry) : null;
//             const rcExpiry = v.rcExpiry ? new Date(v.rcExpiry) : null;
//             const today = new Date();
//             return (insExpiry && insExpiry < today) || (rcExpiry && rcExpiry < today);
//         }).length;
        
//         const expiringSoonCount = filteredByLocation.filter(v => {
//             const insExpiry = v.insuranceExpiry ? new Date(v.insuranceExpiry) : null;
//             const rcExpiry = v.rcExpiry ? new Date(v.rcExpiry) : null;
//             const today = new Date();
//             const thirtyDaysFromNow = new Date();
//             thirtyDaysFromNow.setDate(today.getDate() + 30);
            
//             const isInsExpiringSoon = insExpiry && insExpiry >= today && insExpiry <= thirtyDaysFromNow;
//             const isRcExpiringSoon = rcExpiry && rcExpiry >= today && rcExpiry <= thirtyDaysFromNow;
            
//             return isInsExpiringSoon || isRcExpiringSoon;
//         }).length;
        
//         const serviceDueCount = expiredCount + expiringSoonCount;
        
//         return {
//             total,
//             assigned,
//             active,
//             serviceDueCount,
//             expiredCount
//         };
//     }, [vehicles, locationFilter]);

//     // ─── Filtered vehicles ─────────────────────────────────────────────────────
//     const filteredVehicles = useMemo(() => {
//         return vehicles.filter(veh => {
//             const matchesLocation = locationFilter === 'All Locations' || veh.location === locationFilter;
//             const matchesSearch =
//                 veh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 (veh.plate && veh.plate.toLowerCase().includes(searchTerm.toLowerCase()));
//             return matchesLocation && matchesSearch;
//         });
//     }, [searchTerm, locationFilter, vehicles]);

//     // ─── Paginated vehicles ────────────────────────────────────────────────────
//     const paginatedVehicles = useMemo(() => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         return filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
//     }, [filteredVehicles, currentPage]);

//     // Handle register vehicle
//     const handleRegister = (newVehicle) => {
//         const formattedVehicle = {
//             ...newVehicle,
//             id: vehicles.length + 1,
//             status: 'Available',
//             instructor: null,
//             instructor_id: null,
//             km: newVehicle.odometerKm || '0',
//             plate: newVehicle.plate,
//             name: newVehicle.name,
//             location: newVehicle.location || 'Unknown',
//             color: newVehicle.color || '',
//             insuranceNo: newVehicle.insuranceNo || '',
//             insuranceExpiry: newVehicle.insuranceExpiry || '',
//             rcNo: newVehicle.rcNo || '',
//             rcExpiry: newVehicle.rcExpiry || ''
//         };
//         setVehicles([formattedVehicle, ...vehicles]);
//         setIsRegisterOpen(false);
//     };

//     // Handle update vehicle
//     const handleUpdate = () => {
//         setSelectedVehicle(null);
//     };

//     if (loading) {
//         return (
//             <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
//                 <div className="text-center">
//                     <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={48} />
//                     <p className="text-sm font-mono font-bold uppercase tracking-widest text-slate-500">Syncing Fleet...</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden" style={{ fontFamily: "'Sora', 'Inter', system-ui" }}>
            
//             {/* HEADER */}
//             <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4">
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//                     <div>
//                         <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white">
//                             Fleet <span className="text-teal-600 dark:text-teal-400">Management</span>
//                         </h1>
//                         <p className="text-[0.65rem] font-sora text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
//                             Manage your fleet inventory, track maintenance, and monitor vehicle assignments
//                         </p>
//                     </div>
//                 </div>

//                 {/* Filter Bar */}
//                 <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 mb-6">
//                     <div className="grid grid-cols-2 md:flex gap-2 flex-1">
                        
//                         {/* Location Filter */}
//                         <div className="group relative">
//                             <select 
//                                 value={locationFilter} 
//                                 onChange={(e) => setLocationFilter(e.target.value)}
//                                 className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 group-hover:border-teal-400 cursor-pointer transition-all"
//                             >
//                                 <option>All Locations</option>
//                                 {locations.map(loc => (
//                                     <option key={loc.id} value={loc.name}>
//                                         {loc.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

                        
//                     </div>

//                     <div className="relative w-full md:max-w-xs">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
//                         <input
//                             type="text"
//                             placeholder="Search by name or plate..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-[0.7rem] font-sora dark:text-slate-300 outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-400"
//                         />
//                     </div>
//                 </div>

//                 {/* Action Buttons Row */}
//                 <div className="flex justify-end gap-3 mb-4">
//                     <button 
//                         onClick={() => setIsRegisterOpen(true)} 
//                         className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-[0.7rem] font-medium transition-all flex items-center gap-2"
//                     >
//                         <Plus size={14} /> Register Vehicle
//                     </button>
//                 </div>
//             </header>

//             {/* MAIN CONTENT */}
//             <div className="flex-1 px-4 md:px-8 pb-8 overflow-y-auto custom-scrollbar">
                
//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//                     <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
//                         <p className="text-[0.6rem] font-mono text-slate-500 mb-1">Total Fleet</p>
//                         <p className="text-xl font-semibold text-slate-800 dark:text-white">{stats.total}</p>
//                     </div>
//                     <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
//                         <p className="text-[0.6rem] font-mono text-slate-500 mb-1">Active Units</p>
//                         <p className="text-xl font-semibold text-slate-800 dark:text-white">{stats.active}</p>
//                     </div>
//                     <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
//                         <p className="text-[0.6rem] font-mono text-slate-500 mb-1">Service Due</p>
//                         <p className="text-xl font-semibold text-amber-600 dark:text-amber-400">
//                             {stats.serviceDueCount}
//                         </p>
//                     </div>
//                     <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-3">
//                         <p className="text-[0.6rem] font-mono text-slate-500 mb-1 flex items-center gap-1">
//                             Alerts
//                             {stats.expiredCount > 0 && (
//                                 <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
//                             )}
//                         </p>
//                         <p className={`text-xl font-semibold ${stats.expiredCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>
//                             {stats.expiredCount}
//                         </p>
//                     </div>
//                 </div>

//                 {/* VEHICLE GRID */}
//                 {filteredVehicles.length === 0 ? (
//                     <div className="text-center py-16">
//                         <Car size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
//                         <p className="text-[0.7rem] font-mono text-slate-400">No vehicles found matching your filters.</p>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
//                             {paginatedVehicles.map(veh => {
//                                 const insAlert = getExpiryAlert(veh.insuranceExpiry);
//                                 const rcAlert = getExpiryAlert(veh.rcExpiry);
//                                 const isAssigned = veh.instructor && veh.instructor !== null;
                                
//                                 // Determine if vehicle has any expiry alerts
//                                 const hasExpiryAlert = insAlert !== null || rcAlert !== null;
//                                 const isExpired = (insAlert && insAlert.label === 'Expired') || (rcAlert && rcAlert.label === 'Expired');
//                                 const isExpiringSoon = !isExpired && hasExpiryAlert;
                                
//                                 // Determine card styling based on alert status
//                                 let cardBgClass = 'bg-white dark:bg-slate-900';
//                                 let cardBorderClass = 'border-slate-200 dark:border-slate-800';
//                                 let hoverBorderClass = 'hover:border-teal-300 dark:hover:border-teal-700';
                                
//                                 if (isExpired) {
//                                     cardBorderClass = 'border-red-300 dark:border-red-700';
//                                     cardBgClass = 'bg-red-50/50 dark:bg-red-950/20';
//                                     hoverBorderClass = 'hover:border-red-400 dark:hover:border-red-600';
//                                 } else if (isExpiringSoon) {
//                                     cardBorderClass = 'border-amber-300 dark:border-amber-700';
//                                     cardBgClass = 'bg-amber-50/50 dark:bg-amber-950/20';
//                                     hoverBorderClass = 'hover:border-amber-400 dark:hover:border-amber-600';
//                                 }
                                
//                                 let statusText = veh.status;
//                                 let statusColor = '';
                                
//                                 if (isExpired) {
//                                     statusText = 'EXPIRED';
//                                     statusColor = 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
//                                 } else if (isExpiringSoon) {
//                                     statusText = 'EXPIRING SOON';
//                                     statusColor = 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
//                                 } else {
//                                     statusColor = veh.status === 'Available' 
//                                         ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
//                                         : veh.status === 'In Session'
//                                         ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
//                                         : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
//                                 }

//                                 return (
//                                     <div 
//                                         key={veh.id} 
//                                         className={`${cardBgClass} p-4 rounded-xl border ${cardBorderClass} shadow-sm ${hoverBorderClass} hover:-translate-y-1 transition-all duration-300 flex flex-col group`}
//                                     >
//                                         {/* Header with Car Icon and Badges */}
//                                         <div className="flex justify-between items-start mb-3">
//                                             <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
//                                                 isExpired 
//                                                     ? 'bg-red-100 dark:bg-red-900/20 text-red-500' 
//                                                     : isExpiringSoon
//                                                     ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-500'
//                                                     : 'bg-teal-50 dark:bg-teal-900/20 text-teal-500 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/40'
//                                             }`}>
//                                                 <Car size={20} />
//                                             </div>

//                                             <div className="flex flex-wrap items-center gap-1.5">
//                                                 {/* Status Badge */}
//                                                 <span className={`px-2 py-0.5 rounded text-[0.55rem] font-mono font-semibold uppercase tracking-wider ${statusColor}`}>
//                                                     {statusText}
//                                                 </span>
                                                
//                                                 {/* Assignment Badge */}
//                                                 <span className={`px-2 py-0.5 rounded text-[0.55rem] font-mono font-semibold uppercase tracking-wider ${
//                                                     isAssigned
//                                                         ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
//                                                         : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
//                                                 }`}>
//                                                     {isAssigned ? 'ASSIGNED' : 'UNASSIGNED'}
//                                                 </span>
                                                
//                                                 {/* Insurance Alert Badge */}
//                                                 {insAlert && (
//                                                     <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[0.55rem] font-mono font-semibold ${insAlert.color} border`}>
//                                                         <ShieldAlert size={10} />
//                                                         INS: {insAlert.label}
//                                                     </div>
//                                                 )}
                                                
//                                                 {/* RC Alert Badge */}
//                                                 {rcAlert && (
//                                                     <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[0.55rem] font-mono font-semibold ${rcAlert.color} border`}>
//                                                         <AlertTriangle size={10} />
//                                                         RC: {rcAlert.label}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         {/* Vehicle Info */}
//                                         <div className="mb-3">
//                                             <h3 className={`text-base font-semibold transition-colors duration-300 ${
//                                                 isExpired 
//                                                     ? 'text-red-700 dark:text-red-400' 
//                                                     : isExpiringSoon
//                                                     ? 'text-amber-700 dark:text-amber-400'
//                                                     : 'text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400'
//                                             }`}>
//                                                 {veh.name}
//                                             </h3>
//                                             <div className="flex gap-2 mt-1">
//                                                 <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[0.55rem] font-mono text-slate-500">{veh.plate}</span>
//                                                 <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[0.55rem] font-mono text-slate-500">{parseInt(veh.km).toLocaleString()} KM</span>
//                                             </div>
//                                         </div>

//                                         {/* Location & Instructor */}
//                                         <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3 mt-auto">
//                                             <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
//                                                 <MapPin size={12} className={`transition-colors duration-300 ${
//                                                     isExpired 
//                                                         ? 'text-red-500' 
//                                                         : isExpiringSoon
//                                                         ? 'text-amber-500'
//                                                         : 'text-teal-500 group-hover:text-teal-600'
//                                                 }`} />
//                                                 <span className="text-[0.65rem] font-mono">{veh.location}</span>
//                                             </div>
//                                             <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
//                                                 <User size={12} className={`${isAssigned ? 'text-teal-500' : 'text-slate-400'} transition-colors duration-300`} />
//                                                 <span className="text-[0.65rem] font-mono">
//                                                     {isAssigned ? veh.instructor : 'Unassigned'}
//                                                 </span>
//                                             </div>
//                                         </div>

//                                         {/* Manage Button */}
//                                         <button 
//                                             onClick={() => setSelectedVehicle(veh)} 
//                                             className={`mt-4 w-full py-2 rounded-lg text-[0.7rem] font-medium transition-all duration-300 flex items-center justify-center gap-1.5 group-hover:scale-[1.02] active:scale-95 ${
//                                                 isExpired
//                                                     ? 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/25'
//                                                     : isExpiringSoon
//                                                     ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25'
//                                                     : 'bg-teal-500 hover:bg-teal-600 text-white shadow-md shadow-teal-500/25'
//                                             }`}
//                                         >
//                                             <span>Manage Asset</span>
//                                             <ChevronRight size={12} className="transition-all duration-300 group-hover:translate-x-1" />
//                                         </button>
//                                     </div>
//                                 );
//                             })}
//                         </div>
                        
//                         {/* Pagination */}
//                         {filteredVehicles.length > itemsPerPage && (
//                             <div className="flex justify-center pt-4 pb-8">
//                                 <Pagination 
//                                     totalItems={filteredVehicles.length} 
//                                     itemsPerPage={itemsPerPage} 
//                                     currentPage={currentPage} 
//                                     onPageChange={setCurrentPage} 
//                                 />
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>

//             {/* MODALS */}
//             {isRegisterOpen && (
//                 <RegisterVehicleModal
//                     locations={locations}
//                     onClose={() => setIsRegisterOpen(false)}
//                     onRegister={handleRegister}
//                 />
//             )}
//             {selectedVehicle && (
//                 <VehicleDetailModal
//                     vehicle={selectedVehicle}
//                     locations={locations}
//                     onClose={() => setSelectedVehicle(null)}
//                     onUpdate={handleUpdate}
//                     onDelete={handleDelete}
//                 />
//             )}
//         </div>
//     );
// };

// export default FleetManagement;



























import React, { useState, useMemo, useEffect } from 'react';
import VehicleDetailModal from '../components/VehicleDetailModal';
import RegisterVehicleModal from '../components/RegisterVehicleModal';
import Pagination from '../components/Pagination';
import {
    Search, Car, MapPin, User, Plus,
    ChevronRight, Filter, AlertTriangle, ShieldAlert, Loader2, ScanEye, Download
} from 'lucide-react';

// Dummy Data
const dummyVehicles = [
    {
        id: 1,
        vin: "2T1BURHE3NC123456",
        name: "2022 Toyota Corolla",
        plate: "V-882",
        location: "Burin",
        location_id: 1,
        instructor: "Jean Dupont",
        instructor_id: 1,
        winterReady: true,
        status: "Available",
        km: "45230",
        color: "Silver",
        insuranceNo: "INS-12345",
        insuranceExpiry: "2026-12-01",
        rcNo: "RC-12345",
        rcExpiry: "2027-05-15",
        carDocument: null
    },
    {
        id: 2,
        vin: "1HGCP2F85NA987654",
        name: "2023 Honda Civic",
        plate: "V-104",
        location: "St. John's",
        location_id: 2,
        instructor: "Sarah Miller",
        instructor_id: 2,
        winterReady: false,
        status: "In Session",
        km: "12500",
        color: "Blue",
        insuranceNo: "INS-67890",
        insuranceExpiry: "2026-06-01",
        rcNo: "RC-67890",
        rcExpiry: "2026-06-20",
        carDocument: null
    },
    {
        id: 3,
        vin: "JM1BP1U74M1654321",
        name: "2021 Mazda 3",
        plate: "V-229",
        location: "Grand Falls",
        location_id: 3,
        instructor: "Robert Smith",
        instructor_id: 3,
        winterReady: true,
        status: "Service Due",
        km: "88200",
        color: "Red",
        insuranceNo: "INS-24680",
        insuranceExpiry: "2026-12-31",
        rcNo: "RC-24680",
        rcExpiry: "2028-06-01",
        carDocument: null
    },
    {
        id: 4,
        vin: "5YJ3E1EA7KF123456",
        name: "2024 Tesla Model 3",
        plate: "V-567",
        location: "Mount Pearl",
        location_id: 4,
        instructor: null,
        instructor_id: null,
        winterReady: true,
        status: "Available",
        km: "3200",
        color: "White",
        insuranceNo: "INS-98765",
        insuranceExpiry: "2026-06-15",
        rcNo: "RC-98765",
        rcExpiry: "2028-06-28",
        carDocument: null
    },
    {
        id: 5,
        vin: "WBA3A5G59CN123456",
        name: "2022 BMW 3 Series",
        plate: "V-890",
        location: "St. John's",
        location_id: 2,
        instructor: "David Chen",
        instructor_id: 5,
        winterReady: true,
        status: "In Session",
        km: "28750",
        color: "Black",
        insuranceNo: "INS-54321",
        insuranceExpiry: "2026-04-20",
        rcNo: "RC-54321",
        rcExpiry: "2027-10-10",
        carDocument: null
    },
    {
        id: 6,
        vin: "KM8J3CA46JU123456",
        name: "2023 Hyundai Tucson",
        plate: "V-345",
        location: "Burin",
        location_id: 1,
        instructor: null,
        instructor_id: null,
        winterReady: false,
        status: "Maintenance",
        km: "15600",
        color: "Gray",
        insuranceNo: "INS-13579",
        insuranceExpiry: "2026-01-15",
        rcNo: "RC-13579",
        rcExpiry: "2027-03-20",
        carDocument: null
    }
];

const dummyLocations = [
    { id: 1, name: "Burin", province_name: "Burin" },
    { id: 2, name: "St. John's", province_name: "St. John's" },
    { id: 3, name: "Grand Falls", province_name: "Grand Falls" },
    { id: 4, name: "Marystown", province_name: "Marystown" },
    { id: 5, name: "Mount Pearl", province_name: "Mount Pearl" }
];

const dummyInstructors = [
    { id: 1, user: { name: "Jean Dupont" }, car_id: 1 },
    { id: 2, user: { name: "Sarah Miller" }, car_id: 2 },
    { id: 3, user: { name: "Robert Smith" }, car_id: 3 },
    { id: 4, user: { name: "David Chen" }, car_id: 5 }
];

const FleetManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('All');
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [instructors] = useState(dummyInstructors);
    const [locations] = useState(dummyLocations);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Initialize with dummy data
    useEffect(() => {
        setTimeout(() => {
            setVehicles(dummyVehicles);
            setLoading(false);
        }, 800);
    }, []);

    // Reset to page 1 when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, locationFilter]);

    // ─── Delete car ────────────────────────────────────────────────────────────
    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to decommission this asset?')) return;
        setVehicles(prev => prev.filter(v => v.id !== id));
        setSelectedVehicle(null);
    };

    // ─── Expiry alert logic ────────────────────────────────────────────────────
    const getExpiryAlert = (dateString) => {
        if (!dateString) return null;
        const today = new Date();
        const expiryDate = new Date(dateString);
        const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays < 0) {
            return { label: 'Expired', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' };
        }
        if (diffDays <= 30) {
            return { label: `${diffDays}d left`, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' };
        }
        return null;
    };

    // ─── Calculate statistics ──────────────────────────────────────────────────
    const stats = useMemo(() => {
        const filteredByLocation = locationFilter === 'All' 
            ? vehicles 
            : vehicles.filter(v => v.location === locationFilter);

        const total = filteredByLocation.length;
        const assigned = filteredByLocation.filter(v => v.instructor && v.instructor !== null).length;
        const active = filteredByLocation.filter(v => v.status === 'Available' || v.status === 'In Session').length;
        
        const expiredCount = filteredByLocation.filter(v => {
            const insExpiry = v.insuranceExpiry ? new Date(v.insuranceExpiry) : null;
            const rcExpiry = v.rcExpiry ? new Date(v.rcExpiry) : null;
            const today = new Date();
            return (insExpiry && insExpiry < today) || (rcExpiry && rcExpiry < today);
        }).length;
        
        const expiringSoonCount = filteredByLocation.filter(v => {
            const insExpiry = v.insuranceExpiry ? new Date(v.insuranceExpiry) : null;
            const rcExpiry = v.rcExpiry ? new Date(v.rcExpiry) : null;
            const today = new Date();
            const thirtyDaysFromNow = new Date();
            thirtyDaysFromNow.setDate(today.getDate() + 30);
            
            const isInsExpiringSoon = insExpiry && insExpiry >= today && insExpiry <= thirtyDaysFromNow;
            const isRcExpiringSoon = rcExpiry && rcExpiry >= today && rcExpiry <= thirtyDaysFromNow;
            
            return isInsExpiringSoon || isRcExpiringSoon;
        }).length;
        
        const serviceDueCount = expiredCount + expiringSoonCount;
        
        return {
            total,
            assigned,
            active,
            serviceDueCount,
            expiredCount
        };
    }, [vehicles, locationFilter]);

    // ─── Filtered vehicles ─────────────────────────────────────────────────────
    const filteredVehicles = useMemo(() => {
        return vehicles.filter(veh => {
            const matchesLocation = locationFilter === 'All' || veh.location === locationFilter;
            const matchesSearch =
                veh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (veh.plate && veh.plate.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesLocation && matchesSearch;
        });
    }, [searchTerm, locationFilter, vehicles]);

    // ─── Paginated vehicles ────────────────────────────────────────────────────
    const paginatedVehicles = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredVehicles, currentPage]);

    // Handle register vehicle
    const handleRegister = (newVehicle) => {
        const formattedVehicle = {
            ...newVehicle,
            id: vehicles.length + 1,
            status: 'Available',
            instructor: null,
            instructor_id: null,
            km: newVehicle.odometerKm || '0',
            plate: newVehicle.plate,
            name: newVehicle.name,
            location: newVehicle.location || 'Unknown',
            color: newVehicle.color || '',
            insuranceNo: newVehicle.insuranceNo || '',
            insuranceExpiry: newVehicle.insuranceExpiry || '',
            rcNo: newVehicle.rcNo || '',
            rcExpiry: newVehicle.rcExpiry || ''
        };
        setVehicles([formattedVehicle, ...vehicles]);
        setIsRegisterOpen(false);
    };

    // Handle update vehicle
    const handleUpdate = () => {
        setSelectedVehicle(null);
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="animate-spin text-teal-500 mx-auto mb-4" size={48} />
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Syncing Fleet...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
            
            {/* HEADER */}
            <header className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
                            Fleet <span className="text-teal-600 dark:text-teal-400">Management</span>
                        </h1>
                        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                            Manage your fleet inventory, track maintenance, and monitor vehicle assignments
                        </p>
                    </div>
                    
                    {/* Register Vehicle Button */}
                    <div className="flex justify-end w-full md:w-auto">
                        <button 
                            onClick={() => setIsRegisterOpen(true)} 
                            className="w-full md:w-auto px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-teal-600 hover:text-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={18} /> Register Vehicle
                        </button>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-col w-full lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4 mb-6">
                    {/* Filter Group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2 sm:gap-3 flex-1">
                        
                        {/* Location Filter */}
                        <div className="group relative w-full">
                            <select 
                                value={locationFilter} 
                                onChange={(e) => setLocationFilter(e.target.value)}
                                className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-medium dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                            >
                                <option value="All">All Locations</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.name}>
                                        {loc.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full lg:max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name or plate..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-8 overflow-x-hidden">
                <div className="max-w-[1800px] mx-auto">
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Fleet</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.total}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Active Units</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">{stats.active}</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Service Due</p>
                            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                                {stats.serviceDueCount}
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                Alerts
                                {stats.expiredCount > 0 && (
                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                                )}
                            </p>
                            <p className={`text-2xl font-bold ${stats.expiredCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>
                                {stats.expiredCount}
                            </p>
                        </div>
                    </div>

                    {/* VEHICLE GRID */}
                    {filteredVehicles.length === 0 ? (
                        <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
                            <Car size={56} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                            <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No vehicles found matching your filters.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {paginatedVehicles.map(veh => {
                                    const insAlert = getExpiryAlert(veh.insuranceExpiry);
                                    const rcAlert = getExpiryAlert(veh.rcExpiry);
                                    const isAssigned = veh.instructor && veh.instructor !== null;
                                    
                                    // Determine if vehicle has any expiry alerts
                                    const hasExpiryAlert = insAlert !== null || rcAlert !== null;
                                    const isExpired = (insAlert && insAlert.label === 'Expired') || (rcAlert && rcAlert.label === 'Expired');
                                    const isExpiringSoon = !isExpired && hasExpiryAlert;
                                    
                                    // Determine card styling based on alert status
                                    let cardBgClass = 'bg-white dark:bg-slate-900';
                                    let cardBorderClass = 'border-slate-200 dark:border-slate-800';
                                    let hoverBorderClass = 'hover:border-teal-300 dark:hover:border-teal-700';
                                    
                                    if (isExpired) {
                                        cardBorderClass = 'border-red-300 dark:border-red-700';
                                        cardBgClass = 'bg-red-50/50 dark:bg-red-950/20';
                                        hoverBorderClass = 'hover:border-red-400 dark:hover:border-red-600';
                                    } else if (isExpiringSoon) {
                                        cardBorderClass = 'border-amber-300 dark:border-amber-700';
                                        cardBgClass = 'bg-amber-50/50 dark:bg-amber-950/20';
                                        hoverBorderClass = 'hover:border-amber-400 dark:hover:border-amber-600';
                                    }
                                    
                                    let statusText = veh.status;
                                    let statusColor = '';
                                    
                                    if (isExpired) {
                                        statusText = 'EXPIRED';
                                        statusColor = 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
                                    } else if (isExpiringSoon) {
                                        statusText = 'EXPIRING SOON';
                                        statusColor = 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400';
                                    } else {
                                        statusColor = veh.status === 'Available' 
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                            : veh.status === 'In Session'
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
                                    }

                                    return (
                                        <div 
                                            key={veh.id} 
                                            className={`${cardBgClass} p-5 rounded-2xl border ${cardBorderClass} shadow-sm ${hoverBorderClass} hover:-translate-y-1 transition-all duration-300 flex flex-col group`}
                                        >
                                            {/* Header with Car Icon and Badges */}
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                                    isExpired 
                                                        ? 'bg-red-100 dark:bg-red-900/20 text-red-500' 
                                                        : isExpiringSoon
                                                        ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-500'
                                                        : 'bg-teal-100 dark:bg-teal-900/20 text-teal-600 group-hover:bg-teal-200 dark:group-hover:bg-teal-900/40'
                                                }`}>
                                                    <Car size={24} />
                                                </div>

                                                <div className="flex flex-wrap items-center gap-1.5 justify-end">
                                                    {/* Status Badge */}
                                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${statusColor}`}>
                                                        {statusText}
                                                    </span>
                                                    
                                                    {/* Assignment Badge */}
                                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                                                        isAssigned
                                                            ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'
                                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                                    }`}>
                                                        {isAssigned ? 'ASSIGNED' : 'UNASSIGNED'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Vehicle Info */}
                                            <div className="mb-4">
                                                <h3 className={`text-lg font-bold transition-colors duration-300 ${
                                                    isExpired 
                                                        ? 'text-red-700 dark:text-red-400' 
                                                        : isExpiringSoon
                                                        ? 'text-amber-700 dark:text-amber-400'
                                                        : 'text-slate-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400'
                                                }`}>
                                                    {veh.name}
                                                </h3>
                                                <div className="flex gap-2 mt-2">
                                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[15px] font-mono font-semibold text-slate-600 dark:text-slate-400">{veh.plate}</span>
                                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[15px] font-mono font-semibold text-slate-600 dark:text-slate-400">{parseInt(veh.km).toLocaleString()} KM</span>
                                                </div>
                                            </div>

                                            {/* Insurance & RC Alerts */}
                                            {(insAlert || rcAlert) && (
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {insAlert && (
                                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${insAlert.color} border`}>
                                                            <ShieldAlert size={12} />
                                                            INS: {insAlert.label}
                                                        </div>
                                                    )}
                                                    {rcAlert && (
                                                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${rcAlert.color} border`}>
                                                            <AlertTriangle size={12} />
                                                            RC: {rcAlert.label}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* Location & Instructor */}
                                            <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
                                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                    <MapPin size={14} className={`transition-colors duration-300 ${
                                                        isExpired 
                                                            ? 'text-red-500' 
                                                            : isExpiringSoon
                                                            ? 'text-amber-500'
                                                            : 'text-teal-500'
                                                    }`} />
                                                    <span className="text-sm font-medium">{veh.location}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                                    <User size={14} className={`${isAssigned ? 'text-teal-500' : 'text-slate-400'}`} />
                                                    <span className="text-sm font-medium">
                                                        {isAssigned ? veh.instructor : 'Unassigned'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Manage Button */}
                                            <button 
                                                onClick={() => setSelectedVehicle(veh)} 
                                                className={`mt-5 w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95 ${
                                                    isExpired
                                                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25'
                                                        : isExpiringSoon
                                                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/25'
                                                        : 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/25'
                                                }`}
                                            >
                                                <span>Manage Asset</span>
                                                <ChevronRight size={16} className="transition-all duration-300 group-hover:translate-x-1" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            {/* Pagination */}
                            {filteredVehicles.length > itemsPerPage && (
                                <div className="flex justify-center pt-8 pb-4">
                                    <Pagination 
                                        totalItems={filteredVehicles.length} 
                                        itemsPerPage={itemsPerPage} 
                                        currentPage={currentPage} 
                                        onPageChange={setCurrentPage} 
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* MODALS */}
            {isRegisterOpen && (
                <RegisterVehicleModal
                    locations={locations}
                    onClose={() => setIsRegisterOpen(false)}
                    onRegister={handleRegister}
                />
            )}
            {selectedVehicle && (
                <VehicleDetailModal
                    vehicle={selectedVehicle}
                    locations={locations}
                    onClose={() => setSelectedVehicle(null)}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default FleetManagement;