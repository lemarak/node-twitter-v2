exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(" Connecté");
    next();
  } else {
    console.log("Pas connecté");
    res.redirect("/auth/signin/form");
  }
};
