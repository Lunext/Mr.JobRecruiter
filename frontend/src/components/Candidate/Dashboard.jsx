import useJobPosition from '../../hooks/useJobPosition';
import Position from './Position';
const Dashboard = () => {

  const{jobPositions}=useJobPosition(); 
  return (
    
    <>
    
    <div>
        <div className="py-16 bg-gray-50 overflow-hidden">
  <div className="container m-auto px-6 space-y-8 text-gray-500 md:px-12">
  <div>
  <span className="text-gray-600 text-lg font-semibold">Puestos existentes</span>
  <h2 className="mt-4 text-2xl text-gray-900 font-bold md:text-4xl">
    Aplica para uno de estos puestos!{" "}
    <br className="lg:block" hidden="" /> y consigue un empleo
  </h2>
</div>
<div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">
    {jobPositions.map(jobPosition=>(
      <Position
      key={jobPosition._id}
      jobPosition={jobPosition}/>
    ))}
  </div>
</div>
</div>

      
    </div>
    
    </>
  )
}

export default Dashboard;
