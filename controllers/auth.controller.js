import { Usuario } from "../db/models/index.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';
import bcrypt from 'bcrypt'

const responseAPI = {
    data: [],
    msg: "",
    status: "ok",
    cant: null
}

export const registerUser = async (req, res, next) => {
    try {
        const { email, password, name, role } = req.body;


        if (!email || !password || !name) {
            responseAPI.msg = 'Completa los campos requeridos';
            responseAPI.status = "error";
            return res.status(400).json(responseAPI)
        }

        if (password.length < 6) {
            responseAPI.msg = 'Introduce al menos 6 caracteres';
            responseAPI.status = 'error';
            return res.status(400).json(responseAPI)
        }

        const existingUser = await Usuario.findOne({ email })

        if (existingUser) {
            responseAPI.msg = "Este usuario ya existe";
            responseAPI.status = "error";
            return res.status(400).json(responseAPI)
        }

        //Encriptación de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Usuario({
            email,
            password: hashedPassword,
            name,
            role: role || 'user'
        });

        await newUser.save();

        
        const token = jwt.sign(
            {
                userId: newUser._id,
                name: newUser.name,
                role: newUser.role
            },

            JWT_SECRET,

            { expiresIn: '3h' }
        );

        responseAPI.msg = "Usuario creado correctamente";
        responseAPI.status = "ok";
        responseAPI.data = {
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        }

        res.status(201).json(responseAPI)

    } catch (err) {
        console.error('Error al registar nuevo usuario', err)
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            responseAPI.msg = "Rellenar email y contraseña"
            responseAPI.status = 'Error'
            return res.status(400).json(responseAPI)
        }

        const existingUser = await Usuario.findOne({ email });

        if (!existingUser) {
            responseAPI.msg = "Email o contraseña inválidos";
            responseAPI.status = "error";
            return res.status(401).json(responseAPI)
        }

        // Comparar password cuando está encriptada
        const isPasswrodValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswrodValid) {
            responseAPI.msg = "Email o contraseña erróneos";
            responseAPI.status = "error";
            return res.status(401).json(responseAPI)
        }

        // Crear token si la contraseña es valida
        const token = jwt.sign(
            {
                userId: existingUser._id,
                name: existingUser.name,
                role: existingUser.role
            },
            JWT_SECRET,
            { expiresIn: '3h' }
        );

        responseAPI.msg = 'Inicio de sesión correcto';
        responseAPI.status = "ok";
        responseAPI.data = {
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role

            }
        }

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error('Error en el loginUser', err)
        next(err)
    }
}

export const getCurrentUser = async (req, res, next) => {
    try {

        const idUsuario = req.user.userId;

        const user = await Usuario.findById(idUsuario).select('-password');

        if (!user) {
            responseAPI.status = "error";
            responseAPI.msg = "Usuario no encontrado";
            return res.status(404).json(responseAPI);
        }

        responseAPI.status = "ok";
        responseAPI.msg = "Usuario encontrado";
        responseAPI.data = user;

        res.status(200).json(responseAPI)

    } catch (err) {
        console.error("Error en el getCurrentUser", err)
        next(err)
    }
}