import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'mysecret';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = Jwt.verify(token, secret);
    // Attach user data to request
    (req as any).user = (decoded as any).data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
