import { NextFunction, Request, Response } from 'express';
import cyber from '../2-utils/cyber';

// Route not found Middleware:
function verifyToken(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authorization = request.header('authorization');
  const token = authorization?.substring(7);
  cyber.verifyToken(token);
  next();
}

export default verifyToken;
