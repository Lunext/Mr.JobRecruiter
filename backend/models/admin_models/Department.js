import mongoose from 'mongoose'; 

const departmentSchema=mongoose.Schema({
    name:{
        type:String, 
        require:true, 
    }, 
    isAvailable: {
        type:Boolean, 
        default:false
    },

},{
    timestamps:true, 
}); 
const Department= mongoose.model('Department', departmentSchema); 
export default Department; 
