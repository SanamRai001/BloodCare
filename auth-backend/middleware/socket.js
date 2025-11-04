module.exports = function (io) {
  return function (req, res, next) {
    try {
      req.io = io;
      next();
    } catch (err) {
      console.error("Socket middleware error:", err);
      next(err);
    }
  };
};
