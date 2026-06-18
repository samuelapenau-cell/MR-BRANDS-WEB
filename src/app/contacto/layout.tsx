import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | MR.BRANDS — WhatsApp, Ubicación y Horarios",
  description:
    "Contactanos por WhatsApp, visitanos en Maracay o seguinos en Instagram. Estamos en el C.C.P. Estación Central, Local PB-004.",
  openGraph: {
    title: "Contacto | MR.BRANDS",
    description: "WhatsApp, ubicación y horarios de MR.BRANDS en Maracay.",
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
