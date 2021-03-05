const bcrypt = require('bcrypt');
const db = require('./index.js');

const signUpUser = (user, cb) => {
  const saltRounds = 10;
  bcrypt.hash(user.password, saltRounds)
    .then(hash => {
      const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4);';
      db.query(query, [user.firstName, user.lastName, user.email, hash])
        .then(res => {
          cb(null, res);
        })
        .catch(err => {
          cb(err, null);
        });
    })
    .catch(err => {
      cb(err, null);
    });
};

const findUser = (user, cb) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  db.query(query, [user.email])
    .then(res => {
      if (res.rows.length === 0) {
        throw new Error('No account with email exists');
      }
      const userInfo = res.rows[0];
      // bcrypt password from db and compare
      bcrypt.compare(user.password, userInfo.password)
        .then(result => {
          if (result) {
            cb(null, res.rows[0]);
          } else {
            throw new Error('Password does not match');
          }
        });
      // if same, send back, else throw error
    })
    .catch(err => {
      cb(err, null);
    });
};

const addRefreshToken = (token, cb) => {
  const query = 'INSERT INTO refresh_tokens (token) VALUES ($1);';
  db.query(query, [token])
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err, null);
    });
};

const deleteRefreshToken = (token, cb) => {
  const query = 'DELETE FROM refresh_tokens WHERE token = ($1);';
  db.query(query, [token])
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err, null);
    });
};

const findRefreshToken = (token, cb) => {
  const query = 'SELECT * FROM refresh_tokens WHERE token = $1;';
  db.query(query, [token])
    .then(res => {
      if (res.rows.length === 0) {
        throw new Error('refresh token does not exist');
      }
      cb(null, res);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports = {
  signUpUser,
  findUser,
  addRefreshToken,
  deleteRefreshToken,
  findRefreshToken,
};
