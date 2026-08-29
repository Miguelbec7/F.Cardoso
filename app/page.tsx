import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BrandStrip } from "@/components/BrandStrip";
import { StatsStrip } from "@/components/StatsStrip";
import { SectionHead } from "@/components/SectionHead";
import { CarRow } from "@/components/CarRow";
import { CarOfWeek } from "@/components/CarOfWeek";
import { Testimonials } from "@/components/Testimonials";
import { VideoStrip } from "@/components/VideoStrip";
import { getFeaturedCars, getSoldCars, getCarOfTheWeek, getBrands } from "@/lib/cars";
import { getSiteSettings } from "@/lib/settings";

export default function HomePage() {
  const featured = getFeaturedCars();
  const sold = getSoldCars(8);
  const carOfWeek = getCarOfTheWeek();
  const heroCars = featured.slice(0, 3);
  const brands = getBrands();
  const { whatsappNumber, stats, heroVideo, heroVideoPoster, videoStrip, videoStripPoster } = getSiteSettings();

  return (
    <main>
      <Hero cars={heroCars} whatsappNumber={whatsappNumber} videoSrc={heroVideo} videoPoster={heroVideoPoster} />
      <BrandStrip brands={brands} />

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-14">
        <StatsStrip stats={stats} />

        <section>
          <SectionHead eyebrow="Stock selecionado" title="Em destaque" linkHref="/carros" linkLabel="Ver todos os automóveis" />
          <CarRow cars={featured} />
        </section>

        {carOfWeek && (
          <section>
            <SectionHead eyebrow="Escolha da equipa" title="Carro da semana" />
            <CarOfWeek car={carOfWeek} whatsappNumber={whatsappNumber} />
          </section>
        )}

        <section>
          <SectionHead eyebrow="Prova social" title="Recentemente vendidos" />
          <CarRow cars={sold} />
        </section>

        <VideoStrip src={videoStrip} poster={videoStripPoster} />

        <section>
          <SectionHead eyebrow="Clientes reais. Experiências reais." title="O que dizem os nossos clientes" />
          <Testimonials />
        </section>

        <section
          id="vender"
          className="flex flex-col gap-4 rounded-[20px] bg-linear-to-br from-brand to-[#0c1638] p-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 className="max-w-[20ch] text-2xl font-extrabold tracking-tight text-balance text-white">
              Está a pensar vender o seu carro?
            </h3>
            <p className="mt-2 max-w-[40ch] text-[0.9rem] text-white/75">
              Avaliação rápida, sem compromisso. Envie os dados e fotografias e receba uma proposta em poucas horas.
            </p>
          </div>
          <Link
            href="/vender-carro"
            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-[0.85rem] font-bold whitespace-nowrap text-brand transition hover:bg-canvas-soft"
          >
            Quero receber uma avaliação
          </Link>
        </section>
      </div>
    </main>
  );
}
