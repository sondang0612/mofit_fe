"use client";

import { queryKey } from "@/hooks/react-query/queryKey";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { toast } from "react-toastify";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
          mutations: {
            onError: (error, _, context: any) => {
              if (error?.message && error?.message.includes("401")) {
                toast.error(`Vui lòng đăng nhập`);
              } else if (error?.message && error?.message.includes("403")) {
                toast.error(`Không có quyền truy cập`);
              } else {
                const errorMessage =
                  context?.meta?.errorMessage || "Có lỗi xảy ra!";
                toast.error(errorMessage);
              }
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
