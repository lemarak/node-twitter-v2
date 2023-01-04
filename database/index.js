const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/twitter-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connexion db OK ;)");
  })
  .catch((err) => console.log("Error:", err));
mongoose.set("strictQuery", true);
