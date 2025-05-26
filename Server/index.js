const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Import routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const postsRouter = require("./routes/post"); // optional

// Middleware
app.use(express.json());

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
app.use("/createuser", usersRouter);
app.use("/createpost", postsRouter); // optional

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
