import PosPage from "./pos/page";


export default function dashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
        {/* Left */}
        <div className="w-[70%] md:w-[60%] bg-blue-400">
            {/* <PosPage/> */}

        </div>
        {/* Right */}
        <div className="w-[30%] md:w-[40%] bg-red-400"></div>

    </div>
  );
}
