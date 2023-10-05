const checkIsInRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      console.log("You must be logged in");
      return res.sendStatus(401);
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
      console.log("You do not have the required role");
      return res.sendStatus(401);
    }

    return next();
  };

module.exports = { checkIsInRole };
