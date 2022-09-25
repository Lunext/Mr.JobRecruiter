import{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import  Alert from '../../components/Alert'; 
import useCompetence from '../../hooks/useCompetence';

const CompetenceForm = () => {
    const navigate=useNavigate(); 
    const[description, setDescription]=useState(''); 
    const[isAvailable, setIsAvailable]=useState(false); 
    const[id,setId]=useState(null);
    const[alert,setAlert]=useState({}); 
    const{saveCompetence,competence}=useCompetence();
    
    useEffect(()=>{
        if(competence?.description){
            setDescription(competence.description);
            setIsAvailable(competence.isAvailable); 
            setId(competence._id);
        }
    },[competence]);

    const handleSubmit=async e=>{
        e.preventDefault(); 
        //VALIDATIONS 
        if([description].includes('')){
            setAlert({
                msg:'Todos los campos son obligatorios!', 
                error:true
            });
            return; 
        }
        let result= await saveCompetence({description,isAvailable,id});
        if(result){
            setAlert({
                msg:'Guardado correctamente'
            });
            setDescription('');
            setIsAvailable(false); 
            setId('');
        }else{
            setAlert({
                msg:'La competencia ya existe!', 
                error:true
            });
        }

    }
    const onAvailabilityChanged=e=>{
        const values=Array.from(e.target.selectedOptions,isAvailable=>isAvailable.value)
        setIsAvailable(values);
    }
    const{msg}=alert; 
  return (
    <>
        <h2 className='font-black text-3xl text-center'>Administrador de competencias</h2>
        <p className='text-xl mt-5 mb-10 text-center'>
            Agrega tus competencias y{' '}
            <span className='text-gray-600 font-bold'>Administra</span>
        </p>
        {msg && <Alert alert={alert}/>}
        <form
        className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'
        onSubmit={handleSubmit} 
        >
            <div className='mb-5'>
                <label htmlFor="name">
                    Competencia
                </label>
                <input type="text" 
                    id="description"
                    placeholder='Introduzca una competencia'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
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
                   value={id? 'Guardar cambios': 'Agregar competencias'}
             />

        </form>
   </>
  
  )
}

export default CompetenceForm;
