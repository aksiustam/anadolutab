const isUserAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const isAdminAuthenticated = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = { isUserAuthenticated, isAdminAuthenticated };
