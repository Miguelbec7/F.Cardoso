import Link from "next/link";

export function SectionHead({
  eyebrow,
  title,
  linkHref,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  linkHref?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="text-[0.72rem] font-bold tracking-[0.16em] text-gold uppercase">{eyebrow}</span>
        <h2 className="mt-2 text-[clamp(1.5rem,4vw,2rem)] font-extrabold tracking-tight text-balance">{title}</h2>
      </div>
      {linkHref && linkLabel && (
        <Link href={linkHref} className="text-[0.82rem] font-bold whitespace-nowrap text-brand-bright">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
