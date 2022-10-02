import { useState } from "react"; 
import EmployeeForm from "../components/Admin/EmployeeForm";
import { EmployeeProvider } from "../context/EmployeeProvider";
import { DepartmentProvider } from "../context/DepartmentProvider";
import { JobPositionProvider } from "../context/JobPositionProvider";
import EmployeeList from "../components/Admin/EmployeeList";
import { CandidateProvider } from "../context/CandidateProvider";
import { LanguageProvider } from "../context/LanguageProvider";

const ManageEmployees = () => {

 return (
    <EmployeeProvider>
     <CandidateProvider>
    <DepartmentProvider>
       <JobPositionProvider>
        <LanguageProvider>
       

           
                        <div className="flex flex-col md:flex-row">
            <div className="md:block md:w-1/2 lg:w-2/5">
                <EmployeeForm/>
            </div>
            <div className="md:w-1/2 lg:w-3/5">

                <EmployeeList/>
            </div>
            </div>
          
            </LanguageProvider>
            </JobPositionProvider>
        </DepartmentProvider>
        </CandidateProvider>

   
        </EmployeeProvider>

        
  )
}

export default ManageEmployees;
