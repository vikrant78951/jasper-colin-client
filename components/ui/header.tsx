import Wrapper from '@components/ui/wrapper'
import Logo from '@components/ui/logo'
import Nav from "@components/ui/nav";
import { NAV } from "@lib/data";

export default function Header (){

    return (
      <header className="p-2 shadow-sm sticky top-0 left-0 right-0 bg-background">
        <Wrapper className={" flex flex-col sm:flex-row justify-between items-center"}>
          <Logo />
          <Nav data={NAV} />
        </Wrapper>
      </header>
    );
}