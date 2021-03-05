require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('../database/dbFunctions.js');
const { generateAccessToken } = require('./utils/auth.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/../client/dist')));

// ********** ROUTES ********** //

// LATER ADD APIS FOR WHEN YOU'RE LOGGED IN BUT GO TO EITHER
// WELCOME PAGE, SIGN UP PAGE, OR LOGIN PAGE, YOU AUTOMATICALLY
// REDIRECT TO /DASHBOARD TO AVOID MULTIPLE CREATIONS OF REFRESH TOKENS

app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  // does database have refresh token? if no, send 403 status
  db.findRefreshToken(refreshToken, (err, data) => {
    if (err || data === undefined) {
      console.error(err);
      res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      // make sure to generate access token with the properties needed
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const accessToken = generateAccessToken(payload);
      res.json({ accessToken });
    });
  });
});

app.post('/signup', (req, res) => {
  db.signUpUser(req.body, (error, data) => {
    if (error) {
      console.error(error);
      res.sendStatus(404);
    }
    res.status(200).send(data);
    // REDIRECT TO /LOGIN
  });
});

app.delete('/logout', (req, res) => {
  // delete refresh token from database
  db.deleteRefreshToken(req.body.token, (err, data) => {
    if (err || data !== 1) {
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
    // create access and refresh token
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    // add refresh token to database
    db.addRefreshToken(refreshToken, (error, result) => {
      if (error || result !== 1) {
        console.error(error);
        res.sendStatus(404);
      }
      // send tokens to client
      res.json({ accessToken, refreshToken });
      // REDIRECT TO THE DASHBOARD PAGE
    });
  });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Meraki Auth Server is listening on port ${PORT}`);
});
