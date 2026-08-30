import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Entrega = {
  slug: string;
  foto: string;
  cliente?: string;
  carro?: string;
  legenda?: string;
  data: string;
};

const ENTREGAS_DIR = path.join(process.cwd(), "content", "entregas");

export function getEntregas(): Entrega[] {
  if (!fs.existsSync(ENTREGAS_DIR)) return [];
  return fs
    .readdirSync(ENTREGAS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(ENTREGAS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        foto: data.foto,
        cliente: data.cliente || undefined,
        carro: data.carro || undefined,
        legenda: data.legenda || undefined,
        data: String(data.data),
      } satisfies Entrega;
    })
    .sort((a, b) => +new Date(b.data) - +new Date(a.data));
}
