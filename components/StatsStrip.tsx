const stats = [
  { value: "500+", label: "Viaturas vendidas" },
  { value: "98%", label: "Clientes satisfeitos" },
  { value: "15", label: "Anos de experiência" },
];

export function StatsStrip() {
  return (
    <section
      aria-label="Estatísticas"
      className="grid grid-cols-3 gap-px overflow-hidden rounded-card border border-line bg-line"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface px-4 py-5 text-center">
          <div className="tabular text-[clamp(1.4rem,5vw,2.1rem)] font-extrabold text-gold">{stat.value}</div>
          <div className="mt-1 text-[0.72rem] tracking-wide text-muted uppercase">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
