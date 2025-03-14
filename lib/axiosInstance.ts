import axios from "axios";

// base url 
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// public instance 
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials:true,
});
