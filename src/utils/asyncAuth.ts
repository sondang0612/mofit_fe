import { cookiesKey } from "@/libs/cookiesKey";
import Cookies from "js-cookie";

const asyncAuth = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | any> => {
    try {
      const accessToken = Cookies.get(cookiesKey.ACCESS_TOKEN);
      if (!accessToken) {
        return null;
      }

      return await fn(...args);
    } catch (err) {
      console.error("asyncAuth Error:", err);
      throw err;
    }
  };
};

export { asyncAuth };
