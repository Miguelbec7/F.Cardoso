import fs from "node:fs";
import path from "node:path";

export type SiteSettings = {
  whatsappNumber: string;
  telefone: string;
  heroVideo?: string;
  heroVideoPoster?: string;
  videoStrip?: string;
  videoStripPoster?: string;
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
  redesSociais?: {
    facebook?: string;
    instagram?: string;
  };
  financiamento?: {
    taxaTAN: number;
    prazoMaximoMeses: number;
  };
};

export function getSiteSettings(): SiteSettings {
  const file = path.join(process.cwd(), "content", "settings", "site.json");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
