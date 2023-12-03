import { OkPacket } from 'mysql';
import UserModel from '../3-models/user-model';
import dal from '../2-utils/dal';
import RoleModel from '../3-models/role-model';
import {
  ResourceNotFound,
  Unauthorized,
  emailTaken,
} from '../3-models/error-models';
import cyber from '../2-utils/cyber';
import CredentialModel from '../3-models/credential-model';

class AuthService {
  public async checkEmailTaken(userEmail: string): Promise<boolean> {
    const sql = `SELECT * FROM users WHERE email = ?`;

    const info: OkPacket = await dal.execute(sql, [userEmail]);

    return info.affectedRows >= 1 ? true : false;
  }

  public async register(user: UserModel): Promise<string> {
    // Validate:
    user.postValidation();

    // Is email taken:
    if (!this.checkEmailTaken(user.email))
      throw new emailTaken('email has been taken');

    // Declare user as regular user:
    user.roleId = RoleModel.User;

    user.password = cyber.hashPassword(user.password);

    // Create sql:
    const sql = `INSERT INTO users(firstName, lastName, email, password, roleId)
                     VALUES(?,?,?,?,?)`;
    //save user:
    const info: OkPacket = await dal.execute(sql, [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ]);
    // Add id to user
    user.id = info.insertId;

    // Create token for user:
    const token = cyber.getNewToken(user);

    return token;
  }

  public async login(credentials: CredentialModel): Promise<string> {
    credentials.password = cyber.hashPassword(credentials.password);
    // Create sql:
    const sql = `SELECT * FROM users
                 WHERE email = ? AND password = ?`;

    const users = await dal.execute(sql, [
      credentials.email,
      credentials.password,
    ]);

    const user = users[0];
    if (!user) throw new Unauthorized('Incorrect email or password!');

    // Create token for user:
    const token = cyber.getNewToken(user);

    return token;
  }
}

const authService = new AuthService();
export default authService;
