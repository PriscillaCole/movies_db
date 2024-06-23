const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const movieRouter = require('./routes'); // Ensure this points to the correct path
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());
app.use(cors());
app.use('/movies', movieRouter);

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
