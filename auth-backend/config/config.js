import dotenv from 'dotenv';
dotenv.config();

//Variables del servidor Express
export const PORT = process.env.PORT || 3000;
export const DOMAIN = process.env.DOMAIN || 'http://localhost';

// Variables de Base de Datos MongoDB
export const DB_USER = process.env.DB_USER || "usuario";
export const DB_PASS = process.env.DB_PASS || "1234";
export const CLUSTER = process.env.CLUSTER || "server.mongodb.net";
export const DATABASE= process.env.DATABASE || "base_de_datos";

export const JWT_SECRET = process.env.JWT_SECRET || "clave-super-secreta"

export const FULLDOMAIN = `${DOMAIN}:${PORT}`;
