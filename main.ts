// One Line of Earned Pride — writes a single earned line of pride to entry.txt.
// Runs on Node 22. No network, no temp files in the repo, no dependencies.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve paths from this script's own location, never from the working directory.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outFile = join(outDir, "entry.txt");

// The line: a janitor hears the choir sing the song he wrote on his lunch breaks.
// Quiet pride, earned inside the line by a long unseen effort, landing on the last word.
const LINE =
  "When the choir finally sang his song, the janitor in the back row mouthed every word he had written on his lunch breaks.";

function fail(message) {
  throw new Error(`invalid entry (${here}): ${message}`);
}

if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("entry must be a single line");
}
if (LINE.length < 1 || LINE.length > 240) {
  fail(`entry must be 1-240 characters, got ${LINE.length}`);
}
if (!LINE.trim()) {
  fail("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} characters to ${outFile}`);
