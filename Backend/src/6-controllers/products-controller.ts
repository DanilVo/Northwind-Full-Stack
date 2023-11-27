import express, { NextFunction, Request, Response } from 'express';
import { fileSaver } from 'uploaded-file-saver';
import ProductModel from '../3-models/product-model';
import StatusCode from '../3-models/status-codes';
import verifyAdmin from '../4-middleware/verify-admin';
import verifyToken from '../4-middleware/verify-token';
import productService from '../5-services/product-service';

const router = express.Router();

router.get(
  '/products',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const products = await productService.getAllProducts();
      
      response.json(products);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/products/:id([0-9]+)',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const product = await productService.getProductsById(id);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get products by price
router.get(
  '/products-by-price/:minPrice/:maxPrice',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const minPrice = +request.params.minPrice;
      const maxPrice = +request.params.maxPrice;
      const product = await productService.getProductsByPrice(
        minPrice,
        maxPrice
      );
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get products by price
router.get(
  '/products-by-price2',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const min = +request.query.min;
      const max = +request.query.max;
      const product = await productService.getProductsByPrice(min, max);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get products by category:
router.get(
  '/products-by-category',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const categoryId = +request.query.categoryId;
      const product = await productService.getProductsByCategory(categoryId);
      response.json(product);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/products/:imageName',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = fileSaver.getFilePath(imageName);
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

//Add new product:
router.post(
  '/products',
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const product = new ProductModel(request.body);
      const addedProduct = await productService.addProduct(product);
      response.status(StatusCode.Created).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

//Add new product:
router.post(
  '/products2',
  verifyToken,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const product = new ProductModel(request.body);
      const addedProduct = await productService.addNewProduct(product);
      response.status(StatusCode.Created).json(addedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

// Update product:
router.put(
  '/products/:id([0-9]+)',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.id = +request.params.id;
      request.body.image = request.files?.image;
      const product = new ProductModel(request.body);
      const updatedProduct = await productService.updateProduct(product);
      response.json(updatedProduct);
    } catch (err: any) {
      next(err);
    }
  }
);

// Delete product:
router.delete(
  '/products/:id([0-9]+)',
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await productService.deleteProduct(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
