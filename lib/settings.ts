import fs from "node:fs";
import path from "node:path";

export type SiteSettings = {
  whatsappNumber: string;
  telefone: string;
  stats: {
    viaturasVendidas: string;
    clientesSatisfeitos: string;
    anosExperiencia: string;
  };
  googleReviews: {
    media: number;
    total: number;
  };
  marcas: string[];
};

export function getSiteSettings(): SiteSettings {
  const file = path.join(process.cwd(), "content", "settings", "site.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
