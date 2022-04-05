const express = require("express");
const app =  express();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
// bring the user route 
const indexRoute = require('./routes/index.routes');

app.use(bodyParser.json())

// initialize env
dotEnv.config();

app.use('/', indexRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started as port ${PORT}`));
