import type { Metadata } from "next";
import Image from "next/image";

import { Logo } from "@/components/brand/logo";
import { PhotoMarquee } from "@/components/brand/photo-marquee";
import { ArrowRightIcon, CalendarIcon, PinIcon } from "@/components/icons";
import { LiveDot } from "@/components/motion/live-dot";
import { Marquee } from "@/components/motion/marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { HashLink } from "@/components/shell/hash-link";
import { HERO_PARTNERS, PAST_PHOTOS, TPF } from "@/lib/brand";
import { cn } from "@/lib/cn";

import { CountdownBig } from "./_components/countdown";
import { FaqList } from "./_components/faq";
import { BackedBy } from "./_components/backed-by";
import { BuildersPass } from "./_components/builders-pass";
import { FloatingCta } from "./_components/floating-cta";
import { NotchLink } from "./_components/notch-cta";
import { SpeakerCard } from "./_components/speaker-card";
import { TopBar } from "./_components/top-bar";
import { PrizeAmount, ScrollType } from "./_components/motion-bits";
import { CARD_CLASS, cardLabel, RequestCardBody, VISIBLE } from "../requests/_components/request-card";
import { copy as requestsCopy } from "../requests/content";
import { TpfFooter } from "@/components/shell/tpf-footer";
import { content as c, EVENT_URL, PUBLIC_URLS } from "./content";

/** Speakers section: on since 14 Nov (Day 2 speakers live on the main site). */
const SHOW_SPEAKERS = true;

/** The request cards in the Problems section: c.rfs.featured, in order, shown exactly as on the board. */
const FEATURED_REQUESTS = c.rfs.featured.flatMap((id) => VISIBLE.filter((r) => r.id === id));

export const metadata: Metadata = {
  title: c.meta.title,
  description: c.meta.description,
  openGraph: { title: c.meta.title, description: c.meta.description },
};

/**
 * Public buildathon landing page (v1). Full-bleed sibling of the home page:
 * same tokens, type and motion, turned up for a launch page. All copy is in
 * ./content.ts.
 */
export default function LandingPage() {
  return (
    // No site header on /landing, so cancel the bleed shell's header padding.
    <div data-bleed className="-mt-[var(--bar-h)]">
      <TopBar
        links={c.nav.links}
        cta={c.cta.primary}
        href="#pass"
        menuLabel={c.nav.menu}
        publicUrl={PUBLIC_URLS.landing}
      />
      <Hero />
      <Ticker />
      <Agenda />
      {SHOW_SPEAKERS ? <Speakers /> : null}
      <Prizes />
      <Rfs />
      <TheDay />
      <BuildersPass copy={c.pass} />
      <BackedBy labels={c.partners} />
      <Memories />
      <Faq />
      <Final />
      <TpfFooter />
      <FloatingCta
        hash="#pass"
        publicUrl={PUBLIC_URLS.landing}
        label={c.cta.primary}
        countdownLabel={c.hero.countdownLabel}
      />
    </div>
  );
}

/* ---------- Shared bits ---------- */

function PrimaryCta({ className }: { className?: string }) {
  return (
    <NotchLink href="#pass" publicUrl={PUBLIC_URLS.landing} className={className}>
      {c.cta.primary}
    </NotchLink>
  );
}

/** Giant outline numerals behind a section, like the stroked "2026" on the TPF site. */
function OutlineDate({ className }: { className?: string }) {
  return (
    <p
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute font-serif leading-none font-bold tracking-[-0.05em] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_var(--rule-strong)]",
        className,
      )}
    >
      22.11
    </p>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const [figma, anthropic, replit] = HERO_PARTNERS;
  return (
    <section
      id="landing-hero"
      aria-labelledby="landing-title"
      className="relative overflow-hidden border-b border-rule"
    >
      {/* The UnConference '26 hero scene (lounge, pink blooms), same as the main site. Text sits in the dark top half. */}
      <Image
        src={c.hero.bg}
        alt=""
        fill
        preload
        sizes="100vw"
        className="pointer-events-none object-cover object-[50%_100%] select-none"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(33,53,53,0.55)_0%,rgba(33,53,53,0.2)_45%,rgba(33,53,53,0)_70%,rgba(33,53,53,0.45)_100%)]"
      />
      {/* Content sits high, like the main site, so the scene shows underneath. Sizes scale with viewport height so the CTA stays in the first fold. */}
      <RevealGroup
        onMount
        stagger={0.08}
        delay={0.05}
        className="frame relative flex min-h-[100svh] flex-col items-center pt-[calc(72px+clamp(20px,5vh,64px))] pb-[clamp(200px,34vh,360px)] text-center"
      >
        <RevealItem className="flex flex-col items-center gap-1.5">
          <Logo logo={figma} height={26} />
          <span className="text-[12px] font-semibold tracking-[0.16em] text-ink/85 uppercase md:text-[13px]">
            {c.hero.presents}
          </span>
        </RevealItem>

        <RevealItem y={24} className="mt-[clamp(10px,2vh,22px)] w-full">
          <Image
            src={TPF.lockup.src}
            alt="Product (Un)Conference 2026"
            width={TPF.lockup.w}
            height={TPF.lockup.h}
            preload
            sizes="(min-width: 1024px) 600px, 88vw"
            className="mx-auto h-auto w-[min(600px,88vw,52vh)]"
          />
        </RevealItem>

        <RevealItem y={20}>
          <h1
            id="landing-title"
            className="mt-[clamp(8px,1.6vh,18px)] font-serif text-[clamp(40px,min(7vw,9vh),84px)] leading-[0.95] font-bold tracking-[-0.03em] whitespace-nowrap text-ink"
          >
            {c.hero.title}
          </h1>
        </RevealItem>

        <RevealItem className="mt-[clamp(14px,2.6vh,28px)] flex flex-col items-center gap-2.5">
          <span className="text-[11px] font-semibold tracking-[0.16em] text-ink/70 uppercase md:text-[12px]">
            {c.hero.poweredBy}
          </span>
          {/* Same sizes as the main site's "powered by" row: Anthropic 140px wide, Replit 100px, 24px apart. */}
          <span className="flex items-center gap-6">
            <Image
              src={anthropic.src}
              alt={anthropic.name}
              width={140}
              height={16}
              unoptimized
              className="block h-auto w-[140px]"
            />
            <Image
              src={replit.src}
              alt={replit.name}
              width={100}
              height={28}
              unoptimized
              className="block h-auto w-[100px]"
            />
          </span>
        </RevealItem>

        <RevealItem className="mt-[clamp(14px,2.6vh,28px)]">
          <p className="flex items-center gap-4 bg-black/30 px-5 py-2.5 text-[13px] font-semibold tracking-[0.12em] text-ink/90 uppercase backdrop-blur-sm md:gap-5 md:text-[15px]">
            <span className="flex items-center gap-2">
              <CalendarIcon className="size-[18px] text-gold" />
              {c.hero.date}
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-ink/30" />
            <span className="flex items-center gap-2">
              <PinIcon className="size-[18px] text-gold" />
              {c.hero.place}
            </span>
          </p>
        </RevealItem>

        <RevealItem className="mt-[clamp(16px,2.8vh,30px)]">
          <PrimaryCta />
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

function Ticker() {
  return (
    <section
      aria-label="Key details"
      className="border-b border-rule bg-ink text-bg"
    >
      <Marquee
        label="Key details"
        seconds={46}
        fade={false}
        gap="gap-6 pr-6 md:gap-10 md:pr-10"
        listClassName="py-4 md:py-5"
      >
        {c.ticker.map((t) => (
          <li key={t} className="flex items-center gap-6 md:gap-10">
            <span className="text-[15px] font-bold tracking-[0.12em] whitespace-nowrap uppercase md:text-[17px]">
              {t}
            </span>
            <span
              aria-hidden="true"
              className="inline-block size-2.5 rotate-45 bg-crimson"
            />
          </li>
        ))}
      </Marquee>
    </section>
  );
}

/* ---------- Day 2 agenda ---------- */

function Agenda() {
  return (
    <section
      id="agenda"
      aria-labelledby="agenda-title"
      className="scroll-mt-20 border-b border-rule"
    >
      <div className="frame py-16 md:py-28">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="eyebrow flex items-center gap-2.5 text-muted">
              <span
                aria-hidden="true"
                className="inline-block size-2.5 rounded-[2px] bg-crimson"
              />
              {c.agenda.eyebrow}
            </p>
            <h2 id="agenda-title" className="page-title mt-5 text-ink">
              {c.agenda.title}
            </h2>
          </div>
          <p className="max-w-[42ch] text-[18px] leading-[1.55] text-pretty text-ink/85 md:col-span-5 md:text-[19px]">
            {c.agenda.body}
          </p>
        </Reveal>

        {/* Talks and panels sit either side; the buildathon card in the middle is bigger, filled and tagged. */}
        <RevealGroup
          as="ul"
          stagger={0.08}
          className="mt-10 grid gap-4 md:mt-16 md:grid-cols-[1fr_1.35fr_1fr] md:items-center md:gap-6"
        >
          {c.agenda.formats.map((f) => {
            const featured = "featured" in f && f.featured;
            return (
              <RevealItem
                as="li"
                key={f.n}
                y={16}
                className={cn(
                  "lift flex flex-col gap-4 rounded-card md:rounded-panel",
                  featured
                    ? "relative border border-crimson bg-crimson p-7 text-ink shadow-[var(--offset)_var(--offset)_0_#eecd7a] md:min-h-[440px] md:p-10"
                    : "border border-rule-strong bg-deep p-6 md:min-h-[320px] md:p-8",
                )}
              >
                {featured && "tag" in f ? (
                  <p className="eyebrow flex items-center gap-2.5 text-ink">
                    <LiveDot tone="gold" />
                    {f.tag}
                  </p>
                ) : null}
                <span
                  aria-hidden="true"
                  className={cn(
                    "num font-serif leading-none font-bold text-transparent",
                    featured
                      ? "text-[64px] [-webkit-text-stroke:1.5px_var(--ink)] md:text-[88px]"
                      : "text-[44px] [-webkit-text-stroke:1.5px_var(--rule-strong)] md:text-[56px]",
                  )}
                >
                  {f.n}
                </span>
                <h3
                  className={cn(
                    "font-serif leading-tight font-bold text-ink",
                    featured
                      ? "text-[34px] md:text-[48px]"
                      : "text-[26px] md:text-[30px]",
                  )}
                >
                  {f.title}
                </h3>
                <p
                  className={cn(
                    "leading-relaxed",
                    featured
                      ? "text-[16px] text-ink/90 md:text-[18px]"
                      : "text-[15px] text-muted md:text-base",
                  )}
                >
                  {f.body}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------- Speakers ---------- */

function Speakers() {
  return (
    <section
      id="speakers"
      aria-labelledby="speakers-title"
      className="scroll-mt-20 border-b border-rule"
    >
      <div className="frame py-16 md:py-28">
        <Reveal className="text-center">
          <p className="eyebrow text-muted">{c.speakers.eyebrow}</p>
          <h2 id="speakers-title" className="page-title mt-5 text-ink">
            {c.speakers.title}
          </h2>
        </Reveal>
        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mx-auto mt-10 flex max-w-[922px] flex-wrap justify-center gap-4 min-[480px]:gap-8 md:mt-14"
        >
          {/* Main site's card size and gaps (1240px frame, 4-up cards = 286px, 2rem gap), three per row from md, two below; a short last row stays centred. */}
          {c.speakers.list.map((s, i) => (
            <RevealItem
              as="li"
              key={s.name || `soon-${i}`}
              y={16}
              className="w-[calc((100%-1rem)/2)] min-[480px]:w-[calc((100%-2rem)/2)] md:w-[calc((100%-4rem)/3)]"
            >
              <SpeakerCard speaker={s} soonLabel={c.speakers.soon} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-10 text-center md:mt-14">
          <p className="font-serif text-[24px] font-bold text-ink md:text-[30px]">
            {c.speakers.more}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Work on real problems (Requests from Founders, Operators and VCs) ---------- */

function Rfs() {
  return (
    <section
      id="rfs"
      aria-labelledby="rfs-title"
      className="scroll-mt-16 overflow-hidden border-b border-rule"
    >
      <div className="frame pt-16 md:pt-28">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className="eyebrow flex items-center gap-2.5 text-muted">
              <span
                aria-hidden="true"
                className="inline-block size-2.5 rounded-[2px] bg-crimson"
              />
              {c.rfs.eyebrow}
            </p>
            <h2 id="rfs-title" className="page-title mt-5 text-ink">
              {c.rfs.title}
            </h2>
            <p className="mt-6 flex items-center gap-2.5 text-[17px] font-bold text-ink/85 md:mt-8 md:text-[19px]">
              <span
                aria-hidden="true"
                className="inline-block size-2 rotate-45 bg-crimson"
              />
              {c.rfs.subLabel}
            </p>
          </div>
          <p className="max-w-[44ch] text-[18px] leading-[1.55] text-pretty text-ink/85 md:col-span-5 md:text-[19px]">
            {c.rfs.body}
          </p>
        </Reveal>
      </div>

      <ScrollType words={c.rfs.scrollWords} className="mt-12 md:mt-20" />

      <div className="frame pb-16 md:pb-28">
        <RevealGroup
          as="ol"
          stagger={0.1}
          className="mt-10 grid border-t border-rule md:mt-14 md:grid-cols-3"
        >
          {c.rfs.steps.map((s) => (
            <RevealItem
              as="li"
              key={s.n}
              className="flex gap-5 border-b border-rule py-7 md:flex-col md:gap-8 md:border-r md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span
                aria-hidden="true"
                className="num font-serif text-[64px] leading-[0.8] font-bold text-transparent [-webkit-text-stroke:1.5px_var(--ink)] md:text-[96px]"
              >
                {s.n}
              </span>
              <div>
                <h3 className="font-serif text-[24px] leading-tight font-bold text-ink md:text-[30px]">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[32ch] text-[15px] leading-relaxed text-muted md:text-base">
                  {s.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-16 flex flex-col gap-4 md:mt-24 md:flex-row md:items-end md:justify-between">
          <div>
            <h3 className="font-serif text-headline font-bold text-ink">
              {c.rfs.cardsTitle}
            </h3>
            <p className="mt-2 max-w-xl text-base text-muted md:text-[17px]">
              {c.rfs.cardsNote}
            </p>
          </div>
        </Reveal>

        <RevealGroup
          as="ul"
          stagger={0.07}
          className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-10 md:gap-6 lg:grid-cols-3"
        >
          {FEATURED_REQUESTS.map((r) => (
            <RevealItem as="li" key={r.id} y={20}>
              {/* Same card as the board; opens that request there, out of the frame. */}
              <a href={`${PUBLIC_URLS.requests}#${r.id}`} target="_top" aria-label={cardLabel(r)} className={CARD_CLASS}>
                <RequestCardBody r={r} />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8 md:mt-14">
          <PrimaryCta />
          <a
            href={PUBLIC_URLS.requests}
            target="_top"
            className="group inline-flex items-center gap-2 self-start text-[15px] font-semibold text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink sm:self-center"
          >
            {c.rfs.seeAll}
            <ArrowRightIcon className="size-4 transition-transform duration-200 ease-soft group-hover:translate-x-1" />
          </a>
          {/* Same Fillout form as the Requests page's submit block. */}
          <a
            href={requestsCopy.submit.href}
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 self-start text-[15px] font-semibold text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink sm:self-center"
          >
            {c.rfs.submit}
            <ArrowRightIcon className="size-4 transition-transform duration-200 ease-soft group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Prizes ---------- */

function Prizes() {
  return (
    <section
      id="prizes"
      aria-labelledby="prizes-title"
      className="on-cream relative scroll-mt-16 overflow-hidden bg-cream text-cream-ink"
    >
      {/* Warm glow behind the headline number */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[620px] w-[1100px] max-w-[180vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(238,205,122,0.55),rgba(189,45,83,0.10)_60%,transparent)] blur-2xl"
      />
      <div className="frame relative py-16 md:py-28">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5 text-cream-muted">
              <span
                aria-hidden="true"
                className="inline-block size-2.5 rotate-45 bg-crimson"
              />
              {c.prizes.eyebrow}
            </p>
          </Reveal>
          <Reveal y={28} className="mt-6">
            <h2 id="prizes-title" className="flex flex-col items-center">
              <span className="block font-serif text-[clamp(120px,34vw,320px)] leading-[0.82] font-bold tracking-[-0.05em] text-cream-ink">
                {c.prizes.creditsHeadline}
              </span>
              <span className="mt-3 block font-serif text-[clamp(30px,6vw,64px)] leading-[1] font-bold tracking-[-0.02em] text-cream-ink md:mt-5">
                {c.prizes.creditsLabel}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="mt-10 md:mt-14">
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-[0_0_20px_0] bg-cream-ink px-6 py-4 text-cream md:gap-x-5 md:px-9 md:py-5">
              <span
                aria-hidden="true"
                className="font-serif text-[clamp(28px,4vw,44px)] leading-none font-bold text-gold"
              >
                +
              </span>
              <PrizeAmount
                amount={c.prizes.cash}
                className="block font-serif text-[clamp(36px,5.4vw,64px)] leading-none font-bold tracking-[-0.02em] text-cream"
              />
              <span className="block font-serif text-[clamp(20px,2.6vw,30px)] leading-[1.1] font-bold">
                {c.prizes.cashLabel}
              </span>
            </p>
          </Reveal>
        </div>
        {/* Partner breakdown (./_components/credits-breakdown) is off until the other amounts are confirmed. Anthropic only for now. */}
        <Reveal id="credits" delay={0.15} className="mx-auto mt-12 max-w-[440px] scroll-mt-24 md:mt-16">
          <div className="flex flex-col items-center gap-4 rounded-[0_0_20px_0] bg-cream-card px-6 py-7 text-center md:px-10 md:py-9">
            <p className="eyebrow text-cream-muted">{c.prizes.anthropic.who}</p>
            <Image src="/brand/partners/anthropic-color.svg" alt="Anthropic" width={579} height={65} unoptimized className="block h-[18px] w-auto md:h-5" />
            <p className="flex items-baseline gap-2.5">
              <span className="font-serif text-[clamp(44px,8vw,64px)] leading-none font-bold tracking-[-0.02em] text-cream-ink">{c.prizes.anthropic.amount}</span>
              <span className="font-serif text-[clamp(20px,3vw,26px)] leading-none font-bold text-cream-ink">{c.prizes.anthropic.label}</span>
            </p>
          </div>
        </Reveal>
        {/* Every other partner: one identical tile each, no amounts (see content.ts). */}
        <Reveal delay={0.18} className="mx-auto mt-12 max-w-[920px] md:mt-16">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow text-cream-muted">{c.prizes.partnersWho}</p>
            <h3 className="mt-3 font-serif text-[clamp(26px,3.4vw,36px)] leading-[1.05] font-bold tracking-[-0.02em] text-cream-ink">{c.prizes.partnersTitle}</h3>
          </div>
          <ul className="mt-7 flex flex-wrap justify-center gap-3 md:mt-9 md:gap-4">
            {c.prizes.partners.map((p) => (
              <li
                key={p.name}
                className="relative flex w-[calc(50%-6px)] flex-col rounded-[0_0_16px_0] border border-cream-rule bg-cream text-center sm:w-[200px]"
              >
                <span className="flex flex-1 flex-col items-center gap-3 px-3 pt-5 pb-4 md:pt-6">
                <span className="flex h-9 items-center">
                  <Image
                    src={`/brand/partners/${p.logo}`}
                    alt={p.name}
                    width={p.w}
                    height={p.h}
                    unoptimized
                    style={{ height: p.height, width: "auto" }}
                    className="block max-w-full"
                  />
                </span>
                <span className="text-[14px] leading-snug text-cream-muted">{p.what}</span>
                </span>
                {/* Ticket stub, like the Builder's Pass: tear line with notches, then the amount. */}
                <span className="relative flex items-baseline justify-between gap-2 border-t border-dashed border-cream-rule px-4 py-3">
                  <span aria-hidden="true" className="absolute -top-[7px] -left-[7px] size-3 rounded-full border border-cream-rule bg-cream [clip-path:inset(0_0_0_50%)]" />
                  <span aria-hidden="true" className="absolute -top-[7px] -right-[7px] size-3 rounded-full border border-cream-rule bg-cream [clip-path:inset(0_50%_0_0)]" />
                  <span className="eyebrow text-cream-muted">{c.prizes.partnersCredit}</span>
                  <span className="font-serif text-[20px] leading-none font-bold text-cream-ink">{p.credit}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- The day (minimal) ---------- */

/** A short teal band between the problems and the pass: the title and four facts in one row. It mostly breaks up the dark run of sections. */
function TheDay() {
  return (
    <section aria-labelledby="day-title" className="relative overflow-hidden border-b border-rule bg-teal">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[620px] max-w-[160vw] rounded-full bg-[radial-gradient(closest-side,rgba(189,45,83,0.4),transparent)] blur-2xl"
      />
      <div className="frame relative py-12 md:py-16">
        <Reveal>
          <p className="eyebrow text-ink/75">{c.day.eyebrow}</p>
          <h2 id="day-title" className="mt-3 font-serif text-[clamp(30px,4vw,44px)] leading-[1.05] font-bold tracking-[-0.02em] text-ink">
            {c.day.title}
          </h2>
        </Reveal>
        <RevealGroup as="ul" stagger={0.06} className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/20 pt-6 md:mt-10 md:grid-cols-4 md:pt-8">
          {c.day.facts.map((f) => (
            <RevealItem as="li" key={f.label} y={10} className="flex flex-col gap-1.5">
              <p className="eyebrow text-ink/65">{f.label}</p>
              {"href" in f ? (
                <HashLink
                  hash={f.href}
                  publicUrl={PUBLIC_URLS.landing}
                  className="text-[17px] leading-snug font-semibold text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink md:text-[19px]"
                >
                  {f.value}
                </HashLink>
              ) : (
                <p className="text-[17px] leading-snug font-semibold text-ink md:text-[19px]">{f.value}</p>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------- Memories ---------- */

function Memories() {
  return (
    <section
      aria-labelledby="memories-title"
      className="overflow-hidden border-b border-rule pt-16 md:pt-24"
    >
      <Reveal className="frame">
        <p className="eyebrow text-muted">{c.memories.eyebrow}</p>
        <h2
          id="memories-title"
          className="mt-3 max-w-[20ch] font-serif text-headline font-bold text-balance text-ink"
        >
          {c.memories.title}
        </h2>
      </Reveal>
      <div className="mt-4 pb-8 md:mt-8 md:pb-14">
        <PhotoMarquee photos={PAST_PHOTOS} seconds={80} />
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function Faq() {
  const items = c.faq.items.map((item) => ({
    q: item.q,
    a: (
      <>
        {item.a}
        {"link" in item && item.link ? (
          <>
            {" "}
            <a
              href={EVENT_URL}
              target="_top" // Page is framed on the main site: leave the iframe, don't load the main site inside it.
              className="font-semibold text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-ink"
            >
              {c.faq.linkLabel}
            </a>
          </>
        ) : null}
      </>
    ),
  }));
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-20 border-b border-rule"
    >
      <div className="frame grid gap-10 py-16 md:grid-cols-12 md:gap-8 md:py-24">
        <Reveal className="md:col-span-4">
          <h2
            id="faq-title"
            className="font-serif text-headline font-bold text-ink md:sticky md:top-[calc(var(--bar-h)+32px)]"
          >
            {c.faq.title}
          </h2>
        </Reveal>
        <Reveal className="md:col-span-8">
          <FaqList items={items} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */

function Final() {
  return (
    <section
      id="landing-final"
      aria-labelledby="final-title"
      className="relative overflow-hidden"
    >
      <OutlineDate className="-right-[4vw] bottom-[-0.14em] text-[clamp(160px,44vw,520px)]" />
      <div className="frame relative py-20 md:py-32">
        <Reveal>
          <p className="eyebrow text-muted">{c.final.eyebrow}</p>
          <h2
            id="final-title"
            className="mt-6 font-serif text-[clamp(88px,25vw,280px)] leading-[0.82] font-bold tracking-[-0.055em] text-ink"
          >
            {c.final.title}
          </h2>
          <p className="mt-8 max-w-[34ch] text-[19px] leading-[1.5] text-ink/90 md:text-[23px]">
            {c.final.body}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 md:mt-16">
          <CountdownBig />
        </Reveal>
        <Reveal
          delay={0.15}
          className="mt-10 flex flex-col gap-3 sm:flex-row md:mt-12"
        >
          <PrimaryCta />
        </Reveal>
      </div>
    </section>
  );
}
