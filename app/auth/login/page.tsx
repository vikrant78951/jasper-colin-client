import LoginForm from "@/components/forms/login-form";
import Wrapper from "@/components/ui/wrapper";

export default function Page() {
  return (
    <>
      <div>
        <Wrapper className="flex justify-center py-4 sm:py-10">
          <LoginForm />
        </Wrapper>
      </div>
    </>
  );
}
