import pool from "../db/pool.ts";
import type { Request, Response } from "express";

export async function createApplication(req:Request, res: Response) {
    const {company, position, user_id} = req.body;

    if(!company || !position || !user_id){
      return res.status(400).json({error: "Empresa, user_id e posição são campos obrigatórios."})
    }

    try{
    const text = 'INSERT INTO applications (company, position, user_id) VALUES($1, $2, $3) RETURNING *';
    const values = [company, position, user_id];
    const result = await pool.query(text,values)
    res.status(201).json(result.rows[0])
    } catch (err: any) {
      if (err.code === '23503') {
    return res.status(400).json({ error: "user_id não corresponde a nenhum usuário" });
  }
    if (err.code === '22P02') {
    return res.status(400).json({ error: "user_id inválido" });
  }
    throw err;
    } 
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
    SET company = COALESCE($1, company),
        position = COALESCE($2, position),
        status = COALESCE($3, status),
        link = COALESCE($4, link),
        notes = COALESCE($5, notes),
        user_id = COALESCE($6, user_id),
        updated_at = now()
    WHERE id = $7
    RETURNING *
  `;
  const values = [company, position, status, link, notes, user_id, id];

  try {
    const result = await pool.query(text, values);
    res.json(result.rows[0]);
  } catch (err: any) {
    if (err.code === '23503') {
      return res.status(400).json({ error: "user_id não corresponde a nenhum usuário" });
    }
    if (err.code === '22P02') {
      return res.status(400).json({ error: "user_id inválido" });
    }
    throw err;
  }
}

export async function deleteApplication(req:Request, res:Response) {
  const { id } = req.params;
  
  try{
  const text = `
  DELETE from applications
  WHERE id = $1
  RETURNING *
  `;
  const value = [id]
  const result = await pool.query(text,value)
  if(result.rowCount === 0) return res.status(404).json({error: "id não existe na BD"})
  res.status(200).json(result.rows[0])
  } catch (err: any) {
    if (err.code === '22P02') {
    return res.status(400).json({ error: "application id inválido" });
  }
  throw err;
  }

}