import nodemailer from 'nodemailer';
import { MdEmail } from 'react-icons/md';


const transport = nodemailer.createTransport({
    host:'', // host of the email service
    port:587, // you can use 465 for secure ttl
    secure:false, //use true if your using port 465
    auth: {
        user:'', // username of the email user
        pass:'', //password of the email user 
    }
})


async function sendEmail({userEmail,Link}:any){

    const mailOptions = {
        from: `"ABC Admin" <${process.env.SMTP_EMAIL_USER}>`,
        to: userEmail,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Click the link below to reset your password:</p>
          <a href="${Link}">${Link}</a>
          <p>This link will expire in 24 hours.</p>
        `,
    }
    try {
        const info = await transport.sendMail(mailOptions);
        console.log("Contact email sent: %s", info.messageId);
      } catch (error) {
        console.error("Error sending contact email:", error);
        throw error;
      }
    }