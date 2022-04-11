const Mail = require('../mail');


exports.sendWelcomeEmail = (data) => {
    var mailOptions = {
        from: 'tahashahid292@gmail.com',
        to: data.email,
        subject: 'Sending Email using Node.js',
        text: 'Hi there. This email was automatically sent through cron jobs. I have saved ethereal info in .env file'
      };
      
      Mail.sendMail(mailOptions, (error) => {
        if (error) {
          console.log("error is:", error);
          throw error;
        } else {
          console.log("Email successfully sent!");
        }
      });
}
