"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useClerk } from "@clerk/nextjs";

const MobileNav = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut } = useClerk();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Search Query:", searchQuery);
  };

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-black-1 p-4">
          <Link href="/" className="flex items-center gap-1 pb-10 pl-4">
            <Image
              src="/icons/logo.svg"
              alt="logo"
              width={23}
              height={27}
            />
            <h1 className="text-24 font-extrabold text-white-1 ml-2">Podcastr</h1>
          </Link>
          <div className="flex flex-col h-[calc(100vh-72px)] overflow-y-auto">
            <div className="flex flex-col gap-4 p-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-gray-800 text-white-1 placeholder-gray-400"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-1 text-white-1"
                >
                  <Image
                    src="/icons/search.svg"
                    width={20}
                    height={20}
                    alt="search"
                  />
                </Button>
              </form>
              <div className="flex flex-col gap-2">
                <h2 className="text-18 font-semibold text-white-1">User Profile</h2>
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/profile.svg"
                    width={40}
                    height={40}
                    alt="profile"
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <p className="text-16 font-medium text-white-1">John Doe</p>
                    <Button
                      variant="outline"
                      onClick={() => signOut()}
                      className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <SheetClose asChild>
              <nav className="flex flex-col gap-6 text-white-1 h-full">
                {sidebarLinks.map(({ route, label, imgURL }) => {
                  const isActive = pathname === route || pathname.startsWith(`${route}/`);

                  return (
                    <SheetClose asChild key={route}>
                      <Link
                        href={route}
                        className={cn("flex items-center gap-3 py-4 px-4", {
                          'bg-nav-focus border-r-4 border-orange-1': isActive,
                        })}
                      >
                        <Image
                          src={imgURL}
                          alt={label}
                          width={24}
                          height={24}
                        />
                        <p>{label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
