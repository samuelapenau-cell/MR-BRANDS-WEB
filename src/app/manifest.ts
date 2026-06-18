import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MR.BRANDS — La Casa del Flow",
    short_name: "MR.BRANDS",
    description: "Tienda multimarca streetwear en Maracay, Venezuela.",
    start_url: "/",
    display: "standalone",
    background_color: "#160303",
    theme_color: "#160303",
    icons: [
      { src: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { src: "/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
