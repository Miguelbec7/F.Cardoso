import type { Metadata } from "next";
import { Suspense } from "react";
import { getAvailableCars } from "@/lib/cars";
import { getSiteSettings } from "@/lib/settings";
import { FinanceSimulator } from "@/components/FinanceSimulator";

export const metadata: Metadata = {
  title: "Financiamento",
  description: "Simule a mensalidade do seu próximo carro — escolha um automóvel do stock ou introduza um valor.",
};

export default function FinanciamentoPage() {
  const cars = getAvailableCars();
  const { whatsappNumber, financiamento } = getSiteSettings();
  const prazoMaximoMeses = financiamento?.prazoMaximoMeses ?? 120;
  const escaloes = financiamento?.escaloes?.length
    ? financiamento.escaloes
    : [{ ateMeses: prazoMaximoMeses, taxaTAN: 9.9 }];

  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Financiamento</span>
      <h1 className="mt-2 text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight text-balance">
        Simule a mensalidade do seu carro
      </h1>
      <p className="mt-4 max-w-[60ch] text-ink-dim">
        Escolha um automóvel do nosso stock atual ou introduza um valor à sua escolha, defina a entrada e o
        prazo, e tenha logo uma ideia da mensalidade. Financiamos até {Math.round(prazoMaximoMeses / 12)} anos.
      </p>

      <div className="mt-8">
        <Suspense fallback={null}>
          <FinanceSimulator cars={cars} escaloes={escaloes} prazoMaximoMeses={prazoMaximoMeses} whatsappNumber={whatsappNumber} />
        </Suspense>
      </div>

      <p className="mt-6 text-[0.78rem] text-muted">
        Valores meramente indicativos, calculados com taxas de referência que variam consoante o prazo escolhido,
        sem outros custos associados ao crédito. Não constituem uma proposta de financiamento nem uma garantia de
        aprovação — a mensalidade final depende da instituição financeira e do perfil de crédito. Contacte-nos
        para uma simulação real e sem compromisso.
      </p>
    </main>
  );
}
