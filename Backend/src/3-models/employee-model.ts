import Joi from "joi";
import { Validation } from "./error-models";
import { UploadedFile } from 'express-fileupload';

class EmployeeModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public birthDate: Date;
  public country: string;
  public city: string;
  public image: UploadedFile;
  public PhotoPath: string;

  public constructor(employee: EmployeeModel) {
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.birthDate = employee.birthDate;
    this.country = employee.country;
    this.city = employee.city;
    this.image = employee.image;
    this.PhotoPath = employee.PhotoPath;
  }

  private static postValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    birthDate: Joi.date().required().less("now"),
    country: Joi.string().required().min(2).max(50),
    city: Joi.string().required().min(2).max(50),
    image: Joi.object().optional(),
    PhotoPath: Joi.string().optional().min(50).max(200),
  });

  private static putValidationSchema = Joi.object({
    id: Joi.number().optional().integer().positive(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    birthDate: Joi.date().required().less("now"),
    country: Joi.string().required().min(2).max(50),
    city: Joi.string().required().min(2).max(50),
    image: Joi.object().optional(),
    PhotoPath: Joi.string().optional().min(50).max(200),
  });

  public postValidate(): void {
    const result = EmployeeModel.postValidationSchema.validate(this);
    if (result?.error?.message) throw new Validation(result.error.message);
    if(this.image.size > 1000000) throw new Validation("Image to large")
  }

  public putValidate(): void {
    const result = EmployeeModel.putValidationSchema.validate(this);
    if (result?.error?.message) throw new Validation(result.error.message);
    if(this.image.size > 1000000) throw new Validation("Image to large")
  }
}

export default EmployeeModel;
