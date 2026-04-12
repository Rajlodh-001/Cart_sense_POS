import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Table {
  id: string;
  name: string;
  capacity: number;
  zoneId: string;
  locationId: string;
  zone: {
    id: string;
    name: string;
  };
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED" | "DIRTY";
  orders?: {
    id: string;
    orderTime: string;
    customer?: { name: string };
    items?: { name: string; quantity: number; status: string }[];
  }[];
  reservations?: { id: string; customerName: string; startTime: string }[];
}

export function useTables() {
  return useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const response = await axiosInstance.get<Table[]>("/tables");
      return response.data;
    },
    refetchInterval: 10000,
  });
}
