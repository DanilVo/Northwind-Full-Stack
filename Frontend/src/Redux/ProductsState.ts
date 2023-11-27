import { createStore } from "redux";
import ProductModel from "../Models/ProductModel";

// 1. Global state (class)
export class ProductsState {
    products: ProductModel[] = [];
    //.... bestProduct
}

// 2. Action Types(enum)
export enum ProductsActionTypes {
    SetProducts = "SetProducts",
    AddProduct = "AddProduct",
    UpdateProduct = "UpdateProduct",
    DeleteProduct = "DeleteProduct",
    ClearAll = "ClearAll"
}


// 3. Action Object (interface)
export interface ProductsAction {
    type: ProductsActionTypes,
    payload?: any
}

// 4. Reducer - will perform action for etch case
function productsReducer(currentState = new ProductsState(), action: ProductsAction): ProductsState {

    const newState = { ...currentState };

    switch (action.type) {
        case ProductsActionTypes.SetProducts:
            // payload is ProductModel[]
            newState.products = action.payload;
            break;
        case ProductsActionTypes.AddProduct:
            // payload is ProductModel
            newState.products.push(action.payload);
            break;
        case ProductsActionTypes.UpdateProduct:
            // payload is ProductModel
            const indexToUpdate = newState.products.findIndex(p => p.id === action.payload.id);
            newState.products[indexToUpdate] = action.payload;
            // newState.products.splice(indexToUpdate, 1,action.payload);
            break;
        case ProductsActionTypes.DeleteProduct:
            // payload is id
            const indexToDelete = newState.products.findIndex(p => p.id === action.payload);
            newState.products.splice(indexToDelete, 1);
            break;
        case ProductsActionTypes.ClearAll:
            newState.products = [];
            break;
    }

    return newState;

}


//5. store - create -> pass the reducer.
export const productsStore = createStore(productsReducer);

