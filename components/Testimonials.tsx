const testimonials = [
  {
    initials: "JS",
    name: "João Silva",
    meta: "BMW Série 3 · Jul 2026",
    text: "Processo transparente do início ao fim. Recebi o carro exatamente como foi descrito, sem surpresas.",
  },
  {
    initials: "MR",
    name: "Marta Rocha",
    meta: "Retoma · Jun 2026",
    text: "Venderam o meu carro em poucos dias e ajudaram-me a encontrar o próximo. Atendimento excelente.",
  },
  {
    initials: "PC",
    name: "Pedro Costa",
    meta: "Audi Q5 · Mai 2026",
    text: "Equipa disponível até no WhatsApp fora de horas. Senti confiança em todo o processo de compra.",
  },
];

export function Testimonials() {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
      {testimonials.map((t) => (
        <article key={t.name} className="w-[min(340px,84vw)] shrink-0 snap-start rounded-card border border-line bg-surface p-5">
          <div className="tracking-[2px] text-gold">★★★★★</div>
          <p className="my-3 text-[0.92rem] text-ink-dim">&ldquo;{t.text}&rdquo;</p>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-brand-bright to-brand text-[0.8rem] font-extrabold text-white">
              {t.initials}
            </div>
            <div>
              <div className="text-[0.85rem] font-bold">{t.name}</div>
              <div className="text-[0.72rem] text-muted">{t.meta}</div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
