require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
// const db = require('../database/index.js');

const verifyToken = require('./middleware/verifyToken.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../client/dist')));

// ********** ROUTES ********** //

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  });
});

app.get('/dashboard', (req, res) => {
  console.log('COOKIES!!', req.cookies)
  res.send(req.user);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Meraki Resource Server is listening on port ${PORT}`);
});
