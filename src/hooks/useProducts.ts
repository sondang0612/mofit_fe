import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, Product } from "@/types/api";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (): Promise<ApiResponse<Product[]>> => {
  const res = await axiosInstance.get("products");
  return res.data;
};

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: queryFn,
  });
};

export { useProducts };
