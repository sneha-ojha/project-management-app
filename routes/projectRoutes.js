const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

const {

  createProject,
  getProjects,
  addMember,
  removeMember,
  updateProject,
  deleteProject,

} = require("../controllers/projectController");

// CREATE PROJECT

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  createProject
);

// GET PROJECTS

router.get(
  "/",
  authMiddleware,
  getProjects
);

// ADD MEMBER

router.put(
  "/:id/add-member",
  authMiddleware,
  roleMiddleware("Admin"),
  addMember
);

// REMOVE MEMBER

router.put(
  "/:id/remove-member",
  authMiddleware,
  roleMiddleware("Admin"),
  removeMember
);

// UPDATE PROJECT

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  updateProject
);

// DELETE PROJECT

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteProject
);

module.exports = router;