import Link from "next/link";
import { getSiteSettings } from "@/lib/settings";
import { FacebookIcon, InstagramIcon } from "./icons";

export function SiteFooter() {
  const { redesSociais } = getSiteSettings();
  return (
    <footer className="border-t border-line py-10 text-[0.8rem] text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <strong className="text-ink">F. Cardoso Automóveis</strong> — Compra, venda e intermediação de automóveis
          </div>
          {(redesSociais?.facebook || redesSociais?.instagram) && (
            <div className="flex items-center gap-2.5">
              {redesSociais?.facebook && (
                <a
                  href={redesSociais.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition hover:border-ink-dim hover:text-ink"
                >
                  <FacebookIcon className="h-3.5 w-3.5" />
                </a>
              )}
              {redesSociais?.instagram && (
                <a
                  href={redesSociais.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition hover:border-ink-dim hover:text-ink"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/carros" className="hover:text-ink-dim">Automóveis</Link>
          <Link href="/vender-carro" className="hover:text-ink-dim">Vender o meu carro</Link>
          <Link href="/retomas" className="hover:text-ink-dim">Retomas</Link>
          <Link href="/financiamento" className="hover:text-ink-dim">Financiamento</Link>
          <Link href="/sobre" className="hover:text-ink-dim">Sobre</Link>
          <Link href="/contactos" className="hover:text-ink-dim">Contactos</Link>
        </nav>
        <div>Elvas · © {new Date().getFullYear()} F. Cardoso Automóveis. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}
