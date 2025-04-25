import { Router } from "express";

import { registerUser, loginUser, getCurrentUser } from '../controllers/auth.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

import { createCompra, getCompraByUserId, getAllCompras, updateCompra } from "../controllers/compras.controller.js";

import { createProducto, deleteProducto, getProductoByUserId, getAllProductos, updateProducto } from "../controllers/productos.controller.js";

import { createUsuario, deleteUsuario, getUsuarioById, getAllUsuarios, updateUsuario } from "../controllers/usuario.controller.js";

const router = Router();


// Listas para Admin:
router.get("/usuarios", getAllUsuarios); 
router.get("/productos", getAllProductos); 
router.get("/compras", getAllCompras); 

// Rutas de Auth:
// auth.controller.js
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleware, getCurrentUser);

router.get("/protected", (req, res) => {
    res.json({message: "Estás en una ruta protegida, felicidades tu token es válido"})
});

// Crear items:
router.post("/usuarios", createUsuario); //Registrarse 
router.post("/usuarios/:uid/productos", createProducto); //Poner a la venta
router.post("/usuarios/:uid/compras", createCompra); //Comprar un producto

// Obtener información por ID: 
router.get("/usuarios/:uid", getUsuarioById);
router.get("/usuarios/:uid/productos-en-venta", getProductoByUserId);
router.get("/usuarios/:uid/productos-comprados", getCompraByUserId); 

// Actualizar elementos:
router.put("/usuarios/:uid", updateUsuario); //Update
router.put("/productos/:pid", updateProducto); //Update
router.put("/ussuarios/:uid/compras/:id", updateCompra); //Update


// Eliminar elementos:
router.delete("/usuarios/:uid", deleteUsuario); 
router.delete("/productos/:pid", deleteProducto); 


// Rutas posibles de User (para Admins)
// En archivo: usuario.controller.js

// router.get("/usuario", getAllUsuarios);
// router.get("/usuario/:id", getUsuarioById);
// router.delete("/usuario/:id", deleteUsuario);

export default router;




