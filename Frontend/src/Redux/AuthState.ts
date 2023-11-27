import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. AuthState -> class
export class AuthState {
    public user: UserModel = null;
    public token: string = null;
    
    constructor() {
        this.token = localStorage.getItem('token');
        if (this.token) {
            this.user = jwtDecode<{ user: UserModel }>(this.token).user;
        }
    }
}


// 2. Action Type -> enum
export enum AuthActionTypes {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// 3. Action object -> interface
export interface AuthAction {
    type: AuthActionTypes,
    payload?: any // maybe we will change it
}

// 4. Auth Reducer -> function
function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionTypes.Register:
        case AuthActionTypes.Login:
            // Payload is the token
            console.log(jwtDecode(action.payload));
            newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;
            newState.token = action.payload;
            localStorage.setItem(`token`, newState.token);
            // console.log(newState);
            break;
        case AuthActionTypes.Logout:
            newState.user = null;
            newState.token = null;
            localStorage.removeItem('token');
            break;
    }

    return newState

}

// 5. create store
export const authStore = createStore(authReducer);