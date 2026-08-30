import Image from "next/image";
import type { Entrega } from "@/lib/entregas";

export function EntregasGrid({ entregas }: { entregas: Entrega[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {entregas.map((e) => (
        <div key={e.slug} className="relative aspect-[4/5] overflow-hidden rounded-card border border-line bg-surface-2">
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
  );
}
