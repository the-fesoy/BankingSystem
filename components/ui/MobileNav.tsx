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
import React from "react";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="Menu"
            width={30}
            height={30}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-white px-4 ">
          {/*  */}
          <Link
            href={"/"}
            className="mb-12 cursor-pointer items-center gap-1 pl-4 flex"
          >
            <Image
              src={"/icons/logo.svg"}
              height={34}
              width={34}
              alt="Hormozone logo"
              className="size-[24px] max-xl:size-14"
            />
            <h1 className="sidebar-logo">Hormozone</h1>
          </Link>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full gap-4  flex-col text-white">
                {sidebarLinks.map((link) => {
                  const isActive =
                    pathname === link.route ||
                    pathname.startsWith(`${link.route}/`);

                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        className={cn(
                          "navbar-sheet_close flex rounded border-10 border-white w-full",
                          {
                            "bg-bank-gradient  border-[#4f8be0]": isActive,
                          },
                        )}
                        key={link.label}
                      >
                        <Image
                          width={30}
                          height={30}
                          src={link.imgURL}
                          alt={link.label}
                          className={cn({
                            "brightness-[3] flex invert-0": isActive,
                          })}
                        />
                        <p
                          className={cn(
                            "text-xl ml-12 align-middle flex font-semibold text-black",
                            {
                              "text-white !": isActive,
                            },
                          )}
                        >
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
                USER SHIT DATA
              </nav>
            </SheetClose>
            FEET
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
