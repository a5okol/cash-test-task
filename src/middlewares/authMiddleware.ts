import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import config from '../config/commonConfig';

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers['authorization'];
  if (!token) {
    res.status(403).json({ error: 'No token provided' });
    return;
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.body.userId = (decoded as { id: number }).id;
    next();
  });
};

export default authMiddleware;
