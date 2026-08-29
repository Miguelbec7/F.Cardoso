"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Car } from "@/lib/car-utils";
import { formatPrice, whatsappLink } from "@/lib/car-utils";
import Image from "next/image";
import { CarSilhouette, WhatsAppIcon } from "./icons";

export function Hero({
  cars,
  whatsappNumber,
  videoSrc,
  videoPoster,
}: {
  cars: Car[];
  whatsappNumber: string;
  videoSrc?: string;
  videoPoster?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (cars.length < 2) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % cars.length), 5000);
    return () => clearInterval(id);
  }, [cars.length]);

  const car = cars[index];

  return (
    <section className="relative flex flex-col bg-midnight md:min-h-[90vh] md:flex-row-reverse">
      {/* Vídeo / imagem — coluna própria, não centrada nem a ecrã inteiro */}
      <div className="relative h-[46vh] w-full overflow-hidden md:h-auto md:w-[42%]">
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={videoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(140%_100%_at_50%_0%,#1b2c4d_0%,#0a0c10_60%)]">
            <CarSilhouette className="w-4/5 max-w-[420px] opacity-[0.14]" stroke="#ffffff" />
          </div>
        )}
        {/* transição suave para o painel de texto */}
        <div
          className="pointer-events-none absolute inset-0 md:hidden"
          style={{ background: "linear-gradient(0deg, rgba(8,10,13,1) 0%, rgba(8,10,13,0) 32%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{ background: "linear-gradient(90deg, rgba(8,10,13,0.85) 0%, rgba(8,10,13,0) 22%)" }}
        />
      </div>

      {/* Texto — coluna própria à esquerda */}
      <div className="relative z-10 flex flex-1 flex-col justify-center overflow-hidden px-5 py-10 md:px-12 md:py-16 lg:px-16">
        <Image
          src="/brand/logo-mark.png"
          alt=""
          width={427}
          height={233}
          className="pointer-events-none absolute top-8 left-4 w-44 opacity-[0.16] select-none md:top-10 md:left-10 md:w-72 lg:left-14"
        />

        <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-glow uppercase">
          Compra · Venda · Intermediação
        </span>
        <h1 className="mt-2 max-w-[13ch] text-[clamp(2.1rem,6vw,3.4rem)] leading-[1.04] font-extrabold tracking-tight text-balance text-white">
          Encontre o carro certo para si.
        </h1>
        <p className="mt-3.5 max-w-[46ch] text-[1.02rem] text-white/70">
          Viaturas selecionadas, verificadas e prontas a conduzir — com o acompanhamento de uma equipa que trata
          cada venda como se fosse a sua.
        </p>

        {car && (
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-sm font-bold text-white">
              {car.marca} {car.modelo} {car.versao} — {car.ano}
            </span>
            <span className="tabular text-lg font-extrabold text-brand-glow">{formatPrice(car.preco)}</span>
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link href="/carros" className="rounded-full bg-white px-5 py-3 text-[0.85rem] font-bold text-brand transition hover:bg-canvas-soft active:scale-95">
            Ver automóveis
          </Link>
          <a
            href={whatsappLink("Olá, gostaria de saber mais sobre os vossos automóveis.", whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-[0.85rem] font-bold text-[#06210f] transition hover:brightness-105 active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Falar no WhatsApp
          </a>
          <Link
            href="/vender-carro"
            className="rounded-full border border-white/30 px-5 py-3 text-[0.85rem] font-bold text-white transition hover:border-white/60 active:scale-95"
          >
            Quero vender o meu carro
          </Link>
        </div>

        {cars.length > 1 && (
          <div className="mt-6 flex gap-2">
            {cars.map((c, i) => (
              <button
                key={c.slug}
                aria-label={`Mostrar ${c.marca} ${c.modelo}`}
                onClick={() => setIndex(i)}
                className={`h-[3px] w-[22px] rounded-sm transition-colors ${i === index ? "bg-brand-glow" : "bg-white/25"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
