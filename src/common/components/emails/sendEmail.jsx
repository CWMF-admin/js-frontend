const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_PASS,
  },
});

const mailOptions = {
  from: 'cwadminportal@gmail.com', 
  to: 'cwadminportal@gmail.com', 
  subject: 'Hello from Node.js!',
  text: 'This is a plain text email sent using Nodemailer. How cool is that?',
  html: '<h1>Welcome!</h1><p>This is an <b>HTML</b> email sent using <i>Nodemailer</i>.</p>', 
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error);
  } else {
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  }
});