import { getStorage } from "../util";
import axios, { AxiosInstance } from "axios";

let baseURL = import.meta.env.API_BASE_URL;

if (!baseURL) baseURL = "https://manage-product-be-production.up.railway.app/";

export const InstanceAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

InstanceAxios.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${getStorage("token")}`;
  }

  return config;
});
