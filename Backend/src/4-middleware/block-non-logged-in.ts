import { NextFunction, Request, Response } from 'express';
import cyber from '../2-utils/cyber';
import { Unauthorized } from '../3-models/error-models';

async function blockNonLoggedIn(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const isValid = await cyber.verifyToken(
      request.header('authorization').substring(7)
    );
    if (!isValid) throw new Unauthorized('You are not logged in');
    next();
  } catch (err: any) {
    next(err);
  }
}

export default blockNonLoggedIn;
