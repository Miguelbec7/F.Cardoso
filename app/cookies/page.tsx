import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Que cookies são usados no site da F. Cardoso Automóveis.",
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Cookies</span>
      <h1 className="mt-2 text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight text-balance">
        Política de Cookies
      </h1>

      <div className="mt-6 max-w-[65ch] space-y-6 text-ink-dim">
        <section>
          <p>
            Este site não utiliza cookies de publicidade nem ferramentas de análise (ex.: Google Analytics). Ainda
            assim, alguns cookies podem ser definidos por serviços de terceiros usados no site:
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Cloudflare (alojamento)</h2>
          <p className="mt-2">
            O site está alojado na Cloudflare, que pode usar cookies técnicos essenciais para proteger o site
            contra tráfego malicioso e garantir o seu bom funcionamento. Não servem para publicidade.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Google Maps</h2>
          <p className="mt-2">
            Na página de Contactos, o mapa incorporado é fornecido pela Google. Ao interagir com o mapa, a Google
            pode definir os seus próprios cookies, de acordo com a política de privacidade da Google.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Como gerir cookies</h2>
          <p className="mt-2">
            Pode limpar, bloquear ou ser notificado sobre cookies através das definições do seu navegador. Bloquear
            todos os cookies pode afetar o funcionamento de conteúdos incorporados, como o mapa da página de
            Contactos.
          </p>
        </section>
      </div>
    </main>
  );
}
