const db = require('./index.js');

const findUser = (user, cb) => {
  db.query('SELECT * FROM users WHERE email = $1 AND password = $2;', [user.email, user.password], (err, res) => {
    if (err) {
      cb(err, null);
      console.log('HELLOOOOOO');
    }
    cb(null, res.rows[0]);
  });
};

module.exports = {
  findUser,
};
