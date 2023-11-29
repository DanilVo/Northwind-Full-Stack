import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Service/AuthService";
import notificationService from "../../../Service/NotificationService";
import { useNavigate } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate()

    async function send(credentials: CredentialsModel) {
        // service
        try {
            await authService.login(credentials);
            notificationService.success("You have been logged-in successfully");
            navigate(-1);
        } catch (err: any) {
            notificationService.error(err);
        }
    }

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>Email:</label>
                <input type="text"  {...register("Email")} />

                <label>Password:</label>
                <input type="password"  {...register("password")} />

                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;
