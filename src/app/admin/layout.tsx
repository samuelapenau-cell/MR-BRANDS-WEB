"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "◆" },
  { href: "/admin/productos", label: "Productos", icon: "■" },
  { href: "/admin/ordenes", label: "Ordenes", icon: "●" },
  { href: "/admin/inventario", label: "Inventario", icon: "▲" },
  { href: "/admin/cupones", label: "Cupones", icon: "★" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-6 left-6 z-50 w-10 h-10 flex items-center justify-center bg-surface-light border border-border rounded-sm text-offwhite/60 hover:text-offwhite md:hidden"
      >
        <span className="text-lg">{sidebarOpen ? "✕" : "☰"}</span>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-surface-light border-r border-border transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="block">
            <span className="font-display text-2xl text-gold tracking-[2px]">MR.BRANDS</span>
            <span className="block mt-1 text-[10px] font-mono uppercase tracking-[2px] text-offwhite/30">Admin Panel</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-mono uppercase tracking-[1.5px] transition-all ${
                  isActive
                    ? "bg-gold/10 text-gold border-l-2 border-gold"
                    : "text-offwhite/40 hover:text-offwhite/70 hover:bg-surface border-l-2 border-transparent"
                }`}
              >
                <span className="text-xs">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-[1.5px] text-offwhite/30 hover:text-offwhite/60 transition-colors"
          >
            ← Ver tienda
          </Link>
          <button
            onClick={() => { signOut(); router.push("/"); }}
            className="w-full flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-[1.5px] text-offwhite/20 hover:text-accent transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="md:ml-64 min-h-screen">{children}</main>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
