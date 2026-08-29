import Image from "next/image";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt="F. Cardoso Automóveis"
      width={427}
      height={233}
      className={className}
      priority
    />
  );
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
    <Image
      src="/brand/logo-lockup.png"
      alt="F. Cardoso Automóveis"
      width={756}
      height={457}
      className={className}
      priority
    />
  );
}
