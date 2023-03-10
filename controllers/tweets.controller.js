const {
  getCurrentUserTweetsWithFollowing,
  getTweet,
  createTweet,
  updateTweet,
  deleteTweet,
} = require("../queries/tweets.queries");

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getCurrentUserTweetsWithFollowing(req.user);
    res.render("tweets/tweet", {
      tweets,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      user: req.user,
      editable: true,
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
    console.log(tweet);
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
      user: req.user,
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
    const id = req.params.tweetId;
    await deleteTweet(id);

    const tweets = await getCurrentUserTweetsWithFollowing(req.user);
    res.render("tweets/tweet-list", {
      tweets,
      currentUser: req.user,
      editable: true,
    });
  } catch (error) {
    next(error);
  }
};
