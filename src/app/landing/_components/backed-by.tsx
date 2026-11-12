import Image from "next/image";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

/**
 * "Backed by the best", after the main UnConference page: big serif title
 * on the left, labelled groups of beige logo tiles on the right. Full-colour
 * logos (pulled from the main site into public/brand/partners/*-color.*),
 * tiles use the brand's asymmetric corner (0 0 20px 0).
 */
/**
 * Sizing follows the main site's tiles (210x80 with 40px side padding, logos
 * fitted to ~60% of the tile width) but each logo gets its own width so the
 * row reads even: wide wordmarks get more width, compact or heavy marks
 * less. `w` is the logo width as a % of the tile width. Every logo is also
 * capped at ~46% of the tile height so nothing crowds the edges.
 */
type Size = "lead" | "major" | "std";
type Tile = { name: string; src: string; w: number; h: number; pct: number };

const t = (name: string, file: string, w: number, h: number, pct: number): Tile => ({ name, src: `/brand/partners/${file}`, w, h, pct });

/** Tile aspect (width / height) per size. Figma's lead tile is ~1.4x the height of a Powered by tile. */
const ASPECT: Record<Size, number> = { lead: 3.3, major: 300 / 130, std: 210 / 80 };

const PRESENTED: Tile[] = [t("Figma", "figma-color.svg", 120, 44, 24)];
const POWERED: Tile[] = [t("Anthropic", "anthropic-color.svg", 578.9, 65, 56), t("Replit", "replit-color.svg", 1133.2, 321.2, 38)];
// Tiers and order mirror the main 2026 page (theproductfolks.com/product-unconference-2026).
const ASSOCIATE: Tile[] = [
  t("Atlassian", "atlassian-color.svg", 195, 32, 56),
  t("CodeRabbit", "coderabbit-color.svg", 2152, 314, 58),
  t("ElevenLabs", "elevenlabs-color.png", 1988, 257, 56),
  t("Figr", "figr-color.svg", 93, 34, 36),
  t("GoKwik", "gokwik-color.svg", 723, 261, 50),
  t("Intuit", "intuit-color.png", 1064, 337, 34),
  t("Mixpanel", "mixpanel-color.svg", 798, 189, 52),
  t("Plivo", "plivo-color.svg", 66, 24, 30),
  t("Sarvam", "sarvam-color.png", 606, 96, 50),
  t("Stripe", "stripe-color.svg", 468, 222.5, 34),
];
const ECOSYSTEM: Tile[] = [
  t("Bureau", "bureau-color.svg", 160, 33, 48),
  t("Descope", "descope-color.png", 1816, 475, 50),
  t("Divyam.ai", "divyam-color.svg", 788, 230, 58),
  t("Toast", "toast-color.svg", 67, 17, 40),
];
const EXPERIENCE: Tile[] = [t("SuperErgo", "superergo-color.png", 2172, 724, 50)];
const BUILD: Tile[] = [
  t("Apify", "apify-color.svg", 512, 141, 44),
  t("Crustdata", "crustdata-color.png", 585, 163, 50),
  t("Fireflies.ai", "fireflies-color.svg", 235, 48, 52),
  t("Nebius Token Factory", "nebius-color.svg", 403, 55, 60),
  t("smallest.ai", "smallest-color.svg", 281, 46, 56),
];

function LogoTile({ tile, size = "std" }: { tile: Tile; size?: Size }) {
  const aspect = ASPECT[size];
  const capCqw = (46 / aspect).toFixed(2); // 46% of tile height, in tile-width units
  return (
    <div
      className="@container flex items-center justify-center rounded-[0_0_20px_0] bg-cream-card transition-colors duration-200 ease-soft hover:bg-cream-rule/70"
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={tile.src}
        alt={tile.name}
        width={tile.w}
        height={tile.h}
        unoptimized={tile.src.endsWith(".svg")}
        draggable={false}
        className="block select-none"
        style={{ width: `${tile.pct}cqw`, height: "auto", maxHeight: `${capCqw}cqw`, objectFit: "contain" }}
      />
    </div>
  );
}

function Group({
  label,
  tiles,
  cols,
  size,
  className,
}: {
  label: string;
  tiles: Tile[];
  cols: string;
  size?: Size;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="eyebrow mb-3 text-cream-muted">{label}</p>
      <RevealGroup as="ul" stagger={0.04} className={cn("grid gap-2.5 md:gap-3", cols)}>
        {tiles.map((tile) => (
          <RevealItem as="li" key={tile.name} y={10}>
            <LogoTile tile={tile} size={size} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

export function BackedBy({
  labels,
}: {
  labels: {
    eyebrow: string;
    title: string;
    body: string;
    presentedBy: string;
    poweredBy: string;
    associate: string;
    build: string;
    ecosystem?: string;
    experience?: string;
  };
}) {
  const grid = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
  return (
    <section aria-labelledby="partners-title" className="on-cream bg-cream text-cream-ink">
      <div className="frame grid gap-10 py-16 md:grid-cols-12 md:gap-8 md:py-28">
        <Reveal className="md:col-span-4">
          <div className="md:sticky md:top-10">
            <p className="eyebrow text-cream-muted">{labels.eyebrow}</p>
            <h2 id="partners-title" className="page-title mt-5 text-cream-ink">
              {labels.title}
            </h2>
            <p className="mt-5 max-w-[30ch] text-[17px] leading-relaxed text-cream-muted">{labels.body}</p>
          </div>
        </Reveal>
        <div className="flex flex-col gap-8 md:col-span-8 md:gap-10">
          <Group label={labels.presentedBy} tiles={PRESENTED} cols="grid-cols-1" size="lead" />
          <Group label={labels.poweredBy} tiles={POWERED} cols="grid-cols-2" size="major" />
          <Group label={labels.associate} tiles={ASSOCIATE} cols={grid} />
          <Group label={labels.ecosystem ?? "Ecosystem partners"} tiles={ECOSYSTEM} cols={grid} />
          <Group label={labels.experience ?? "Experience partners"} tiles={EXPERIENCE} cols={grid} />
          <Group label={labels.build} tiles={BUILD} cols={grid} />
        </div>
      </div>
    </section>
  );
}
