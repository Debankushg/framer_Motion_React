var express = require("express");
var router = express.Router();
const userModel = require("../model/user.model");

router.post("/", async function (req, res, next) {
  let createdUser = await userModel.create({
    username: "debankush",
    password: "test123",
    post: [],
    email: "deb1@yopmail.com",
    fullName: "Debsh Patel",
  });
  res.send(createdUser);
});

module.exports = router;
