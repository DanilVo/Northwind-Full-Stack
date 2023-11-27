import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import EmployeeList from "../../EmployeeArea/EmployeeList/EmployeeList";
import Home from "../../HomeArea/Home/Home";
import AddProduct from "../../ProductsArea/AddProduct/AddProduct";
import EditProduct from "../../ProductsArea/EditProduct/EditProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductsList from "../../ProductsArea/ProductsList/ProductsList";
import PageNotFound from "../PageNotFound/PageNotFound";
import AddEmployee from "../../EmployeeArea/AddEmployee/AddEmployee";
import EmployeeDetails from "../../EmployeeArea/EmployeeDetails/EmployeeDetails";
import appConfig from "../../../Utils/AppConfig";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import CategoriesList from "../../CategoriesArea/CategoriesList/CategoriesList";
import CategoryDetails from "../../CategoriesArea/CategoryDetails/CategoryDetails";
import ContactUs from "../../AboutArea/ContactUs/ContactUs";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                {/* Home Route */}
                <Route path="/home" element={<Home />} />

                {/* Products Route */}
                <Route path={appConfig.productsRoute} element={<ProductsList />} />

                {/* Product Details */}
                <Route path={appConfig.ProductDetailsRoute + ":prodId"} element={<ProductDetails />} />

                {/* Edit Product */}
                <Route path={appConfig.editProductRoute + ":prodId"} element={<EditProduct />} />

                {/* Add new Product */}
                <Route path={appConfig.addProductRoute} element={<AddProduct />} />

                {/* Employees Route */}
                <Route path="/employees" element={<EmployeeList />} />

                {/* Add Employee Route */}
                <Route path="/employees/new" element={<AddEmployee />} />

                {/*  Employee Details Route */}
                <Route path="/employees/details/:employeeId" element={<EmployeeDetails />} />

                {/* About Route */}
                <Route path="/about" element={<About />} />

                {/* Contact us Route */}
                <Route path="/contact-us" element={<ContactUs />} />

                {/* Register Route */}
                <Route path="/register" element={<Register />} />

                {/* Register Route */}
                <Route path="/login" element={<Login />} />

                {/* ************************ Categories ******************* */}
                {/* Register Route */}
                <Route path="/categories" element={<CategoriesList />} />

                {/* Register Route */}
                <Route path={appConfig.categoryDetailsRoute + ":categoryId"} element={<CategoryDetails />} />



                {/* Default Route */}
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found Route*/}
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
