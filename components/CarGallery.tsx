"use client";

import { useState } from "react";
import Image from "next/image";
import { CarSilhouette } from "./icons";

export function CarGallery({
  fotos,
  alt,
  badge,
}: {
  fotos: string[];
  alt: string;
  badge?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const hasPhotos = fotos.length > 0;

  return (
    <div>
      <button
        type="button"
        onClick={() => hasPhotos && setLightbox(true)}
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-card border border-line bg-linear-to-br from-surface-2 to-canvas-soft"
        aria-label={hasPhotos ? "Ver fotografia em ecrã inteiro" : undefined}
      >
        {badge}
        {hasPhotos ? (
          <Image key={fotos[active]} src={fotos[active]} alt={alt} fill priority className="object-cover" />
        ) : (
          <CarSilhouette className="w-2/3 opacity-40" stroke="#9aa0ac" />
        )}
      </button>

      {fotos.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {fotos.map((foto, i) => (
            <button
              key={foto}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver fotografia ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                i === active ? "border-brand-bright ring-2 ring-brand-bright/30" : "border-line hover:border-ink-dim"
              }`}
            >
              <Image src={foto} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && hasPhotos && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-10"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 text-3xl leading-none text-white/70 transition hover:text-white"
          >
            ×
          </button>
          <div className="relative h-full w-full max-w-5xl">
            <Image src={fotos[active]} alt={alt} fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
