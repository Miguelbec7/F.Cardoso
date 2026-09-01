import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a F. Cardoso Automóveis trata os dados pessoais dos visitantes e clientes.",
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Privacidade</span>
      <h1 className="mt-2 text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight text-balance">
        Política de Privacidade
      </h1>

      <div className="mt-6 max-w-[65ch] space-y-6 text-ink-dim">
        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Responsável pelo tratamento</h2>
          <p className="mt-2">
            Flávio Cardoso — Unipessoal, Lda. (NIPC 516345427), com sede na Rua de Luxemburgo, 7350-006 Elvas, é a
            entidade responsável pelo tratamento dos dados pessoais recolhidos através deste site.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Que dados recolhemos</h2>
          <p className="mt-2">Este site não tem formulários que armazenem dados diretamente. Os únicos dados pessoais envolvidos são:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <strong className="text-ink">Contacto por WhatsApp ou telefone:</strong> quando nos contacta, a
              conversa (nome, número de telefone e o que decidir partilhar) fica guardada na aplicação de mensagens
              utilizada, não no site.
            </li>
            <li>
              <strong className="text-ink">Testemunhos de clientes:</strong> nome e comentário, reproduzidos a
              partir de avaliações públicas (ex.: Facebook) ou fornecidos diretamente pelo cliente.
            </li>
            <li>
              <strong className="text-ink">Fotografias de entrega:</strong> fotos de clientes com o automóvel
              adquirido, publicadas apenas com o conhecimento e consentimento do próprio cliente.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Finalidade</h2>
          <p className="mt-2">
            Os dados acima são usados apenas para apresentar o stock e os serviços da F. Cardoso Automóveis,
            responder a pedidos de contacto e mostrar prova social real (testemunhos e entregas) a outros
            visitantes. Não usamos estes dados para fins de marketing direto nem os vendemos ou cedemos a
            terceiros.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Alojamento e subcontratantes</h2>
          <p className="mt-2">
            O site está alojado na Cloudflare, Inc., que pode processar dados técnicos (como o endereço IP) para
            garantir a segurança e o funcionamento do site. O botão de WhatsApp encaminha para a aplicação
            WhatsApp/Meta, sujeita à sua própria política de privacidade. A página de Contactos incorpora um mapa
            do Google Maps, que pode gerar cookies próprios da Google — ver a nossa{" "}
            <a href="/cookies" className="font-semibold text-brand-bright hover:underline">Política de Cookies</a>.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Os seus direitos</h2>
          <p className="mt-2">
            Pode a qualquer momento pedir para aceder, corrigir ou remover dados seus que apareçam no site (por
            exemplo, um testemunho ou uma foto de entrega) — basta contactar-nos por telefone ou WhatsApp através
            do número +351 969 547 461.
          </p>
        </section>
      </div>
    </main>
  );
}
