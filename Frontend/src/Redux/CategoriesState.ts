import { createStore } from "redux";
import CategoryModel from "../Models/CategoryModel";

// Class to hold the state
export class CategoriesState {
    categories: CategoryModel[] = [];
}

// action types (enum)
export enum CategoriesActionTypes {
    SetCategories = "SetCategories"
}

// action object (interface)
export interface CategoriesAction {
    type: CategoriesActionTypes,
    payload?: any
}

// Reducer
function categoriesReducer(currentState = new CategoriesState(), action: CategoriesAction): CategoriesState {
    const newState = { ...currentState };

    switch (action.type) {
        case CategoriesActionTypes.SetCategories:
            newState.categories = action.payload;
    }

    return newState;
}

// create store
export const categoriesStore = createStore(categoriesReducer);