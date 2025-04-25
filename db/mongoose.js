import mongoose from "mongoose";
import { DB_PASS, DB_USER, DATABASE, CLUSTER } from "../config/config.js";

//Conexión a MongoDB
export const conectarDB = async () => {
    //Password: 4OhwbVwS27ONY7J4 /// Para iniciar esto en la terminal se pone: npm run dev en la carpeta express-mongo
    const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${CLUSTER}/${DATABASE}?retryWrites=true&w=majority&appName=CEI-PRACTICAS`
    console.log(url);

    try {
        await mongoose.connect(url);
        console.log("Conectado a MogoDB Atlas");
        console.log("Base de datos actual: ", mongoose.connection.db.databaseName);

        const collection = await mongoose.connection.db.listCollections().toArray();
        console.log("Colecciones disponibles:", collection.map(c => c.name));
    } catch (e) {
        console.error("Error al conectarse", e)

    }
}