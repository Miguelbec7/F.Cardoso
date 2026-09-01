"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Car } from "@/lib/car-utils";
import { formatPrice, whatsappLink } from "@/lib/car-utils";
import { WhatsAppIcon } from "./icons";

const MANUAL = "manual";
const fieldClass =
  "mt-1.5 w-full rounded-full border border-line bg-canvas px-4 py-2.5 text-[0.85rem] outline-none focus:border-brand-bright";

export function FinanceSimulator({
  cars,
  escaloes,
  prazoMaximoMeses,
  whatsappNumber,
}: {
  cars: Car[];
  escaloes: { ateMeses: number; taxaTAN: number }[];
  prazoMaximoMeses: number;
  whatsappNumber: string;
}) {
  const anosMax = Math.max(1, Math.round(prazoMaximoMeses / 12));
  const searchParams = useSearchParams();
  const carroParam = searchParams.get("carro");
  const [carroSlug, setCarroSlug] = useState(
    carroParam && cars.some((c) => c.slug === carroParam) ? carroParam : MANUAL
  );
  const [valorManual, setValorManual] = useState(15000);
  const [entrada, setEntrada] = useState(2000);
  const [anos, setAnos] = useState(Math.min(6, anosMax));

  const carroSelecionado = cars.find((c) => c.slug === carroSlug);
  const preco = carroSelecionado ? (carroSelecionado.preco ?? 0) : valorManual;
  const meses = anos * 12;
  const financiado = Math.max(preco - entrada, 0);
  const ordenados = [...escaloes].sort((a, b) => a.ateMeses - b.ateMeses);
  const taxaTAN = (ordenados.find((e) => meses <= e.ateMeses) ?? ordenados[ordenados.length - 1])?.taxaTAN ?? 9.9;
  const taxaMensal = taxaTAN / 100 / 12;

  const mensalidade = useMemo(() => {
    if (financiado <= 0) return 0;
    if (taxaMensal === 0) return financiado / meses;
    const fator = Math.pow(1 + taxaMensal, meses);
    return (financiado * taxaMensal * fator) / (fator - 1);
  }, [financiado, taxaMensal, meses]);

  const totalPago = mensalidade * meses;
  const totalJuros = Math.max(totalPago - financiado, 0);

  const mensagem = carroSelecionado
    ? `Olá, gostaria de uma simulação de financiamento real para o ${carroSelecionado.marca} ${carroSelecionado.modelo} ${carroSelecionado.versao} (entrada de ${formatPrice(entrada)}, ${anos} ${anos === 1 ? "ano" : "anos"}).`
    : `Olá, gostaria de uma simulação de financiamento real para um automóvel de cerca de ${formatPrice(valorManual)} (entrada de ${formatPrice(entrada)}, ${anos} ${anos === 1 ? "ano" : "anos"}).`;

  return (
    <div className="rounded-card border border-line bg-surface p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.78rem] font-bold text-ink-dim">Automóvel</span>
          <select value={carroSlug} onChange={(e) => setCarroSlug(e.target.value)} className={fieldClass}>
            <option value={MANUAL}>Outro valor (introduzir manualmente)</option>
            {cars.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.marca} {c.modelo} — {c.preco != null ? formatPrice(c.preco) : "preço sob consulta"}
              </option>
            ))}
          </select>
        </label>

        {!carroSelecionado && (
          <label className="block">
            <span className="text-[0.78rem] font-bold text-ink-dim">Valor do automóvel (€)</span>
            <input
              type="number"
              min={0}
              step={100}
              value={valorManual}
              onChange={(e) => setValorManual(Number(e.target.value) || 0)}
              className={fieldClass}
            />
          </label>
        )}

        <label className="block">
          <span className="text-[0.78rem] font-bold text-ink-dim">Capital de entrada (€)</span>
          <input
            type="number"
            min={0}
            step={100}
            value={entrada}
            onChange={(e) => setEntrada(Number(e.target.value) || 0)}
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className="text-[0.78rem] font-bold text-ink-dim">Prazo</span>
          <select value={anos} onChange={(e) => setAnos(Number(e.target.value))} className={fieldClass}>
            {Array.from({ length: anosMax }, (_, i) => i + 1).map((y) => (
              <option key={y} value={y}>
                {y} {y === 1 ? "ano" : "anos"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-[0.78rem] text-ink-dim">
        Taxa aplicada a este prazo: <strong className="tabular text-ink">{taxaTAN.toLocaleString("pt-PT")}% TAN</strong>
      </p>

      <div className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-6 text-center">
        <div>
          <div className="tabular text-2xl font-extrabold text-brand">{formatPrice(Math.round(mensalidade))}</div>
          <div className="mt-1 text-[0.68rem] tracking-wide text-muted uppercase">Mensalidade estimada</div>
        </div>
        <div>
          <div className="tabular text-lg font-bold">{formatPrice(Math.round(financiado))}</div>
          <div className="mt-1 text-[0.68rem] tracking-wide text-muted uppercase">Valor financiado</div>
        </div>
        <div>
          <div className="tabular text-lg font-bold">{formatPrice(Math.round(totalJuros))}</div>
          <div className="mt-1 text-[0.68rem] tracking-wide text-muted uppercase">Juros estimados</div>
        </div>
      </div>

      <a
        href={whatsappLink(mensagem, whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-[0.9rem] font-bold text-[#06210f] transition hover:brightness-105"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Pedir simulação real
      </a>
    </div>
  );
}
