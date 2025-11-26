const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const header = req.headers.authorization;
  console.log("header",header)
  if (!header)
    return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];
  console.log("token",token)

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = {userAuth}
