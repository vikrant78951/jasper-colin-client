
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from 'next/link'
import { NavType } from "@lib/definitions";
import ManageUser from "../forms/manage-user";

export default function Nav({ data }: { data: NavType[] }) {
  return (
    <nav>
      <NavigationMenu>
        <NavigationMenuList>
          {data?.map((item) => {
            return (
              <NavigationMenuItem
                key={item.id}
                className="hover:underline hover:bg-transparent  data-[active=true]:bg-transparent"
              >
                <Link href={item.url} legacyBehavior passHref>
                  <NavigationMenuLink>{item.title}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        <ManageUser/>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
