const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

// CREATE TASK

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  createTask
);

// GET TASKS

router.get(
  "/",
  authMiddleware,
  getTasks
);

// UPDATE TASK STATUS

router.put(
  "/:id",
  authMiddleware,
  updateTaskStatus
);

// DELETE TASK

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteTask
);

module.exports = router;