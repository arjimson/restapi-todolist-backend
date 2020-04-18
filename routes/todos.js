const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// ROUTES
router.get("/", async (req, res) => {
  try {
    const posts = await Todo.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date
  });
  try {
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:todoId", async (req, res) => {
  try {
    const post = await Todo.findById(req.params.todoId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:todoId", async (req, res) => {
  try {
    const removedTodo = await Todo.remove({ _id: req.params.todoId });
    res.json(removedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:todoId", async (req, res) => {
  try {
    const updateTodo = await Todo.updateOne(
      {
        _id: req.params.todoId,
      },
      {
        $set: { title: req.body.title },
      }
    );
    res.json(updateTodo)
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
