'use client'
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const params = useParams(); 

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {params.id}</p>
    </div>
  );
}
