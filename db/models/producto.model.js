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
    title: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, options);

export const Producto= mongoose.model('Producto', productSchema);