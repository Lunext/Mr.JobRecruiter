import useEmployee from "../../hooks/useEmployee"
import useCandidate from "../../hooks/useCandidate";
const Employee = ({candidate}) => {
 
    //const{setEdit, deleteEmployee}=useEmployee(); 
    const{cedula,name,salary,jobPosition,department,_id,competences,trainings,jobExperience,recommendedBy,languages}=candidate; 
    const{setEdit, deleteCandidate}=useCandidate();
    const hireDate=Date.now(); 
    const isAvailable=false;
    const formatDate=(date)=>{
        const newDate= new Date(date); 
        return new Intl.DateTimeFormat('es-Es', {dateStyle:'long'}).format(newDate); 
    }
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl" id='emp-table'>
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
        <span className="font-normal normal-case text-black ">{department?.name ?? department}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Competencias: {' '}
    
    {competences.map(competence=>(
            <span className="font-normal normal-case text-black "key={competence._id} item={competence}>{competence?.description ?? competence}  {' '}</span>
))}
     
   </p>
   <p className="font-bold uppercase text-blue-800 my-2 ">Lenguajes: {' '}
    
    {languages.map(language=>(
            <span className="font-normal normal-case text-black "key={language._id} item={language}>{language?.name ?? language}  {' '}</span>
))}
     
   </p>
   <p className="font-bold uppercase text-blue-800 my-2 ">Capacitaciones: {' '}
        
        {trainings.map(training=>(
                 <span className="font-normal normal-case text-black "key={training._id} item={training}>{training?.description ?? training} {' '}</span>
     ))}
        </p>
        <p className="font-bold uppercase text-blue-800 my-2 ">Experiencia Laboral: {' '}
        <span className="font-normal normal-case text-black ">{jobExperience?.company ?? jobExperience}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Recomendado por: {' '}
        <span className="font-normal normal-case text-black ">{recommendedBy}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Fecha de contratación: {' '}
        <span className="font-normal normal-case text-black ">{formatDate(hireDate)}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2">Estado: {' '}
        
        {isAvailable?(
           <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs ">Activo</span>


        ):(
          <span className="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Inactivo</span>
        )}
    </p>
   
    <div className="flex justify-between my-5">
        <button
            type="button"
            className="py-2 px-10 bg-blue-800 hover:bg-blue-900 text-white uppercase font-bold rounded-lg "
            onClick={()=> setEdit(candidate)}
        >
            Convertir a empleado 
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

export default Employee
