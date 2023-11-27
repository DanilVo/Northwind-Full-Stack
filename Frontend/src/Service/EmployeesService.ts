import axios from "axios";
import EmployeeModel from "../Models/EmployeeModel";
import appConfig from "../Utils/AppConfig";

class EmployeesService {

    public async getAllEmployees(): Promise<EmployeeModel[]> {
        // Get all employees into response object
        const response = await axios.get(appConfig.employeesUrl);

        // Extract the employees from the response
        const employees = response.data;

        // Return employees
        return employees;
    }

    public async addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
        const options = {
            headers: { "Content-Type": "multipart/form-data" }
        }

        const response = await axios.post(appConfig.employeesUrl, employee, options);

        const beEmployee = response.data;

        return beEmployee;
    }

    public async getOneEmployee(id: number): Promise<EmployeeModel> {
        const response = await axios.get(appConfig.employeesUrl + id);

        const beEmployee = response.data;

        return beEmployee;
    }

}


const employeesService = new EmployeesService();

export default employeesService;