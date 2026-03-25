import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { EmployeeList } from './employees/employee-list/employee-list';
import { EmployeesEdit } from './employees/employees-edit/employees-edit';
import { EmployeesAdd } from './employees/employees-add/employees-add';
import { Employees } from './employees/employees';
import { Login } from './auth/login/login';
import { log } from 'console';
import { AdminDashboard } from './auth/admin-dashboard/admin-dashboard';
import { ManagerDashboard } from './auth/manager-dashboard/manager-dashboard';
import { authGuard } from './guards/auth-guard';

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
      { path: 'admin', component: AdminDashboard ,
        canActivate:[authGuard],
        data:{roleid:'1'}
      },
      // add an employee
      { path: 'manager', component: ManagerDashboard ,
        canActivate:[authGuard],
        data:{roleid:'2'}
      },
      // { path: 'notfound', component: EmployeesEdit }
      
    ]
  },
  {
    path: 'employees',
    children: [
      { path: '', component: Employees,
        canActivate:[authGuard],
        data:{roleid:'1'}
      },

      // call list of employees
      { path: 'list', component: Employees ,
        canActivate:[authGuard],
        data:{roleid:'2'}
      },
      // add an employee
      { path: 'add', component: EmployeesAdd },
      { path: 'edit/:id', component: EmployeesEdit }
      
    ]
  }
];