import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Employee } from '../../models/employee';
import { Department } from '../../models/department';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-edit',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './employees-edit.html',
  styleUrl: './employees-edit.css',
})
export class EmployeesEdit {

  employee: Employee = new Employee();
  departments: Department[] = [];

  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.employee={...this.employeeService.employee};
  }

  //Get all Departments-- select dropdown box department names
  loadDepartments():void{
    if(this.employeeService.departments.length === 0){
      this.employeeService.getAllDepartments().subscribe();
       //departments
    }
  }
  //Submit form
  OnSubmit(empForm: NgForm){
    console.log(empForm.value);

    //call method for INSERT
    this.editEmployee(empForm);

  }
  editEmployee(empForm: NgForm): void {
    this.employeeService.updateEmployee(empForm.value).subscribe({
      next: () => {
        this.router.navigate(['list']);
        empForm.reset();
      },
      error: (err) => console.log(err)
    });
  }
  
}
