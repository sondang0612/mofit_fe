import axios from "axios";
import Cookies from "js-cookie";
import { cookiesKey } from "./cookiesKey";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.your-domain.com";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(cookiesKey.ACCESS_TOKEN);

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove(cookiesKey.ACCESS_TOKEN);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
