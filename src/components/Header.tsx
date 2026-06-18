"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { useAuth } from "@/components/AuthProvider";
import { STORE } from "@/lib/constants";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { CartSidebar } from "@/components/CartSidebar";

export function Header() {
  const pathname = usePathname();
  const { user, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const profileHref = isAdmin ? "/admin" : "/perfil";
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useFocusTrap(menuOpen);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/tienda", label: "Tienda" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-[0_1px_0_rgba(201,168,76,0.1)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="font-display text-2xl tracking-[2px] text-offwhite group-hover:text-gold transition-colors duration-300"
            >
              MR.<span className="text-gold">BRANDS</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-offwhite/70 hover:text-gold transition-colors duration-300 tracking-[1px] uppercase font-body font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/favoritos"
              className="hidden sm:flex p-2 text-offwhite/70 hover:text-gold transition-colors duration-300"
              aria-label="Favoritos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </Link>
            {mounted && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-offwhite/70 hover:text-gold transition-colors duration-300"
                aria-label="Abrir carrito"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-black text-[10px] font-bold flex items-center justify-center font-mono"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>
            )}

            {mounted && (
              <>
                {user ? (
                  <Link
                    href={profileHref}
                    className="hidden sm:flex p-2 text-offwhite/70 hover:text-gold transition-colors duration-300"
                    aria-label="Mi Cuenta"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    href="/ingresar"
                    className="hidden sm:flex items-center gap-2 text-xs text-offwhite/50 hover:text-gold transition-colors duration-300 font-mono uppercase tracking-[1.5px]"
                  >
                    Ingresar
                  </Link>
                )}
              </>
            )}

            <button
              ref={menuToggleRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-offwhite/70 hover:text-gold transition-colors duration-300"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${
                    menuOpen ? "rotate-45 translate-y-[6px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-current transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] w-full bg-current transition-all duration-300 origin-center ${
                    menuOpen ? "-rotate-45 -translate-y-[6px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Menú de navegación"
        >
          <div className="px-6 py-6 glass border-t border-border flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg text-offwhite/80 hover:text-gold transition-colors duration-300 font-body tracking-[1px]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              {user ? (
                <Link href={profileHref} onClick={() => setMenuOpen(false)} className="text-sm text-offwhite/80 hover:text-gold transition-colors font-mono uppercase tracking-[1.5px]">
                  Mi Cuenta
                </Link>
              ) : (
                <Link href="/ingresar" className="text-sm text-offwhite/50 hover:text-gold transition-colors font-mono uppercase tracking-[1.5px] text-left">
                  Ingresar
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
