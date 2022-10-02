import mongoose from 'mongoose'; 

const employeeSchema=mongoose.Schema({
    cedula:{
        type:String, 
        require:true, 
    },
    name:{
        type:String, 
        require:true
    },
    hireDate:{
        type:Date, 
        require:true, 
        default:Date.now()
    }, 
    department:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Department'
    },
    jobPosition:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'JobPosition'
    },
    salary:{
        type:Number, 
        require:true, 
    }, 
    isAvailable:{
        type:Boolean, 
        default:false,
    },

    
}
);

const Employee=mongoose.model('Employee', employeeSchema); 
export default Employee; 
