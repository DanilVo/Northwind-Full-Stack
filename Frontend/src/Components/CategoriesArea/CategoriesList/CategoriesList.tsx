import { useEffect, useState } from "react";
import "./CategoriesList.css";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Service/CategoriesService";
import notificationService from "../../../Service/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function CategoriesList(): JSX.Element {

    // useState -> for feCategories
    const [feCategories, setFeCategories] = useState<CategoryModel[]>([]);

    // useEffect -> to get categories form BE

    const navigate = useNavigate();

    useEffect(() => {
        categoriesService.getAllCategories()
            .then(beCategories => setFeCategories(beCategories))
            .catch(err => {
                if (err.response.status === 401) navigate(appConfig.loginRoute);
                notificationService.error(err)
            });
    }, []);

    return (
        <div className="CategoriesList">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feCategories?.map(c => <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.description}</td>
                        <td><img src={appConfig.categoriesUrl + "images/" + c.imageName} /></td>
                        <td><NavLink to={appConfig.categoryDetailsRoute + c.id}>🔎</NavLink></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriesList;
