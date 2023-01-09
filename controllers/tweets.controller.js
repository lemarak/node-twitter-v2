const {
  getTweets,
  getTweet,
  createTweet,
  updateTweet,
  deleteTweet,
} = require("../queries/tweets.queries");

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets();
    res.render("tweets/tweet", {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.tweetForm = (req, res, next) => {
  res.render("tweets/tweet-form", {
    tweet: {},
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

exports.tweetEdit = async (req, res, next) => {
  try {
    const tweetId = req.params.tweetId;
    const tweet = await getTweet(tweetId);
    res.render("tweets/tweet-form", {
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (error) {
    next(error);
  }
};

exports.tweetCreate = async (req, res, next) => {
  try {
    await createTweet({ ...req.body, author: req.user._id });
    res.redirect("/tweets");
  } catch (error) {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    res.status(400).render("tweets/tweet-form", {
      errors,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

exports.tweetUpdate = async (req, res, next) => {
  tweetId = req.params.tweetId;
  try {
    await updateTweet(tweetId, req.body);
    res.redirect("/tweets");
  } catch (error) {
    const errors = Object.keys(error.errors).map(
      (key) => error.errors[key].message
    );
    const tweet = await getTweet(tweetId);
    res.status(400).render("tweets/tweet-form", {
      errors,
      tweet,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
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
