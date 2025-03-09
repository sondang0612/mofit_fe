import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutate = useCallback(async () => {
    Cookies.remove("access_token");

    window.location.reload();
  }, [queryClient, router]);

  return { mutate };
};
