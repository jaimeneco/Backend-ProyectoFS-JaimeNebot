import { Usuario } from "../db/models/index.js";
import bcrypt, { hash } from 'bcrypt'

const responseAPI = {
    data: [],
    msg: "",
    status: "ok",
    cant: null,
}

// obtener usuario por id
export const getUsuario = async (req, res, next) => {
    const { id } = req.params;

    try {
        const user = await Usuario.findById(id);

        if (!user) {
            responseAPI.msg = "Usuario no encontrado";
            responseAPI.status = "error";
            return res.status(404).json(responseAPI);
        }

        responseAPI.msg = "Usuario encontrado";
        responseAPI.data = user;
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI);
    } catch (err) {
        console.error('Error al obtener usuario', err)
    }
}

// crear nuevo usuario
export const createUsuario = async (req, res, next) => {
    const { name, email, password } = req.body

    try {

        //vemos si email ya existe o no
        const existingUser = await Usuario.findOne({ email })

        if (existingUser) {
            responseAPI.msg = "El correo electrónico ya está registrado"
            responseAPI.status = "error"

            return res.status(400).json(responseAPI)
        }


        const newUser = await Usuario.create({ name, email, password })

        responseAPI.msg = 'Usuario creado correctamente'
        responseAPI.data = newUser;
        responseAPI.status = 'ok'

        res.status(201).json(responseAPI)

    } catch (err) {
        console.error('Error al crear usuario', err)
        next(err)
    }
}

export const getAllUsuarios = async (req, res, next) => {
    try {
        const productos = await Usuario.find()
        responseAPI.msg = 'Usuarios obtenidos'
        responseAPI.status = 'ok'
        responseAPI.data = productos
        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('Error al obtener usuarios', err);
        next(err);
    }
}

// actualizar usuario
export const updateUsuario = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {


        const updateData = { name, email }

        if (password) {
            // console.log("Recibida nueva contraseña")
            const hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword;
        }

        if (email) {
            const existingUser = await Usuario.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ status: 'error', msg: 'el correo ya esta en uso ' })
            }
        }


        const updateUser = await Usuario.findByIdAndUpdate(
            id,
            updateData
            ,
            { new: true }
        );

        if (!updateUser) {
            responseAPI.msg = 'No se encontró el usuario'
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = 'usuario actualizado';
        responseAPI.data = {
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email
        };
        responseAPI.status = 'ok'

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('erro en updateUsuario', err)
        next(err)
    }
}
export const updateUserData = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body


    try {
        const updateData = { name, email };

        if (email) {
            const existingUser = await Usuario.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                responseAPI.status = 'error';
                responseAPI.msg = 'El correo ya está en uso';
                return res.status(400).json(responseAPI);
            }
        }

        const updateUser = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

        if (!updateUser) {
            responseAPI.status = 'error';
            responseAPI.msg = 'usuario no encontrado';
            return res.status(404).json(responseAPI)
        }
        responseAPI.status = "ok";
        responseAPI.msg = "Usuario actualizado";
        responseAPI.data = {
            id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email
        }

        res.status(200).json(responseAPI)
    } catch (err) {
        console.error(err)
        next(err)
    }
}

//actualizar solo contraseña
export const updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { lastPassword, newPassword } = req.body;

    try {
        const user = await Usuario.findById(id);
        if (!user) {
            responseAPI.status = 'error';
            responseAPI.msg = 'Usuario no encontrado';
            return res.status(404).json(responseAPI);
        }

        // comparar la actual con la gaurdada
        const passwordMatch = await bcrypt.compare(lastPassword, user.password);
        if (!passwordMatch) {
            responseAPI.status = 'error';
            responseAPI.msg = 'contraseña actual no es correcta'
            return res.status(400).json(responseAPI)
        }

        //encriptar nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        responseAPI.status = 'ok';
        responseAPI.msg = 'contraseña actualizada correctamente'

        res.status(200).json(responseAPI)
    } catch (e) {
        console.error('Error al actualizar la contraseña', e);
        next(e);
    }
}

// eliminar usuario
export const deleteUsuario = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deleteUser = await Usuario.findByIdAndDelete(id);

        if (!deleteUser) {
            responseAPI.msg = `No se ha encontrado usuario con id ${id}`
            responseAPI.status = 'error'
            return res.status(404).json(responseAPI)
        }

        responseAPI.msg = `usuario con id ${id} eliminado`
        responseAPI.data = deleteUser;
        responseAPI.status = 'ok'

        res.status(200).json(responseAPI)
    } catch (err) {
        console.error('error en deleteusuario', err)
        next(err)
    }
}

//asignar un rol de admin a user
export const asignarRolAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findById(id)

        if (!usuario) {
            responseAPI.msg = `no se ha encontrado usuario con id ${id}`;
            responseAPI.status = 'error';
            return res.status(404).json(responseAPI)
        }

        usuario.role = 'admin';
        await usuario.save();

        responseAPI.msg = `rol de admin asignado al id ${id}`;
        responseAPI.status = 'ok';
        responseAPI.data = usuario;

        return res.status(200).json(responseAPI)


    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'error al asignar rol d admin' })
    }
}