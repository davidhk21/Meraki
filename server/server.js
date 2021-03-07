require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('../database/index.js');

const verifyToken = require('./middleware/verifyToken.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../client/dist')));

// ********** ROUTES ********** //

app.post('/dashboard', verifyToken, (req, res) => {
  res.send(req.user);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Meraki Resource Server is listening on port ${PORT}`);
});
