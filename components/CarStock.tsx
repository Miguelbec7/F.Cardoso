"use client";

import { useMemo, useState } from "react";
import type { Car } from "@/lib/cars";
import { CarCard } from "./CarCard";

const ALL = "Todos";

export function CarStock({ cars }: { cars: Car[] }) {
  const [marca, setMarca] = useState(ALL);
  const [combustivel, setCombustivel] = useState(ALL);
  const [caixa, setCaixa] = useState(ALL);
  const [carroçaria, setCarroçaria] = useState(ALL);
  const [precoMax, setPrecoMax] = useState(ALL);

  const marcas = useMemo(() => [ALL, ...new Set(cars.map((c) => c.marca))].sort(), [cars]);
  const combustiveis = useMemo(() => [ALL, ...new Set(cars.map((c) => c.combustivel))], [cars]);
  const caixas = useMemo(() => [ALL, ...new Set(cars.map((c) => c.caixa))], [cars]);
  const carroçarias = useMemo(() => [ALL, ...new Set(cars.map((c) => c.carroçaria))], [cars]);
  const faixasPreco = ["Todos", "Até 25 000 €", "Até 35 000 €", "Até 50 000 €", "Mais de 50 000 €"];

  const filtered = cars.filter((c) => {
    if (marca !== ALL && c.marca !== marca) return false;
    if (combustivel !== ALL && c.combustivel !== combustivel) return false;
    if (caixa !== ALL && c.caixa !== caixa) return false;
    if (carroçaria !== ALL && c.carroçaria !== carroçaria) return false;
    if (precoMax === "Até 25 000 €" && c.preco > 25000) return false;
    if (precoMax === "Até 35 000 €" && c.preco > 35000) return false;
    if (precoMax === "Até 50 000 €" && c.preco > 50000) return false;
    if (precoMax === "Mais de 50 000 €" && c.preco <= 50000) return false;
    return true;
  });

  const selectClass =
    "rounded-full border border-line bg-surface px-4 py-2.5 text-[0.82rem] font-medium text-ink outline-none transition focus:border-brand-bright";

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2.5">
        <select className={selectClass} value={marca} onChange={(e) => setMarca(e.target.value)} aria-label="Marca">
          {marcas.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select className={selectClass} value={carroçaria} onChange={(e) => setCarroçaria(e.target.value)} aria-label="Carroçaria">
          {carroçarias.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select className={selectClass} value={combustivel} onChange={(e) => setCombustivel(e.target.value)} aria-label="Combustível">
          {combustiveis.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select className={selectClass} value={caixa} onChange={(e) => setCaixa(e.target.value)} aria-label="Caixa">
          {caixas.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select className={selectClass} value={precoMax} onChange={(e) => setPrecoMax(e.target.value)} aria-label="Preço">
          {faixasPreco.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-dim">Nenhum automóvel corresponde a estes filtros. Experimente ajustar a pesquisa.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car) => (
            <div key={car.slug} className="w-full">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
