require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const verifyToken = require('./middleware/verifyToken.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/../client/dist')));

// ********** ROUTES ********** //

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  // DOES DATABASE HAVE REFRESH TOKEN? IF NO, SEND 403 STATUS
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    // MAKE SURE TO GENERATE ACCESS TOKEN WITH THE PROPERTIES NEEDED
    const accessToken = generateAccessToken({ id: user.id, username: user.username, email: user.email });
    res.json({ accessToken });
  });
});

app.post('/signup', (req, res) => {
  // sign up with first name, last name, email, and password
  // hash and salt password with bcrypt
  // enter User information into Users table
  // redirect to /login
});

app.delete('/logout', (req, res) => {
  // DELETE REFRESH TOKEN FROM DATABASE
  res.sendStatus(204);
});

app.post('/login', (req, res) => {
  // mock user, encrypt password with bcrypt, then get user from database
  const user = {
    id: 1,
    username: 'david',
    email: 'davidhk21@gmail.com',
  };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  // ADD REFRESH TOKEN TO DATABASE *************
  res.json({ accessToken, refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Meraki Auth Server is listening on port ${PORT}`);
});
