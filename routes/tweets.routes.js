const router = require("express").Router();
const {
  tweetList,
  tweetForm,
  tweetCreate,
  tweetDelete,
} = require("../controllers/tweets.controller");
const Tweet = require("../database/models/tweet.model");

router.get("/", tweetList);

router.get("/new", tweetForm);

router.post("/", tweetCreate);

router.delete("/:tweetId", tweetDelete);
module.exports = router;
