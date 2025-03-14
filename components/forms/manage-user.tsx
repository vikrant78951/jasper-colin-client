"use client";

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import { logout } from "@/lib/actions/userAction";
import { clearUser } from "@/redux/authSlice/authSlice";

export default function ManageUser() {
  const dispatch = useDispatch()

  interface RootState {
    auth: {
      user: { [key: string]: string };
      isAuthenticated: boolean;
    };
  }

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const logoutHandler  = async ()=>{
    const {data} = await logout()
    if(data.success){dispatch(clearUser())}
    
  }

  console.log(user, isAuthenticated);

  return (
    <>
      {!user && !isAuthenticated ? (
        <NavigationMenuItem className="hover:underline hover:bg-transparent  data-[active=true]:bg-transparent">
          <Link href={"/auth/login"} legacyBehavior passHref>
            <NavigationMenuLink>Login</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ) : (
        <>
          <div className={"hidden sm:flex"}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="flex items-center space-x focus:outline-none"
                >
                  <div>
                    <span className="h-8 w-8 rounded flex items-center justify-center bg-gray-400 text-2xl font-medium ">
                      {user.name[0]}
                    </span>
                  </div>
                  <div className="flex flex-col items-start ">
                    <h5 className="leading-none text-xl">{user.name}</h5>
                    <p className="text-foreground/80 leading-none text-sm">
                      {user.email}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <Button
                  variant={"ghost"}
                  onClick={logoutHandler}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  Logout
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className={"block sm:hidden"}>
            <Button
              variant={"outline"}
              onClick={logoutHandler}
              className="flex items-center space-x focus:outline-none font-medium"
            >
              Logout
            </Button>
          </div>
        </>
      )}
    </>
  );
}
