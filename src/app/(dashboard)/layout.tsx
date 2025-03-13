import PosPage from "./pos/page";

export default function dashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* Left */}
      <div className="w-full">
        <PosPage />
      </div>
    </div>
  );
}
