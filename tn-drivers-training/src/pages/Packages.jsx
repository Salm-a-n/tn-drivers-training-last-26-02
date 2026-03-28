// import React, { useState, useMemo, useCallback } from "react";
// import NewPackage from "../components/NewPackage";
// import EditPackage from "../components/EditPackage";
// import Pagination from "../components/Pagination";
// import SearchBar from "../components/SearchBar"; 
// import { Plus, Package as PackageIcon } from "lucide-react";

// const Packages = () => {
//   const [showNewModal, setShowNewModal] = useState(false);
//   const [editingPackage, setEditingPackage] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   // Master Tax Regions - Pull this from your Settings state or API later
//   const [taxRegions] = useState([
//     { id: 1, city: "Burin", rate: 0.10 },
//     { id: 2, city: "Mount Pearl", rate: 0.15 },
//     { id: 3, city: "Marystown", rate: 0.5 },
//     { id: 4, city: "Grand Falls", rate: 0.20 },
//   ]);

//   const [packages, setPackages] = useState([
//     { id: 1, name: "Basic Starter", price: 450, licenseClass: "Class 7 L", hours: 5 },
//     { id: 2, name: "Pro Highway", price: 800, licenseClass: "Class 5", hours: 10 },
//     { id: 3, name: "Advanced City", price: 600, licenseClass: "Class 5", hours: 8 },
//   ]);

//   // FIX: This function was missing or renamed, causing your error
//   const handleSearch = useCallback((term) => {
//     setSearchTerm(term);
//     setCurrentPage(1); 
//   }, []);

//   const filteredPackages = useMemo(() => {
//     return packages.filter((pkg) =>
//       pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       pkg.licenseClass.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, packages]);

//   const currentItems = useMemo(() => {
//     const lastIdx = currentPage * itemsPerPage;
//     return filteredPackages.slice(lastIdx - itemsPerPage, lastIdx);
//   }, [currentPage, filteredPackages]);

//   return (
//     <div className="p-4 sm:p-8 bg-slate-50 dark:bg-[#020617] min-h-screen transition-colors font-sans">
//       <div className="max-w-7xl mx-auto">
        
//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
//           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
//             Driving <span className="text-teal-500">Finance</span>
//           </h1>
//           <button 
//             onClick={() => setShowNewModal(true)} 
//             className="bg-teal-500 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-teal-600 transition-all"
//           >
//             <Plus size={16} /> Add Master Package
//           </button>
//         </div>

//         <div className="space-y-10">
//           {/* SEARCH BAR */}
//           <div className="max-w-xl">
//             <SearchBar onSearch={handleSearch} />
//           </div>

//           {/* PACKAGE GRID */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {currentItems.map(pkg => (
//               <div key={pkg.id} className="group bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl relative transition-all hover:shadow-2xl">
                
//                 {/* ADMIN TOOLS */}
//                 <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
//                   <button onClick={() => setEditingPackage(pkg)} className="p-2 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-500 hover:text-white transition-all">
//                     <span className="material-symbols-outlined text-sm">edit</span>
//                   </button>
//                   <button onClick={() => setPackages(packages.filter(p => p.id !== pkg.id))} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all">
//                     <span className="material-symbols-outlined text-sm">delete</span>
//                   </button>
//                 </div>

//                 <div className="relative z-10">
//                   <span className="text-[9px] font-black px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-full uppercase tracking-widest">{pkg.licenseClass}</span>
//                   <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-4 uppercase italic">{pkg.name}</h3>
//                   <p className="text-slate-400 font-bold text-xs mt-1 mb-8 flex items-center gap-2"><PackageIcon size={12} /> {pkg.hours} Hours Instruction</p>

//                   {/* DYNAMIC REGIONAL TAX CALCULATION */}
//                   <div className="space-y-3 mb-8">
//                     <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Regional Pricing (Inc. Tax)</label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {taxRegions.map(region => {
//                         const total = pkg.price * (1 + region.rate);
//                         return (
//                           <div key={region.id} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
//                             <p className="text-[8px] font-black text-slate-400 uppercase">{region.city}</p>
//                             <p className="text-sm font-black text-slate-900 dark:text-white">
//                               ${total.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
//                             </p>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* BASE PRICE FOOTER */}
//                   <div className="p-5 bg-teal-500/5 dark:bg-teal-500/10 rounded-3xl border border-teal-100 dark:border-teal-900/30">
//                     <div className="flex justify-between items-end">
//                       <span className="text-xs font-bold text-teal-600 uppercase italic">Base Price</span>
//                       <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">${pkg.price.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="flex justify-center pt-8">
//             <Pagination totalItems={filteredPackages.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={setCurrentPage} />
//           </div>
//         </div>

//         {/* MODALS */}
//         {showNewModal && <NewPackage onClose={() => setShowNewModal(false)} onAdd={(p) => setPackages([p, ...packages])} />}
//         {editingPackage && <EditPackage pkg={editingPackage} onClose={() => setEditingPackage(null)} onUpdate={(up) => setPackages(packages.map(p => p.id === up.id ? up : p))} />}
//       </div>
//     </div>
//   );
// };

// export default Packages;












import React, { useState, useMemo, useCallback } from "react";
import NewPackage from "../components/NewPackage";
import EditPackage from "../components/EditPackage";
import Pagination from "../components/Pagination";
import { Plus, Package as PackageIcon, Edit2, Trash2, Search, ChevronRight } from "lucide-react";

const Packages = () => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Master Tax Regions
  const [taxRegions] = useState([
    { id: 1, city: "Burin", rate: 0.10 },
    { id: 2, city: "Mount Pearl", rate: 0.15 },
    { id: 3, city: "Marystown", rate: 0.05 },
    { id: 4, city: "Grand Falls", rate: 0.20 },
  ]);

  const [packages, setPackages] = useState([
    { id: 1, name: "Basic Starter", price: 450, licenseClass: "Class 7 L", hours: 5, sessions: 4 },
    { id: 2, name: "Pro Highway", price: 800, licenseClass: "Class 5", hours: 10, sessions: 7 },
    { id: 3, name: "Advanced City", price: 600, licenseClass: "Class 5", hours: 8, sessions: 6 },
  ]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  // Function to add new package
  const handleAddPackage = useCallback((newPackage) => {
    setPackages(prevPackages => {
      const updatedPackages = [newPackage, ...prevPackages];
      return updatedPackages;
    });
  }, []);

  // Function to update existing package
  const handleUpdatePackage = useCallback((updatedPackage) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => pkg.id === updatedPackage.id ? updatedPackage : pkg)
    );
  }, []);

  // Function to delete package
  const handleDeletePackage = useCallback((packageId) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setPackages(prevPackages => prevPackages.filter(pkg => pkg.id !== packageId));
    }
  }, []);

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) =>
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.licenseClass.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, packages]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPackages.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredPackages]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-[1800px] mx-auto">
          
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
                Driving <span className="text-teal-600 dark:text-teal-400">Packages</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                Manage pricing, packages, and regional tax calculations
              </p>
            </div>
            <div className="flex justify-end w-full md:w-auto">
              <button 
                onClick={() => setShowNewModal(true)} 
                className="w-full md:w-auto px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-teal-600 hover:text-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Add New Package
              </button>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="mb-6">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search packages by name or license class..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* PACKAGE GRID */}
          {filteredPackages.length === 0 ? (
            <div className="text-center py-24 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <PackageIcon size={56} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">No packages found matching your search.</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")} 
                  className="mt-4 text-teal-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentItems.map(pkg => (
                  <div 
                    key={pkg.id} 
                    className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* ADMIN TOOLS - Larger and more prominent on hover */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                      <button 
                        onClick={() => setEditingPackage(pkg)} 
                        className="p-2 bg-white dark:bg-slate-800 text-teal-600 rounded-xl hover:bg-teal-600 hover:text-white transition-all shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:scale-110 active:scale-95"
                        title="Edit Package"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeletePackage(pkg.id)} 
                        className="p-2 bg-white dark:bg-slate-800 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:scale-110 active:scale-95"
                        title="Delete Package"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="p-6">
                      {/* License Class Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-bold px-2.5 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg uppercase tracking-wider">
                          {pkg.licenseClass}
                        </span>
                        <PackageIcon size={16} className="text-slate-400 group-hover:text-teal-500 transition-colors duration-300" />
                      </div>
                      
                      {/* Package Name */}
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                        {pkg.name}
                      </h3>
                      
                      {/* Hours and Sessions */}
                      <div className="flex items-center gap-3 mb-5">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {pkg.hours} Hours
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {pkg.sessions} Sessions
                        </span>
                      </div>

                      {/* Regional Pricing */}
                      <div className="mb-5">
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                          Regional Pricing (Inc. Tax)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {taxRegions.map(region => {
                            const total = pkg.price * (1 + region.rate);
                            return (
                              <div key={region.id} className="p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 group-hover:border-teal-200 dark:group-hover:border-teal-800 transition-all duration-300">
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{region.city}</p>
                                <p className="text-sm font-bold text-slate-800 dark:text-white">
                                  ${total.toFixed(2)}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Base Price */}
                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Base Price</span>
                        <span className="text-xl font-bold text-teal-600 dark:text-teal-400 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-300">
                          ${pkg.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {filteredPackages.length > itemsPerPage && (
                <div className="flex justify-center pt-8 pb-4">
                  <Pagination 
                    totalItems={filteredPackages.length} 
                    itemsPerPage={itemsPerPage} 
                    currentPage={currentPage} 
                    onPageChange={setCurrentPage} 
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MODALS */}
      {showNewModal && (
        <NewPackage 
          onClose={() => setShowNewModal(false)} 
          onAdd={handleAddPackage}
        />
      )}
      {editingPackage && (
        <EditPackage 
          pkg={editingPackage} 
          onClose={() => setEditingPackage(null)} 
          onUpdate={handleUpdatePackage}
        />
      )}
    </div>
  );
};

export default Packages;