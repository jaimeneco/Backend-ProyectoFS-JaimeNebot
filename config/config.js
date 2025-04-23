import dotenv from 'dotenv';
dotenv.config();

//Config:
export const PORT = process.env.PORT || 3000
export const DOMAIN = process.env.DOMAIN || "http://localhost"

export const DB_USER = process.env.DB_USER || "jaimeneb";
export const DB_PASS = process.env.DB_PASS || "4OhwbVwS27ONY7J4";
export const DB_CLUSTER = process.env.CLUSTER || "cei-practicas.i5jd4.mongodb.net";
export const DATABASE = process.env.DATABASE || "sample_mflix";
export const JWT_SECRET = process.env.JWT_SECRET || "Clave_secreta_pruebas"
export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

// export const FULLDOMAIN = `${DOMAIN}:${PORT}`;

