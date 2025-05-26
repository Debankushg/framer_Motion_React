var express = require("express");
var router = express.Router();
const postModel = require("../model/post.model");

router.post("/", async function (req, res, next) {
  let createdPost = await postModel.create({
    createdAt: Date.now(),
    postText: "hello How are you",
    likes: [],
  });
  res.send(createdPost);
});

module.exports = router;
