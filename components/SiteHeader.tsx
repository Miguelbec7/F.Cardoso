import Link from "next/link";
import { whatsappLink } from "@/lib/cars";
import { getSiteSettings } from "@/lib/settings";
import { WhatsAppIcon } from "./icons";
import { BrandLockup } from "./BrandMark";

const navLinks = [
  { href: "/carros", label: "Automóveis" },
  { href: "/vender-carro", label: "Vender o meu carro" },
  { href: "/retomas", label: "Retomas" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contactos", label: "Contactos" },
];

export function SiteHeader() {
  const { whatsappNumber } = getSiteSettings();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/">
          <BrandLockup />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-ink-dim transition hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <Link
            href="/carros"
            className="rounded-full border border-line px-5 py-2.5 text-[0.85rem] font-bold transition hover:border-ink-dim"
          >
            Ver automóveis
          </Link>
          <a
            href={whatsappLink("Olá, gostaria de saber mais sobre os vossos automóveis.", whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-[0.85rem] font-bold text-[#06210f] transition hover:brightness-105"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
