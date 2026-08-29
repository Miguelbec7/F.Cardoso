import type { Equipamento } from "@/lib/car-utils";
import { EQUIPAMENTO_LABELS } from "@/lib/car-utils";

const ORDER: (keyof Equipamento)[] = [
  "seguranca",
  "multimedia",
  "geral",
  "bancos",
  "farois",
  "exterior",
  "volante",
  "retrovisores",
  "vidros",
  "outros",
];

export function EquipmentList({ equipamento }: { equipamento: Equipamento }) {
  const categories = ORDER.filter((key) => equipamento[key]?.length);
  if (categories.length === 0) return null;

  return (
    <div className="space-y-7">
      {categories.map((key) => (
        <div key={key}>
          <h3 className="mb-3 text-[0.95rem] font-extrabold tracking-tight">{EQUIPAMENTO_LABELS[key]}</h3>
          <div className="flex flex-wrap gap-2">
            {equipamento[key]!.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-canvas-soft px-3.5 py-1.5 text-[0.82rem] text-ink-dim"
              >
                <span className="mr-1.5 text-[#1a9c5b]">✓</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
