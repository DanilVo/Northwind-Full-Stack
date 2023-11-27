import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";
import authService from "./AuthService";
import { authStore } from "../Redux/AuthState";

class CategoriesService {

    public async getAllCategories(): Promise<CategoryModel[]> {


        const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);

        const categories = response.data;

        return categories;
    }

    public async getOneCategory(id: number): Promise<CategoryModel> {
        const response = await axios.get(appConfig.categoriesUrl + id);

        const category = response.data;

        return category;
    }
}

const categoriesService = new CategoriesService();

export default categoriesService;
