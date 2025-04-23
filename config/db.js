// import dotenv from 'dotenv';
// dotenv. config();

// //Config:
// export const PORT = process.env.PORT || 3000
// export const DOMAIN = process.env.DOMAIN || "http://localhost"

// export const DB_USER = process.env.DB_USER || "jaimeneb";
// export const DB_PASS = process.env.DB_PASS || "4OhwbVwS27ONY7J4";
// export const CLUSTER = process.env.CLUSTER || "cei-practicas.i5jd4.mongodb.net";
// export const DATABASE = process.env.DATABASE || "sample_mflix";

// export const FULLDOMAIN = `${DOMAIN}:${PORT}`;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB conectado');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};