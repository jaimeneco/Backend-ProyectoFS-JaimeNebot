import dotenv from 'dotenv';
dotenv.config();

//Variables del servidor Express
export const PORT = process.env.PORT || 3000;
export const DOMAIN = process.env.DOMAIN || 'http://localhost';

// Variables de Base de Datos MongoDB
export const DB_USER = process.env.DB_USER || "jaimenebot";
export const DB_PASS = process.env.DB_PASS || "1234";
export const DB_CLUSTER = process.env.DB_CLUSTER || "cei-practicas.i5jd4.mongodb.net";
export const DATABASE= process.env.DATABASE || "base_de_datos";
export const BACKEND_URL= process.env.BACKEND_URL || "https://backend-proyecto-fs-jaime-nebot.vercel.app";

export const JWT_SECRET = process.env.JWT_SECRET || "clave-super-secreta"

// export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"
export const FULLDOMAIN = `${DOMAIN}:${PORT}`;

// mongodb+srv://jaimeneb:4OhwbVwS27ONY7J4@cei-practicas.i5jd4.mongodb.net/
