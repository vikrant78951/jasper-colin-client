import { axiosInstance } from "@/lib/axiosInstance";
import { API } from "@/lib/data";
import Wrapper from "@/components/ui/wrapper";
import { Suspense } from "react";
import ErrorContainer from "@components/ui/error";
import ProductList from "@/components/products/product-list";
import AddProductButton from "@/components/products/add-product-button";
import Spinner from "@components/ui/spinner";

export async function Component() {
  try {
    const { data } = await axiosInstance.get(API.products);

    if (!Array.isArray(data.data)) {
      throw new Error("Invalid API response: Expected an array");
    }

    return (
      <div className="py-4 w-full">
        <Wrapper>
          <div className="flex justify-between  items-center mb-2 ">
            <h1 className={"text-xl text-semibold "}>Products</h1>

           <AddProductButton/>
          </div>
          <ProductList initialData={data.data} />
        </Wrapper>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch products:", (error as Error)?.message);
    return <ErrorContainer text={"Error fetching products"} />;
  }
}

export default async function Page() {
  return (
    <Suspense
      fallback={
        <div className="p-4 w-full flex justify-center items-center">
          <Spinner />
        </div>
      }
    >
      <Component />
    </Suspense>
  );
}