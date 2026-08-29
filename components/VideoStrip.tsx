export function VideoStrip({ src, poster }: { src?: string; poster?: string }) {
  if (!src) return null;

  return (
    <section className="relative mx-[calc(50%-50vw)] h-[40vh] overflow-hidden bg-midnight md:h-[52vh]">
      <video
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/15" />
    </section>
  );
}
