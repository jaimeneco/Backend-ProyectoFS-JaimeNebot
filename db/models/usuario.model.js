import mongoose from 'mongoose'

const options = {
    collection: 'usuarios', // Nombre de la colección en mongoDB
    strict: true,
    collation: {
        locale: "es",
        strength: 1
    }
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },

    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }]
}, options);

export const Usuario = mongoose.model('Usuario', userSchema);
