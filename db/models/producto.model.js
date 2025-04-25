import mongoose from "mongoose";

const options = {
    collection: 'productos', //Nombre de la colección en MongoDB
    strict: true,  // solo permite guaardar los cambios definidos en el esquema
    collation: {
        locale: "es",  // configuración para el idioma español
        strength: 1    //nivel de comparación de strings(1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    imagen: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true},
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compra'}]
}, options);

export const Producto = mongoose.model("Producto", productoSchema);