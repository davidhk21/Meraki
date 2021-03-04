require('dotenv').config();
const { Pool } = require('pg');

const db = new Pool({
  host: 'localhost',
  user: process.env.DB_USER,
  database: 'meraki',
  password: process.env.DB_PASS,
  port: 5432,
  max: 10,
});

db.connect(() => {
  console.log('Connected to the Meraki Database!');
});

module.exports = db;
