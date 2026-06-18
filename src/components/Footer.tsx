"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STORE } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <span className="font-display text-2xl tracking-[2px] text-offwhite">
              MR.<span className="text-gold">BRANDS</span>
            </span>
            <p className="mt-3 text-sm text-gold font-mono uppercase tracking-[2px]">
              {STORE.slogan}
            </p>
            <p className="mt-4 text-xs text-offwhite/40 font-body leading-relaxed max-w-[260px]">
              Tienda multimarca de pantalones y slim fit streetwear en Maracay, Edo. Aragua, Venezuela.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[2px] text-gold mb-4">
              Tienda
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/tienda" className="text-sm text-offwhite/60 hover:text-gold transition-colors">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link href="/tienda?categoria=pantalones" className="text-sm text-offwhite/60 hover:text-gold transition-colors">
                  Pantalones
                </Link>
              </li>
              <li>
                <Link href="/tienda?categoria=slim-fit" className="text-sm text-offwhite/60 hover:text-gold transition-colors">
                  Slim Fit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[2px] text-gold mb-4">
              Información
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/nosotros" className="text-sm text-offwhite/60 hover:text-gold transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-offwhite/60 hover:text-gold transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/nosotros#faq" className="text-sm text-offwhite/60 hover:text-gold transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[2px] text-gold mb-4">
              Contacto
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-offwhite/60">
              <li className="flex items-start gap-2">
                <span className="text-gold/60 mt-0.5"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
                <a href={STORE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  {STORE.address.line1}, {STORE.address.line2}<br />
                  {STORE.address.city}, {STORE.address.state}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold/60"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></span>
                <a
                  href={`https://wa.me/${STORE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  {STORE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold/60"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
                <a
                  href={`mailto:${STORE.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {STORE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold/60"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></span>
                <a
                  href={`https://instagram.com/${STORE.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  @{STORE.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-offwhite/30 font-mono">
            &copy; {new Date().getFullYear()} {STORE.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gold/50 font-mono uppercase tracking-[2px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline -mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> {STORE.slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
