"use client";

import { useState } from "react";
import type { Car } from "@/lib/car-utils";
import type { Entrega } from "@/lib/entregas";
import { CarRow } from "./CarRow";
import { EntregasGrid } from "./EntregasGrid";

export function SoldAndDeliveries({ sold, entregas }: { sold: Car[]; entregas: Entrega[] }) {
  const hasSold = sold.length > 0;
  const hasEntregas = entregas.length > 0;
  const showTabs = hasSold && hasEntregas;
  const [tab, setTab] = useState<"vendidos" | "entregas">("vendidos");
  const activeTab = showTabs ? tab : hasSold ? "vendidos" : "entregas";

  if (!hasSold && !hasEntregas) return null;

  return (
    <div>
      {showTabs && (
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab("vendidos")}
            className={`rounded-full border px-4 py-2 text-[0.8rem] font-bold transition ${
              activeTab === "vendidos" ? "border-ink bg-ink text-canvas" : "border-line text-ink-dim hover:border-ink-dim"
            }`}
          >
            Recentemente vendidos
          </button>
          <button
            onClick={() => setTab("entregas")}
            className={`rounded-full border px-4 py-2 text-[0.8rem] font-bold transition ${
              activeTab === "entregas" ? "border-ink bg-ink text-canvas" : "border-line text-ink-dim hover:border-ink-dim"
            }`}
          >
            Fotos de entrega
          </button>
        </div>
      )}
      {activeTab === "vendidos" ? <CarRow cars={sold} /> : <EntregasGrid entregas={entregas} />}
    </div>
  );
}
