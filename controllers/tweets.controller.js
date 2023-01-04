const Tweet = require("../database/models/tweet.model");

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await Tweet.find();
    res.render("tweets/tweet-list", { tweets });
  } catch (error) {
    next(error);
  }
};

exports.tweetForm = (req, res) => {
  res.render("tweets/tweet-form");
};

exports.tweetCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const newTweet = new Tweet(body);
    await newTweet.save();
    res.redirect("/");
  } catch (error) {
    const errors = Object.keys(error.errors).map(
      (key) => err.errors[key].message
    );
    res.status(400).render("tweets/tweet-form", { errors });
  }
};
