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
  title: "Le Mouton Noir — Restaurant de saison à Corgnac-sur-l’Isle, Dordogne",
  description:
    "Le Mouton Noir, restaurant à Corgnac-sur-l’Isle en Dordogne. Cuisine de saison, carte courte, ambiance élégante et réservation conseillée.",
  keywords: [
    "Le Mouton Noir",
    "restaurant Corgnac-sur-l'Isle",
    "restaurant Dordogne",
    "cuisine de saison",
    "restaurant de saison"
  ],
  openGraph: {
    title: "Le Mouton Noir — Restaurant de saison à Corgnac-sur-l’Isle, Dordogne",
    description:
      "Restaurant de saison à Corgnac-sur-l’Isle (Dordogne), cuisine soignée, galerie, avis et réservation.",
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
