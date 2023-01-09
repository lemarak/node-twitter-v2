const { createUser } = require("../queries/users.queries");

exports.signupForm = (req, res, next) => {
  res.render("users/user-form", { errors: null });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.redirect("/tweets");
  } catch (error) {
    res.render("users/user-form", { error: [e.message] });
  }
};
