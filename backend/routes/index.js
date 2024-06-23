const express = require('express');
const router = express.Router();
const pool = require('../db/config');


router.get('/', async (req, res) => {
    const result = await pool.query('SELECT * FROM "movies"')
    res.json( result.rows);
});

//enter new movie
router.post('/add', async (req, res) => {
    const {
        id,
        background_path,
        original_language,
        original_title,
        overview,
        poster_path,
        release_date,
        vote_average,
        vote_count,
        runtime,
        tagline,
        actors,
        genres
    } = req.body;

    const query = `
        INSERT INTO movies (
            id, background_path, original_language, original_title, overview, 
            poster_path, release_date, vote_average, vote_count, runtime, 
            tagline, actors, genres
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
    `;

    const values = [
        id,
        background_path,
        original_language,
        original_title,
        overview,
        poster_path,
        release_date,
        vote_average,
        vote_count,
        runtime,
        tagline,
        JSON.stringify(actors),  
        JSON.stringify(genres)   
    ];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;