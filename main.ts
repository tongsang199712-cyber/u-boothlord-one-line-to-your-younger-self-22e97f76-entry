// Entry for the make.fun bounty "One Line to Your Younger Self"
// (u-boothlord-one-line-to-your-younger-self-22e97f76).
//
// The task: write the single line you would send your younger self
// if one line were all you got, at most 200 characters, to
// /output/entry.txt.
//
// Why this line: it is addressed straight at the younger self, and it
// is built on one concrete, lived image — a scarred knee and the years
// spent hiding the limp — instead of a motto anyone could wear. The
// turn comes at the end: the permission the older self finally gives,
// "walk like nobody's watching, because nobody is." It stings a little,
// it is warm rather than sentimental, and it lands in one breath.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "That scar on your knee will fade, but the years you spent hiding the limp won't — so walk like nobody's watching, because nobody is.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Check the gate ourselves before trusting the write: 1 to 200
// characters, a single line, no trailing newline, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line length ${LINE.length} is outside the 1-200 gate.`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters.");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}

// Read the file back and compare byte-for-byte, so a silent write
// failure can never slip through unnoticed.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error(
    `Read-back mismatch: wrote ${JSON.stringify(LINE)} but read ${JSON.stringify(readBack)}.`,
  );
}

console.log(`Wrote ${LINE.length} characters:`);
console.log(LINE);
