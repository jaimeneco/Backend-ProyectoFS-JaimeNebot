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
        //traer datos del body
        const { email, password, name } = req.body;

        //verificar si el usuario ya existe
        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                mensaje: "El usuario con ese email ya existe, si eres tú, intenta hacer un login"
            });
        }

        //crear el nuevo usuario 
        const user = new Usuario({
            email, password, name
        });
        await user.save();

        // Generar nuevo Token JWT
        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name
            },
            JWT_SECRET,
            { expiresIn: '2h' });

        // devolver datos del usuario + JWT Token
        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            token,
            user: { //haciendo esto seleccionamos nosotros la info que queremos enviar al front, en este caso la contraseña no se enviaría.
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

        res.json({ "mensaje": "registrar!" })
    } catch (e) {
        next(e);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        // recibir datos del request
        const { email, password } = req.body;


        //verificar si existe el usuario
        const user = await Usuario.findOne({ email });

        //si no existe el usuario, termino la petición 
        if (!user) {
            // devolver mensaje de error
            return res.status(400).json({ mensaje: "Usuario o clave inválidos" });
        }

        // Comparo la clave del request con la clave de la DB.
        if (password != user.password) {
            //devolver mensaje de error
            return res.status(401).json({ mensaje: "Usuario o clave inválidos" });
        }

        // Generar nuevo Token JWT
        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name
            },
            JWT_SECRET,
            { expiresIn: '2h' });

        // devolver datos del usuario(sin clave ni datos sensibles) + JWT Token
        res.status(201).json({
            mensaje: "Accediste correctamente",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

        res.json({ "mensaje": "login!" })
    } catch (e) {
        next(e);
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        // obtener el id del token
        const idUsuario = req.userId;

        const user = await Usuario.findById({ id: idUsuario }).select('-password'); //Así trae todo menos el password.
        if (!user) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" })
        }
        const responseAPI = {
            mensaje: "Usuario encontrado",
            data: user,
            status: "ok"
        }
        res.status(200).json(responseAPI);

    } catch (e) {
        next(e);
    }
};
