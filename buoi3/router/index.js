const express = require('express');


const studentRouter = require('./student');

const app = express();


app.use('/student', studentRouter);

module.exports = app;