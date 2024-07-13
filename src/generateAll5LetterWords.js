// run this file using: node generateAll5LetterWords.js

// this script uses the twl06 scrabble word list to generate a TypeScript object like { word1: true, word2: true, ... } - that is, a list of all valid 5 letter english words.
// this object is useful, because in Wordle, you are only allowed to submit valid 5 letter words.

import { readFile, writeFile } from "fs";

readFile("twl06.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  }

  const lines = data
    .toUpperCase()
    .split(/\r?\n/)
    .filter((i) => i.length === 5)
    .map((i) => `'${i.toUpperCase()}':true,`)
    .join("\n");

  writeFile("all5LetterWords.ts", lines, (err) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
});
