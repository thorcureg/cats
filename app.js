const express = require('express');
const app = express();

const catRouter = require('./route/catRoute');

app.use(express.json())
app.use('/api/cats', catRouter);

module.exports = app;