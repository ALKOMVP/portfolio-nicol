import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Nicol Mena - Portfolio de Acrobacia y Circo",
  description: "Portfolio profesional de acrobacia y circo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-black text-white min-h-screen">
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

