import express from 'express'; 

import { addTraining, getTraining, getTrainings, updateTraining, deleteTraining} from '../../controllers/admin_controllers/TrainingController.js';
import { checkAuth,checkRole } from '../../middlewares/authMiddleware.js';

const router=express.Router(); 
router.route('/')
.post(checkAuth,addTraining)
.get(checkAuth,getTrainings); 

router
.route('/:id')
.get(checkAuth,getTraining)
.put(checkAuth,updateTraining)
.delete(checkAuth,deleteTraining); 

export default router; 