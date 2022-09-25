import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert'; 
import useCandidate from '../../hooks/useCandidate';
import useJobPosition from '../../hooks/useJobPosition';
const CandidateForm = () => {
  
    const navigate=useNavigate(); 
    const[cedula,setCedula]=useState('');
    const[name,setName]=useState(''); 
    const [salary, setSalary]=useState(0);
    const[jobPositionField,setJobPositions]=useState();
 
    const [departments, setDepartments]=useState(); 
    const [competences, setCompetences]=useState(); 
    const[trainings, setTrainings]=useState(); 
    const[jobExperiences, setJobExperiences]=useState(); 
    const[recommendedBy, setRecommendedBy]=useState(''); 
    const [id, setId]= useState(null); 
    const [alert, setAlert]=useState({}); 
    const{saveCandidate, candidate}= useCandidate(); 
    const{jobPositions}=useJobPosition();

    useEffect(()=>{
        //Si existe nombre llenar los campos
        if(candidate?.name){
            setName(candidate.name);
            setCedula(candidate.cedula); 
            setSalary(parseFloat(candidate.salary)); 
            setJobPositions(candidate.jobPosition._id); 
            setDepartments(candidate.departments); 
            setCompetences(candidate.competences); 
            setTrainings(candidate.trainings);
            setJobExperiences(candidate.jobExperiences);
            setRecommendedBy(candidate.recommendedBy);
            
            setId(candidate._id); 
        }
    },[candidate]); 
  
    //Send the jobposition after validating

    const handleSubmit=async e=>{
        e.preventDefault();

        //Validations
        if([name,cedula,jobExperiences,jobPositionField,trainings,recommendedBy,departments].includes('') && [salary].includes(0)){
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
        
        let result= await saveCandidate({cedula,name,salary,jobExperiences,jobPosition:jobPositionField,departments,trainings,competences,recommendedBy,id}); 
        if(result){
            setAlert({
                msg:'Guardado correctamente'
            });
            setName(''); 
            setSalary(0);
            setCedula('');
            setJobExperiences();
            setCompetences();
            setTrainings(); 
            setDepartments(); 
            setJobPositions();
            setRecommendedBy(); 
            setId('');
        }else{
            setAlert({
                msg:'Posicion laboral ya registrada!', 
                error:true
            });
        }

    }
    
    const onJobPositionsChanged=e=> setJobPositions(e.target.value);
    const onJobExperiencesChanged=e=> setJobExperiences(e.target.value);
    const onDepartmentsChanged=e=> setDepartments(e.target.value);
    const onCompetencesChanged=e=> setCompetences(e.target.value);
    const onTrainingsChanged=e=> setTrainings(e.target.value);

    
    
    
    const{msg}=alert; 
  

  return (
    <div>
          <>
    <h2 className='font-black text-3xl text-center'>Administrador de Candidatos</h2>
    <p className='text-xl mt-5 mb-10 text-center'>
        Agrega tus candidatos y{' '}
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
            <input type="text" 
                id="name"
                placeholder='Introduzca una posición laboral'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={name}
                onChange={e=>setName(e.target.value)}
             />
        </div>
        <div className='mb-5'>
            <label htmlFor="cedula">
                Cedula
            </label>
            <input type="text" 
                id="cedula"
                placeholder='Introduzca una posición laboral'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={cedula}
                onChange={e=>setCedula(e.target.value)}
             />
        </div>
        <div className='mb-5'>
            <label htmlFor="salary">
                Salario al que aspira
            </label>
            <input type="number" 
                id="salary"
                placeholder='Introduzca un salario minimo'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={salary}
                onChange={e=>setSalary(e.target.value)}
             />
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="riskLevel">
                Elige un puesto
            </label>
            <select onChange={onJobPositionsChanged}
                value={jobPositionField}
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
            <select onChange={onDepartmentsChanged}
                value={departments}
             id="departments" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {Object.values({departments}).map(department=>(
                    <option key={department} value={department}>{department}</option>
                ))}
            </select>
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="competences">
                Competencias
            </label>
            <select onChange={onCompetencesChanged}
                value={competences}
             id="competences" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {Object.values({competences}).map(competence=>(
                    <option key={competence} value={competence}>{competence}</option>
                ))}
            </select>
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="trainings">
                Capacitaciones
            </label>
            <select onChange={onTrainingsChanged}
                value={trainings}
             id="trainings" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {Object.values({trainings}).map(training=>(
                    <option key={training} value={training}>{training}</option>
                ))}
            </select>
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="jobExperiences">
                Experiencia laboral
            </label>
            <select onChange={onJobExperiencesChanged}
                value={jobExperiences}
             id="jobExperiences" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {Object.values({jobExperiences}).map(jobExperience=>(
                    <option key={jobExperience} value={jobExperience}>{jobExperience}</option>
                ))}
            </select>
        </div>
        <div className='mb-5'>
            <label htmlFor="recommendedBy">
                Recomendado por
            </label>
            <input type="text" 
                id="recommendedBy"
                placeholder='Recomendado por'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={recommendedBy}
                onChange={e=>setRecommendedBy(e.target.value)}
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


export default CandidateForm;
