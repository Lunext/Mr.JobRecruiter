import { useState } from "react"; 
import OfficialEmployeeList from "../components/Admin/OfficialEmployeeList";
import { EmployeeProvider } from "../context/EmployeeProvider";
import { DepartmentProvider } from "../context/DepartmentProvider";
import { JobPositionProvider } from "../context/JobPositionProvider";
import { CandidateProvider } from "../context/CandidateProvider";

const ManageOffcialEmployees = () => {

 return (
    <EmployeeProvider>
     
    <DepartmentProvider>
       <JobPositionProvider>
       

           
                      <div>
                        <OfficialEmployeeList/>
                      </div>
          
            </JobPositionProvider>
        </DepartmentProvider>
        

   
        </EmployeeProvider>

        
  )
}

export default ManageOffcialEmployees;
