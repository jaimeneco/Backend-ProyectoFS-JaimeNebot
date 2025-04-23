import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';

import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

// Solo accesibles si el usuario está logueado y es admin
router.get('/', verifyToken, isAdmin, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser); // El usuario puede actualizarse a sí mismo
router.delete('/:id', verifyToken, isAdmin, deleteUser);

export default router;
