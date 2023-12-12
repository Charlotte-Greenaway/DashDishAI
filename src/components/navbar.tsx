'use client'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";
import React,{ useState } from "react";
import { usePathname } from "next/navigation";
import Logo from '@/images/logo.png';

const NavBar: React.FC = () => {
  const path= usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = (path.includes("sign"))?[
    {
    navItem:"Sign up",
    navLink:"/sign-up"
  }, 
  {
    navItem:"Sign in",
    navLink:"/sign-in"
  }]:[
    {
    navItem:"Home",
    navLink:"/"
  }, {
    navItem:"Saved Recipes",
    navLink:"#"
  }, {
    navItem:"Search",
    navLink:"#"
  }];

  return (
    <header className="text-white bg-[#20c536] ">
      <Navbar onMenuOpenChange={setIsMenuOpen} className="text-white bg-[#20c536]">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <img src={Logo.src} className="h-8 sm:h-10 md:h-12 lg:h-12 xl:h-12 2xl:h-12 brandImg" alt="logo"/>
            <h1 className="sm:h-6 font-bold text-inherit brand">DASH DISH</h1>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className={`hidden sm:flex gap-4 ${!path.includes("/sign") ? "" : "invisible"}`} justify="center" >
          <NavbarItem isActive={path==="/" ? true : false}>
            <Link  href="/" >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path==="/savedrecipes" ? true : false}>
            <Link href="#" >
              Saved Recipes
            </Link>
          </NavbarItem>
          <NavbarItem isActive={path==="/search" ? true : false}>
            <Link  href="#" >
              Search
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" >
          <NavbarItem className={`hidden lg:flex ${path.includes("/sign") ? "hidden sm:block md:block lg:block xl:block" : "invisible"}`}>
            <Link href="/sign-in">Login</Link>
          </NavbarItem>
          <NavbarItem className= {path.includes("/sign") ? "hidden sm:block md:block lg:block xl:block" : "invisible"}>
            <Button as={Link} color="primary" href="/sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
          <NavbarItem>
            <div className="mobileFloaterRem">
              <UserButton afterSignOutUrl="/sign-in"/>
            </div>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full text-[#20c536]"
                href={item.navLink}
                size="lg"
              >
                {item.navItem}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
};

export default NavBar;