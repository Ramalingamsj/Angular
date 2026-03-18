import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { EmployeeList } from './employees/employee-list/employee-list';
import { EmployeesEdit } from './employees/employees-edit/employees-edit';
import { EmployeesAdd } from './employees/employees-add/employees-add';

export const routes: Routes = [
  //Lazy Loading

  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    children: [
      { path: '', component: EmployeeList },
      // call list of employees
      { path: 'list', component: EmployeeList },
      // add an employee
      { path: 'add', component: EmployeesAdd },
      { path: 'edit/id', component: EmployeesEdit }
    ]
  }
];