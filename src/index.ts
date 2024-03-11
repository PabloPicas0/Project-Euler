import inquirer from "inquirer";
import algorithms from "./algorithms/main.js";

type PromptType<T> = {
  [key: string]: T
}

const prompt = inquirer.createPromptModule();

const { pickedSet }: PromptType<string> = await prompt({
  type: "list",
  message: "Pick one problem form sets",
  name: "pickedSet",
  choices: ["1 - 100", "101 - 200", "201 - 300", "301 - 400", "401 - 480"],
});

const { pickedAlgorithm }: PromptType<string> = await prompt({
  type: "list",
  message: "Pick algorithm",
  pageSize: 10,
  name: "pickedAlgorithm",
  choices: Object.keys(algorithms[pickedSet]),
});

const algorithm = algorithms[pickedSet][pickedAlgorithm]

