import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | MR.BRANDS — La Casa del Flow en Maracay",
  description:
    "Conocé nuestra historia. MR.BRANDS es una tienda multimarca streetwear ubicada en Maracay, Estado Aragua, Venezuela. Más de 36K seguidores en Instagram.",
  openGraph: {
    title: "Nosotros | MR.BRANDS — La Casa del Flow",
    description: "Tienda multimarca streetwear en Maracay, Venezuela. Conocé nuestra historia.",
  },
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
