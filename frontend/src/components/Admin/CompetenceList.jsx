import Competence from "./Competence";
import useCompetence from "../../hooks/useCompetence";
const CompetenceList = () => {

    const{competences}=useCompetence(); 
  return (
    <>
    
    {competences.length?(
        <>
        
          <h2 className="font-black text-3xl text-center ">Listado de Competencias</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{' '}
          <span className="text-gray-600 font-bold ">Competencias</span>
        </p>
      
        {competences.map(competence=>(
          <Competence
            key={competence._id}
            competence={competence}
          />
        ))}
        </>
    ): (
      <>
        <h2 className="font-black text-3xl text-center ">No hay competencias</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando competencias{' '}
          <span className="text-gray-600 font-bold ">y apareceran en este lugar</span>
        </p>

     </>

    )}

 </>
 
    
  )
}

export default CompetenceList;