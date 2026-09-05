import Link from "next/link";
import Image from "next/image";

export function BrandStrip({
  brands,
  logosMarcas = [],
}: {
  brands: string[];
  logosMarcas?: { marca: string; logo: string }[];
}) {
  const findLogo = (brand: string) =>
    logosMarcas.find((l) => l.marca.trim().toLowerCase() === brand.trim().toLowerCase())?.logo || undefined;

  const loop = [...brands, ...brands];
  const duration = Math.max(brands.length * 3, 12);

  return (
    <div className="relative z-10 -mt-8 md:-mt-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center gap-3 rounded-card border border-line bg-surface p-3 shadow-[0_8px_24px_rgba(20,24,34,0.08)]">
          <Link
            href="/carros"
            className="flex shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-brand px-5 py-3 text-center text-white"
          >
            <span className="text-[0.68rem] font-extrabold tracking-wide uppercase">Ver stock</span>
            <span className="text-[0.68rem] font-extrabold tracking-wide uppercase">todo</span>
          </Link>
          <div className="overflow-hidden">
            <div
              className="marquee-track flex w-max gap-3"
              style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
            >
              {loop.map((brand, i) => {
                const logo = findLogo(brand);
                return (
                  <Link
                    key={`${brand}-${i}`}
                    href={`/carros?marca=${encodeURIComponent(brand)}`}
                    aria-label={brand}
                    className="flex shrink-0 items-center justify-center rounded-xl border border-line bg-canvas-soft px-6 py-2.5 text-[0.8rem] font-bold text-ink-dim transition hover:border-brand-bright hover:text-brand"
                  >
                    {logo ? (
                      <span className="relative block h-10 w-28">
                        <Image src={logo} alt={brand} fill className="object-contain" />
                      </span>
                    ) : (
                      brand
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
