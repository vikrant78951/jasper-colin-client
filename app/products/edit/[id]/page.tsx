
import Wrapper from "@components/ui/wrapper";
import ProductForm from "@components/forms/product-form";
import { getProductById } from "@/lib/actions/productAction";
import ErrorContainer from "@components/ui/error";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
   try {

    const {id} = await Promise.resolve(params)
    if (!id) {
      throw new Error("Missing product ID");
    }
    const { data } = await getProductById(id);

    if (!data.success) {
      throw new Error("Invalid API response: Expected an array");
    }

    return (
      <Wrapper className="flex justify-center items-center py-4 sm:py-10 h-full">
        <ProductForm action="edit" product={data.data} />
      </Wrapper>
    );
  } catch (error) {
    console.error("Failed to fetch products:", (error as Error)?.message);
    return <ErrorContainer text={"Error fetching products"} />;
  }
}
