import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import pool from './db/pool.js';
import { createUser } from './controllers/userController.ts';
const app: Express = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.post('/', createUser
  
)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});