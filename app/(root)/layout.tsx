import MobileNav from "@/components/ui/MobileNav";
import Sidebar from "@/components/ui/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { parseStringify } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = parseStringify(await getLoggedInUser());
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="flex h-screen w-full font-inter" lang="en">
      <Sidebar user={user} />

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src="/icons/logo.svg"
            alt="Hormozone logo"
            width={30}
            height={30}
          />
          <div className="">
            <MobileNav user={user} />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
