import MobileNav from "@/components/ui/MobileNav";
import Sidebar from "@/components/ui/Sidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "Fesoy", lastName: "Oluwafemi" };

  return (
    <main className="flex h-screen w-full font-inter" lang="en">
      <Sidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src="/icons/logo.svg"
            alt="Hormozone logo"
            width={30}
            height={30}
          />
          <div className="">
            <MobileNav user={loggedIn} />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
