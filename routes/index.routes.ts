import express from 'express';

const app = express();


const User = require('./user');
const Channel = require('./channel');
const Auth = require('./auth');


app.use('/users',  User);
app.use('/channels', Channel);
app.use('/auth', Auth);

module.exports = app;