/**
 * Brand assets in public/brand, typed. Mirrors public/brand/manifest.json,
 * plus each file's intrinsic size so logos can be optically balanced.
 *
 * onDark: "mono" means the logo has colour or dark ink and must be tinted
 * beige before it goes on the green background. "ok" logos already work on
 * dark, but walls and marquees still force mono.
 */
export type Logo = {
  name: string;
  src: string;
  w: number;
  h: number;
  onDark: "ok" | "mono";
};

const b = (path: string) => `/brand/${path}`;
const logo = (name: string, path: string, w: number, h: number, onDark: Logo["onDark"] = "mono"): Logo => ({
  name,
  src: b(path),
  w,
  h,
  onDark,
});

export const TPF = {
  wordmark: { src: b("tpf/tpf-wordmark-white.avif"), w: 106, h: 64 },
  lockup: { src: b("tpf/unconference-2026.png"), w: 3847, h: 1363 },
} as const;

/** "Powered by" row on home. White SVGs. */
export const HERO_PARTNERS: readonly Logo[] = [
  logo("Figma", "hero/figma-white.svg", 120, 44, "ok"),
  logo("Anthropic", "hero/anthropic-white.svg", 578.9, 65, "ok"),
  logo("Replit", "hero/replit-white.svg", 1133.2, 321.2, "ok"),
];

/** "Backed by" wall. */
export const PARTNERS: readonly Logo[] = [
  logo("CodeRabbit", "partners/coderabbit.svg", 2152, 314),
  logo("Figr", "partners/figr.svg", 93, 34),
  logo("Intuit", "partners/intuit.png", 1064, 337, "ok"),
  logo("Mixpanel", "partners/mixpanel.svg", 798, 189, "ok"),
  logo("Plivo", "partners/plivo.svg", 66, 24),
  logo("Sarvam", "partners/sarvam.png", 606, 96),
  logo("Toast", "partners/toast.svg", 67, 17, "ok"),
];

export const HOST_COMPANIES: readonly Logo[] = [
  logo("Razorpay", "companies/razorpay.svg", 115, 24),
  logo("Paytm", "companies/paytm.svg", 74, 23),
  logo("Ather", "companies/ather.svg", 116, 32),
  logo("CRED", "companies/cred.svg", 85, 30),
  logo("InMobi", "companies/inmobi.svg", 102, 17),
  logo("Tracxn", "companies/tracxn.svg", 117, 25),
];

export const SPEAKER_COMPANIES: readonly Logo[] = [
  logo("Anthropic", "companies/anthropic.svg", 578.9, 65),
  logo("Flipkart", "companies/flipkart.svg", 522.5, 136.8),
  logo("Replit", "companies/replit.svg", 1133.2, 321.2),
  logo("Myntra", "companies/myntra.svg", 137, 60),
  logo("NVIDIA", "companies/nvidia.svg", 585.8, 108),
  logo("Meesho", "companies/meesho.png", 200, 64),
  logo("Stripe", "companies/stripe.svg", 468, 222.5),
  logo("Swiggy", "companies/swiggy.avif", 1080, 323),
  logo("OpenAI", "companies/openai.svg", 288, 78),
  logo("Zomato", "companies/zomato.svg", 2500, 535.3),
  logo("Google", "companies/google.svg", 139.9, 44),
  logo("Zepto", "companies/zepto.svg", 90, 30),
  logo("Figma", "companies/figma.svg", 120, 44),
  logo("PhonePe", "companies/phonepe.svg", 592.3, 160.9),
];

export const ATTENDEE_COMPANIES: readonly Logo[] = [
  logo("Urban Company", "companies/urban-company.png", 157, 56),
  logo("Atlassian", "companies/atlassian.svg", 195, 32),
  logo("Lenskart", "companies/lenskart.svg", 159.6, 22.1),
  logo("Glean", "companies/glean.svg", 300, 121),
  logo("Headout", "companies/headout.svg", 1882, 440),
  logo("Rippling", "companies/rippling.svg", 772.2, 110),
  logo("Salesforce", "companies/salesforce.svg", 273, 191),
  logo("Microsoft", "companies/microsoft.svg", 604, 129),
  logo("Groww", "companies/groww.svg", 536.8, 148),
  logo("Databricks", "companies/databricks.svg", 276.4, 42),
  logo("Zerodha", "companies/zerodha.svg", 609, 80),
  logo("Snowflake", "companies/snowflake.svg", 610, 139.1),
  logo("Nykaa", "companies/nykaa.svg", 465.7, 155.7),
  logo("Confluent", "companies/confluent.svg", 175, 36),
  logo("Rapido", "companies/rapido.svg", 76, 32),
];

/** Logos that become unreadable blobs when tinted flat. Keep them off mono strips. */
export const EXCLUDE_FROM_MONO = new Set(["Salesforce", "Urban Company"]);

/** Past TPF event photos. Already cut as tilted polaroids (transparent corners), 2000x2000. */
export const PAST_PHOTOS: readonly { src: string; alt: string }[] = [
  { src: b("photos/past-14.avif"), alt: "Attendees reading the event booklet together" },
  { src: b("photos/past-11.avif"), alt: "A fireside chat on the main stage in front of a full room" },
  { src: b("photos/past-3.avif"), alt: "Three attendees chatting in the hallway" },
  { src: b("photos/past-10.avif"), alt: "A speaker on stage with a microphone" },
  { src: b("photos/past-25.avif"), alt: "A speaker signing a book for attendees" },
  { src: b("photos/past-8.avif"), alt: "A panel discussion on stage" },
  { src: b("photos/past-4.avif"), alt: "Two people talking near the lounge" },
  { src: b("photos/past-15.avif"), alt: "The speaker wall at a past event" },
  { src: b("photos/past-7.avif"), alt: "The audience at a past UnConference" },
  { src: b("photos/past-01.avif"), alt: "The guest check-in desk" },
  { src: b("photos/past-19.avif"), alt: "Attendees at a sponsor booth" },
  { src: b("photos/past-9.avif"), alt: "The TPF letters in the venue lobby" },
  { src: b("photos/past-13.avif"), alt: "Speakers posing in front of the audience" },
  { src: b("photos/past-27.avif"), alt: "A speaker presenting to a room" },
  { src: b("photos/past-20.avif"), alt: "Two attendees talking in front of a screen" },
  { src: b("photos/past-29.avif"), alt: "A talk in a breakout room" },
  { src: b("photos/past-21.avif"), alt: "The team on stage at the end of the day" },
  { src: b("photos/past-18.avif"), alt: "Four speakers posing in front of the audience" },
];
