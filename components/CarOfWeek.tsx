import Link from "next/link";
import type { Car } from "@/lib/cars";
import { formatPrice, whatsappLink, carInterestMessage } from "@/lib/cars";
import { CarSilhouette } from "./icons";

export function CarOfWeek({ car }: { car: Car }) {
  return (
    <div className="grid gap-6 rounded-[20px] border border-line bg-linear-to-br from-surface to-canvas-soft p-6 md:grid-cols-[1.1fr_1fr] md:items-center md:p-10">
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-line bg-[radial-gradient(120%_100%_at_30%_20%,#2a3550_0%,#0d0f14_70%)]">
        <CarSilhouette className="w-2/3 opacity-65" stroke="#c6a15b" />
      </div>
      <div>
        <div className="mb-3.5 flex flex-wrap gap-2">
          <span className="rounded-full border border-line px-2.5 py-1.5 text-[0.68rem] font-bold tracking-wide text-ink-dim uppercase">
            {car.garantia}
          </span>
          <span className="rounded-full border border-line px-2.5 py-1.5 text-[0.68rem] font-bold tracking-wide text-ink-dim uppercase">
            {car.localizacao}
          </span>
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight">
          {car.marca} {car.modelo} {car.versao}
        </h3>
        <div className="tabular my-3.5 text-[2rem] font-extrabold text-gold">{formatPrice(car.preco)}</div>
        <div className="mb-5 grid grid-cols-2 gap-x-5 gap-y-2.5">
          <div className="border-t border-line pt-2 text-[0.82rem] text-ink-dim">
            <strong className="tabular block text-[0.92rem] text-ink">{car.ano}</strong>Ano
          </div>
          <div className="border-t border-line pt-2 text-[0.82rem] text-ink-dim">
            <strong className="tabular block text-[0.92rem] text-ink">{car.km.toLocaleString("pt-PT")} km</strong>Quilómetros
          </div>
          <div className="border-t border-line pt-2 text-[0.82rem] text-ink-dim">
            <strong className="block text-[0.92rem] text-ink">{car.combustivel} · {car.caixa}</strong>Combustível / Caixa
          </div>
          <div className="border-t border-line pt-2 text-[0.82rem] text-ink-dim">
            <strong className="tabular block text-[0.92rem] text-ink">{car.potencia} cv</strong>Potência
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link href={`/carros/${car.slug}`} className="rounded-full bg-ink px-5 py-3 text-[0.85rem] font-bold text-canvas transition hover:bg-white">
            Ver detalhes
          </Link>
          <a
            href={whatsappLink(carInterestMessage(car))}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-whatsapp px-5 py-3 text-[0.85rem] font-bold text-[#06210f] transition hover:brightness-105"
          >
            Tenho interesse
          </a>
        </div>
      </div>
    </div>
  );
}
