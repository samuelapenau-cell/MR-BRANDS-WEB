"use client";

import { Suspense, useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { StaggerReveal } from "@/components/StaggerReveal";
import type { Product, Category } from "@/types";

const COLORS = ["Negro", "Blanco", "Azul", "Gris", "Marron", "Camuflado", "Beige"];
const SIZES = ["28", "30", "32", "34", "36", "L", "XL"];

function CatalogContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoria") || ""
  );
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addingCount, setAddingCount] = useState(0);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>();

  const activeFilterCount = [selectedCategory, selectedSize, selectedColor].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0 || priceRange[0] > 0 || priceRange[1] < 500;

  const loadProducts = useCallback(async (searchQuery?: string) => {
    try {
      const url = searchQuery
        ? `/api/products?search=${encodeURIComponent(searchQuery)}&limit=50`
        : "/api/products?limit=100";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
      const catRes = await fetch("/api/categories");
      if (catRes.ok) {
        const data = await catRes.json();
        setCategories(data.categories || []);
      }
    } catch {
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    if (search.trim().length > 0) {
      setSearchLoading(true);
      searchTimer.current = setTimeout(() => {
        loadProducts(search.trim());
      }, 400);
    } else if (search === "") {
      if (products.length === 0 || searchLoading) {
        loadProducts();
      }
    }
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); };
  }, [search, loadProducts, products.length, searchLoading]);

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (selectedCategory && p.category?.slug !== selectedCategory)
        return false;
      if (selectedSize && !p.variants.some((v) => v.size === selectedSize))
        return false;
      if (selectedColor && !p.variants.some((v) => v.color === selectedColor))
        return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [products, selectedCategory, selectedSize, selectedColor, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setSelectedColor("");
    setPriceRange([0, 500]);
    setSearch("");
  };

  const handleLoadMore = () => {
    setAddingCount(12);
    setVisibleCount((c) => c + 12);
    setTimeout(() => setAddingCount(0), 400);
  };

  const FilterContent = () => (
    <>
      <div>
        <h3 className="text-[10px] font-mono uppercase tracking-[2px] text-gold/60 mb-4 flex items-center gap-2">
          <span className="w-3 h-[1px] bg-gold/30" />
          Categoría
        </h3>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => setSelectedCategory("")}
            className={`text-left text-sm font-body transition-all duration-200 px-3 py-1.5 -mx-3 rounded-sm ${
              !selectedCategory
                ? "text-offwhite bg-gold/5"
                : "text-offwhite/35 hover:text-offwhite/60 hover:bg-gold/[0.02]"
            }`}
          >
            Todas
          </button>
          {categories
            .filter((c) => c.slug !== "todas")
            .map((cat) => (
              <button
                key={cat.slug}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === cat.slug ? "" : cat.slug
                  )
                }
                className={`text-left text-sm font-body transition-all duration-200 px-3 py-1.5 -mx-3 rounded-sm ${
                  selectedCategory === cat.slug
                    ? "text-gold bg-gold/8"
                    : "text-offwhite/35 hover:text-offwhite/60 hover:bg-gold/[0.02]"
                }`}
              >
                {cat.name}
              </button>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-mono uppercase tracking-[2px] text-gold/60 mb-4 flex items-center gap-2">
          <span className="w-3 h-[1px] bg-gold/30" />
          Talla
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() =>
                setSelectedSize(selectedSize === size ? "" : size)
              }
              className={`urban-filter-chip ${selectedSize === size ? "active" : ""}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-mono uppercase tracking-[2px] text-gold/60 mb-4 flex items-center gap-2">
          <span className="w-3 h-[1px] bg-gold/30" />
          Color
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() =>
                setSelectedColor(selectedColor === color ? "" : color)
              }
              className={`urban-filter-chip ${selectedColor === color ? "active" : ""}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] font-mono uppercase tracking-[2px] text-gold/60 mb-4 flex items-center gap-2">
          <span className="w-3 h-[1px] bg-gold/30" />
          Precio
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="0"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full bg-surface/80 border border-border/40 rounded-sm px-3 py-2 text-xs text-offwhite/70 font-mono placeholder:text-offwhite/15 focus:border-gold/40 focus:outline-none transition-colors"
          />
          <span className="text-offwhite/20 text-xs">—</span>
          <input
            type="number"
            placeholder="500"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full bg-surface/80 border border-border/40 rounded-sm px-3 py-2 text-xs text-offwhite/70 font-mono placeholder:text-offwhite/15 focus:border-gold/40 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-[10px] font-mono uppercase tracking-[2px] text-offwhite/30 hover:text-accent transition-colors flex items-center gap-1.5 group"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="group-hover:rotate-90 transition-transform duration-300">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Limpiar filtros
        </button>
      )}
    </>
  );

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-gold/40" />
            <span className="text-[10px] font-mono uppercase tracking-[3px] text-gold/50">
              Catálogo
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl text-offwhite tracking-[1px] leading-none">
            Tienda
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="font-display text-5xl md:text-7xl text-gold tracking-[2px] leading-none">
              MR.BRANDS
            </span>
            <span className="hidden md:block text-[10px] font-mono uppercase tracking-[3px] text-offwhite/20 self-end pb-3">
              La Casa del Flow
            </span>
          </div>
          <p className="mt-5 text-sm text-offwhite/35 font-body max-w-[520px] leading-relaxed">
            Explorá el catálogo. Pantalones, slim fit y streetwear. Las mejores marcas, un solo lugar.
          </p>
        </div>

        {/* Search + Filters Toggle */}
        <div className="flex flex-col md:flex-row gap-3 mb-10">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-offwhite/20 pointer-events-none"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="urban-search-input w-full rounded-sm px-4 py-3 pl-10 text-sm font-body"
            />
            {searchLoading && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-gold/40 border-t-transparent animate-spin" />
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-3 border border-border/40 text-offwhite/50 text-sm font-body rounded-sm hover:border-gold/30 hover:text-offwhite/70 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              Filtros
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold text-black text-[9px] font-bold flex items-center justify-center font-mono">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-[220px] flex-shrink-0">
            <div className="space-y-8">
              <FilterContent />
            </div>
          </aside>

          {/* Mobile Filter Panel */}
          <div
            className={`urban-mobile-filter-panel md:hidden ${mobileFiltersOpen ? "open" : ""}`}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/20">
                <span className="text-xs font-mono uppercase tracking-[2px] text-offwhite/60">
                  Filtros
                </span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-offwhite/40 hover:text-offwhite transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                <FilterContent />
              </div>
              <div className="px-6 py-4 border-t border-border/20">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 bg-gold text-black font-display text-sm tracking-[2px] rounded-sm hover:bg-gold-light transition-colors"
                >
                  Ver resultados ({filtered.length})
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] skeleton-gold rounded-sm" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 mb-6 rounded-full border border-border/30 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-offwhite/20">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <p className="text-offwhite/50 text-sm font-body mb-1">
                  No hay resultados
                </p>
                <p className="text-offwhite/25 text-xs font-mono mb-6">
                  Probá con otros filtros o términos de búsqueda
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2.5 border border-gold/30 text-gold text-[10px] font-mono uppercase tracking-[2px] rounded-sm hover:bg-gold/10 transition-all"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/10">
                  <p className="text-xs text-offwhite/30 font-mono flex items-center gap-2.5">
                    {searchLoading && (
                      <span className="w-3 h-3 rounded-full border border-gold/40 border-t-transparent animate-spin" />
                    )}
                    <span className="text-offwhite/40">{filtered.length}</span>
                    <span className="text-offwhite/20">producto{filtered.length !== 1 ? "s" : ""}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[1.5px] text-offwhite/20">
                      Ordenar
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => { setSortBy(e.target.value); setVisibleCount(12); }}
                      className="urban-select rounded-sm"
                    >
                      <option value="newest">Más nuevo</option>
                      <option value="price-asc">Menor precio</option>
                      <option value="price-desc">Mayor precio</option>
                      <option value="name">Nombre A-Z</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {filtered.slice(0, visibleCount).map((product, i) => (
                    <StaggerReveal key={product.id} index={i}>
                      <ProductCard product={product} />
                    </StaggerReveal>
                  ))}
                </div>
                {visibleCount < filtered.length && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="urban-load-more inline-flex items-center gap-2.5 px-8 py-3.5 border border-border/40 text-offwhite/50 hover:text-gold hover:border-gold/30 font-body text-xs tracking-[1.5px] uppercase rounded-sm transition-all duration-300"
                    >
                      <span>Mostrar más</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-gold/30" />
              <span className="h-3 w-16 skeleton-gold rounded-sm" />
            </div>
            <div className="h-14 w-48 skeleton-gold rounded-sm mb-2" />
            <div className="h-14 w-64 skeleton-gold rounded-sm" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] skeleton-gold rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
