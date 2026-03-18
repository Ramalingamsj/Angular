import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Observable } from 'rxjs';
import { Department } from '../models/department';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  //declare variables

  employee:Employee=new Employee();
  employees:Employee[]=[];

  //constructor      httpClient=varaiable name
  constructor(private httpClient:HttpClient){

  }

  //1=Get all employees

  getAllEmployees():void{
    //https://localhost:7020/api/Employees      
    this.httpClient.get<any>(environment.apiUrl +'Employees')
    .subscribe({
      next:response=>{                        //success
        this.employees=response.$values;
        console.log('Employees:',response);

      },
      error:error=>console.log('Custom Error:',error),//failure --Error
      complete:()=>console.log('Request complete')      //completion

    });
  }
  
// get  departments
getAllDepartments():Observable<Department[]>{//it returns a stram data(observalble)
return this.httpClient.get<any>(
  environment.apiUrl+'employees/departments'// eventually emits an array off Department
).pipe(
  map((res:any)=>res ??[])
);
}
//angular http is asynchronus observables help handle async data,subscribe to response and use operators map,filter
//why  .pipe (map()) is used pipe is used to apply rxjs(map is the rxjs operator) operators to data
//map () is used to transform the data before it is returned to the component, 
// in this case we are transforming the response to return only the array of departments



insertEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(environment.apiUrl + 'Employees', employee);
  }
}
