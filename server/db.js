const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5433,
  database: process.env.DB_DATABASE
})

module.exports = pool
