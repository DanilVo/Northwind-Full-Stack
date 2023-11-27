import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import addIcon from "../../../Assets/Images/add-icon.png";
import EmployeeModel from "../../../Models/EmployeeModel";
import employeesService from "../../../Service/EmployeesService";
import notificationService from "../../../Service/NotificationService";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import "./EmployeeList.css";

function EmployeeList(): JSX.Element {

    const [feEmployees, setFeEmployees] = useState<EmployeeModel[]>([]);

    useEffect(() => {
        employeesService.getAllEmployees()
            .then(beEmployees => setFeEmployees(beEmployees))
            .catch(err => notificationService.error(err));
    }, []);

    if (feEmployees.length === 0) return <h2>There nothing to show </h2>;

    return (
        <div className="EmployeeList">
            <NavLink className="addBtn" to="/employees/new"><img src={addIcon} /></NavLink>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Address</th>
                        <th>B-DAY</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {feEmployees?.map(e => <EmployeeCard key={e.id} employee={e} />)}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
