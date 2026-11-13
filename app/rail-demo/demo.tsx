"use client";

import ClothingRailHero from "@/components/ui/product-rail-gallery";
import type { RailGarment } from "@/components/ui/product-rail-gallery";

export const RAIL_ITEMS: RailGarment[] = [
  { id: "tshirt", name: "T-shirt clássica", kind: "tee", color: "#EFEBE2", tag: "11,90 €", description: "Algodão 190 g, com o teu desenho, nome ou fotografia.", details: ["Algodão 190 g", "Pequeno · Médio · Grande"] },
  { id: "oversize", name: "T-shirt oversize", kind: "tee", color: "#DE9C31", tag: "19,90 €", description: "Corte largo e ombro descaído.", details: ["Oversize", "Desde 19,90 €"] },
  { id: "manga", name: "Manga comprida", kind: "knit", color: "#B05139", tag: "14,90 €", description: "Para os dias mais frescos.", details: ["Manga comprida"] },
  { id: "sweat", name: "Sweat sem capuz", kind: "knit", color: "#CCB2E0", tag: "24,90 €", description: "Ideal para equipas, escolas e festas.", details: ["Preço de grupo a partir de 10"] },
  { id: "capuz", name: "Sweat com capuz", kind: "hoodie", color: "#A0A5AB", tag: "29,90 €", description: "A favorita para o Natal e para o Pack Família.", details: ["Com capuz", "Desde 29,90 €"] },
  { id: "camisa", name: "Camisa de educadora", kind: "shirt", color: "#A3D3EB", tag: "sob consulta", description: "Fala connosco para saber o que é possível.", details: ["Sob consulta"] },
];

export default function RailDemo() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background text-foreground">
      <ClothingRailHero
        items={RAIL_ITEMS}
        hanger="wood"
        autoplay
        eyebrow="Feito em Família · Elvas"
        heading="Escolhe a peça. Nós tratamos do desenho."
        caption="Passa o rato pelo cabide, arrasta uma peça ou toca para ver as costas."
        labels={{ front: "Frente", back: "Costas", close: "Fechar", show: "Ver" }}
        action={
          <a href="#" className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm outline-none transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none">
            Pedir orçamento
          </a>
        }
      />
    </div>
  );
}
