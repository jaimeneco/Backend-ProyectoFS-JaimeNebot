import mongoose from "mongoose";

const options = {
    collection: 'compras', //Nombre de la colección en MongoDB
    strict: true,  // solo permite guardar los cambios definidos en el esquema
    collation: {
        locale: "es",  // configuración para el idioma español
        strength: 1    //nivel de comparación de strings(1: ignorar mayúsculas, minúsculas y tildes)
    }
}

const compraSchema = new mongoose.Schema({
    fecha: {type: Date, default: Date.now },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto'}],
}, options);

export const Compra = mongoose.model("Compra", compraSchema);