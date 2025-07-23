import { Producto } from "../db/models/producto.model.js"
import { Usuario } from "../db/models/usuario.model.js";

const responseAPI = {
    msg: "",
    data: [],
    status: "ok", //error
    cant: null,
}


export const createProducto = async (req, res, next) => {
    const { title, type, price, img, description } = req.body;

    if (!title || !type || !price || !img) {
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
            description
        })

        responseAPI.msg = 'Producto creado';
        responseAPI.data = nuevoProducto;
        responseAPI.status = 'ok';

        res.status(201).json(responseAPI)
    } catch (err) {
        console.error("Error creando producto", err)
        next(err);
    }
};

// Obtener todos los productos
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

// Obtener un solo producto
export const getProductoById = async (req, res, next) => {
    const { id } = req.params
    try {
        const producto = await Producto.findById(id)
        if (!producto) {
            responseAPI.msg = 'Producto no encontrado'
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }
        responseAPI.msg = 'Producto encontrado'
        responseAPI.data = producto
        responseAPI.status = 'ok'
        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('Error al obtener el producto', err);
        next(err);
    }
}

// Actualizar un producto
export const updateProducto = async (req, res, next) => {
    const { id } = req.params;
    const { title, type, price, img, description } = req.body;

    if (!title || !type || !price || !img) {
        responseAPI.msg = 'Rellena todos los campos'
        responseAPI.status = 'error'
        return res.status(400).json(responseAPI)
    }

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { title, type, price, img, description },
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

// Eliminar un producto
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

// Obtener productos del usuario autenticado
export const getUserProducts = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            responseAPI.msg = 'No autorizado';
            responseAPI.status = 'error';
            return res.status(401).json(responseAPI)
        }
        const productos = await Producto.find({ user: userId }).sort({ time: 1 })
        responseAPI.msg = 'Productos del usuario';
        responseAPI.status = 'ok';
        responseAPI.data = productos;
        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('Error al obtener productos del usuario', err)
        next(err);
    }
}
