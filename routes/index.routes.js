import { Router } from "express"
import authRoutes from './auth.routes.js'
import adminRoutes from './role.routes.js'
import {asignarRolAdmin, createUsuario, getUsuario, updatePassword, updateUserData, updateUsuario} from "../controllers/usuario.controller.js"
import { createProducto, getAllProductos, getProductoById, updateProducto, deleteProducto, getUserProducts } from "../controllers/productos.controller.js"
import { createCompra, getAllCompras, getCompraByUserId, updateCompra, deleteCompra } from "../controllers/compras.controller.js"
import { authMiddleWare } from "../middlewares/auth.middleware.js"

const router = Router()


// rutas de autentificacion
router.use('/auth', authRoutes) // rutas de autentificacion... (/api/v1/auth) 

// rutas de roles
router.use('/admin',adminRoutes)

//usuarios
router.get("/usuarios/:id", getUsuario)
router.post("/usuarios", createUsuario)
router.put("/usuarios/:id", updateUsuario)
router.put("/usuarios/:id/datos", updateUserData)
router.put("/usuarios/:id/password", updatePassword)

// rutas de compras
// router.get("/compras/user", authMiddleWare, getUserCompras) // obtener las actividades del usuraio
router.post("/compras",authMiddleWare, createCompra) //crear nueva actividad
router.get("/compras", getAllCompras) // obtener todas
router.get("/compras/:id", getCompraByUserId) //obtener una actividad por ID
router.put("/compras/:id", updateCompra)
router.delete("/compras/:id", deleteCompra)

// rutas de productos
router.get("/productos/user", authMiddleWare, getUserProducts) // obtener las actividades del usuraio
router.post("/productos",authMiddleWare, createProducto) //crear nueva actividad
router.get("/productos", getAllProductos) // obtener todas
router.get("/productos/:id", getProductoById) //obtener una actividad por ID
router.put("/productos/:id", updateProducto)
router.delete("/productos/:id", deleteProducto)


//rutas protegias con auth y accesible paara admin
router.put("/usuarios/:id/admin", authMiddleWare, asignarRolAdmin)

export default router;





