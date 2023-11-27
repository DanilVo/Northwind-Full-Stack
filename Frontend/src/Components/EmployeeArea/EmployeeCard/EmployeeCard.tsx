import { useNavigate } from "react-router-dom";
import EmployeeModel from "../../../Models/EmployeeModel";
import "./EmployeeCard.css";

type EmployeeProps = {
    employee: EmployeeModel
}


function EmployeeCard(props: EmployeeProps): JSX.Element {

    const navigate = useNavigate();

    function handleClick() {
        navigate(`/employees/details/${props.employee.id}`);
    }

    return (
        <tr className="EmployeeCard" onClick={handleClick}>
            <td>{props.employee.firstName} {props.employee.lastName}</td>
            <td>{props.employee.title}</td>
            <td>{props.employee.country}, {props.employee.city}</td>
            <td>{props.employee.birthDate}</td>
            <td><img src={"http://localhost:3030/api/employees/images/" + props.employee.imageName} /></td>
        </tr>
    );
}

export default EmployeeCard;
