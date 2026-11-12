import type { Metadata, Viewport } from "next";
import { DM_Sans, PT_Serif } from "next/font/google";

import { MotionProvider } from "@/components/motion/motion-provider";

import "./globals.css";

const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const ptSerif = PT_Serif({ variable: "--font-pt-serif", subsets: ["latin"], weight: ["400", "700"], display: "swap" });

const DESCRIPTION = "Builder's Day at Product (Un)Conference '26, Bengaluru. By The Product Folks.";

export const metadata: Metadata = {
  title: { default: "Builders Day · UnConference '26", template: "%s · Builders Day" },
  applicationName: "Builders Day",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Builders Day · UnConference '26",
    title: "Builders Day · UnConference '26",
    description: DESCRIPTION,
    locale: "en_IN",
  },
  twitter: { card: "summary", title: "Builders Day · UnConference '26", description: DESCRIPTION },
  formatDetection: { telephone: false },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#121a17", colorScheme: "dark", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${dmSans.variable} ${ptSerif.variable} antialiased`}>
      <body className="min-h-dvh">
        <MotionProvider>
          <main id="main" className="page-shell relative">
            {children}
          </main>
        </MotionProvider>
      </body>
    </html>
  );
}
