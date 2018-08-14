const mysql = require('mysql');
const credentials = require('./config');

const connection = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database
});

connection.connect(err => {
  if (err) {
    console.log('Error connecting to DB: ', err);
  } else {
      console.log('Connected to DB!');
  }
});

module.exports = connection;
