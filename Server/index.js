const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const postsRouter = require("./routes/post");
const getPostRouter = require("./routes/getPost");
const userModel = require("./model/user.model"); // Import your user model here

const app = express();

// Middleware order is important
app.use(cors());
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only if using HTTPS in production
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // e.g. 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(userModel.createStrategy());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

// passport.serializeUser((user, done) => {
//   done(null, user.id); // store user id in session
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await userModel.findById(id);
//     done(null, user); // retrieve user by id and attach to req.user
//   } catch (err) {
//     done(err);
//   }
// });

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/coffeecoder", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/getPost", getPostRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
