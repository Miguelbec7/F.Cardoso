import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Testimonial = {
  slug: string;
  nome: string;
  estrelas: number;
  carro: string;
  data: string;
  texto: string;
  foto?: string;
  fonte: "google" | "facebook";
};

const DIR = path.join(process.cwd(), "content", "testemunhos");

export function getTestimonials(): Testimonial[] {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        nome: data.nome,
        estrelas: data.estrelas ?? 5,
        carro: data.carro,
        data: String(data.data),
        texto: data.texto,
        foto: data.foto || undefined,
        fonte: data.fonte === "google" ? "google" : "facebook",
      } satisfies Testimonial;
    })
    .sort((a, b) => +new Date(b.data) - +new Date(a.data));
}
