const express = require('express');
const router = express.Router();
const pool = require('../db/config');


router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM "movies"')
    res.json( result.rows);
});

module.exports = router;