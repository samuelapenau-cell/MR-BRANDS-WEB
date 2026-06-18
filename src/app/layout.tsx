import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Mono } from "next/font/google";
import Script from "next/script";
import { CartProvider } from "@/components/CartProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ToastContainer";
import { PageTransition } from "@/components/PageTransition";
import { SITE_URL, STORE } from "@/lib/constants";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MR.BRANDS | La Casa del Flow — Maracay",
    template: "%s | MR.BRANDS",
  },
  icons: { icon: "/favicon.ico" },
  description:
    "Tienda multimarca de pantalones y slim fit streetwear en Maracay, Edo. Aragua, Venezuela. Envíos y pickup en tienda.",
  keywords: [
    "ropa Maracay",
    "streetwear Venezuela",
    "sneakers Maracay",
    "moda urbana Aragua",
    "MR.BRANDS",
    "tienda multimarca Venezuela",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "MR.BRANDS | La Casa del Flow",
    description: "Tienda multimarca streetwear en Maracay, Venezuela.",
    siteName: "MR.BRANDS",
    locale: "es_VE",
    type: "website",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/logo.png`, width: 512, height: 512 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <div className="noise-overlay" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://uwfrzrmjhcggtkpvpyur.supabase.co" />
        <link rel="dns-prefetch" href="https://uwfrzrmjhcggtkpvpyur.supabase.co" />
        <a href="#main-content" className="fixed -top-full left-4 z-[100] px-4 py-2 bg-gold text-black text-xs font-mono uppercase tracking-[2px] rounded-sm transition-all duration-300 focus:top-4 focus:outline-none">
          Saltar al contenido
        </a>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main id="main-content" className="flex-1 outline-none" tabIndex={-1}><PageTransition>{children}</PageTransition></main>
            <Footer />
            <ToastContainer />
          </CartProvider>
          <Script
            id="json-ld"
            type="application/ld+json"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Store",
                name: STORE.name,
                alternateName: "MR.BRANDS",
                description: "Tienda multimarca de pantalones y slim fit streetwear en Maracay, Venezuela.",
                url: SITE_URL,
                image: `${SITE_URL}/logo.png`,
                email: STORE.email,
                telephone: STORE.phone,
                slogan: STORE.slogan,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: `${STORE.address.line1}, ${STORE.address.line2}`,
                  addressLocality: STORE.address.city,
                  addressRegion: STORE.address.state,
                  addressCountry: STORE.address.country,
                },
                sameAs: [
                  `https://instagram.com/${STORE.instagram}`,
                  `https://wa.me/${STORE.whatsapp}`,
                ],
              }),
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
