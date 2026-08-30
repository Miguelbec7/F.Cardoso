import type { Metadata } from "next";
import { whatsappLink } from "@/lib/car-utils";
import { getSiteSettings } from "@/lib/settings";
import { StatsStrip } from "@/components/StatsStrip";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história da F. Cardoso Automóveis, em Elvas — revisão, transparência e flexibilidade em cada negócio.",
};

const VALORES = [
  {
    titulo: "Sempre revisados",
    texto: "Nenhum carro sai do stand sem passar antes por uma revisão — para chegar até si pronto a conduzir.",
  },
  {
    titulo: "Transparência",
    texto: "Sem letras pequenas nem surpresas. O que combinamos é o que se cumpre, do início ao fim do negócio.",
  },
  {
    titulo: "Flexibilidade",
    texto: "Cada cliente tem uma situação diferente — adaptamos retoma, financiamento e entrega ao que fizer sentido para si.",
  },
];

export default function SobrePage() {
  const { whatsappNumber, stats } = getSiteSettings();

  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Sobre</span>
      <h1 className="mt-2 text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight text-balance">
        Uma paixão por carros que começou aos 19 anos
      </h1>

      <div className="mt-5 max-w-[62ch] space-y-4 text-ink-dim">
        <p>
          Comecei a vender carros com apenas 19 anos, ainda por conta própria. Foram 7 a 8 anos a aprender o
          negócio a sério, venda a venda, até dar o passo para constituir a F. Cardoso Automóveis, que já leva
          mais de 5 anos a funcionar em Elvas.
        </p>
        <p>
          Hoje, esse percurso todo está naquilo que mais importa: escolher bem cada viatura que entra no stand
          e tratar cada cliente como gostaria de ser tratado.
        </p>
      </div>

      <div className="mt-10">
        <StatsStrip stats={stats} />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {VALORES.map((v) => (
          <div key={v.titulo} className="rounded-card border border-line bg-surface p-5">
            <h2 className="text-[0.98rem] font-extrabold">{v.titulo}</h2>
            <p className="mt-1.5 text-[0.85rem] text-ink-dim">{v.texto}</p>
          </div>
        ))}
      </div>

      <a
        href={whatsappLink("Olá, gostaria de saber mais sobre a F. Cardoso Automóveis.", whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-[0.9rem] font-bold text-[#06210f] transition hover:brightness-105"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Falar connosco
      </a>
    </main>
  );
}
