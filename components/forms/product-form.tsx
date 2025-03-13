"use client";
import { ProductType } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@components/ui/input";
import { useState } from "react";
import { addProduct, updateProduct } from "@/lib/actions/productAction";
import { Loader2 } from "lucide-react";
import { toast, type ExternalToast } from "sonner";
import axios from "axios";

interface ProductFormType {
  action: "add" | "edit";
  product?: ProductType | null;
}

interface CustomToast extends ExternalToast {
  type?: "success" | "error" | "info" | "warning" | "loading" | "default";
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters." }),
  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters." }),
  price: z
    .number()
    .gt(0, { message: "Price should be greater than 1." })
    .or(
      z
        .string()
        .refine((val) => Number(val) > 0, "Price should be greater than 1.")
    ),
});

export default function ProductForm({
  action = "add",
  product = null,
}: ProductFormType) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product? product.name  : "",
      description: product? product.description  : "",
      category: product? product.category  : "",
      price: product? product.price  : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      console.log("Submitted:", values);
      let response;
      if(action==='add' && !product){
       response =  await addProduct(values);
      }else{
        if (product?._id) {
          response = await updateProduct(values, product._id);
        } else {
          throw new Error("Product ID is missing for update operation.");
        }
      }

      const { message } = response.data as { message: string };
      console.log("response.data:", response.data);
      toast(message, { closeButton: true, type: "success" } as CustomToast);
      form.reset();
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="shadow-md p-6 rounded w-sm">
        <h1 className="text-xl font-semibold mb-4">Add Product</h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Product Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Product description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Product category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (Rs.)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit Button */}
          <Button type="submit" disabled={loading ? true : false}>
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Please wait" : "Submit"}
          </Button>
        </form>
      </div>
    </Form>
  );
}
