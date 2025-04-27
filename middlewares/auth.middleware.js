import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/config.js";

export const authMiddleWare = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado. Token requerido" });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = { 
            userId: decoded.userId,
            name: decoded.name,
            role: decoded.role 
        };  // Mejor guardar todo el usuario, no solo el id

        next(); // <--- ¡Faltaba esto!

    } catch (e) {
        console.error("error en el token", err)
        res.status(401).json({ mensaje: "Acceso denegado. Token inválido o expirado" });
    }
};


