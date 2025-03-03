import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, CartItem } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

interface Params {
  id?: undefined;
}

const fetchData = asyncAuth(async () => {
  const response = await axiosInstance.get("cart/me");
  return response?.data;
});

const useCart = (param?: Params) => {
  return useQuery<ApiResponse<CartItem[]>>({
    queryKey: [queryKey.CART_INFO, param?.id],
    queryFn: fetchData,
  });
};

export { useCart };
