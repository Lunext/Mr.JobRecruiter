import useJobPosition from "../../hooks/useJobPosition"
import { Link } from "react-router-dom";

const Position = ({jobPosition}) => {

    const {name,riskLevel, minSalary,maxSalary}=jobPosition; 

  return (
    <div>

  <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
    <div className="relative p-8 space-y-8">
      
      <div className="space-y-2">
        <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
          {name}
        </h5>
        <p className="text-sm text-gray-600">
          Nivel de riesgo: {riskLevel}
        </p>
        <p className="text-sm text-gray-600">
          Salario minimo: ${minSalary}
        </p>
        <p className="text-sm text-gray-600">
          Salario máximo: ${maxSalary}
        </p>
      </div>
      <Link
        to="/candidate/candidates"
        className="flex justify-between items-center group-hover:text-yellow-600"
      >
        <span className="text-sm">Aplica...</span>
        <span className="-translate-x-4 opacity-0 text-2xl transition duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          →
        </span>
      </Link>
    </div>
  </div>



</div>


  )
}

export default Position
