"use client";

import { useEffect, useRef, useState } from "react";
import { getTestimonials } from "@/lib/testimonials";
import { getSiteSettings } from "@/lib/settings";
import { GoogleGIcon, FacebookIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";

const avatarPalette = ["#17265c", "#2a4bb0", "#33363d", "#5a6270", "#0f9d58"];

function Stars({ count }: { count: number }) {
  return (
    <div className="text-star tracking-[2px]" aria-label={`${count} de 5 estrelas`}>
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </div>
  );
}

export function TestimonialsCarousel({
  testimonials,
  redesSociais,
}: {
  testimonials: ReturnType<typeof getTestimonials>;
  redesSociais: ReturnType<typeof getSiteSettings>["redesSociais"];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    setHasOverflow(overflow > 24);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= overflow - 4);
  };

  useEffect(() => {
    updateEdges();
    const onResize = () => updateEdges();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials]);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 336, behavior: "smooth" });
    setTimeout(updateEdges, 350);
  };

  const showArrows = hasOverflow && (!atStart || !atEnd);
  const temGoogle = testimonials.some((t) => t.fonte === "google");
  const temFacebook = testimonials.some((t) => t.fonte === "facebook");

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-2.5 text-[0.95rem] text-ink-dim">
        {temGoogle && <GoogleGIcon className="h-5 w-5" />}
        {temFacebook && <FacebookIcon className="h-4 w-4 text-[#1877F2]" />}
        {redesSociais?.facebook ? (
          <a href={redesSociais.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-ink-dim">
            Avaliações reais dos nossos clientes
          </a>
        ) : (
          <span>Avaliações reais dos nossos clientes</span>
        )}
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={updateEdges}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4"
        >
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
              {t.carro && <div className="mt-3 text-[0.76rem] font-semibold text-muted">{t.carro}</div>}
              {t.fonte === "google" ? (
                <GoogleGIcon className="absolute right-4 bottom-4 h-4 w-4" />
              ) : (
                <FacebookIcon className="absolute right-4 bottom-4 h-4 w-4 text-[#1877F2]" />
              )}
            </article>
          ))}
        </div>

        {showArrows && (
          <>
            {!atStart && (
              <button
                type="button"
                aria-label="Ver anteriores"
                onClick={() => scroll(-1)}
                className="absolute top-1/2 -left-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface shadow-[0_2px_8px_rgba(20,24,34,0.12)] transition hover:border-ink-dim md:flex"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
            )}
            {!atEnd && (
              <button
                type="button"
                aria-label="Ver seguintes"
                onClick={() => scroll(1)}
                className="absolute top-1/2 -right-3 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface shadow-[0_2px_8px_rgba(20,24,34,0.12)] transition hover:border-ink-dim md:flex"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
