import { OkPacket } from 'mysql';
import dal from '../2-utils/dal';
import EmployeeModel from '../3-models/employee-model';
import { ResourceNotFound } from '../3-models/error-models';
import { fileSaver } from 'uploaded-file-saver';
import appConfig from '../2-utils/app-config';

class EmployeeService {
  private getEmployeeSelectQuery(): string {
    return `SELECT EmployeeID AS id,
                 firstName,
                 lastName,
                 DATE_FORMAT(BirthDate,"%D %M %Y") AS birthDate,
                 country,
                 city,
                 title
            FROM employees`;
  }

  private getEmployeeByIdQuery(id: number): string {
    return `${this.getEmployeeSelectQuery()} 
            WHERE EmployeeID = ${id}`;
  }

  public async getAllEmployees(): Promise<EmployeeModel[]> {
    const sql = this.getEmployeeSelectQuery();
    const employees = await dal.execute(sql);
    return employees;
  }

  public async getOneEmployee(id: number): Promise<EmployeeModel> {
    const sql = this.getEmployeeByIdQuery(id);
    const employee = await dal.execute(sql);

    if (!employee[0]) throw new ResourceNotFound(id);

    return employee[0];
  }

  public async addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    employee.postValidate();

    const imageName = await fileSaver.add(employee.image);
    const sql = `INSERT INTO employees(FirstName, LastName, BirthDate, Country, City, PhotoPath)
                 VALUES(?,?,?,?,?,?)`;
    const info: OkPacket = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      String(employee.birthDate),
      employee.country,
      employee.city,
      imageName,
    ]);
    employee.id = info.insertId;

    delete employee.image;
    employee.PhotoPath = `${appConfig.appHost}/api/employees/${imageName}`;

    return employee;
  }

  private async getExistingImageName(id: number): Promise<string> {
    const sql = `SELECT PhotoPath FROM employees
                WHERE EmployeeID = ${id}`;
    const employees = await dal.execute(sql);
    const employee = employees[0];
    console.log(employee.PhotoPath);
    
    if (!employee) return '';
    return employee.PhotoPath;
  }

  public async updateEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    employee.putValidate();
    const existingImageName = await this.getExistingImageName(employee.id);
    console.log("existing: " + existingImageName);

    const imageName = employee.image
      ? await fileSaver.update(existingImageName, employee.image)
      : existingImageName;
      console.log("new name: " + imageName);


    const sql = `UPDATE employees SET
    FirstName = '${employee.firstName}',
    LastName = '${employee.lastName}',
    BirthDate = '${employee.birthDate}',
    Country = '${employee.country}',
    City = '${employee.city}',
    PhotoPath = '${imageName}'
    WHERE EmployeeID = ${employee.id}`;

    const info: OkPacket = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFound(employee.id);
    delete employee.image;
    employee.PhotoPath = `${appConfig.appHost}/api/employees/${imageName}`;
    return employee;
  }

  public async deleteEmployee(id: number): Promise<void> {
    const sql = `DELETE FROM employees WHERE EmployeeID = ${id}`;
    const info: OkPacket = await dal.execute(sql);
    if (info.affectedRows === 0) throw new ResourceNotFound(id);
  }
}

const employeeService = new EmployeeService();
export default employeeService;
