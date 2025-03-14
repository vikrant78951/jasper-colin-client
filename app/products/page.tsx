import { axiosInstance } from "@/lib/axiosInstance";
import { API } from "@/lib/data";
import Wrapper from "@/components/ui/wrapper";

import ErrorContainer from "@components/ui/error";
import ProductList from "@/components/products/product-list";
import AddProductButton from "@/components/products/add-product-button";
export default async function Page() {
  try {
     const { data } = await axiosInstance.get(API.products, {
       headers: {
         "Cache-Control": "no-cache, no-store, must-revalidate",
         Pragma: "no-cache",
         Expires: "0",
       },
       params: { _t: Date.now() }, // Add timestamp to bypass cache
     });

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
