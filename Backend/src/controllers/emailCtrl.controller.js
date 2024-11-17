// const nodemailer = require("nodemailer");
// const asyncHandler = require("express-async-handler");

// const sendEmail = asyncHandler(async (data, req, res) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for port 465, false for other ports
//     auth: {
//       user: process.env.MAIL_ID,
//       pass: process.env.MP,
//     },
//     tls: {
//       rejectUnauthorized: false, // Optional: allow self-signed certificates
//     },
  
//   });

//   const info = await transporter.sendMail({
//     from: `"Hey👻" <${process.env.MAIL_ID}>`, // Corrected sender address
//     to: data.to, // list of receivers
//     subject: data.subject, // Subject line
//     text: data.text, // plain text body
//     html: data.htm, // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

//   console.log("Priview URL: %s", nodemailer.getTestMessageUrl(info));
// });

// module.exports = sendEmail;





//********************* */

const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  // Log and check if environment variables are correct
  console.log("MAIL_ID: ", process.env.MAIL_ID); // Check the sender email
  console.log("MAIL Password: ", process.env.MP); // Check the password/app password



  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Ensure the host is set to Gmail's SMTP server
    port: 465, // SSL port
    secure: true, // Must be true for 465 (SSL)
    auth: {
      user: process.env.MAIL_ID, // Your Gmail address
      pass: process.env.MP, // Your Gmail password or app password
    },
    tls: {
      rejectUnauthorized: false, // Optional: allow self-signed certificates
    },
  });

  const info = await transporter.sendMail({
    from: `"Hey👻" <${process.env.MAIL_ID}>`, // Sender address, correctly formatted with backticks
    to: data.to, // Recipient email, validated above
    subject: data.subject, // Subject line
    text: data.text, // Plain text body
    html: data.html, // HTML body
  });

  // Log to check recipient and message information
  console.log("Recipient Email: ", data.to);
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

module.exports = sendEmail;
