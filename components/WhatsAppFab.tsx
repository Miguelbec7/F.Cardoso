import { whatsappLink } from "@/lib/cars";
import { getSiteSettings } from "@/lib/settings";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFab() {
  const { whatsappNumber } = getSiteSettings();
  return (
    <a
      href={whatsappLink("Olá, gostaria de saber mais sobre os vossos automóveis.", whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-24 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-[#06210f] shadow-[0_10px_24px_rgba(37,211,102,0.35)] transition hover:brightness-110 active:scale-95 md:bottom-7 md:flex"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
