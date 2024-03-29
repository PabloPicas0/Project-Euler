import { exec } from "child_process";

import inquirer from "inquirer";
import algorithms from "./algorithms/main.ts";

type PromptsType<T> = {
  [key: string]: T;
};

const prompt = inquirer.createPromptModule();
const problemSets = ["1 - 100", "101 - 200", "201 - 300", "301 - 400", "401 - 480"];

const { isFastMode, testsEnabled }: PromptsType<Boolean> = await prompt([
  {
    type: "confirm",
    name: "isFastMode",
    message: "Enable fast algorithm picking ?",
  },
  {
    type: "confirm",
    name: "testsEnabled",
    message: "Enable tests after picking ?",
  },
]);

const { pickedSet, pickedAlgorithm }: PromptsType<string> = await prompt([
  {
    type: "list",
    message: "Pick one problem form sets",
    name: "pickedSet",
    choices: problemSets,
  },
  {
    type: isFastMode ? "input" : "list",
    message: "Pick algorithm",
    pageSize: 10,
    name: "pickedAlgorithm",
    validate: (input, anwsers) => {
      const { pickedSet } = anwsers;
      const algos = Object.keys(algorithms[pickedSet]);

      return algos.some((algo) => algo === input);
    },
    choices: (anwsers) => {
      const { pickedSet } = anwsers;

      return Object.keys(algorithms[pickedSet]);
    },
  },
]);

if (testsEnabled) {
  exec(`npm test --t ${pickedAlgorithm}.test`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Number of files ${stdout}`);
  });
}
