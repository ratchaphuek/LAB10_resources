import express, { Request, Response } from "express";
import session from "express-session";
import path from "path";
import { requireLogin } from "./middleware/requireLogin";
import { login, logout } from "./controllers/authController";
import {
  getTodos,
  addTodoHandler,
  deleteTodoHandler,
} from "./controllers/todoController";

const app = express();
const PORT = 3000;

/**  Step 1: Configure Express + EJS + Static files */
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

/**  Step 2: Configure session middleware (MemoryStore) */
// Session middleware (MemoryStore by default) — for learning/demo only
app.use(
  session({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 1000 },
  }),
);

// home page
app.get("/", (req: Request, res: Response) => {
  let error = "";

  if (req.query.q === "invalid") {
    error = "Invalid username or password";
  }

  if (req.query.q === "need-login") {
    error = "Please login first";
  }

  res.render("index", { error });
});

/**  Step 3: Implement login with seed users 
Step 5: Implement ToDo CRUD with seed data 
 ToDo list page (protected)
 Add item (protected)
 Delete item (protected)
Step 6: Logout 
Challenge 1: Move login/logout handlers to authController.ts */
app.post("/login", login);
app.get("/todos", requireLogin, getTodos);
app.post("/add", requireLogin, addTodoHandler);
app.post("/delete", requireLogin, deleteTodoHandler);
app.post("/logout", requireLogin, logout);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
