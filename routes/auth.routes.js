import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/auth.controller.js'
import { authMiddleWare } from '../middlewares/auth.middleware.js'

const router = Router();

// Registro
router.post('/registro', registerUser);

// login
router.post('/login', loginUser);

// obtener usuario actual (con el token)
router.get('/me', authMiddleWare, getCurrentUser);

export default router;