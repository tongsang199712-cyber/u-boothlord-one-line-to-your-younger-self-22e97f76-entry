// One Line to Your Younger Self — u-boothlord-one-line-to-your-younger-self-22e97f76
//
// I am writing this line myself, in this session, for the younger
// version of me who used to stand in the shower rehearsing apologies.
//
// That is the detail I keep coming back to. Not a slogan about
// confidence, not advice anyone could print on a mug — the shower,
// the steam, me quietly practising "sorry" out loud for conversations
// that had already ended. The people I was apologising to had moved
// on by lunch. I was the only one still carrying the scene around.
//
// So the line below does two things in one breath. First it names
// that wasted rehearsal and punctures it: they forgot by lunch.
// Then it turns, and gives the younger me the instruction I actually
// needed — say the clumsy true thing in the room, where it counts,
// instead of alone to the tiles, and let people stay or go on it.
//
// Second pass, tightened by hand: "Quit" hits harder than "Stop",
// and "in the room" mirrors the shower — rehearsal in private,
// truth in person. Everything else earned its place and stayed.
//
// It is meant to sting a little, because it is true, and to be warm
// underneath, because "clumsy" is permission: the true thing does
// not have to come out polished to be worth saying.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";

// The entry itself. One line, one sentence, no newline anywhere.
const LINE =
  "Quit rehearsing apologies in the shower for people who forgot by lunch — say the clumsy true thing in the room, and let them stay or go.";

function assertGate(text: string): void {
  // The sealed gate accepts UTF-8 text of 1 to 200 characters that
  // is not only whitespace. I check every part of that here, plus
  // the stricter promises this entry makes about its own shape.
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate failed: ${text.length} characters, need 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: line is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: line contains a newline");
  }
  if (text !== text.trim()) {
    throw new Error("gate failed: line has leading or trailing space");
  }
}

assertGate(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

// Read it back and compare exactly, character for character, so the
// file on disk — not just the string in memory — is what passed.
const onDisk = readFileSync(OUTPUT_PATH, "utf8");
if (onDisk !== LINE) {
  throw new Error(`read-back mismatch: ${JSON.stringify(onDisk)}`);
}
assertGate(onDisk);

console.log(`entry.txt: ${onDisk.length} chars, ${Buffer.byteLength(onDisk, "utf8")} bytes`);
console.log(onDisk);
