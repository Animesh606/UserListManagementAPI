import express from 'express';
import listRouter from './routers/list.router.js';
import userRouter from './routers/user.router.js';
import emailRouter from './routers/email.router.js';

const app = express();

app.use(express.json());
app.use('/api/lists', listRouter);
app.use('/api/users', userRouter);
app.use('/api/emails', emailRouter);

export default app;