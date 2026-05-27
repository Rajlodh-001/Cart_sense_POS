"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  Delete,
  Lock,
  User,
  Eye,
  EyeOff,
  Store,
  LogIn,
  ChevronRight,
  Loader2,
  LogOut,
} from "lucide-react";
import { useLogin, useSessionStatus, useActivateStore, useDevices } from "@/hooks/useAuth";

export default function POSLogin() {
  const [activeTab, setActiveTab] = useState<"pin" | "password" | "activate" | "register">("pin");
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  
  const queryClient = useQueryClient();

  // Terminal Status & Mutations
  const { data: sessionStatus, isLoading: isStatusLoading } = useSessionStatus();
  const activateMutation = useActivateStore();
  const loginMutation = useLogin();
  const { data: devices, isLoading: isDevicesLoading } = useDevices();

  const isActivated = sessionStatus?.isActivated;

  const handleDeactivate = () => {
    localStorage.removeItem("pos_terminal_token");
    localStorage.removeItem("pos_session_token");
    localStorage.removeItem("pos_device_id");
    localStorage.removeItem("pos_device_name");
    setSelectedDeviceId(null);
    queryClient.invalidateQueries({ queryKey: ["sessionStatus"] });
  };

  // Form States
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Activation States
  const [orgName, setOrgName] = useState("Cartsens HQ");
  const [locationSkuId, setLocationSkuId] = useState("HQ-STORE-001");
  const [activationPwd, setActivationPwd] = useState("password123");

  const router = useRouter();

  // Load selected register on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedDeviceId(localStorage.getItem("pos_device_id"));
    }
  }, []);

  // Sync state with session status
  useEffect(() => {
    if (sessionStatus?.isLoggedIn) {
      router.push("/pos");
      return;
    }

    if (sessionStatus && !sessionStatus.isActivated) {
      setActiveTab("activate");
    } else if (sessionStatus?.isActivated) {
      const storedDevId = localStorage.getItem("pos_device_id");
      if (!storedDevId) {
        setActiveTab("register");
      } else if (activeTab === "activate" || activeTab === "register") {
        setActiveTab("pin");
      }
    }
  }, [sessionStatus, activeTab, router]);

  // Auto-clear PIN on error after a brief delay to show the "wrong" state
  useEffect(() => {
    if (loginMutation.isError && activeTab === "pin") {
      const timer = setTimeout(() => {
        setPin("");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loginMutation.isError, activeTab]);

  // Physical keyboard listener for PIN login
  useEffect(() => {
    if (activeTab !== "pin" || !isActivated || loginMutation.isPending) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        loginMutation.reset();
        const currentPin = pin.length >= 4 ? "" : pin;
        const nextPin = currentPin + e.key;
        setPin(nextPin);
        if (nextPin.length === 4) {
          handleLogin(undefined, nextPin);
        }
      } else if (e.key === "Backspace") {
        loginMutation.reset();
        setPin((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pin, activeTab, isActivated, loginMutation.isPending]);



  // Activation Handler
  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    activateMutation.mutate({
      organization: orgName,
      locationSkuId: locationSkuId,
      password: activationPwd,
    });
  };

  // Login Handler
  const handleLogin = (e?: React.FormEvent, overridePin?: string) => {
    if (e) e.preventDefault();
    loginMutation.reset(); 

    const finalPin = overridePin || pin;

    if (activeTab === "password" && email && password && sessionStatus?.locationId) {
      loginMutation.mutate({ 
        locationId: sessionStatus.locationId,
        email, 
        password 
      });
    } else if (activeTab === "pin" && finalPin.length >= 4 && sessionStatus?.locationId) {
      // PIN Login for Cashiers (No email needed)
      loginMutation.mutate({
        locationId: sessionStatus.locationId,
        pin: finalPin,
      });
    }
  };

  // PIN Pad Logic
  const handlePinClick = (num: string) => {
    loginMutation.reset();
    
    // If we already have 4 digits (e.g. after an error), start over
    const currentPin = pin.length >= 4 ? "" : pin;
    const nextPin = currentPin + num;
    
    setPin(nextPin);
    
    if (nextPin.length === 4) {
      handleLogin(undefined, nextPin);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {isStatusLoading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-medium animate-pulse">Initializing Terminal...</p>
        </div>
      ) : (
        <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] md:min-h-[640px]">
        {/* Left Side: Branding & Info */}
        <div className="w-full md:w-1/2 bg-blue-600 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full border-4 border-white" />
            <div className="absolute -left-10 bottom-20 w-40 h-40 rounded-full bg-white" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Store className="w-8 h-8" />
              <span className="font-bold text-2xl tracking-wide">
                CartSens POS
              </span>
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
          {/* Header */}
          <div className="mb-8">
            {!isActivated ? (
              <>
                <h2 className="text-2xl font-bold text-slate-800">
                  Terminal Activation
                </h2>
                <p className="text-slate-500 text-sm">
                  Enter your organization credentials to link this device.
                </p>
              </>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Staff Authentication
                  </h2>
                  <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span>{sessionStatus?.locationName || "Store Context Active"}</span>
                    {selectedDeviceId && (
                      <span 
                        onClick={() => {
                          localStorage.removeItem("pos_device_id");
                          localStorage.removeItem("pos_device_name");
                          setSelectedDeviceId(null);
                          setActiveTab("register");
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-bold underline cursor-pointer"
                        title="Click to switch active register"
                      >
                        ({localStorage.getItem("pos_device_name") || "Switch Register"})
                      </span>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDeactivate}
                  className="text-xs text-red-500 hover:text-red-600 border border-red-200 bg-red-50/50 hover:bg-red-50 font-bold flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all active:scale-95 flex-shrink-0 animate-in fade-in"
                  title="De-activate terminal to switch organization / location"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Reset Store</span>
                </button>
              </div>
            )}
          </div>

          {/* Tabs - Only show when activated and device is selected */}
          {isActivated && selectedDeviceId && activeTab !== "register" && (
            <div className="flex bg-slate-100 p-1 rounded-lg mb-8">
              <button
                onClick={() => {
                  setActiveTab("pin");
                  loginMutation.reset();
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "pin"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Lock className="w-4 h-4" /> Cashier PIN
              </button>
              <button
                onClick={() => {
                  setActiveTab("password");
                  loginMutation.reset();
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "password"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <User className="w-4 h-4" /> Manager Login
              </button>
            </div>
          )}

          {/* Error Display */}
          {(loginMutation.isError || activateMutation.isError) && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
              <span className="mr-2">●</span> 
              {((loginMutation.error || activateMutation.error) as any)?.response?.data?.message || "Operation failed"}
            </div>
          )}

          {/* Step Based Forms */}
          {!isActivated ? (
            /* Step 1: Activation Form */
            <form onSubmit={handleActivate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Cartsens POS Corporate"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Location SKU ID
                </label>
                <input
                  type="text"
                  value={locationSkuId}
                  onChange={(e) => setLocationSkuId(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="BK-BO-001"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Activation Password
                </label>
                <input
                  type="password"
                  value={activationPwd}
                  onChange={(e) => setActivationPwd(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={activateMutation.isPending}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
              >
                {activateMutation.isPending ? "Activating..." : "Activate Terminal"}
              </button>
            </form>
          ) : activeTab === "register" ? (
            /* Step 3: Register Selection Form */
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Select Register Device</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Select which physical register this terminal represents.
                </p>
              </div>

              {isDevicesLoading ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="animate-spin text-blue-600 mb-2" size={24} />
                  <p className="text-xs font-semibold text-slate-400">Loading registers...</p>
                </div>
              ) : !devices || devices.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-sm font-bold text-slate-500 mb-4">No registers found for this location.</p>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem("pos_device_id", "fallback-register");
                      localStorage.setItem("pos_device_name", "Main Register");
                      setSelectedDeviceId("fallback-register");
                      setActiveTab("pin");
                      queryClient.invalidateQueries({ queryKey: ["sessionStatus"] });
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-all"
                  >
                    Use Default Register
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {devices.map((device) => (
                    <button
                      key={device.id}
                      type="button"
                      onClick={() => {
                        localStorage.setItem("pos_device_id", device.id);
                        localStorage.setItem("pos_device_name", device.name);
                        setSelectedDeviceId(device.id);
                        setActiveTab("pin");
                        queryClient.invalidateQueries({ queryKey: ["sessionStatus"] });
                      }}
                      className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/20 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <span className="block font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                          {device.name}
                        </span>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          Type: {device.deviceType || "TERMINAL"}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Step 2: Login Forms */
            <>
              {activeTab === "pin" ? (
                <div className="flex flex-col items-center">
                  {/* PIN Dots Display */}
                  <div className={`flex gap-4 mb-8 h-8 items-center justify-center ${loginMutation.isError ? "animate-shake" : ""}`}>
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full transition-all duration-200 ${
                          i < pin.length 
                            ? loginMutation.isError ? "bg-red-500 scale-110 shadow-[0_0_10px_rgba(239,68,68,0.4)]" : "bg-blue-600 scale-110" 
                            : "bg-slate-200"
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
                    <div className="col-span-1" />
                    <button
                      onClick={() => handlePinClick("0")}
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
                  {/* Verifying Spinner / Status Message Area (Stable height to prevent layout shifts) */}
                  <div className="mt-8 h-[52px] w-full max-w-[280px] flex items-center justify-center">
                    {loginMutation.isPending ? (
                      <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                        <Loader2 className="animate-spin" size={16} />
                        <span>Verifying PIN...</span>
                      </div>
                    ) : (
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] animate-pulse">
                        Auto-Verifying Matrix
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                /* Password Interface */
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address / Employee ID
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="manager@nexuspos.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="login-password"
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
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    id="login-submit"
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                  >
                    {loginMutation.isPending ? (
                      <span>Logging in...</span>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4" /> Access Dashboard
                      </>
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
        </div>
      )}
    </div>
  );
}
