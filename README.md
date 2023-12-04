# Advent of Code 2023

This repository contains solutions for the Advent of Code 2023 puzzles, written in TypeScript. The application will not run under windows unless using WSL.

## Project Structure

The `dayX` directory is a template for each day's puzzle. When a new day is generated, a new directory is created based on this template. Each generated directory contains two TypeScript files (`part1.ts` and `part2.ts`) for the two parts of the day's puzzle.

## Dependencies

This project uses the following main dependencies:

- TypeScript
- Bun
- Commander.js
- Chalk

## Project Setup

1. Clone the repository
2. bun install

## Running the Code

To run a specific day's puzzle, first build the project using `bun run build`, then use the following command:

### Code Runner Help Output

```sh
Usage: advent [options] [command] <day>

Run a script for a specific day and part

Arguments:
  day                  Specify which day to run

Options:
  -V, --version        output the version number
  -p, --part <number>  Specify which part to run (1 or 2) (default: "1")
  -h, --help           display help for command

Commands:
  new <day>            Create a new day
```

Then add code to part1 and part2, and add the example data into the `example.txt` and your puzzleInput into the `puzzleInput.txt` for the day.
