"use client";

import Link from "next/link";
import Image from "next/image";
import { WishlistButton } from "@/components/WishlistButton";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const isSoldOut = product.variants.length > 0 && product.variants.every((v) => v.stock <= 0);
  const lowStock = !isSoldOut && product.variants.some((v) => v.stock > 0 && v.stock <= 3);

  return (
    <Link
      href={`/tienda/${product.slug}`}
      className="group block"
      aria-label={`${product.name} — $${product.price.toFixed(2)}${isSoldOut ? " — Agotado" : ""}`}
    >
      <div className="urban-card relative bg-surface-light border border-border/60 overflow-hidden">
        <div className="urban-card-img-wrapper aspect-[3/4] relative flex items-center justify-center">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={`${product.name} — ${product.category?.name || "Producto"} MR.BRANDS`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="text-center p-6" aria-hidden="true">
              <p className="font-display text-6xl text-gold/10">👕</p>
            </div>
          )}
          <div className="urban-card-grain" aria-hidden="true" />

          {isSoldOut && (
            <span className="urban-badge urban-badge-soldout absolute top-3 left-3 z-10" role="status">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              Agotado
            </span>
          )}
          {lowStock && !isSoldOut && (
            <span className="urban-badge urban-badge-lowstock absolute top-3 left-3 z-10" role="status">
              Últimas unidades
            </span>
          )}

          <div className="urban-card-overlay" aria-hidden="true">
            <span className="urban-card-overlay-btn">
              Ver producto
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>

          <div className="absolute top-3 right-3 z-10">
            <WishlistButton
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.images[0] || "",
              }}
            />
          </div>
        </div>

        <div className="p-4 pt-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              {product.category?.name && (
                <span className="text-[9px] font-mono uppercase tracking-[2px] text-gold/50 block mb-1">
                  {product.category.name}
                </span>
              )}
              <h3 className="text-sm font-body font-medium text-offwhite group-hover:text-gold transition-colors truncate leading-tight">
                {product.name}
              </h3>
            </div>
          </div>
          <p className="urban-price text-gold font-display text-lg tracking-[1px] mt-1.5">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
