import { NavLink } from 'react-router-dom';
import ProductModel from '../../../Models/ProductModel';
import './ProductCard.css';

type ProductProps = {
  key: number;
  product: ProductModel;
  yos: string;
};

function ProductCard(props: ProductProps): JSX.Element {
  console.log(props.product.name);
  
  return (
    <NavLink to={'/products/details/' + props.product.id}>
      <div className="ProductCard">
        <div>
          Name: {props.product.name}
          <br />
          Price: {props.product.price}
          <br />
          Stock: {props.product.stock}
          <br />
        </div>
        <div>
          <img
            src={props.product.imageUrl}
          />
        </div>
      </div>
    </NavLink>
  );
}

export default ProductCard;
