"use client";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./custom/mode-toggle";
import { useParams, useRouter } from "next/navigation";

export default function Navbar() {
  const params = useParams();
  const path = useRouter();
  const { vehicleId } = params;
  console.log({params,path});
  
  return (
    !vehicleId && (
      <NavigationMenu className="mt-4 w-full  px-4 lg:flex  lg:justify-between lg:border-b-2   ">
        <NavigationMenuList className="gap-3 rounded-lg lg:border-0">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-xl`}
              >
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/inventory" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-xl`}
              >
                Inventory
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-xl`}
              >
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="block lg:hidden">
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="hidden lg:block">
          <ModeToggle />
        </div>
      </NavigationMenu>
    )
  );
}
