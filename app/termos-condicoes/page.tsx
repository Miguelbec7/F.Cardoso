import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Termos de utilização do site F. Cardoso Automóveis.",
};

export default function TermosCondicoesPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <span className="text-[0.72rem] font-bold tracking-[0.16em] text-brand-bright uppercase">Termos e Condições</span>
      <h1 className="mt-2 text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold tracking-tight text-balance">
        Termos e Condições
      </h1>

      <div className="mt-6 max-w-[65ch] space-y-6 text-ink-dim">
        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Utilização do site</h2>
          <p className="mt-2">
            Este site pertence à Flávio Cardoso — Unipessoal, Lda. (NIPC 516345427) e destina-se a apresentar o
            stock de automóveis usados, os serviços de retoma e financiamento, e a facilitar o contacto com a F.
            Cardoso Automóveis. Não é feita nenhuma venda ou pagamento diretamente através do site.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Informação sobre os automóveis</h2>
          <p className="mt-2">
            As características de cada automóvel (equipamento, quilometragem, ano, estado) são inseridas com o
            maior rigor possível, mas podem conter imprecisões pontuais. Os preços apresentados são válidos à data
            de publicação, podem ser alterados sem aviso prévio e podem não incluir custos adicionais (ex.:
            transferência de propriedade). Recomenda-se sempre a confirmação de todos os dados junto da equipa
            antes de qualquer decisão de compra.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Simulador de financiamento</h2>
          <p className="mt-2">
            Os valores apresentados no simulador de financiamento são meramente indicativos, calculados com taxas
            de referência que variam consoante o prazo escolhido. Não constituem uma proposta de financiamento nem
            uma garantia de aprovação — a mensalidade final depende sempre da instituição financeira e do perfil
            de crédito de cada cliente.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Propriedade intelectual</h2>
          <p className="mt-2">
            Todo o conteúdo do site (textos, fotografias, vídeos, logótipo e design) é propriedade da F. Cardoso
            Automóveis ou é usado com autorização, não podendo ser copiado ou reutilizado sem permissão prévia.
          </p>
        </section>

        <section>
          <h2 className="text-[1.05rem] font-extrabold text-ink">Alterações</h2>
          <p className="mt-2">
            Estes termos podem ser atualizados a qualquer momento, sem aviso prévio. A versão em vigor é sempre a
            publicada nesta página.
          </p>
        </section>
      </div>
    </main>
  );
}
