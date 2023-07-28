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

export default function Navbar() {
  return (
      <NavigationMenu className= "lg:flex lg:justify-between lg:border-b-2 mt-4 bg-white  dark:bg-[#020817] ">
          <NavigationMenuList  className=" border-2 lg:border-0 rounded-lg"  >
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
            <ModeToggle/>
          </NavigationMenuItem>
        </NavigationMenuList>
        <div className="hidden lg:block">
        <ModeToggle />
        </div>
      </NavigationMenu>
  );
}
