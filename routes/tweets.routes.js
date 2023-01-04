const router = require("express").Router();
const {
  tweetList,
  tweetForm,
  tweetCreate,
} = require("../controllers/tweets.controller");
const Tweet = require("../database/models/tweet.model");

router.get("/", tweetList);

router.get("/new", tweetForm);

router.post("/", tweetCreate);

module.exports = router;
