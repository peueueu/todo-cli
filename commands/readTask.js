import chalk from "chalk";
import ora from "ora";

import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/TodoSchema.js";

export default async function readTask() {
  try {
    await connectDB();

    const spinner = ora("Fetching all todos...").start();

    const todos = await Todos.find({});

    spinner.stop();

    if (!todos.length) {
      console.log(chalk.blueBright("You do not have any tasks yet!"));
    } else {
      for (let task of todos) {
        console.log(
          chalk.cyanBright("Todo Code: "),
          `${task.code}\n`,
          chalk.blueBright("Name: "),
          `${task.name}\n`,
          chalk.yellowBright("Description: "),
          `${task.detail}\n`
        );
      }

      await disconnectDB();
    }
  } catch (error) {
    console.log(chalk.redBright("Ops, Something went wrong! Error: "), error);
    process.exit(1);
  }
}
