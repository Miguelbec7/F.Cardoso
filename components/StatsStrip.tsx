import type { SiteSettings } from "@/lib/settings";

export function StatsStrip({ stats }: { stats: SiteSettings["stats"] }) {
  const items = [
    { value: stats.viaturasVendidas, label: "Viaturas vendidas" },
    { value: stats.clientesSatisfeitos, label: "Clientes satisfeitos" },
    { value: stats.anosExperiencia, label: "Anos de experiência" },
  ];

  return (
    <section
      aria-label="Estatísticas"
      className="grid grid-cols-3 gap-px overflow-hidden rounded-card border border-line bg-line"
    >
      {items.map((stat) => (
        <div key={stat.label} className="bg-surface px-4 py-5 text-center">
          <div className="tabular text-[clamp(1.4rem,5vw,2.1rem)] font-extrabold text-brand">{stat.value}</div>
          <div className="mt-1 text-[0.72rem] tracking-wide text-muted uppercase">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
