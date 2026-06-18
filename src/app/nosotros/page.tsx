"use client";

import Link from "next/link";
import { STORE } from "@/lib/constants";

export default function NosotrosPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Hero */}
        <div className="mb-16 md:mb-24">
          <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gold">
            Nosotros
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl text-offwhite tracking-[2px] leading-none">
            La Casa del <span className="text-gold">Flow</span>
          </h1>
          <p className="mt-6 text-sm md:text-base text-offwhite/50 font-body max-w-[600px] leading-relaxed">
            MR.BRANDS es una tienda multimarca de pantalones y slim fit streetwear ubicada en Maracay, 
            Estado Aragua. Somos el hogar del estilo urbano en Venezuela.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16 md:mb-24">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-offwhite tracking-[1.5px]">
              Nuestra <span className="text-gold">Historia</span>
            </h2>
          </div>
          <div className="space-y-4 text-sm text-offwhite/50 font-body leading-relaxed">
            <p>
              Nacimos en Maracay con una misión clara: traer las mejores marcas de streetwear y moda urbana 
              a Venezuela. Desde nuestro local en el C.C.P. Estación Central, hemos construido una comunidad 
              de miles de personas que comparten nuestra pasión por el estilo.
            </p>
            <p>
              Con más de 36,000 seguidores en Instagram y cientos de productos disponibles, nos hemos 
              convertido en un referente de la moda urbana en la región. Trabajamos con múltiples marcas 
              reconocidas para ofrecerte lo último en tendencias.
            </p>
            <p>
              Creemos que la ropa es más que tela: es una forma de expresar quién eres. Por eso cada 
              producto que seleccionamos para nuestro catálogo pasa por un filtro de calidad, autenticidad 
              y estilo.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 md:mb-24">
          {[
            { num: "36K+", label: "Seguidores en Instagram" },
            { num: "500+", label: "Productos disponibles" },
            { num: "4+", label: "Años en el mercado" },
            { num: "1", label: "Casa del Flow" },
          ].map((stat) => (
            <div key={stat.label} className="p-8 bg-surface-light border border-border rounded-sm text-center">
              <p className="font-display text-4xl md:text-5xl text-gold tracking-[1px]">{stat.num}</p>
              <p className="mt-2 text-xs text-offwhite/40 font-mono uppercase tracking-[1.5px]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-offwhite tracking-[1.5px]">
                Visitanos en <span className="text-gold">Maracay</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm text-offwhite/50 font-body">
                <a href={STORE.mapsUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-gold transition-colors">
                  <strong className="text-offwhite/80">{STORE.address.line1}</strong><br />{STORE.address.line2}
                </a>
                <p>{STORE.address.city}, {STORE.address.state}, {STORE.address.country}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-mono uppercase tracking-[2px] text-gold mb-3">Horarios</p>
                  <p className="text-offwhite/60">Lun - Sab: 9:00 AM - 6:00 PM</p>
                  <p className="text-offwhite/60">Dom: 10:00 AM - 3:00 PM</p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] bg-surface-light border border-border rounded-sm overflow-hidden relative group">
              <a href={STORE.mapsUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.5!2d-67.6024932!3d10.2476515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e803c9b9611f813%3A0xcb82a26485afc729!2sCentro%20Comercial%20Paseo%20Estaci%C3%B3n%20Central!5e0!3m2!1ses!2sve!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                  title="Ubicacion MR.BRANDS"
                  className="pointer-events-none"
                />
                <div className="absolute inset-0 z-10" />
              </a>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq">
          <div className="mb-10">
            <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gold">FAQ</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl text-offwhite tracking-[1.5px]">
              Preguntas <span className="text-gold">Frecuentes</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "Como hago un pedido?", a: "Agrega los productos a tu carrito, completa tus datos y envianos el pedido por WhatsApp. Te confirmaremos disponibilidad y forma de pago." },
              { q: "Hacen envios a todo Venezuela?", a: "Si! Hacemos delivery en Maracay y envios nacionales. Consulta por la cobertura y costos." },
              { q: "Como puedo pagar?", a: "Aceptamos pago movil, transferencias bancarias y Zelle. Tambien pago en efectivo si retiras en tienda." },
              { q: "Puedo retirar en tienda?", a: "Si. Selecciona la opcion de pick-up al hacer tu pedido y pasas a retirar por nuestro local." },
              { q: "Como se las tallas?", a: "Cada producto tiene su propia guia de tallas. Si tienes dudas, consultanos por WhatsApp y te asesoramos." },
              { q: "Aceptan cambios o devoluciones?", a: "Si, dentro de los primeros 7 dias. El producto debe estar en su estado original. Consulta terminos completos." },
            ].map((faq) => (
              <div key={faq.q} className="p-6 bg-surface-light border border-border rounded-sm">
                <h3 className="font-display text-xl text-gold tracking-[1px]">{faq.q}</h3>
                <p className="mt-3 text-sm text-offwhite/50 font-body leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
