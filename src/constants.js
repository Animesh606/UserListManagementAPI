import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 8000;
const db_url = process.env.MONGO_URI;
const email_service = process.env.EMAIL_SERVICE;
const email_user = process.env.EMAIL_USER;
const email_password = process.env.EMAIL_PASSWORD;

export {
    port,
    db_url,
    email_service,
    email_user,
    email_password
}