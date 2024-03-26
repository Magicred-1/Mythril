import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { DynamicProvider } from "@/lib/dynamic.provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mythril",
  description: "Mythril is a decentralized insurance platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicProvider>
          <Navbar />
            <Separator />
            {children}
        </DynamicProvider>
        <Footer />
      </body>
    </html>
  );
}
