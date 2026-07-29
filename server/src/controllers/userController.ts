import pool from "../db/pool.ts";
import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";


export async function createUser(req: Request, res: Response) {
    const {email, password, name} = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({error: "email, password e name são obrigatórios"})
    }

    if(password.length < 8){
      return res.status(400).json({error: "Password tem que ter no mínimo 8 caracteres"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const result = await pool.query(
    'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING user_id, name, email, created_at',
    [email, hashedPassword, name]
  );  
    res.status(201).json(result.rows[0]);
    } catch (err: any) {
      if (err.code === '23505') {
        return res.status(409).json({ error: "email já cadastrado" });
      }
      throw err;
    }  
}

export async function getMe (req: Request, res: Response) {
  const { userId } = req.user as JwtPayload;

  const text = 'SELECT user_id, name, email, created_at FROM users WHERE user_id = $1';
  const result = await pool.query(text, [userId]);

  if (result.rowCount === 0) return res.status(404).json({ error: "user não encontrado" });
  res.json(result.rows[0]);
}

export async function updateUser(req:Request, res:Response){
  const { userId } = req.user as JwtPayload;
  const {name, password} = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  const text =  `
  UPDATE users
  SET name = COALESCE($1, name),
  password = COALESCE($2, password)
  WHERE user_id = $3
  RETURNING user_id, name, email, created_at
  `
  const values = [name, hashedPassword, userId];

  const result = await pool.query(text,values);
  if (result.rowCount === 0) return res.status(404).json({ error: "user não encontrado" });
  res.json(result.rows[0]);
}

export async function deleteUser(req: Request, res: Response) {
  const { userId } = req.user as JwtPayload;
  const { password } = req.body;

  if (!password) {
      return res.status(400).json({error: "Password obrigatória para apagar o usuário."})
    }

    const result1 = await pool.query('SELECT user_id, name, email, password FROM users WHERE user_id = $1', [userId])
    const user1 = result1.rows[0]; 

    if (!user1) return res.status(404).json({ error: "user não encontrado" });
    const passwordMatch = await bcrypt.compare(password, user1.password);

    if(!passwordMatch){
        return res.status(401).json({error:"Password inválida!"});
    }

    
    
  const text = `
  DELETE FROM users
  WHERE user_id = $1
  `;
  const result = await pool.query(text, [userId])
  if(result.rowCount === 0) return res.status(404).json({error: "user não encontrado"})
  res.status(200).json(result.rowCount)
}