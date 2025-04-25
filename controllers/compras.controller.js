import { Compra } from "../db/models/index.js";


const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}

export const getAllCompras = async (req, res, next) => {
    try{
        const compras = await Compra.find();
        ResponseAPI.data = compras;
        ResponseAPI.msg = "Estas son todas tus compras";
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al obtener todas las compras ", e);
        next(e);
    }
}

export const getCompraByUserId = async (req, res, next) => {
    try{
        const compras = await Compra.findById();
        ResponseAPI.data = compras;
        ResponseAPI.msg = `Esta es tu compra ${id}`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al obtener compra ", e);
        next(e);
    }
};

export const createCompra = async (req, res, next) => {
    try{
        const compras = await Compra.create();
        ResponseAPI.data = compras;
        ResponseAPI.msg = `La compra ${id} ha sido creada`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al crear compra ", e);
        next(e);
    }
};

export const updateCompra = async (req, res, next) => {
    try{
        const compras = await Compra.findByIdAndUpdate(id);
        ResponseAPI.data = compras;
        ResponseAPI.msg = `La compra ${id} ha sido actualizada`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al actualizar compra ", e);
        next(e);
    }
};

export const deleteCompra = async (req, res, next) => {
    try{
        const compras = await Compra.findByIdAndDelete(id);
        ResponseAPI.data = compras;
        ResponseAPI.msg = `La compra ${id} ha sido eliminada`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al eliminar compra ", e);
        next(e);
    }
};