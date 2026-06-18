export const STORE = {
  name: "MR.BRANDS",
  slogan: "LA CASA DEL FLOW",
  handle: "@mrbrandsve",
  phone: "+584122934158",
  whatsapp: "584122934158",
  instagram: "mrbrandsve",
  email: "info@mrbrandsve.com",
  address: {
    line1: "C.C.P. Estación Central",
    line2: "Local PB-004",
    city: "Maracay",
    state: "Estado Aragua",
    country: "Venezuela",
  },
  mapsUrl: "https://maps.app.goo.gl/3PUQDm1d1UYus88R6",
  hours: {
    weekdays: "9:00 AM - 7:00 PM",
    saturday: "9:00 AM - 5:00 PM",
    sunday: "Cerrado",
  },
};

export const COLORS = {
  black: "#160303",
  offwhite: "#F0EBE3",
  gold: "#E0B8AC",
  goldLight: "#EAC8BE",
  accent: "#FF3C2F",
  surface: "#160303",
  surfaceLight: "#260808",
  border: "rgba(224, 184, 172, 0.15)",
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
