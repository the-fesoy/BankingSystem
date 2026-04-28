"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SheetClose } from "./sheet";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href={"/"} className="mb-12 cursor-pointer items-center gap-2">
          <Image
            src={"/icons/logo.svg"}
            height={34}
            width={34}
            alt="Hormozone logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Hormozone</h1>
        </Link>
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              className={cn("sidebar-link", { "bg-bank-gradient": isActive })}
              key={link.label}
            >
              <div className="relative size-6">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  fill
                  className={cn({ "brightness-[3] invert-0": isActive })}
                />
                {/* gffff */}
              </div>
              <p className={cn("sidebar-label", { "text-white!": isActive })}>
                {link.label}
              </p>
            </Link>
          );
        })}
      </nav>

      <Footer user={user} type="desktop" />
    </section>
  );
};

export default Sidebar;
