import Candidate from './Candidate';
import useCandidate from '../../hooks/useCandidate';

const CandidateList = () => {
    const{candidates}=useCandidate(); 
  return (
    <>
    {candidates.length?(
        <>
        
          <h2 className="font-black text-3xl text-center ">Listado de Candidato</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{' '}
          <span className="text-gray-600 font-bold ">Candidatos</span>
        </p>
      
        {candidates.map(candidate=>(
          <Candidate
            key={candidate._id}
            candidate={candidate}
          />
        ))}
        </>
    ): (
      <>
        <h2 className="font-black text-3xl text-center ">No hay Candidatos</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando candidadtos{' '}
          <span className="text-gray-600 font-bold ">y apareceran en este lugar</span>
        </p>

     </>

    )}

 </>
 
   
  )
}

export default CandidateList;
