import useTraining from "../../hooks/useTraining"

const Training = ({training}) => {
    const{setEdit, deleteTraining}=useTraining(); 
    const{description,level,dateFrom,dateTo,institution,_id}=training;
    const formatDate=(date)=>{
        const newDate= new Date(date); 
        return new Intl.DateTimeFormat('es-Es', {dateStyle:'long'}).format(newDate); 
    }
 //   console.log(date);
  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p className="font-bold uppercase text-blue-800 my-2 ">Capacitación: {' '}
        <span className="font-normal normal-case text-black ">{description}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Nivel: {' '}
        <span className="font-normal normal-case text-black ">{level}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Fecha desde: {' '}
        <span className="font-normal normal-case text-black ">{formatDate(dateFrom)}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Fecha hasta: {' '}
        <span className="font-normal normal-case text-black ">{formatDate(dateTo)}</span>
    </p>
    <p className="font-bold uppercase text-blue-800 my-2 ">Institución: {' '}
        <span className="font-normal normal-case text-black ">{institution}</span>
    </p>
   
  
    <div className="flex justify-between my-5">
        <button
            type="button"
            className="py-2 px-10 bg-blue-800 hover:bg-blue-900 text-white uppercase font-bold rounded-lg "
            onClick={()=> setEdit(training)}
        >
            Editar 
        </button>
        <button
            type="button"
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg "
            onClick={()=>deleteTraining(_id)}
        >
            Eliminar
        </button>

    </div>

</div>
  )
}

export default Training
