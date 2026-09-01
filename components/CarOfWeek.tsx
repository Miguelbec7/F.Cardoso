import Link from "next/link";
import Image from "next/image";
import type { Car } from "@/lib/cars";
import { formatPrice, whatsappLink, carInterestMessage } from "@/lib/cars";
import { CarSilhouette } from "./icons";

export function CarOfWeek({ car, whatsappNumber }: { car: Car; whatsappNumber: string }) {
  const cover = car.fotos[0];
  return (
    <div className="grid gap-6 rounded-[20px] border border-line bg-linear-to-br from-surface to-canvas-soft p-6 md:grid-cols-[1.1fr_1fr] md:items-center md:p-10">
      <Link
        href={`/carros/${car.slug}`}
        className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-line bg-[radial-gradient(120%_100%_at_30%_20%,#dbe4f7_0%,#eef1f6_70%)]"
      >
        {car.video ? (
          <video className="h-full w-full object-cover" src={car.video} autoPlay muted loop playsInline preload="auto" />
        ) : cover ? (
          <Image src={cover} alt={`${car.marca} ${car.modelo}`} fill className="object-cover" />
        ) : (
          <CarSilhouette className="w-2/3 opacity-45" stroke="#7fa0ea" />
        )}
      </Link>
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
        <div className="tabular my-3.5 text-[2rem] font-extrabold text-brand">
          {car.preco != null ? formatPrice(car.preco) : "Preço sob consulta"}
        </div>
        <div className="mb-5 grid grid-cols-2 gap-x-5 gap-y-2.5">
          <div className="border-t border-line pt-2 text-[0.82rem] text-ink-dim">
            <strong className="tabular block text-[0.92rem] text-ink">{car.ano || "—"}</strong>Ano
          </div>
          <div className="border-t border-line pt-2 text-[0.82rem] text-ink-dim">
            <strong className="tabular block text-[0.92rem] text-ink">
              {car.km != null ? `${car.km.toLocaleString("pt-PT")} km` : "—"}
            </strong>
            Quilómetros
          </div>
          <div className="border-t border-line pt-2 text-[0.82rem] text-ink-dim">
            <strong className="block text-[0.92rem] text-ink">{car.combustivel} · {car.caixa}</strong>Combustível / Caixa
          </div>
          <div className="border-t border-line pt-2 text-[0.82rem] text-ink-dim">
            <strong className="tabular block text-[0.92rem] text-ink">{car.potencia} cv</strong>Potência
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link href={`/carros/${car.slug}`} className="rounded-full bg-ink px-5 py-3 text-[0.85rem] font-bold text-canvas transition hover:bg-brand">
            Ver detalhes
          </Link>
          <a
            href={whatsappLink(carInterestMessage(car), whatsappNumber)}
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
