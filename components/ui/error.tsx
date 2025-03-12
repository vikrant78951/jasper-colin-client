import Wrapper from "./wrapper";
import { TriangleAlert } from "lucide-react";

export default function Error({ text }: { text: string }) {
  return (
    <Wrapper className="py-4">
      <div className="flex flex-col gap-2 md:gap-4 justify-center items-center md:pt-10 text-semibold ">
        <TriangleAlert className="text-red-400" size={40} />
        {text} !
      </div>
    </Wrapper>
  );
}
