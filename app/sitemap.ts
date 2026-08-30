import type { MetadataRoute } from "next";
import { cars } from "@/lib/cars";

export const dynamic = "force-static";

const SITE_URL = "https://f-cardoso.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/carros",
    "/retomas",
    "/vender-carro",
    "/financiamento",
    "/sobre",
    "/contactos",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const carRoutes = cars.map((car) => ({
    url: `${SITE_URL}/carros/${car.slug}`,
    lastModified: car.criadoEm ? new Date(car.criadoEm) : new Date(),
  }));

  return [...staticRoutes, ...carRoutes];
}
