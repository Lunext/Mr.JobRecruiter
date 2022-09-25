
import useJobPosition from '../../hooks/useJobPosition';

const JobPosition = ({jobPosition}) => {

    const{setEdit, deleteJobPosition}=useJobPosition(); 
    const{name,riskLevel,minSalary,maxSalary, isAvailable,_id}=jobPosition; 
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p className="font-bold uppercase text-blue-800 my-2 ">Posicion laboral: {' '}
        <span className="font-normal normal-case text-black ">{name}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Nivel de riesgo: {' '}
        <span className="font-normal normal-case text-black ">{riskLevel}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Nivel de salario minimo: {' '}
        <span className="font-normal normal-case text-black ">${minSalary}RD</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Nivel de salario maximo: {' '}
        <span className="font-normal normal-case text-black ">${maxSalary}RD</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2">Estado: {' '}
        
        {isAvailable?(
           <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs ">Disponible</span>


        ):(
          <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">No disponible</span>
        )}
    </p>
  
    <div className="flex justify-between my-5">
        <button
            type="button"
            className="py-2 px-10 bg-blue-800 hover:bg-blue-900 text-white uppercase font-bold rounded-lg "
            onClick={()=> setEdit(jobPosition)}
        >
            Editar 
        </button>
        <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg "
            onClick={()=>deleteJobPosition(_id)}
        >
            Eliminar
        </button>

    </div>

</div>
  )
}

export default JobPosition;