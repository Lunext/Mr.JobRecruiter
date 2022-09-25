import mongoose,{mongo, Schema} from 'mongoose'; 


const candidateSchema=mongoose.Schema({
    cedula:{
        type:String, 
        require:true, 
    },
    name:{
        type:String, 
        require:true
    },
    salary:{
        type:Number,
        require:true, 
    },
    jobPosition:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'JobPosition'
    },
    departments:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department'
    }
    ,
    competences:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Competence'
    }], 
    trainings:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Training'
    }], 
    jobExperiences:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'JobExperience'
    }],
    recommendedBy:[{
        type:String,
        require:true
    }]

})
const Candidate= mongoose.model('Candidate',candidateSchema);
export default Candidate; 




