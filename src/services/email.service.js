import nodemailer from 'nodemailer';
import User from '../models/user.model.js';
import { email_service, email_user, email_password, domain_name, email_port } from '../constants.js';

const transporter = nodemailer.createTransport({
    host: domain_name,
    port: email_port,
    service: email_service,
    auth: {
        user: email_user,
        pass: email_password
    }
});

const sendEmails = async (listId, emailTemplate) => {
    try {
        const users = await User.find({ listId });
        
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let emailBody = emailTemplate;
            user.properties.forEach((value, key) => {
                emailBody = emailBody.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
            });
            emailBody = emailBody.replace('[name]', user.name).replace('[email]', user.email);

            const mailOptions = {
                from: email_user,
                to: user.email,
                subject: 'Hello from Mathango',
                html: emailBody
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Email sent:', info.response);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }
    } catch (error) {
        console.error('Error in sendEmails:', error);
    }
};

export default sendEmails;
