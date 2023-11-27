import Joi from 'joi';
import { Validation } from './error-models';
import { UploadedFile } from 'express-fileupload';

export default class ProductModel {
  public id: number;
  public name: string;
  public price: number;
  public stock: number;
  public image: UploadedFile;
  public imageUrl: string;

  public constructor(product: ProductModel) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.stock = product.stock;
    this.image = product.image;
    this.imageUrl = product.imageUrl;
  }

  private static postValidationSchema = Joi.object({
    id: Joi.number().forbidden(),
    name: Joi.string().required().min(2).max(50),
    price: Joi.number().required().min(0).max(2000),
    stock: Joi.number().required().min(0).max(2000).integer(),
    image: Joi.object().optional(),
    imageUrl: Joi.string().optional().min(50).max(200),
  });

  private static putValidationSchema = Joi.object({
    id: Joi.number().optional().integer().positive(),
    name: Joi.string().required().min(2).max(50),
    price: Joi.number().required().min(0).max(2000),
    stock: Joi.number().required().min(0).max(2000).integer(),
    image: Joi.object().optional(),
    imageUrl: Joi.string().optional().min(50).max(200),
  });

  public postValidation(): void {
    const result = ProductModel.postValidationSchema.validate(this);

    if (result?.error?.message) throw new Validation(result.error.message);
    
    if(this.image.size > 1000000) throw new Validation("Image to large")
  }

  public putValidation(): void {
    const result = ProductModel.putValidationSchema.validate(this);

    if (result?.error?.message) throw new Validation(result.error.message);

    if(this.image?.size > 1000000) throw new Validation("Image to large")
  }
}
