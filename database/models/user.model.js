const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = schema({
  username: {
    type: String,
    required: true,
  },
  local: {
    email: { type: String, require: true },
    password: { type: String, required: true },
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
