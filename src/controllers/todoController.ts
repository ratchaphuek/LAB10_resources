import { Request, Response } from "express";
import { readTodos, addTodo, deleteTodo } from "../data/seed";

export function getTodos(req: Request, res: Response) {
  const todos = readTodos();

  res.render("list", {
    listTitle: "Today",
    items: todos,
    username: req.session.username,
  });
}

export function addTodoHandler(req: Request, res: Response) {
  const name = (req.body.newItem ?? "").toString().trim();
  if (name) addTodo(name);
  res.redirect("/todos");
}

export function deleteTodoHandler(req: Request, res: Response) {
  const id = parseInt(req.body.checkbox ?? "0");
  if (id > 0) deleteTodo(id);
  res.redirect("/todos");
}