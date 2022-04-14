"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Mail = require('../mail');
const mail_1 = __importDefault(require("../mail"));
exports.sendWelcomeEmail = (data) => {
    var mailOptions = {
        from: 'tahashahid292@gmail.com',
        to: data.email,
        subject: 'Sending Email using Node.js',
        text: 'Hi there. This email was automatically sent through cron jobs. I have saved ethereal info in .env file'
    };
    mail_1.default.sendMail(mailOptions, (error) => {
        if (error) {
            console.log("error is:", error);
            throw error;
        }
        else {
            console.log("Email successfully sent!");
        }
    });
};
