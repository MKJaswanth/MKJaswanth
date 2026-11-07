// Builds the profile header: a GitHub-style pull request whose CI checks
// turn green one by one. Writes a dark and a light version.
// Run: node scripts/build-header.mjs
import { writeFileSync, mkdirSync } from "node:fs";

const THEMES = {
  dark: {
    bg: "#0d1117", border: "#30363d", subtle: "#21262d", fg: "#e6edf3", muted: "#8b949e",
    link: "#4493f8", pillBg: "#388bfd26", pillFg: "#58a6ff", green: "#238636",
    yellow: "#d29922", btnOff: "#21262d", btnOffText: "#6e7681",
  },
  light: {
    bg: "#ffffff", border: "#d0d7de", subtle: "#d8dee4", fg: "#1f2328", muted: "#59636e",
    link: "#0969da", pillBg: "#ddf4ff", pillFg: "#0969da", green: "#1f883d",
    yellow: "#bf8700", btnOff: "#f6f8fa", btnOffText: "#8c959f",
  },
};

const SANS = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif`;
const MONO = `ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`;

const TITLE = "Hire MK Jaswanth as your next QA Engineer";
const CHECKS = [
  ["Manual testing", "exploratory, functional, regression"],
  ["Automation", "Playwright + pytest, Page Object Model"],
  ["API", "Postman, RBAC and access-control checks"],
  ["AI quality", "LLM output evaluation"],
  ["Location", "Coimbatore, India · open to remote"],
];

// Timeline (seconds). Each check passes at its time; everything resets near the end.
const DUR = 12;
const PASS_AT = [1.2, 2.1, 3.0, 3.9, 4.8];
const DONE_AT = 5.4;

const kt = (t) => (t / DUR).toFixed(4);
// Fade in (show=true) or out (show=false) at time t, then reset before the loop restarts.
const swap = (t, show) => {
  const v = show ? "0;0;1;1;0;0" : "1;1;0;0;1;1";
  return `<animate attributeName="opacity" values="${v}" keyTimes="0;${kt(t)};${kt(t + 0.15)};0.95;0.97;1" dur="${DUR}s" repeatCount="indefinite"/>`;
};

function build(c) {
  const check = (cx, cy, r) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c.green}"/>` +
    `<path d="M${cx - r * 0.45} ${cy} l${r * 0.3} ${r * 0.32} l${r * 0.6} -${r * 0.62}" fill="none" stroke="#ffffff" stroke-width="${Math.max(2, r / 5)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const spinner = (cx, cy, r) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c.yellow}" stroke-opacity="0.35" stroke-width="2.5"/>` +
    `<path d="M${cx} ${cy - r} a${r} ${r} 0 0 1 ${r} ${r}" fill="none" stroke="${c.yellow}" stroke-width="2.5" stroke-linecap="round">` +
    `<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="0.9s" repeatCount="indefinite"/></path>`;

  // Base opacity shows the finished state, so viewers without animation see all checks passed.
  const rows = CHECKS.map(([name, desc], i) => {
    const y = 236 + i * 38;
    return `
  <line x1="56" y1="${y}" x2="1144" y2="${y}" stroke="${c.subtle}"/>
  <g opacity="0">${swap(PASS_AT[i], false)}${spinner(84, y + 19, 8)}</g>
  <g>${swap(PASS_AT[i], true)}${check(84, y + 19, 9)}</g>
  <text x="108" y="${y + 24}" font-size="14"><tspan fill="${c.fg}" font-weight="600">${name}</tspan><tspan fill="${c.muted}"> — ${desc}</tspan></text>
  <text x="1040" y="${y + 24}" font-size="13" fill="${c.muted}" text-anchor="end">Successful${swap(PASS_AT[i], true)}</text>
  <text x="1124" y="${y + 24}" font-size="13" fill="${c.link}" text-anchor="end">Details</text>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520" font-family="${SANS}" role="img" aria-labelledby="title desc">
  <title id="title">${TITLE}</title>
  <desc id="desc">A GitHub-style pull request. Five checks pass one by one: ${CHECKS.map(([n, d]) => `${n} (${d})`).join("; ")}. Then the merge button turns green.</desc>
  <rect width="1200" height="520" fill="${c.bg}"/>

  <text x="56" y="70" font-size="30" font-weight="600" fill="${c.fg}">${TITLE} <tspan fill="${c.muted}" font-weight="400">#1</tspan></text>

  <rect x="56" y="94" width="84" height="30" rx="15" fill="${c.green}"/>
  <g fill="none" stroke="#ffffff" stroke-width="1.6">
    <circle cx="76" cy="103" r="2.6"/><circle cx="76" cy="115" r="2.6"/><line x1="76" y1="105.6" x2="76" y2="112.4"/>
    <circle cx="88" cy="115" r="2.6"/><path d="M88 112.4 V106 a3 3 0 0 0 -3 -3 h-2"/>
  </g>
  <text x="98" y="114" font-size="14" font-weight="600" fill="#ffffff">Open</text>
  <text x="154" y="114" font-size="15" fill="${c.muted}"><tspan fill="${c.fg}" font-weight="600">MKJaswanth</tspan> wants to merge into</text>
  <rect x="386" y="97" width="132" height="24" rx="6" fill="${c.pillBg}"/>
  <text x="452" y="114" font-family="${MONO}" font-size="13" fill="${c.pillFg}" text-anchor="middle">your-team:main</text>
  <text x="528" y="114" font-size="15" fill="${c.muted}">from</text>
  <rect x="566" y="97" width="196" height="24" rx="6" fill="${c.pillBg}"/>
  <text x="664" y="114" font-family="${MONO}" font-size="13" fill="${c.pillFg}" text-anchor="middle">mkjaswanth:qa-engineer</text>

  <line x1="24" y1="148" x2="1176" y2="148" stroke="${c.subtle}"/>

  <rect x="56" y="172" width="1088" height="254" rx="6" fill="none" stroke="${c.border}"/>
  <g opacity="0">${swap(DONE_AT, false)}
    ${spinner(92, 204, 14)}
    <text x="124" y="200" font-size="16" font-weight="600" fill="${c.fg}">Some checks haven’t completed yet</text>
    <text x="124" y="222" font-size="13" fill="${c.muted}">Running QA checks on this candidate…</text>
  </g>
  <g>${swap(DONE_AT, true)}
    ${check(92, 204, 16)}
    <text x="124" y="200" font-size="16" font-weight="600" fill="${c.fg}">All checks have passed</text>
    <text x="124" y="222" font-size="13" fill="${c.muted}">${CHECKS.length} successful checks</text>
  </g>
  ${rows}

  <rect x="56" y="452" width="196" height="38" rx="6" fill="${c.btnOff}" stroke="${c.border}"/>
  <g>${swap(DONE_AT, true)}<rect x="56" y="452" width="196" height="38" rx="6" fill="${c.green}"/></g>
  <text x="154" y="476" font-size="14" font-weight="600" fill="#ffffff" text-anchor="middle">Merge pull request
    <animate attributeName="fill" values="${c.btnOffText};${c.btnOffText};#ffffff;#ffffff;${c.btnOffText};${c.btnOffText}" keyTimes="0;${kt(DONE_AT)};${kt(DONE_AT + 0.15)};0.95;0.97;1" dur="${DUR}s" repeatCount="indefinite"/>
  </text>
  <text x="272" y="476" font-size="14" fill="${c.muted}">This branch has no conflicts with the base branch.</text>
</svg>
`;
}

mkdirSync("assets", { recursive: true });
for (const [name, colors] of Object.entries(THEMES)) {
  writeFileSync(`assets/header-${name}.svg`, build(colors));
  console.log(`wrote assets/header-${name}.svg`);
}
