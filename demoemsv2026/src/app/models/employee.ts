import { Department } from "./department";

export class Employee {
     EmployeeId : number =0;
       EmployeeName : string="";
       Designation :string="";
       DateOfJoining : string="";
       DepartmentId : number=0;
       Contact :  string|null =null;
       IsActive : boolean =false;
       Department?:Department=new Department
}
