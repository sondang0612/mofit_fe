import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, Order } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { ERole } from "@/utils/constants/role.enum";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

type Params = {
  txnRef?: string | undefined | null;
  transactionStatus?: string | undefined | null;
  responseCode?: string | undefined | null;
  transactionNo?: string | undefined | null;
  orderId?: string | undefined | null;
};

const fetchData = asyncAuth(
  async (params?: Params) => {
    const response = await axiosInstance.get("orders", { params });
    return response?.data?.data;
  },
  { roles: [ERole.ADMIN, ERole.USER] }
);

const useOrderByTxnRef = (params: Params) => {
  const { data, ...query } = useQuery<ApiResponse<Order[]>>({
    queryKey: [queryKey.ORDERS, params],
    queryFn: () => fetchData(params),
    enabled: Object.values(params).every(
      (v) => typeof v === "string" && v.trim() !== ""
    ),
  });

  return {
    ...query,
    data: data?.data && data?.data?.length > 0 ? data?.data[0] : undefined,
  };
};

export { useOrderByTxnRef };
