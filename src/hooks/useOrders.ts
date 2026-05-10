import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface CreateOrderPayload {
  orderNo: number;
  userId: string;
  deviceId?: string;
  customerId?: string;
  tableId?: string;
  seatCount?: number;
  subTotal: number;
  tax: number;
  totalAmt: number;
  type: "DINE_IN" | "DELIVERY" | "TAKEAWAY";
  paymentMethod?: "CASH" | "CARD" | "QR" | "OTHER";
  cashReceived?: number;
  changeReturned?: number;
  discount?: number;
  notes?: string;
  coupon?: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
    note?: string;
  }[];
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateOrderPayload) => {
      const response = await axiosInstance.post("/order", data); // assuming the endpoint is /order
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateOrderPayload> & { status?: string } }) => {
      const response = await axiosInstance.patch(`/order/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["orderHistory"] });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
  });
}

export function useOrders(filters?: {
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: async () => {
      const response = await axiosInstance.get("/order", { params: filters });
      return response.data; // Expected format: { data: Order[], total: number, page: number, lastPage: number }
    },
    refetchInterval: 100000, // Poll every 100s for real-time KDS/Billing updates
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/order/${id}`);
      return response.data.order; // Return the nested order object directly
    },
    enabled: !!id, // Only run the query if an ID is provided
    staleTime: 60000, // Consider the details fresh for 1 minute
  });
}

export function useOrderHistory(filters?: {
  status?: string;
  type?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["orderHistory", filters],
    queryFn: async () => {
      const response = await axiosInstance.get("/order/history", {
        params: filters,
      });
      return response.data; // Expected format: { orders: Order[], totalCount: number, ... }
    },
    staleTime: 30000,
  });
}
export function useUpdateOrderItemStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await axiosInstance.patch(`/order-item/${id}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderHistory"] });
    },
  });
}
