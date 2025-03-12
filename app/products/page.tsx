import { ProductType } from "@lib/definitions";
import { axiosPublic } from "@/lib/axiosInstance";
import {API} from '@/lib/data';
import Wrapper from "@/components/ui/wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import ErrorContainer from "@components/ui/error";
import Link from 'next/link'

export default async function Page() {
  try {
    const { data } = await axiosPublic.get(API.products);
    console.log("Fetched Products:", data); 

    const authentication : boolean = true
  
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

          <div className="grid gap-4 grid-cols-1 ms:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            {data.data.map((product: ProductType) => (
              <Card
                key={product._id}
                className={"gap-4 transition hover:scale-105 cursor-pointer "}
              >
                <CardHeader className="flex-grow pr-1">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Price :{" "}
                    <span className={"font-semibold"}>{product.price}</span>
                  </p>
                </CardContent>
                {authentication && (
                  <CardFooter className={" flex gap-2"}>
                    <Button variant={"outline"}>Edit</Button>
                    <Button
                      variant={"outline"}
                      className="hover:bg-red-600 hover:text-white transition"
                    >
                      Delete Product
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </Wrapper>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch products:", (error as Error)?.message);
    return <ErrorContainer text={"Error fetching products"} />;
  }
}
