import mongoose from 'mongoose'; 

const trainingSchema=mongoose.Schema({
    description:{
        type:String, 
        required:true, 
    }, 
    level:{
        type:String, 
        default:'Grado'
    },
    dateFrom:{
        type:Date,
        required:true, 
        default:Date.now()
    },
    dateTo:{
        type:Date, 
        required:true,
        default:Date.now()

    },
    institution:{
        type:String, 
        required:true, 
    }
},{
    timestamps:true,
});

const Training=mongoose.model('Training', trainingSchema); 
export default Training; 


