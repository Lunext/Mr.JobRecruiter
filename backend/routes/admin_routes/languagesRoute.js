import express from 'express'; 
import { addLanguage,getLanguage,getLanguages,updateLanguage,deleteLanguage } from '../../controllers/admin_controllers/LanguageController.js';
import  {checkAuth, checkRole}  from '../../middlewares/authMiddleware.js';

const router= express.Router();
router.route('/')
.post(checkAuth, addLanguage)
.get(checkAuth,getLanguages); 


router
.route('/:id')
.get(checkAuth,getLanguage)
.put(checkAuth,updateLanguage)
.delete(checkAuth,deleteLanguage);

export default router;
