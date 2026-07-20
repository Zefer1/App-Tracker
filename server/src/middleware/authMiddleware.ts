import type { NextFunction, Request, Response } from 'express';
import jwt, { type VerifyErrors, type JwtPayload } from 'jsonwebtoken';




export default function authMiddleware (req: Request, res: Response, next: NextFunction)  {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
  });
};

