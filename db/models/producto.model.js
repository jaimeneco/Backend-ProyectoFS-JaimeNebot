import mongoose from 'mongoose'

const options = {
    collection: 'productos', // Nombre de la colección en mongoDB
    strict: true,
    collation: {
        locale: "es",
        strength: 1
    }
}

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String},
    img: { type: String, required: true },

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', required: true }
}, options);

export const Producto= mongoose.model('Producto', productSchema);
