const { app } = require("../app");
const passport = require("passport");
const { findUserByEmail, findUserById } = require("../queries/users.queries");
const LocalStrategy = require("passport-local").Strategy;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    if (user) {
      done(null, user);
    }
  } catch (error) {
    done(error);
  }
});

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);
        if (user) {
          const match = await user.comparePassword(password);
          if (match) {
            done(null, user);
          } else {
            done(null, false, { message: "Bad password" });
          }
        } else {
          done(null, false, { message: "User not found" });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
