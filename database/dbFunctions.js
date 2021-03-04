const db = require('./index.js');

const findUser = (email, cb) => {
  db.query('SELECT * FROM users WHERE email = $1', [email], (err, res) => {
    if (err) cb(err, null);
    cb(null, res.rows[0]);
  });
};

module.exports = {
  findUser,
};
