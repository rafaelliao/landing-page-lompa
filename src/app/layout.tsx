import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientCookieConsent from "@/components/client-cookie-consent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lompa - O marketplace do futuro, mais social, acessível e interativo!",
  description: "O marketplace mais social, acessível e interativo!",
  icons: {
    icon: [
      {
        url: "/images/logo-lompa-fundo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/logo-lompa-fundo.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/logo-lompa-fundo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <ClientCookieConsent />
      </body>
    </html>
  );
}
