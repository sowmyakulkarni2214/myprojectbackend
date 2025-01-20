// const nodemailer = require('nodemailer');

// // Nodemailer Transporter Setup (using Gmail as an example)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com',  // Your email address
//     pass: 'your-email-password',   // Your email password
//   }
// });



// const sendOTPEmail = (email, otp) => {
//     const mailOptions = {
//       from: 'your-email@gmail.com',
//       to: email,
//       subject: 'Your OTP for Login',
//       text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
//     };
  
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log('Error sending email:', error);
//       } else {
//         console.log('OTP email sent:', info.response);
//       }
//     });
//   };
  
//   // Example Usage:
//   const email = 'user@example.com';
//   const otp = generateOTP(email);  // Generate OTP
//   sendOTPEmail(email, otp);  // Send OTP via email