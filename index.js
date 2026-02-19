import express from 'express';
import cors from 'cors';

import router from './routes/index.routes.js';
import { PORT, DOMAIN, FULLDOMAIN } from './config/config.js';
import {conectarDB} from './db/mongoose.js'
import {notFoundHandler, errorHandler} from './middlewares/errors.js'

// const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000"

const app = express();

//Permite acceso desde cualquier servidor
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://frontend-proyecto-fs-jaime-nebot.vercel.app'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

conectarDB();

console.clear();
app.get("/", (req, res) => {
    res.send("Bienvenidos a la API de ONPIK")
});

// Rutas de mi API
app.use("/api/v1/", router);


// // manejador de errores
// app.use((err, req, res, next) => {
//     console.error(err)
//     res.status(500).json({ msg: 'Error  interno del servidor' })
// })

app.use(notFoundHandler);
app.use(errorHandler);

// Puerto
app.listen(PORT, () => {
    console.log(`Servidor funcionando en ${DOMAIN}:${PORT}`)
})