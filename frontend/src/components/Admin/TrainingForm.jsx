import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '../../components/Alert'; 
import useTraining from "../../hooks/useTraining";
import LEVEL from "../../config/level";
import moment from 'moment';

const TrainingForm = () => {
    
    const navigate=useNavigate(); 
    const[description,setDescription]=useState('');
    const[level,setLevel]=useState(); 
    const[dateFrom,setDateFrom]=useState('');
    const[dateTo,setDateTo]=useState(''); 
   

    const[institution,setInstitution]=useState(''); 
    const[id,setId]=useState(null); 
    const[alert,setAlert]=useState({}); 
    const{saveTraining,training}=useTraining(); 

    useEffect(()=>{
        if(training?.description){
            setDescription(training.description); 
            setLevel(training.level); 
            setDateFrom(moment(training.dateFrom).format('YYYY-MM-DD')); 
            setDateTo(moment(training.dateTo).format('YYYY-MM-DD')); 
            setInstitution(training.institution); 
            setId(training._id); 
        }
    },[training]); 

    const handleSubmit=async e=>{
        e.preventDefault(); 

        if([description,level,dateFrom,dateTo,institution].includes('')){
            setAlert({
                msg:'Todos los campos son obligatorios', 
                error:true
            });
            return; 
        }
        if(Date.parse(dateFrom)>Date.parse(dateTo)){
            setAlert({
                msg:'La fecha de inicio no puede ser mayor a la fecha de finalización',
                error:true
            });
            return; 

        }
        let result=await saveTraining({description,level,dateFrom,dateTo,institution,id}); 
        if(result){
            setAlert({
                msg:'Guardado correctamente'
            });
            setDescription(''); 
            setLevel(); 
            setDateFrom('');
            setDateTo('');
            setInstitution('');
            setId(''); 
        }else{
            setAlert({
                msg:'Capacitacion ya registrada!', 
                error:true
            });
        }

    }

    const onLevelChanged=e=> setLevel(e.target.value); 

    const{msg}=alert; 

  return (
            <div>
            <>
        <h2 className='font-black text-3xl text-center'>Administrador de Capacitaciones</h2>
        <p className='text-xl mt-5 mb-10 text-center'>
        Agrega tus Capacitaciones y{' '}
        <span className='text-gray-600 font-bold'>Administra</span>
        </p>
        {msg && <Alert alert={alert}/>}
        <form
        className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'
        onSubmit={handleSubmit} 
        >
        <div className='mb-5'>
            <label htmlFor="name">
                Capacitación
            </label>
            <input type="text" 
                id="description"
                placeholder='Introduzca una capacitación'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={description}
                onChange={e=>setDescription(e.target.value)}
            />
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="riskLevel">
                Elige un nivel de capacitaciòn
            </label>
            <select onChange={onLevelChanged} 
            value={level}

            id="level" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>
                
                {Object.values(LEVEL).map(level=>(
                    <option key={level} value={level}>{level}</option>
                ))}
            </select>
        </div>
      
        <div className="mb-5">
          <label 

          htmlFor="dateFrom">  Fecha desde</label>
          <input type="date" 
                  id="dateFrom"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={dateFrom}
                  onChange={e=>setDateFrom(e.target.value)}
          />  
        </div>

        <div className="mb-5">
          <label 

          htmlFor="dateFrom">  Fecha hasta</label>
          <input type="date" 
                  id="dateTo"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  value={dateTo}
                  onChange={(e)=>setDateTo(e.target.value)}
          />
        </div>
        <div className='mb-5'>
            <label htmlFor="institution">
                Instituciòn
            </label>
            <input type="text" 
                id="institution"
                placeholder='Introduzca una institucion'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={institution}
                onChange={e=>setInstitution(e.target.value)}
            />
        </div>
       

        <input type="submit"
                className='bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors '
                value={id? 'Guardar cambios': 'Agregar Capacitaciones'}
        />

        </form>
        </>

        </div>
   
  )
}

export default TrainingForm;
