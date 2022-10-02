import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert'; 
import useCandidate from '../../hooks/useCandidate';
import useJobPosition from '../../hooks/useJobPosition';
import useDepartment from '../../hooks/useDepartment';
import useCompetence from '../../hooks/useCompetence';
import useTraining from '../../hooks/useTraining';
import useJobExperience from '../../hooks/useJobExperience';
import useLanguage from '../../hooks/useLanguage';
const CandidateForm = () => {
  
    const navigate=useNavigate(); 
    const[cedula,setCedula]=useState('');
    const[name,setName]=useState(''); 
    const [salary, setSalary]=useState(0);
    const[jobPositionField,setJobPositions]=useState();
    const[languageField, setLanguages]=useState(); 
    const [departmentField, setDepartments]=useState(); 
    const [competencesField, setCompetences]=useState([]); 
    const[trainingsField, setTrainings]=useState([]); 
    const[jobExperienceField, setJobExperience]=useState(); 
    const[recommendedBy, setRecommendedBy]=useState(''); 
    const [id, setId]= useState(null); 
    const [alert, setAlert]=useState({}); 
    const{saveCandidate, candidate}= useCandidate(); 
    const{jobPositions}=useJobPosition();
    const {departments}=useDepartment();
    const{competences}=useCompetence();
    const{trainings}=useTraining();
    const{jobExperiences}=useJobExperience();
    const{languages}=useLanguage();  

    useEffect(()=>{
        //Si existe nombre llenar los campos
        if(candidate?.name){
            setName(candidate.name);
            setCedula(candidate.cedula); 
            setSalary(parseFloat(candidate.salary)); 
            setJobPositions(candidate.jobPosition._id); 
            setDepartments(candidate.department._id); 
            setCompetences([candidate.competences._id]); 
            setTrainings([candidate.trainings._id]);
            setLanguages([candidate.languages._id]); 
            setJobExperience(candidate.jobExperience._id);
            setRecommendedBy(candidate.recommendedBy);
            
            setId(candidate._id); 
        }
    },[candidate]); 
  
    //Send the jobposition after validating

    const handleSubmit=async e=>{
        e.preventDefault();

        //Validations
        if([name,cedula,jobExperienceField,jobPositionField,trainingsField,competencesField,recommendedBy,departmentField,languageField].includes('') || [salary].includes(0)){
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
            let result= await saveCandidate({cedula,name,salary,jobExperience:jobExperienceField,jobPosition:jobPositionField,department:departmentField,trainings:trainingsField,competences:competencesField,languages:languageField,recommendedBy,id}); 
        if(result){
            setAlert({
                msg:'Guardado correctamente'
            });
            setName(''); 
            setSalary(0);
            setCedula('');
            setJobExperience();
            setCompetences([]);
            setLanguages([]);
            setTrainings([]); 
            setDepartments(); 
            setJobPositions();
            setRecommendedBy(); 
            setId('');
        }else{
            setAlert({
                msg:'Candidato ya registrado!', 
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
    const onJobPositionsChanged=e=> setJobPositions(e.target.value);
    const onJobExperiencesChanged=e=> setJobExperience(e.target.value);
    const onDepartmentsChanged=e=> setDepartments(e.target.value);
    const onCompetencesChanged=e=>{
          let value=Array.from(e.target.selectedOptions,option=>option.value);
         setCompetences(value);
        }  
    const onLanguagesChanged=e=>{
        let value=Array.from(e.target.selectedOptions,option=>option.value); 
        setLanguages(value);
    }
    const onTrainingsChanged=e=> {
        let value=Array.from(e.target.selectedOptions,option=>option.value);
        setTrainings(value);
    };
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
                placeholder='Introduzca su nombre'
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
                placeholder='Introduzca Su cedula'
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
                placeholder='Introduzca el salario al que aspira'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={salary}
                onChange={e=>setSalary(e.target.value)}
             />
        </div>
        
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="jobPosition">
                Elige un puesto
            </label>
            <select onChange={onJobPositionsChanged}
                value={jobPositionField}
             id="jobPosition" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>
                
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
                value={departmentField}
             id="departments" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {departments.map(department=>(
                    <option key={department._id} value={department._id}>{department.name}</option>
                ))}
            </select>
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="competences">
                Competencias
            </label>
            <select onChange={onCompetencesChanged}
                value={competencesField}
                 multiple={true}
             id="competences" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {competences.map(competence=>(
                    <option key={competence._id} value={competence._id}>{competence.description}</option>
                ))}
            </select>
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="languages">
                Lenguajes:
            </label>
            <select onChange={onLanguagesChanged}
                value={languageField}
                 multiple={true}
             id="competences" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {languages.map(language=>(
                    <option key={language._id} value={language._id}>{language.name}</option>
                ))}
            </select>
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="trainings">
                Capacitaciones
            </label>
            <select onChange={onTrainingsChanged}
                value={trainingsField}
                multiple={true}
             id="trainings" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {trainings.map(training=>(
                    <option key={training._id} value={training._id}>{training.description}</option>
                ))}
            </select>
        </div>
        <div className='grid-cols-1 gap-6 mt-8 md:grid-cols-2'>
            <label htmlFor="jobExperiences">
                Experiencia laboral
            </label>
            <select onChange={onJobExperiencesChanged}
                value={jobExperienceField}
             id="jobExperiences" className='block w-full px-5 py-3 mt-2 placeholder-white rounded-md'>

                {jobExperiences.map(jobExperienceo=>(
                    <option key={jobExperienceo._id} value={jobExperienceo._id}>{jobExperienceo.company}</option>
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
