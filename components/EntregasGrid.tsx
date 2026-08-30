import Image from "next/image";
import type { Entrega } from "@/lib/entregas";

export function EntregasGrid({ entregas }: { entregas: Entrega[] }) {
  const loop = [...entregas, ...entregas];
  const duration = Math.max(entregas.length * 5, 16);

  return (
    <div className="overflow-hidden">
      <div
        className="marquee-track flex w-max gap-3"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {loop.map((e, i) => (
          <div
            key={`${e.slug}-${i}`}
            className="relative aspect-[4/5] w-[220px] shrink-0 overflow-hidden rounded-card border border-line bg-surface-2 sm:w-[260px]"
          >
            <Image src={e.foto} alt={e.legenda || e.carro || "Entrega ao cliente"} fill className="object-cover" />
            {(e.cliente || e.carro || e.legenda) && (
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-3 pt-8">
                <p className="text-[0.8rem] font-bold text-white">
                  {e.legenda || (e.cliente ? `Entregue a ${e.cliente}` : "Mais um cliente satisfeito")}
                </p>
                {e.carro && !e.legenda && <p className="text-[0.7rem] text-white/75">{e.carro}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
