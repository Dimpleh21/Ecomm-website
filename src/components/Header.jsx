"use client";
import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingCart, AlignJustify } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { components } from "@/utils/data";
const Header = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-between items-center h-20 px-[10%]">
        <Link href="/">
          <img src="/image 1.png" className="h-12 cursor-pointer" alt="" />
        </Link>
        <div className="ml-[-9rem]">
          <h1 className="text-xl flex font-bold font-normal text-red-950">
            K.N. UDYOG
          </h1>
        </div>

        <div className="text-md flex items-center gap-5">
          <Link href="/" className="hidden sm:block">
            Home
          </Link>
          <div className="hidden sm:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {components.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input className="h-8 hidden sm:block" placeholder="Search" />
          <Link href="/wishlist">
            <Heart size={20} />
          </Link>
          <Link href="/addtocart">
            <ShoppingCart size={20} />
          </Link>
          <div>
            <AlignJustify size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
