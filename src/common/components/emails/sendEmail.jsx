// Step 1: Import the nodemailer module
const nodemailer = require('nodemailer');

// Step 2: Create a transporter object
// This transporter will be responsible for communicating with the email service.
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use the 'gmail' service
  auth: {
    user: 'cwadminportal@gmail.com', // Your Gmail address
    pass: 'lpla jasm tjds bnzd', // Your Gmail App Password (CRUCIAL - see note below)
  },
});

// Step 3: Define the email options (who, what, where)
const mailOptions = {
  from: 'cwadminportal@gmail.com', // Sender address
  to: 'cwadminportal@gmail.com', // List of recipients
  subject: 'Hello from Node.js!', // Subject line
  text: 'This is a plain text email sent using Nodemailer. How cool is that?', // Plain text body
  html: '<h1>Welcome!</h1><p>This is an <b>HTML</b> email sent using <i>Nodemailer</i>.</p>', // HTML body
};

// Step 4: Send the email!
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error);
  } else {
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    // Preview only available when sending through an Ethereal account (see below)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
});