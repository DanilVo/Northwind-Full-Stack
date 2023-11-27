import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ProductModel from '../../../Models/ProductModel';
import productsService from '../../../Service/ProductsService';
import './EditProduct.css';
import notificationService from '../../../Service/NotificationService';

function EditProduct(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<ProductModel>();

  const params = useParams();
  const id = +params.prodId;

  const navigate = useNavigate();

  useEffect(() => {
    productsService
      .getOneProduct(id)
      .then((product) => {
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('stock', product.stock);
        setValue('imageUrl', product.imageUrl);
      })
      .catch((err) => notificationService.error(err));
  }, []);

  async function update(product: ProductModel) {
    // console.log(product);

    try {
      console.log(product);

      product.id = id;

      product.image = (product.image as unknown as FileList)[0];
      // console.log(product);

      const beProduct = await productsService.updateProduct(product);

      notificationService.success('Product has been updated');

      navigate('/products/details/' + beProduct.id);
    } catch (err: any) {
      notificationService.error(err);
    }
  }
  return (
    <div className="EditProduct">
      <form onSubmit={handleSubmit(update)}>
        <label>Name</label>
        <input type="text" {...register('name')} />

        <label>Price</label>
        <input type="number" step="0.01" {...register('price')} />

        <label>Stock</label>
        <input type="number" {...register('stock')} />

        <label>Image</label>
        <input type="file" accept="image/*" {...register('image')} />

        <button>Update</button>
      </form>
    </div>
  );
}

export default EditProduct;
