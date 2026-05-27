import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Device {
  id: string;
  name: string;
  deviceType: 'TERMINAL' | 'KDS' | 'CUSTOMER_DISPLAY';
  slug: string;
  isActive: boolean;
}

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const res = await axiosInstance.get<Device[]>("/devices");
      return res.data;
    },
  });
};

export const useCreateDevice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; deviceType?: string; slug?: string }) => {
      const res = await axiosInstance.post("/devices", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
};
