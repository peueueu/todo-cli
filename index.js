#!/usr/bin/env node

import { addTask, readTask, updateTask, deleteTask } from "./commands/index.js";
import { Command } from "commander";

const program = new Command();

program.command("add").description("Create a new todo.").action(addTask);

program.command("read").description("Reads all the todos.").action(readTask);

program.command("update").description("Updates a todo.").action(updateTask);

program.command("delete").description("Deletes a todo.").action(deleteTask);

program.parse();
