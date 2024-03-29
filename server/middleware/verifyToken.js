require('dotenv').config();
const jwt = require('jsonwebtoken');

// Verify Token
// function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) return res.sendStatus(403);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

function verifyToken(req, res, next) {
  const accessToken = req.cookies.accessToken;
  if (accessToken === undefined) return res.sendStatus(403);

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    console.log('USER: ', req.user)
    next();
  });
}

module.exports = verifyToken;
