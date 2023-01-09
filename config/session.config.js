const { app } = require("../app");
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 3600 * 24 * 14,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/twitter-app",
      ttl: 3600 * 24 * 14,
    }),
  })
);
