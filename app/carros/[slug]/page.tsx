import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cars,
  getCarBySlug,
  getSimilarCars,
  formatPrice,
  formatKm,
  whatsappLink,
  carInterestMessage,
} from "@/lib/cars";
import { getSiteSettings } from "@/lib/settings";
import { WhatsAppIcon } from "@/components/icons";
import { CarRow } from "@/components/CarRow";
import { CarGallery } from "@/components/CarGallery";
import { EquipmentList } from "@/components/EquipmentList";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};
  const title = `${car.marca} ${car.modelo} ${car.versao}${car.ano ? ` (${car.ano})` : ""}`;
  const description = [
    `${car.marca} ${car.modelo} ${car.versao}`,
    car.ano ? String(car.ano) : null,
    car.km != null ? formatKm(car.km) : null,
    car.combustivel,
    car.caixa,
  ]
    .filter(Boolean)
    .join(", ") + `. ${formatPrice(car.preco)}.`;
  const image = car.fotos[0] || "/og-image.png";
  return {
    title,
    description,
    alternates: { canonical: `/carros/${car.slug}` },
    openGraph: { title, description, images: [{ url: image }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const { whatsappNumber } = getSiteSettings();
  const isSold = car.estado === "vendido";
  const similar = getSimilarCars(car);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${car.marca} ${car.modelo} ${car.versao}`,
    brand: car.marca,
    model: car.modelo,
    ...(car.ano ? { vehicleModelDate: String(car.ano) } : {}),
    ...(car.km != null
      ? { mileageFromOdometer: { "@type": "QuantitativeValue", value: car.km, unitCode: "KMT" } }
      : {}),
    fuelType: car.combustivel,
    vehicleTransmission: car.caixa,
    color: car.cor,
    offers: {
      "@type": "Offer",
      price: car.preco,
      priceCurrency: "EUR",
      availability: isSold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 text-[0.8rem] text-muted">
        <Link href="/carros" className="hover:text-ink-dim">Automóveis</Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-dim">{car.marca} {car.modelo}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <CarGallery
            fotos={car.fotos}
            alt={`${car.marca} ${car.modelo}`}
            badge={
              isSold ? (
                <span className="absolute top-3 left-3 z-10 rounded-full bg-ink px-3 py-1.5 text-[0.68rem] font-extrabold tracking-wide text-white uppercase">
                  Vendido
                </span>
              ) : undefined
            }
          />

          <div className="mt-10">
            <h2 className="text-lg font-extrabold tracking-tight">Descrição</h2>
            <p className="mt-3 max-w-[65ch] text-ink-dim">{car.descricao}</p>
          </div>

          <div className="mt-8">
            <h2 className="mb-4 text-lg font-extrabold tracking-tight">Equipamento</h2>
            <EquipmentList equipamento={car.equipamento} />
          </div>
        </div>

        <div>
          <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">
            {car.marca}
          </span>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-balance">
            {car.modelo} {car.versao}
          </h1>
          <div className="tabular mt-3 text-3xl font-extrabold">{formatPrice(car.preco)}</div>
          {car.precoAnterior && (
            <div className="tabular mt-1 text-sm text-muted line-through">{formatPrice(car.precoAnterior)}</div>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-line pt-5">
            {[
              ["Ano", car.ano ? String(car.ano) : ""],
              ["Quilómetros", car.km != null ? formatKm(car.km) : ""],
              ["Combustível", car.combustivel],
              ["Caixa", car.caixa],
              ["Cilindrada", car.cilindrada],
              ["Potência", `${car.potencia} cv`],
              ["Cor", car.cor],
              ["Carroçaria", car.carroceria],
              ["Garantia", car.garantia],
              ["Localização", car.localizacao],
            ]
              .filter(([, value]) => !!value)
              .map(([label, value]) => (
              <div key={label}>
                <dt className="text-[0.7rem] tracking-wide text-muted uppercase">{label}</dt>
                <dd className="tabular mt-0.5 text-[0.9rem] font-semibold">{value}</dd>
              </div>
            ))}
          </dl>

          {!isSold ? (
            <div className="mt-7 flex flex-col gap-2.5">
              <a
                href={whatsappLink(carInterestMessage(car), whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-[0.9rem] font-bold text-[#06210f] transition hover:brightness-105"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Falar no WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={whatsappLink(carInterestMessage(car), whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-ink px-4 py-3 text-center text-[0.82rem] font-bold text-canvas transition hover:bg-brand"
                >
                  Tenho interesse
                </a>
                <Link
                  href="/contactos#marcar-visita"
                  className="flex items-center justify-center rounded-full border border-line px-4 py-3 text-center text-[0.82rem] font-bold transition hover:border-ink-dim"
                >
                  Marcar visita
                </Link>
                <Link
                  href="/contactos#marcar-visita"
                  className="flex items-center justify-center rounded-full border border-line px-4 py-3 text-center text-[0.82rem] font-bold transition hover:border-ink-dim"
                >
                  Marcar test-drive
                </Link>
                <Link
                  href="/retomas"
                  className="flex items-center justify-center rounded-full border border-line px-4 py-3 text-center text-[0.82rem] font-bold transition hover:border-ink-dim"
                >
                  Tenho carro p/ retoma
                </Link>
                <Link
                  href={`/financiamento?carro=${car.slug}`}
                  className="col-span-2 flex items-center justify-center rounded-full border border-brand-bright/40 bg-brand-bright/5 px-4 py-3 text-center text-[0.82rem] font-bold text-brand-bright transition hover:bg-brand-bright/10"
                >
                  Simular financiamento deste carro
                </Link>
              </div>
            </div>
          ) : (
            <p className="mt-7 rounded-card border border-line bg-surface p-4 text-ink-dim">
              Esta viatura já foi vendida. <Link href="/carros" className="font-bold text-brand-bright">Veja o stock disponível →</Link>
            </p>
          )}
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-[clamp(1.3rem,3vw,1.7rem)] font-extrabold tracking-tight">Carros semelhantes</h2>
          <CarRow cars={similar} />
        </section>
      )}
    </main>
  );
}
