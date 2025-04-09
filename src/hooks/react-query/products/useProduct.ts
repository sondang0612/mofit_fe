import axiosInstance from "@/libs/axiosInstance";
import { Product } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

type Params = {
  slug?: string;
};

const fetchData = async (params?: Params) => {
  const response = await axiosInstance.get(`products/${params?.slug}`);
  return response?.data?.data;
};

const useProduct = (params: Params) => {
  const { data, ...query } = useQuery<Product>({
    queryKey: [queryKey.PRODUCTS, params?.slug],
    queryFn: () => fetchData(params),
    enabled: !!params?.slug,
  });

  return { ...query, data };
};

export { useProduct };
