import express from 'express'; 
const router= express.Router(); 
import { register,confirm, authenticate, forgotPassword,checkToken, newPassword, profile} from '../controllers/UserController.js';
import { checkAuth } from '../middlewares/authMiddleware.js';


//Public Area 
router.post('/',register);
router.get('/confirm/:token',confirm) 
router.post('/login', authenticate);
router.post('/forgot-password', forgotPassword);
router.route('/forgot-password/:token').get(checkToken).post(newPassword);


//Private routes 
router.get('/profile',checkAuth, profile);
export default router;
