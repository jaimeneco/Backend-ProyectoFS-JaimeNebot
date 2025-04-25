import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DOMAIN = process.env.DOMAIN || 'http://localhost';
export const DB_PASS = process.env.DB_PASS || "4OhwbVwS27ONY7J4";
export const DB_USER = process.env.DB_USER || "jaimeneb";
export const DATABASE= process.env.DATABASE || "ONPIK-BACKEND";
export const CLUSTER = process.env.CLUSTER || "cei-practicas";

export const FULLDOMAIN = `${DOMAIN}:${PORT}`;