import { Component } from '@angular/core';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeesAdd } from './employees-add/employees-add';


@Component({
  selector: 'app-employees',
   imports: [EmployeeList, EmployeesAdd],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {

}
