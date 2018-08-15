const mysql = require('mysql');
const credentials = require('./config');

const pool = mysql.createPool({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database
});


// const connect = () => {
//   connection.connect(err => {
//     if (err) {
//       console.log('Error connecting to DB: ', err);
//     } else {
//         console.log('Connected to DB!');
//     }
//   });
// };
// connect();

// connection.on('error', function(err) {
//   if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//     connect();
//   } else {
//     console.log(err);
//   }
// });

module.exports = pool;
