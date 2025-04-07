import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, Brand } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

const fetchData = async () => {
  const response = await axiosInstance.get(`brands`);
  return response?.data;
};

const useBrands = () => {
  const { data, ...query } = useQuery<ApiResponse<Brand[]>>({
    queryKey: [queryKey.BRANDS],
    queryFn: fetchData,
  });

  return {
    ...query,
    data: data?.data,
  };
};

export { useBrands };
