import 'dotenv/config';
import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import UsersRouter from './routes/users.js'
import ApplicationsRouter  from './routes/applications.ts';
import AuthRouter from './routes/auth.ts'
import cookieParser from 'cookie-parser';

const app: Express = express();

const port = 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

app.use('/api/users', UsersRouter);
app.use('/api/applications', ApplicationsRouter);
app.use('/api/auth', AuthRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});