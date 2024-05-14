import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";
import ora from "ora";
import chalk from "chalk";

async function input() {
  const answers = await inquirer.prompt([
    { name: "name", message: "Enter the name of the task: ", type: "input" },
    {
      name: "detail",
      message: "Enter the details of the task: ",
      type: "input",
    },
  ]);

  return answers;
}

const askQuestions = async () => {
  const todoArray = [];
  let loop = false;

  do {
    const userResponse = await input();
    todoArray.push(userResponse);
    const confirmQuestion = await inquirer.prompt([
      {
        name: "confirm",
        message: "Do you want to add more tasks?",
        type: "confirm",
      },
    ]);
    if (confirmQuestion.confirm) {
      loop = true;
    } else {
      loop = false;
    }
  } while (loop);

  return todoArray;
};

export default async function addTask() {
  try {
    const userResponse = await askQuestions();

    await connectDB();

    let spinner = ora("Creating the todos...").start();

    for (let task of userResponse) {
      await Todos.create(task);
    }

    spinner.stop();

    console.log(chalk.greenBright("Created the todos!"));

    await disconnectDB();
  } catch (error) {
    console.log(chalk.redBright("Ops, Something went wrong, Error: "), error);
    process.exit(1);
  }
}
