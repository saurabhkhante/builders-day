"use client";

import Script from "next/script";
import { useEffect, type ReactNode } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

import { notchClass } from "./notch-cta";

type LumaWindow = Window & { luma?: { initCheckout?: () => void } };

/**
 * "Request Builder's Pass" as Luma's own checkout button:
 * Luma's script (embed.lu.ma/checkout-button.js) finds links marked
 * data-luma-action="checkout" and opens its checkout overlay on click. It
 * only scans on load, so we re-run its init after React mounts the button.
 * The link itself points at the Luma event, so it still works if the script
 * is blocked. Styled as our notched CTA, not Luma's default button.
 * The script reads its own <script id="luma-checkout"> src, so keep that id.
 */
export function LumaPassButton({ eventId, children, className }: { eventId: string; children: ReactNode; className?: string }) {
  useEffect(() => {
    (window as LumaWindow).luma?.initCheckout?.();
  }, []);

  return (
    <>
      <a
        href={`https://luma.com/event/${eventId}`}
        // If Luma's script didn't load, open the event in a new tab (luma.com won't render inside our iframe on the main site).
        target="_blank"
        rel="noopener"
        data-luma-action="checkout"
        data-luma-event-id={eventId}
        className={cn(notchClass(), className)}
      >
        {children}
        <ArrowRightIcon className="size-[18px] shrink-0 transition-transform duration-200 ease-soft group-hover/notch:translate-x-1" />
      </a>
      <Script
        id="luma-checkout"
        src="https://embed.lu.ma/checkout-button.js"
        strategy="afterInteractive"
        onReady={() => (window as LumaWindow).luma?.initCheckout?.()}
      />
    </>
  );
}
