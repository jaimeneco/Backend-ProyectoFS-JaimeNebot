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
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: 'user' },
    // createdAt: { type: Date, default: Date.now}
}, options);

export const Usuario = mongoose.model('Usuario', userSchema);
