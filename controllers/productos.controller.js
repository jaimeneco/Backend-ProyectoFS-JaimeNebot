import { Producto } from "../db/models/producto.model.js"
import { Usuario } from "../db/models/usuario.model.js";

const responseAPI = () => ({ msg: "", data: [], status: "ok", cant: null })

export const createProducto = async (req, res, next) => {
    const { title, type, price, img, description } = req.body;
    try {
        const response = responseAPI();

        if (!title || !type || !price || !img) {
            response.msg = 'Campos incompletos'
            response.status = 'error'
            return res.status(400).json(response)
        }

        const nuevoProducto = await Producto.create({ title, type, price, img, description })

        response.msg = 'Producto creado';
        response.data = nuevoProducto;
        response.status = 'ok';

        res.status(201).json(response)
    } catch (err) {
        console.error("Error creando producto", err)
        next(err);
    }
};

export const getAllProductos = async (req, res, next) => {
    try {
        const response = responseAPI();
        const productos = await Producto.find()

        response.msg = 'Productos obtenidos'
        response.status = 'ok'
        response.data = productos

        res.status(200).json(response)
    } catch (err) {
        console.error('Error al obtener productos', err);
        next(err);
    }
}

export const getProductoById = async (req, res, next) => {
    const { id } = req.params
    try {
        const response = responseAPI();
        const producto = await Producto.findById(id)

        if (!producto) {
            response.msg = 'Producto no encontrado'
            response.status = 'error'
            return res.status(404).json(response)
        }

        response.msg = 'Producto encontrado'
        response.data = producto
        response.status = 'ok'

        res.status(200).json(response)
    } catch (err) {
        console.error('Error al obtener el producto', err);
        next(err);
    }
}

export const updateProducto = async (req, res, next) => {
    const { id } = req.params;
    const { title, type, price, img, description } = req.body;
    try {
        const response = responseAPI();

        if (!title || !type || !price || !img) {
            response.msg = 'Rellena todos los campos'
            response.status = 'error'
            return res.status(400).json(response)
        }

        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { title, type, price, img, description },
            { new: true }
        );

        if (!productoActualizado) {
            response.msg = 'Producto no encontrado';
            response.status = 'error';
            return res.status(404).json(response);
        }

        response.msg = 'Producto actualizado correctamente';
        response.data = productoActualizado;
        response.status = 'ok';

        res.status(200).json(response)
    } catch (err) {
        console.error('Error al actualizar producto', err);
        next(err);
    }
}

export const deleteProducto = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = responseAPI();
        const productoEliminado = await Producto.findByIdAndDelete(id);

        if (!productoEliminado) {
            response.msg = 'Producto no encontrado';
            response.status = 'error';
            return res.status(404).json(response);
        }

        response.msg = 'Producto eliminado';
        response.data = productoEliminado;
        response.status = "ok";

        res.status(200).json(response)
    } catch (err) {
        console.error('Error eliminando producto', err);
        next(err);
    }
}

export const getUserProducts = async (req, res, next) => {
    try {
        const response = responseAPI();
        const userId = req.user?.userId;

        if (!userId) {
            response.msg = 'No autorizado';
            response.status = 'error';
            return res.status(401).json(response)
        }

        const productos = await Producto.find({ user: userId }).sort({ time: 1 })

        response.msg = 'Productos del usuario';
        response.status = 'ok';
        response.data = productos;

        res.status(200).json(response)
    } catch (err) {
        console.error('Error al obtener productos del usuario', err)
        next(err);
    }
}
