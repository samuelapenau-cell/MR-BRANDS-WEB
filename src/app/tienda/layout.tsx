import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda MR.BRANDS | Pantalones y Slim Fit Streetwear",
  description:
    "Explora nuestro catálogo de pantalones y slim fit streetwear en Maracay, Venezuela. Las mejores marcas, envíos y pickup en tienda.",
  openGraph: {
    title: "Tienda MR.BRANDS | Catálogo Streetwear",
    description: "Pantalones y slim fit streetwear en Maracay. Las mejores marcas.",
  },
};

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
