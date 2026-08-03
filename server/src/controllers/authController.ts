import type { Request, Response } from "express";
import pool from "../db/pool.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login (req: Request, res: Response) {
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({error: "Email e password são obrigatórios!"})
    }

    const text = 'SELECT user_id, name, email, password FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(text,values);
    const user = result.rows[0];    

    if(!user){
        return res.status(401).json({error:"Email ou password inválidos!"});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordMatch){
        return res.status(401).json({error:"Password ou Email inválidos!"});
    }     

    const token = jwt.sign(
        {
            userId: user.user_id
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '8h'}
    )

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 8 * 60 * 60 * 1000
    });

    res.json({
        user: { id: user.user_id, name: user.name, email: user.email }
    });
}

export async function logout (req: Request, res: Response) {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });

    res.status(200).json({ message: 'Logout efetuado com sucesso' });
}