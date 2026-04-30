import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Le Mouton Noir — Bar-restaurant à Vergt en Dordogne",
  description:
    "Le Mouton Noir, bar-restaurant à Vergt, vous accueille sous la halle avec une cuisine de saison, des produits frais et locaux, une terrasse et une ambiance conviviale.",
  keywords: [
    "Le Mouton Noir",
    "restaurant à Vergt",
    "bar-restaurant à Vergt",
    "restaurant sous la halle de Vergt",
    "restaurant Dordogne",
    "cuisine de saison Dordogne",
    "produits locaux Vergt"
  ],
  openGraph: {
    title: "Le Mouton Noir — Bar-restaurant à Vergt en Dordogne",
    description:
      "Le Mouton Noir, bar-restaurant à Vergt en Dordogne, sous la halle avec cuisine de saison, produits frais et terrasse conviviale.",
    locale: "fr_FR",
    type: "website"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
