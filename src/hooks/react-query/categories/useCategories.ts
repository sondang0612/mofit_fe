import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, Category } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

const fetchData = async () => {
  const response = await axiosInstance.get("categories");
  return response?.data;
};

const useCategories = () => {
  const { data, ...query } = useQuery<ApiResponse<Category[]>>({
    queryKey: [queryKey.CATEGORIES],
    queryFn: fetchData,
  });

  return {
    ...query,
    data: data?.data,
  };
};

export { useCategories };
