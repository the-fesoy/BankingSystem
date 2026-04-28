import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en" className="flex min-h-screen w-full align-middle">
      <div className="w-full">{children}</div>
      <div className="auth-asset w-full">
        <div className="">
          <Image
            alt="auth image"
            height={500}
            width={500}
            src={"/icons/auth-image.svg"}
          />
        </div>
      </div>
    </main>
  );
}
