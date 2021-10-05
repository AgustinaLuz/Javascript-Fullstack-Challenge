const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

const db = mongoose.connect('mongodb://localhost/fullstack-challenge', { useNewUrlParser: true });

const port = process.env.PORT || 3001;
const Operation = require('./models/operationModel');
const operationRouter = require('./routes/operationRouter')(Operation);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', operationRouter);

app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.server = app.listen(port, () => {
    console.log('Running on port: ' + port);
});

module.exports = app;