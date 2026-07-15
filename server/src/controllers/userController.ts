import pool from "../db/pool.ts";
import type { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
    const {email, password, name} = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({error: "email, password e name são obrigatórios"})
    }

    if(password.length < 8){
      return res.status(400).json({error: "Password tem que ter no mínimo 8 caracteres"})
    }
    try {
      const result = await pool.query(
    'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING user_id, name, email, created_at',
    [email, password, name]
  );  
    res.status(201).json(result.rows[0]);
    } catch (err: any) {
      if (err.code === '23505') {
        return res.status(409).json({ error: "email já cadastrado" });
      }
      throw err;
    }  
}

export async function getUsers (req: Request, res: Response) {
  const text = 'SELECT user_id, name, email, created_at FROM users'
    const result = await pool.query(text);
    res.json(result.rows)
}

export async function updateUser(req:Request, res:Response){
  const {id} = req.params;
  const {name, password} = req.body;
  const text =  `
  UPDATE users
  SET name = COALESCE($1, name),
  password = COALESCE($2, password)
  WHERE user_id = $3
  RETURNING user_id, name, email, created_at
  `
  const values = [name, password, id];

  try {
    const result = await pool.query(text,values);
    if (result.rowCount === 0) return res.status(404).json({ error: "user id não existe na BD" });
    res.json(result.rows[0]);
  } catch (err: any) {
    if (err.code === '22P02') {
      return res.status(400).json({ error: "user id inválido" });
    }
    throw err;
  }
}

export async function deleteUser(req: Request, res: Response) {
  const {id} = req.params;

  try {
  const text = `
  DELETE FROM users
  WHERE user_id = $1
  `;
  const value = [id]
  const result = await pool.query(text,value)
  if(result.rowCount === 0) return res.status(404).json({error: "user não existe na BD"})
  res.status(200).json(result.rowCount)
  } catch (err: any) {
    if (err.code === '22P02') {
    return res.status(400).json({ error: "user id inválido" });
  }
}
}