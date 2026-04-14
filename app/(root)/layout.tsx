export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <h1> SIDEBAR </h1>
      <div>{children}</div>
    </main>
  );
}
