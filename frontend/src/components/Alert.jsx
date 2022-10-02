const Alert = ({alert}) => {
    return (
      <div className={`${alert.error? 'from-red-400 to-red-600':'from-blue-400 to-blue-600'} 
      bg-gradient-to-r text-center p-3 rounded-2xl uppercase text-white font-bold text-sm mb-10`}>
        {alert.msg}
      </div>
    )
  }
  
  export default Alert;
  