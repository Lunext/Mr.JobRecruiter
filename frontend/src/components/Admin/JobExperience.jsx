
import useJobExperience from '../../hooks/useJobExperience'
const JobExperience = ({jobExperience}) => {
    const{setEdit, deleteJobExperience}=useJobExperience(); 
    const{company,jobPosition,dateFrom,dateTo,salary,_id}=jobExperience; 

    const formatDate=(date)=>{
        const newDate= new Date(date); 
        return new Intl.DateTimeFormat('es-Es', {dateStyle:'long'}).format(newDate); 
    }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p className="font-bold uppercase text-blue-800 my-2 ">Empresa: {' '}
        <span className="font-normal normal-case text-black ">{company}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Puesto: {' '}
        <span className="font-normal normal-case text-black ">{jobPosition}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Fecha desde: {' '}
        <span className="font-normal normal-case text-black ">{formatDate(dateFrom)}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Fecha hasta: {' '}
        <span className="font-normal normal-case text-black ">{formatDate(dateTo)}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Salario: {' '}
        <span className="font-normal normal-case text-black ">${salary}{' '} RD</span>
    </p>
   
  
    <div className="flex justify-between my-5">
        <button
            type="button"
            className="py-2 px-10 bg-blue-800 hover:bg-blue-900 text-white uppercase font-bold rounded-lg "
            onClick={()=> setEdit(jobExperience)}
        >
            Editar 
        </button>
        <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg "
            onClick={()=>deleteJobExperience(_id)}
        >
            Eliminar
        </button>

    </div>

</div>
    
  )
}

export default JobExperience;
