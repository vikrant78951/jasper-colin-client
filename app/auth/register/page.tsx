import RegisterForm from "@/components/forms/register-form";
import Wrapper from "@/components/ui/wrapper";

export default function Page() {
  return (
    <>
      
        <Wrapper className="flex justify-center py-4 sm:py-10">
          <RegisterForm />
        </Wrapper>
      
    </>
  );
}
