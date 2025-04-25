import { Router } from "express";

import { createCompra, getCompraByUserId, getAllCompras, updateCompra } from "../controllers/compras.controller.js";

import { createProducto, deleteProducto, getProductoByUserId, getAllProductos, updateProducto } from "../controllers/productos.controller.js";

import { createUsuario, deleteUsuario, getUsuarioById, getAllUsuarios, updateUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

// Listas para Admin:
router.get("/usuarios", getAllUsuarios); 
router.get("/productos", getAllProductos); 
router.get("/compras", getAllCompras); 


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
router.put("/usuarios/:uid/compras/:id", updateCompra); //Update


// Eliminar elementos:
router.delete("/usuarios/:uid", deleteUsuario); 
router.delete("/productos/:pid", deleteProducto); 

export default router;