import { getTestimonials } from "@/lib/testimonials";
import { getSiteSettings } from "@/lib/settings";
import { GoogleGIcon } from "./icons";

const avatarPalette = ["#17265c", "#2a4bb0", "#33363d", "#5a6270", "#0f9d58"];

function Stars({ count }: { count: number }) {
  return (
    <div className="text-star tracking-[2px]" aria-label={`${count} de 5 estrelas`}>
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </div>
  );
}

export function Testimonials() {
  const testimonials = getTestimonials();
  const { googleReviews } = getSiteSettings();

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2.5 text-[0.95rem]">
        <GoogleGIcon className="h-5 w-5" />
        <span>
          Avaliação de <strong className="tabular">{googleReviews.media.toFixed(1)}</strong>
        </span>
        <span className="text-star">★</span>
        <span className="text-ink-dim">
          com base em <strong className="tabular text-ink">{googleReviews.total}</strong> reviews
        </span>
      </div>

      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {testimonials.map((t, i) => (
          <article
            key={t.slug}
            className="relative w-[min(320px,84vw)] shrink-0 snap-start rounded-card border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(20,24,34,0.04)]"
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold text-white"
                style={{ backgroundColor: avatarPalette[i % avatarPalette.length] }}
              >
                {t.nome.charAt(0)}
              </div>
              <div>
                <div className="text-[0.88rem] font-bold">{t.nome}</div>
                <div className="text-[0.72rem] text-muted">
                  {new Date(t.data).toLocaleDateString("pt-PT", { year: "numeric", month: "short", day: "numeric" })}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Stars count={t.estrelas} />
            </div>
            <p className="mt-2.5 text-[0.9rem] text-ink-dim">{t.texto}</p>
            <div className="mt-3 text-[0.76rem] font-semibold text-muted">{t.carro}</div>
            <GoogleGIcon className="absolute right-4 bottom-4 h-4 w-4" />
          </article>
        ))}
      </div>
    </div>
  );
}
