import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { EmployeeList } from './employees/employee-list/employee-list';
import { EmployeesEdit } from './employees/employees-edit/employees-edit';
import { EmployeesAdd } from './employees/employees-add/employees-add';
import { Employees } from './employees/employees';
import { Login } from './auth/login/login';
import { log } from 'console';

export const routes: Routes = [
  //Lazy Loading

  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      // // call list of employees
      // { path: 'admin', component: EmployeeList },
      // // add an employee
      // { path: 'manager', component: EmployeesAdd },
      // { path: 'notfound', component: EmployeesEdit }
      
    ]
  },
  {
    path: 'employees',
    children: [
      { path: '', component: Employees },
      // call list of employees
      { path: 'list', component: EmployeeList },
      // add an employee
      { path: 'add', component: EmployeesAdd },
      { path: 'edit/:id', component: EmployeesEdit }
      
    ]
  }
];