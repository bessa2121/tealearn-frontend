import axios from "axios";
import { storage } from "@/utils/storage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    window.dispatchEvent(
      new Event("show-loader")
    );

    const token =
      storage.getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    window.dispatchEvent(
      new Event("hide-loader")
    );

    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    window.dispatchEvent(
      new Event("hide-loader")
    );

    return response;
  },

  (error) => {
    window.dispatchEvent(
      new Event("hide-loader")
    );

    return Promise.reject(error);
  }
);