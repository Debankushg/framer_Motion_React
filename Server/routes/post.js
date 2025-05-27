var express = require("express");
var router = express.Router();
const postModel = require("../model/post.model");
const userModel = require("../model/user.model");

router.post("/", async function (req, res, next) {
  let createdPost = await postModel.create({
    postText: "hello How are you",
    user: "6835435caaad8b5fb4b3cb59",
  });
  let user = await userModel.findOne({ _id: "6835435caaad8b5fb4b3cb59" });
  user.posts.push(createdPost._id);
  await user.save();
  res.send(createdPost);
});

module.exports = router;
