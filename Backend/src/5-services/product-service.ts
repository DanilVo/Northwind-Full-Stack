import { OkPacket } from 'mysql';
import dal from '../2-utils/dal';
import { ResourceNotFound } from '../3-models/error-models';
import ProductModel from '../3-models/product-model';
import { fileSaver } from 'uploaded-file-saver';
import appConfig from '../2-utils/app-config';

class ProductService {
  public async getAllProducts(): Promise<ProductModel[]> {
    const sql = `SELECT ProductID AS id,
                 ProductName AS name,
                 UnitPrice AS price, 
                 UnitsInStock AS stock,
                 CONCAT('${appConfig.appHost}','/api/products/',ImageName) AS imageUrl 
                 FROM products`;

    const products = await dal.execute(sql);

    return products;
  }

  public async getProductsById(id: number): Promise<ProductModel> {
    const sql = `SELECT ProductID AS id,
                 ProductName AS name,
                 UnitPrice AS price, 
                 UnitsInStock AS stock,
                 CONCAT('${appConfig.appHost}','/api/products/',ImageName) AS imageUrl 
                 FROM products 
                 WHERE ProductID = ? `;

    const products = await dal.execute(sql, [id]);

    const product = products[0];

    if (!product) throw new ResourceNotFound(id);

    return product;
  }

  public async getProductsByPrice(
    minPrice: number,
    maxPrice: number
  ): Promise<ProductModel[]> {
    const sql = `SELECT ProductID AS id,
                 ProductName AS name,
                 UnitPrice AS price, 
                 UnitsInStock AS stock 
                 FROM products 
                 WHERE UnitPrice BETWEEN ? AND ?`;

    const products = await dal.execute(sql, [minPrice, maxPrice]);
    return products.length === 0 ? 'No Products found' : products;
  }

  public async getProductsByCategory(
    categoryId: number
  ): Promise<ProductModel[]> {
    const sql = `CALL getProductsByCategory(?)`;

    const container = await dal.execute(sql, [categoryId]);

    const products = container[0];

    return products;
  }

  public async addProduct(product: ProductModel): Promise<ProductModel> {
    product.postValidation();

    // Save image to disk:
    const imageName = await fileSaver.add(product.image);

    const sql = `INSERT INTO products(ProductName, UnitPrice,UnitsInStock, ImageName)
                 VALUES(?,?,?, ?)`;

    const info: OkPacket = await dal.execute(sql, [
      product.name,
      product.price,
      product.stock,
      imageName,
    ]);

    product.id = info.insertId;

    delete product.image;

    product.imageUrl = `${appConfig.appHost}/api/products/${imageName}`;

    return product;
  }

  public async addNewProduct(product: ProductModel): Promise<ProductModel> {
    product.postValidation();

    const sql = `CALL addProduct(?,?,?)`;

    const info: OkPacket = await dal.execute(sql, [
      product.name,
      product.price,
      product.stock,
    ]);

    product.id = info.insertId;

    return product;
  }

  public async updateProduct(product: ProductModel): Promise<ProductModel> {
    product.putValidation();

    const existingImageName = await this.getExistingImageName(product.id);
    console.log('existing: ' + existingImageName);

    //  update image if exists and get existing or update image name:
    const imageName = product.image
      ? await fileSaver.update(existingImageName, product.image)
      : existingImageName;
    console.log('new name: ' + imageName);

    const sql = `UPDATE products SET ProductName = ?,
                 UnitPrice = ?,
                 UnitsInStock = ?,
                 ImageName = ?
                 WHERE ProductID = ?`;

    const info: OkPacket = await dal.execute(sql, [
      product.name,
      product.price,
      product.stock,
      imageName,
      product.id,
    ]);

    if (info.affectedRows === 0) throw new ResourceNotFound(product.id);

    delete product.image;

    product.imageUrl = `${appConfig.appHost}/api/products/${imageName}`;

    return product;
  }

  private async getExistingImageName(id: number): Promise<string> {
    const sql = `SELECT ImageName FROM products
                WHERE ProductID = ?`;
    const products = await dal.execute(sql,[id]);
    const product = products[0];
    if (!product) return '';
    return product.ImageName;
  }

  public async deleteProduct(id: number): Promise<void> {
    const existingImageName = await this.getExistingImageName(id);

    const sql = `DELETE FROM products WHERE ProductID = ?`;
    const info: OkPacket = await dal.execute(sql,[id]);

    await fileSaver.delete(existingImageName);

    if (info.affectedRows === 0) throw new ResourceNotFound(id);
  }
}

const productService = new ProductService();
export default productService;
