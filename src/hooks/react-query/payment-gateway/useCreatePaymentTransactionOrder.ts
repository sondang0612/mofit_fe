import axiosInstance from "@/libs/axiosInstance";
import { asyncAuth } from "@/utils/asyncAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "../queryKey";
import { toast } from "react-toastify";

type Params = {
  cartItemIds?: any[];
  shippingMethod?: string;
  shippingPrice?: number;
  paymentMethod?: string;
  discount?: number;
  vat?: number;
  subTotal?: number;
  totalPrice?: number;
  addressId?: number;
  query?: any;
};

const fetchData = asyncAuth(async (params?: Params) => {
  const response = await axiosInstance.post(
    `payment-transaction/create-order?`,
    params
  );
  return response?.data;
});

const useCreatePaymentTransactionOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Đặt hàng thành công`);
      queryClient.invalidateQueries({ queryKey: [queryKey.CART_INFO] });
    },
    onError: () => {
      toast.error("Thanh toán không hợp lệ");
    },
  });
};

export { useCreatePaymentTransactionOrder };
