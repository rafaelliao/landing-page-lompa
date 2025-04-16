import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/cookie-consent-new";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lompa - Landing Page",
  description: "Landing Page da Lompa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} relative`}>
        <div className="relative z-10">
          {children}
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}
