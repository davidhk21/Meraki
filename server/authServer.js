require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('../database/dbFunctions.js');

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
  // does database have refresh token? if no, send 403 status
  db.findRefreshToken(refreshToken, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      // MAKE SURE TO GENERATE ACCESS TOKEN WITH THE PROPERTIES NEEDED
      const payload = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
      };
      const accessToken = generateAccessToken(payload);
      res.json({ accessToken });
    });
  });
});

app.post('/signup', (req, res) => {
  // sign up with first name, last name, email, and password
  // hash and salt password with bcrypt
  // enter User information into Users table
  // redirect to /login
});

app.delete('/logout', (req, res) => {
  // delete refresh token from database
  db.deleteRefreshToken(req.body.token, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    }
    res.sendStatus(204);
    // REDIRECT BACK TO WELCOME PAGE
  });
});

app.post('/login', (req, res) => {
  db.findUser(req.body, (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(404);
    }

    const payload = {
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    // add refresh token to database
    db.addRefreshToken(refreshToken, (error, result) => {
      if (error) {
        console.error(error);
        res.sendStatus(404);
      }
      res.json({ accessToken, refreshToken });
    });
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
}

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Meraki Auth Server is listening on port ${PORT}`);
});
