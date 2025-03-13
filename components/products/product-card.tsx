'use client'
import { ProductType } from "@/lib/definitions";



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { deleteProduct } from "@/lib/actions/productAction";
import { toast, type ExternalToast } from "sonner";
import axios from "axios";
import { Button } from "@components/ui/button";
import Link from "next/link";


interface CustomToast extends ExternalToast {
  type?: "success" | "error" | "info" | "warning" | "loading" | "default";
}



export default function ProductCard({
  product,
  onDelete,
}: {
  product: ProductType;
  onDelete: (id: string)=>void}) {
  const authentication = true;

  const deleteProductHandler = async (id: string) => {
    try {
      const { data } = await deleteProduct(id);
      if (!data.success) {
        throw new Error("");
      }
      toast(data.message, {
        closeButton: true,
        type: "success",
      } as CustomToast);
      onDelete(id)
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast(errorMessage, {
        closeButton: true,
        type: "error",
      } as CustomToast);
    }
  };

  return (
    <Card
      key={product._id}
      className={"gap-4 transition hover:scale-105 cursor-pointer "}
    >
      <CardHeader className="flex-grow pr-1">
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <CardDescription className={"font-semibold"}>
          {product.category}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Price : <span className={"font-semibold"}>{product.price}</span> /.
        </p>
      </CardContent>
      {authentication && (
        <CardFooter className={"flex gap-2"}>
          <Button variant={"outline"}>
            <Link href={"/products/edit/" + product._id}>Edit</Link>
          </Button>
          <Button
            variant={"outline"}
            className={"hover:bg-red-600 hover:text-white transition"}
            onClick={() =>
              product._id ? deleteProductHandler(product._id) : null
            }
          >
            Delete Product
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}