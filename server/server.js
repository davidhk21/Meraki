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

app.get('/api/info', verifyToken, (req, res) => {
  res.send(req.user)
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Meraki Resource Server is listening on port ${PORT}`);
});
