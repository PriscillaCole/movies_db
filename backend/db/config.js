const pg = require('pg');
const {Pool} = require('pg');
require('dotenv').config(); 

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: '1234567890',
//     database: 'movies_db',
//     max: 20,
//     idleTimeoutMillis: 30000,
//     connectionTimeoutMillis: 2000,
//   })


const dbConfigLink = process.env.DBConnLink;

if (!dbConfigLink) {
    throw new Error('DBConnLink environment variable is not set');
}

const config = {
    connectionString: dbConfigLink,
    ssl: dbConfigLink.includes('localhost') ? false : { rejectUnauthorized: false }
};

const pool = new Pool(config);
  
  module.exports = pool;

