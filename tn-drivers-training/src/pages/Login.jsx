import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a network delay for a realistic feel
    setTimeout(() => {
      const { email } = formData;

      if (email === 'admin@gmail.com') {
        setSuccess('Login successful! Redirecting to Admin Dashboard...');
        localStorage.setItem('access_token', 'fake-admin-token');
        localStorage.setItem('user', JSON.stringify({ email, role: 'admin', name: 'Admin User' }));
        
        setTimeout(() => {
          navigate('/Dashboard');
        }, 1500);
      } 
      else if (email === 'instructor@gmail.com') {
        setSuccess('Login successful! Redirecting to Instructor Dashboard...');
        localStorage.setItem('access_token', 'fake-instructor-token');
        localStorage.setItem('user', JSON.stringify({ email, role: 'instructor', name: 'Instructor User' }));
        
        setTimeout(() => {
          navigate('/instructor');
        }, 1500);
      } 
      else if (email === 'student@gmail.com') {
        setSuccess('Login successful! Redirecting to Instructor Dashboard...');
        localStorage.setItem('access_token', 'fake-instructor-token');
        localStorage.setItem('user', JSON.stringify({ email, role: 'student', name: 'student name ' }));
        
        setTimeout(() => {
          navigate('/student');
        }, 1500);
      }
      else {
        setError('Invalid email or password. Use admin@gmail.com or instructor@gmail.com');
        setLoading(false);
      }
    }, 1000);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotLoading(true);
    
    // Simulate process
    setTimeout(() => {
      setForgotSuccess(true);
      setForgotLoading(false);
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotSuccess(false);
        setForgotEmail('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display antialiased h-screen overflow-hidden">
      <div className="flex h-full w-full flex-col lg:flex-row">
        
        {/* Left Side: Branding & Visuals - Exact match with bolder text */}
        <div className="relative hidden lg:flex lg:w-1/2 dynamic-waves flex-col justify-between p-12 overflow-hidden">
          {/* Background Decoration - Exact SVG */}
          <div className="absolute inset-0 opacity-30">
            <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,400 C150,300 350,500 500,400 C650,300 800,400 800,400 L800,800 L0,800 Z" fill="rgba(236, 91, 19, 0.1)"></path>
              <path d="M0,500 C200,400 400,600 600,500 C700,450 800,500 800,500 L800,800 L0,800 Z" fill="rgba(168, 85, 247, 0.1)"></path>
            </svg>
          </div>

          {/* Logo - Exact */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ec5b13] text-white">
              <span className="material-symbols-outlined text-3xl">deployed_code</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">TerraNova</h1>
          </div>

          {/* Heading Text - Exact with bolder text */}
          <div className="relative z-10 max-w-lg">
            <h2 className="text-5xl font-black leading-tight text-white mb-6">
              Drivers Training <br/>
              <span className="text-[#ec5b13] font-black">Management System.</span>
            </h2>
            <p className="text-lg text-slate-300 font-medium leading-relaxed">
              Experience the next generation of fleet safety and driver education. Streamlined compliance, advanced analytics, and interactive learning modules.
            </p>
          </div>

          {/* Stats - Exact with bolder text */}
          <div className="relative z-10 flex gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white">12k+</span>
              <span className="text-sm font-bold text-slate-400">Certified Drivers</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white">98%</span>
              <span className="text-sm font-bold text-slate-400">Safety Rating</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white">24/7</span>
              <span className="text-sm font-bold text-slate-400">Support</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form - Exact match with bolder text */}
        <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-6 sm:p-12 bg-[#f8f6f6] dark:bg-[#0a0a1a]">
          <div className="w-full max-w-md space-y-8">
            
            {/* Mobile Branding - Exact */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ec5b13] text-white">
                <span className="material-symbols-outlined">deployed_code</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight dark:text-white">TerraNova</h1>
            </div>

            {/* Welcome Text - Exact with bolder text */}
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tight dark:text-white">Welcome back</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your details to sign in to your account.</p>
            </div>

            {/* Success Message */}
            {success && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3">
                <CheckCircle size={18} className="text-green-400 shrink-0" />
                <p className="text-sm font-bold text-green-400">{success}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3">
                <AlertCircle size={18} className="text-red-400 shrink-0" />
                <p className="text-sm font-bold text-red-400">{error}</p>
              </div>
            )}

            {/* Gradient Outline Container - Exact match */}
            <div className="gradient-outline p-8 rounded-xl shadow-2xl dark:bg-[#0f172a]/20">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Field - Exact */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">mail</span>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="name@company.com"
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 pl-11 py-3 focus:border-[#ec5b13] focus:ring-[#ec5b13] dark:text-white transition-all outline-none font-medium"
                    />
                  </div>
                </div>

                {/* Password Field - Exact */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300" htmlFor="password">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs font-bold text-[#ec5b13] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">lock</span>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 pl-11 pr-12 py-3 focus:border-[#ec5b13] focus:ring-[#ec5b13] dark:text-white transition-all outline-none font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#ec5b13] transition-colors text-sm font-bold"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Remember Me - Exact */}
                <div className="flex items-center gap-2">
                  <input
                    className="rounded border-slate-300 text-[#ec5b13] focus:ring-[#ec5b13]"
                    id="remember"
                    type="checkbox"
                  />
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400" htmlFor="remember">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button - Exact with orange color */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-black py-3 px-4 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span className="font-black">Signing in...</span>
                    </>
                  ) : (
                    <span className="font-black">Sign In</span>
                  )}
                </button>
              </form>

              {/* Social Login Divider - Exact */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#f8f6f6] dark:bg-[#12122b] px-2 text-slate-500 font-bold">Or continue with</span>
                </div>
              </div>

              {/* Social Login Buttons - Exact */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <img
                    alt="Google Logo"
                    className="h-5 w-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWCclILgnPwrsuLbNsbUNGZawDAsmq_FOxThqGCNiU8Ha_9CMmW7JW6gjU5wY-Zg-EHIJCDIdWrDtf_WmJ6leWubQDdzR17KPolqD5HeJ04pQTyyQ6Gz_nVs8kXsixMrAgqlT7cIAayVBRWaRuTzcz5cN1sqoBpb8_JCeLeVhixRsz0wn20ImCPUdG4-ufEHsdxrTqR-L2er_j46G9TOtnCwPUJPPGIh32Y0E8-GfQmUVPLo7_VAg6_vo5RjpOwM9dir2OdNEF-7U"
                  />
                  <span className="text-sm font-black dark:text-white">Google</span>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-slate-900 dark:text-white">language</span>
                  <span className="text-sm font-black dark:text-white">SSO</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link - Exact */}
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 font-medium">
              Don't have an account? 
              <a className="font-black text-[#ec5b13] hover:underline ml-1" href="#">
                Request Access
              </a>
            </p>

            {/* Footer - Exact */}
            <footer className="mt-auto pt-8 text-xs text-slate-400 flex gap-4 justify-center font-bold">
              <a className="hover:text-[#ec5b13] transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-[#ec5b13] transition-colors" href="#">Terms of Service</a>
              <span>© 2024 TerraNova Inc.</span>
            </footer>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal - Keep as is with your design */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ec5b13] to-indigo-500 rounded-[2rem] blur-xl opacity-30"></div>
            
            <div className="relative bg-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-[#ec5b13]/20 to-indigo-600/20 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                    Reset Password
                  </h3>
                  <button
                    onClick={() => {
                      setShowForgotModal(false);
                      setError('');
                      setForgotEmail('');
                    }}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X size={18} className="text-white/60" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {forgotSuccess ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-2xl mb-4 border border-green-500/30">
                      <CheckCircle size={32} className="text-green-400" />
                    </div>
                    <h4 className="text-lg font-black text-white mb-2">Check Your Email</h4>
                    <p className="text-sm text-white/60 font-medium">
                      We've sent password reset instructions to <br />
                      <span className="font-black text-[#ec5b13]">{forgotEmail}</span>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <p className="text-sm text-white/60 font-medium mb-4">
                      Enter your email address and we'll send you instructions to reset your password.
                    </p>
                    
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-xl">mail</span>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/30 font-medium outline-none focus:border-[#ec5b13]/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(false)}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-xl font-black text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={forgotLoading}
                        className="flex-1 py-3 bg-gradient-to-r from-[#ec5b13] to-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {forgotLoading ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Reset Link'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Material Icons and Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      
      <style>{`
        .gradient-outline {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }
        .gradient-outline::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(45deg, #ec5b13, #a855f7, #3b82f6);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .dynamic-waves {
          background: radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
                      linear-gradient(135deg, #0a0a1a 0%, #1e1b4b 100%);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default Login;