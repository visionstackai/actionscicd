const { Pool } = require('pg')
require('dotenv').config()

// OUTPUT dotenv config details
console.log(process.env.NODE_ENV)
console.log(process.env.HOST)
console.log(process.env.DB_PORT)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
console.log(process.env.DATABASE)

if (process.env.NODE_ENV === 'local') {
  const pool = new Pool({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // process.env.PASSWORD
    database: process.env.DATABASE,
    min: 2,
    max: 10
  })
  module.exports = pool
}



if (process.env.NODE_ENV === 'Development') {
  const pool = new Pool({
    host: process.env.DEV_DB_HOST, // e.g. privateip
    port: process.env.DEV_DB_PORT, // 5432
    user: process.env.DEV_USER, // e.g. 'my-user'
    password: process.env.DEV_PASSWORD, // e.g. 'my-user-password'
    database: process.env.DEV_DATABASE, // e.g. 'my-database'
    min: 2,
    max: 10

  })
  module.exports = pool
}
