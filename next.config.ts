import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// No nonces, so the page stays in the static shell. Next.js still needs
// 'unsafe-inline' for its own inline bootstrap scripts. Fonts are self-hosted
// by next/font.
const cspWith = (frameAncestors: string) =>
  [
    "default-src 'self'",
    // embed.lu.ma: Luma's checkout button script, its stylesheet and close icon.
    `script-src 'self' 'unsafe-inline' https://embed.lu.ma${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://embed.lu.ma",
    "img-src 'self' blob: data: https://embed.lu.ma",
    "font-src 'self'",
    // Luma checkout overlay behind the Builder's Pass button.
    "frame-src https://luma.com https://lu.ma",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    `frame-ancestors ${frameAncestors}`,
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

// /landing is embedded full-screen in an iframe on theproductfolks.com
// (Webflow), so it may be framed by TPF's own domains and Webflow staging.
// Everything else stays unframeable.
const LANDING_FRAMERS = "https://www.theproductfolks.com https://theproductfolks.com https://*.webflow.io";

const sharedHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      'camera=(), microphone=(), geolocation=(), payment=("https://luma.com" "https://lu.ma"), usb=(), interest-cohort=(), browsing-topics=()',
  },
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
];

const securityHeaders = [
  { key: "Content-Security-Policy", value: cspWith("'none'") },
  { key: "X-Frame-Options", value: "DENY" },
  ...sharedHeaders,
];

// No X-Frame-Options here: it has no allow-list, and frame-ancestors covers it.
const landingHeaders = [{ key: "Content-Security-Policy", value: cspWith(LANDING_FRAMERS) }, ...sharedHeaders];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  async redirects() {
    return [{ source: "/", destination: "/landing", permanent: false }];
  },
  async headers() {
    return [
      { source: "/landing", headers: landingHeaders },
      { source: "/:path((?!landing$).*)", headers: securityHeaders },
    ];
  },
};

export default nextConfig;
