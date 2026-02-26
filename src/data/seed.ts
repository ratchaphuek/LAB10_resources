import fs from "fs";
import path from "path";

export type User = { id: number; username: string; password: string };
export type TodoItem = { id: number; name: string };

export const seedUsers: User[] = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

const filePath = path.join(__dirname, "todos.json");

export function readTodos(): TodoItem[] {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function writeTodos(todos: TodoItem[]) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

export function addTodo(name: string) {
  const todos = readTodos();
  const maxId = todos.reduce((m, it) => Math.max(m, it.id), 0);

  todos.push({ id: maxId + 1, name });

  writeTodos(todos);
}

export function deleteTodo(id: number) {
  const todos = readTodos().filter((it) => it.id !== id);
  writeTodos(todos);
}