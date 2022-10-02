import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '../../components/Alert'; 
import useJobExperience from "../../hooks/useJobExperience";
import moment from 'moment'; 

const JobExperienceForm = () => {

    const navigate=useNavigate(); 
    const [company, setCompany]=useState('');
    const [jobPosition, setJobPosition]= useState(''); 
    const[dateFrom,setDateFrom]=useState(''); 
    const[dateTo, setDateTo]=useState(''); 
    const[salary,setSalary]=useState(0); 
    const[id,setId]=useState(null); 
    const [alert,setAlert]=useState({}); 
    const{saveJobExperience, jobExperience}=useJobExperience(); 

   

    useEffect(()=>{
        if(jobExperience?.company){
            setCompany(jobExperience.company); 
            setJobPosition(jobExperience.jobPosition);
            setDateFrom(moment(jobExperience.dateFrom).format('YYYY-MM-DD')); 
            setDateTo(moment(jobExperience.dateTo).format('YYYY-MM-DD')); 
            setSalary(jobExperience.salary); 
            setId(jobExperience._id);


        }
    },[jobExperience]); 

    const handleSubmit=async e=>{
        e.preventDefault(); 

        if([company,jobPosition,dateFrom,dateTo].includes('') ||[salary].includes(0)){
            setAlert({
                msg:'Todos los campos son obligatorios', 
                error:true
            });
            return; 
        }if(Date.parse(dateFrom)>Date.parse(dateTo)){
            setAlert({
                msg:'La fecha de inicio no puede ser mayor a la fecha de finalización',
                error:true
            });
            return; 

            
        }
        if(parseFloat(salary)===0){
            setAlert({
                msg:'El salario no puede ser neutro', 
                error:true
            });
            return; 
        }
        if(parseFloat(salary)<0){
            setAlert({
                msg:'El salario no puede ser negativo!', 
                error:true
            });
            return;
        }
        
        let result=await saveJobExperience({company,jobPosition,dateFrom,dateTo,salary,id}); 
        if(result){
            setAlert({
                msg:'Guardado correctamente'
            });
            setCompany('');
            setJobPosition(''); 
            setDateFrom(''); 
            setDateTo('');
            setSalary(0); 
            setId(''); 
        }else{
            setAlert({
                msg:'Ya esta experiencia fue guardada por alguien mas!', 
                error:true
            });
        }
    }
    //const onJobPositionChanged=e=>setJobPosition(e.target.value); 

    const{msg}=alert; 
  return (
            <div>
            <>
        <h2 className='font-black text-3xl text-center'>Administrador de experiencias laborales</h2>
        <p className='text-xl mt-5 mb-10 text-center'>
        Agrega tus Experiencias Laborales y{' '}
        <span className='text-gray-600 font-bold'>Administra</span>
        </p>
        {msg && <Alert alert={alert}/>}
        <form
        className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'
        onSubmit={handleSubmit} 
        >
        <div className='mb-5'>
            <label htmlFor="company">
                Empresa
            </label>
            <input type="text" 
                id="company"
                placeholder='Introduzca una capacitación'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={company}
                onChange={e=>setCompany(e.target.value)}
            />
        </div>
        <div className='mb-5'>
            <label htmlFor="jobPosition">
                Puesto
            </label>
            <input type="text" 
                id="jobPosition"
                placeholder='Introduzca un puesto laboral'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={jobPosition}
                onChange={e=>setJobPosition(e.target.value)}
            />
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
            <label htmlFor="salary">
                Salario
            </label>
            <input type="number" 
                id="salary"
                placeholder='Introduzca una institucion'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={salary}
                onChange={e=>setSalary(e.target.value)}
            />
        </div>

        <input type="submit"
                className='bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors '
                value={id? 'Guardar cambios': 'Agregar experiencias laborales'}
        />

        </form>
        </>

        </div>

  )
}

export default JobExperienceForm
