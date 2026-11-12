/**
 * Every word on /landing lives here, so copy edits never touch layout code.
 * Items not announced yet are marked `soon: true` or rendered as "coming soon".
 */

import { PUBLIC_URLS } from "@/lib/public-urls";

export { PUBLIC_URLS };

/** The main UnConference '26 page. Linked with target="_top" (this page is framed on theproductfolks.com). */
export const EVENT_URL = PUBLIC_URLS.unconference;

/** Build window, IST. Drives the countdowns. */
export const BUILD_START = "2026-11-22T13:00:00+05:30";
export const BUILD_END = "2026-11-22T17:00:00+05:30";

export const content = {
  meta: {
    title: "Builders Day",
    description:
      "Builders Day is Day 2 of Product (Un)Conference ’26: lightning talks and a four hour buildathon on real problems from founders, operators and VCs. One Builder’s Pass gets you all of it. Sun 22 Nov, Bengaluru. $1M+ in credits and $5,000 in cash prizes.",
  },

  cta: {
    primary: "Get your pass", // Scrolls to the Builder's Pass section (#pass)
    secondary: "See the format",
  },

  /** Top bar links (anchors on this page, plus the main site), after the main UnConference site's nav. */
  nav: {
    menu: "Menu",
    links: [
      { label: "Format", href: "#agenda" },
      { label: "Prizes", href: "#prizes" },
      { label: "Problems", href: "#rfs" },
      { label: "Pass", href: "#pass" },
      { label: "FAQ", href: "#faq" },
      { label: "Unconference", href: PUBLIC_URLS.unconference, external: true },
    ],
  },

  hero: {
    presents: "Presents",
    title: "Builder’s Day",
    poweredBy: "Powered by",
    date: "Sun 22 Nov",
    place: "Bengaluru",
    /** The main UnConference '26 hero scene. */
    bg: "/brand/hero/unconf-hero-bg.avif",
    countdownLabel: "Build starts in",
  },

  ticker: [
    "Sun 22 Nov",
    "Bengaluru",
    "Builder’s Pass",
    "Lightning talks",
    "Agents panel",
    "4 hour buildathon",
    "Requests from Founders, Operators and VCs",
    "$1M+ in credits",
    "$5,000 in cash prizes",
    "Solo or in a group of up to 3",
    "Mentors on the floor",
  ],

  // Format only, no timings. Buildathon sits in the middle and is the highlighted card.
  agenda: {
    eyebrow: "Day 2 · Sun 22 Nov",
    title: "The whole day, one pass",
    body: "Talks to get the ideas flowing, an afternoon of building, and a panel to close it out. All on one Builder’s Pass.",
    formats: [
      { n: "01", title: "Lightning talks", body: "Short, sharp talks on where things are heading. Longevity, physical AI, climate, education, space." },
      { n: "02", title: "Buildathon", body: "Four hours on a real problem from a founder, operator or VC. AI tools in hand, mentors on the floor. The best builds demo on stage.", tag: "The main event", featured: true },
      { n: "03", title: "Panels", body: "Your next user isn’t human. People building for agents, on what changes." },
    ],
  },

  speakers: {
    eyebrow: "Speakers",
    title: "Learn from the best",
    more: "& more to be announced",
    soon: "Announcing soon",
    /**
     * kind "image": the main site's speaker card (name, role and logo are in the image).
     * kind "named": confirmed, no card image yet. Drawn in the same style.
     * kind "soon": not confirmed or not named yet. Shown as "Announcing soon".
     * Flip `kind` once a name is confirmed.
     */
    list: [
      { kind: "image", name: "Syed Adil", role: "Head of India", company: "Replit", session: "Panel", photo: "/brand/speakers/syed-adil.png" },
      { kind: "image", name: "Mani", role: "Head of Product", company: "Sarvam", session: "Workshop: How I AI?", photo: "/brand/speakers/mani.png" },
      { kind: "named", name: "Sanath Kumar", role: "", company: "Base", session: "Lightning talk · Longevity" },
      { kind: "named", name: "Mahesh Narayanan", role: "", company: "Mod", session: "Panel · Your Next User Isn’t Human" },
      { kind: "soon", name: "", role: "", company: "", session: "Lightning talk: Hardware and physical AI" },
      { kind: "soon", name: "", role: "", company: "", session: "Lightning talk" },
      { kind: "soon", name: "", role: "", company: "", session: "Panel" },
      { kind: "soon", name: "", role: "", company: "", session: "Lightning talk" },
    ] as { kind: "image" | "named" | "soon"; name: string; role: string; company: string; session: string; photo?: string }[],
  },

  rfs: {
    eyebrow: "The buildathon",
    title: "Work on real problems",
    subLabel: "Requests from Founders, Operators and VCs",
    body: "Founders, operators and investors from India’s AI scene have shared what they wish someone would build. Real problems, not made-up prompts. Pick the one that grabs you and spend the afternoon making it work.",
    steps: [
      { n: "01", title: "They drop a problem", body: "Each one shares something they actually need built, straight from their own list." },
      { n: "02", title: "You pick one", body: "Whichever you’d actually want to use, or can’t stop thinking about." },
      { n: "03", title: "Build it the same day", body: "Four hours, AI tools, mentors around. The best builds demo by evening." },
    ],
    scrollWords: "Real problems",
    cardsTitle: "The requests are in",
    cardsNote: "A few of them below. Open one to read the full ask, or see them all on the board.",
    /** Request ids from src/app/requests/content.ts shown as cards, in this order. Hidden or unknown ids are skipped. */
    featured: ["mass-healthcare", "gold-purity", "self-improving-agents", "more-games", "agentic-cvent", "ai-growth-team"],
    seeAll: "See all requests",
    submit: "Submit a request",
  },

  prizes: {
    eyebrow: "On the table",
    creditsHeadline: "$1M+",
    creditsLabel: "in credits",
    /** Only Anthropic is shown here; other partners are listed in `credits` below. */
    anthropic: { who: "Every participant", amount: "$500", label: "in Claude credits" },
    cash: 5000,
    cashLabel: "in cash prizes",
    /**
     * Buildathon credit partners. Same tile for everyone and no amounts on purpose, so
     * a smaller credit never looks small next to a bigger one. Alphabetical; no tiers.
     * `h` is the logo height in px, tuned per logo so they look the same size.
     */
    partnersTitle: "Plus credits to build with",
    partnersWho: "For buildathon builders",
    partners: [
      { name: "Apify", logo: "apify-color.svg", w: 512, h: 141, height: 27, what: "Web scraping and data" },
      { name: "Crustdata", logo: "crustdata-color.png", w: 585, h: 163, height: 31, what: "Company and people data" },
      { name: "Divyam.ai", logo: "divyam-color.svg", w: 788, h: 230, height: 38, what: "Smart LLM routing" },
      { name: "ElevenLabs", logo: "elevenlabs-color.png", w: 1988, h: 257, height: 18, what: "Voice AI" },
      { name: "Plivo", logo: "plivo-color.svg", w: 66, h: 24, height: 26, what: "Voice and SMS APIs" },
      { name: "Sarvam", logo: "sarvam-color.png", w: 606, h: 96, height: 18, what: "AI for Indian languages" },
      { name: "Token Factory by Nebius", logo: "nebius-color.svg", w: 403, h: 55, height: 22, what: "Open model inference" },
    ],
  },

  /**
   * Partner credits by pass tier. Leave `amount` out while a partner's number
   * is not announced. Order inside a tier: amounts first.
   */
  credits: {
    eyebrow: "Where the credits come from",
    title: "What your pass unlocks",
    body: "Credits from the tools you’ll actually build with. What you get depends on your pass, and buildathon builders get a bit extra.",
    soonLabel: "Revealing soon",
    footnote: "More partners and amounts land here as they’re confirmed.",
    tiers: [
      {
        key: "every",
        label: "Every pass",
        who: "Everyone attending",
        items: [{ name: "Anthropic", logo: "anthropic-color.svg", w: 578.9, h: 65, size: 16, amount: "$500", note: "Claude credits" }],
      },
      {
        key: "reserve",
        label: "Reserve pass",
        who: "On top of every pass",
        items: [
          { name: "Figr", logo: "figr-color.svg", w: 93, h: 34, size: 24, amount: "$450", note: "Figr credits" },
          { name: "smallest.ai", logo: "smallest-color.svg", w: 281, h: 46, size: 20, amount: "$300", note: "smallest.ai credits" },
          { name: "Fireflies.ai", logo: "fireflies-color.svg", w: 235, h: 48, size: 24, amount: "$200", note: "6 months of Fireflies Pro" },
          { name: "Apify", logo: "apify-color.svg", w: 512, h: 141, size: 24, amount: "$50", note: "Apify credits" },
          { name: "Figma", logo: "figma-color.svg", w: 120, h: 44, size: 24 },
          { name: "CodeRabbit", logo: "coderabbit-color.svg", w: 2152, h: 314, size: 21 },
          { name: "Sarvam", logo: "sarvam-color.png", w: 606, h: 96, size: 17 },
          { name: "Plivo", logo: "plivo-color.svg", w: 66, h: 24, size: 22 },
        ],
      },
      {
        key: "build",
        label: "Buildathon",
        who: "Builders only",
        items: [
          { name: "CrustData", logo: "crustdata-color.png", w: 585, h: 163, size: 36, amount: "$15,000", note: "In CrustData credits for buildathon participants" },
          { name: "Sarvam", logo: "sarvam-color.png", w: 606, h: 96, size: 17 },
        ],
      },
    ],
  },

  /** The one Day 2 pass, styled like the main site's pass tickets. Perks pull from the credits list and the format. */
  pass: {
    eyebrow: "Want in?",
    title: "Builder’s Pass",
    name: ["Builder’s", "Pass"],
    meta: "DAY 2 · SUN 22 NOV · BENGALURU",
    stubTag: "DAY 2",
    was: "₹2999",
    price: "₹1999",
    priceNote: "Day 2 only. For both days, see the main UnConference passes.",
    perks: [
      { text: "$500 in Claude credits for every participant", strong: true },
      { text: "$1M+ in credits", strong: true },
      { text: "$5,000 in cash prizes for winners", strong: true },
      { text: "Lightning talks from people building on the frontier" },
      { text: "Four hours of building on real problems from founders, operators and VCs" },
      { text: "Mentors on the floor" },
      { text: "Top builds demo on stage" },
      { text: "Individual pass for Day 2" },
    ],
    cta: "Request Builder’s Pass",
    /** Luma signup, via Luma's checkout button. Falls back to luma.com/event/<id>. */
    lumaEventId: "evt-SnuIjhsQLFAtXAq",
  },

  day: {
    eyebrow: "Sun 22 Nov · IST",
    title: "The build afternoon",
    body: "Show up, pick a problem, build. Mentors walk the floor the whole time, and the best builds get to demo.",
    facts: [
      { label: "Who", value: "Solo or in a group", note: "Groups of up to 3 people." },
      { label: "Where", value: "Bengaluru, in person", note: "Venue goes out to confirmed attendees." },
      { label: "With", value: "AI tools", note: "Bring a laptop and whatever you build with." },
      { label: "Credits", value: "$500 in Claude credits", note: "See the Builder’s Pass", link: true, href: "#pass" },
    ],
  },

  partners: {
    eyebrow: "Partners of Product (Un)Conference ’26",
    title: "Backed by the best",
    body: "The teams behind the tools you’ll be building with.",
    presentedBy: "Presented by",
    poweredBy: "Powered by",
    associate: "Associate partners",
    build: "Build partners",
  },

  memories: {
    eyebrow: "From past TPF events",
    title: "Same people. This time, bring a laptop.",
  },

  faq: {
    title: "Quick answers",
    items: [
      {
        q: "Where do the problems come from?",
        a: "Requests from Founders, Operators and VCs. People building and backing AI companies share problems they want solved. You pick one and build a working answer during the session. The requests are live now: see them in the Problems section above.",
      },
      {
        q: "How do I get in?",
        a: "Get the Builder’s Pass (₹1999). It covers everything on Day 2: talks, the buildathon and the credits. Request it in the pass section above.",
        link: true,
      },
      {
        q: "Solo or team?",
        a: "Either works. Come solo or in a group of up to 3 people.",
      },
      {
        q: "Do I get credits?",
        a: "Yes. Every participant gets $500 in Claude credits with the Builder’s Pass. Buildathon builders also get credits from Apify, Crustdata, Divyam.ai, ElevenLabs, Plivo, Sarvam and Token Factory by Nebius.",
        link: true,
      },
      {
        q: "Where exactly is it?",
        a: "Bengaluru. The venue is shared with confirmed attendees.",
      },
      {
        q: "How does judging work?",
        a: "Coming soon: who’s judging, what they look for, and how results work.",
      },
    ],
    linkLabel: "Product (Un)Conference ’26",
  },

  final: {
    eyebrow: "Sun 22 Nov · Bengaluru",
    title: "Come build.",
    body: "Talks in the morning, real problems in the afternoon, $1M+ in credits on the table. See you there.",
  },

  countdown: {
    units: ["d", "h", "m", "s"] as const,
    live: "Building now",
    liveLeft: "left",
    done: "That’s a wrap. Thanks for building.",
    fallback: "Sun 22 Nov · 1:00 PM IST",
  },
} as const;

export type LandingContent = typeof content;
