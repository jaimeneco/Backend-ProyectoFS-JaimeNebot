import { Producto } from "../db/models/producto.model.js"
import { Usuario } from "../db/models/usuario.model.js";

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}

export const createProducto = async (req, res, next) => {
    const { title, type, price, img } = req.body;

    const userId = req.user?.userId; //obtengo el user del token, segun lo guardo en auth.middleware.js
    // console.log('usuario en back:', userId)

    if (!title || !type || !price || !img || !userId) {
        responseAPI.msg = 'Campos incompletos'
        responseAPI.status = 'error'
        return res.status(400).json(responseAPI)
    }



    try {
        const nuevoProducto = await Producto.create({
            title,
            type,
            price,
            img,
            user: userId
        })
        // console.log('Actividad creada:', nuevaActividad); // Verifica la actividad creada
        const user = await Usuario.findById(userId)
        user.productos.push(nuevoProducto._id) //agrega el id de la actividad al array de actividades
        await user.save()

        responseAPI.msg = 'Producto creado';
        responseAPI.data = nuevoProducto;
        responseAPI.status = 'ok';

        res.status(201).json(responseAPI)
    } catch (err) {
        console.error("Error creando producto", err)
        next(err);
    }
};

//obtener todas los productos
export const getAllProductos = async (req, res, next) => {
    try {

        const productos = await Producto.find()

        responseAPI.msg = 'Productos obtenidos'
        responseAPI.status = 'ok'
        responseAPI.data = productos

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('Error al obtener productos', err);
        next(err);
    }
}

// obtener una solo producto
export const getProductoById = async (req, res, next) => {
    const { id } = req.params

    try {
        const productos = await Producto.findById(id)

        if (!productos) {
            responseAPI.msg = 'Producto no encontrado'
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = 'Producto encontada'
        responseAPI.data = productos
        responseAPI.status = 'ok'

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('error al obtener el producto', err);
        next(err);
    }
}

//actualizar un producto
export const updateProducto = async (req, res, next) => {
    const { id } = req.params;
    const { title, type, price, user, img } = req.body;

    if (!title || !type|| !price || !img ) {
        responseAPI.msg = 'Rellena todos los campos'
        responseAPI.status = 'error'
        return res.status(400).json(responseAPI)
    }

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { title, type, price, img },
            { new: true }
        );

        if (!productoActualizado) {
            responseAPI.msg = 'Producto no encontrado';
            responseAPI.status = 'error';
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = 'Producto actualizado correctamente';
        responseAPI.data = productoActualizado;
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('Error al actualizar producto', err);
        next(err);
    }

}

//eliminar una actividad
export const deleteProducto = async (req, res, next) => {
    const { id } = req.params;

    try {
        const productoEliminado = await Producto.findByIdAndDelete(id);

        if (!productoEliminado) {
            responseAPI.msg = 'Producto no encontrado';
            responseAPI.status = 'error';
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = 'Producto eliminado';
        responseAPI.data = productoEliminado;
        responseAPI.status = "ok";

        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('Error eliminando producto', err);
        next(err);
    }
}

// obtener actividades del usuer autentificado!! IMPORTANTE
export const getUserProducts = async (req, res, next) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            responseAPI.msg = 'No autorizado';
            responseAPI.status = 'error';
            return res.status(401).json(responseAPI)
        }

        const productos = await Producto.find({ user: userId }).sort({ time: 1 })

        responseAPI.msg = 'Productos alquilados del usuario';
        responseAPI.status = 'ok';
        responseAPI.data = productos;

        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('Error al obtener productos alquilados del usuario', err)
        next(err);
    }
}