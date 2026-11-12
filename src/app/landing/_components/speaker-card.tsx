import Image from "next/image";

import { cn } from "@/lib/cn";

export type Speaker = {
  kind: "image" | "named" | "soon";
  name: string;
  role: string;
  company: string;
  session: string;
  photo?: string;
};

/**
 * Speaker card in the main UnConference site's style: a 597:776 beige card
 * with the name top-left and a black and white photo at the bottom.
 * - "image": the main site's own card image, used as is (text is baked in).
 * - "named": confirmed but no card yet, drawn to match with a big monogram.
 * - "soon": "Announcing soon" placeholder.
 * Sizes use container query units so type scales with the card.
 */
export function SpeakerCard({ speaker, soonLabel }: { speaker: Speaker; soonLabel: string }) {
  if (speaker.kind === "image" && speaker.photo) {
    return (
      <figure className="relative overflow-hidden rounded-card bg-cream-card">
        <Image
          src={speaker.photo}
          alt={`${speaker.name}, ${speaker.role}, ${speaker.company}`}
          width={597}
          height={776}
          sizes="(min-width: 1024px) 290px, 45vw"
          className="block h-auto w-full"
        />
        <figcaption className="sr-only">{speaker.session}</figcaption>
      </figure>
    );
  }

  const named = speaker.kind === "named";

  return (
    <article
      className="@container relative aspect-[597/776] overflow-hidden rounded-card bg-cream-card text-cream-ink"
    >
      <div className="absolute inset-x-0 top-0 px-[5.5cqw] pt-[5.5cqw]">
        {named ? (
          <>
            <h3 className="font-sans text-[8.2cqw] leading-[1.1] font-medium tracking-[-0.02em]">{speaker.name}</h3>
            <p className="mt-[1.4cqw] text-[max(12px,6.2cqw)] leading-tight text-cream-muted">{speaker.company}</p>
            <p className="mt-[3.6cqw] text-[max(11px,4.6cqw)] leading-snug font-semibold text-cream-ink/85">{speaker.session}</p>
          </>
        ) : (
          <>
            <h3 className="font-sans text-[8.2cqw] leading-[1.1] font-medium tracking-[-0.02em] text-cream-ink/70">{soonLabel}</h3>
            <p className="mt-[1.4cqw] text-[max(11px,5.4cqw)] leading-tight text-cream-muted">{speaker.session}</p>
          </>
        )}
      </div>

      {/* Where the photo sits on the main site's cards */}
      <div aria-hidden="true" className="absolute inset-x-[14%] bottom-0 h-[56%] rounded-t-[999px] overflow-hidden">
        <div className="flex size-full items-center justify-center bg-cream-ink/[0.07]">
          <span className="font-serif text-[30cqw] leading-none font-bold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgba(22,34,32,0.35)]">
            ?
          </span>
        </div>
      </div>

      {/* Corner triangle, like the main site's cards */}
      <span
        aria-hidden="true"
        className={cn("absolute bottom-0 left-0 size-[13%] [clip-path:polygon(0_0,0_100%,100%_100%)]", named ? "bg-deep" : "bg-deep/40")}
      />
    </article>
  );
}
