import Link from "next/link";

export function BrandStrip({ brands }: { brands: string[] }) {
  return (
    <div className="relative z-10 -mt-8 md:-mt-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="no-scrollbar flex gap-3 overflow-x-auto rounded-card border border-line bg-surface p-3 shadow-[0_8px_24px_rgba(20,24,34,0.08)]">
          <Link
            href="/carros"
            className="flex shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-brand px-5 py-3 text-center text-white"
          >
            <span className="text-[0.68rem] font-extrabold tracking-wide uppercase">Ver stock</span>
            <span className="text-[0.68rem] font-extrabold tracking-wide uppercase">todo</span>
          </Link>
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/carros?marca=${encodeURIComponent(brand)}`}
              className="flex shrink-0 items-center justify-center rounded-xl border border-line bg-canvas-soft px-5 py-3 text-[0.8rem] font-bold text-ink-dim transition hover:border-brand-bright hover:text-brand"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
