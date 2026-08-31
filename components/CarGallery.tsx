"use client";

import { useState } from "react";
import Image from "next/image";
import { CarSilhouette } from "./icons";

const VIDEO = "video" as const;

export function CarGallery({
  fotos,
  video,
  alt,
  badge,
}: {
  fotos: string[];
  video?: string;
  alt: string;
  badge?: React.ReactNode;
}) {
  const [active, setActive] = useState<number | typeof VIDEO>(video ? VIDEO : 0);
  const [lightbox, setLightbox] = useState(false);
  const hasPhotos = fotos.length > 0;
  const showingVideo = active === VIDEO && !!video;

  return (
    <div>
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-card border border-line bg-linear-to-br from-surface-2 to-canvas-soft">
        {badge}
        {showingVideo ? (
          <video className="h-full w-full object-cover" src={video} controls muted loop playsInline preload="metadata" />
        ) : hasPhotos ? (
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="absolute inset-0"
            aria-label="Ver fotografia em ecrã inteiro"
          >
            <Image key={fotos[active as number]} src={fotos[active as number]} alt={alt} fill priority className="object-cover" />
          </button>
        ) : (
          <CarSilhouette className="w-2/3 opacity-40" stroke="#9aa0ac" />
        )}
      </div>

      {(video || fotos.length > 1) && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {video && (
            <button
              type="button"
              onClick={() => setActive(VIDEO)}
              aria-label="Ver vídeo"
              className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border bg-ink transition ${
                showingVideo ? "border-brand-bright ring-2 ring-brand-bright/30" : "border-line hover:border-ink-dim"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
          {fotos.map((foto, i) => (
            <button
              key={foto}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver fotografia ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-lg border transition ${
                active === i ? "border-brand-bright ring-2 ring-brand-bright/30" : "border-line hover:border-ink-dim"
              }`}
            >
              <Image src={foto} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && hasPhotos && !showingVideo && (
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
            <Image src={fotos[active as number]} alt={alt} fill className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
