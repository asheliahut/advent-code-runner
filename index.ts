import { Command } from "@commander-js/extra-typings";
import chalk from "chalk";
import { join as pathJoin } from "node:path";

const program = new Command();
program.version("1.0.0");

const rootPath = import.meta.dir;

async function runFile(filePath: string, day: string, part: number) {
  console.log(
    chalk.green(`Running day ${day} part ${part}\n\n------Output------`)
  );
  const proc = Bun.spawn(["bun", "run", filePath], {
    onExit(_proc, _exitCode, _signalCode, error) {
      if (error) {
        console.error(chalk.red(`Process exited with error: ${error}`));
      }
    },
  });

  const childProcOutput = await new Response(proc.stdout).text();

  console.log(chalk.green(childProcOutput));
}

program
  .command("new")
  .argument("<day>", "Specify a new day to create")
  .description("Create a new day")
  .action(async (day: string) => {
    if (isNaN(parseInt(day))) {
      console.error(chalk.red(`Day must be a number!`));
      return;
    }

    const theDay = parseInt(day);

    if (theDay < 1 || theDay > 25) {
      console.error(chalk.red(`Day must be between 1 and 25!`));
      return;
    }

    // Create the directory cloning the template directory dayX
    const dayDir = `day${day.padStart(2, "0")}`;
    const dayDirPath = pathJoin(rootPath, dayDir);
    const templateDirPath = pathJoin(rootPath, "dayX");

    const copyProc = Bun.spawn(["cp", "-r", templateDirPath, dayDirPath], {
      onExit(_proc, _exitCode, _signalCode, error) {
        if (error) {
          console.error(chalk.red(`Process exited with error: ${error}`));
        }
      },
    });

    await copyProc.exited;

    // replace template strings in the files
    const part1FilePath = pathJoin(dayDirPath, "part1.ts");
    const part2FilePath = pathJoin(dayDirPath, "part2.ts");

    const part1File = await Bun.file(part1FilePath).text();
    const part2File = await Bun.file(part2FilePath).text();

    let part1FileReplaced = part1File.replaceAll(
      "TEMPLATE REPLACE 1",
      `Advent of Code 2023 day ${theDay} part 1`
    );
    part1FileReplaced = part1FileReplaced.replaceAll(
      "TEMPLATE REPLACE 2",
      `Begin day ${theDay} part 1 code`
    );

    let part2FileReplaced = part2File.replaceAll(
      "TEMPLATE REPLACE 1",
      `Advent of Code 2023 day ${theDay} part 2`
    );
    part2FileReplaced = part2FileReplaced.replaceAll(
      "TEMPLATE REPLACE 2",
      `Begin day ${theDay} part 2 code`
    );

    await Bun.write(part1FilePath, part1FileReplaced);
    await Bun.write(part2FilePath, part2FileReplaced);
  });

program
  .argument("<day>", "Specify which day to run")
  .description("Run a script for a specific day and part")
  .option("-p, --part <number>", "Specify which part to run (1 or 2)", "1")
  .action((day: string, options) => {
    if (day === "new")
      if (isNaN(parseInt(day))) {
        console.error(chalk.red(`Day must be a number!`));
        return;
      }

    const theDay = parseInt(day);
    const part = parseInt(options.part);

    if (theDay < 1 || theDay > 25) {
      console.error(chalk.red(`Day must be between 1 and 25!`));
      return;
    }

    if (isNaN(part)) {
      console.error(chalk.red(`Part must be a number!`));
      return;
    }

    if (part < 1 || part > 2) {
      console.error(chalk.red(`Part must be 1 or 2!`));
      return;
    }

    const dayDir = `day${day.padStart(2, "0")}`;
    const filePath = pathJoin(rootPath, dayDir, `part${options.part}.ts`);
    runFile(filePath, day, part);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
