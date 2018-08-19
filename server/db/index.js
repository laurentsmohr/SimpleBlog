const mysql = require('mysql')
const credentials = require('./config')

const pool = mysql.createPool({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
})

module.exports = pool
