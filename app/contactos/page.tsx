import type { Metadata } from "next";
import { whatsappLink } from "@/lib/car-utils";
import { getSiteSettings } from "@/lib/settings";
import { WhatsAppIcon, PhoneIcon, CalendarIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contactos",
  description: "Fale connosco por WhatsApp ou telefone, ou marque uma visita ao stand em Elvas.",
};

export default function ContactosPage() {
  const { whatsappNumber, telefone } = getSiteSettings();

  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Contactos</span>
      <h1 className="mt-2 text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight text-balance">
        Fale connosco
      </h1>
      <p className="mt-4 max-w-[60ch] text-ink-dim">
        Estamos em Elvas e respondemos rapidamente por WhatsApp. Se preferir, também pode ligar diretamente.
      </p>

      <div className="mt-7 flex flex-wrap gap-2.5">
        <a
          href={whatsappLink("Olá, gostaria de falar convosco.", whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-[0.9rem] font-bold text-[#06210f] transition hover:brightness-105"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Falar no WhatsApp
        </a>
        <a
          href={`tel:${telefone.replace(/\s/g, "")}`}
          className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-[0.9rem] font-bold transition hover:border-ink-dim"
        >
          <PhoneIcon className="h-4 w-4" />
          {telefone}
        </a>
      </div>

      <section id="marcar-visita" className="mt-14 scroll-mt-24 border-t border-line pt-10">
        <h2 className="text-lg font-extrabold tracking-tight">Marcar visita ou test-drive</h2>
        <p className="mt-2 max-w-[55ch] text-ink-dim">
          Diga-nos que dia lhe dá jeito e qual o automóvel que quer ver — confirmamos consigo por WhatsApp.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a
            href={whatsappLink("Olá, gostaria de marcar uma visita ao stand.", whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.85rem] font-bold text-canvas transition hover:bg-brand"
          >
            <CalendarIcon className="h-4 w-4" />
            Marcar visita
          </a>
          <a
            href={whatsappLink("Olá, gostaria de marcar um test-drive.", whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[0.85rem] font-bold transition hover:border-ink-dim"
          >
            <CalendarIcon className="h-4 w-4" />
            Marcar test-drive
          </a>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="text-lg font-extrabold tracking-tight">Onde estamos</h2>
        <p className="mt-2 text-ink-dim">Elvas, Portugal</p>
        <div className="mt-4 aspect-video overflow-hidden rounded-card border border-line">
          <iframe
            title="Localização — F. Cardoso Automóveis"
            src="https://www.google.com/maps?q=F.+Cardoso+Automóveis,+Elvas&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
