import pool from "../db/pool.ts";
import type { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
    const {email, password, name} = req.body;
    const result = await pool.query(
    'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
    [email, password, name]
  );  
    res.json(result.rows[0])
}

export async function getUsers (res: Response) {
  const text = 'SELECT user_id, name, email, created_at FROM users'
    const result = await pool.query(text);
    res.json(result.rows)
}

export async function updateUser(req:Request, res:Response){
  const {id} = req.params;
  const {name, password} = req.body;
  const text =  `
  UPDATE users
  SET name = $1, password = $2
  WHERE user_id = $3
  RETURNING user_id, name, email, created_at
  `
  const values = [name, password, id];

  const result = await pool.query(text,values);
  res.json(result.rows[0])
}

export async function deleteUser(req: Request, res: Response) {
  const {id} = req.params;
  const text = `
  DELETE FROM users
  WHERE user_id = $1
  `
  const value = [id]
  const result = await pool.query(text,value)
  res.json(result.rowCount)
}