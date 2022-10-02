import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert'; 
import useJobPosition from '../../hooks/useJobPosition';
import RISKLEVEL from '../../config/riskLevel';

const JobPositionForm = () => {
  
    const navigate=useNavigate(); 
    const[name,setName]=useState('');
    const [riskLevel, setRiskLevel]=useState();
    const [minSalary, setMinSalary]=useState(0); 
    const [maxSalary, setMaxSalary]=useState(0); 
    const[isAvailable, setIsAvailable]=useState(false); 
    const [id, setId]= useState(null); 
    const [alert, setAlert]=useState({}); 
    const{saveJobPosition, jobPosition}= useJobPosition(); 

    useEffect(()=>{
        //Si existe nombre llenar los campos
        if(jobPosition?.name){
            setName(jobPosition.name); 
            setRiskLevel(jobPosition.riskLevel); 
            setMinSalary(parseFloat(jobPosition.minSalary)); 
            setMaxSalary(parseFloat(jobPosition.maxSalary)); 
            setIsAvailable(jobPosition.isAvailable); 
            setId(jobPosition._id); 
        }
    },[jobPosition]); 
  
    //Send the jobposition after validating

    const handleSubmit=async e=>{
        e.preventDefault();

        //Validations
        if([name,riskLevel].includes('') && [minSalary,maxSalary].includes(0)){
            setAlert({
                msg:'Todos los campos son obligatorios', 
                error:true
            });
            return; 

        }
        if(parseFloat(maxSalary)===parseFloat(minSalary)){
            setAlert({
                msg:'Los salarios no pueden ser iguales',
                error:true
            }); 
            return;
        }
        if(parseFloat(maxSalary)<0 || parseFloat(minSalary)<0){
            setAlert({
                msg:'Los valores no pueden ser negativos', 
                error:true
            });
            return;
        }
        if(parseFloat(maxSalary)===0 || parseFloat(minSalary)===0){
            setAlert({
                msg:'Los valores no pueden ser neutros', 
                error:true
            })
            return;
        }
        if(parseFloat(maxSalary)<parseFloat(minSalary)){
            setAlert({
                msg:'El salario minimo no puede ser mayor al salario maximo',
                error:true
            }); 
            return; 
        }
        let result= await saveJobPosition({name,riskLevel,minSalary,maxSalary,isAvailable,id}); 
        if(result){
            setAlert({
                msg:'Guardado correctamente'
            });
            setName(''); 
            setRiskLevel(); 
            setMinSalary(0);
            setMaxSalary(0); 
            setIsAvailable(false); 
            setId('');
        }else{
            setAlert({
                msg:'Posicion laboral ya registrada!', 
                error:true
            });
        }

    }
    

    const onLevelRisksChanged=e=>{
         const values=e.target.value;
        setRiskLevel(values);
    }
    const{msg}=alert; 
  

  return (
    <div>
          <>
    <h2 className='font-black text-3xl text-center'>Administrador de Posiciones laborales</h2>
    <p className='text-xl mt-5 mb-10 text-center'>
        Agrega tus posiciones laborales y{' '}
        <span className='text-gray-600 font-bold'>Administra</span>
    </p>
    {msg && <Alert alert={alert}/>}
    <form
    className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'
    onSubmit={handleSubmit} 
    >
        <div className='mb-5'>
            <label htmlFor="name">
                Posicion laboral
            </label>
            <input type="text" 
                id="name"
                placeholder='Introduzca una posición laboral'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={name}
                onChange={e=>setName(e.target.value)}
             />
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="riskLevel">
                Elige un nivel de riesgo
            </label>
            <select onChange={onLevelRisksChanged}
                value={riskLevel}
             id="riskLevel" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>
                
                {Object.values(RISKLEVEL).map(riskLevel=>(
                    <option key={riskLevel} value={riskLevel}>{riskLevel}</option>
                ))}
            </select>
        </div>
        <div className='mb-5'>
            <label htmlFor="minSalary">
                Nivel de salario minimo
            </label>
            <input type="number" 
                id="minSalary"
                placeholder='Introduzca un salario minimo'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={minSalary}
                onChange={e=>setMinSalary(e.target.value)}
             />
        </div>
        <div className='mb-5'>
            <label htmlFor="minSalary">
                Nivel de salario maximo
            </label>
            <input type="number" 
                id="maxSalary"
                placeholder='Introduzca un salario maximo'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={maxSalary}
                onChange={e=>setMaxSalary(e.target.value)}
             />
        </div>
        <div className='mb-5'>
            <label htmlFor="isAvailable">
                    Disponibilidad
            </label>
           <input type="checkbox"
            className='border-2 ml-5 p-2 mt-2 rounded-md '
           id='isAvailable'
            checked={isAvailable} onChange={()=>setIsAvailable(!isAvailable)}
            
            />
        </div>

        <input type="submit"
               className='bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors '
               value={id? 'Guardar cambios': 'Agregar posiciones laborales'}
         />

    </form>
</>
      
    </div>
  )
}


export default JobPositionForm
