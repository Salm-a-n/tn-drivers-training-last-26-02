import React, { useState, useEffect, useCallback, useRef } from "react";
import Pagination from "../components/Pagination";
import { 
  Search, Mail, Download, Wallet, Banknote, 
  CreditCard, Settings, CalendarDays, FileDown, ScanEye, Eye, X, ChevronDown
} from "lucide-react";

// Payment Details Modal Component
const PaymentDetailsModal = ({ payment, onClose }) => {
  const formatCAD = (amount) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount || 0);

  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-950 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Payment <span className="text-teal-600 dark:text-teal-400">Details</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Transaction #{payment.id || 'N/A'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          {/* Amount Section */}
          <div className="text-center border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Total Amount</p>
            <p className="text-4xl font-bold text-teal-600 dark:text-teal-400">{formatCAD(payment.amount)}</p>
          </div>

          {/* Details Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Payment ID</span>
              <span className="text-sm font-medium text-slate-800 dark:text-white">{payment.id || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</span>
              <span className="text-sm text-slate-700 dark:text-slate-300">{payment.date || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Student Name</span>
              <span className="text-sm font-medium text-slate-800 dark:text-white">{payment.studentName || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</span>
              <span className="text-sm text-slate-600 dark:text-slate-300">{payment.email || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Course</span>
              <span className="text-sm text-slate-700 dark:text-slate-300">{payment.course || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Transaction ID</span>
              <span className="text-sm font-mono text-slate-600 dark:text-slate-300">{payment.transactionId || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Payment Method</span>
              <span className="text-sm text-slate-700 dark:text-slate-300">{payment.method || 'N/A'}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 py-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</span>
              <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">{formatCAD(payment.amount)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm transition-all shadow-lg shadow-teal-500/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Payments = () => {
  // --- REF FOR SCROLL TARGET ---
  const topRef = useRef(null);

  // --- SERVER-SIDE STATE ---
  const [payments, setPayments] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");     
  const [loading, setLoading] = useState(false);
  const [exactRevenue, setExactRevenue] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit = 10;
  const [emailTemplate, setEmailTemplate] = useState(
    "Hi {name}, thank you for your payment of {amount} for the {course}. Your transaction ID is {txId}. You can download your receipt here: {link}"
  );

  const formatCAD = (amount) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);

  // --- SCROLL TO TOP ON PAGE CHANGE ---
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600)); 
      const mockData = Array.from({ length: limit }, (_, i) => ({
        id: 2000 + i + (currentPage * limit),
        studentName: ["Alex Rivera", "Sam Chen", "Jordan Smith", "Maria Garcia", "Yuki Tanaka"][i % 5],
        course: "Class 5 GDL Package",
        amount: 450.00,
        method: i % 3 === 0 ? "Cash" : "Interac e-Transfer",
        transactionId: i % 3 === 0 ? `RCPT-${i}-CSH` : `TXN-${i}VXB7`,
        date: new Date().toISOString().split('T')[0],
        email: `student${i}@example.ca`,
        status: i % 2 === 0 ? "Completed" : "Pending"
      }));
      setPayments(mockData);
      setTotalItems(120); 
      setExactRevenue(filterDate === 'all' ? 45200.50 : 12450.00); 
    } catch (error) {
      console.error("Payment Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterDate, startDate, endDate]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const handleSendInvoice = (pay) => {
    const message = emailTemplate
      .replace("{name}", pay.studentName)
      .replace("{amount}", formatCAD(pay.amount))
      .replace("{course}", pay.course)
      .replace("{txId}", pay.transactionId)
      .replace("{link}", "www.drive-academy.ca/receipts/" + pay.id);

    window.location.href = `mailto:${pay.email}?subject=Payment Receipt&body=${encodeURIComponent(message)}`;
  };

  const handleDownloadAll = () => {
    const headers = ["ID", "Date", "Student Name", "Email", "Transaction ID", "Method", "Amount"];
    const csvData = payments.map(pay => [
      pay.id,
      pay.date,
      pay.studentName,
      pay.email,
      pay.transactionId,
      pay.method,
      pay.amount
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
      {/* SCROLL ANCHOR */}
      <div ref={topRef} />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-[1800px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 dark:text-white">
                Payment <span className="text-teal-600 dark:text-teal-400">Management</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                Manage and track all financial transactions, invoices, and payment history
              </p>
            </div>
            
            {/* Export Button */}
            <div className="flex justify-end w-full md:w-auto">
              <button 
                onClick={handleDownloadAll}
                className="w-full md:w-auto px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-900 dark:text-white hover:bg-teal-600 hover:text-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <FileDown size={18} />
                Export All Payments
              </button>
            </div>
          </div>

          {/* Revenue Card - Properly aligned and responsive */}
          <div className="mb-8">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full md:w-auto md:max-w-xs">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-teal-50 dark:bg-teal-900/20 text-teal-600 rounded-xl flex items-center justify-center shrink-0">
                  <Wallet size={28} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {filterDate === 'all' ? 'Total Revenue' : `${filterDate === 'today' ? "Today's" : filterDate === 'yesterday' ? "Yesterday's" : filterDate} Revenue`}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {loading ? "..." : formatCAD(exactRevenue)}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col w-full lg:flex-row items-stretch lg:items-center gap-3 sm:gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Transaction ID or Email..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm dark:text-slate-300 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
              />
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
              {['all', 'today', 'yesterday', 'range'].map(t => (
                <button 
                  key={t} 
                  onClick={() => {setFilterDate(t); setCurrentPage(1);}}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    filterDate === t 
                      ? 'bg-teal-600 text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-teal-400 hover:text-teal-600'
                  }`}
                >
                  {t === 'range' ? 'Custom Range' : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Range Date Picker */}
          {filterDate === "range" && (
            <div className="flex flex-col sm:flex-row items-center gap-3 p-5 mb-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <CalendarDays size={18} className="text-teal-500 shrink-0" />
              <div className="flex items-center gap-3 w-full">
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                />
                <span className="text-slate-400 text-sm">→</span>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium dark:text-slate-200 outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                />
              </div>
            </div>
          )}

          {/* DATA DISPLAY: TABLE (MD+) & CARDS (SM) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">ID / Date</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Student</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Transaction ID</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Method</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Amount</th>
                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {loading ? (
                    <tr><td colSpan="6" className="py-16 text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div></td></tr>
                  ) : (
                    payments.map(pay => (
                      <tr key={pay.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="text-md font-bold text-slate-800 dark:text-white">#{pay.id}</div>
                          <div className="text-sm text-slate-500 mt-0.5">{pay.date}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-md font-semibold text-slate-800 dark:text-white">{pay.studentName}</div>
                          <div className="text-sm text-slate-500 mt-0.5">{pay.email}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-md font-mono font-medium text-slate-600 dark:text-slate-400">{pay.transactionId}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-md font-medium text-slate-600 dark:text-slate-400">{pay.method}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-md font-bold text-teal-600 dark:text-teal-400">{formatCAD(pay.amount)}</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => handleViewPayment(pay)}
                              className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 rounded-lg transition-all"
                              title="View Payment Details"
                            >
                              <ScanEye size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <div className="py-12 text-center"><div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div></div>
              ) : (
                payments.map(pay => (
                  <div key={pay.id} className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-mono text-slate-400">#{pay.id} • {pay.date}</div>
                        <div className="text-base font-bold text-slate-800 dark:text-white mt-1">{pay.studentName}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{pay.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-teal-600 dark:text-teal-400">{formatCAD(pay.amount)}</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase mt-0.5">{pay.method}</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono bg-slate-50 dark:bg-slate-800 p-2 rounded-lg text-slate-600 dark:text-slate-400 truncate">
                      {pay.transactionId}
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleViewPayment(pay)}
                    className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                        title="View Payment Details"
                      >
 <ScanEye size={18} /> View Details                      
 </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex justify-center">
              <Pagination 
                currentPage={currentPage} 
                totalItems={totalItems} 
                itemsPerPage={limit} 
                onPageChange={handlePageChange} 
              />
            </div>
          </div>

          {/* Template Editor & Preview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Settings size={18} className="text-teal-500" />
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Template Editor</h3>
              </div>
              <textarea 
                className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-sm font-mono text-slate-600 dark:text-slate-300 resize-none transition-all" 
                value={emailTemplate} 
                onChange={(e) => setEmailTemplate(e.target.value)} 
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {['{name}', '{amount}', '{course}', '{txId}'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 rounded-lg text-xs font-mono font-semibold uppercase">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="bg-teal-50 dark:bg-teal-900/10 p-6 rounded-2xl border border-teal-100 dark:border-teal-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-4">Live Preview</h4>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed">
                "{emailTemplate
                  .replace('{name}', 'Alex Rivera')
                  .replace('{amount}', '$450.00')
                  .replace('{course}', 'Class 5 GDL')
                  .replace('{txId}', 'TXN-123456')}"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      {isModalOpen && selectedPayment && (
        <PaymentDetailsModal 
          payment={selectedPayment}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPayment(null);
          }}
        />
      )}
    </div>
  );
};

export default Payments;