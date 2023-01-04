const {
  getTweets,
  createTweet,
  deleteTweet,
} = require("../queries/tweets.queries");

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets();
    res.render("tweets/tweet", { tweets });
  } catch (error) {
    next(error);
  }
};

exports.tweetForm = (req, res) => {
  res.render("tweets/tweet-form");
};

exports.tweetCreate = async (req, res, next) => {
  try {
    await createTweet(req.body);
    res.redirect("/tweets");
  } catch (error) {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    res.status(400).render("tweets/tweet-form", { errors });
  }
};

exports.tweetDelete = async (req, res, next) => {
  try {
    await deleteTweet(req.params.tweetId);
    const tweets = await getTweets();
    res.render("tweets/tweet-list", { tweets });
  } catch (error) {
    next(error);
  }
};
