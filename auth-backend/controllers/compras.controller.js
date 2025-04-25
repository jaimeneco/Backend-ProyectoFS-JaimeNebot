import { Compra } from "../db/models/index.js";

export const getAllCompras = async (req, res, next) => {
    try {
        const compras = await Compra.find();
        res.status(200).json({
            data: compras,
            msg: "Estas son todas tus compras",
            status: "ok"
        });
    } catch (e) {
        console.error("Error al obtener todas las compras ", e);
        next(e);
    }
};

export const getCompraByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const compra = await Compra.findById(id);
        res.status(200).json({
            data: compra,
            msg: `Esta es tu compra ${id}`,
            status: "ok"
        });
    } catch (e) {
        console.error("Error al obtener compra ", e);
        next(e);
    }
};

export const createCompra = async (req, res, next) => {
    try {
        const newCompra = await Compra.create(req.body);
        res.status(201).json({
            data: newCompra,
            msg: `La compra ha sido creada`,
            status: "ok"
        });
    } catch (e) {
        console.error("Error al crear compra ", e);
        next(e);
    }
};

export const updateCompra = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedCompra = await Compra.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            data: updatedCompra,
            msg: `La compra ${id} ha sido actualizada`,
            status: "ok"
        });
    } catch (e) {
        console.error("Error al actualizar compra ", e);
        next(e);
    }
};

export const deleteCompra = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCompra = await Compra.findByIdAndDelete(id);
        res.status(200).json({
            data: deletedCompra,
            msg: `La compra ${id} ha sido eliminada`,
            status: "ok"
        });
    } catch (e) {
        console.error("Error al eliminar compra ", e);
        next(e);
    }
};



// import { Compra } from "../db/models/index.js";


// const ResponseAPI = {
//     data: [],
//     msg: "",
//     status: "ok"
// }

// export const getAllCompras = async (req, res, next) => {
//     try{
//         const compras = await Compra.find();
//         ResponseAPI.data = compras;
//         ResponseAPI.msg = "Estas son todas tus compras";
//         res.status(200).json(ResponseAPI);
//     } catch(e){
//         console.error("Error al obtener todas las compras ", e);
//         next(e);
//     }
// }

// export const getCompraByUserId = async (req, res, next) => {
//     try{
//         const compras = await Compra.findById();
//         ResponseAPI.data = compras;
//         ResponseAPI.msg = `Esta es tu compra ${id}`;
//         res.status(200).json(ResponseAPI);
//     } catch(e){
//         console.error("Error al obtener compra ", e);
//         next(e);
//     }
// };

// export const createCompra = async (req, res, next) => {
//     try{
//         const compras = await Compra.create();
//         ResponseAPI.data = compras;
//         ResponseAPI.msg = `La compra ${id} ha sido creada`;
//         res.status(200).json(ResponseAPI);
//     } catch(e){
//         console.error("Error al crear compra ", e);
//         next(e);
//     }
// };

// export const updateCompra = async (req, res, next) => {
//     try{
//         const compras = await Compra.findByIdAndUpdate(id);
//         ResponseAPI.data = compras;
//         ResponseAPI.msg = `La compra ${id} ha sido actualizada`;
//         res.status(200).json(ResponseAPI);
//     } catch(e){
//         console.error("Error al actualizar compra ", e);
//         next(e);
//     }
// };

// export const deleteCompra = async (req, res, next) => {
//     try{
//         const compras = await Compra.findByIdAndDelete(id);
//         ResponseAPI.data = compras;
//         ResponseAPI.msg = `La compra ${id} ha sido eliminada`;
//         res.status(200).json(ResponseAPI);
//     } catch(e){
//         console.error("Error al eliminar compra ", e);
//         next(e);
//     }
// };