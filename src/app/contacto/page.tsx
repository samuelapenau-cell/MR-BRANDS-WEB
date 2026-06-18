"use client";

import { STORE } from "@/lib/constants";

export default function ContactoPage() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[2.5px] text-gold">
            Contacto
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl text-offwhite tracking-[2px] leading-none">
            Hable<span className="text-gold">mos</span>
          </h1>
          <p className="mt-6 text-sm text-offwhite/50 font-body max-w-[500px] leading-relaxed">
            Estamos listos para atenderte. Escribinos por WhatsApp, visita nuestra tienda o seguiros en Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-8">
            <a href={"https://wa.me/" + STORE.whatsapp} target="_blank" rel="noopener noreferrer"
              className="block p-8 bg-surface-light border border-border rounded-sm group hover:border-gold/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-offwhite tracking-[1px]">WhatsApp</h3>
                  <p className="text-sm text-offwhite/40 font-body">{STORE.phone}</p>
                </div>
              </div>
              <span className="text-xs font-mono uppercase tracking-[2px] text-gold group-hover:text-gold-light transition-colors">
                Escribinos ahora {'->'}
              </span>
            </a>

            <a href={STORE.mapsUrl} target="_blank" rel="noopener noreferrer" className="block p-8 bg-surface-light border border-border rounded-sm group hover:border-gold/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-offwhite tracking-[1px]">Visitanos</h3>
                  <p className="text-sm text-offwhite/40 font-body">{STORE.address.line1}</p>
                </div>
              </div>
              <p className="text-sm text-offwhite/50 font-body">{STORE.address.line2}, {STORE.address.city}</p>
              <span className="mt-4 inline-block text-xs font-mono uppercase tracking-[2px] text-gold/50 group-hover:text-gold transition-colors">
                Abrir en Google Maps →
              </span>
            </a>

            <a href={"https://instagram.com/" + STORE.instagram} target="_blank" rel="noopener noreferrer"
              className="block p-8 bg-surface-light border border-border rounded-sm group hover:border-gold/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-offwhite tracking-[1px]">Instagram</h3>
                  <p className="text-sm text-offwhite/40 font-body">@{STORE.instagram}</p>
                </div>
              </div>
              <span className="text-xs font-mono uppercase tracking-[2px] text-gold group-hover:text-gold-light transition-colors">
                Seguinos {'->'}
              </span>
            </a>
          </div>

          <div className="p-8 bg-surface-light border border-border rounded-sm">
            <h3 className="font-display text-2xl text-offwhite tracking-[1px] mb-6">Horarios</h3>
            <div className="space-y-4">
              {[
                { day: "Lunes - Viernes", hours: "9:00 AM - 7:00 PM" },
                { day: "Sabado", hours: "9:00 AM - 5:00 PM" },
                { day: "Domingo", hours: "10:00 AM - 3:00 PM" },
              ].map((sched) => (
                <div key={sched.day} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                  <span className="text-sm text-offwhite/60 font-body">{sched.day}</span>
                  <span className="text-sm text-offwhite font-mono">{sched.hours}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-display text-2xl text-offwhite tracking-[1px] mb-4">Servicios</h3>
              <div className="flex flex-wrap gap-3">
                {["Delivery", "Pick-up en tienda", "Asesoria de tallas", "Cambios y devoluciones"].map((svc) => (
                  <span key={svc} className="px-4 py-2 border border-border text-xs font-mono text-offwhite/60 rounded-sm">
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
