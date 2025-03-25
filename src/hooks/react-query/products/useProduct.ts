import axiosInstance from "@/libs/axiosInstance";
import { Address, ApiResponse, Order, Product } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

type Params = {
  id?: number;
};

const fetchData = async (params?: Params) => {
  const response = await axiosInstance.get(`products/${params?.id}`);
  return response?.data?.data;
};

const useProduct = (params: Params) => {
  return useQuery<Product>({
    queryKey: [queryKey.PRODUCTS, params?.id],
    queryFn: () => fetchData(params),
    enabled: !!params?.id,
  });
};

export { useProduct };
