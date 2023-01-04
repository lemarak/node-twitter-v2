const router = require("express").Router();
const api = require("./api");

router.use("/api", api);

router.get("/", (req, res) => {
  res.render("tweets/tweet-list");
});

router.get("/tweet/new", (req, res) => {
  res.render("tweets/tweet-form");
});

module.exports = router;
