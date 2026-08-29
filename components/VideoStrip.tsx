export function VideoStrip({ src, poster }: { src?: string; poster?: string }) {
  if (!src) return null;

  return (
    <section className="relative mx-[calc(50%-50vw)] h-[40vh] overflow-hidden bg-midnight md:h-[52vh]">
      {/* fundo desfocado (imagem estática, leve) — preenche a faixa sem ampliar o vídeo nítido nem duplicar o seu consumo de dados */}
      {poster && (
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center opacity-50 blur-2xl"
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden="true"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />

      {/* vídeo nítido, sempre ao seu tamanho/proporção original, sem recorte */}
      <video
        className="relative h-full w-full object-contain"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
    </section>
  );
}
