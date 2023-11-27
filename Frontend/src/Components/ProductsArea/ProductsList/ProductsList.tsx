import { useEffect, useState } from "react";
import ProductModel from "../../../Models/ProductModel";
import productsService from "../../../Service/ProductsService";
import ProductCard from "../ProductCard/ProductCard";
import useTitle from "../../../Utils/UseTitle";
import { NavLink } from "react-router-dom";
import "./ProductsList.css";
import Spinner from "../../Spinner/Spinner";
import notificationService from "../../../Service/NotificationService";
import TotalProducts from "../TotalProducts/TotalProducts";
import clearAllIcon from "../../../Assets/Images/clear.png";
import addIcon from "../../../Assets/Images/add-icon.png";
import { ProductsAction, ProductsActionTypes, productsStore } from "../../../Redux/ProductsState";


function ProductsList(): JSX.Element {
    useTitle("Northwind | Products");
    // let feProducts: ProductModel[] = [];
    // 
    // 1. useState
    const [feProducts, setFeProducts] = useState<ProductModel[]>([]);

    // 2. useEffect to fetch only once
    useEffect(() => {
        productsService.getAllProducts()
            .then(beProducts => setFeProducts(beProducts))
            .catch(err => notificationService.error(err));
    }, []);

    function clearAll(): void {
        const action: ProductsAction = { type: ProductsActionTypes.ClearAll }
        productsStore.dispatch(action);
    }


    if (!feProducts || feProducts.length === 0) return <Spinner />
    return (
        <div className="ProductsList">
            <div className="actions">
                <NavLink to="/products/new"><img src={addIcon} /></NavLink>
                <NavLink to="/home" onClick={clearAll}><img src={clearAllIcon} /></NavLink>
            </div>
            <TotalProducts />
            {/* {feProducts.map(p => <span>{p.name} | </span>)} */}
            {/* {feProducts && feProducts.map(p => <span>{p.name} | </span>)} */}
            {feProducts?.map(p => <ProductCard key={p.id} product={p} yos={"test"} />)}
        </div>
    );
}

export default ProductsList;
