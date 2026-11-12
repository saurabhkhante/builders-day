import Image from "next/image";

import { cn } from "@/lib/cn";
import type { Logo as LogoData } from "@/lib/brand";

/**
 * One logo, optically balanced: wide wordmarks get shorter, compact marks
 * taller, so a row reads even. `height` is the base height in px.
 * `mono` forces flat beige (always on for flagged logos). Logos that turn
 * into solid blobs when tinted (Salesforce, Urban Company) are left out of
 * marquees; see EXCLUDE_FROM_MONO in lib/brand.ts.
 */
export function Logo({
  logo,
  height = 24,
  mono = true,
  fluid = false,
  className,
}: {
  logo: LogoData;
  height?: number;
  mono?: boolean;
  /** Shrink to fit a narrow container (keeps the aspect ratio). */
  fluid?: boolean;
  className?: string;
}) {
  const ratio = logo.w / logo.h;
  const h = Math.round(height * Math.min(1.3, Math.max(0.55, Math.sqrt(3.2 / ratio))));
  const w = Math.round(h * ratio);
  return (
    <Image
      src={logo.src}
      alt={logo.name}
      width={w}
      height={h}
      sizes={`${w}px`}
      unoptimized={logo.src.endsWith(".svg")}
      draggable={false}
      className={cn(
        "block shrink-0 select-none",
        fluid ? "max-w-full" : "max-w-none",
        (mono || logo.onDark === "mono") && "logo-mono",
        className,
      )}
      style={fluid ? { width: w, height: "auto" } : { width: w, height: h }}
    />
  );
}
