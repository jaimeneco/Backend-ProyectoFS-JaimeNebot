import { Router } from "express";
import { isAdmin } from "../middlewares/role.middleware.js";
import { authMiddleWare } from "../middlewares/auth.middleware.js";

const router = Router();

//Es una ruta protegida para acceder solo si se es admin

router.post('/admin-only', authMiddleWare, isAdmin, (req, res)=>{
    res.status(200).json({msg:'Bienvenido, amdin'})
})

export default router;