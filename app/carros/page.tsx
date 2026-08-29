import type { Metadata } from "next";
import { CarStock } from "@/components/CarStock";
import { getAvailableCars } from "@/lib/cars";

export const metadata: Metadata = {
  title: "Automóveis à venda",
  description: "Consulte o stock de automóveis selecionados e verificados da F. Cardoso Automóveis, com filtros por marca, preço, ano e mais.",
};

export default async function CarrosPage({
  searchParams,
}: {
  searchParams: Promise<{ marca?: string }>;
}) {
  const { marca } = await searchParams;
  const cars = getAvailableCars();

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Stock atual</span>
      <h1 className="mt-2 text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-tight text-balance">
        {cars.length} automóveis disponíveis
      </h1>
      <p className="mt-2 max-w-[55ch] text-ink-dim">
        Todas as viaturas são inspecionadas antes da venda. Use os filtros para encontrar rapidamente o carro certo
        para si.
      </p>

      <div className="mt-8">
        <CarStock cars={cars} initialMarca={marca} />
      </div>
    </main>
  );
}
