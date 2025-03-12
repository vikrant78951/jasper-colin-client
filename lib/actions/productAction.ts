import { axiosPublic } from "../axiosInstance";
import { API } from "@lib/data";

export async function addProduct(data : {name : string, description:string, price : string | number}){
  return await  axiosPublic.post(`${API.products}`, data, {});
}