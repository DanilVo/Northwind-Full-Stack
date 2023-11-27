import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeesService from "../../../Service/EmployeesService";
import notificationService from "../../../Service/NotificationService";
import appConfig from "../../../Utils/AppConfig";
import "./EmployeeDetails.css";

function EmployeeDetails(): JSX.Element {

    // Get employeeId from params
    const params = useParams();
    const id = +params.employeeId;
    // Display Employee Data
    const [feEmployee, setFeEmployee] = useState<EmployeeModel>()

    // Get employee from BE by employeeId
    useEffect(() => {
        employeesService.getOneEmployee(id)
            .then(beEmployee => setFeEmployee(beEmployee))
            .catch(err => notificationService.error(err));
    }, [])

    return (
        <div className="EmployeeDetails">
            <h2>Employee Details</h2>
            <h3>Full Name: {feEmployee?.firstName + " " + feEmployee?.lastName}</h3>
            <h3>Title: {feEmployee?.title}</h3>
            <h3>Lives In: {feEmployee?.city + ", " + feEmployee?.country}</h3>
            <h3>Birthday: {feEmployee?.birthDate}</h3>
            <img src={appConfig.employeesUrl + "images/" + feEmployee?.imageName} />
            <br />
            <NavLink to={"/employees"}>Back</NavLink>
            <span> | </span>
            <NavLink to={"/employees/edit/" + feEmployee?.id}>Edit</NavLink>
            <span> | </span>
            <NavLink to={"#"}>Delete</NavLink>

        </div>
    );
}

export default EmployeeDetails;
