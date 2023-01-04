const mongoose = require("mongoose");
const schema = mongoose.Schema;

const tweetSchema = schema({
  content: {
    type: String,
    maxlength: [140, "trop long"],
    minlength: [2, "trop court"],
    required: true,
  },
});

const Tweet = mongoose.model("tweet", tweetSchema);

module.exports = Tweet;
