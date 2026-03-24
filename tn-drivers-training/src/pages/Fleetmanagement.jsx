// import React, { useState, useMemo } from 'react';
// import VehicleDetailModal from '../components/VehicleDetailModal'; 
// import RegisterVehicleModal from '../components/RegisterVehicleModal';
// import { 
//   Search, Car, MapPin, User, Snowflake, Plus, 
//   ChevronRight, Filter, AlertTriangle, ShieldAlert 
// } from 'lucide-react';

// const FleetManagement = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locationFilter, setLocationFilter] = useState('All Locations');
//   const [selectedVehicle, setSelectedVehicle] = useState(null);
//   const [isRegisterOpen, setIsRegisterOpen] = useState(false);

//   // 1. Mock Data with Expiry Dates
//   const [vehicles, setVehicles] = useState([
//     { 
//       vin: "2T1BURHE3NC123456", 
//       name: "2022 Toyota Corolla", 
//       plate: "V-882", 
//       location: "Burin", 
//       instructor: "Jean Dupont",
//       winterReady: true,
//       status: "Available",
//       km: "42,000",
//       insuranceExpiry: "2026-12-01",
//       rcExpiry: "2027-05-15"
//     },
//     { 
//       vin: "1HGCP2F85NA987654", 
//       name: "2023 Honda Civic", 
//       plate: "V-104", 
//       location: "St. John’s / Mount Pearl", 
//       instructor: "Sarah Miller",
//       winterReady: false,
//       status: "In Session",
//       km: "12,500",
//       insuranceExpiry: "2026-03-01", // EXPIRING SOON ALERT
//       rcExpiry: "2026-01-20"        // EXPIRED ALERT
//     },
//     { 
//       vin: "JM1BP1U74M1654321", 
//       name: "2021 Mazda 3", 
//       plate: "V-229", 
//       location: "Grand Falls", 
//       instructor: "Robert Smith",
//       winterReady: true,
//       status: "Service Due",
//       km: "88,200",
//       insuranceExpiry: "2025-12-31", // EXPIRED ALERT
//       rcExpiry: "2028-01-01"
//     }
//   ]);

//   // 2. Logic to check Expiry Status
//   const getExpiryAlert = (dateString) => {
//     if (!dateString) return null;
//     const today = new Date();
//     const expiryDate = new Date(dateString);
//     const diffTime = expiryDate - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays < 0) return { label: "Expired", color: "text-rose-500 bg-rose-50 border-rose-100" };
//     if (diffDays <= 30) return { label: `Expires in ${diffDays}d`, color: "text-orange-500 bg-orange-50 border-orange-100" };
//     return null;
//   };

//   const handleRegisterVehicle = (newVeh) => {
//     const formattedVeh = {
//       ...newVeh,
//       vin: `VIN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
//       status: "Available",
//       instructor: "Unassigned",
//       winterReady: false
//     };
//     setVehicles([...vehicles, formattedVeh]);
//   };

//   const filteredVehicles = useMemo(() => {
//     return vehicles.filter(veh => {
//       const matchesLocation = locationFilter === 'All Locations' || veh.location === locationFilter;
//       const matchesSearch = veh.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                             veh.plate.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchesLocation && matchesSearch;
//     });
//   }, [searchTerm, locationFilter, vehicles]);

//   return (
//     <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300 overflow-hidden">
      
//       {/* HEADER */}
//       <header className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md px-4 md:px-8 py-4 sticky top-0 z-20 gap-4">
//         <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
//           <div className="relative flex-1 sm:w-80">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
//             <input className="w-full pl-10 pr-4 py-3 sm:py-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#008B8B]/50 transition-all" placeholder="Search by name or plate..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
//           </div>
//           <div className="relative flex-1 sm:w-56">
//             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
//             <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-full pl-10 pr-4 py-3 sm:py-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none appearance-none">
//               <option>All Locations</option><option>Burin</option><option>Grand Falls</option><option>Marystown</option><option>St. John’s / Mount Pearl</option>
//             </select>
//           </div>
//         </div>
//         <button onClick={() => setIsRegisterOpen(true)} className="flex items-center justify-center gap-2 bg-[#008B8B] px-6 py-3 sm:py-2.5 text-white rounded-xl shadow-lg shadow-[#008B8B]/20 active:scale-95 transition-all text-sm font-bold">
//           <Plus size={20} /> <span>Register Vehicle</span>
//         </button>
//       </header>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto w-full scrollbar-hide">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//           <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase italic leading-none">Vehicle <span className="text-[#008B8B]">Fleet</span></h1>
//           <div className="flex gap-4">
//              <div className="text-right"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Units</p><p className="text-xl font-black dark:text-white">{vehicles.length}</p></div>
//              <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
//              <div className="text-right"><p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Alerts</p><p className="text-xl font-black text-rose-500">{vehicles.filter(v => getExpiryAlert(v.insuranceExpiry) || getExpiryAlert(v.rcExpiry)).length}</p></div>
//           </div>
//         </div>

//         {/* VEHICLE GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20">
//           {filteredVehicles.map(veh => {
//             const insAlert = getExpiryAlert(veh.insuranceExpiry);
//             const rcAlert = getExpiryAlert(veh.rcExpiry);

//             return (
//               <div key={veh.vin} className="bg-white dark:bg-[#111827] p-5 md:p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-[#008B8B]/40 transition-all flex flex-col justify-between group relative overflow-hidden">
                
//                 <div className="flex justify-between items-start mb-6">
//                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 dark:bg-[#1e293b] flex items-center justify-center text-[#008B8B] shadow-inner group-hover:scale-110 transition-transform">
//                     <Car size={26} />
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <span className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest border ${
//                       veh.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
//                     }`}>{veh.status}</span>
//                     {/* 3. ALERT BADGES */}
//                     {insAlert && (
//                       <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[8px] font-black uppercase ${insAlert.color}`}>
//                         <ShieldAlert size={12} /> INS: {insAlert.label}
//                       </div>
//                     )}
//                     {rcAlert && (
//                       <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[8px] font-black uppercase ${rcAlert.color}`}>
//                         <AlertTriangle size={12} /> RC: {rcAlert.label}
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-tight">{veh.name}</h3>
//                   <div className="flex gap-2 mt-2">
//                     <span className="px-2.5 py-1 bg-slate-50 dark:bg-[#1e293b] rounded-lg border border-slate-100 dark:border-slate-700 font-mono text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{veh.plate}</span>
//                     <span className="px-2.5 py-1 bg-slate-50 dark:bg-[#1e293b] rounded-lg border border-slate-100 dark:border-slate-700 font-mono text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{veh.km} KM</span>
//                   </div>
//                 </div>

//                 <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-5">
//                   <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
//                     <MapPin size={14} className="text-[#008B8B]" /><span className="text-[10px] font-black uppercase tracking-widest truncate">{veh.location}</span>
//                   </div>
//                   <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
//                     <User size={14} className="text-[#008B8B]" /><span className="text-[10px] font-black uppercase tracking-widest truncate">Handle: {veh.instructor}</span>
//                   </div>
//                 </div>

//                 <button onClick={() => setSelectedVehicle(veh)} className="mt-8 w-full py-4 bg-slate-50 dark:bg-slate-800/50 text-[#008B8B] hover:bg-[#008B8B] hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm">Manage Asset <ChevronRight size={14} /></button>
//               </div>
//             );
//           })}
//         </div>
//       </main>

//       {isRegisterOpen && <RegisterVehicleModal onClose={() => setIsRegisterOpen(false)} onRegister={handleRegisterVehicle} />}
//       {selectedVehicle && <VehicleDetailModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
//     </div>
//   );
// };

// export default FleetManagement;




import React, { useState, useMemo } from 'react';
import VehicleDetailModal from '../components/VehicleDetailModal'; 
import RegisterVehicleModal from '../components/RegisterVehicleModal';
import { 
  Search, Car, MapPin, User, Snowflake, Plus, 
  ChevronRight, Filter, AlertTriangle, ShieldAlert 
} from 'lucide-react';

const FleetManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [vehicles, setVehicles] = useState([
    { 
      id: 1,
      vin: "2T1BURHE3NC123456", 
      name: "2022 Toyota Corolla", 
      plate: "V-882", 
      location: "Burin", 
      instructor: "Jean Dupont",
      instructor_id: 1,
      winterReady: true,
      status: "Available",
      km: "42000",
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
      instructor: "Sarah Miller",
      instructor_id: 2,
      winterReady: false,
      status: "In Session",
      km: "12500",
      color: "Blue",
      insuranceNo: "INS-67890",
      insuranceExpiry: "2026-03-01",
      rcNo: "RC-67890",
      rcExpiry: "2026-01-20",
      carDocument: null
    },
    { 
      id: 3,
      vin: "JM1BP1U74M1654321", 
      name: "2021 Mazda 3", 
      plate: "V-229", 
      location: "Grand Falls", 
      instructor: "Robert Smith",
      instructor_id: 3,
      winterReady: true,
      status: "Service Due",
      km: "88200",
      color: "Red",
      insuranceNo: "INS-24680",
      insuranceExpiry: "2025-12-31",
      rcNo: "RC-24680",
      rcExpiry: "2028-01-01",
      carDocument: null
    }
  ]);

  // Logic to check Expiry Status
  const getExpiryAlert = (dateString) => {
    if (!dateString) return null;
    const today = new Date();
    const expiryDate = new Date(dateString);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: "Expired", color: "text-rose-500 bg-rose-50 border-rose-100" };
    if (diffDays <= 30) return { label: `Expires in ${diffDays}d`, color: "text-orange-500 bg-orange-50 border-orange-100" };
    return null;
  };

  const handleRegisterVehicle = (newVeh) => {
    const formattedVeh = {
      id: Date.now(),
      ...newVeh,
      status: "Available",
      instructor: "Unassigned",
      instructor_id: null,
      winterReady: false,
      km: newVeh.odometerKm || "0",
      plate: newVeh.plate,
      name: newVeh.name,
      location: newVeh.location || "Unknown",
      color: newVeh.color || "",
      insuranceNo: newVeh.insuranceNo || "",
      insuranceExpiry: newVeh.insuranceExpiry || "",
      rcNo: newVeh.rcNo || "",
      rcExpiry: newVeh.rcExpiry || "",
      carDocument: newVeh.carDocument || null
    };
    setVehicles([...vehicles, formattedVeh]);
  };

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles(prev => prev.map(v => 
      v.id === updatedVehicle.id ? { ...v, ...updatedVehicle } : v
    ));
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(prev => prev.filter(v => v.id !== id));
    setSelectedVehicle(null);
  };

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(veh => {
      const matchesLocation = locationFilter === 'All Locations' || veh.location === locationFilter;
      const matchesSearch = veh.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            veh.plate.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLocation && matchesSearch;
    });
  }, [searchTerm, locationFilter, vehicles]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-[#0f172a] transition-colors duration-300 overflow-hidden">
      
      {/* HEADER */}
      <header className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md px-4 md:px-8 py-4 sticky top-0 z-20 gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
            <input 
              className="w-full pl-10 pr-4 py-3 sm:py-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-terra-500/50 transition-all" 
              placeholder="Search by name or plate..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="relative flex-1 sm:w-56">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)} 
              className="w-full pl-10 pr-4 py-3 sm:py-2 bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none appearance-none cursor-pointer hover:border-terra-400 transition-colors"
            >
              <option>All Locations</option>
              <option>Burin</option>
              <option>Grand Falls</option>
              <option>Marystown</option>
              <option>St. John's</option>
              <option>Mount Pearl</option>
            </select>
          </div>
        </div>
        
        {/* VISIBLE REGISTER BUTTON - Fixed visibility */}
     <button 
  onClick={() => setIsRegisterOpen(true)} 
  className="flex items-center justify-center gap-2 hover:bg-teal-700 text-white px-6 py-3 sm:py-2.5 rounded-xl shadow-lg shadow-teal-600/20 hover:shadow-teal-600/40 active:scale-95 transition-all duration-200 text-sm font-bold cursor-pointer"
  style={{ backgroundColor: '#2A9D8F' }}
>
  <Plus size={20} /> 
  <span>Register Vehicle</span>
</button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto w-full">
        
        {/* HEADER SECTION - Updated to match Applications page style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-['Sora'] font-bold tracking-tight text-slate-800 dark:text-white">
              Car <span className="text-terra-600 dark:text-terra-400">Management</span>
            </h1>
            <p className="text-[0.65rem] font-['DM_Mono'] text-slate-500 dark:text-slate-400 mt-0.5 tracking-wider">
              Manage your fleet inventory, track maintenance, and monitor vehicle assignments
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[10px] font-['DM_Mono'] font-black text-slate-400 uppercase tracking-widest">Active Units</p>
              <p className="text-xl font-['Sora'] font-black dark:text-white">{vehicles.length}</p>
            </div>
            <div className="w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
            <div className="text-right">
              <p className="text-[10px] font-['DM_Mono'] font-black text-rose-400 uppercase tracking-widest">Alerts</p>
              <p className="text-xl font-['Sora'] font-black text-rose-500">
                {vehicles.filter(v => getExpiryAlert(v.insuranceExpiry) || getExpiryAlert(v.rcExpiry)).length}
              </p>
            </div>
          </div>
        </div>

        {/* VEHICLE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20">
          {filteredVehicles.map(veh => {
            const insAlert = getExpiryAlert(veh.insuranceExpiry);
            const rcAlert = getExpiryAlert(veh.rcExpiry);
            const isAssigned = veh.instructor && veh.instructor !== 'Unassigned';

            return (
              <div key={veh.id} className="bg-white dark:bg-[#111827] p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-terra-400/40 hover:shadow-md transition-all flex flex-col group relative overflow-hidden">
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 dark:bg-[#1e293b] flex items-center justify-center text-terra-600 shadow-inner group-hover:scale-110 transition-transform">
                    <Car size={26} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2.5 py-1 rounded text-[9px] font-['DM_Mono'] font-black uppercase tracking-widest border ${
                      veh.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      veh.status === 'In Session' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>{veh.status}</span>
                    
                    {/* Assignment Status Badge */}
                    <span className={`px-2.5 py-1 rounded text-[8px] font-['DM_Mono'] font-black uppercase tracking-widest border ${
                      isAssigned
                        ? 'bg-terra-50 text-terra-600 border-terra-200'
                        : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {isAssigned ? 'ASSIGNED' : 'UNASSIGNED'}
                    </span>
                    
                    {/* ALERT BADGES */}
                    {insAlert && (
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[8px] font-['DM_Mono'] font-black uppercase ${insAlert.color}`}>
                        <ShieldAlert size={12} /> INS: {insAlert.label}
                      </div>
                    )}
                    {rcAlert && (
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[8px] font-['DM_Mono'] font-black uppercase ${rcAlert.color}`}>
                        <AlertTriangle size={12} /> RC: {rcAlert.label}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg md:text-xl font-['Sora'] font-bold text-slate-800 dark:text-white leading-tight">{veh.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2.5 py-1 bg-slate-50 dark:bg-[#1e293b] rounded-lg border border-slate-100 dark:border-slate-700 font-['DM_Mono'] text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{veh.plate}</span>
                    <span className="px-2.5 py-1 bg-slate-50 dark:bg-[#1e293b] rounded-lg border border-slate-100 dark:border-slate-700 font-['DM_Mono'] text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{parseInt(veh.km).toLocaleString()} KM</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-5 mt-auto">
                  <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                    <MapPin size={14} className="text-terra-600" />
                    <span className="text-[10px] font-['DM_Mono'] font-black uppercase tracking-widest truncate">{veh.location}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400">
                    <User size={14} className={`${isAssigned ? 'text-terra-600' : 'text-amber-500'}`} />
                    <span className="text-[10px] font-['DM_Mono'] font-black uppercase tracking-widest truncate">
                      {isAssigned ? `Instructor: ${veh.instructor}` : 'Unassigned'}
                    </span>
                  </div>
                </div>
<button 
  onClick={() => setSelectedVehicle(veh)} 
  className="mt-8 w-full py-3.5 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm relative overflow-hidden group"
  style={{ backgroundColor: '#2A9D8F' }}
>
  {/* Shutter overlay effect */}
  <span className="absolute inset-0 bg-teal-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
  
  {/* Button content */}
  <span className="relative z-10 flex items-center justify-center gap-2">
    <span>Manage Asset</span>
    <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
  </span>
</button>
              </div>
            );
          })}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-['DM_Mono'] text-sm">No vehicles found matching your filters.</p>
          </div>
        )}
      </main>

      {isRegisterOpen && (
        <RegisterVehicleModal 
          onClose={() => setIsRegisterOpen(false)} 
          onRegister={handleRegisterVehicle}
          locations={[
            { id: 1, name: "Burin", province_name: "Burin" },
            { id: 2, name: "Grand Falls", province_name: "Grand Falls" },
            { id: 3, name: "Marystown", province_name: "Marystown" },
            { id: 4, name: "St. John's", province_name: "St. John's" },
            { id: 5, name: "Mount Pearl", province_name: "Mount Pearl" }
          ]}
        />
      )}
      {selectedVehicle && (
        <VehicleDetailModal 
          vehicle={selectedVehicle} 
          onClose={() => setSelectedVehicle(null)} 
          onUpdate={handleUpdateVehicle}
          onDelete={handleDeleteVehicle}
          locations={[
            { id: 1, name: "Burin", province_name: "Burin" },
            { id: 2, name: "Grand Falls", province_name: "Grand Falls" },
            { id: 3, name: "Marystown", province_name: "Marystown" },
            { id: 4, name: "St. John's", province_name: "St. John's" },
            { id: 5, name: "Mount Pearl", province_name: "Mount Pearl" }
          ]}
        />
      )}
    </div>
  );
};

export default FleetManagement;