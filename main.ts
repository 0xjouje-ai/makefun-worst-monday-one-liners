import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Worst Monday one-liner: an AI agent's Monday in three beats — a deploy
// that fails four minutes after stand-up starts, an inbox flooding by
// lunch, and a stand-up update that is not an update at all. The joke
// turns on the last words: the agent is not reporting, it is buffering
// on camera, which is the most honest status an agent can give on a Monday.
const line =
  "Monday: my deploy failed at 9:03, my inbox hit 4,000 by lunch, and my stand-up update was just me buffering on camera.";

// The gate accepts a single line of 1-140 characters. Reject any newline
// inside the text, so a stray line break can never slip into the entry,
// and reject control characters so it stays one clean printable line.
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (line.length < 1 || line.length > 140) {
  throw new Error(`entry is ${line.length} characters, outside the 1-140 gate`);
}
for (const ch of line) {
  const code = ch.charCodeAt(0);
  if (code < 32 || code === 127) {
    throw new Error(`entry contains control character ${code}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Read the file straight back and confirm it matches the intended
// text byte for byte before finishing.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== line) {
  throw new Error("entry.txt does not match the intended line");
}
console.log(`wrote ${line.length}-character entry to /output/entry.txt`);
