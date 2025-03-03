import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutate = useCallback(async () => {
    Cookies.remove("access_token");

    queryClient.resetQueries({ exact: true });

    queryClient.clear();

    await new Promise((resolve) => setTimeout(resolve, 100));

    router.push("/");
  }, [queryClient, router]);

  return { mutate };
};
