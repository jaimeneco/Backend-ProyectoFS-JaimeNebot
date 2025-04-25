import { Producto } from "../db/models/index.js";


const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}

export const getAllProductos = async (req, res, next) => {
    try{
        const productos = await Producto.find();
        ResponseAPI.data = productos;
        ResponseAPI.msg = "Estos son todos tus productos";
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al obtener todos los productos ", e);
        next(e);
    }
}

export const getProductoByUserId = async (req, res, next) => {
    try{
        const productos = await Producto.findById();
        ResponseAPI.data = productos;
        ResponseAPI.msg = `Este es tu producto ${id}`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al obtener producto ", e);
        next(e);
    }
};

export const createProducto = async (req, res, next) => {
    try{
        const productos = await Producto.create();
        ResponseAPI.data = productos;
        ResponseAPI.msg = `Tu producto ${id} ha sido creado`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al crear producto ", e);
        next(e);
    }
};

export const updateProducto = async (req, res, next) => {
    try{
        const productos = await Producto.findByIdAndUpdate(id);
        ResponseAPI.data = productos;
        ResponseAPI.msg = `Tu producto ${id} ha sido actualizado`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al actualizar producto ", e);
        next(e);
    }
};

export const deleteProducto = async (req, res, next) => {
    try{
        const productos = await Producto.findByIdAndDelete(id);
        ResponseAPI.data = productos;
        ResponseAPI.msg = `Tu producto ${id} ha sido eliminado`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al eliminar producto ", e);
        next(e);
    }
};