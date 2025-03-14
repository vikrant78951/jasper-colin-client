"use client";
import { useState } from "react";
import { ProductType } from "@lib/definitions";
import ProductCard from "./product-card";
import { Input } from "@/components/ui/input";

export default function ProductList({
  initialData,
}: {
  initialData: ProductType[];
}) {
  const [products, setProducts] = useState<ProductType[]>(initialData);
  const [search, setSearch] = useState("");

  const handleDelete = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {products.length > 0 && (
        <div className="flex justify-between items-center mb-4 w-full max-w-md">
          <Input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <p className="text-center">No product found!</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}
