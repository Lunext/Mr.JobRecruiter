import JobExperience from "./JobExperience"; 
import useJobExperience from "../../hooks/useJobExperience";
const JobExperienceList = () => {
    const{jobExperiences}=useJobExperience(); 
  return (
    <>
    {jobExperiences.length?(
        <>
          <h2 className="font-black text-3xl text-center ">Listado de Experiencias laborales</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{' '}
          <span className="text-gray-600 font-bold ">Experiencias laborales</span>
        </p>
      
        {jobExperiences.map(jobExperience=>(
          <JobExperience
            key={jobExperience._id}
            jobExperience={jobExperience}
          />
        ))}
        </>
    ): (
      <>
        <h2 className="font-black text-3xl text-center ">No hay Capacitaciones</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando capacitaciones{' '}
          <span className="text-gray-600 font-bold ">y apareceran en este lugar</span>
        </p>

     </>
    )}
   </>
  )
}

export default JobExperienceList;
