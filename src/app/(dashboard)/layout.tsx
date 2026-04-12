"use client";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full flex bg-[#F8F9FB] overflow-hidden theme-pos font-sans">
      {/* Main Content Area - Modules will handle their own TopBars */}
      <main className="flex-1 flex overflow-hidden relative">{children}</main>
    </div>
  );
}
