import Link from "next/link";
import type { Car } from "@/lib/cars";
import { formatKm, formatPrice } from "@/lib/cars";
import { CarSilhouette } from "./icons";

function daysAgo(dateStr: string) {
  return (Date.now() - new Date(dateStr).getTime()) / 86_400_000;
}

export function CarCard({ car }: { car: Car }) {
  const isSold = car.estado === "vendido";
  const isNew = !isSold && (car.recemChegado || daysAgo(car.criadoEm) < 21);
  const hasPriceDrop = !isSold && !!car.precoAnterior && car.precoAnterior > car.preco;

  return (
    <article className="h-full w-full overflow-hidden rounded-card border border-line bg-surface transition hover:-translate-y-0.5 hover:border-surface-2">
      <div className={`relative flex aspect-[4/3] items-center justify-center bg-linear-to-br from-surface-2 to-canvas-soft ${isSold ? "grayscale-[0.4] brightness-75" : ""}`}>
        {isNew && (
          <span className="absolute top-2.5 left-2.5 rounded-full border border-brand-bright/40 bg-canvas/75 px-2.5 py-1 text-[0.62rem] font-extrabold tracking-wide text-brand-bright uppercase">
            {car.recemChegado ? "Recém-chegado" : "Novo"}
          </span>
        )}
        {isSold && (
          <span className="absolute top-2.5 left-2.5 rounded-full border border-gold/40 bg-canvas/75 px-2.5 py-1 text-[0.62rem] font-extrabold tracking-wide text-gold uppercase">
            Vendido
          </span>
        )}
        {hasPriceDrop && (
          <span className="absolute top-2.5 right-2.5 rounded-full border border-[#7fd99a]/40 bg-canvas/75 px-2.5 py-1 text-[0.62rem] font-extrabold tracking-wide text-[#7fd99a] uppercase">
            Preço reduzido
          </span>
        )}
        <CarSilhouette className="w-3/5 opacity-55" />
      </div>

      <div className={`p-4 ${isSold ? "opacity-75" : ""}`}>
        <div className="text-[0.98rem] font-bold">
          {car.marca} {car.modelo}
        </div>
        <div className="mt-0.5 text-[0.8rem] text-muted">
          {car.ano} · {car.carroçaria}
        </div>

        {!isSold && (
          <div className="mt-2.5 mb-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.74rem] text-ink-dim">
            <span className="tabular">{formatKm(car.km)}</span>
            <span>{car.combustivel}</span>
            <span>{car.caixa}</span>
            <span className="tabular">{car.potencia} cv</span>
          </div>
        )}

        {isSold ? (
          <div className="mt-3 text-[0.8rem] text-muted">Viatura vendida — obrigado pela confiança.</div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="tabular text-[1.05rem] font-extrabold">{formatPrice(car.preco)}</div>
            <Link
              href={`/carros/${car.slug}`}
              className="rounded-full border border-line px-3.5 py-2 text-[0.78rem] font-bold transition hover:border-ink-dim"
            >
              Ver carro
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
