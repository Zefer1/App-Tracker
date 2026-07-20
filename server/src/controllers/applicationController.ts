import pool from "../db/pool.ts";
import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

export async function createApplication(req:Request, res: Response) {
    const { userId } = req.user as JwtPayload;
    const {company, position} = req.body;

    if(!company || !position){
      return res.status(400).json({error: "Empresa e posição são campos obrigatórios."})
    }

    try{
    const text = 'INSERT INTO applications (company, position, user_id) VALUES($1, $2, $3) RETURNING *';
    const values = [company, position, userId];
    const result = await pool.query(text,values)
    res.status(201).json(result.rows[0])
    } catch (err: any) {
      if (err.code === '23503') {
    return res.status(400).json({ error: "user não encontrado" });
  }
    throw err;
    }
}

export async function getApplications(req: Request, res: Response) {
    const { userId } = req.user as JwtPayload;
    const text = 'SELECT * FROM applications WHERE user_id = $1';
    const result = await pool.query(text, [userId]);
    res.json(result.rows)
}

export async function updateApplication(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = req.user as JwtPayload;
  const { company, position, status, link, notes } = req.body;

  const text = `
    UPDATE applications
    SET company = COALESCE($1, company),
        position = COALESCE($2, position),
        status = COALESCE($3, status),
        link = COALESCE($4, link),
        notes = COALESCE($5, notes),
        updated_at = now()
    WHERE id = $6 AND user_id = $7
    RETURNING *
  `;
  const values = [company, position, status, link, notes, id, userId];

  try {
    const result = await pool.query(text, values);
    if (result.rowCount === 0) return res.status(404).json({ error: "application não encontrada" });
    res.json(result.rows[0]);
  } catch (err: any) {
    if (err.code === '22P02') {
      return res.status(400).json({ error: "application id inválido" });
    }
    throw err;
  }
}

export async function deleteApplication(req:Request, res:Response) {
  const { id } = req.params;
  const { userId } = req.user as JwtPayload;

  try{
  const text = `
  DELETE from applications
  WHERE id = $1 AND user_id = $2
  RETURNING *
  `;
  const values = [id, userId]
  const result = await pool.query(text,values)
  if(result.rowCount === 0) return res.status(404).json({error: "id não existe na BD"})
  res.status(200).json(result.rows[0])
  } catch (err: any) {
    if (err.code === '22P02') {
    return res.status(400).json({ error: "application id inválido" });
  }
  throw err;
  }

}