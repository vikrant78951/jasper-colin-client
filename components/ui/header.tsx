import Wrapper from '@components/ui/wrapper'
import Logo from '@components/ui/logo'
import Nav from "@components/ui/nav";
import { NAV } from "@lib/data";

export default function Header (){

    return (
      <header className="p-2 shadow-sm ">
        <Wrapper className={" flex justify-between items-center"}>
          <Logo />
          <Nav data={NAV} />
        </Wrapper>
      </header>
    );
}