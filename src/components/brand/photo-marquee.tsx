import Image from "next/image";

import { Marquee } from "@/components/motion/marquee";
import { cn } from "@/lib/cn";
import type { PAST_PHOTOS } from "@/lib/brand";

const TILTS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-[3.5deg]", "-rotate-2", "rotate-1"];
const DROPS = ["translate-y-0", "translate-y-5", "-translate-y-2", "translate-y-3", "-translate-y-4", "translate-y-1"];

/**
 * Drifting polaroid strip of past-event photos. The photos are already cut
 * as white-framed polaroids; we grade them toward the palette and tilt them
 * a few degrees each.
 */
export function PhotoMarquee({
  photos,
  label = "Photos from past TPF events",
  seconds = 90,
}: {
  photos: typeof PAST_PHOTOS;
  label?: string;
  seconds?: number;
}) {
  return (
    <Marquee label={label} seconds={seconds} gap="gap-4 pr-4 md:gap-8 md:pr-8" fade={false} listClassName="py-10">
      {photos.map((photo, i) => (
        <li key={photo.src} className={cn("shrink-0", DROPS[i % DROPS.length])}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={300}
            height={300}
            sizes="(min-width: 768px) 300px, 210px"
            className={cn(
              "photo-grade size-[210px] drop-shadow-[0_22px_32px_rgba(0,0,0,0.4)] md:size-[300px]",
              TILTS[i % TILTS.length],
            )}
          />
        </li>
      ))}
    </Marquee>
  );
}
