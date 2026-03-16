import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, LogIn, 
  Car, Loader2, AlertCircle,
  CheckCircle, X
} from 'lucide-react';

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
          navigate('/admin');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Login Card */}
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-[2.5rem] blur-xl opacity-20 animate-pulse"></div>
        
        <div className="relative bg-white/10 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/20 to-transparent"></div>
          
          {/* Header with Logo */}
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-3xl shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
              <Car size={40} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
              Terra<span className="text-teal-400">Nova</span>
            </h1>
            <p className="text-sm text-white/60 font-medium">
              Drivers Training Management System
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mx-8 mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl backdrop-blur-xl flex items-center gap-3 animate-slideDown">
              <CheckCircle size={18} className="text-green-400 shrink-0" />
              <p className="text-sm font-medium text-green-400">{success}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mx-8 mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-xl flex items-center gap-3 animate-slideDown">
              <AlertCircle size={18} className="text-red-400 shrink-0" />
              <p className="text-sm font-medium text-red-400">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="p-8 pt-0 space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-white/60 ml-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-teal-400 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="admin@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/30 font-medium outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-white/60 ml-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-teal-400 transition-colors" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-white/30 font-medium outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-medium text-white/40 hover:text-teal-400 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-2xl py-4 font-black text-sm uppercase tracking-wider shadow-xl shadow-teal-500/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-8 text-center">
            <p className="text-xs text-white/20 font-medium">
              © 2026 TerraNova Drivers Training. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-[2rem] blur-xl opacity-30"></div>
            
            <div className="relative bg-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-teal-500/20 to-indigo-600/20 border-b border-white/10">
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
                    <p className="text-sm text-white/60">
                      We've sent password reset instructions to <br />
                      <span className="font-bold text-teal-400">{forgotEmail}</span>
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <p className="text-sm text-white/60 mb-4">
                      Enter your email address and we'll send you instructions to reset your password.
                    </p>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-teal-400 transition-colors" size={18} />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/30 font-medium outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(false)}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={forgotLoading}
                        className="flex-1 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
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

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
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