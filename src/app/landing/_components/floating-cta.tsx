"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { EASE } from "@/components/motion/ease";
import { HashLink } from "@/components/shell/hash-link";

import { CountdownPill } from "./countdown";
import { NOTCH } from "./notch-cta";
import { cn } from "@/lib/cn";

/**
 * Floating countdown + pass link (TPF's countdown pill). Shows once the hero
 * is off screen and hides again when the pass section or the final CTA is
 * in view, so there's
 * never two of the same button on screen. On phones it's a full-width bar
 * at the bottom (easy to reach with a thumb); from md up it's the pill in
 * the corner. /landing has no tab bar, so it sits on the safe-area inset.
 */
export function FloatingCta({
  hash,
  publicUrl,
  label,
  countdownLabel,
}: {
  hash: `#${string}`;
  /** Public page this one is framed on: the link shows publicUrl + hash, never vercel.app. */
  publicUrl: string;
  label: string;
  countdownLabel: string;
}) {
  const [heroGone, setHeroGone] = useState(false);
  const [finalShown, setFinalShown] = useState(false);
  const [passShown, setPassShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("landing-hero");
    const final = document.getElementById("landing-final");
    const pass = document.getElementById("pass");
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroGone(!e.isIntersecting);
        if (e.target === pass) setPassShown(e.isIntersecting);
      }
    });
    if (hero) io.observe(hero);
    if (pass) io.observe(pass);
    // The final CTA counts as shown once its top is on screen, and stays shown
    // over the footer below it (the bar would cover footer links). Read on
    // scroll rather than by IntersectionObserver, which misses a jump from the
    // footer back up past it (no crossing, so no callback).
    let raf = 0;
    const checkFinal = () => {
      raf = 0;
      if (final) setFinalShown(final.getBoundingClientRect().top < window.innerHeight);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(checkFinal);
    };
    checkFinal();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const show = heroGone && !finalShown && !passShown;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="float"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+16px)] z-30 flex justify-center px-4 md:bottom-6 md:justify-end md:px-8"
        >
          <div className={cn("flex w-full items-center gap-2 md:w-auto bg-[rgba(18,26,23,0.9)] p-1.5 backdrop-blur-xl [filter:drop-shadow(0_14px_28px_rgba(0,0,0,0.45))]", NOTCH)}>
            {/* Wrapper does the hiding: cn() doesn't merge, so "hidden" on the pill loses to its own inline-flex. */}
            <span className="hidden sm:inline-flex">
              <CountdownPill label={countdownLabel} className="border-0 bg-transparent backdrop-blur-none" />
            </span>
            <HashLink
              hash={hash}
              publicUrl={publicUrl}
              className={cn("group inline-flex min-h-12 flex-1 items-center justify-center gap-2 md:min-h-11 md:flex-none bg-crimson px-5 text-[14px] font-medium tracking-[0.04em] text-ink uppercase transition-colors duration-200 ease-soft hover:bg-crimson-hover", NOTCH)}
            >
              {label}
              <ArrowRightIcon className="size-4 transition-transform duration-200 ease-soft group-hover:translate-x-1" />
            </HashLink>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
