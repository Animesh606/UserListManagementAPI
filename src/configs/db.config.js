import mongoose from 'mongoose';
import { db_url } from '../constants.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${db_url}`);
        console.log('Database connected', conn.connection.host);
    } catch (error) {
        console.log('Connection failed', error);
        process.exit(1);
    }
}

export default connectDB;