"use client";

import { useId, useState, type ReactNode } from "react";

import { ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/** FAQ accordion, same pattern as /faq: serif question, grid-rows 0fr to 1fr, chevron in a soft circle. */
export function FaqList({ items }: { items: readonly { q: string; a: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <ul className="border-t border-rule">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <li key={item.q} className="border-b border-rule">
            <h3>
              <button
                id={`${id}-q`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-a`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group/q flex min-h-16 w-full items-start justify-between gap-6 py-5 text-left md:py-6"
              >
                <span className="font-serif text-[20px] leading-[1.3] text-pretty text-ink md:text-[24px]">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-[28px] shrink-0 place-items-center rounded-full text-ink",
                    "transition-[transform,background-color] duration-500 ease-soft",
                    isOpen ? "rotate-180 bg-rule-strong" : "bg-glass group-hover/q:bg-rule-strong",
                  )}
                >
                  <ChevronDownIcon className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a`}
              role="region"
              aria-labelledby={`${id}-q`}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-soft",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="max-w-[60ch] pr-10 pb-6 text-[16px] leading-relaxed text-muted md:pb-8 md:text-[17px]">
                  {item.a}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
