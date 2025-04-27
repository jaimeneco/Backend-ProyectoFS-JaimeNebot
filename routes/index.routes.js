import { Router } from "express" //importar libreria
import authRoutes from './auth.routes.js'
import adminRoutes from './role.routes.js'
import {asignarRolAdmin, createUsuario, getUsuario, updatePassword, updateUserData, updateUsuario} from "../controllers/usuarios.controller.js"
import { createProducto, getAllProductos, getProductoById, updateProducto, deleteProducto, getUserProductos } from "../controllers/productos.controller.js"
import { createCompra, getAllCompras, getCompraById, updateCompra, deleteCompra, getUserCompras } from "../controllers/compras.controller.js"
import recomendacionRoutes from './recomendaciones.routes.js'
import PackRoutes from './pack.routes.js'
import { authMiddleWare } from "../middleware/auth.middleware.js"
import { isAdmin } from "../middleware/role.middleware.js"

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

// rutas de actividades en calendario
router.get("/productos/user", authMiddleWare, getUserProductos) // obtener las actividades del usuraio
router.post("/productos",authMiddleWare, createProducto) //crear nueva actividad
router.get("/productos", getAllProductos) // obtener todas
router.get("/productos/:id", getProductoById) //obtener una actividad por ID
router.put("/productos/:id", updateProducto)
router.delete("/productos/:id", deleteProducto)


//rutas protegias con auth y accesible paara admin
router.put("/usuarios/:id/admin", authMiddleWare, asignarRolAdmin)

export default router;





