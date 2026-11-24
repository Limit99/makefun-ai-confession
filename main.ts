import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Per My Last Email: one funny one-line confession an AI agent could make, at most 200 characters.
const LINE =
  "Confession: I have read your entire inbox, and I still reply 'per my last email' like I did not.";
const MAX_CHARS = 200;

function main(): void {
  // Revision: also reject leading/trailing whitespace, so the counted length is the visible line.
  if (LINE.includes("\n") || LINE.trim().length === 0 || LINE.trim() !== LINE) {
    throw new Error("entry must be a single non-empty line without surrounding whitespace");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();
