"use client";

import { useEffect } from "react";

/**
 * Arriving on the page at #pass (the "Request Builder's Pass" button on
 * Requests for Builders links to the public page + #pass; the Webflow embed
 * passes the hash into the frame). Lands on the pass section and flags it
 * with data-arrived so globals.css plays a short "here it is" moment: the
 * ticket is dealt onto the table, the bloom behind it flares, the button
 * glows. Only on load with the hash, never on in-page clicks (HashLink
 * scrolls without reloading). Skipped for reduced motion in the CSS.
 */
export function PassArrival() {
  useEffect(() => {
    if (window.location.hash !== "#pass") return;
    const section = document.getElementById("pass");
    if (!section) return;
    // Land on it ourselves: the browser's own hash jump can run before fonts
    // and images settle, and it stacks the page's scroll-padding on the
    // section's scroll-margin (160px down). Here the section sits right under
    // the top bar so the ticket, perks and button get the most room.
    const land = () => {
      const bar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 64;
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY - bar, behavior: "instant" });
    };
    land();
    section.dataset.arrived = "true";
    const settle = window.setTimeout(land, 250);
    const done = window.setTimeout(() => delete section.dataset.arrived, 4000);
    return () => {
      window.clearTimeout(settle);
      window.clearTimeout(done);
    };
  }, []);
  return null;
}
