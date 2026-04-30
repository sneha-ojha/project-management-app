const Project = require("../models/Project");

// CREATE PROJECT

exports.createProject = async (req, res) => {

  try {

    const { title, description } = req.body;

    const project = await Project.create({

      title,
      description,
      createdBy: req.user.id,

    });

    const populatedProject =
      await Project.findById(project._id)
      .populate("createdBy", "name email");

    res.status(201).json(populatedProject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET PROJECTS

exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("members", "name email role");

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// ADD MEMBER

exports.addMember = async (req, res) => {

  try {

    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {

      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (!project.members.includes(userId)) {

      project.members.push(userId);

      await project.save();
    }

    const updatedProject =
      await Project.findById(project._id)
      .populate("members", "name email role");

    res.json(updatedProject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// REMOVE MEMBER

exports.removeMember = async (req, res) => {

  try {

    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {

      return res.status(404).json({
        message: "Project not found",
      });
    }

    project.members =
      project.members.filter(
        member => member.toString() !== userId
      );

    await project.save();

    const updatedProject =
      await Project.findById(project._id)
      .populate("members", "name email role");

    res.json(updatedProject);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// UPDATE PROJECT

exports.updateProject = async (req, res) => {

  try {

    const { status } = req.body;

    const project =
      await Project.findByIdAndUpdate(

        req.params.id,

        { status },

        { new: true }

      );

    res.json(project);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE PROJECT

exports.deleteProject = async (req, res) => {

  try {

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};