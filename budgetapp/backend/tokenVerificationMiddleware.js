const jwt = require("jsonwebtoken");
const { tokenSecret } = require("./tokenSecretConstants");

function tokenVerificationMiddleware(req, res, next) {
  const token = req.headers.authorization;

  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    console.log(token, tokenSecret);
    const actualToken = token.split(" ")[1];
    const decoded = jwt.verify(actualToken, tokenSecret);
    console.log(decoded);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = tokenVerificationMiddleware;
