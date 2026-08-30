import type { Metadata } from "next";
import { whatsappLink } from "@/lib/car-utils";
import { getSiteSettings } from "@/lib/settings";
import { WhatsAppIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Vender o meu carro",
  description: "Vendemos o seu carro por si, mesmo que não compre outro. Avaliação rápida e sem compromisso.",
};

const PASSOS = [
  { titulo: "Envie os dados", texto: "Marca, modelo, ano, quilómetros e algumas fotografias, por WhatsApp." },
  { titulo: "Avaliação e proposta", texto: "Analisamos o automóvel e enviamos uma proposta sem compromisso." },
  { titulo: "Entrega e pagamento", texto: "Combinamos a entrega e trata-se de tudo no mesmo dia." },
];

export default function VenderCarroPage() {
  const { whatsappNumber } = getSiteSettings();
  const waHref = whatsappLink("Olá, gostaria de vender o meu carro.", whatsappNumber);

  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Vender o meu carro</span>
      <h1 className="mt-2 text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight text-balance">
        Venda o seu carro sem complicações
      </h1>
      <p className="mt-4 max-w-[60ch] text-ink-dim">
        Compramos o seu automóvel mesmo que não compre outro connosco. Avaliação rápida, sem compromisso — envie
        os dados e fotografias e receba uma proposta em poucas horas.
      </p>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-[0.9rem] font-bold text-[#06210f] transition hover:brightness-105"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Quero uma avaliação
      </a>

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {PASSOS.map((p, i) => (
          <div key={p.titulo} className="rounded-card border border-line bg-surface p-5">
            <div className="tabular text-[0.72rem] font-extrabold text-brand-bright">0{i + 1}</div>
            <h2 className="mt-1.5 text-[0.98rem] font-extrabold">{p.titulo}</h2>
            <p className="mt-1.5 text-[0.85rem] text-ink-dim">{p.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-card border border-line bg-surface-2 p-6">
        <h2 className="text-lg font-extrabold tracking-tight">O que enviar</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink-dim">
          <li>Marca, modelo e ano</li>
          <li>Quilómetros e matrícula</li>
          <li>Estado geral (mecânica, pintura, interior)</li>
          <li>4 a 5 fotografias — frente, trás, interior e o conta-quilómetros</li>
        </ul>
      </div>
    </main>
  );
}
