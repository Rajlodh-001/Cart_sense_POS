import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Address {
  flat?: string;
  building?: string;
  street?: string;
  city: string;
  zip?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  addressByFields?: Address;
  notes?: string;
}

export interface CreateCustomerPayload {
  name: string;
  phone: string;
  addressByFields?: Address;
  notes?: string;
}

export function useCustomerByPhone(phone: string) {
  return useQuery({
    queryKey: ["customer", phone],
    queryFn: async () => {
      if (!phone || phone.length < 10) return null;
      try {
        const response = await axiosInstance.get(`/customer/phone/${phone}`);
        return response.data.customer as Customer;
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: phone.length >= 10,
    retry: false,
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCustomerPayload) => {
      const response = await axiosInstance.post("/customer", data);
      return response.data.customer as Customer;
    },
    onSuccess: (newCustomer) => {
      queryClient.setQueryData(["customer", newCustomer.phone], newCustomer);
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
}
