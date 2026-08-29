"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Car } from "@/lib/cars";
import { formatPrice, whatsappLink } from "@/lib/cars";
import { CarSilhouette, WhatsAppIcon } from "./icons";

const tones = [
  "radial-gradient(120% 90% at 15% 15%, #24344f 0%, #0a0c10 62%)",
  "radial-gradient(120% 90% at 85% 20%, #33291a 0%, #0a0c10 62%)",
  "radial-gradient(120% 90% at 50% 85%, #1c2c2a 0%, #0a0c10 62%)",
];

const strokes = ["#5b8ae0", "#c6a15b", "#7fd99a"];

export function Hero({ cars }: { cars: Car[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (cars.length < 2) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % cars.length), 4200);
    return () => clearInterval(id);
  }, [cars.length]);

  const car = cars[index];

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden">
      <div className="absolute inset-0">
        {cars.map((c, i) => (
          <div
            key={c.slug}
            aria-hidden={i !== index}
            className="absolute inset-0 transition-opacity duration-[1100ms]"
            style={{
              opacity: i === index ? 1 : 0,
              backgroundImage: tones[i % tones.length],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,12,16,0.35) 0%, rgba(10,12,16,0.55) 45%, rgba(8,10,13,0.96) 100%)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center px-3 pt-24 pb-56">
              <CarSilhouette
                className="w-[min(560px,92vw)] opacity-90 drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
                stroke={strokes[i % strokes.length]}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24">
        <span className="text-[0.72rem] font-bold tracking-[0.16em] text-gold uppercase">
          Compra · Venda · Intermediação
        </span>
        <h1 className="mt-2 max-w-[12ch] text-[clamp(2.1rem,8vw,3.6rem)] leading-[1.04] font-extrabold tracking-tight text-balance">
          Encontre o carro certo para si.
        </h1>
        <p className="mt-3.5 max-w-[42ch] text-[1.02rem] text-ink-dim">
          Viaturas selecionadas, verificadas e prontas a conduzir — com o acompanhamento de uma equipa que trata
          cada venda como se fosse a sua.
        </p>

        {car && (
          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-sm font-bold">
              {car.marca} {car.modelo} {car.versao} — {car.ano}
            </span>
            <span className="tabular text-lg font-extrabold text-gold">{formatPrice(car.preco)}</span>
          </div>
        )}

        <div className="mt-7 flex flex-wrap gap-2.5">
          <Link href="/carros" className="rounded-full bg-ink px-5 py-3 text-[0.85rem] font-bold text-canvas transition hover:bg-white active:scale-95">
            Ver automóveis
          </Link>
          <a
            href={whatsappLink("Olá, gostaria de saber mais sobre os vossos automóveis.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-[0.85rem] font-bold text-[#06210f] transition hover:brightness-105 active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Falar no WhatsApp
          </a>
          <Link
            href="/vender-carro"
            className="rounded-full border border-line px-5 py-3 text-[0.85rem] font-bold transition hover:border-ink-dim active:scale-95"
          >
            Quero vender o meu carro
          </Link>
        </div>

        {cars.length > 1 && (
          <div className="mt-6 flex gap-2">
            {cars.map((c, i) => (
              <div key={c.slug} className={`h-[3px] w-[22px] rounded-sm transition-colors ${i === index ? "bg-gold" : "bg-white/20"}`} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
