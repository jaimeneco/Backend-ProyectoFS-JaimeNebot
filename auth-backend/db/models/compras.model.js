import mongoose from 'mongoose'

const options = {
    collection: 'compras', // Nombre de la colección en mongoDB
    strict: true,
    collation: {
        locale: "es",
        strength: 1
    }
}

const comprasSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, options);

export const Compras= mongoose.model('Compras', comprasSchema);