import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 text-[0.8rem] text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5">
        <div>
          <strong className="text-ink">F. Cardoso Automóveis</strong> — Compra, venda e intermediação de automóveis
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/carros" className="hover:text-ink-dim">Automóveis</Link>
          <Link href="/vender-carro" className="hover:text-ink-dim">Vender o meu carro</Link>
          <Link href="/retomas" className="hover:text-ink-dim">Retomas</Link>
          <Link href="/financiamento" className="hover:text-ink-dim">Financiamento</Link>
          <Link href="/sobre" className="hover:text-ink-dim">Sobre</Link>
          <Link href="/blog" className="hover:text-ink-dim">Blog</Link>
          <Link href="/contactos" className="hover:text-ink-dim">Contactos</Link>
        </nav>
        <div>Porto e Braga · © {new Date().getFullYear()} F. Cardoso Automóveis. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}
