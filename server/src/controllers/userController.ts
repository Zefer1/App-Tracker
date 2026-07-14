import pool from "../db/pool.ts";
import type { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
    const {email, password} = req.body;
    const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, password]
  );  
    res.json(result.rows[0])
}