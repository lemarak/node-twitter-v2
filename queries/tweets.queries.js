const Tweet = require("../database/models/tweet.model");

exports.getTweets = () => {
  return (tweets = Tweet.find());
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
  return Tweet.deleteOne({ id });
};
