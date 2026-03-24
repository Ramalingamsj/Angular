import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Department } from '../../models/department';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees-add.html'
})
export class EmployeesAdd implements OnInit {

  employee: Employee = new Employee();
  departments: Department[] = [];

  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  //Get all Departments-- select dropdown box department names
  loadDepartments(): void {
  this.employeeService.getAllDepartments().subscribe({
    next: (data) => {
      this.departments = data; // ✅ FIX
    },
    error: (err) => console.log(err)
  });
}
  //Submit form
  OnSubmit(empForm: NgForm){
    console.log(empForm.value);

    //call method for INSERT
    this.addEmployee(empForm);

  }
  addEmployee(empForm: NgForm): void {
    this.employeeService.insertEmployee(empForm.value).subscribe({
      next: () => {
        this.employeeService.getAllEmployees();
        this.router.navigate(['']);
        empForm.reset();
      },
      error: (err) => console.log(err)
    });
  }
}