// --------------------------------
// NO ESTÁ IMPLEMENTADO EN LA WEB
// --------------------------------
// import mongoose from 'mongoose'

// const options = {
//     collection: 'compras', // Nombre de la colección en mongoDB
//     strict: true,
//     collation: {
//         locale: "es",
//         strength: 1
//     }
// }

// const comprasSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
//     products: [{
//         product: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
//         quantity: Number,
//         priceAtPurchase: Number // por si el precio cambia con el tiempo
//     }],
//     createdAt: { type: Date, default: Date.now },
// }, options);

// export const Compra = mongoose.model('Compra', comprasSchema);