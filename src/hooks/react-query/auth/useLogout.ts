import { cookiesKey } from "@/libs/cookiesKey";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutate = useCallback(async () => {
    Cookies.remove(cookiesKey.ACCESS_TOKEN);
    Cookies.remove(cookiesKey.ROLE);

    window.location.reload();
  }, [queryClient, router]);

  return { mutate };
};
