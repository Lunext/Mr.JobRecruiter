import useCandidate from "../../hooks/useCandidate";

const Candidate = ({candidate}) => {

    const{setEdit, deleteCandidate}=useCandidate(); 
    const{cedula,name,salary,jobPosition,departments,competences,trainings,jobExperiences,recommendedBy,_id}=candidate; 
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p className="font-bold uppercase text-blue-800 my-2 ">Nombre: {' '}
        <span className="font-normal normal-case text-black ">{name}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Cedula: {' '}
        <span className="font-normal normal-case text-black ">{cedula}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Salario: {' '}
        <span className="font-normal normal-case text-black ">${salary}RD</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Puesto: {' '}
        <span className="font-normal normal-case text-black ">{jobPosition?.name ?? jobPosition}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Departamento: {' '}
        <span className="font-normal normal-case text-black ">{departments}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Competencias: {' '}
        <span className="font-normal normal-case text-black ">{competences}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Capacitaciones: {' '}
        <span className="font-normal normal-case text-black ">{trainings}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Experiencia Laboral: {' '}
        <span className="font-normal normal-case text-black ">{jobExperiences}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Recomendado por: {' '}
        <span className="font-normal normal-case text-black ">{recommendedBy}</span>
    </p>
   
   
  
    <div className="flex justify-between my-5">
        <button
            type="button"
            className="py-2 px-10 bg-blue-800 hover:bg-blue-900 text-white uppercase font-bold rounded-lg "
            onClick={()=> setEdit(candidate)}
        >
            Editar 
        </button>
        <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg "
            onClick={()=>deleteCandidate(_id)}
        >
            Eliminar
        </button>

    </div>

</div>
  )
}

export default Candidate;