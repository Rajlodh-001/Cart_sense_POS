import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export interface VerifyCouponPayload {
  code: string;
  subTotal: number;
}

export interface VerifyCouponResponse {
  valid: boolean;
  code: string;
  discountAmount: number;
  finalAmount: number;
  message: string;
}

export const useVerifyCoupon = () => {
  return useMutation({
    mutationFn: async (data: VerifyCouponPayload) => {
      const response = await axiosInstance.post<VerifyCouponResponse>('/coupon/verify', data);
      return response.data;
    },
  });
};
