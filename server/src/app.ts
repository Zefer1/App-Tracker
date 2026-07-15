import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import UsersRouter from './routes/users.js'
import ApplicationsRouter  from './routes/applications.ts';

const app: Express = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', UsersRouter);
app.use('/api/applications', ApplicationsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});