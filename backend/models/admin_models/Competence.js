import mongoose from "mongoose";

const competenceSchema=mongoose.Schema({
    description:{
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

const Competence=mongoose.model('Competence', competenceSchema); 
export default Competence; 