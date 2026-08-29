"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Car } from "@/lib/car-utils";
import { formatPrice, whatsappLink } from "@/lib/car-utils";
import { CarSilhouette, WhatsAppIcon } from "./icons";

const tones = [
  "radial-gradient(140% 100% at 80% 0%, #1b2c4d 0%, #0a0c10 60%)",
  "radial-gradient(140% 100% at 80% 0%, #202821 0%, #0a0c10 60%)",
  "radial-gradient(140% 100% at 80% 0%, #1c2333 0%, #0a0c10 60%)",
];

export function Hero({ cars, whatsappNumber }: { cars: Car[]; whatsappNumber: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (cars.length < 2) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % cars.length), 5500);
    return () => clearInterval(id);
  }, [cars.length]);

  const car = cars[index];

  return (
    <section className="relative flex min-h-[88vh] items-end overflow-hidden bg-midnight">
      <div className="absolute inset-0">
        {cars.map((c, i) => (
          <div
            key={c.slug}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-[1200ms]"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            {c.video ? (
              <video
                className="h-full w-full object-cover"
                src={c.video}
                autoPlay
                muted
                loop
                playsInline
                preload={i === 0 ? "auto" : "none"}
              />
            ) : (
              <div className="relative h-full w-full" style={{ backgroundImage: tones[i % tones.length] }}>
                <CarSilhouette
                  className="absolute -right-16 bottom-[-8%] w-[85%] max-w-[720px] opacity-[0.12]"
                  stroke="#ffffff"
                />
              </div>
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(8,10,13,0.92) 0%, rgba(8,10,13,0.62) 42%, rgba(8,10,13,0.35) 100%), linear-gradient(0deg, rgba(8,10,13,0.9) 0%, rgba(8,10,13,0.15) 38%, rgba(8,10,13,0.05) 60%)",
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16">
        <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-glow uppercase">
          Compra · Venda · Intermediação
        </span>
        <h1 className="mt-2 max-w-[12ch] text-[clamp(2.1rem,8vw,3.6rem)] leading-[1.04] font-extrabold tracking-tight text-balance text-white">
          Encontre o carro certo para si.
        </h1>
        <p className="mt-3.5 max-w-[42ch] text-[1.02rem] text-white/70">
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
