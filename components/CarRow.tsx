import type { Car } from "@/lib/cars";
import { CarCard } from "./CarCard";

export function CarRow({ cars }: { cars: Car[] }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
      {cars.map((car) => (
        <div key={car.slug} className="w-[268px] shrink-0 snap-start">
          <CarCard car={car} />
        </div>
      ))}
    </div>
  );
}
