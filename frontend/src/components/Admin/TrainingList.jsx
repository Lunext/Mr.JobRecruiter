import Training from "./Training"
import useTraining from "../../hooks/useTraining"

const TrainingList = () => {
    const{trainings}=useTraining(); 
  return (
    <>
    {trainings.length?(
        <>
        
          <h2 className="font-black text-3xl text-center ">Listado de Capacitaciones</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus{' '}
          <span className="text-gray-600 font-bold ">Capacitaciones</span>
        </p>
      
        {trainings.map(training=>(
          <Training
            key={training._id}
            training={training}
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

export default TrainingList
