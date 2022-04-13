"use strict";
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cron = require("node-cron");
// bring the user route 
const indexRoute = require('./routes/index.routes');
app.use(bodyParser.json());
// initialize env
dotEnv.config();
const PORT = process.env.PORT || 5000;
// const option = {
//     definition:{
//         openapi:"3.0.0",
//         info: {
//             version: "1.0.0",
//             title: "User Channel Video System",
//             description: "User Channel Video APIs",
//         },
//         servers: [
//             {
//                 url: "http://localhost:3000"
//             }
//         ],
//     },
//     apis: ["./controllers/*.js"]
// }
// const swaggerDocumentObj = swaggerJsDoc(option);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRoute);
app.listen(PORT, console.log(`Server started as port ${PORT}`));
