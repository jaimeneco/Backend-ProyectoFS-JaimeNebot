import { Usuario } from "../db/models/index.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';
import bcrypt from 'bcrypt'

const responseAPI = () => ({ data: [], msg: "", status: "ok", cant: null })

export const registerUser = async (req, res, next) => {
    try {
        const response = responseAPI();
        const { email, password, name, role } = req.body;

        if (!email || !password || !name) {
            response.msg = 'Completa los campos requeridos';
            response.status = "error";
            return res.status(400).json(response)
        }

        if (password.length < 6) {
            response.msg = 'Introduce al menos 6 caracteres';
            response.status = 'error';
            return res.status(400).json(response)
        }

        const existingUser = await Usuario.findOne({ email })

        if (existingUser) {
            response.msg = "Este usuario ya existe";
            response.status = "error";
            return res.status(400).json(response)
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Usuario({
            email,
            password: hashedPassword,
            name,
            role: role || 'user'
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, name: newUser.name, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '3h' }
        );

        response.msg = "Usuario creado correctamente";
        response.status = "ok";
        response.data = {
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        }

        res.status(201).json(response)

    } catch (err) {
        console.error('Error al registar nuevo usuario', err)
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const response = responseAPI();
        const { email, password } = req.body;

        if (!email || !password) {
            response.msg = "Rellenar email y contraseña"
            response.status = 'error'
            return res.status(400).json(response)
        }

        const existingUser = await Usuario.findOne({ email });

        if (!existingUser) {
            response.msg = "Email o contraseña inválidos";
            response.status = "error";
            return res.status(401).json(response)
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            response.msg = "Email o contraseña erróneos";
            response.status = "error";
            return res.status(401).json(response)
        }

        const token = jwt.sign(
            { userId: existingUser._id, name: existingUser.name, role: existingUser.role },
            JWT_SECRET,
            { expiresIn: '3h' }
        );

        response.msg = 'Inicio de sesión correcto';
        response.status = "ok";
        response.data = {
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            }
        }

        res.status(200).json(response)

    } catch (err) {
        console.error('Error en el loginUser', err)
        next(err)
    }
}

export const getCurrentUser = async (req, res, next) => {
    try {
        const response = responseAPI();
        const idUsuario = req.user.userId;

        const user = await Usuario.findById(idUsuario).select('-password');

        if (!user) {
            response.status = "error";
            response.msg = "Usuario no encontrado";
            return res.status(404).json(response);
        }

        response.status = "ok";
        response.msg = "Usuario encontrado";
        response.data = user;

        res.status(200).json(response)

    } catch (err) {
        console.error("Error en el getCurrentUser", err)
        next(err)
    }
}