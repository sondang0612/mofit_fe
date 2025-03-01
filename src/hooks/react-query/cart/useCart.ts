import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, Cart } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

const fetchData = asyncAuth(async () => {
  const response = await axiosInstance.get("cart/info");
  return response?.data;
});

const useCart = () => {
  return useQuery<ApiResponse<Cart>>({
    queryKey: [queryKey.CART_INFO],
    queryFn: fetchData,
  });
};

export { useCart };
