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
      { label: "Speakers", href: "#speakers" },
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
    "Open innovation",
    "One-person companies",
    "Everyone’s a builder",
    "Mentors on the floor",
  ],

  /** Positioning band right under the ticker: Speedrun is solo. Set 2026-11-18. */
  positioning: {
    eyebrow: "Speedrun is solo",
    title: "Everyone’s a builder.",
    points: [
      { title: "Just you", body: "No teams, no groups. One builder, one build, from first prompt to demo." },
      { title: "A one-person company", body: "Ship in four hours what used to take a team. Your AI tools fill in the rest of the org chart." },
      { title: "Open innovation", body: "Real problems from founders, operators and VCs. Any stack, any tool, your call." },
    ],
  },

  // Format only, no timings. Buildathon sits in the middle and is the highlighted card.
  agenda: {
    eyebrow: "Day 2 · Sun 22 Nov",
    title: "The whole day, one pass",
    body: "Talks to get the ideas flowing, an afternoon of building, and a panel to close it out. All on one Builder’s Pass.",
    formats: [
      { n: "01", title: "Lightning talks", body: "Short, sharp talks on where things are heading. Longevity, physical AI, climate, education, space." },
      { n: "02", title: "Speedrun", body: "Our buildathon, solo: four hours on a real problem from a founder, operator or VC. Just you and your AI tools, mentors on the floor. The best builds demo on stage.", tag: "The main event", featured: true },
      { n: "03", title: "Panels", body: "Your next user isn’t human. People building for agents, on what changes." },
    ],
  },

  speakers: {
    eyebrow: "In the room",
    title: "Learn from the best",
    /** Grid order, four per row on desktop (set 2026-11-19). Names not listed here go at the end. */
    order: [
      "Kiran Bangalore", "Pratik Poddar", "Vikas Bansal", "Aparna Chugh",
      "Mani", "Vikrama Dhiman", "Rohit Khanna", "Sripriya GN",
      "Ranjeet Walunj", "Prashanth Rao", "Nithin Rangarajan", "Nishant Nayak",
      "Soumyadeep Mukherjee", "Ramneek Khurana", "Anirudh Gupta", "Pritam Roy",
      "Kushal Khandelwal", "Syed Adil", "Mahesh Narayanan", "Sanath Kumar", "Nishant Chandra",
    ],
    soon: "Announcing soon",
    /**
     * kind "image": the main site's speaker card (name, role and logo are in the image).
     * kind "named": confirmed, no card image yet. Drawn in the same style.
     * kind "soon": not confirmed or not named yet. Shown as "Announcing soon".
     * Flip `kind` once a name is confirmed.
     */
    list: [
      { kind: "image", name: "Syed Adil", role: "Head of India - Growth", company: "Replit", session: "Panel · Your Next 100M Users", photo: "/brand/speakers/syed-adil.png" },
      { kind: "image", name: "Mahesh Narayanan", role: "Managing Director", company: "GPT1 Ventures", session: "Panel · Your Next 100M Users", photo: "/brand/speakers/mahesh-narayanan.png" },
      { kind: "image", name: "Sanath Kumar", role: "Co-founder", company: "Base", session: "Lightning talk · Longevity", photo: "/brand/speakers/sanath-kumar.png" },
      { kind: "image", name: "Nishant Chandra", role: "Co-founder", company: "Newton School", session: "Lightning talk · AI Does the Work. You Make the Bet.", photo: "/brand/speakers/nishant-chandra.png" },
      { kind: "image", name: "Mani", role: "Head of Product", company: "Sarvam", session: "Workshop · How I AI: Builder’s Guide", photo: "/brand/speakers/mani.png" },
      { kind: "image", name: "Vikas Bansal", role: "Product Head", company: "Groww", session: "Panel · Your Next 100M Users", photo: "/brand/speakers/vikas-bansal.png" },
      { kind: "image", name: "Vikrama Dhiman", role: "CPO", company: "Ather", session: "CPO, Ather", photo: "/brand/speakers/vikrama-dhiman.png" },
    ] as { kind: "image" | "named" | "soon"; name: string; role: string; company: string; session: string; photo?: string }[],
  },

  /** Mentors and judges for the Speedrun. Cards are the main site's Figma SpeakerCards (text and logo baked in), exported at 597x776. */
  mentors: {
    eyebrow: "In the room",
    title: "Mentors & judges",
    /** One grid, judges first. */
    list: [
      { name: "Pratik Poddar", role: "Partner", company: "Nexus Venture Partners", photo: "/brand/mentors/pratik-poddar.png" },
      { name: "Kiran Bangalore", role: "Partner General Manager", company: "Ex-Microsoft", photo: "/brand/mentors/kiran-bangalore.png" },
      { name: "Nishant Nayak", role: "VP Product & Engineering", company: "Rakuten India", photo: "/brand/mentors/nishant-nayak.png" },
      { name: "Soumyadeep Mukherjee", role: "Co-Founder & CTO", company: "Dashverse", photo: "/brand/mentors/soumyadeep-mukherjee.png" },
      { name: "Ramneek Khurana", role: "Co-Founder, Product x Tech", company: "Lenskart", photo: "/brand/mentors/ramneek-khurana.png" },
      { name: "Sripriya GN", role: "Head of Product", company: "NeoSapien", photo: "/brand/mentors/sripriya-gn.png" },
      { name: "Nithin Rangarajan", role: "VP Product", company: "Chargebee", photo: "/brand/mentors/nithin-rangarajan.png" },
      { name: "Prashanth Rao", role: "Senior Director and India Product Head", company: "Docusign", photo: "/brand/mentors/prashanth-rao.png" },
      { name: "Ranjeet Walunj", role: "CPTO", company: "Pluto", photo: "/brand/mentors/ranjeet-walunj.png" },
      { name: "Aparna Chugh", role: "Head of Product", company: "Atomicwork", photo: "/brand/mentors/aparna-chugh.png" },
      { name: "Rohit Khanna", role: "VP Engineering and Site Lead", company: "CodeRabbit", photo: "/brand/mentors/rohit-khanna.png" },
      { name: "Anirudh Gupta", role: "AVP, Engineering", company: "District by Zomato", photo: "/brand/mentors/anirudh-gupta.png" },
      { name: "Pritam Roy", role: "Co-Founder", company: "Fibr AI", photo: "/brand/mentors/pritam-roy.png" },
      { name: "Kushal Khandelwal", role: "Founder", company: "Brink AI Labs", photo: "/brand/mentors/kushal-khandelwal.png" },
    ] as { name: string; role: string; company: string; photo: string }[],
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
    anthropic: { who: "Every builder", amount: "$500", label: "in Claude credits" },
    cash: 5000,
    cashLabel: "in cash prizes for winners",
    /** Cash prize sponsor, shown inside the dark cash box. Logo is District's own cream wordmark (from district.in). */
    cashSponsor: { lead: "Powered by", name: "District by Zomato", logo: "district-cream.svg", w: 886, h: 358 },
    /**
     * Buildathon credit partners. Same tile for everyone; the amount sits in a ticket stub
     * of the same size on every tile, so a smaller credit never looks small next to a bigger one.
     * Highest credit first (ties alphabetical); no tiers.
     * `h` is the logo height in px, tuned per logo so they look the same size.
     */
    partnersTitle: "Plus credits to build with",
    partnersCredit: "Credits",
    partnersWho: "For every builder",
    partners: [
      { name: "Crustdata", logo: "crustdata-color.png", w: 585, h: 163, height: 31, what: "Company and people data", credit: "$1,000" },
      { name: "Sarvam", logo: "sarvam-color.png", w: 606, h: 96, height: 18, what: "AI for Indian languages", credit: "10,000" },
      { name: "Divyam.ai", logo: "divyam-color.svg", w: 788, h: 230, height: 38, what: "Smart LLM routing", credit: "$100" },
      { name: "ElevenLabs", logo: "elevenlabs-color.png", w: 1988, h: 257, height: 18, what: "Voice AI", credit: "$100" },
      { name: "Plivo", logo: "plivo-color.svg", w: 66, h: 24, height: 26, what: "Voice and SMS APIs", credit: "$100" },
      { name: "Token Factory by Nebius", logo: "nebius-color.svg", w: 403, h: 55, height: 22, what: "Open model inference", credit: "$100" },
      { name: "Apify", logo: "apify-color.svg", w: 512, h: 141, height: 27, what: "Web scraping and data", credit: "$50" },
      // Not guaranteed: Descope reviews each startup's application, so it sits last despite the bigger number.
      { name: "Descope", logo: "descope-color.png", w: 1816, h: 475, height: 24, what: "Startup plan, if you qualify", label: "Up to", credit: "$3,000" },
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
      { text: "$500 in Claude credits for every builder", strong: true },
      { text: "$1M+ in credits", strong: true },
      { text: "$5,000 in cash prizes for winners", strong: true },
      { text: "Lightning talks from people building on the frontier" },
      { text: "A panel on building for agents" },
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
    eyebrow: "Sun 22 Nov · Bengaluru",
    title: "The build afternoon",
    facts: [
      { label: "Who", value: "Just you. Everyone’s a builder" },
      { label: "Where", value: "Bengaluru, in person" },
      { label: "Bring", value: "A laptop and your AI tools" },
      { label: "Credits", value: "$1M+ in AI credits", href: "#prizes" as const },
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
        q: "Can I choose my own problem?",
        a: "Yes. Pick one of the requests in the Problems section above, or bring a problem of your own. Either way, you start building at 1:00 PM on the day.",
      },
      {
        q: "Can I start building before the day?",
        a: "No. Everyone starts at 1:00 PM on Sun 22 Nov and builds in the same four hours. Come with ideas, not code.",
      },
      {
        q: "How do I get in?",
        a: "Get the Builder’s Pass (₹1999). It covers everything on Day 2: talks, the buildathon and the credits. Request it in the pass section above.",
        link: true,
      },
      {
        q: "Can I bring a team?",
        a: "No. Speedrun is solo: one builder, one build, like a one-person company. Everyone’s a builder here.",
      },
      {
        q: "Do I get credits?",
        a: "Yes. Every builder gets Claude credits ($500 with a work email, $100 with a personal one), plus credits from Apify, Crustdata, Divyam.ai, ElevenLabs, Plivo, Sarvam and Token Factory by Nebius, and Descope’s startup plan if you qualify. You need to be at the venue to get them.",
        link: true,
      },
      {
        q: "When do I get the credits?",
        a: "Partner credits are shared at the venue on Sun 22 Nov, so being there is a must. Claude credits go straight to the email you registered with.",
      },
      {
        q: "How much in Claude credits do I get?",
        a: "It depends on the email you registered with. Anthropic issues $500 in Claude credits to a work email and $100 to a personal email (like Gmail).",
      },
      {
        q: "Where do my Claude credits go?",
        a: "Straight to the email you registered with. Anthropic issues them directly, so keep an eye on that inbox.",
      },
      {
        q: "I registered after 19 Nov. When do I get my Claude credits?",
        a: "After the UnConference. If you sign up after 19 Nov, your Claude credits are issued once the event is over.",
      },
      {
        q: "Where exactly is it?",
        a: "Bengaluru. The venue is shared with confirmed builders.",
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
