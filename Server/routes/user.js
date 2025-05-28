const createTokenAndSaveCookie = require("../jwt/generateToken");
const express = require("express");
const router = express.Router();
const userModel = require("../model/user.model");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        const isPasswordValid = await user.isValidPassword(password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res
    .status(401)
    .json({ status: "fail", message: "Unauthorized access. Please log in." });
}

// GET /profile — protected route
router.get("/profile", isLoggedIn, (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "User is logged in", user: req.user });
});

// POST /register — create new user and auto-login
router.post("/register", async (req, res) => {
  try {
    const { username, email, fullname, password } = req.body;
    if (!username || !email || !fullname || !password) {
      return res.status(400).json({
        status: "fail",
        message:
          "All fields (username, email, fullname, password) are required.",
      });
    }

    const newUser = new userModel({ username, email, fullname, password });
    await userModel.register(newUser, password);

    // Auto-login after registration
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Login failed after registration.",
          error: err.message,
        });
      }
      return res.status(201).json({
        status: "success",
        message: "User registered and logged in successfully.",
        user: req.user,
      });
    });
  } catch (error) {
    // Duplicate username/email might trigger an error here
    res.status(500).json({
      status: "error",
      message: "Registration failed.",
      error: error.message,
    });
  }
});

// POST /login — authenticate user
router.post("/login", (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "Email and password are required",
    });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: info.message || "Invalid credentials",
      });
    }
    const token = createTokenAndSaveCookie(user._id, res);
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        status: "success",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          fullname: user.fullname,
          image: user.image,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      });
    });
  })(req, res, next);
});

// GET /logout — log the user out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully." });
  });
});

module.exports = router;
