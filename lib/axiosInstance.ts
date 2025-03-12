import axios from "axios";

// base url 
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// public instance 
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
 
});

// protected instance 
export const axiosProtected = axios.create({
  baseURL: BASE_URL,

});

// pretected intercepter 
axiosProtected.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
