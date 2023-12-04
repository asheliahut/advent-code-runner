// read the input from puzzleInput.txt
// TEMPLATE REPLACE 1
import { join as pathJoin } from "node:path";

const dirname = import.meta.dir;

const readInput = async () => {
  return Bun.file(pathJoin(dirname, "example.txt")).text();
  // return Bun.file(pathJoin(dirname, "puzzleInput.txt")).text();
};

const writeOutput = async (output: string) => {
  await Bun.write(pathJoin(dirname, "part1.txt"), output);
};

const input: string = await readInput();
const lines: string[] = input.split("\n");
let output: string = "";

// TEMPLATE REPLACE 2

console.log(output);
await writeOutput(output);
