const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// SIGNUP

exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,
      email,
      password: hashedPassword,
      role,

    });

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// LOGIN

exports.login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

const token = jwt.sign(

  {
    id: user._id,
    role: user.role,
    email: user.email,
  },
      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.json({ token });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// GET USERS

exports.getUsers = async (req, res) => {

  try {

    const users =
      await User.find()
      .select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// DELETE USER

exports.deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};