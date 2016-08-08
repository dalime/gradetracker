require('dotenv').config();

// Port
const PORT = process.env.PORT || 8000;

// NPM Packages
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/assignments', require('./routes/assignments.js'));

// Server listen declaration
app.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});
