import { Button } from "@/components/ui/button";
import Wrapper from "@components/ui/wrapper";
import Link from "next/link";


export default function Home() {
  return (
    <div className="py-4 sm:py-10 md:py-14">
      <Wrapper className="sm:text-center">
        <h1 className="text-xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-b from-gray-400  to-gray-900 text-transparent bg-clip-text">
          Welcome to Assissment
        </h1>
        <p className="text-md sm:text-xl text-gray-500 font-semibold pt-1 pb-4 sm:py-4 ">by Jasper Colin</p>
        <div className="flex gap-4 sm:mt-4 md:mt-10 sm:justify-center">
          <Button variant={"outline"}>
            <Link href="/products">Check Product</Link>
          </Button>
          <Button>
            <Link href="/auth/login">Get Started</Link>
          </Button>
        </div>
      </Wrapper>
    </div>
  );
}
