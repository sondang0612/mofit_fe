import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, Brand } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

const fetchData = async () => {
  const response = await axiosInstance.get(`brands`);
  return response?.data;
};

const useBrands = () => {
  return useQuery<ApiResponse<Brand[]>>({
    queryKey: [queryKey.BRANDS],
    queryFn: fetchData,
  });
};

export { useBrands };
