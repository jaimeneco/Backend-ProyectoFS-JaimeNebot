import { Producto } from "../db/models/index.js";

const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}

export const getAllProductos = async (req, res, next) => {
    try {
        const productos = await Producto.find();
        ResponseAPI.data = productos;
        ResponseAPI.msg = "Estos son todos tus productos";
        res.status(200).json(ResponseAPI);
    } catch (e) {
        console.error("Error al obtener todos los productos ", e);
        next(e);
    }
}

export const getProductoByUserId = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const productos = await Producto.find({ propietario: uid });
        ResponseAPI.data = productos;
        ResponseAPI.msg = `Productos del usuario ${uid}`;
        res.status(200).json(ResponseAPI);
    } catch (e) {
        console.error("Error al obtener productos del usuario", e);
        next(e);
    }
};

export const createProducto = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const nuevoProducto = await Producto.create({
            ...req.body,
            propietario: uid
        });
        ResponseAPI.data = nuevoProducto;
        ResponseAPI.msg = `Producto creado por el usuario ${uid}`;
        res.status(201).json(ResponseAPI);
    } catch (e) {
        console.error("Error al crear producto ", e);
        next(e);
    }
};

export const updateProducto = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const updatedProducto = await Producto.findByIdAndUpdate(pid, req.body, { new: true });
        ResponseAPI.data = updatedProducto;
        ResponseAPI.msg = `Producto ${pid} actualizado`;
        res.status(200).json(ResponseAPI);
    } catch (e) {
        console.error("Error al actualizar producto ", e);
        next(e);
    }
};

export const deleteProducto = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const deletedProducto = await Producto.findByIdAndDelete(pid);
        ResponseAPI.data = deletedProducto;
        ResponseAPI.msg = `Producto ${pid} eliminado`;
        res.status(200).json(ResponseAPI);
    } catch (e) {
        console.error("Error al eliminar producto ", e);
        next(e);
    }
};