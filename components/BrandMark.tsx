/**
 * Reconstrução aproximada do logótipo a partir da imagem partilhada — usar apenas
 * como placeholder até o ficheiro real (SVG/PNG transparente) ser fornecido e
 * colocado em /public/brand/logo.svg.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#17265c" />
      <path d="M22 46 L30 18 L46 18 L44 24 L34 24 L32.5 29 L42 29 L40 35 L30.7 35 L27.5 46 Z" fill="#ffffff" />
      <path d="M14 46 L21 22" stroke="#9aa0ac" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 46 L25 22" stroke="#e1e5ec" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return <Mark className={className} />;
}

/** Versão monocromática, sem fundo — para usar como marca de água grande sobre áreas escuras. */
export function BrandWatermark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M22 46 L30 18 L46 18 L44 24 L34 24 L32.5 29 L42 29 L40 35 L30.7 35 L27.5 46 Z" fill="currentColor" />
      <path d="M14 46 L21 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M18 46 L25 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function BrandLockup({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <Mark className="h-10 w-10 shrink-0" />
      <div className="leading-tight">
        <div className="text-lg font-extrabold tracking-tight text-steel-dark">CARDOSO</div>
        <div className="text-[0.62rem] font-bold tracking-[0.2em] text-brand uppercase">Automóveis</div>
      </div>
    </div>
  );
}
