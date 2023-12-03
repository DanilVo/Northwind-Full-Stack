import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { Forbidden, Unauthorized } from '../3-models/error-models';
import RoleModel from '../3-models/role-model';
import UserModel from '../3-models/user-model';
import crypto from 'crypto';
import { Request } from 'express';

class Cyber {
  // To env. file
  private secretKey = 'The-Amazing-Students-Of-Yos-IsraelF';

  public getNewToken(user: UserModel): string {
    delete user.password;
    // Containing the user inside the container object:
    const container = { user };

    // Create expiration date:
    const options = { expiresIn: '3h' };

    // Create Token:
    const token = jwt.sign(container, this.secretKey, options);

    return token;
  }

  // Token validation:
  public verifyToken(token: string): boolean {
    if (!token) throw new Unauthorized('You are not logged in');
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (err: any) {
      throw new Unauthorized(err.message);
    }
  }

  public verifyAdmin(token: string): void {
    this.verifyToken(token);
    const container = jwt.verify(token, this.secretKey) as { user: UserModel };
    const user = container.user;
    if (user.roleId !== RoleModel.Admin)
      throw new Forbidden('You are not admin');
  }

  public hashPassword(plainText: string): string {
    if (!plainText) return null;
    const salt = process.env.SALT;
    const hashedPassword = crypto
      .createHmac('sha512', salt)
      .update(plainText)
      .digest('hex');

    return hashedPassword;
  }
}

const cyber = new Cyber();
export default cyber;
