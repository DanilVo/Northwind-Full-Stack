import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./CategoryDetails.css";
import appConfig from "../../../Utils/AppConfig";
import { useEffect, useState } from "react";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Service/CategoriesService";
import notificationService from "../../../Service/NotificationService";

function CategoryDetails(): JSX.Element {

    const [feCategory, setFeCategory] = useState<CategoryModel>();

    const navigate = useNavigate();

    const params = useParams();
    const id = +params.categoryId;

    useEffect(() => {
        categoriesService.getOneCategory(id)
            .then(beCategory => setFeCategory(beCategory))
            .catch(err => {
                if (err.response.status === 401) navigate(appConfig.loginRoute)
                notificationService.error(err)
            });
    }, []);

    return (
        <div className="CategoryDetails">
            <h2>Category Details</h2>

            <h3>Name: {feCategory?.name}</h3>
            <h3>Description: {feCategory?.description}</h3>
            <img src={appConfig.categoriesUrl + "/images/" + feCategory?.imageName} />

            <br />
            <NavLink to={appConfig.categoriesRoute}>Back</NavLink>
        </div>
    );
}

export default CategoryDetails;
