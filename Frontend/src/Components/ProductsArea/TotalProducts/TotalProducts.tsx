import { useEffect, useState } from "react";
import "./TotalProducts.css";
import productsService from "../../../Service/ProductsService";
import notificationService from "../../../Service/NotificationService";
import { productsStore } from "../../../Redux/ProductsState";

function TotalProducts(): JSX.Element {

    // useState -> count 
    const [count, setCount] = useState<number>(0);
    // useEffect -> service -> getAllProducts

    useEffect(() => {
        productsService.getAllProducts()
            .then(products => setCount(products.length))
            .catch(err => notificationService.error(err));

        // // subscription
        const unsubscribe = productsStore.subscribe(() => {
            setCount(productsStore.getState().products.length);
        });

        return unsubscribe;
    }, [])


    return (
        <div className="TotalProducts">
            <p>Total Products: {count}</p>
        </div>
    );
}

export default TotalProducts;
