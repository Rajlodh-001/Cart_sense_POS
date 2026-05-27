"use client";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import GlobalSidebar from "@/components/shared/GlobalSidebar";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useSidebar();
  
  return (
    <div className="h-screen w-full flex bg-[#F8F9FB] overflow-hidden theme-pos font-sans">
      <GlobalSidebar 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}
