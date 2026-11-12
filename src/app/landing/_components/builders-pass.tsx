import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

import { LumaPassButton } from "./luma-pass-button";

/**
 * "Builder's Pass": the one pass for Day 2, drawn like the main
 * UnConference '26 pass tickets (#passes on the main site): a crimson
 * ticket with punched edges, a darker stub carrying the struck-out and
 * current price, then the perks list with the headline perks in colour and
 * the notched request button. Copy lives in content.ts (`pass`).
 */

export type PassCopy = {
  eyebrow: string;
  title: string;
  body?: string;
  name: readonly [string, string];
  meta: string;
  stubTag: string;
  was: string;
  price: string;
  priceNote: string;
  perks: readonly { text: string; strong?: boolean }[];
  cta: string;
  /** Luma event id; the button opens Luma's checkout overlay. */
  lumaEventId: string;
};

function Ticket({ copy, className }: { copy: PassCopy; className?: string }) {
  // Punched-out bits: scallops down the left edge, the big half-moon on the
  // left, the perforation and hole between body and stub.
  const leftDots = [52, 92, 132, 248, 288, 328];
  const perf = [40, 78, 116, 264, 302, 340];
  return (
    <svg
      viewBox="0 0 860 380"
      role="img"
      aria-label={`${copy.name.join(" ")}, ${copy.price}, was ${copy.was}`}
      className={cn("block h-auto w-full [filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.35))]", className)}
    >
      <defs>
        <mask id="pass-cut">
          <rect x="0" y="0" width="860" height="380" fill="#fff" />
          {leftDots.map((y) => (
            <circle key={`l${y}`} cx="20" cy={y} r="10" fill="#000" />
          ))}
          <circle cx="20" cy="190" r="44" fill="#000" />
          {perf.map((y) => (
            <circle key={`p${y}`} cx="560" cy={y} r="10" fill="#000" />
          ))}
          <circle cx="560" cy="190" r="52" fill="#000" />
        </mask>
      </defs>
      <g mask="url(#pass-cut)">
        <rect x="20" y="20" width="540" height="340" fill="#bd2d53" />
        <rect x="560" y="20" width="280" height="340" fill="#6e1733" />
      </g>

      {/* Body: pass name and the day */}
      <text x="88" y="118" fontFamily="var(--font-serif), serif" fontWeight="700" fontSize="66" letterSpacing="-1.5" fill="#fdfdf5">
        {copy.name[0]}
      </text>
      <text x="88" y="190" fontFamily="var(--font-serif), serif" fontWeight="700" fontSize="66" letterSpacing="-1.5" fill="#fdfdf5">
        {copy.name[1]}
      </text>
      <text x="90" y="318" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="21" letterSpacing="1.5" fill="#fbd3dd">
        {copy.meta}
      </text>

      {/* Stub: tag, old price struck, new price */}
      <text x="812" y="74" textAnchor="end" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="22" letterSpacing="2" fill="#f3a6bb">
        {copy.stubTag}
      </text>
      <text x="812" y="252" textAnchor="end" fontFamily="var(--font-sans), sans-serif" fontSize="30" fill="#f3a6bb">
        {copy.was}
      </text>
      {/* Strike line drawn by hand: SVG text-decoration isn't reliable across browsers. */}
      <line x1="728" y1="242" x2="814" y2="242" stroke="#f3a6bb" strokeWidth="2.5" />
      <text x="814" y="326" textAnchor="end" fontFamily="var(--font-sans), sans-serif" fontWeight="500" fontSize="86" letterSpacing="-3" fill="#f7a1bb">
        {copy.price}
      </text>
    </svg>
  );
}

export function BuildersPass({ copy }: { copy: PassCopy }) {
  return (
    <section id="pass" aria-labelledby="pass-title" className="relative scroll-mt-20 overflow-hidden border-b border-rule">
      {/* Crimson bloom behind the ticket */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[-10%] h-[640px] w-[900px] max-w-[160vw] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(189,45,83,0.32),transparent)] blur-2xl"
      />
      <div className="frame relative py-16 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-muted">{copy.eyebrow}</p>
          <h2 id="pass-title" className="mt-4 font-serif text-[clamp(40px,6vw,72px)] leading-[0.98] font-bold tracking-[-0.03em] text-ink">
            {copy.title}
          </h2>
          {copy.body ? <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-ink/80 md:text-[19px]">{copy.body}</p> : null}
        </Reveal>

        <div className="mt-10 grid items-center gap-10 md:mt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal y={28}>
            <div className="transition-transform duration-500 ease-soft hover:rotate-0 lg:rotate-[-2deg]">
              <Ticket copy={copy} />
            </div>
            <p className="mt-4 text-[14px] text-muted">{copy.priceNote}</p>
          </Reveal>

          <div>
            <RevealGroup as="ul" stagger={0.05} className="flex flex-col">
              {copy.perks.map((p) => (
                <RevealItem
                  as="li"
                  key={p.text}
                  y={8}
                  className="flex gap-3 border-b border-ink/10 py-3 text-[17px] leading-snug last:border-b-0 md:text-[18px]"
                >
                  <span aria-hidden="true" className="mt-[0.45em] inline-block size-2 shrink-0 rotate-45 bg-crimson" />
                  <span className={p.strong ? "font-bold text-gold" : "text-ink/80"}>{p.text}</span>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.1} className="mt-8">
              <LumaPassButton eventId={copy.lumaEventId} className="w-full sm:w-auto">
                {copy.cta}
              </LumaPassButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
