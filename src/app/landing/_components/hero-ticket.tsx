/**
 * The hero pass for /landing. A sibling of the shared TicketStub, drawn so the
 * crimson offset is part of the SVG: it follows the ticket's own rounded
 * corners and notches instead of a CSS box-shadow that can't.
 */

const W = 128; // ticket body
const H = 180;
const OFF = 6; // crimson offset
const R = 10; // corner radius
const TEAR = 122; // tear line y
const NOTCH = 8;
const INK = "#3b2a12";

export function HeroTicket({
  kicker,
  lines,
  code,
  className,
}: {
  kicker: string;
  lines: readonly [string, string];
  code: string;
  className?: string;
}) {
  const bars = barcode(hash(`${lines.join(" ")}|${code}`));
  // One size for both lines, fitted to the longer one, so the title reads as a block.
  const longest = Math.max(...lines.map((l) => l.length));
  const size = Math.min(26, 96 / (longest * 0.7));

  return (
    <svg viewBox={`0 0 ${W + OFF} ${H + OFF}`} className={className} aria-hidden>
      <defs>
        <linearGradient id="hero-ticket-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e09c" />
          <stop offset="0.55" stopColor="#efcf7c" />
          <stop offset="1" stopColor="#dcb660" />
        </linearGradient>
        <mask id="hero-ticket-m" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
          <rect width={W} height={H} rx={R} fill="#fff" />
          <circle cx="0" cy={TEAR} r={NOTCH} fill="#000" />
          <circle cx={W} cy={TEAR} r={NOTCH} fill="#000" />
        </mask>
      </defs>

      {/* Offset, same silhouette as the ticket. */}
      <g transform={`translate(${OFF} ${OFF})`}>
        <rect width={W} height={H} rx={R} fill="var(--crimson)" mask="url(#hero-ticket-m)" />
      </g>

      <g mask="url(#hero-ticket-m)">
        <rect width={W} height={H} rx={R} fill="url(#hero-ticket-g)" />
        <rect x="6.5" y="6.5" width={W - 13} height={H - 13} rx={R - 4} fill="none" stroke={INK} strokeOpacity="0.2" />
      </g>

      <text
        x={W / 2}
        y="25"
        textAnchor="middle"
        fill={INK}
        fillOpacity="0.7"
        style={{ fontFamily: "var(--font-sans)", fontSize: 5.6, fontWeight: 700, letterSpacing: "0.22em" }}
      >
        {kicker.toUpperCase()}
      </text>
      <line x1="40" x2={W - 40} y1="33" y2="33" stroke={INK} strokeOpacity="0.25" strokeWidth="0.6" />

      <g fill={INK} textAnchor="middle" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: size }}>
        <text x={W / 2} y={TEAR / 2 + 4}>
          {lines[0].toUpperCase()}
        </text>
        <text x={W / 2} y={TEAR / 2 + 4 + size * 1.05}>
          {lines[1].toUpperCase()}
        </text>
      </g>

      {/* Tear line between the notches. */}
      <line
        x1={NOTCH + 5}
        x2={W - NOTCH - 5}
        y1={TEAR}
        y2={TEAR}
        stroke={INK}
        strokeOpacity="0.4"
        strokeWidth="1.2"
        strokeDasharray="0.1 4.4"
        strokeLinecap="round"
      />

      <g fill={INK}>
        {bars.map(([x, w]) => (
          <rect key={x} x={x} y={TEAR + 14} width={w} height="18" />
        ))}
      </g>
      <text
        x={W / 2}
        y={H - 14}
        textAnchor="middle"
        fill={INK}
        fillOpacity="0.8"
        style={{ fontFamily: "var(--font-sans)", fontSize: 6.2, fontWeight: 700, letterSpacing: "0.16em" }}
      >
        {code.toUpperCase()}
      </text>
    </svg>
  );
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic bars across the stub: [x, width] pairs. */
function barcode(seed: number): [number, number][] {
  const bars: [number, number][] = [];
  let s = seed || 1;
  let x = 24;
  while (x < W - 25) {
    s = (Math.imul(s, 1103515245) + 12345) >>> 0;
    const w = [0.8, 1.2, 1.8, 2.4][(s >>> 8) & 3];
    const gap = [1, 1.4, 2][(s >>> 12) % 3];
    if (x + w > W - 24) break;
    bars.push([Math.round(x * 10) / 10, w]);
    x += w + gap;
  }
  return bars;
}
