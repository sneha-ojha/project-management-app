const Task = require("../models/Task");

// CREATE TASK

exports.createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      assignedTo,
      projectId,
      priority,
      dueDate,
    } = req.body;

    const task = await Task.create({

      title,
      description,
      assignedTo,
      project: projectId,
      priority,
      dueDate,

    });

    const populatedTask =
      await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.status(201).json(populatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET TASKS

exports.getTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE TASK STATUS

exports.updateTaskStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const task =
      await Task.findByIdAndUpdate(

        req.params.id,

        { status },

        { new: true }

      )
      .populate("assignedTo", "name email");

    res.json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE TASK

exports.deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};