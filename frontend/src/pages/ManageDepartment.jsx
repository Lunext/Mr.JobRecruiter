import { useState } from "react";
import DepartmentList from "../components/Admin/DepartmentList";
import DepartmentForm from "../components/Admin/DepartmentForm";
import { DepartmentProvider } from "../context/DepartmentProvider";
const ManageDepartment = () => {
  return (
    <DepartmentProvider>
    <div className="flex flex-col md:flex-row">
      <div className="md:block md:w-1/2 lg:w-2/5">
        <DepartmentForm/>
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <DepartmentList/>
      </div>

    </div>
    </DepartmentProvider>
  )
}

export default ManageDepartment
