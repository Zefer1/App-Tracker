import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import UsersRouter from './routes/users.js'

const app: Express = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/users', UsersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});