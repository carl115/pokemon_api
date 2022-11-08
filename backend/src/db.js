const { createPool } = require('mysql2/promise');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pokedex_api'
});

module.exports.pool = pool;