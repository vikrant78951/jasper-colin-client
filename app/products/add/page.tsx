
import Wrapper from "@components/ui/wrapper";
import ProductForm from "@components/forms/product-form";


export default function Page() {
  


  return (
    <Wrapper className="flex justify-center items-center py-4 md:py-10 h-full">
      <ProductForm action="add" />
    </Wrapper>
  );
}
