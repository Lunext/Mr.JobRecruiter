import JobPosition from "./JobPosition";
import useJobPosition from "../../hooks/useJobPosition";

const JobPositionList = () => {
    const{jobPositions}=useJobPosition(); 
  return (
    <>
    {jobPositions.length?(
        <>
        
          <h2 className="font-black text-3xl text-center ">Listado de Posiciones laborales</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{' '}
          <span className="text-gray-600 font-bold ">Posiciones laborales</span>
        </p>
      
        {jobPositions.map(jobPosition=>(
          <JobPosition
            key={jobPosition._id}
            jobPosition={jobPosition}
          />
        ))}
        </>
    ): (
      <>
        <h2 className="font-black text-3xl text-center ">No hay posiciones laborales</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando posiciones laborales{' '}
          <span className="text-gray-600 font-bold ">y apareceran en este lugar</span>
        </p>

     </>

    )}

 </>
 

  
  )
}

export default JobPositionList;