import { cookiesKey } from "@/libs/cookiesKey";
import Cookies from "js-cookie";

const asyncAuth = (fn: (...args: any[]) => Promise<any>) => {
  return async function (...args: any[]) {
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
