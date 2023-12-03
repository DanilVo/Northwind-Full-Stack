import Joi from 'joi';
import RoleModel from './role-model';
import { Validation } from './error-models';

class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roleId: RoleModel;

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.roleId = user.roleId;
  }

  // ValidationSchema and Validate function
  private static putValidationSchema = Joi.object({
    id: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().required().min(2).max(50),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required()
      .min(2)
      .max(50),
    roleId: Joi.number().optional().min(1).max(2).positive(),
  });

  private static postValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().required().min(2).max(50),
    password: Joi.string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required()
      .min(2)
      .max(50),
    roleId: Joi.number().required().min(1).max(2).positive(),
  });

  public putValidation(): void {
    const result = UserModel.putValidationSchema.validate(this);
    if (result?.error?.message) throw new Validation(result.error.message);
  }

  public postValidation(): void {
    const result = UserModel.putValidationSchema.validate(this);
    if (result?.error?.message) throw new Validation(result.error.message);
  }
}

export default UserModel;
