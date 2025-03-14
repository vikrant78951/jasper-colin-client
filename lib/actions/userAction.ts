import { axiosInstance } from "../axiosInstance";
import { API } from "@lib/data";

export async function logout() {
  return await axiosInstance.post(`${API.logout}`);
}