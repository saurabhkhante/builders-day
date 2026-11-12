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
    // Land on it ourselves too: the browser's own hash jump can run before
    // fonts and images settle and leave it a little off.
    const land = () => section.scrollIntoView({ block: "start" });
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
