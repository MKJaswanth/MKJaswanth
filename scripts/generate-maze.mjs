import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const COLS = 21;
const ROWS = 9;
const CELL = 46;
const MAZE_X = 78;
const MAZE_Y = 120;
const WIDTH = 1122;
const HEIGHT = 590;
const OUTPUT = resolve(dirname(fileURLToPath(import.meta.url)), "../assets/qa-release-maze.svg");

const N = 0;
const E = 1;
const S = 2;
const W = 3;

function hashSeed(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function randomFromSeed(seed) {
  let state = hashSeed(seed);
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function isoWeekSeed(date = new Date()) {
  const utc = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const weekday = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - weekday);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((utc - yearStart) / 86400000 + 1) / 7);
  return `${utc.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function index(row, col) {
  return row * COLS + col;
}

function coordinates(cellIndex) {
  return { row: Math.floor(cellIndex / COLS), col: cellIndex % COLS };
}

function buildMaze(seed) {
  const random = randomFromSeed(seed);
  const walls = Array.from({ length: ROWS * COLS }, () => [true, true, true, true]);
  const visited = new Set([0]);
  const stack = [0];

  while (stack.length) {
    const current = stack.at(-1);
    const { row, col } = coordinates(current);
    const choices = [
      row > 0 && { next: index(row - 1, col), wall: N, opposite: S },
      col < COLS - 1 && { next: index(row, col + 1), wall: E, opposite: W },
      row < ROWS - 1 && { next: index(row + 1, col), wall: S, opposite: N },
      col > 0 && { next: index(row, col - 1), wall: W, opposite: E },
    ].filter((choice) => choice && !visited.has(choice.next));

    if (!choices.length) {
      stack.pop();
      continue;
    }

    const choice = choices[Math.floor(random() * choices.length)];
    walls[current][choice.wall] = false;
    walls[choice.next][choice.opposite] = false;
    visited.add(choice.next);
    stack.push(choice.next);
  }

  return walls;
}

function openNeighbors(cellIndex, walls) {
  const { row, col } = coordinates(cellIndex);
  return [
    !walls[cellIndex][N] && index(row - 1, col),
    !walls[cellIndex][E] && index(row, col + 1),
    !walls[cellIndex][S] && index(row + 1, col),
    !walls[cellIndex][W] && index(row, col - 1),
  ].filter((value) => value !== false);
}

function solveMaze(walls) {
  const start = 0;
  const finish = ROWS * COLS - 1;
  const queue = [start];
  const parent = new Map([[start, null]]);

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const current = queue[cursor];
    if (current === finish) break;
    for (const next of openNeighbors(current, walls)) {
      if (!parent.has(next)) {
        parent.set(next, current);
        queue.push(next);
      }
    }
  }

  const solution = [];
  for (let current = finish; current !== null; current = parent.get(current)) {
    solution.push(current);
  }
  return solution.reverse();
}

function pointFor(cellIndex) {
  const { row, col } = coordinates(cellIndex);
  return {
    x: MAZE_X + col * CELL + CELL / 2,
    y: MAZE_Y + row * CELL + CELL / 2,
  };
}

function mazeWallsPath(walls) {
  const segments = [];
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const cellIndex = index(row, col);
      const x = MAZE_X + col * CELL;
      const y = MAZE_Y + row * CELL;
      if (walls[cellIndex][N]) segments.push(`M${x} ${y}h${CELL}`);
      if (walls[cellIndex][W]) segments.push(`M${x} ${y}v${CELL}`);
      if (row === ROWS - 1 && walls[cellIndex][S]) segments.push(`M${x} ${y + CELL}h${CELL}`);
      if (col === COLS - 1 && walls[cellIndex][E]) segments.push(`M${x + CELL} ${y}v${CELL}`);
    }
  }
  return segments.join("");
}

function solutionPath(solution) {
  return solution.map((cellIndex, position) => {
    const { x, y } = pointFor(cellIndex);
    return `${position ? "L" : "M"}${x} ${y}`;
  }).join(" ");
}

function checkpoints(solution) {
  const labels = ["PLAN", "TEST", "TRIAGE", "VERIFY", "RELEASE"];
  return labels.map((label, position) => {
    const pathIndex = Math.round((solution.length - 1) * (position / (labels.length - 1)));
    const point = pointFor(solution[pathIndex]);
    const pillWidth = label.length * 8 + 22;
    const desiredX = point.x - pillWidth / 2;
    const x = Math.max(12, Math.min(WIDTH - pillWidth - 12, desiredX));
    const above = position % 2 === 0;
    const y = Math.max(84, Math.min(HEIGHT - 34, point.y + (above ? -38 : 18)));
    const color = position === labels.length - 1 ? "#86efac" : position === 0 ? "#8be8ec" : "#c4b5fd";
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
      <rect width="${pillWidth}" height="24" rx="12" fill="#091321" stroke="${color}" stroke-opacity=".65"/>
      <text x="${pillWidth / 2}" y="16" text-anchor="middle" fill="${color}" class="checkpoint">${label}</text>
    </g>`;
  }).join("\n    ");
}

function renderSvg(seed) {
  const walls = buildMaze(seed);
  const solution = solveMaze(walls);
  const wallsPath = mazeWallsPath(walls);
  const path = solutionPath(solution);
  const start = pointFor(solution[0]);
  const finish = pointFor(solution.at(-1));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">QA release maze</title>
  <desc id="desc">An animated quality signal travels from planning through testing, triage, verification, and release.</desc>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#07111f"/><stop offset="1" stop-color="#11102a"/></linearGradient>
    <linearGradient id="route" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#39d0d8"/><stop offset=".55" stop-color="#60a5fa"/><stop offset="1" stop-color="#a78bfa"/></linearGradient>
    <filter id="glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#8b949e" stroke-opacity=".045"/></pattern>
    <style>
      .mono{font:600 12px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:1.4px}.heading{font:800 24px Inter,Segoe UI,Arial,sans-serif}.checkpoint{font:700 10px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:1px}
      .runner{offset-path:path('${path}');offset-rotate:0deg;animation:travel 13s cubic-bezier(.65,0,.35,1) infinite}.dash{stroke-dasharray:7 10;animation:dash 9s linear infinite}.release{animation:pulse 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
      @keyframes travel{0%,4%{offset-distance:0%;opacity:0}7%{opacity:1}90%{offset-distance:100%;opacity:1}96%,100%{offset-distance:100%;opacity:0}}@keyframes dash{to{stroke-dashoffset:-170}}@keyframes pulse{50%{opacity:.35;transform:scale(1.35)}}
      @media(prefers-reduced-motion:reduce){.runner,.dash,.release{animation:none}.runner{offset-distance:100%;opacity:1}}
    </style>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" rx="24" fill="url(#background)"/>
  <rect x="1" y="1" width="${WIDTH - 2}" height="${HEIGHT - 2}" rx="23" fill="none" stroke="#2b3952"/>
  <rect width="${WIDTH}" height="${HEIGHT}" rx="24" fill="url(#grid)"/>
  <text x="${MAZE_X}" y="48" fill="#8be8ec" class="mono">QUALITY PIPELINE / ${seed}</text>
  <text x="${MAZE_X}" y="82" fill="#f0f6fc" class="heading">A release is earned one signal at a time.</text>
  <text x="${WIDTH - MAZE_X}" y="64" text-anchor="end" fill="#8b949e" class="mono">PLAN → TEST → TRIAGE → VERIFY → RELEASE</text>
  <path d="${wallsPath}" fill="none" stroke="#334155" stroke-width="2" stroke-linecap="round"/>
  <path d="${path}" fill="none" stroke="#17243a" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
  <path class="dash" d="${path}" fill="none" stroke="url(#route)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".72"/>
  <circle cx="${start.x}" cy="${start.y}" r="8" fill="#07111f" stroke="#39d0d8" stroke-width="3"/>
  <circle class="release" cx="${finish.x}" cy="${finish.y}" r="9" fill="#22c55e" filter="url(#glow)"/>
  <circle class="runner" cx="0" cy="0" r="13" fill="#39d0d8" opacity=".2" filter="url(#glow)"/>
  <circle class="runner" cx="0" cy="0" r="5" fill="#f0fdfa"/>
  ${checkpoints(solution)}
  <text x="${MAZE_X}" y="558" fill="#65758b" class="mono">RISK IDENTIFIED</text>
  <text x="${WIDTH - MAZE_X}" y="558" text-anchor="end" fill="#86efac" class="mono">RELEASE CONFIDENCE</text>
</svg>\n`;
}

const seed = process.env.MAZE_SEED || isoWeekSeed();
const svg = renderSvg(seed);
const normalizeLineEndings = (value) => value.replace(/\r\n/g, "\n");

if (process.argv.includes("--check")) {
  const current = await readFile(OUTPUT, "utf8");
  if (normalizeLineEndings(current) !== normalizeLineEndings(svg)) {
    console.error(`Maze asset is stale for seed ${seed}. Run: node scripts/generate-maze.mjs`);
    process.exitCode = 1;
  } else {
    console.log(`Maze asset is current for seed ${seed}.`);
  }
} else {
  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, svg, "utf8");
  console.log(`Generated ${OUTPUT} using seed ${seed}.`);
}
