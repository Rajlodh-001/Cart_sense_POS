"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLogout } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axios";
import { Loader2, Lock, LogOut, Delete } from "lucide-react";

const IDLE_TIMEOUT = 2 * 60 * 100000; // 2 minutes

export default function IdleLockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector((state: RootState) => state.user);
  const logoutMutation = useLogout();
  const [isLocked, setIsLocked] = useState(false);
  const [pin, setPin] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Reset timer on user activity
  const resetIdleTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Only set the timer if user is authenticated and screen is not already locked
    if (user.isAuthenticated && !isLocked) {
      timerRef.current = setTimeout(() => {
        setIsLocked(true);
      }, IDLE_TIMEOUT);
    }
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "touchstart", "scroll"];

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, resetIdleTimer);
    });

    // Start timer initially if authenticated
    resetIdleTimer();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [user.isAuthenticated, isLocked]);

  // Global shortcut to lock screen: Alt + L or F9
  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === "l") || e.key === "F9") {
        e.preventDefault();
        if (user.isAuthenticated && !isLocked) {
          setIsLocked(true);
        }
      }
    };
    window.addEventListener("keydown", handleGlobalShortcuts);
    return () => {
      window.removeEventListener("keydown", handleGlobalShortcuts);
    };
  }, [user.isAuthenticated, isLocked]);

  // Reset lock state when user logs out
  useEffect(() => {
    if (!user.isAuthenticated) {
      setIsLocked(false);
      setPin("");
    }
  }, [user.isAuthenticated]);

  // 2. Physical keyboard listener when screen is locked
  useEffect(() => {
    if (!isLocked) return;

    const handlePhysicalKeyDown = (e: KeyboardEvent) => {
      if (isVerifying) return;

      if (e.key >= "0" && e.key <= "9") {
        setIsError(false);
        const currentPin = pin.length >= 4 ? "" : pin;
        const nextPin = currentPin + e.key;
        setPin(nextPin);
        if (nextPin.length === 4) {
          verifyPin(nextPin);
        }
      } else if (e.key === "Backspace") {
        setIsError(false);
        setPin((prev) => prev.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handlePhysicalKeyDown);
    return () => {
      window.removeEventListener("keydown", handlePhysicalKeyDown);
    };
  }, [isLocked, pin, isVerifying]);

  // 3. Verify PIN against Backend
  const verifyPin = async (pinToVerify: string) => {
    if (!user.tenantDetail?.location?.id) return;
    setIsVerifying(true);
    setIsError(false);

    try {
      // Validate credentials by calling the login endpoint with the current location and PIN
      const res = await axiosInstance.post("/auth/login", {
        locationId: user.tenantDetail.location.id,
        pin: pinToVerify,
      });

      if (res.data?.accessToken) {
        localStorage.setItem("pos_session_token", res.data.accessToken);
      }

      // If success, unlock screen
      setIsLocked(false);
      setPin("");
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err.response?.data?.message || "Invalid PIN");
      // Reset PIN after displaying error
      setTimeout(() => {
        setPin("");
      }, 1000);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleKeypadClick = (num: string) => {
    if (isVerifying) return;
    setIsError(false);
    const currentPin = pin.length >= 4 ? "" : pin;
    const nextPin = currentPin + num;
    setPin(nextPin);
    if (nextPin.length === 4) {
      verifyPin(nextPin);
    }
  };

  const handleBackspace = () => {
    if (isVerifying) return;
    setIsError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSwitchUser = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      {children}

      {/* Lock Screen Overlay */}
      {isLocked && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-100/90 backdrop-blur-md transition-all duration-500 animate-in fade-in">
          <div className="w-full max-w-[360px] p-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xl flex flex-col items-center justify-center text-slate-800 relative mx-4">
            <div className="relative z-10 flex flex-col items-center w-full">
              {/* User Avatar */}
              <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-md uppercase mb-4">
                {user.name?.charAt(0) || "U"}
              </div>

              {/* User Info */}
              <h2 className="text-xl font-bold text-slate-800">
                {user.name || "Staff Member"}
              </h2>
              <span className="mt-1 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {String(user.role?.name || "Staff")}
              </span>

              <div className="mt-6 flex flex-col items-center w-full">
                <div className="flex items-center gap-1.5 text-slate-400 mb-6 text-xs font-medium">
                  <Lock size={12} className="text-blue-500" />
                  <span>Terminal Locked due to inactivity</span>
                </div>

                {/* PIN dots */}
                <div
                  className={`flex gap-4 mb-6 h-6 items-center justify-center ${isError ? "animate-shake" : ""}`}
                >
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full transition-all duration-200 ${
                        i < pin.length
                          ? isError
                            ? "bg-red-500 scale-110 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
                            : "bg-blue-600 scale-110"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Error/Verification Message */}
                <div className="h-6 mb-4 flex items-center justify-center">
                  {isVerifying ? (
                    <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                      <Loader2 className="animate-spin" size={14} />
                      <span>Verifying PIN...</span>
                    </div>
                  ) : isError ? (
                    <p className="text-red-500 text-xs font-bold uppercase tracking-wider">
                      {errorMessage}
                    </p>
                  ) : (
                    <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">
                      Enter 4-digit PIN
                    </p>
                  )}
                </div>

                {/* Number Pad Grid */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-[280px]">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleKeypadClick(num.toString())}
                      disabled={isVerifying}
                      className="h-16 w-full rounded-xl bg-slate-50 border border-slate-200 text-xl font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all shadow-sm disabled:opacity-50"
                    >
                      {num}
                    </button>
                  ))}
                  <div className="col-span-1" />
                  <button
                    onClick={() => handleKeypadClick("0")}
                    disabled={isVerifying}
                    className="h-16 w-full rounded-xl bg-slate-50 border border-slate-200 text-xl font-semibold text-slate-700 hover:bg-blue-50 hover:border-blue-200 active:scale-95 transition-all shadow-sm disabled:opacity-50"
                  >
                    0
                  </button>
                  <button
                    onClick={handleBackspace}
                    disabled={isVerifying}
                    className="h-16 w-full rounded-xl flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-500 active:scale-95 transition-all shadow-sm disabled:opacity-50"
                  >
                    <Delete className="w-6 h-6" />
                  </button>
                </div>

                {/* Switch User / Sign Out */}
                <button
                  onClick={handleSwitchUser}
                  className="mt-8 flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-red-50 hover:text-red-500 border border-slate-200 rounded-xl text-sm font-semibold text-slate-500 transition-all active:scale-95"
                >
                  <LogOut size={16} />
                  <span>Switch User / Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shake animations style */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20%,
          60% {
            transform: translateX(-6px);
          }
          40%,
          80% {
            transform: translateX(6px);
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </>
  );
}
