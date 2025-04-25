import { Usuario } from "../db/models/index.js";


const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}

export const getAllUsuarios = async (req, res, next) => {
    try{
        const usuarios = await Usuario.find();
        ResponseAPI.data = usuarios;
        ResponseAPI.msg = "Estos son todos tus usuarios";
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al obtener todos los usuarios ", e);
        next(e);
    }
}

export const getUsuarioById = async (req, res, next) => {
    try{
        const usuarios = await Usuario.findById();
        ResponseAPI.data = usuarios;
        ResponseAPI.msg = `Este es tu usuario ${id}`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al obtener usuario ", e);
        next(e);
    }
};

export const createUsuario = async (req, res, next) => {

    try{
        const { nombre, email } = req.body;
        const usuarios = await Usuario.create({
            nombre: nombre,
            email: email
        });
        ResponseAPI.data = usuarios;
        ResponseAPI.msg = `El usuario ha sido creado`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al crear usuario ", e);
        next(e);
    }
};

export const updateUsuario = async (req, res, next) => {
    try{
        const usuarios = await Usuario.findByIdAndUpdate(id);
        ResponseAPI.data = usuarios;
        ResponseAPI.msg = `El usuario ${id} ha sido actualizado`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al actualizar usuario ", e);
        next(e);
    }
};

export const deleteUsuario = async (req, res, next) => {
    try{
        const usuarios = await Usuario.findByIdAndDelete(id);
        ResponseAPI.data = usuarios;
        ResponseAPI.msg = `El usuario ${id} ha sido actualizado`;
        res.status(200).json(ResponseAPI);
    } catch(e){
        console.error("Error al eliminar usuario", e);
        next(e);
    }
};