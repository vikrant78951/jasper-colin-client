import { axiosInstance } from "../axiosInstance";
import { API } from "@lib/data";
import { ProductType } from "../definitions";

export async function addProduct(data: ProductType) {
  return await axiosInstance.post(`${API.products}`, data, {});
}

export async function updateProduct(data: ProductType,_id: string) {
  return await axiosInstance.put(`${API.products}/${_id}`, data, {});
}

export async function getProductById(_id: string) {
  return await axiosInstance.get(`${API.products}/${_id}`);
}

export async function deleteProduct(_id: string) {
  return await axiosInstance.delete(`${API.products}/${_id}`);
}