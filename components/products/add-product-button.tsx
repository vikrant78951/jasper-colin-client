'use client'

import { useSelector } from "react-redux"
import { RootState } from "@redux/store" 
import Link from "next/link";
import { Button } from "@components/ui/button";


export default function AddProductButton(){
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
      return (
        <Button>
          <Link href="/products/add">Add Product</Link>
        </Button>
      );
    }
    
    return (<></>)

}