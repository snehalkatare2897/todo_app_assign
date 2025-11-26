const Todo = require("../models/todo");
const express = require("express");
const todoRouter = express.Router();
const { userAuth } = require("../middlewares/middlewareAuth");

todoRouter.post("/createTodo" ,userAuth,async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user.id
    });
    console.log(todo)
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

todoRouter.get("/gettodo",userAuth,async (req, res) => {
  if (req.user.role === "admin") {
    return res.json(await Todo.find());
  }
  res.json(await Todo.find({ owner: req.user.id }));
});

todoRouter.get("/:id",userAuth,async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).json({ message: "Not found" });

  if (todo.owner.toString() !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  res.json(todo);
});

todoRouter.patch("/:id",userAuth,async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).json({ message: "Not found" });

  if (todo.owner.toString() !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  Object.assign(todo, req.body);
  await todo.save();
  res.json(todo);
});

todoRouter.delete("/:id" ,userAuth,async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).json({ message: "Not found" });

  if (todo.owner.toString() !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  await todo.deleteOne();
  res.json({ message: "Deleted successfully" });
});

module.exports = todoRouter;
