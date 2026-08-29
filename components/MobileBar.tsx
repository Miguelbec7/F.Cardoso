import { whatsappLink } from "@/lib/cars";
import { getSiteSettings } from "@/lib/settings";
import { CalendarIcon, PhoneIcon, WhatsAppIcon } from "./icons";

export function MobileBar() {
  const { whatsappNumber, telefone } = getSiteSettings();
  return (
    <nav
      aria-label="Ações rápidas"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-line bg-canvas-soft/95 p-2.5 backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={whatsappLink("Olá, gostaria de saber mais sobre os vossos automóveis.", whatsappNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 rounded-[10px] bg-whatsapp py-1.5 text-[0.66rem] font-bold text-[#06210f]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        WhatsApp
      </a>
      <a href={`tel:${telefone.replace(/\s/g, "")}`} className="flex flex-col items-center gap-1 rounded-[10px] py-1.5 text-[0.66rem] font-bold text-ink-dim">
        <PhoneIcon className="h-5 w-5" />
        Ligar
      </a>
      <a href="/contactos#marcar-visita" className="flex flex-col items-center gap-1 rounded-[10px] py-1.5 text-[0.66rem] font-bold text-ink-dim">
        <CalendarIcon className="h-5 w-5" />
        Marcar visita
      </a>
    </nav>
  );
}
