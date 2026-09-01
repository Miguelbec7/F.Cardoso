import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: "Identificação da empresa responsável pelo site F. Cardoso Automóveis.",
};

export default function AvisoLegalPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Aviso Legal</span>
      <h1 className="mt-2 text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight text-balance">
        Aviso Legal
      </h1>

      <div className="mt-6 max-w-[65ch] space-y-6 text-ink-dim">
        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Identificação da empresa</h2>
          <p className="mt-2">
            Este site é propriedade e é gerido por:
          </p>
          <ul className="mt-2 space-y-1">
            <li><strong className="text-ink">Denominação social:</strong> Flávio Cardoso — Unipessoal, Lda.</li>
            <li><strong className="text-ink">Nome comercial:</strong> F. Cardoso Automóveis</li>
            <li><strong className="text-ink">NIPC:</strong> 516345427</li>
            <li><strong className="text-ink">Sede:</strong> Rua de Luxemburgo, 7350-006 Elvas, Portugal</li>
            <li><strong className="text-ink">Contacto:</strong> +351 969 547 461 (telefone e WhatsApp)</li>
            <li><strong className="text-ink">Atividade:</strong> Compra, venda e intermediação de automóveis usados</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Objeto do site</h2>
          <p className="mt-2">
            Este site tem carácter informativo: apresenta o stock de viaturas disponíveis, os serviços prestados
            (retomas, financiamento e venda de automóveis) e os meios de contacto com a F. Cardoso Automóveis. Não
            se realizam vendas nem pagamentos diretamente através do site — todo o processo comercial é feito por
            contacto direto (WhatsApp, telefone ou visita presencial ao stand em Elvas).
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Propriedade intelectual</h2>
          <p className="mt-2">
            Os conteúdos deste site — textos, fotografias, vídeos, logótipo e design — são propriedade da F.
            Cardoso Automóveis ou dos seus clientes (no caso de fotografias de entrega partilhadas com autorização),
            não podendo ser copiados ou reproduzidos sem autorização prévia.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Exatidão da informação</h2>
          <p className="mt-2">
            Fazemos o possível para manter a informação sobre cada automóvel (equipamento, quilometragem, ano,
            preço) atualizada e correta. Ainda assim, podem ocorrer lapsos ou desatualizações pontuais — recomenda-se
            a confirmação de todos os dados junto da equipa antes de qualquer decisão de compra.
          </p>
        </section>
      </div>
    </main>
  );
}
