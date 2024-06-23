const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const movieRouter = require('./routes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());
app.use(cors());
app.use('/movies', movieRouter);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});