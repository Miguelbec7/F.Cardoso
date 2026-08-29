import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/lib/car-utils";
import { formatKm, formatPrice, isCarNew } from "@/lib/car-utils";
import { CarSilhouette } from "./icons";

export function CarCard({ car }: { car: Car }) {
  const isSold = car.estado === "vendido";
  const isNew = isCarNew(car);
  const hasPriceDrop = !isSold && !!car.precoAnterior && car.precoAnterior > car.preco;
  const cover = car.fotos[0];

  return (
    <article className="h-full w-full overflow-hidden rounded-card border border-line bg-surface transition hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(20,24,34,0.08)]">
      <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-linear-to-br from-surface-2 to-canvas-soft ${isSold ? "grayscale-[0.5] brightness-90" : ""}`}>
        {isNew && (
          <span className="absolute top-2.5 left-2.5 rounded-full border border-brand-bright/30 bg-white/90 px-2.5 py-1 text-[0.62rem] font-extrabold tracking-wide text-brand-bright uppercase">
            {car.recemChegado ? "Recém-chegado" : "Novo"}
          </span>
        )}
        {isSold && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-ink px-2.5 py-1 text-[0.62rem] font-extrabold tracking-wide text-white uppercase">
            Vendido
          </span>
        )}
        {hasPriceDrop && (
          <span className="absolute top-2.5 right-2.5 rounded-full border border-[#1a9c5b]/30 bg-white/90 px-2.5 py-1 text-[0.62rem] font-extrabold tracking-wide text-[#1a9c5b] uppercase">
            Preço reduzido
          </span>
        )}
        {cover ? (
          <Image src={cover} alt={`${car.marca} ${car.modelo}`} fill className="object-cover" />
        ) : (
          <CarSilhouette className="w-3/5 opacity-40" stroke="#9aa0ac" />
        )}
      </div>

      <div className={`p-4 ${isSold ? "opacity-75" : ""}`}>
        <div className="text-[0.98rem] font-bold">
          {car.marca} {car.modelo}
        </div>
        <div className="mt-0.5 text-[0.8rem] text-muted">
          {car.ano} · {car.carroceria}
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
