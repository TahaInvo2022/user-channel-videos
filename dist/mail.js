"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
const dotenv = require("dotenv").config();
const Mail = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});
exports.default = Mail;
