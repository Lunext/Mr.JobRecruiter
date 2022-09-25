import Department from "./Department"
import useDepartment from "../../hooks/useDepartment"

const DepartmentList = () => {
    const{departments}=useDepartment();
  return (
    <>
    {departments.length?(
        <>
        
          <h2 className="font-black text-3xl text-center ">Listado de Departamentos</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{' '}
          <span className="text-gray-600 font-bold ">Departamentos</span>
        </p>
      
        {departments.map(department=>(
          <Department
            key={department._id}
            department={department}
          />
        ))}
        </>
    ): (
      <>
        <h2 className="font-black text-3xl text-center ">No hay departmaentos</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando departamentos{' '}
          <span className="text-gray-600 font-bold ">y apareceran en este lugar</span>
        </p>
     </>
    )}

 </>
 
  )
}

export default DepartmentList;
