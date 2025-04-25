import { Router } from "express";

import { registerUser, loginUser, getCurrentUser } from '../controllers/auth.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

// import { deleteUsuario, getAllUsuarios, getUsuarioById } from "../controllers/auth.controller.js";


const router = Router();

// Rutas de Auth:
// auth.controller.js
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleware, getCurrentUser);

router.get("/protected", (req, res) => {
    res.json({message: "Estás en una ruta protegida, felicidades tu token es válido"})
});


// Rutas posibles de User (para Admins)
// En archivo: usuario.controller.js

// router.get("/usuario", getAllUsuarios);
// router.get("/usuario/:id", getUsuarioById);
// router.delete("/usuario/:id", deleteUsuario);



export default router;