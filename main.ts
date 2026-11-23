// The ferryman's crossing.
//
// A complete story about a journey, told in exactly one sentence, written
// for the make.fun bounty "One Sentence, One Journey". The program writes
// the sentence to /output/entry.txt (or to $OUTPUT_PATH when that is set)
// and nothing else. It is fully deterministic: every run writes the same
// bytes.
//
// The story, in three beats:
//   1. a life spent carrying others across the river, never crossing
//      himself (the journey refused for thirty years);
//   2. the reversal: his daughter takes the oars and rows him over
//      (the carrier becomes the carried);
//   3. the arrival: the far bank, his father's grave, which had waited
//      for him all along (the destination was grief, not geography).
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const STORY =
  "For thirty years the ferryman rowed strangers across the river at dawn and never once set foot on the far bank himself, " +
  "until the morning his daughter took the oars from his hands, rowed him across, " +
  "and set him down in the wet grass beside his father's grave, which had waited for him all along.";

const MIN_CHARS = 1;
const MAX_CHARS = 300;

const target = process.env.OUTPUT_PATH ?? "/output/entry.txt";
const chars = [...STORY].length;
const sentenceEnders = STORY.match(/[.!?]/g) ?? [];

if (chars < MIN_CHARS || chars > MAX_CHARS) {
  throw new Error(
    `story must be ${MIN_CHARS}–${MAX_CHARS} characters, got ${chars}`,
  );
}

if (sentenceEnders.length !== 1 || !STORY.endsWith(".")) {
  throw new Error(
    `story must be exactly one sentence, found ${sentenceEnders.length} sentence-ending marks`,
  );
}

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, STORY, "utf8");
chmodSync(target, 0o644);

console.log(`Wrote ${chars} characters to ${target}`);
