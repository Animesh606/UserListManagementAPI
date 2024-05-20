import app from './app.js';
import connectDB from './configs/db.config.js';
import { port } from './constants.js';

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${port}`);
        })
    })
    .catch((error) => {
        console.log('Mongo Connection failed', error);
    })