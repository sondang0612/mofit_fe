import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, Attribute } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

const fetchData = async () => {
  const response = await axiosInstance.get(`attributes`);
  return response?.data;
};

const useAttributes = () => {
  const { data, ...query } = useQuery<ApiResponse<Attribute[]>>({
    queryKey: [queryKey.ATTRIBUTES],
    queryFn: fetchData,
  });

  return {
    ...query,
    data: data ? [{ id: 99, label: "All", value: "all" }, ...data?.data] : [],
  };
};

export { useAttributes };
