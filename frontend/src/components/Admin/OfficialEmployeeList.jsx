import useCandidate from '../../hooks/useCandidate';
import useEmployee from '../../hooks/useEmployee';
import OfficialEmployee from './OfficialEmployee';
import ExportCSV from '../ExportCSV';
import { DepartmentProvider } from '../../context/DepartmentProvider';
import { JobPositionProvider } from '../../context/JobPositionProvider';
const OfficialEmployeeList = () => {

  const{employees}=useEmployee(); 
  return (
    
    <>
    <DepartmentProvider> 
       <JobPositionProvider>
    <div>
    
    
        <div className="py-16 bg-gray-50 overflow-hidden">
  <div className="container m-auto px-6 space-y-8 text-gray-500 md:px-12">
  <ExportCSV csvData={employees} fileName='Empleados'/>
      
  <div>
  <span className="text-gray-600 text-lg font-semibold">Empleados Registrados</span>
  <h2 className="mt-4 text-2xl text-gray-900 font-bold md:text-4xl">
    Observa y elimina tus empleados!{" "}
  </h2>
</div>
<div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
    {employees.map(employee=>(
      <OfficialEmployee
      key={employee._id}
      employee={employee}/>
    ))}
  </div>
</div>
</div>

      
    </div>
    </JobPositionProvider>
    </DepartmentProvider>
    </>
  )
}

export default OfficialEmployeeList;
