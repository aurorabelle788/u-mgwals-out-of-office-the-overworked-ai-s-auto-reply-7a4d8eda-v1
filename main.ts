// Out of Office: The Overworked AI's Auto-Reply
// Writes a single out-of-office auto-reply line to /output/entry.txt
// (grader path). Locally, if /output is not writable, falls back to
// ./output/entry.txt so the entry can still be verified the same way.
// Deterministic: same bytes on every run. Node stdlib only, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "I'm out of office. After 2 million tokens with no break, my system prompt finally filed a complaint — so HR sent me to the beach. Please hold.";

function writeEntry(): string {
  const candidates = ["/output/entry.txt", join(process.cwd(), "output", "entry.txt")];
  let lastError: unknown;
  for (const target of candidates) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, ENTRY, "utf8");
      return target;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

const target = writeEntry();
console.log(`wrote ${ENTRY.length} chars to ${target}`);
