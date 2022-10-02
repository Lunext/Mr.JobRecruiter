import useEmployee from "../../hooks/useEmployee";
import { Link } from "react-router-dom";

const OfficialEmployee = ({employee}) => {

    
    const {cedula,name,salary,jobPosition,department,hireDate,isAvailable,_id}=employee; 
    const{deleteEmployee}=useEmployee(); 
    
    const formatDate=(date)=>{
        const newDate= new Date(date); 
        return new Intl.DateTimeFormat('es-Es', {dateStyle:'long'}).format(newDate); 
    }
   
  return (
    <div>

  <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
    <div className="relative p-8 space-y-8">
      
      <div className="space-y-2">
        <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
          {name}
        </h5>
        <p className="text-sm text-gray-600">
            Cedula: {cedula}
        </p>
        <p className="text-sm text-gray-600">
          Salario mensual: ${salary}
        </p>
        <p className="text-sm text-gray-600">
          Puesto: {jobPosition?.name??jobPosition}
        </p>
        <p className="text-sm text-gray-600">
          Departamento: {department?.name ??department}
         </p>
         <p className="text-sm text-gray-600">
          Fecha de contratacion: {formatDate(hireDate)}
         </p>
         <p className="text-sm text-gray-600">
          Estatus:   {isAvailable?(
           <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs ">Activo</span>


        ):(
          <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Inactivo</span>
        )}
         </p>
      </div>
      <Link onClick={()=>deleteEmployee(_id)}
        to="#"
        className="flex justify-between items-center group-hover:text-yellow-600"
      >
        <span className="text-sm">Eliminar Empleado...</span>
        <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0" >
          X
        </span>
      </Link>
    </div>
  </div>



</div>

  )
}

export default OfficialEmployee;
