import Employee from "./Employee";
import useEmployee from "../../hooks/useEmployee";
//import ExportCSV from "../ExportCSV";
import useCandidate from "../../hooks/useCandidate";
const EmployeeList = () => {
    const{employees}=useEmployee(); 
    const{candidates}=useCandidate();


 //   const{cedula,name,salary,jobPosition,department,hireDate,isAvailable,_id}=employee; 

  return (
    <>
    
    {candidates.length?(
     
        <>
          <h2 className="font-black text-3xl text-center ">Listado de aspirantes a empleados</h2>
           
     
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{' '}
          <span className="text-gray-600 font-bold ">candidatos a empleados</span>
        </p>
       
           
       
         {candidates.map(candidate=>(
          <Employee
            key={candidate._id}
            candidate={candidate}
            
          />
          
        ))}

      
       
       
        </>
    ): (
      <>
      
        <h2 className="font-black text-3xl text-center ">No hay aspirantes a candidatos</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando candidatos{' '}
          <span className="text-gray-600 font-bold ">y apareceran en este lugar</span>
        </p>

     </>

    )}

 </>
 
  )
}
export default EmployeeList;
