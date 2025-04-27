import { Usuario } from "../db/models/index.js";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js'

const ResponseAPI = {
    data: [],
    msg: "",
    status: "ok"
}

export const registerUser = async (req, res, next) => {
    try {
        const { email, password, name, role } = req.body;

        // console.log("Datos recibidos:", { email, password, name, role });  // Verifica que role es 'admin'


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

        //encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new Usuario({
            email,
            password: hashedPassword,
            name,
            role: role || 'user' // user por defecto u otro rol si lo pasa (admin claro)
        });

        await newUser.save();

        // Generar nuevo token JWT (datos, clave secreta, configuraciones especiales)
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

        // Comparar password encriptada
        const isPasswrodValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswrodValid) {
            responseAPI.msg = "Email o contraseña erróneos";
            responseAPI.status = "error";
            return res.status(401).json(responseAPI)
        }

        // crear token si la contraseña es valida
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

        const user = await Usuario.findById(idUsuario).select('-password'); //coger todo menos la pass

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