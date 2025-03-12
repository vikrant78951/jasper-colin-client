
import { cn } from "@lib/utils";

interface PropType{
    children : React.ReactNode,
    className? : string
}

export default function Wrapper({ children, className }: PropType) {
  return <div className={cn("w-11/12 mx-auto", className)}>{children}</div>;
}