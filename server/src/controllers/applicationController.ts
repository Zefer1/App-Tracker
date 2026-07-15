import pool from "../db/pool.ts";
import type { Request, Response } from "express";

export async function createApplication(req:Request, res: Response) {
    const {company, position, user_id} = req.body;
    const text = 'INSERT INTO applications (company, position, user_id) VALUES($1, $2, $3) RETURNING *';
    const values = [company, position, user_id];
    const result = await pool.query(text,values)
    res.json(result.rows[0])
}

export async function getApplications(req: Request, res: Response) {
    const text = 'SELECT * FROM applications';
    const result = await pool.query(text);
    res.json(result.rows)
}

export async function updateApplication(req: Request, res: Response) {
  const { id } = req.params;
  const { company, position, status, link, notes, user_id } = req.body;

  const text = `
    UPDATE applications
    SET company = $1, position = $2, status = $3, link = $4, notes = $5, user_id = $6, updated_at = now()
    WHERE id = $7
    RETURNING *
  `;
  const values = [company, position, status, link, notes, user_id, id];

  const result = await pool.query(text, values);
  res.json(result.rows[0]);
}

export async function deleteApplication(req:Request, res:Response) {
  const { id } = req.params;
  const text = `
  DELETE from applications
  WHERE id = $1
  RETURNING *
  `;
  const value = [id]
  const result = await pool.query(text,value)
  res.json(result.rows[0])
}