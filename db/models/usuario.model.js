import mongoose from "mongoose";

const options = {
    collection: 'usuarios', //Nombre de la colección en MongoDB
    strict: true,  // solo permite guaardar los cambios definidos en el esquema
    collation: {
        locale: "es",  // configuración para el idioma español
        strength: 1    //nivel de comparación de strings(1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto'}],
    compras: [{type: mongoose.Schema.Types.ObjectId, ref: 'Compra'}]
}, options);

export const Usuario = mongoose.model("Usuario", usuarioSchema);