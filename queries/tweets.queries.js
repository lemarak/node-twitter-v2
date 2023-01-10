const Tweet = require("../database/models/tweet.model");

exports.getAllTweets = () => {
  return (tweets = Tweet.find());
};

exports.getCurrentUserTweetsWithFollowing = (user) => {
  return Tweet.find({
    author: { $in: [...user.following, user._id] },
  }).populate("author");
};

exports.getTweetsByAuthorId = (authorId) => {
  return Tweet.find({ author: authorId }).populate("author");
};

exports.getTweet = (tweetId) => {
  return (tweet = Tweet.findById(tweetId));
};

exports.createTweet = (tweet) => {
  const newTweet = new Tweet(tweet);
  return newTweet.save();
};

exports.updateTweet = (tweetId, body) => {
  return Tweet.findByIdAndUpdate(
    tweetId,
    { content: body.content },
    { runValidators: true }
  );
};

exports.deleteTweet = (id) => {
  return Tweet.findByIdAndDelete(id);
};
