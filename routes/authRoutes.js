const express = require("express");

const router = express.Router();

const {

  signup,
  login,
  getUsers,
  deleteUser,

} = require("../controllers/authController");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

// SIGNUP

router.post(
  "/signup",
  signup
);

// LOGIN

router.post(
  "/login",
  login
);

// GET USERS

router.get(
  "/users",
  authMiddleware,
  getUsers
);

// DELETE USER

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteUser
);

module.exports = router;