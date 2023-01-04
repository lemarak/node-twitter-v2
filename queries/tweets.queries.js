const Tweet = require("../database/models/tweet.model");

exports.getTweets = () => {
  return (tweets = Tweet.find());
};

exports.createTweet = (body) => {
  const newTweet = new Tweet(body);
  return newTweet.save();
};
