const admin = (req, res, next) => {
  if (req.user && req.user.role === "ADMIN") {
    next();
  } else {
    res.status(403);
    next(new Error("Not authorized as admin"));
  }
};

module.exports = { admin };
