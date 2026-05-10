"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSessionStatus } from "@/hooks/useAuth";
import ItemsContainer from "@/components/pos/ItemsContainer";
import OrderContainer from "@/components/pos/OrderContainer";
import ConnectionError from "@/components/shared/ConnectionError";
import { Loader2 } from "lucide-react";

const PosPage = () => {
  const router = useRouter();
  const { data: session, isLoading, isError } = useSessionStatus();

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
    return <ConnectionError entityName="your session" />;
  }

  if (!session?.isLoggedIn) return null;

  return (
    <div className="min-h-screen md:h-screen w-full flex flex-col md:flex-row bg-[#f0f2f5] overflow-x-hidden">
      {/* Left — Menu (Top on Mobile, Left on Tablets/Desktop) */}
      <div className="w-full md:w-[60%] xl:w-[70%] 2xl:w-[75%] flex-none md:flex-1 bg-bgdarkgray overflow-hidden">
        <ItemsContainer />
      </div>
      
      {/* Right — Order (Bottom on Mobile, Right on Tablets/Desktop) */}
      <div className="w-full md:w-[40%] xl:w-[30%] 2xl:w-[25%] flex-none border-t md:border-t-0 md:border-l border-gray-200 bg-white shadow-2xl md:shadow-none z-10">
        <div className="h-[70vh] md:h-full">
          <OrderContainer />
        </div>
      </div>
    </div>
  );
};

export default PosPage;

