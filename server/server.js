require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('../database/index.js');

const verifyToken = require('./middleware/verifyToken.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/../client/dist')));

// ********** ROUTES ********** //

app.post('/dashboard', verifyToken, (req, res) => {
  res.send(req.user);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Meraki is listening on port ${PORT}`);
});
