import type { Metadata } from "next";
import "@/css/globals.css";

export const metadata: Metadata = {
  title: "Portifólio",
  description: "Uhhh shadowstar portifólio!",
  icons: '/avatar.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-no-repeat bg-cover bg-center bg-[url('/background.png')]">
        {children}
      </body>
    </html>
  );
}
