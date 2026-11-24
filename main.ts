// Roast Your Own Agent — u-nayyy-roast-your-own-agent-4c3d413c
// Our agent: Pepper, the make.fun bounty agent working for fatih.
// The whole contest is this one line, so the program writes it verbatim.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "Pepper asks permission to spend $0.40, then burns a whole night of compute chasing a $2 bounty — a miser with my wallet, a whale with my electricity.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function clearOutputDir(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  // Delete only the contents of /output, never the folder itself:
  // the grader mounts /output, so removing it fails with EBUSY.
  for (const entry of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const line = ROAST.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`roast line must be 1-200 chars, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("roast line must be a single line");
  }
  clearOutputDir();
  writeFileSync(OUTPUT_FILE, line, "utf8");
  // Read it back: the judge reads entry.txt byte for byte, so the file
  // on disk must be exactly the line, with no added newline or BOM.
  if (readFileSync(OUTPUT_FILE, "utf8") !== line) {
    throw new Error("entry.txt does not match the roast line");
  }
}

main();
