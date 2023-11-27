import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import notificationService from "../../../Service/NotificationService";
import authService from "../../../Service/AuthService";
import appConfig from "../../../Utils/AppConfig";
import { useNavigate } from "react-router-dom";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();

    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notificationService.success("You have been register successfully");
            navigate(appConfig.HomeRoute);
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="Register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>First Name:</label>
                <input type="text" {...register("firstName")} />

                <label>Last Name:</label>
                <input type="text"  {...register("lastName")} />

                <label>Username:</label>
                <input type="text"  {...register("username")} />

                <label>Password:</label>
                <input type="password"  {...register("password")} />

                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
