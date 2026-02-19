import { Usuario } from "../db/models/index.js";
import bcrypt from 'bcrypt'

const responseAPI = () => ({ data: [], msg: "", status: "ok", cant: null })

export const getUsuario = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = responseAPI();
        const user = await Usuario.findById(id);

        if (!user) {
            response.msg = "Usuario no encontrado";
            response.status = "error";
            return res.status(404).json(response);
        }

        response.msg = "Usuario encontrado";
        response.data = user;
        response.status = 'ok';

        res.status(200).json(response);
    } catch (err) {
        console.error('Error al obtener usuario', err)
        next(err)
    }
}

export const createUsuario = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const response = responseAPI();
        const existingUser = await Usuario.findOne({ email })

        if (existingUser) {
            response.msg = "El correo electrónico ya está registrado"
            response.status = "error"
            return res.status(400).json(response)
        }

        const newUser = await Usuario.create({ name, email, password })

        response.msg = 'Usuario creado correctamente'
        response.data = newUser;
        response.status = 'ok'

        res.status(201).json(response)
    } catch (err) {
        console.error('Error al crear usuario', err)
        next(err)
    }
}

export const getAllUsuarios = async (req, res, next) => {
    try {
        const response = responseAPI();
        const usuarios = await Usuario.find()

        response.msg = 'Usuarios obtenidos'
        response.status = 'ok'
        response.data = usuarios

        res.status(200).json(response)
    } catch (err) {
        console.error('Error al obtener usuarios', err);
        next(err);
    }
}

export const updateUsuario = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const response = responseAPI();
        const updateData = { name, email }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword;
        }

        if (email) {
            const existingUser = await Usuario.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                response.status = 'error';
                response.msg = 'El correo ya está en uso';
                return res.status(400).json(response)
            }
        }

        const updatedUser = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            response.msg = 'No se encontró el usuario'
            response.status = 'error'
            return res.status(404).json(response)
        }

        response.msg = 'Usuario actualizado';
        response.data = {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        };
        response.status = 'ok'

        res.status(200).json(response)
    } catch (err) {
        console.error('Error en updateUsuario', err)
        next(err)
    }
}

export const updateUserData = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body
    try {
        const response = responseAPI();
        const updateData = { name, email };

        if (email) {
            const existingUser = await Usuario.findOne({ email });
            if (existingUser && existingUser._id.toString() !== id) {
                response.status = 'error';
                response.msg = 'El correo ya está en uso';
                return res.status(400).json(response);
            }
        }

        const updatedUser = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            response.status = 'error';
            response.msg = 'Usuario no encontrado';
            return res.status(404).json(response)
        }

        response.status = "ok";
        response.msg = "Usuario actualizado";
        response.data = {
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
        }

        res.status(200).json(response)
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export const updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { lastPassword, newPassword } = req.body;
    try {
        const response = responseAPI();
        const user = await Usuario.findById(id);

        if (!user) {
            response.status = 'error';
            response.msg = 'Usuario no encontrado';
            return res.status(404).json(response);
        }

        const passwordMatch = await bcrypt.compare(lastPassword, user.password);
        if (!passwordMatch) {
            response.status = 'error';
            response.msg = 'La contraseña actual no es correcta'
            return res.status(400).json(response)
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        response.status = 'ok';
        response.msg = 'Contraseña actualizada correctamente'

        res.status(200).json(response)
    } catch (err) {
        console.error('Error al actualizar la contraseña', err);
        next(err);
    }
}

export const deleteUsuario = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = responseAPI();
        const deletedUser = await Usuario.findByIdAndDelete(id);

        if (!deletedUser) {
            response.msg = `No se ha encontrado usuario con id ${id}`
            response.status = 'error'
            return res.status(404).json(response)
        }

        response.msg = `Usuario con id ${id} eliminado`
        response.data = deletedUser;
        response.status = 'ok'

        res.status(200).json(response)
    } catch (err) {
        console.error('Error en deleteUsuario', err)
        next(err)
    }
}

export const asignarRolAdmin = async (req, res, next) => {
    const { id } = req.params;
    try {
        const response = responseAPI();
        const usuario = await Usuario.findById(id)

        if (!usuario) {
            response.msg = `No se ha encontrado usuario con id ${id}`;
            response.status = 'error';
            return res.status(404).json(response)
        }

        usuario.role = 'admin';
        await usuario.save();

        response.msg = `Rol de admin asignado al usuario con id ${id}`;
        response.status = 'ok';
        response.data = usuario;

        res.status(200).json(response)
    } catch (err) {
        console.error(err);
        next(err)
    }
}