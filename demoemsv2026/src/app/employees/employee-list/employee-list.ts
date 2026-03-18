import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  standalone:true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
    //Inject the sevice
    searchTerm:string='';
    constructor(public employeesService:EmployeeService){                  //ie here initilaized in services there is get method
        console.log('EmployeeListComponent initilaized');
    }

    //Lifecycle Hook-Called when compaonent loads

    ngOnInit():void{    //when created
      this.employeesService.getAllEmployees();
    
    }

      
  }
