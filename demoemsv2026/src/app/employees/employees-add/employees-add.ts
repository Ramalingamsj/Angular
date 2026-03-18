import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees-add',
  imports: [FormsModule,CommonModule],
  templateUrl: './employees-add.html',
  styleUrl: './employees-add.css',
})
export class EmployeesAdd {
employee:Employee=new Employee()
  constructor(){

  }
  ngOnInit(){

  }
  //submit form
  OnSubmit(empForm:NgForm){
    console.log(empForm.value)
  }
}
