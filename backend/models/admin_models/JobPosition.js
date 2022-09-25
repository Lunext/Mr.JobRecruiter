import mongoose from 'mongoose';

const jobPositionSchema=mongoose.Schema({
    name:{
        type:String, 
        require:true,
    },
    riskLevel:{
        type:String, 
        default:'Bajo', 
        
    }, 
    minSalary:{
        type:Number, 
        require:true, 
    },
    maxSalary:{
        type:Number, 
        require:true,
    },
    isAvailable:{
        type:Boolean, 
        default:false, 
        require:true
    }
    
},{
    timestamps:true
})
const JobPosition=mongoose.model('JobPosition', jobPositionSchema); 
export default JobPosition; 