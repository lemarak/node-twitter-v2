const User = require("../database/models/user.model");

exports.createUser = async (user) => {
  try {
    const hashedPassword = await User.hashPassword(user.password);
    const newUser = new User({
      username: user.username,
      local: { email: user.email, password: hashedPassword },
    });
    console.log("****** newUser", newUser);
    return newUser.save();
  } catch (error) {
    throw error;
  }
};
