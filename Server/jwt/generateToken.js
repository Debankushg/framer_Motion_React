const jwt = require("jsonwebtoken");

const JWT_SECRET = "your-secret-key"; // <-- set your secret here

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return token; // <-- Return the token here
};
module.exports = createTokenAndSaveCookie;
