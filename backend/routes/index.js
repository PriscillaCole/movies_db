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

    // Use poster_path if background_path is null
    const finalBackgroundPath = background_path || poster_path;

    const checkQuery = 'SELECT COUNT(*) FROM movies WHERE id = $1';
    const insertQuery = `
        INSERT INTO movies (
            id, background_path, original_language, original_title, overview, 
            poster_path, release_date, vote_average, vote_count, runtime, 
            tagline, actors, genres
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING *
    `;

    const values = [
        id,
        finalBackgroundPath,
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
        const checkResult = await pool.query(checkQuery, [id]);
        if (parseInt(checkResult.rows[0].count) > 0) {
            return res.status(409).json({ error: 'Movie with this ID already exists' });
        }

        const result = await pool.query(insertQuery, values);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//delete movie
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM movies WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Movie not found' });
        } else {
            res.status(200).json({ message: 'Movie deleted successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;