const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.user.token;
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY || "ShH_SeCrEt_StUfF"
    );
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else next(userId);
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
