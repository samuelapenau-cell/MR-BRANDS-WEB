"use client";

import Image from "next/image";

const HERO_IMAGES = Array.from({ length: 7 }, (_, i) => `/images/hero/hero-${i + 1}.jpg`);

export function HeroSlideshow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="hero-slideshow-track">
        {[...HERO_IMAGES, ...HERO_IMAGES].map((src, i) => (
          <div key={i} className="hero-slideshow-slide relative h-full w-auto flex-shrink-0">
            <Image
              src={src}
              alt=""
              width={360}
              height={640}
              className="hero-slideshow-img"
              priority={i < 3}
              loading={i < 3 ? undefined : "lazy"}
              quality={75}
              sizes="360px"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/10 to-surface/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-surface/30 via-transparent to-surface/30" />
    </div>
  );
}
