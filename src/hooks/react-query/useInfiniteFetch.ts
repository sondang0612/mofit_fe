import axiosInstance from "@/libs/axiosInstance";
import { removeUndefinedParams } from "@/utils/removeUndefinedParams";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchData = async <T>({
  pageParam = 1,
  endpoint,
  limit,
  sort,
  sortBy,
  attributeName,
}: {
  pageParam: any;
  endpoint: string;
  limit?: number;
  sortBy?: string;
  sort?: "ASC" | "DESC";
  attributeName?: string;
}): Promise<{ data: T[]; total: number }> => {
  const params = removeUndefinedParams({
    page: pageParam,
    limit,
    sort,
    sortBy,
    attributeName,
  });

  const response = await axiosInstance.get(endpoint, { params });

  return {
    data: response.data.data.data,
    total: response.data.data.total,
  };
};

const useInfiniteFetch = <T>({
  endpoint,
  limit = 10,
  sortBy = "createdAt",
  sort = "DESC",
  attributeName,
}: {
  endpoint: string;
  limit?: number;
  sortBy?: string;
  sort?: "ASC" | "DESC";
  attributeName?: string;
}) => {
  const query = useInfiniteQuery<{ data: T[]; total: number }>({
    queryKey: [endpoint, { limit, attributeName, sort, sortBy }],
    queryFn: ({ pageParam }) =>
      fetchData<T>({ pageParam, endpoint, limit, attributeName, sort, sortBy }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.flatMap((page) => page.data).length < lastPage.total) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  return {
    ...query,
    data: query.data?.pages.flatMap((page) => page.data) || undefined,
  };
};

export default useInfiniteFetch;
