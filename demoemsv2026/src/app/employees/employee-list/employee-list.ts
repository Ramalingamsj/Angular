import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Employee } from '../../models/employee';
import { OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-employee-list',
  standalone:true,
  imports: [CommonModule, FormsModule,RouterModule,NgxPaginationModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {
    //Inject the sevice
    searchTerm:string='';
    p:number=1;
    itemmsPerPage:number=5;
    
    constructor(public employeesService:EmployeeService, public router:Router){                  //ie here initilaized in services there is get method
        console.log('EmployeeListComponent initilaized');
    }

    //Lifecycle Hook-Called when compaonent loads

    ngOnInit():void{    //when created
      this.employeesService.getAllEmployees();

    
    }
    editEmployee(seletedEmployee:Employee):void{
  console.log(seletedEmployee);

  //call popular employee
  this.populateEmployeeData(seletedEmployee);

  //Route to Edit component
  this.router.navigate(['/employees/edit/'+seletedEmployee.EmployeeId]);
}
//Getting 
populateEmployeeData(selectedEmployee:Employee){
  

  //Tranfrom Data Format as yyyy-mm--dd

  var dataPipe=new DatePipe("en-Uk");
  let formattedDate:any=dataPipe.transform(selectedEmployee.DateOfJoining,'yyyy-MM-dd');
  selectedEmployee.DateOfJoining=formattedDate;

  this.employeesService.employee={...selectedEmployee}
}

      
  }
