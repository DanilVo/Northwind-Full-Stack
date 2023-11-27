import express, { Request, Response, NextFunction } from 'express';
import StatusCode from '../3-models/status-codes';
import EmployeeModel from '../3-models/employee-model';
import employeeService from '../5-services/employees-service';
import path from 'path';

const router = express.Router();

// Get all employees:
router.get(
  '/employees',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const employees = await employeeService.getAllEmployees();
      response.json(employees);
    } catch (err: any) {
      next(err);
    }
  }
);

// Get one employee:
router.get(
  '/employees/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const employee = await employeeService.getOneEmployee(id);
      response.json(employee);
    } catch (err: any) {
      next(err);
    }
  }
);

// Add one employee:
router.post(
  '/employees',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image;
      const employee = new EmployeeModel(request.body);
      const addedEmployee = await employeeService.addEmployee(employee);
      response.status(StatusCode.Created).json(addedEmployee);
    } catch (err: any) {
      next(err);
    }
  }
);

// Update Employee employee:
router.put(
  '/employees/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.id = +request.params.id;
      request.body.image = request.files?.image;
      const employee = new EmployeeModel(request.body);
      const updatedEmployee = await employeeService.updateEmployee(employee);
      response.json(updatedEmployee);
    } catch (err: any) {
      next(err);
    }
  }
);

// Delete employee:
router.delete(
  '/employees/:id',
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await employeeService.deleteEmployee(id);
      response.sendStatus(StatusCode.NoContent);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  '/employees-image/:imageName',
  (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const absolutePath = path.join(
        __dirname,
        '..',
        '1-assets',
        'images',
        imageName
      );
      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
