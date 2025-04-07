import axiosInstance from "@/libs/axiosInstance";
import { Address, ApiResponse, Order } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";
import { ERole } from "@/utils/constants/role.enum";

type Params = {
  page: number;
  limit: number;
};

const fetchData = asyncAuth(
  async (params?: Params) => {
    const response = await axiosInstance.get("orders/me", { params });
    return response?.data?.data;
  },
  { roles: [ERole.ADMIN, ERole.USER] }
);

const useMyOrder = (params: Params) => {
  const { data, ...query } = useQuery<ApiResponse<Order[]>>({
    queryKey: [queryKey.ORDERS, params],
    queryFn: () => fetchData(params),
  });

  return {
    ...query,
    data: data?.data,
  };
};

export { useMyOrder };
