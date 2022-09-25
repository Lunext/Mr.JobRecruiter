import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '../../components/Alert'; 
import useDepartment from "../../hooks/useDepartment";


const DepartmentForm = () => {
    const navigate=useNavigate(); 
    const[name,setName]=useState('');
    const[isAvailable,setIsAvailable]=useState(false); 
    const[id,setId]=useState(null); 
    const[alert,setAlert]=useState({});
    const{saveDepartment, department}=useDepartment();
    //Fill the department. 
    useEffect(()=>{
        if(department?.name){
            setName(department.name); 
            setIsAvailable(department.isAvailable); 
            setId(department._id); 
        }
    },[department]); 
    //Send the department after validating 
    const handleSubmit=async e=>{
        e.preventDefault();

        //Validations 
        if([name].includes('')){
            setAlert({
                msg:'Todos los campos son obligatorios', 
                error:true
            });
            return;
        }
        let result=await saveDepartment({name,isAvailable,id});
        if(result){
            setAlert({
                msg:'Guardado correctamente'
            });
            setName(''); 
            setIsAvailable(false); 
            setId('');
        }else{
            setAlert({
                msg:'Departamento ya registrado!', 
                error:true
            })
        }
    }
    const{msg}=alert; 
  return (
    <>
    <h2 className='font-black text-3xl text-center'>Administrador de Departamentos</h2>
    <p className='text-xl mt-5 mb-10 text-center'>
        Agrega tus lenguajes y{' '}
        <span className='text-gray-600 font-bold'>Administra</span>
    </p>
    {msg && <Alert alert={alert}/>}
    <form
    className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'
    onSubmit={handleSubmit} 
    >
        <div className='mb-5'>
            <label htmlFor="name">
                Departamento
            </label>
            <input type="text" 
                id="name"
                placeholder='Introduzca un departamento'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={name}
                onChange={e=>setName(e.target.value)}
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
               value={id? 'Guardar cambios': 'Agregar departamentos'}
         />

    </form>
</>
  )
}

export default DepartmentForm;
