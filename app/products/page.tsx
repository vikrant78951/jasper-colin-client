import { axiosPublic } from "@/lib/axiosInstance";
import { API } from "@/lib/data";
import Wrapper from "@/components/ui/wrapper";

import { Button } from "@components/ui/button";
import ErrorContainer from "@components/ui/error";
import Link from "next/link";
import ProductList from "@/components/products/product-list";

export default async function Page() {
  try {
    const { data } = await axiosPublic.get(API.products);
    const authentication: boolean = true;
    if (!Array.isArray(data.data)) {
      throw new Error("Invalid API response: Expected an array");
    }

    return (
      <div className="py-4">
        <Wrapper>
          <div className="flex justify-between  items-center mb-2 ">
            <h1 className={"text-xl text-semibold "}>Products</h1>

            {authentication && (
              <Button>
                <Link href="/products/add">Add Product</Link>
              </Button>
            )}
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
