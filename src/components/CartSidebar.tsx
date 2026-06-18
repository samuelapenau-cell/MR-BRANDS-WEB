"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import { useAuth } from "@/components/AuthProvider";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useFocusTrap } from "@/lib/use-focus-trap";
import Image from "next/image";
import Link from "next/link";

export function CartSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { user, loading: authLoading } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const sidebarRef = useFocusTrap(open && !showCheckout);

  useEffect(() => {
    if (!open) { setShowCheckout(false); setShowAuthGate(false); }
  }, [open]);

  const handleProceedToCheckout = () => {
    if (!user && !authLoading) {
      setShowAuthGate(true);
    } else {
      setShowCheckout(true);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-400 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-surface border-l border-border transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <h2 className="font-display text-xl tracking-[1.5px] text-offwhite">
              Carrito
            </h2>
            <button
              onClick={onClose}
              className="text-offwhite/50 hover:text-offwhite transition-colors"
              aria-label="Cerrar carrito"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold/30 mb-4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <p className="text-offwhite/40 text-sm font-body">Tu carrito está vacío</p>
                <Link href="/tienda" onClick={onClose} className="mt-4 text-xs font-mono uppercase tracking-[2px] text-gold hover:text-gold-light transition-colors">
                  Explorar productos
                </Link>
              </div>
            ) : showAuthGate ? (
              <div className="flex flex-col items-center justify-center h-full px-8 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-offwhite tracking-[1px] mb-3">
                  Iniciá sesión para <span className="text-gold">comprar</span>
                </h3>
                <p className="text-sm text-offwhite/40 font-body leading-relaxed max-w-[300px]">
                  Necesitás tener una cuenta para poder procesar tu pedido. Tus productos están guardados en el carrito.
                </p>
                <Link
                  href="/ingresar"
                  onClick={onClose}
                  className="mt-8 w-full py-4 bg-gold text-black font-display text-lg tracking-[1.5px] text-center rounded-sm hover:bg-gold-light transition-all duration-300 active:scale-[0.98]"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/ingresar"
                  onClick={onClose}
                  className="mt-3 w-full py-3 border border-border text-offwhite/60 hover:text-gold hover:border-gold/40 font-body text-sm tracking-[1px] text-center rounded-sm transition-all duration-300"
                >
                  Crear cuenta nueva
                </Link>
                <button
                  onClick={() => setShowAuthGate(false)}
                  className="mt-4 text-[10px] font-mono uppercase tracking-[1.5px] text-offwhite/30 hover:text-offwhite/50 transition-colors"
                >
                  Volver al carrito
                </button>
              </div>
            ) : (
              <div className="px-6 py-4 flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.variant.id} className="flex gap-4 py-4 border-b border-border/50">
                    <div className="w-20 h-20 rounded-sm overflow-hidden bg-surface-light flex-shrink-0 relative">
                      {item.product.images[0] ? (
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="80px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-offwhite/20 font-mono text-[10px]">Foto</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-body font-medium text-offwhite truncate">{item.product.name}</h3>
                      <p className="text-xs text-offwhite/40 font-mono mt-0.5">{item.variant.size} / {item.variant.color}</p>
                      <p className="text-sm text-gold font-display tracking-[1px] mt-1">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-border text-offwhite/50 hover:text-offwhite hover:border-gold/50 transition-colors flex items-center justify-center text-xs">-</button>
                        <span className="text-sm text-offwhite font-mono min-w-[20px] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-border text-offwhite/50 hover:text-offwhite hover:border-gold/50 transition-colors flex items-center justify-center text-xs">+</button>
                        <button onClick={() => removeItem(item.variant.id)} className="ml-auto text-offwhite/30 hover:text-accent transition-colors" aria-label="Eliminar">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && !showCheckout && !showAuthGate && (
            <div className="border-t border-border px-6 py-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-offwhite/60 font-body">Total</span>
                <span className="font-display text-2xl text-gold tracking-[1px]">${totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={handleProceedToCheckout} className="w-full py-4 bg-gold text-black font-display text-lg tracking-[1.5px] text-center rounded-sm hover:bg-gold-light transition-colors duration-300 active:scale-[0.98]">
                Proceder al pago
              </button>
              <p className="text-[10px] text-offwhite/30 text-center font-mono">Te atenderemos al instante por WhatsApp</p>
            </div>
          )}

          {showCheckout && (
            <CheckoutForm onBack={() => setShowCheckout(false)} />
          )}
        </div>
      </div>
    </>
  );
}
