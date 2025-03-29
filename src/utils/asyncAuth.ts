import { cookiesKey } from "@/libs/cookiesKey";
import Cookies from "js-cookie";
import { ERole } from "./constants/role.enum";
import { toast } from "react-toastify";

interface AuthOptions {
  roles?: string[];
}

const asyncAuth = <T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: AuthOptions = { roles: [ERole.USER] }
) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | any> => {
    try {
      const accessToken = Cookies.get(cookiesKey.ACCESS_TOKEN);
      if (!accessToken) {
        return null;
      }

      if (options?.roles && options.roles.length > 0) {
        const userRole = Cookies.get(cookiesKey.ROLE);
        if (!userRole || (userRole && !options.roles.includes(userRole))) {
          throw new Error(
            `Forbidden: Required roles [${options.roles?.join(", ")}]`
          );
        }
      }

      return await fn(...args);
    } catch (err) {
      console.error("asyncAuth Error:", err);
      throw err;
    }
  };
};

export { asyncAuth };
