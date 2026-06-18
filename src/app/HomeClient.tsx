"use client";

import Link from "next/link";
import Image from "next/image";
import { STORE } from "@/lib/constants";
import { ProductCard } from "@/components/ProductCard";
import { InstagramFeed } from "@/components/InstagramFeed";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionErrorBoundary } from "@/components/SectionErrorBoundary";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import type { Product, Category } from "@/types";

const CATEGORIES = [
  { name: "Pantalones", slug: "pantalones", desc: "Jeans, baggy, carpentier, bootcut, flared y más", image: "/images/categories/pantalones.jpg", imgPos: "50% 30%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Slim Fit", slug: "slim-fit", desc: "Baby tees, camisetas slim fit y tops", image: "/images/categories/slim-fit.jpg", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Hoodies Crewnecks", slug: "hoodies-crewnecks", desc: "Hoodies y buzos con capucha", image: "/images/categories/hoodies-crewnecks.png", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Franelas BoxyFit", slug: "franelas-boxyfit", desc: "Camisetas de corte boxy y cómodo", image: "/images/categories/franelas-boxyfit.png", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Franelas Oversize", slug: "franelas-oversize", desc: "Camisetas de corte oversize y relajado", image: "/images/categories/franelas-oversize.png", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Bermudas", slug: "bermudas", desc: "Bermudas y shorts largos", image: "/images/categories/bermudas.png", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Shorts", slug: "shorts", desc: "Shorts cortos y deportivos", image: "/images/categories/shorts.png", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Gorras", slug: "gorras", desc: "Gorras y accesorios", image: "/images/categories/gorras.png", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Firts One", slug: "firts-one", desc: "Colección exclusiva Firts One", image: "/images/categories/firts-one.png", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
  { name: "Ver Todo", slug: "", desc: "Explorá el catálogo completo MR.BRANDS", image: "/images/categories/ver-todo.jpg", imgPos: "50% 50%" as const, gradient: "from-transparent via-black/40 to-black/75" },
];

const MOCK_FEATURED = [
  { name: "Baggy Carpediem", price: 60.0, cat: "Pantalones", icon: "👖" },
  { name: "Pant Old Money Bari", price: 45.0, cat: "Pantalones", icon: "👖" },
  { name: "Baby Tee Bari", price: 25.0, cat: "Slim Fit", icon: "👕" },
  { name: "Pant SuperBaggy", price: 60.0, cat: "Pantalones", icon: "👖" },
];

export function HomeClient({ featured: initialFeatured, categories: initialCategories }: { featured: Product[]; categories: Category[] }) {
  const displayFeatured = initialFeatured.length > 0 ? initialFeatured : null;

  return (
    <>
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <HeroSlideshow />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
          <span className="font-display text-[clamp(8rem,30vw,28rem)] text-gold/5 leading-none tracking-[4px]">AURA</span>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="mb-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border text-gold text-[10px] font-mono uppercase tracking-[2.5px] bg-gold/5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              Tienda Multimarca
            </span>
          </div>
          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] leading-none tracking-[2px] text-offwhite animate-fade-up stagger-1">
            <span className="text-gold">AURA</span><br />EN PRENDAS DE MODA
          </h1>
          <p className="mt-6 text-sm md:text-base text-offwhite/50 font-body max-w-[500px] mx-auto leading-relaxed animate-fade-up stagger-2">
            Pantalones y slim fit streetwear en Maracay.<br />Las mejores marcas, un solo lugar.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
            <Link href="/tienda" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gold text-black font-display text-lg tracking-[2px] rounded-sm overflow-hidden transition-all duration-300 hover:bg-gold-light active:scale-[0.98]">
              Explorar Tienda
              <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </span>
            </Link>
            <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 border border-border text-offwhite/70 hover:text-gold hover:border-gold/50 font-body text-sm tracking-[1px] rounded-sm transition-all duration-300">
              Escribinos
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-8 md:gap-16 px-6">
          {[
            { num: "36", suffix: "K", label: "Seguidores" } as const,
            { num: "500", suffix: "+", label: "Productos" } as const,
            { icon: <svg key="loc" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>, label: "Maracay" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center animate-fade-up" style={{ animationDelay: `${(i + 4) * 100}ms` }}>
              <p className="font-display text-2xl md:text-3xl text-gold tracking-[1px]">
                {"num" in stat && stat.num ? <AnimatedCounter value={stat.num} suffix={stat.suffix || ""} /> : "icon" in stat ? stat.icon : null}
              </p>
              <p className="text-[10px] text-offwhite/30 font-mono uppercase tracking-[2px] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-3 md:py-4 border-y border-border/50 overflow-hidden bg-surface-light/30">
        <div className="marquee-track">
          <span className="flex items-center gap-8 md:gap-12 px-4 md:px-6 text-[11px] md:text-xs font-mono uppercase tracking-[3px] text-gold/50">
            <span>MR.BRANDS · La Casa del Flow</span>
            <span className="text-gold/20">✦</span>
            <span>Streetwear desde Maracay</span>
            <span className="text-gold/20">✦</span>
            <span>Pantalones & Slim Fit</span>
            <span className="text-gold/20">✦</span>
            <span>Envíos a todo Venezuela</span>
            <span className="text-gold/20">✦</span>
            <span>36K seguidores</span>
            <span className="text-gold/20">✦</span>
            <span>Mr Brands 2026</span>
            <span className="text-gold/20">✦</span>
            <span>MR.BRANDS · La Casa del Flow</span>
            <span className="text-gold/20">✦</span>
            <span>Streetwear desde Maracay</span>
            <span className="text-gold/20">✦</span>
            <span>Pantalones & Slim Fit</span>
            <span className="text-gold/20">✦</span>
            <span>Envíos a todo Venezuela</span>
            <span className="text-gold/20">✦</span>
            <span>36K seguidores</span>
            <span className="text-gold/20">✦</span>
            <span>Mr Brands 2026</span>
          </span>
        </div>
      </div>

      <SectionReveal>
        <section className="py-24 md:py-36 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gold">Categorías</span>
                <h2 className="mt-2 font-display text-4xl md:text-6xl text-offwhite tracking-[1.5px]">Explora por <span className="text-gold">sección</span></h2>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {CATEGORIES.map((cat) => (
                <Link key={cat.slug || "ver-todo"} href={`/tienda${cat.slug ? `?categoria=${cat.slug}` : ""}`} className="parallax-card group relative min-h-[200px] md:min-h-[260px] rounded-sm overflow-hidden border border-border hover:border-gold/40 transition-all duration-500">
                  {"image" in cat && cat.image ? (
                    <>
                      <div className="absolute inset-0 overflow-hidden">
                        <Image src={cat.image} alt={cat.name} fill className="object-cover scale-110 group-hover:brightness-[0.6] transition-all duration-700" sizes="(max-width: 768px) 50vw, 20vw" style={{ objectPosition: cat.imgPos || "50% 50%" }} />
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-500`} />
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
                      <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #E0B8AC 0%, transparent 60%)" }} />
                    </>
                  )}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <h3 className="font-display text-xl md:text-2xl text-offwhite group-hover:text-gold transition-colors duration-300 tracking-[1px]">{cat.name}</h3>
                    <p className="mt-1 text-xs text-offwhite/50 font-body line-clamp-2">{cat.desc}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[2px] text-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">Ver todo →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionErrorBoundary>
      <SectionReveal delay={100}>
        <section className="py-24 md:py-36 px-6 bg-surface-light/30">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gold">Destacados</span>
                <h2 className="mt-2 font-display text-4xl md:text-6xl text-offwhite tracking-[1.5px]">Lo más <span className="text-gold">nuevo</span></h2>
              </div>
              <Link href="/tienda" className="hidden md:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[2px] text-offwhite/50 hover:text-gold transition-colors">Ver todo →</Link>
            </div>

            {displayFeatured ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {displayFeatured.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MOCK_FEATURED.map((item, i) => (
                  <Link key={i} href="/tienda" className="group block">
                    <div className="aspect-[3/4] bg-surface-light border border-border rounded-sm overflow-hidden relative flex items-center justify-center group-hover:border-gold/30 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent" />
                      <div className="text-center p-6">
                        <p className="font-display text-5xl md:text-7xl text-gold/10 group-hover:text-gold/20 transition-colors duration-500">{item.icon}</p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 gradient-overlay">
                        <p className="text-xs text-offwhite/40 font-mono uppercase tracking-[1.5px]">{item.cat}</p>
                      </div>
                    </div>
                    <div className="mt-3 px-1">
                      <h3 className="text-sm font-body font-medium text-offwhite group-hover:text-gold transition-colors truncate">{item.name}</h3>
                      <p className="text-gold font-display text-lg tracking-[1px] mt-0.5">${item.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 flex md:hidden justify-center">
              <Link href="/tienda" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[2px] text-offwhite/50 hover:text-gold transition-colors">Ver todo →</Link>
            </div>
          </div>
        </section>
      </SectionReveal>
      </SectionErrorBoundary>

      <SectionErrorBoundary>
      <SectionReveal delay={200}>
        <section className="py-24 md:py-36 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gold">En Instagram</span>
              <h2 className="mt-2 font-display text-4xl md:text-6xl text-offwhite tracking-[1.5px]">Seguinos en <span className="text-gold">@mrbrandsve</span></h2>
              <p className="mt-4 text-sm text-offwhite/40 font-body max-w-[400px] mx-auto">Enterate de los últimos drops, novedades y promociones antes que nadie.</p>
            </div>
            <InstagramFeed />
            <div className="mt-8 text-center">
              <a href="https://instagram.com/mrbrandsve" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-offwhite/70 hover:text-gold hover:border-gold/50 font-body text-sm tracking-[1px] rounded-sm transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                @mrbrandsve
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>
      </SectionErrorBoundary>

      <SectionReveal delay={300}>
        <section className="py-24 md:py-36 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.04] via-surface to-surface-light" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #C9A84C 0%, transparent 60%)" }} />
          <div className="relative z-10 max-w-[800px] mx-auto text-center">
            <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gold">¿Listo para el flow?</span>
            <h2 className="mt-4 font-display text-4xl md:text-7xl text-offwhite tracking-[2px] leading-none">Visitános o pedí<br /><span className="text-gold">desde casa</span></h2>
            <p className="mt-6 text-sm text-offwhite/40 font-body max-w-[450px] mx-auto leading-relaxed">Hace tu pedido online y retirá por nuestra tienda en Maracay, o recibilo donde estés con nuestro delivery.</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tienda" className="px-8 py-4 bg-gold text-black font-display text-lg tracking-[2px] rounded-sm hover:bg-gold-light transition-all duration-300 active:scale-[0.98]">Comprar ahora</Link>
              <Link href="/nosotros" className="px-8 py-4 border border-border text-offwhite/70 hover:text-gold hover:border-gold/50 font-body text-sm tracking-[1px] rounded-sm transition-all duration-300">Conocer más</Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-black flex items-center justify-center shadow-lg hover:bg-gold-light transition-all duration-300 hover:scale-105 active:scale-95" aria-label="Contactar por WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
