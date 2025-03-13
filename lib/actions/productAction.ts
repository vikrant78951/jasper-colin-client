import { axiosPublic } from "../axiosInstance";
import { API } from "@lib/data";
import { ProductType } from "../definitions";

export async function addProduct(data: ProductType) {
  return await axiosPublic.post(`${API.products}`, data, {});
}

export async function updateProduct(data: ProductType,_id: string) {
  return await axiosPublic.put(`${API.products}/${_id}`, data, {});
}

export async function getProductById(_id: string) {
  return await axiosPublic.get(`${API.products}/${_id}`);
}

export async function deleteProduct(_id: string) {
  return await axiosPublic.delete(`${API.products}/${_id}`);
}