import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Zone {
  id: string;
  name: string;
  primaryColor?: string;
  secondaryColor?: string;
  iconName?: string;
  imageUrl?: string;
  groupBy?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  status: "RECEIVED" | "PREPARING" | "READY" | "SERVED";
  discount?: number;
  note?: string | null;
}

export interface Order {
  id: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  orderTime: string;
  seatCount?: number | null;
  notes?: string | null;
  orderType: "DINE_IN" | "DELIVERY" | "TAKEAWAY" | "SCHEDULED";
  totalAmount: number;
  customer?: {
    id: string;
    name: string;
    phone?: string | null;
  } | null;
  items?: OrderItem[];
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  zoneId: string;
  locationId: string;
  zone: Zone;
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED" | "DIRTY";
  isActive: boolean;
  orders?: Order[];
  reservations?: any[]; // Keep any or define Reservation type similarly if needed
  primaryColor?: string;
  secondaryColor?: string;
  iconName?: string;
  imageUrl?: string;
  groupBy?: string;
}

export function useTables(activeOnly?: boolean) {
  return useQuery({
    queryKey: ["tables", { activeOnly }],
    queryFn: async () => {
      const response = await axiosInstance.get<Table[]>("/tables", {
        params: { activeOnly }
      });
      return response.data;
    },
    refetchInterval: 10000,
  });
}

export function useZones() {
  return useQuery({
    queryKey: ["zones"],
    queryFn: async () => {
      const response = await axiosInstance.get<Zone[]>("/zones");
      return response.data;
    }
  });
}

export function useCreateZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Zone>) => {
      const res = await axiosInstance.post("/zones", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    }
  });
}

export function useDeleteZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/zones/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    }
  });
}

export function useUpdateZone() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<Zone> }) => {
      const res = await axiosInstance.patch(`/zones/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["zones"] });
    }
  });
}

export function useCreateTable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Table>) => {
      const res = await axiosInstance.post("/tables", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    }
  });
}

export function useUpdateTable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Table> }) => {
      const res = await axiosInstance.patch(`/tables/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    }
  });
}

export function useDeleteTable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/tables/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    }
  });
}

export function useClearTable() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.post(`/tables/${id}/clear`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    }
  });
}
