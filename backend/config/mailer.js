import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service you are using
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendPasswordEmail = async (email, password) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Shooz Account Password',
            html: `
                <h1>Welcome to Shooz!</h1>
                <p>Your account has been created successfully.</p>
                <p>Here is your temporary password to login:</p>
                <h2 style="background: #f4f4f4; padding: 10px; display: inline-block;">${password}</h2>
                <p>We recommend you to keep this password safe.</p>
                <p>Thank you,<br>Shooz Team</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

export default transporter;
