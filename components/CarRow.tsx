"use client";

import { useEffect, useRef, useState } from "react";
import type { Car } from "@/lib/car-utils";
import { CarCard } from "./CarCard";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export function CarRow({ cars }: { cars: Car[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth;
    // Ignora diferenças de poucos pixels (arredondamento de layout) — só conta como
    // "há mais para ver" quando sobra pelo menos uma fração visível de outro cartão.
    setHasOverflow(overflow > 24);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= overflow - 4);
  };

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    const onResize = () => updateEdges();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars]);

  const scroll = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 290, behavior: "smooth" });
    setTimeout(updateEdges, 350);
  };

  const showArrows = hasOverflow && (!atStart || !atEnd);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        onScroll={updateEdges}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4"
      >
        {cars.map((car) => (
          <div key={car.slug} className="w-[268px] shrink-0 snap-start">
            <CarCard car={car} />
          </div>
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
  );
}
