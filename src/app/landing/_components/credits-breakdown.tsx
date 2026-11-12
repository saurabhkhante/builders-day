import Image from "next/image";

import { LiveDot } from "@/components/motion/live-dot";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/**
 * "Where the credits come from": the partner credits grouped by pass tier,
 * sitting under the big credits number in the cream Prizes section. Cards use
 * the same beige tile and asymmetric corner (0 0 20px 0) as "Backed by the
 * best", so the two cream sections read as one system. Copy and amounts live
 * in content.ts (`credits`).
 */

export type CreditItem = {
  name: string;
  logo: string; // file in public/brand/partners/
  w: number;
  h: number;
  /** Logo height in px. Compact or heavy marks get less, thin wordmarks more. */
  size?: number;
  amount?: string; // omitted = amount not confirmed yet
  note?: string;
};

export type CreditTier = { key: string; label: string; who: string; items: readonly CreditItem[] };

/** Pass colours, same family as the format cards: gold = every pass, teal = Reserve, crimson = Buildathon. */
const ACCENT: Record<string, string> = { every: "bg-gold", reserve: "bg-teal", build: "bg-crimson" };

/**
 * A cloth draped over an amount that isn't confirmed yet: dark fabric with
 * soft folds, a slight sag at the hem and the same shimmer as the locked
 * problem cards. On hover it lifts at one corner and you glimpse a blurred
 * figure underneath. Swap in `amount` in content.ts and the cloth is gone.
 */
function Veil({ label }: { label: string }) {
  return (
    <div className="relative h-[40px] w-full max-w-[220px] md:h-[44px]">
      {/* What's "under the cloth": a blurred figure, only seen when the cloth lifts. */}
      <span aria-hidden="true" className="absolute inset-0 flex items-center pl-1 font-serif text-[30px] leading-none font-bold text-cream-ink/70 blur-[4px] select-none md:text-[34px]">
        $•••
      </span>
      <span
        className="absolute inset-0 origin-bottom-right overflow-hidden rounded-[5px_5px_16px_16px/5px_5px_9px_9px] bg-cream-ink shadow-[0_8px_16px_-6px_rgba(22,34,32,0.45)] transition-transform duration-500 ease-soft group-hover/card:rotate-[4deg] motion-reduce:transition-none"
      >
        {/* Folds */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[repeating-linear-gradient(98deg,rgba(234,230,218,0.07)_0_5px,transparent_5px_17px,rgba(0,0,0,0.18)_17px_21px,transparent_21px_30px)]"
        />
        {/* Light catching the fabric */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(234,230,218,0.18)] to-transparent motion-safe:animate-[shimmer_2.8s_var(--ease-out-soft)_infinite] motion-reduce:hidden"
        />
        <span className="eyebrow relative flex h-full items-center gap-2 px-3.5 text-[11px] text-cream md:text-[12px]">
          <LiveDot tone="gold" />
          {label}
        </span>
      </span>
    </div>
  );
}

function CreditCard({ item, soonLabel }: { item: CreditItem; soonLabel: string }) {
  const src = `/brand/partners/${item.logo}`;
  return (
    <div className="group/card flex h-full flex-col gap-5 rounded-[0_0_20px_0] bg-cream-card p-5 md:p-6">
      <div className="flex h-9 items-center">
        <Image
          src={src}
          alt={item.name}
          width={item.w}
          height={item.h}
          unoptimized={src.endsWith(".svg")}
          draggable={false}
          className="block w-auto max-w-[78%] object-contain object-left select-none"
          style={{ height: item.size ?? 26 }}
        />
      </div>
      <div className="mt-auto">
        {item.amount ? (
          <p className="font-serif text-[30px] leading-none font-bold tracking-[-0.02em] text-cream-ink md:text-[34px]">
            {item.amount}
          </p>
        ) : (
          <Veil label={soonLabel} />
        )}
        {item.note ? <p className="mt-2 text-[14px] leading-snug text-cream-muted md:text-[15px]">{item.note}</p> : null}
      </div>
    </div>
  );
}

function Tier({ tier, soonLabel, cols, className }: { tier: CreditTier; soonLabel: string; cols: string; className?: string }) {
  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-cream-ink/20 pb-3">
        <h4 className="flex items-center gap-2.5 font-serif text-[22px] leading-tight font-bold text-cream-ink md:text-[24px]">
          <span aria-hidden="true" className={cn("inline-block size-3 rounded-[3px] ring-1 ring-cream-ink/15", ACCENT[tier.key])} />
          {tier.label}
        </h4>
        <p className="eyebrow text-cream-muted">{tier.who}</p>
      </div>
      <RevealGroup as="ul" stagger={0.05} className={cn("grid gap-2.5 md:gap-3", cols)}>
        {tier.items.map((item) => (
          <RevealItem as="li" key={item.name} y={10}>
            <CreditCard item={item} soonLabel={soonLabel} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export function CreditsBreakdown({
  copy,
}: {
  copy: { eyebrow: string; title: string; body: string; soonLabel: string; footnote: string; tiers: readonly CreditTier[] };
}) {
  const [every, reserve, build] = copy.tiers;
  return (
    <div id="credits" className="mt-16 scroll-mt-20 border-t border-cream-ink/20 pt-12 md:mt-24 md:pt-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-cream-muted">{copy.eyebrow}</p>
        <h3 className="mt-3 font-serif text-[clamp(34px,5vw,56px)] leading-[1] font-bold tracking-[-0.02em] text-cream-ink">
          {copy.title}
        </h3>
        <p className="mt-4 text-[17px] leading-relaxed text-cream-muted">{copy.body}</p>
      </Reveal>

      {/* Phone: Every, Reserve, Buildathon in reading order. Desktop: Every and Buildathon stacked left, Reserve on the right. */}
      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-8">
        <Tier tier={every} soonLabel={copy.soonLabel} cols="grid-cols-1" className="md:col-span-5 md:row-start-1" />
        <Tier
          tier={reserve}
          soonLabel={copy.soonLabel}
          cols="grid-cols-2"
          className="md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1"
        />
        <Tier tier={build} soonLabel={copy.soonLabel} cols="grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2" className="md:col-span-5 md:row-start-2" />
      </div>

      <Reveal>
        <p className="mt-8 text-[14px] leading-relaxed text-cream-muted">{copy.footnote}</p>
      </Reveal>
    </div>
  );
}
