import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, Shield, Award, Users, Clock, MapPin, 
  ChevronRight, Star, Phone, Mail, CheckCircle,
  BookOpen, CreditCard, Calendar, UserCheck,
  Menu, X
} from 'lucide-react';
import RegistrationPage from './RegistrationPage';

const LandingPage = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      
      {/* ==================== NAVBAR ==================== */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className=" mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 gap-1">
            
            {/* Logo - Compressed for < 350px */}
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
              {/* <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg">
                <Car size={18} className="sm:w-7 sm:h-7" />
              </div> */}
              <div className="w-30 sm:w-70 h-18 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white  dark:bg-teal-900/20">
              <img 
                src="/logo.webp" 
                alt="Terra Nova Logo" 
                className="w-full h-full object-contain p-1"
              />

           
            </div>
              {/* <div className="truncate">
                <h1 className="text-[13px] sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                  Terra<span className="text-teal-500">Driving</span>
                </h1>
                <p className="hidden xs:block text-[7px] sm:text-[10px] font-bold text-teal-500 uppercase tracking-wider">
                  School of Excellence
                </p>
              </div> */}
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 lg:gap-8">
              <a href="#about" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 transition">About</a>
              <a href="#packages" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 transition">Packages</a>
              <a href="#process" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 transition">How It Works</a>
              <a href="#testimonials" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 transition">Testimonials</a>
              <a href="#contact" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-500 transition">Contact</a>
            </div>

            {/* Auth Buttons - Always visible, scaled for small screens */}
            <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
              <Link 
                to="/login" 
                className="px-2 sm:px-6 py-2 text-[10px] sm:text-sm font-black text-teal-600 dark:text-teal-400 border border-teal-500 rounded-lg sm:rounded-xl hover:bg-teal-50 transition-all"
              >
                Sign In
              </Link>
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="px-2 sm:px-6 py-2 text-[10px] sm:text-sm font-black text-white bg-gradient-to-r from-teal-500 to-indigo-600 rounded-lg sm:rounded-xl hover:shadow-xl transition-all"
              >
                Register
              </button>
              
              {/* Mobile menu toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1 text-slate-600 dark:text-slate-300"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
  <div className="lg:hidden py-2 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-top-2">
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
      <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 dark:text-slate-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition whitespace-nowrap">
        About
      </a>
      <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 dark:text-slate-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition whitespace-nowrap">
        Packages
      </a>
      <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 dark:text-slate-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition whitespace-nowrap">
        Steps
      </a>
      <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 dark:text-slate-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition whitespace-nowrap">
        Testimonials
      </a>
      <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 dark:text-slate-300 px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition whitespace-nowrap">
        Contact
      </a>
    </div>
  </div>
)}
        </div>
      </nav>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 px-3 py-1 rounded-full text-[10px] sm:text-sm font-bold mb-4">
                <Shield size={12} />
                <span>Canada's #1 Driving School</span>
              </div>
              
              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4 leading-tight">
                Learn to Drive with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
                  Confidence
                </span>
              </h1>
              
              <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto md:mx-0">
                Join thousands of successful drivers who trusted TerraDriving for their journey.
              </p>

              <div className="flex flex-col xs:flex-row justify-center md:justify-start gap-3">
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  Get Started
                  <ChevronRight size={16} />
                </button>
                <a 
                  href="#packages" 
                  className="bg-white dark:bg-slate-800 border-2 border-slate-200 text-slate-700 dark:text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-center"
                >
                  Packages
                </a>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80" 
                alt="Driving"
                className="relative rounded-[2rem] shadow-2xl object-cover w-full h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ==================== ABOUT SECTION ==================== */}
      <section id="about" className="py-12 sm:py-20 bg-white dark:bg-slate-900">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-teal-500 font-black text-[10px] sm:text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mt-2">
              Canada's Most Trusted{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
                Driving School
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Award size={28} className="sm:w-8 sm:h-8 text-teal-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3">Certified Instructors</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                All our instructors are fully licensed and have years of teaching experience.
              </p>
            </div>

            <div className="text-center p-4 sm:p-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Clock size={28} className="sm:w-8 sm:h-8 text-teal-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3">Flexible Scheduling</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Book lessons at times that work best for you, including evenings and weekends.
              </p>
            </div>

            <div className="text-center p-4 sm:p-8 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MapPin size={28} className="sm:w-8 sm:h-8 text-teal-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3">Multiple Locations</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Convenient locations across Canada with modern training vehicles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STEP BY STEP PROCESS ==================== */}
      <section id="process" className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-950">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-teal-500 font-black text-[10px] sm:text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mt-2">
              Get Licensed in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
                4 Easy Steps
              </span>
            </h2>
          </div>

          {/* Steps Grid - Responsive */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {[
              { num: 1, title: "Create Account", desc: "Sign up with your basic information and choose your preferred package.", icon: UserCheck, time: "5 minutes" },
              { num: 2, title: "Get Approved", desc: "Our admin team reviews your application and assigns you an instructor.", icon: Clock, time: "24-48 hours" },
              { num: 3, title: "Book Lessons", desc: "Schedule your driving lessons at times that work best for you.", icon: Calendar, time: "Flexible scheduling" },
              { num: 4, title: "Get Licensed", desc: "Complete your training and pass your road test with confidence.", icon: Award, time: "98% success rate" }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-indigo-600 rounded-[1.5rem] sm:rounded-[2rem] opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 dark:border-slate-700 group-hover:border-transparent transition">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-teal-500">{step.num}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-3 sm:mb-4">{step.desc}</p>
                  <div className="flex items-center gap-2 text-teal-500 text-xs sm:text-sm font-bold">
                    <step.icon size={14} className="sm:w-4 sm:h-4" />
                    <span>{step.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8 sm:mt-12">
            <button 
              onClick={() => setShowRegisterModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
            >
              Start Your Journey Today
              <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================== PACKAGES SECTION ==================== */}
      <section id="packages" className="py-12 sm:py-20 bg-white dark:bg-slate-900">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-teal-500 font-black text-[10px] sm:text-sm uppercase tracking-wider">Our Packages</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mt-2">
              Choose Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
                Perfect Plan
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Package 1 - Beginner */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Car size={22} className="sm:w-6 sm:h-6 text-teal-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">Beginner Package</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">Perfect for first-time drivers</p>
              <div className="text-2xl sm:text-3xl font-black text-teal-500 mb-4 sm:mb-6">$450</div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-teal-500" />
                  <span>10 hours in-car training</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-teal-500" />
                  <span>Classroom sessions</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-teal-500" />
                  <span>Practice test materials</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="w-full py-2 sm:py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-black text-xs sm:text-sm hover:bg-teal-500 hover:text-white transition"
              >
                Select Package
              </button>
            </div>

            {/* Package 2 - Standard (Featured) */}
            <div className="relative bg-gradient-to-br from-teal-500 to-indigo-600 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 shadow-2xl scale-100 sm:scale-105 transform">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full text-[8px] sm:text-xs font-black uppercase whitespace-nowrap">
                Most Popular
              </div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Award size={22} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Standard Package</h3>
              <p className="text-xs sm:text-sm text-white/80 mb-3 sm:mb-4">Best value for most students</p>
              <div className="text-2xl sm:text-3xl font-black text-white mb-4 sm:mb-6">$650</div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li className="flex items-center gap-2 text-xs sm:text-sm text-white">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-white" />
                  <span>15 hours in-car training</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-white">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-white" />
                  <span>All classroom materials</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-white">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-white" />
                  <span>1 mock road test</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="w-full py-2 sm:py-3 bg-white text-teal-600 rounded-xl font-black text-xs sm:text-sm hover:bg-slate-100 transition"
              >
                Select Package
              </button>
            </div>

            {/* Package 3 - Premium */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                <Shield size={22} className="sm:w-6 sm:h-6 text-teal-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">Premium Package</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">Maximum preparation</p>
              <div className="text-2xl sm:text-3xl font-black text-teal-500 mb-4 sm:mb-6">$850</div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <li className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-teal-500" />
                  <span>20 hours in-car training</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-teal-500" />
                  <span>Premium study materials</span>
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 text-teal-500" />
                  <span>2 mock road tests</span>
                </li>
              </ul>
              <button 
                onClick={() => setShowRegisterModal(true)}
                className="w-full py-2 sm:py-3 border-2 border-teal-500 text-teal-500 rounded-xl font-black text-xs sm:text-sm hover:bg-teal-500 hover:text-white transition"
              >
                Select Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials" className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-950">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-teal-500 font-black text-[10px] sm:text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mt-2">
              What Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-600">
                Students Say
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl">
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={14} className="sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-4 sm:mb-6">
                  "The instructors at TerraDriving were amazing! I passed my G2 test on the first try. The online portal made scheduling so easy."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-black text-sm sm:text-base">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <p className="font-black text-slate-900 dark:text-white text-sm sm:text-base">Sarah Johnson</p>
                    <p className="text-[10px] sm:text-xs text-slate-500">G2 Licensed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT SECTION ==================== */}
      <section id="contact" className="py-12 sm:py-20 bg-white dark:bg-slate-900">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-500 to-indigo-600 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 relative overflow-hidden">
            
            {/* Background Pattern - Mobile optimized */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-black/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 sm:gap-12 items-center text-center md:text-left">
              
              {/* Left Content */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4 sm:mb-6">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
                  Join thousands of successful drivers who chose TerraDriving for their training.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-white">
                    <Phone size={16} className="sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base md:text-lg font-bold">1-800-TERRA-DRIVE</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-white">
                    <Mail size={16} className="sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base md:text-lg font-bold">info@terradriving.com</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-white">
                    <MapPin size={16} className="sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base md:text-lg font-bold">Multiple locations across Canada</span>
                  </div>
                </div>
              </div>

              {/* Right CTA */}
              <div className="text-center md:text-right">
                <button 
                  onClick={() => setShowRegisterModal(true)}
                  className="inline-block bg-white text-teal-600 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg md:text-xl uppercase tracking-wider shadow-2xl hover:shadow-3xl hover:scale-105 transition-all"
                >
                  Register Now
                </button>
                <p className="text-white/80 mt-3 sm:mt-4 text-[10px] sm:text-xs md:text-sm">
                  No credit card required • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-slate-900 text-white py-8 sm:py-12">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                  <Car size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-base sm:text-xl font-black">TerraDriving</span>
              </div>
              <p className="text-slate-400 text-[10px] sm:text-sm">
                Canada's most trusted driving school since 2010.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><a href="#about" className="text-slate-400 hover:text-white transition text-[10px] sm:text-sm">About Us</a></li>
                <li><a href="#packages" className="text-slate-400 hover:text-white transition text-[10px] sm:text-sm">Packages</a></li>
                <li><a href="#process" className="text-slate-400 hover:text-white transition text-[10px] sm:text-sm">How It Works</a></li>
                <li><a href="#contact" className="text-slate-400 hover:text-white transition text-[10px] sm:text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Support</h4>
              <ul className="space-y-1 sm:space-y-2">
                <li><Link to="/login" className="text-slate-400 hover:text-white transition text-[10px] sm:text-sm">Student Login</Link></li>
                <li><Link to="/login" className="text-slate-400 hover:text-white transition text-[10px] sm:text-sm">Instructor Login</Link></li>
                <li>
                  <button 
                    onClick={() => setShowRegisterModal(true)}
                    className="text-slate-400 hover:text-white transition text-[10px] sm:text-sm"
                  >
                    Register
                  </button>
                </li>
                <li><a href="#" className="text-slate-400 hover:text-white transition text-[10px] sm:text-sm">FAQ</a></li>
              </ul>
            </div>

            {/* Hours */}
            <div>
              <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">Hours</h4>
              <ul className="space-y-1 sm:space-y-2 text-slate-400 text-[10px] sm:text-sm">
                <li>Mon-Fri: 8am - 8pm</li>
                <li>Saturday: 9am - 5pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-6 sm:mt-12 pt-6 sm:pt-8 text-center text-slate-400 text-[10px] sm:text-sm">
            <p>&copy; {new Date().getFullYear()} TerraDriving School. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-auto animate-in fade-in zoom-in duration-300">
            <RegistrationPage 
              onBack={() => setShowRegisterModal(false)} 
              initialData={null}
            />
            <button 
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-110 p-1.5 sm:p-2 bg-black/50 hover:bg-red-500 text-white rounded-full transition-all shadow-xl"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;