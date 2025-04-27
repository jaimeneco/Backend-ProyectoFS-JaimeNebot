import { Router } from "express";
import { isAdmin } from "../middlewares/role.middleware.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

//ruta protegida para acceder solo el role 'admin'

router.post('/admin-only', authMiddleWare, isAdmin, (req, res)=>{
    res.status(200).json({msg:'Bienvenido, amdin'})
})

export default router;