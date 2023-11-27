import { NavLink, useNavigate } from "react-router-dom";
import "./AuthMenu.css";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Service/AuthService";
import notificationService from "../../../Service/NotificationService";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    const navigate = useNavigate()

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });

        return unsubscribe;
    }, []);

    function logoutMe(): void {
        authService.logout();
        notificationService.success("Bye Bye");
        navigate("/login");
    }

    return (
        <div className="AuthMenu">
            {!user &&
                <p>
                    <span>Hello Guest</span>
                    <span> | </span>
                    <NavLink to="/login">Login</NavLink>
                    <span> | </span>
                    <NavLink to="/register">Register</NavLink>
                </p>
            }
            {user &&
                <p>
                    <span>Hello {user.firstName + " " + user.lastName}</span>
                    <span> | </span>
                    <NavLink to="/home" onClick={logoutMe}>Logout</NavLink>
                </p>}
        </div >
    );
}

export default AuthMenu;
