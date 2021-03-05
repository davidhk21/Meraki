const db = require('./index.js');

const findUser = (user, cb) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  db.query(query, [user.email])
    .then(res => {
      if (res.rows.length === 0) {
        throw new Error('No account with email exists');
      }
      const userInfo = res.rows[0];
      // bycrpt password from db and compare
      // if same, send back, else throw error
      if (userInfo.password === user.password) {
        cb(null, res.rows[0]);
      } else {
        throw new Error('Password does not match');
      }
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports = {
  findUser,
};
