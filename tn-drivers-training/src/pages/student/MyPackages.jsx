
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Clock, CheckCircle, CreditCard, Calendar,
  BookOpen, Car, AlertCircle, ChevronRight, Star,
  Zap, Shield, Users, MapPin, Phone, Mail, FileText,
  Download, Printer, ExternalLink, Lock, Unlock,
  TrendingUp, Sparkles, Gift, Package as PackageIcon,
  ShoppingBag, History, DollarSign, GraduationCap, 
  Gauge, BarChart3, Target, Trophy, X
} from 'lucide-react';

const MyPackages = () => {
  // State for selected package view and modal
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  
  // Dummy data for student's packages - matches Laravel model structure
  const [packages] = useState({
    active: [
      {
        id: 1,
        package_name: "Full Driver Training Course",
        license_class: "Class 5",
        amount: 1299.99,
        hours: 40,
        remaining_hours: 28,
        purchased_date: "2024-01-15",
        expiry_date: "2025-01-15",
        status: "active",
        progress: 30,
        sessions_completed: 12,
        total_sessions: 20,
        next_session: "2024-12-10",
        next_session_time: "10:00 AM",
        location: {
          id: 1,
          name: "St. John's Driving School",
          address: "123 Main Street, St. John's, NL A1A 1A1",
          phone: "+1 (709) 555-0123"
        },
        instructor: {
          name: "Sarah Johnson",
          specialization: "Defensive Driving",
          rating: 4.8,
          car: "Toyota Corolla 2023",
          phone: "+1 (709) 555-0890",
          email: "sarah.johnson@terranova.com"
        },
        includes: [
          "40 hours of in-car lessons",
          "Road test preparation",
          "Online theory course",
          "Pickup and drop-off service",
          "Free mock test",
          "Certificate of completion"
        ]
      }
    ],
    history: [
      {
        id: 2,
        package_name: "Basic Driving Package",
        license_class: "Class 7",
        amount: 699.99,
        hours: 20,
        purchased_date: "2023-06-10",
        completed_date: "2023-12-15",
        status: "completed",
        certificate_issued: true,
        certificate_url: "#",
        includes: [
          "20 hours of in-car lessons",
          "Basic theory materials",
          "Introduction to road rules"
        ]
      }
    ],
    available: [
      {
        id: 3,
        package_name: "Highway Driving Course",
        license_class: "Class 5",
        amount: 399.99,
        hours: 10,
        description: "Master highway driving techniques, merging, lane changes, and high-speed navigation. Perfect for new drivers looking to gain confidence on highways.",
        includes: [
          "10 hours focused highway practice",
          "Night driving session",
          "Defensive driving techniques",
          "Weather condition training",
          "Highway merging practice",
          "Lane change confidence building"
        ],
        popularity: 85
      },
      {
        id: 4,
        package_name: "Winter Driving Package",
        license_class: "Class 5",
        amount: 349.99,
        hours: 8,
        description: "Prepare for harsh winter conditions with specialized training. Learn to handle snow, ice, and emergency situations safely.",
        includes: [
          "Skid control practice",
          "Winter braking techniques",
          "Snow and ice handling",
          "Emergency maneuver training",
          "Low visibility driving",
          "Cold weather car preparation"
        ],
        popularity: 72
      },
      {
        id: 5,
        package_name: "Refresher Course",
        license_class: "Class 5",
        amount: 249.99,
        hours: 6,
        description: "Perfect for licensed drivers wanting to refresh their skills. Ideal for those returning to driving after a break.",
        includes: [
          "6 hours of driving practice",
          "Rules of the road review",
          "Parallel parking practice",
          "Confidence building",
          "City driving techniques",
          "Parking lot maneuvers"
        ],
        popularity: 90
      }
    ]
  });

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate days remaining
  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get status color and text
  const getStatusInfo = (status, expiryDate) => {
    switch(status) {
      case 'active':
        const daysLeft = getDaysRemaining(expiryDate);
        if (daysLeft <= 7) {
          return { color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400', text: 'Expiring Soon', icon: <AlertCircle size={12} /> };
        }
        return { color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400', text: 'Active', icon: <Zap size={12} /> };
      case 'completed':
        return { color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400', text: 'Completed', icon: <CheckCircle size={12} /> };
      default:
        return { color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400', text: status, icon: null };
    }
  };

  // Active Package Card
  const ActivePackageCard = ({ pkg }) => {
    const statusInfo = getStatusInfo(pkg.status, pkg.expiry_date);
    const daysLeft = pkg.expiry_date ? getDaysRemaining(pkg.expiry_date) : null;
    
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-teal-200 dark:border-teal-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ">
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-5">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <PackageIcon size={18} className="text-white" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 ${statusInfo.color}`}>
                  {statusInfo.icon}
                  {statusInfo.text}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white">
                  {pkg.license_class}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{pkg.package_name}</h3>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">${pkg.amount}</p>
              <p className="text-xs text-white/80">+HST</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-teal-600" />
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Overall Progress</span>
              </div>
              <span className="text-2xl font-bold text-teal-600">{pkg.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-full h-4 transition-all duration-500"
                style={{ width: `${pkg.progress}%` }}
              />
            </div>
            <div className="flex justify-between mt-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Target size={14} className="text-teal-500" />
                <span>{pkg.sessions_completed} of {pkg.total_sessions} sessions</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-teal-500" />
                <span>{pkg.remaining_hours} hours remaining</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Gauge size={16} className="text-teal-600" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Hours</p>
              <p className="text-xl font-bold text-teal-600">{pkg.hours}</p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock size={16} className="text-teal-600" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Remaining</p>
              <p className="text-xl font-bold text-teal-600">{pkg.remaining_hours}</p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar size={16} className="text-teal-600" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Days Left</p>
              <p className={`text-xl font-bold ${daysLeft <= 7 ? 'text-amber-600' : 'text-teal-600'}`}>
                {daysLeft}
              </p>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Purchase Date
              </label>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{formatDate(pkg.purchased_date)}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Expiry Date
              </label>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{formatDate(pkg.expiry_date)}</p>
            </div>
          </div> */}

          {pkg.location && (
            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-teal-500" />
                <span className="text-xs font-bold text-slate-500 uppercase">Training Location</span>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{pkg.location.name}</p>
              <p className="text-xs text-slate-500 mt-1">{pkg.location.address}</p>
              <p className="text-xs text-slate-500 mt-1">{pkg.location.phone}</p>
            </div>
          )}

          {pkg.instructor && (
            <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                  <Car size={20} className="text-teal-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{pkg.instructor.name}</p>
                  <p className="text-xs text-slate-500">{pkg.instructor.specialization}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs text-slate-600">{pkg.instructor.rating}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{pkg.instructor.car}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {pkg.next_session && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={14} className="text-amber-600" />
                <span className="text-xs font-bold text-amber-600 uppercase">Upcoming Session</span>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {formatDate(pkg.next_session)} at {pkg.next_session_time}
              </p>
            </div>
          )}

          <div className="mb-6">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-2">
              <CheckCircle size={14} /> What's Included
            </label>
            <div className="grid grid-cols-2 gap-2">
              {pkg.includes.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-teal-500 flex-shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">{item}</span>
                </div>
              ))}
              {pkg.includes.length > 4 && (
                <div className="flex items-center gap-2">
                  <ChevronRight size={12} className="text-teal-500" />
                  <span className="text-xs text-slate-500">+{pkg.includes.length - 4} more</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link to="/student" className="block w-full">
  <button className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold transition-all shadow-md">
    View Schedule
  </button>
</Link>
          </div>
        </div>
      </div>
    );
  };

  // History Package Card
  const HistoryPackageCard = ({ pkg }) => {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Trophy size={16} className="text-slate-500" />
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Completed
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {pkg.license_class}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">{pkg.package_name}</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-teal-600">${pkg.amount}</p>
              <p className="text-xs text-slate-500">+HST</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Hours Completed
              </label>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{pkg.hours} hours</p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Completed Date
              </label>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{formatDate(pkg.completed_date)}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
              Package Included
            </label>
            <div className="space-y-1">
              {pkg.includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-teal-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Available Package Card 
  const AvailablePackageCard = ({ pkg }) => {
    return (
      <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative">
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <Award size={16} className="text-teal-600 dark:text-teal-400" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {pkg.license_class}
              </span>
              {pkg.popularity > 80 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Popular
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{pkg.package_name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{pkg.description}</p>
          </div>

          <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-teal-600">${pkg.amount}</span>
              <span className="text-sm text-slate-500">+HST</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{pkg.hours} hours of training</p>
          </div>

          <div className="mb-4">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              What's Included
            </label>
            <div className="space-y-2">
              {pkg.includes.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-teal-500 flex-shrink-0" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">{item}</span>
                </div>
              ))}
              {pkg.includes.length > 3 && (
                <div className="flex items-center gap-2">
                  <ChevronRight size={12} className="text-teal-500" />
                  <span className="text-xs text-slate-500">+{pkg.includes.length - 3} more features</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm group-hover:shadow-md">
              Purchase Now
            </button>
            <button 
              onClick={() => {
                setSelectedPackage(pkg);
                setIsModalOpen(true);
              }}
              className="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 relative">
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-9xl mx-auto space-y-6">
          
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
              My <span className="text-teal-600">Packages</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage your driving packages, track progress, and explore new options
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 w-full sm:w-auto">
            {[
              { id: 'active', label: 'Active Packages', count: packages.active.length, icon: <Zap size={14} /> },
              { id: 'history', label: 'History', count: packages.history.length, icon: <History size={14} /> },
              { id: 'available', label: 'Available ', count: packages.available.length, icon: <ShoppingBag size={14} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-none sm:px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-teal-600'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.id === 'active' ? 'Active' : tab.id === 'history' ? 'History' : 'Available'}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Active Packages Tab */}
          {activeTab === 'active' && (
            <div className="space-y-6">
              {packages.active.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {packages.active.map(pkg => (
                    <ActivePackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <PackageIcon size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">No active packages</p>
                  <button 
                    onClick={() => setActiveTab('available')}
                    className="mt-4 text-teal-600 font-semibold text-sm hover:underline"
                  >
                    Browse available packages →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              {packages.history.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {packages.history.map(pkg => (
                    <HistoryPackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <History size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">No package history yet</p>
                </div>
              )}
            </div>
          )}

          {/* Available Packages Tab */}
          {activeTab === 'available' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.available.map(pkg => (
                  <AvailablePackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Package Details Modal */}
      {isModalOpen && selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white pr-4">{selectedPackage.package_name}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none"
              >
                 <X size={24} />
              </button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded-full text-sm font-bold uppercase tracking-wider">
                  {selectedPackage.license_class}
                </span>
                <span className="text-3xl font-bold text-teal-600">${selectedPackage.amount}</span>
                <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                  <Clock size={16} />
                  {selectedPackage.hours} Hours Training
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-base leading-relaxed">
                {selectedPackage.description}
              </p>
              
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield size={16} className="text-teal-500" />
                  What's Included in this Package
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedPackage.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <CheckCircle size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-white dark:hover:bg-slate-800 transition-all focus:outline-none"
              >
                Close
              </button>
              <button className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg focus:outline-none flex items-center gap-2">
                Purchase Now
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPackages;