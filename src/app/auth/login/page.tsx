// import React from 'react'

// const Login = () => {
//   return (
//     <div>Login</div>
//   )
// }

// export default Login



"use client";

import React, { useState } from 'react';
import { Delete, Lock, User, Eye, EyeOff, Store, LogIn, ChevronRight } from 'lucide-react';

export default function POSLogin() {
  const [activeTab, setActiveTab] = useState<'pin' | 'password'>('pin');
  const [pin, setPin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock Login Handler
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      // Add your actual authentication logic here
      if (activeTab === 'pin' && pin === '1234') {
        alert("Cashier Login Successful!");
      } else if (activeTab === 'password' && email && password) {
        alert("Admin Login Successful!");
      } else {
        setError("Invalid credentials. Please try again.");
        setPin('');
      }
    }, 1000);
  };

  // PIN Pad Logic
  const handlePinClick = (num: string) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
      setError('');
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[600px]">
        
        {/* Left Side: Branding & Info */}
        <div className="w-full md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            {/* Abstract Background Pattern */}
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full border-4 border-white" />
            <div className="absolute -left-10 bottom-20 w-40 h-40 rounded-full bg-white" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Store className="w-8 h-8" />
              <span className="font-bold text-2xl tracking-wide">CartSens POS</span>
            </div>
            <p className="text-blue-100">Retail Management System v2.4</p>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Please authenticate to access the terminal.
            </p>
          </div>
          
          <div className="text-xs text-blue-200 relative z-10">
            &copy; 2024 Nexus Solutions Inc.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
            <button
              onClick={() => { setActiveTab('pin'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'pin' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Lock className="w-4 h-4" /> Cashier PIN
            </button>
            <button
              onClick={() => { setActiveTab('password'); setError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'password' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <User className="w-4 h-4" /> Manager Login
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center animate-in fade-in slide-in-from-top-1">
              <span className="mr-2">●</span> {error}
            </div>
          )}

          {/* PIN Interface */}
          {activeTab === 'pin' ? (
            <div className="flex flex-col items-center">
              {/* PIN Dots Display */}
              <div className="flex gap-4 mb-8 h-8 items-center justify-center">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      i < pin.length ? 'bg-blue-600 scale-110' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Number Pad Grid */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePinClick(num.toString())}
                    className="h-16 w-full rounded-xl bg-slate-50 border border-slate-200 text-xl font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all shadow-sm"
                  >
                    {num}
                  </button>
                ))}
                <div className="col-span-1" /> {/* Spacer */}
                <button
                  onClick={() => handlePinClick('0')}
                  className="h-16 w-full rounded-xl bg-slate-50 border border-slate-200 text-xl font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all shadow-sm"
                >
                  0
                </button>
                <button
                  onClick={handleBackspace}
                  className="h-16 w-full rounded-xl flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 active:scale-95 transition-all shadow-sm"
                >
                  <Delete className="w-6 h-6" />
                </button>
              </div>

              <button
                onClick={() => handleLogin()}
                disabled={pin.length === 0 || isLoading}
                className="mt-8 w-full max-w-[280px] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? 'Verifying...' : (
                    <>Login to Terminal <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          ) : (
            /* Password Interface */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="manager@nexuspos.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                 {isLoading ? (
                     <span>Logging in...</span>
                 ) : (
                     <>
                        <LogIn className="w-4 h-4" /> Access Dashboard
                     </>
                 )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}