import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '../../components/Alert'; 
import useEmployee from "../../hooks/useEmployee";
import useJobPosition from "../../hooks/useJobPosition";
import useDepartment from "../../hooks/useDepartment";
import moment from 'moment'; 
import Employee from "./Employee";
import Candidate from "./Candidate";
import useCandidate from "../../hooks/useCandidate";

const EmployeeForm = () => {
   const navigate=useNavigate(); 
   const[cedula,setCedula]=useState(''); 
   const[name,setName]=useState(''); 
   const[salary,setSalary]=useState(0); 
   const[jobPositionField,setJobPosition]=useState(); 
   const[departmentField,setDepartment]=useState(); 
   const[hireDate,setHireDate]=useState(''); 
   const[isAvailable,setIsAvailable]=useState(false); 
   const{saveEmployee,employee}=useEmployee();
   const{saveCandidate,candidate}=useCandidate(); 
   const[id,setId]=useState(null);
   const[alert, setAlert]=useState({});
   const{jobPositions}=useJobPosition(); 
   const{departments}=useDepartment(); 
    

   useEffect(()=>{
    if(candidate?.name){
        setName(candidate.name); 
        setCedula(candidate.cedula); 
        setSalary(parseFloat(candidate.salary)); 
        setJobPosition(candidate.jobPosition._id); 
        setDepartment(candidate.department._id); 
        setIsAvailable(false); 
        setHireDate(moment(Date.now()).format('YYYY-MM-DD')); 
        setId(employee._id); 

    }
   },[candidate]);

   const handleSubmit=async e=>{
    e.preventDefault(); 
    
    if([name,cedula,hireDate].includes('') ||[salary].includes(0)){
        setAlert({
            msg:'Todos los campos son obligatorios', 
            error:true
        });
        return; 
    }
    if(parseFloat(salary)<0){
        setAlert({
            msg:'Los valores no pueden ser negativos', 
            error:true
        });
        return; 
    }
    if(validar_cedula(cedula)){
        let result=await saveEmployee({cedula,name,salary,jobPosition:jobPositionField,department:departmentField,hireDate, isAvailable,id});
        if(result){

            setAlert({
                msg:'Guardado correctamente'
            });
            
            setName('');
            setCedula(''); 
            setSalary(0); 
            setJobPosition(); 
            setDepartment(); 
            setHireDate(''); 
            setIsAvailable(false); 
            setId('');
        }else{
            setAlert({
                msg:'Empleado ya registrado',
                error:true
            });
        }}else{
            setAlert({
                msg:'Cedula no valida', 
                error:true
            })
        }
    }

   
   function validar_cedula(cedula) {
    if (typeof cedula != "string") return false;

    //cleanup
    cedula = cedula.replace(/-/g, "");

    // La cédula debe tener 11 dígitos
    if (cedula.length != 11) return false;

    // Validar serie
    if (
      parseInt(cedula.substring(0, 3)) != 402 &&
      parseInt(cedula.substring(0, 3)) > 121 &&
      parseInt(cedula.substring(0, 3)) < 1
    )
      return false;

    var suma = 0;
    var verificador = 0;

    for (var i = 0; i < cedula.length; i++) {
      let n = cedula.charAt(i);
      //No ejecutar el ultimo digito
      if (i == cedula.length - 1) break;

      // Los dígitos pares valen 2 y los impares 1
      let multiplicador = parseInt(i) % 2 == 0 ? 1 : 2;

      // Se multiplica cada dígito por su paridad
      let digito = parseInt(n) * parseInt(multiplicador);

      // Si la multiplicación da de dos dígitos, se suman entre sí
      digito =
        digito > 9
          ? [...digito.toString()]
              .map((e) => parseInt(e))
              .reduce((a, b) => a + b)
          : digito;

      // Se va haciendo la acumulación de esa suma
      suma = suma + digito;
    }
    // Al final se obtiene el verificador con la siguiente fórmula
    verificador = (10 - (suma % 10)) % 10;

    // Se comprueba el verificador
    return verificador == parseInt(cedula.slice(-1));
  }

  const onDepartmentsChanged=e=>setDepartment(e.target.value); 
  const onJobPositionChanged=e=>setJobPosition(e.target.value); 
  const{msg}=alert; 
  return (
    
    <div>
    <>
<h2 className='font-black text-3xl text-center'>Administrador de Empleados</h2>
<p className='text-xl mt-5 mb-10 text-center'>
  Agrega tus empleados y{' '}
  <span className='text-gray-600 font-bold'>Administra</span>
</p>
{msg && <Alert alert={alert}/>}
<form
className='bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md'
onSubmit={handleSubmit} 
>
  <div className='mb-5'>
      <label htmlFor="name">
          Nombre
      </label>
      <input type="text" readOnly 
          id="name"
          
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={name}
          onChange={e=>setName(e.target.value)}
       />
  </div>
  <div className='mb-5'>
      <label htmlFor="cedula">
          Cedula
      </label>
      <input type="text" readOnly 
          id="cedula"
        
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={cedula}
          onChange={e=>setCedula(e.target.value)}
       />
  </div>
  <div className='mb-5'>
      <label htmlFor="salary">
          Salario mensual
      </label>
      <input type="number" 
          id="salary"
          placeholder='Introduzca salario mensual'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={salary}
          onChange={e=>setSalary(e.target.value)}
       />
  </div>
  <div className="mb-5">
        <label 
        htmlFor="hireDate">  Fecha de contratación</label>
        <input type="date" 
                id="hireDate"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={hireDate}
                onChange={e=>setHireDate(e.target.value)}
        />  
        </div>
  <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
      <label htmlFor="puesto">
          Puesto
      </label>
      <select onChange={onJobPositionChanged} readOnly
          value={jobPositionField} disabled
       id="riskLevel" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>
          
          {jobPositions.map(jobPosition=>( 
              <option key={jobPosition._id} value={jobPosition._id}>{jobPosition.name}</option>
          ))}
      </select>
  </div>
  <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
      <label htmlFor="departments">
          Elige un departamento
      </label>
      <select onChange={onDepartmentsChanged} disabled
          value={departmentField}
       id="departments" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

          {departments.map(department=>(
              <option key={department._id} value={department._id}>{department.name}</option>
          ))}
      </select>
  </div>

  <div className='mb-5'>
                <label htmlFor="isAvailable">
                        Estado
                </label>
               <input type="checkbox"
                className='border-2 ml-5 p-2 mt-2 rounded-md '
               id='isAvailable'
                checked={isAvailable} onChange={()=>setIsAvailable(!isAvailable)}
                
                />
            </div>

 

  <input type="submit"
         className='bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors '
         value={id? 'Guardar cambios': 'Volver empleado'}
   />

</form>
</>

</div>
  )
  }

export default EmployeeForm;
