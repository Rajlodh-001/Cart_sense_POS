"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStatus } from "@/hooks/useAuth";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import GlobalSidebar from "@/components/shared/GlobalSidebar";
import UnifiedTopBar from "@/components/shared/UnifiedTopBar";
import { Bell, Loader2 } from "lucide-react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session, isLoading, isError } = useSessionStatus();
  const { isOpen, setIsOpen, toggle } = useSidebar();

  useEffect(() => {
    if (!isLoading && !isError) {
      if (!session?.isActivated || !session?.isLoggedIn) {
        const currentPath = window.location.pathname + window.location.search;
        router.replace(`/auth/login?next=${encodeURIComponent(currentPath)}`);
      }
    }
  }, [session, isLoading, isError, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8F9FB] gap-4">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 font-medium">Verifying session...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8F9FB] gap-4">
        <p className="text-red-500 font-bold">Failed to verify session</p>
      </div>
    );
  }

  if (!session?.isLoggedIn) return null;

  return (
    <div className="flex h-screen w-full bg-[#f8f9fb] text-gray-900 overflow-hidden theme-admin font-sans">
      {/* Persistent / Responsive Global Sidebar */}
      <GlobalSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Content Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col p-4 md:p-6 md:pl-0  lg:pl-0 lg:p-8">
        {/* Unified Top Header */}
        <UnifiedTopBar
          variant="admin"
          title="Flagship Store (HQ)"
          subtitle="Management Node"
          onMenuClick={toggle}
          rightActions={
            <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-600 border border-gray-100 shadow-sm transition-all active:scale-95">
              <Bell size={18} />
            </button>
          }
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
}
