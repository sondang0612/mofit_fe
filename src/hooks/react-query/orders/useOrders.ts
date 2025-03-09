import axiosInstance from "@/libs/axiosInstance";
import { Address, ApiResponse, Order } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

type Params = {
  page: number;
  limit: number;
};

const fetchData = asyncAuth(async (params?: Params) => {
  const response = await axiosInstance.get("orders", { params });
  return response?.data?.data;
});

const useOrders = (params: Params) => {
  return useQuery<ApiResponse<Order[]>>({
    queryKey: [queryKey.ORDERS, params],
    queryFn: () => fetchData(params),
  });
};

export { useOrders };
