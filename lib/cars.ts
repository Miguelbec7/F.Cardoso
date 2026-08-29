import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Car } from "./car-utils";

export type { FuelType, Transmission, BodyType, CarStatus, Car } from "./car-utils";
export { formatPrice, formatKm, whatsappLink, carInterestMessage, isCarNew } from "./car-utils";

const CARS_DIR = path.join(process.cwd(), "content", "carros");

function readCars(): Car[] {
  const files = fs.readdirSync(CARS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CARS_DIR, file), "utf8");
    const { data } = matter(raw);
    const slug = file.replace(/\.md$/, "");
    return {
      slug,
      marca: data.marca,
      modelo: data.modelo,
      versao: data.versao,
      ano: data.ano,
      km: data.km,
      combustivel: data.combustivel,
      caixa: data.caixa,
      carroceria: data.carroceria,
      cilindrada: String(data.cilindrada),
      potencia: data.potencia,
      cor: data.cor,
      preco: data.preco,
      precoAnterior: data.precoAnterior || undefined,
      estado: data.estado,
      destaque: !!data.destaque,
      carroDaSemana: !!data.carroDaSemana,
      recemChegado: !!data.recemChegado,
      equipamento: data.equipamento || {},
      descricao: data.descricao || "",
      garantia: data.garantia || "",
      localizacao: data.localizacao || "",
      criadoEm: String(data.criadoEm),
      vendidoEm: data.vendidoEm || undefined,
      fotos: data.fotos || [],
      video: data.video || undefined,
    } satisfies Car;
  });
}

export const cars: Car[] = readCars();

export function getCarBySlug(slug: string) {
  return cars.find((c) => c.slug === slug);
}

export function getAvailableCars() {
  return [...cars]
    .filter((c) => c.estado !== "vendido")
    .sort((a, b) => +new Date(b.criadoEm) - +new Date(a.criadoEm));
}

export function getSoldCars(limit?: number) {
  const sold = [...cars]
    .filter((c) => c.estado === "vendido")
    .sort((a, b) => +new Date(b.vendidoEm || b.criadoEm) - +new Date(a.vendidoEm || a.criadoEm));
  return limit ? sold.slice(0, limit) : sold;
}

export function getFeaturedCars() {
  return cars.filter((c) => c.destaque && c.estado !== "vendido");
}

export function getCarOfTheWeek() {
  return cars.find((c) => c.carroDaSemana);
}

export function getSimilarCars(car: Car, limit = 3) {
  return cars
    .filter(
      (c) =>
        c.slug !== car.slug &&
        c.estado !== "vendido" &&
        (c.marca === car.marca || c.carroceria === car.carroceria)
    )
    .slice(0, limit);
}

export function getBrands() {
  return [...new Set(cars.filter((c) => c.estado !== "vendido").map((c) => c.marca))].sort();
}
